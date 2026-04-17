import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { getProjects, getSongs, getProducerScore } from '../utils/api'
import { useToast } from '../components/ToastProvider'
import { useAuth } from '../auth/hooks/useAuth'

// Computes the creative DNA based on actual library data
function computeDNA(songs, projects) {
  const total = songs.length;
  const bpmSongs = songs.filter(s => s.bpm)
  const avgBpm = bpmSongs.length ? Math.round(bpmSongs.reduce((a, b) => a + Number(b.bpm), 0) / bpmSongs.length) : 0
  
  const progressed = songs.filter(s => s.version && !['v1', 'demo'].includes(s.version.toLowerCase())).length;
  const completionRate = total ? Math.round((progressed / total) * 100) : 0;

  // Session Style
  const hours = songs.map(s => new Date(s.created_at).getHours())
  const night = hours.filter(h => h >= 22 || h < 4).length
  const early = hours.filter(h => h >= 6 && h < 12).length
  const aft = hours.filter(h => h >= 12 && h < 18).length
  const eve = hours.filter(h => h >= 18 && h < 22).length
  const maxH = Math.max(night, early, aft, eve)
  let sessionStyle = "Undefined"
  if (total) {
      if (maxH === night) sessionStyle = "Night Owl 🌙"
      else if (maxH === early) sessionStyle = "Early Bird ☀️"
      else if (maxH === aft) sessionStyle = "Afternoon Creator 🌤"
      else sessionStyle = "Evening Producer 🌆"
  }

  // Primary Style
  const genres = songs.map(s => s.genre).filter(Boolean)
  const genreCounts = genres.reduce((acc, g) => { acc[g] = (acc[g] || 0) + 1; return acc }, {})
  const topGenre = Object.entries(genreCounts).sort((a,b)=>b[1]-a[1])[0]?.[0]
  
  const energies = songs.map(s => s.energy && s.energy.toLowerCase()).filter(Boolean)
  const highE = energies.filter(e => e === 'high').length
  const lowE = energies.filter(e => e === 'low').length
  const midE = energies.filter(e => e === 'medium').length

  let primaryStyle = "Eclectic Producer"
  if (topGenre) {
    primaryStyle = topGenre
  } else if (total) {
    if (highE >= lowE && highE >= midE && avgBpm > 130) primaryStyle = "High Energy Producer"
    else if (highE >= lowE && highE >= midE && avgBpm >= 100 && avgBpm <= 130) primaryStyle = "Trap / Hip-Hop"
    else if (lowE >= highE && lowE >= midE && avgBpm < 80) primaryStyle = "Ambient / Cinematic"
    else if (midE >= highE && midE >= lowE && avgBpm >= 80 && avgBpm <= 110) primaryStyle = "R&B / Soul"
  }

  // Tempo Identity
  let tempoIdentity = "Fluid"
  if (avgBpm > 0) {
    if (avgBpm < 75) tempoIdentity = "Slow Burn"
    else if (avgBpm < 95) tempoIdentity = "Mid-Tempo Groove"
    else if (avgBpm < 115) tempoIdentity = "Upbeat Flow"
    else if (avgBpm < 135) tempoIdentity = "High Drive"
    else tempoIdentity = "Full Throttle"
  }

  // Signature Key
  const keys = songs.filter(s => s.key && s.key.trim() !== '').map(s => s.key.trim())
  const keyCounts = keys.reduce((acc, k) => { acc[k] = (acc[k] || 0) + 1; return acc }, {})
  const signatureKey = Object.entries(keyCounts).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'N/A'

  // Produce Type & Streak
  let producerType = "The Explorer"
  const mostPlayedIds = [...songs].sort((a,b)=>(b.play_count||0) - (a.play_count||0))
  const topPlayCount = mostPlayedIds[0]?.play_count || 0
  
  let currentStreak = 0;
  if (total) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const dateStrs = new Set(songs.map(d => new Date(d.created_at).toISOString().slice(0, 10)))
      for (let i = 0; i <= 30; i++) {
          const checkDate = new Date(today.getTime() - i * 86400000)
          if (dateStrs.has(checkDate.toISOString().slice(0, 10))) {
              currentStreak++
          } else if (i > 0) {
              break 
          }
      }
  }

  if (completionRate > 60 && topPlayCount > 5) producerType = "The Finisher"
  else if (projects.length > 5 && completionRate < 30) producerType = "The Visionary"
  else if (sessionStyle.includes("Night Owl") && avgBpm < 90) producerType = "The Atmospherist"
  else if (avgBpm > 120 && highE >= lowE && highE >= midE) producerType = "The Energist"
  else if (currentStreak >= 3) producerType = "The Disciplined"

  return {
    primaryStyle,
    tempoIdentity,
    sessionStyle,
    completionRate,
    signatureKey,
    avgBpm,
    producerType,
    currentStreak
  }
}

function CircularScoreRing({ score }) {
  const [offset, setOffset] = useState(2 * Math.PI * 45) // initial offset full
  const radius = 45
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  
  const scoreColor =
    score >= 80 ? '#22c55e' : score >= 60 ? '#84cc16' : score >= 40 ? '#f59e0b' : '#f97316'

  useEffect(() => {
    const targetOffset = circumference - (score / 100) * circumference
    const timer = setTimeout(() => setOffset(targetOffset), 100)
    return () => clearTimeout(timer)
  }, [score, circumference])

  return (
    <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
      <svg width={radius * 2} height={radius * 2} className="transform -rotate-90">
        <circle
          cx={radius} cy={radius} r={normalizedRadius}
          fill="none" stroke="#1f1f1f" strokeWidth={stroke}
        />
        <circle
          cx={radius} cy={radius} r={normalizedRadius}
          fill="none" stroke={scoreColor} strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: scoreColor }}>{score}</span>
      </div>
    </div>
  )
}

function DNAStat({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: '10px', color: '#22c55e', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '8px', opacity: 0.8 }}>
        {label}
      </p>
      <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
        {value || 'N/A'}
      </p>
    </div>
  )
}

function Profile() {
  const [songs, setSongs] = useState([])
  const [projects, setProjects] = useState([])
  const [producerScore, setProducerScore] = useState(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (!currentUser?.uid) {
      setSongs([])
      setProjects([])
      setProducerScore(null)
      setLoading(false)
      return
    }

    setLoading(true)
    Promise.all([getSongs(), getProjects(), getProducerScore()]).then(([songData, projectData, scoreData]) => {
      setSongs(Array.isArray(songData) ? songData : [])
      setProjects(Array.isArray(projectData) ? projectData : [])
      setProducerScore(scoreData)
    }).catch(err => {
      console.error('Failed to load profile data:', err)
      toast.error('Failed to load profile')
    }).finally(() => {
      setLoading(false)
    })
  }, [currentUser?.uid])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 h-screen">
        <Spinner />
      </div>
    )
  }

  const dna = computeDNA(songs, projects)
  
  const mostPlayedSong = [...songs].sort((a, b) => (b.play_count || 0) - (a.play_count || 0))[0]
  const completedTracks = songs.filter(s => ['master', 'final', 'mix'].includes(String(s.version || '').toLowerCase())).length
  const totalSongs = songs.length
  
  const firstUploadDate = songs.length > 0 ? songs.reduce((earliest, s) => {
    const d = new Date(s.created_at)
    return d < earliest ? d : earliest
  }, new Date()) : new Date()
  
  const daysCreatingRaw = Math.max(0, Math.floor(
    (Date.now() - firstUploadDate.getTime()) / (1000 * 60 * 60 * 24)
  ))
  const daysCreating = daysCreatingRaw === 0 ? "Today" : `${daysCreatingRaw} day${daysCreatingRaw === 1 ? '' : 's'}`

  const statCardStyle = {
    background: '#181818',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '20px'
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', borderLeft: '4px solid #fff', paddingLeft: '12px' }}>
        Creative DNA Profile
      </h2>

      {/* DNA Card — full width */}
      <div style={{
        background: '#181818',
        border: '1px solid #22c55e',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: '0 0 20px rgba(34,197,94,0.08)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🧬 Your Creative DNA
        </h2>

        {/* 3-column grid for DNA stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          marginTop: '24px'
        }}>
          <DNAStat label="PRIMARY STYLE" value={dna.primaryStyle} />
          <DNAStat label="TEMPO IDENTITY" value={dna.tempoIdentity} />
          <DNAStat label="SESSION STYLE" value={dna.sessionStyle} />
          <DNAStat label="COMPLETION RATE" value={`${dna.completionRate}%`} />
          <DNAStat label="SIGNATURE KEY" value={dna.signatureKey} />
          <DNAStat label="AVG BPM" value={dna.avgBpm} />
        </div>

        {/* Producer type badge centered */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <span style={{
            background: 'transparent',
            border: '1px solid #22c55e',
            color: '#22c55e',
            padding: '8px 24px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.1em'
          }}>
            PRODUCER TYPE: {dna.producerType}
          </span>
        </div>
      </div>

      {/* Stats grid — 3 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <article style={statCardStyle} className="transition hover:bg-[#1f1f1f]">
          <p className="text-sm text-zinc-400">🎵 Total Songs</p>
          <p className="mt-2 text-xl font-semibold text-accent">{totalSongs}</p>
        </article>
        <article style={statCardStyle} className="transition hover:bg-[#1f1f1f]">
          <p className="text-sm text-zinc-400">✅ Completed Tracks</p>
          <p className="mt-2 text-xl font-semibold text-accent">{completedTracks}</p>
        </article>
        <article style={statCardStyle} className="transition hover:bg-[#1f1f1f]">
          <p className="text-sm text-zinc-400">📁 Total Projects</p>
          <p className="mt-2 text-xl font-semibold text-accent">{projects.length}</p>
        </article>
        <article style={statCardStyle} className="transition hover:bg-[#1f1f1f]">
          <p className="text-sm text-zinc-400">🔁 Most Played Track</p>
          <p className="mt-2 text-base font-semibold text-accent truncate" title={mostPlayedSong ? mostPlayedSong.title : ''}>
            {mostPlayedSong ? `${mostPlayedSong.title} (${mostPlayedSong.play_count || 0})` : 'N/A'}
          </p>
        </article>
        <article style={statCardStyle} className="transition hover:bg-[#1f1f1f]">
          <p className="text-sm text-zinc-400">📅 Days Creating</p>
          <p className="mt-2 text-xl font-semibold text-accent">{daysCreating}</p>
        </article>
        <article style={statCardStyle} className="transition hover:bg-[#1f1f1f]">
          <p className="text-sm text-zinc-400">🔥 Current Streak</p>
          <p className="mt-2 text-xl font-semibold text-accent">{dna.currentStreak} days</p>
        </article>
      </div>

      {/* Growth score — full width */}
      {producerScore?.growthScore ? (
        <div style={{
          background: '#181818',
          border: '1px solid #2a2a2a',
          borderRadius: '12px',
          padding: '28px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col items-center flex-shrink-0">
               <CircularScoreRing score={producerScore.growthScore.score} />
               <p className="mt-3 text-white font-bold">{producerScore.growthScore.label}</p>
            </div>
            
            <div className="flex-1 w-full flex flex-col gap-3">
               {producerScore.growthScore.breakdown?.map(item => (
                 <div key={item.category}>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-zinc-400">{item.category}</span>
                     <span className="text-accent font-semibold">{item.earned} / {item.max}</span>
                   </div>
                   <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                     <div
                       className="h-full rounded-full bg-accent transition-all duration-700"
                       style={{ width: `${Math.round((item.earned / item.max) * 100)}%` }}
                     />
                   </div>
                 </div>
               ))}
               <div className="mt-2 text-right">
                  <Link to="/producer" className="text-xs text-zinc-400 hover:text-white transition">
                    → View Full Analysis
                  </Link>
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="panel p-12 text-center text-zinc-500 italic">
          Complete more tracks to unlock growth score analysis.
        </div>
      )}
    </div>
  )
}

export default Profile
