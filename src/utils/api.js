// ============================
// API BASE (Render backend)
// ============================
export const API_BASE =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV
    ? 'http://localhost:3001'
    : 'https://soundpilot.onrender.com')

if (!API_BASE) {
  throw new Error('API_BASE is not defined. Check VITE_API_URL env variable.')
}

// ============================
// SAFE FETCH WRAPPER
// prevents JSON crash from HTML 404 pages
// ============================
async function safeFetch(url, options) {
  try {
    const res = await fetch(`${API_BASE}${url}`, options)

    const text = await res.text()

    if (!res.ok) {
      console.error('API Error:', url, res.status, text)
      return null
    }

    try {
      return JSON.parse(text)
    } catch {
      console.error('Invalid JSON:', url, text)
      return null
    }

  } catch (err) {
    console.error('Network error:', url, err)
    return null
  }
}

// ============================
// SONGS
// ============================
export const getSongs = async () =>
  (await safeFetch('/api/songs')) ?? []

export const uploadSong = (formData) =>
  safeFetch('/api/songs/upload', {
    method: 'POST',
    body: formData
  })

export const playSong = (id) =>
  safeFetch(`/api/songs/${id}/play`, { method: 'POST' })

export const updateSong = (id, data) =>
  safeFetch(`/api/songs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

export const deleteSong = (id) =>
  safeFetch(`/api/songs/${id}`, { method: 'DELETE' })

// ============================
// PROJECTS
// ============================
export const getProjects = async () =>
  (await safeFetch('/api/projects')) ?? []

export const createProject = (data) =>
  safeFetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

export const updateProject = (id, data) =>
  safeFetch(`/api/projects/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

export const deleteProject = (id) =>
  safeFetch(`/api/projects/${id}`, { method: 'DELETE' })

// ============================
// RULES
// ============================
export const getRuleLogs = async () =>
  (await safeFetch('/api/rules/logs')) ?? []

export const getRuleNotifications = async () =>
  (await safeFetch('/api/rules/notifications')) ?? []

// ============================
// PROJECT SONGS
// ============================
export const getProjectSongs = async (id) =>
  (await safeFetch(`/api/projects/${id}/songs`)) ?? []

export const addSongToProject = (id, song_id) =>
  safeFetch(`/api/projects/${id}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ song_id })
  })

export const removeSongFromProject = (id, songId) =>
  safeFetch(`/api/projects/${id}/songs/${songId}`, {
    method: 'DELETE'
  })

// ============================
// PRODUCER
// ============================
export const getProducerReport = () =>
  safeFetch('/api/producer/report')

export const getProducerPatterns = () =>
  safeFetch('/api/producer/patterns')

export const getProducerScore = () =>
  safeFetch('/api/producer/score')

export const getProducerFeed = () =>
  safeFetch('/api/producer/feed')

export const getProducerTimeline = () =>
  safeFetch('/api/producer/timeline')

export const getPlugins = () =>
  safeFetch('/api/producer/plugins')

// ============================
// LYRICS
// ============================
export const getLyricDrafts = async () =>
  (await safeFetch('/api/lyrics')) ?? []

export const createLyricDraft = (data) =>
  safeFetch('/api/lyrics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

export const getLyricDraft = (id) =>
  safeFetch(`/api/lyrics/${id}`)

export const updateLyricDraft = (id, data) =>
  safeFetch(`/api/lyrics/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

export const deleteLyricDraft = (id) =>
  safeFetch(`/api/lyrics/${id}`, { method: 'DELETE' })

export const addLyricSection = (draftId, data) =>
  safeFetch(`/api/lyrics/${draftId}/sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

export const updateLyricSection = (sectionId, data) =>
  safeFetch(`/api/lyrics/sections/${sectionId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

export const deleteLyricSection = (sectionId) =>
  safeFetch(`/api/lyrics/sections/${sectionId}`, { method: 'DELETE' })

// ============================
// LYRICS TOOLS
// ============================
export const getRhymes = (word) =>
  safeFetch(`/api/lyrics/tools/rhyme?word=${encodeURIComponent(word)}`)

export const getSyllables = (text) =>
  safeFetch(`/api/lyrics/tools/syllables?text=${encodeURIComponent(text)}`)

export const getWritingPrompts = (type) =>
  safeFetch(`/api/lyrics/tools/prompts?type=${encodeURIComponent(type)}`)

export const analyzeLyrics = (text) =>
  safeFetch('/api/lyrics/tools/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
