export const getSongs = () => fetch('/api/songs').then((r) => r.json())
export const uploadSong = (formData) =>
  fetch('/api/songs/upload', { method: 'POST', body: formData }).then((r) => r.json())
export const playSong = (id) => fetch(`/api/songs/${id}/play`, { method: 'POST' }).then((r) => r.json())
export const updateSong = (id, data) =>
  fetch(`/api/songs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((r) => r.json())
export const deleteSong = (id) =>
  fetch(`/api/songs/${id}`, { method: 'DELETE' }).then(r => r.json())

export const getProjects = () => fetch('/api/projects').then((r) => r.json())
export const createProject = (data) =>
  fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((r) => r.json())
export const updateProject = (id, data) =>
  fetch(`/api/projects/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then((r) => r.json())
export const deleteProject = (id) =>
  fetch(`/api/projects/${id}`, {
    method: 'DELETE'
  }).then((r) => r.json())

export const getRuleLogs = () => fetch('/api/rules/logs').then((r) => r.json())
export const getProjectSongs = (id) => fetch(`/api/projects/${id}/songs`).then((r) => r.json())
export const addSongToProject = (id, song_id) =>
  fetch(`/api/projects/${id}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ song_id })
  }).then((r) => r.json())
export const removeSongFromProject = (id, songId) =>
  fetch(`/api/projects/${id}/songs/${songId}`, {
    method: 'DELETE'
  }).then((r) => r.json())

export const getProducerReport = () => fetch('/api/producer/report').then((r) => r.json())
export const getProducerPatterns = () => fetch('/api/producer/patterns').then((r) => r.json())
export const getProducerScore = () => fetch('/api/producer/score').then((r) => r.json())
export const getProducerFeed = () => fetch('/api/producer/feed').then((r) => r.json())
export const getProducerTimeline = () => fetch('/api/producer/timeline').then((r) => r.json())

export const getLyricDrafts = () =>
  fetch('/api/lyrics').then(r => r.json())

export const createLyricDraft = (data) =>
  fetch('/api/lyrics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json())

export const getLyricDraft = (id) =>
  fetch(`/api/lyrics/${id}`).then(r => r.json())

export const updateLyricDraft = (id, data) =>
  fetch(`/api/lyrics/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json())

export const deleteLyricDraft = (id) =>
  fetch(`/api/lyrics/${id}`, { method: 'DELETE' }).then(r => r.json())

export const addLyricSection = (draftId, data) =>
  fetch(`/api/lyrics/${draftId}/sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json())

export const updateLyricSection = (sectionId, data) =>
  fetch(`/api/lyrics/sections/${sectionId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json())

export const deleteLyricSection = (sectionId) =>
  fetch(`/api/lyrics/sections/${sectionId}`, {
    method: 'DELETE'
  }).then(r => r.json())

export const getRhymes = (word) =>
  fetch(`/api/lyrics/tools/rhyme?word=${encodeURIComponent(word)}`).then(r => r.json())

export const getSyllables = (text) =>
  fetch(`/api/lyrics/tools/syllables?text=${encodeURIComponent(text)}`).then(r => r.json())

export const getWritingPrompts = (type) =>
  fetch(`/api/lyrics/tools/prompts?type=${encodeURIComponent(type)}`).then(r => r.json())

export const getPlugins = () =>
  fetch('/api/producer/plugins').then(r => r.json())
