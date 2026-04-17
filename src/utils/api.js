import { auth } from '../firebase/firebase'
import {
  addLyricSection as repoAddLyricSection,
  createLyrics as repoCreateLyrics,
  createProject as repoCreateProject,
  createSong as repoCreateSong,
  deleteLyrics as repoDeleteLyrics,
  deleteLyricSection as repoDeleteLyricSection,
  deleteProject as repoDeleteProject,
  deleteSong as repoDeleteSong,
  getLyrics as repoGetLyrics,
  getLyricsById as repoGetLyricsById,
  getPlugins as repoGetPlugins,
  getProducerReport as repoGetProducerReport,
  getProducerScore as repoGetProducerScore,
  getProjects as repoGetProjects,
  getRuleLogs as repoGetRuleLogs,
  getRuleNotifications as repoGetRuleNotifications,
  getSongs as repoGetSongs,
  updateLyrics as repoUpdateLyrics,
  updateLyricSection as repoUpdateLyricSection,
  updateProject as repoUpdateProject,
  updateSong as repoUpdateSong
} from '../firebase/firebaseRepo'

function currentUid() {
  return auth.currentUser?.uid ?? null
}

function nowIso() {
  return new Date().toISOString()
}

function parseJsonArray(input) {
  if (Array.isArray(input)) return input
  if (typeof input === 'string') {
    try {
      const parsed = JSON.parse(input)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  return []
}

function countSyllables(word) {
  const cleaned = String(word || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
  if (!cleaned) return 0
  const matches = cleaned.match(/[aeiouy]+/g)
  return Math.max(1, matches ? matches.length : 1)
}

function lineEndingWord(line) {
  const words = String(line || '')
    .trim()
    .split(/\s+/)
  return words.length > 0 ? words[words.length - 1].replace(/[^a-z0-9]/gi, '').toLowerCase() : ''
}

function normalizeSong(song) {
  return {
    ...song,
    tags: Array.isArray(song.tags) ? song.tags : parseJsonArray(song.tags),
    play_count: Number(song.play_count || 0),
    created_at: song.created_at || nowIso(),
    updated_at: song.updated_at || song.created_at || nowIso()
  }
}

function toSongTags(song) {
  const tags = []
  const bpm = Number(song.bpm || 0)
  if (bpm > 0 && bpm < 85) tags.push('slow')
  if (bpm > 135) tags.push('fast')
  if (!song.genre) tags.push('untagged')
  if (['v1', 'demo'].includes(String(song.version || '').toLowerCase())) tags.push('unfinished')
  if (String(song.energy || '').toLowerCase() === 'high') tags.push('high-energy')
  return tags
}

// ============================
// SONGS
// ============================
export const getSongsSafe = async () => {
  const uid = currentUid()
  if (!uid) return []
  const songs = await repoGetSongs(uid)
  return songs.map((song) => normalizeSong(song))
}

export const getSongs = getSongsSafe

export const uploadSong = async (formData) => {
  const uid = currentUid()
  if (!uid) {
    throw new Error('You must be signed in to upload songs.')
  }

  const file = formData.get('audio')
  const localUrl = file instanceof File ? URL.createObjectURL(file) : ''
  const createdSong = await repoCreateSong(uid, {
    title: String(formData.get('title') || 'Untitled'),
    version: String(formData.get('version') || 'v1'),
    genre: String(formData.get('genre') || ''),
    notes: String(formData.get('notes') || ''),
    bpm: Number(formData.get('bpm') || 0),
    key: String(formData.get('key') || ''),
    energy: String(formData.get('energy') || ''),
    file_path: localUrl,
    file_name: file instanceof File ? file.name : '',
    play_count: 0,
    tags: []
  })

  const normalizedSong = normalizeSong(createdSong)
  const autoTags = toSongTags(normalizedSong)
  const savedSong = await repoUpdateSong(uid, normalizedSong.id, { tags: autoTags })

  const alerts = autoTags.map((tag) => ({
    id: `${normalizedSong.id}-${tag}`,
    message: `Detected tag: ${tag}`,
    created_at: nowIso()
  }))

  return { song: normalizeSong(savedSong ?? normalizedSong), alerts }
}

export const playSong = async (id) => {
  const uid = currentUid()
  if (!uid) return null
  const songs = await repoGetSongs(uid)
  const song = songs.find((entry) => entry.id === id)
  if (!song) return null

  const playCount = Number(song.play_count || 0) + 1
  const updated = await repoUpdateSong(uid, id, { play_count: playCount })
  return normalizeSong(updated ?? { ...song, play_count: playCount })
}

export const updateSong = async (id, data) => {
  const uid = currentUid()
  if (!uid) return null
  const updated = await repoUpdateSong(uid, id, data)
  return updated ? normalizeSong(updated) : null
}

export const deleteSong = async (id) => {
  const uid = currentUid()
  if (!uid) return { success: false, error: 'Not authenticated' }
  await repoDeleteSong(uid, id)
  return { success: true }
}

// ============================
// PROJECTS
// ============================
export const getProjectsSafe = async () => {
  const uid = currentUid()
  if (!uid) return []
  return repoGetProjects(uid)
}

export const getProjects = getProjectsSafe

export const createProject = async (data) => {
  const uid = currentUid()
  if (!uid) throw new Error('You must be signed in to create projects.')
  return repoCreateProject(uid, data)
}

export const updateProject = async (id, data) => {
  const uid = currentUid()
  if (!uid) return null
  return repoUpdateProject(uid, id, data)
}

export const deleteProject = async (id) => {
  const uid = currentUid()
  if (!uid) return
  await repoDeleteProject(uid, id)
}

// ============================
// RULES
// ============================
export const getRuleLogs = async () => {
  const uid = currentUid()
  if (!uid) return []
  return repoGetRuleLogs(uid)
}

export const getRuleNotifications = async () => {
  const uid = currentUid()
  if (!uid) return []
  return repoGetRuleNotifications(uid)
}

// ============================
// PROJECT SONGS
// ============================
export const getProjectSongs = async (id) => {
  const songs = await getSongsSafe()
  return songs.filter((song) => song.project_id === id)
}

export const addSongToProject = async (id, song_id) => updateSong(song_id, { project_id: id })

export const removeSongFromProject = async (_id, songId) => updateSong(songId, { project_id: null })

// ============================
// PRODUCER
// ============================
export const getProducerReport = async () => {
  const uid = currentUid()
  if (!uid) return null
  return repoGetProducerReport(uid)
}

export const getProducerPatterns = async () => {
  const report = await getProducerReport()
  return report?.snapshot?.patterns ?? []
}

export const getProducerScore = async () => {
  const uid = currentUid()
  if (!uid) return null
  return repoGetProducerScore(uid)
}

export const getProducerFeed = async () => {
  const logs = await getRuleLogs()
  return logs.slice(0, 12)
}

export const getProducerTimeline = async () => {
  const report = await getProducerReport()
  return report?.snapshot?.timeline ?? []
}

export const getPlugins = async () => repoGetPlugins()

// ============================
// LYRICS
// ============================
export const getLyricDrafts = async () => {
  const uid = currentUid()
  if (!uid) return []
  const drafts = await repoGetLyrics(uid)
  return drafts.map((draft) => ({
    ...draft,
    sections: Array.isArray(draft.sections) ? draft.sections : [],
    created_at: draft.created_at || nowIso(),
    updated_at: draft.updated_at || draft.created_at || nowIso()
  }))
}

export const createLyricDraft = async (data) => {
  const uid = currentUid()
  if (!uid) throw new Error('You must be signed in to create lyric drafts.')
  const created = await repoCreateLyrics(uid, {
    title: data.title,
    structure: data.structure,
    song_id: data.song_id ?? null,
    status: 'draft',
    sections: []
  })
  return {
    ...created,
    sections: [],
    created_at: created.created_at || nowIso(),
    updated_at: created.updated_at || created.created_at || nowIso()
  }
}

export const getLyricDraft = async (id) => {
  const uid = currentUid()
  if (!uid) return null
  const draft = await repoGetLyricsById(uid, id)
  if (!draft) return null
  return {
    ...draft,
    sections: Array.isArray(draft.sections) ? draft.sections : []
  }
}

export const updateLyricDraft = async (id, data) => {
  const uid = currentUid()
  if (!uid) return null
  return repoUpdateLyrics(uid, id, data)
}

export const deleteLyricDraft = async (id) => {
  const uid = currentUid()
  if (!uid) return
  await repoDeleteLyrics(uid, id)
}

export const addLyricSection = async (draftId, data) => {
  const uid = currentUid()
  if (!uid) return null
  return repoAddLyricSection(uid, draftId, data)
}

export const updateLyricSection = async (sectionId, data) => {
  const uid = currentUid()
  if (!uid) return null
  return repoUpdateLyricSection(uid, sectionId, data)
}

export const deleteLyricSection = async (sectionId) => {
  const uid = currentUid()
  if (!uid) return false
  return repoDeleteLyricSection(uid, sectionId)
}

// ============================
// LYRICS TOOLS (LOCAL)
// ============================
export const getRhymes = async (word) => {
  const base = String(word || '').trim().toLowerCase()
  if (!base) return { perfect: [], near: [], slant: [] }
  const tail = base.slice(-2)
  const library = ['fire', 'desire', 'higher', 'wire', 'light', 'night', 'flight', 'glow', 'slow', 'show']

  const candidates = library.filter((item) => item !== base)
  const perfect = candidates
    .filter((item) => item.endsWith(tail))
    .slice(0, 8)
    .map((item) => ({ word: item, syllables: countSyllables(item) }))
  const near = candidates
    .filter((item) => item.includes(base.slice(-1)))
    .slice(0, 8)
    .map((item) => ({ word: item, syllables: countSyllables(item) }))
  const slant = candidates
    .slice(0, 8)
    .map((item) => ({ word: item, syllables: countSyllables(item) }))

  return { perfect, near, slant }
}

export const getSyllables = async (text) => {
  const lines = String(text || '').split('\n')
  return lines.map((line) =>
    line
      .split(/\s+/)
      .filter(Boolean)
      .reduce((sum, word) => sum + countSyllables(word), 0)
  )
}

const promptsByType = {
  verse: ['Tell a memory in one vivid scene.', 'Use concrete nouns over abstract ideas.'],
  chorus: ['State the emotional thesis in one line.', 'Repeat one phrase with variation.'],
  bridge: ['Introduce a twist in perspective.', 'Raise emotional stakes for final chorus.'],
  hook: ['Use short words and strong rhythm.', 'Keep melody and phrase simple.'],
  default: ['Describe a moment with one sensory detail.', 'Write one line you can sing twice.']
}

export const getWritingPrompts = async (type) => {
  const key = String(type || '').toLowerCase()
  return promptsByType[key] ?? promptsByType.default
}

export const analyzeLyrics = async (text) => {
  const lines = String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const seen = new Map()
  let letterCode = 65
  const pattern = lines.map((line) => {
    const ending = lineEndingWord(line)
    if (!ending) return '-'
    if (!seen.has(ending)) {
      seen.set(ending, String.fromCharCode(letterCode))
      letterCode += 1
    }
    return seen.get(ending)
  })

  return { scheme: pattern.join('') || '' }
}
