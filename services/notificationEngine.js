function generateNotifications(db) {
  const notifications = []
  const songs = db.prepare('SELECT * FROM songs ORDER BY created_at DESC').all()
  const projects = db.prepare('SELECT * FROM projects').all()
  const projectSongs = db.prepare('SELECT * FROM project_songs').all()
  const now = Date.now()

  // 1. Dry spell — no upload in 14 days
  if (songs.length > 0) {
    const lastUpload = new Date(songs[0].created_at).getTime()
    if (now - lastUpload > 14 * 86400000) {
      notifications.push({
        id: 'dry_spell',
        type: 'warning',
        message: 'It has been 14 days since your last upload.',
        priority: 1,
        action: { label: 'Go to Upload', link: '/' }
      })
    }
  }

  // 2. Unfinished project nudge — project > 7 days old with < 2 songs
  projects.forEach(p => {
    if (p.status === 'complete') return
    const age = now - new Date(p.created_at).getTime()
    if (age > 7 * 86400000) {
      const pSongCount = projectSongs.filter(ps => ps.project_id === p.id).length
      if (pSongCount < 2) {
        notifications.push({
          id: `unfin_proj_${p.id}`,
          type: 'insight',
          message: `Project ${p.name} is over a week old with only ${pSongCount} tracks. Keep building.`,
          priority: 2,
          action: { label: 'View Project', link: `/projects?id=${p.id}` }
        })
      }
    }
  })

  // 3. Hidden gem — song with play_count > 7 not in any project
  songs.forEach(s => {
    if (s.play_count > 7) {
      const inProject = projectSongs.some(ps => ps.song_id === s.id)
      if (!inProject) {
        notifications.push({
          id: `hidden_gem_${s.id}`,
          type: 'suggestion',
          message: `"${s.title}" has ${s.play_count} plays but isn't part of any project. Give it a home.`,
          priority: 2,
          action: { label: 'View Library', link: '/library' }
        })
      }
    }
  })

  // 4. Milestone celebration — every 5th song uploaded
  if (songs.length > 0 && songs.length % 5 === 0) {
    notifications.push({
      id: `milestone_${songs.length}`,
      type: 'insight',
      message: `Milestone! You just hit ${songs.length} total tracks in your catalog.`,
      priority: 3,
      action: { label: 'View Library', link: '/library' }
    })
  }

  // 5. Streak detection — 3+ uploads in 7 days
  const uploadsLast7 = songs.filter(s => (now - new Date(s.created_at).getTime()) <= 7 * 86400000).length
  if (uploadsLast7 >= 3) {
    notifications.push({
      id: 'streak_7',
      type: 'insight',
      message: `You're on fire! ${uploadsLast7} uploads in the last week.`,
      priority: 3,
      action: { label: 'View Stats', link: '/producer' }
    })
  }

  // 6. Demo overload — more than 5 songs still at v1 with no progression
  const demos = songs.filter(s => ['v1', 'demo', 'rough'].includes(String(s.version || '').toLowerCase()))
  if (demos.length > 5) {
    notifications.push({
      id: 'demo_overload',
      type: 'warning',
      message: `You have ${demos.length} demos building up. Pick one this week and push it.`,
      priority: 1,
      action: { label: 'View Demos', link: '/library' }
    })
  }

  return notifications.sort((a, b) => a.priority - b.priority)
}

module.exports = { generateNotifications }
