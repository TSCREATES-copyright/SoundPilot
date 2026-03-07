/**
 * patternEngine.js — Deterministic pattern analysis for SoundPilot
 * Phase 6 Rewrite — Full array processing in JS. Zero SQL logic beyond SELECT *.
 */

function daysBetween(a, b) {
  return Math.abs(new Date(a).getTime() - new Date(b).getTime()) / 86400000
}

function analyzeCatalog(db) {
  try {
    const songs = db.prepare('SELECT * FROM songs').all()
    const projects = db.prepare('SELECT * FROM projects').all()
    const projectSongs = db.prepare('SELECT * FROM project_songs').all()
    const ruleLogs = db.prepare('SELECT * FROM rule_logs').all()

    if (!songs || songs.length === 0) return null

    // 1. Tempo Profile
    const bpms = songs.filter(s => s.bpm != null && s.bpm !== '').map(s => Number(s.bpm))
    const avgBpm = bpms.length ? Math.round(bpms.reduce((a, b) => a + b, 0) / bpms.length) : 0
    
    const tempoProfile = {
      avgBpm,
      highCount: bpms.filter(b => b > 120).length,
      midCount: bpms.filter(b => b >= 70 && b <= 120).length,
      lowCount: bpms.filter(b => b < 70).length,
      distribution: [
        { label: '<70', count: bpms.filter(b => b < 70).length },
        { label: '70–100', count: bpms.filter(b => b >= 70 && b <= 100).length },
        { label: '101–120', count: bpms.filter(b => b > 100 && b <= 120).length },
        { label: '121–140', count: bpms.filter(b => b > 120 && b <= 140).length },
        { label: '140+', count: bpms.filter(b => b > 140).length }
      ]
    }

    // 2. Energy Profile
    const energies = songs.filter(s => s.energy).map(s => String(s.energy).toLowerCase())
    const highCount = energies.filter(e => e === 'high').length
    const medCount = energies.filter(e => e === 'medium').length
    const lowCount = energies.filter(e => e === 'low').length
    const totalEnergy = energies.length || 1
    
    const dominant = highCount >= medCount && highCount >= lowCount ? 'high' : 
                     medCount >= lowCount ? 'medium' : 'low'

    const energyProfile = {
      dominant,
      highPct: Math.round((highCount / totalEnergy) * 100),
      medPct: Math.round((medCount / totalEnergy) * 100),
      lowPct: Math.round((lowCount / totalEnergy) * 100)
    }

    // 3. Key Tendency
    const keys = songs.filter(s => s.key && s.key.trim() !== '').map(s => s.key.trim())
    const keyCounts = keys.reduce((acc, k) => { acc[k] = (acc[k] || 0) + 1; return acc }, {})
    const sortedKeys = Object.entries(keyCounts).sort((a, b) => b[1] - a[1])
    const [mostUsed, count] = sortedKeys[0] || ['N/A', 0]
    
    const pct = keys.length ? Math.round((count / keys.length) * 100) : 0
    const suggestion = pct >= 70 
      ? `${pct}% of your tracks use ${mostUsed}. Try exploring a contrasting key.`
      : `Healthy key variety. ${mostUsed !== 'N/A' ? mostUsed : 'No keys'} is most used.`

    const keyTendency = { mostUsed, count, suggestion }

    // 4. Version Behavior
    const vers = songs.map(s => String(s.version || 'v1').toLowerCase())
    const demoCount = vers.filter(v => ['v1', 'demo', 'rough'].includes(v)).length
    const masterCount = vers.filter(v => ['master', 'final', 'mix'].includes(v)).length
    const completionRate = songs.length ? Math.round((masterCount / songs.length) * 100) : 0
    
    const insight = completionRate < 20 
      ? 'Most tracks never leave the demo stage. Pick one and finish it.'
      : completionRate < 50
      ? 'You have some finished tracks. Push more demos over the line.'
      : 'Strong completion rate. You have a solid finishing discipline.'

    const versionBehavior = { demoCount, masterCount, completionRate, insight }

    // 5. Upload Rhythm
    const validDates = songs.map(s => new Date(s.created_at)).filter(d => !isNaN(d.getTime()))
    let busiestDay = 'N/A'
    let busiestHourNum = -1
    let streak = 0
    let longestGap = 0

    if (validDates.length > 0) {
      const dayCounts = new Array(7).fill(0)
      const hourCounts = new Array(24).fill(0)
      
      validDates.forEach(d => {
        dayCounts[d.getDay()]++
        hourCounts[d.getHours()]++
      })
      
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      busiestDay = days[dayCounts.indexOf(Math.max(...dayCounts))]
      busiestHourNum = hourCounts.indexOf(Math.max(...hourCounts))
      
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const dateStrs = new Set(validDates.map(d => d.toISOString().slice(0, 10)))
      for (let i = 0; i <= 30; i++) {
          const checkDate = new Date(today.getTime() - i * 86400000)
          if (dateStrs.has(checkDate.toISOString().slice(0, 10))) {
              streak++
          } else if (i > 0) {
              break 
          }
      }
      
      const sortedDates = [...validDates].sort((a, b) => a.getTime() - b.getTime())
      for (let i = 1; i < sortedDates.length; i++) {
        const gap = (sortedDates[i].getTime() - sortedDates[i-1].getTime()) / 86400000
        if (gap > longestGap) longestGap = gap
      }
    }

    const uploadRhythm = { 
      busiestDay, 
      busiestHour: busiestHourNum !== -1 ? `${busiestHourNum}:00` : 'N/A', 
      streak, 
      longestGap: Math.round(longestGap) 
    }

    // 6. Replay Signals
    const replaySignals = songs
      .filter(s => (s.play_count || 0) > 0)
      .sort((a, b) => (b.play_count || 0) - (a.play_count || 0))
      .slice(0, 5)
      .map(s => {
        const lower = String(s.version || '').toLowerCase()
        const isDemo = ['v1', 'demo', 'rough'].includes(lower)
        return {
          title: s.title,
          play_count: s.play_count,
          insight: isDemo ? `Replayed ${s.play_count}x but still in draft stage. Consider finishing it.` : `One of your most-played tracks.`
        }
      })

    // 7. Completion Rate (same as version)
    const compRate = { 
      finished: masterCount, 
      total: songs.length, 
      pct: completionRate, 
      message: completionRate === 0 ? 'No finished tracks yet.' : completionRate < 25 ? 'Most work is in draft.' : 'Solid progress.' 
    }

    // 8. Project Health
    const projectHealth = projects.map(p => {
      const pSongs = projectSongs.filter(ps => ps.project_id === p.id)
      const songIds = new Set(pSongs.map(ps => ps.song_id))
      const pSongObjs = songs.filter(s => songIds.has(s.id))
      
      const lastActivity = pSongObjs.length > 0 
        ? Math.max(...pSongObjs.map(s => new Date(s.created_at).getTime()))
        : new Date(p.created_at).getTime()
        
      const daysSinceActive = daysBetween(new Date(), new Date(lastActivity))
      
      let alert = ''
      if (pSongs.length === 0) alert = 'No songs yet. Add a track or archive this project.'
      else if (daysSinceActive > 14) alert = `Inactive for ${Math.round(daysSinceActive)} days. Revisit or mark complete.`
      else if (p.status === 'complete') alert = 'Marked complete.'
      
      return {
        name: p.name,
        status: p.status,
        songCount: pSongs.length,
        daysSinceActive: Math.round(daysSinceActive),
        alert
      }
    })

    // 9. Growth Score
    const growthScore = computeGrowthScoreJS(songs, projects, projectSongs)

    // 10. Weekly Comparison
    const nowTime = new Date().getTime()
    const thisWeekCount = songs.filter(s => {
      const d = new Date(s.created_at).getTime()
      return (nowTime - d) <= 7 * 86400000
    }).length
    
    const lastWeekCount = songs.filter(s => {
      const d = new Date(s.created_at).getTime()
      const diff = nowTime - d
      return diff > 7 * 86400000 && diff <= 14 * 86400000
    }).length

    const diff = thisWeekCount - lastWeekCount
    const weeklyComparison = {
      thisWeek: thisWeekCount,
      lastWeek: lastWeekCount,
      trend: diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat',
      message: diff > 0 ? `You uploaded ${diff} more tracks than last week. Keep going.` : diff < 0 ? `${Math.abs(diff)} fewer uploads than last week.` : 'Same pace as last week.'
    }

    const snapshot = {
      totalSongs: songs.length,
      avgBpm: tempoProfile.avgBpm,
      topGenre: songs.length ? (Object.entries(songs.reduce((acc, s) => { if (s.genre) acc[s.genre] = (acc[s.genre] || 0) + 1; return acc }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Eclectic') : 'N/A',
      patterns: detectPatternsJS(songs, projects, projectSongs),
      timeline: buildTimelineJS(songs)
    }

    return {
      snapshot,
      score: {
        growthScore
      },
      // Keep other data if needed, but the main dashboard wants snapshot/score
      raw: {
        tempoProfile,
        energyProfile,
        keyTendency,
        versionBehavior,
        uploadRhythm,
        replaySignals,
        completionRate: compRate,
        projectHealth,
        weeklyComparison
      }
    }
  } catch (err) {
    console.error('[PatternEngine] analyzeCatalog error:', err)
    return null
  }
}

function computeGrowthScoreJS(songs, projects, projectSongs) {
  try {
    const total = songs.length;
    if (total === 0) {
        return {
            score: 10,
            label: 'Just Getting Started',
            breakdown: [
                { category: 'Upload Consistency', earned: 0, max: 25 },
                { category: 'Completion Rate', earned: 0, max: 25 },
                { category: 'Project Activity', earned: 0, max: 20 },
                { category: 'Replay Engagement', earned: 0, max: 15 },
                { category: 'Catalog Diversity', earned: 0, max: 15 }
            ]
        }
    }

    const now = new Date().getTime()
    const uploadsLast30 = songs.filter(s => (now - new Date(s.created_at).getTime()) <= 30 * 86400000).length
    const consistencyScore = Math.min(25, Math.round((uploadsLast30 / 4) * 25))

    const progressed = songs.filter(s =>
      s.version && !['v1', 'demo', 'Demo', 'v1'].includes(s.version)
    ).length
    const completionScore = Math.min(25, Math.round((progressed / Math.max(songs.length, 1)) * 25))

    const activeProjects = projects.length
    const projectScore = Math.min(20, activeProjects * 5)

    const totalPlays = songs.reduce((acc, s) => acc + (s.play_count || 0), 0)
    const avgPlays = totalPlays / total
    const replayScore = Math.min(15, Math.round((avgPlays / 5) * 15))

    const bpms = songs.filter(s => s.bpm).map(s => Number(s.bpm))
    const bpmBuckets = new Set(bpms.map(b => b < 70 ? 'slow' : b <= 120 ? 'mid' : 'fast'))
    const energyValues = new Set(songs.map(s => s.energy).filter(Boolean))
    const diversityScore = Math.min(15, bpmBuckets.size * 3 + energyValues.size * 3)

    const score = consistencyScore + completionScore + projectScore + replayScore + diversityScore
    const label = score <= 20 ? 'Just Getting Started' : score <= 40 ? 'Building Momentum' : score <= 60 ? 'Finding Your Flow' : score <= 80 ? 'Consistently Creating' : 'Operating at Peak'

    return {
      score,
      label,
      breakdown: [
        { category: 'Upload Consistency', earned: consistencyScore, max: 25 },
        { category: 'Completion Rate', earned: completionScore, max: 25 },
        { category: 'Project Activity', earned: projectScore, max: 20 },
        { category: 'Replay Engagement', earned: replayScore, max: 15 },
        { category: 'Catalog Diversity', earned: diversityScore, max: 15 }
      ]
    }
  } catch (err) {
    console.error('[PatternEngine] computeGrowthScoreJS error:', err)
    return {
      score: 0,
      label: 'Error',
      breakdown: []
    }
  }
}

function computeGrowthScore(db) {
  try {
    const songs = db.prepare('SELECT * FROM songs').all()
    const projects = db.prepare('SELECT * FROM projects').all()
    const projectSongs = db.prepare('SELECT * FROM project_songs').all()
    const scoreResult = computeGrowthScoreJS(songs, projects, projectSongs)
    return { growthScore: scoreResult }
  } catch (err) {
    console.error('[PatternEngine] computeGrowthScore error:', err)
    return { growthScore: null }
  }
}

function detectPatternsJS(songs, projects, projectSongs) {
  try {
    const patterns = []
    if (!songs || songs.length === 0) return patterns

    const now = new Date().getTime()
    const sortedSongs = [...songs].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    // Tempo Lock & BPM Drift
    const bpmSongs = sortedSongs.filter(s => s.bpm != null && s.bpm !== '').sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    if (bpmSongs.length >= 5) {
        const bpms = bpmSongs.map(s => Number(s.bpm))
        const avg = bpms.reduce((a, b) => a + b, 0) / bpms.length
        const inRange = bpms.filter(b => Math.abs(b - avg) <= 20).length
        if ((inRange / bpms.length) > 0.5) { 
            patterns.push({
                type: 'Tempo Lock',
                headline: "Narrow Tempo Range",
                label: "Narrow Tempo Range",
                insight: `${Math.round((inRange / bpms.length)*100)}% of your tracks land within 20 BPM. Try one session outside your norm.`,
                confidence: Math.round((inRange / bpms.length)*100),
                priority: 2
            })
        }
    }

    // Energy Plateau
    const recentEnergy = sortedSongs.filter(s => s.energy && s.energy !== '').slice(0, 3) 
    if (recentEnergy.length >= 3) {
        const unique = new Set(recentEnergy.map(s => s.energy))
        if (unique.size === 1) {
            patterns.push({
                type: 'Energy Plateau',
                headline: `Energy Plateau`,
                label: `Energy Plateau`,
                insight: `Your last 3 tracks share '${recentEnergy[0].energy}' energy. Try targeting a contrast.`,
                confidence: 90,
                priority: 2
            })
        }
    }

    return patterns.sort((a, b) => a.priority - b.priority)
  } catch (err) {
    console.error('[PatternEngine] detectPatternsJS error:', err)
    return []
  }
}

function buildTimelineJS(songs) {
  try {
    if (!songs || songs.length === 0) return []
    const sorted = [...songs].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    return sorted.slice(0, 5).map(s => ({
      date: s.created_at,
      event: `Uploaded '${s.title}'`,
      details: `${s.version || 'v1'} · ${s.bpm || '?'} BPM · ${s.key || 'No Key'}`
    }))
  } catch (err) {
    console.error('[PatternEngine] buildTimelineJS error:', err)
    return []
  }
}

function detectPatterns(db) {
  try {
    const songs = db.prepare('SELECT * FROM songs').all()
    const projects = db.prepare('SELECT * FROM projects').all()
    const projectSongs = db.prepare('SELECT * FROM project_songs').all()
    return detectPatternsJS(songs, projects, projectSongs)
  } catch (err) {
    console.error('[PatternEngine] detectPatterns error:', err)
    return []
  }
}

function buildTimeline(db) {
  try {
    const songs = db.prepare('SELECT * FROM songs').all()
    return buildTimelineJS(songs)
  } catch (err) {
    console.error('[PatternEngine] buildTimeline error:', err)
    return []
  }
}

function buildProducerFeed(db) {
  try {
    const report = analyzeCatalog(db)
    return report?.snapshot?.patterns || []
  } catch (err) {
    return []
  }
}

module.exports = { analyzeCatalog, computeGrowthScore, detectPatterns, buildTimeline, buildProducerFeed }
