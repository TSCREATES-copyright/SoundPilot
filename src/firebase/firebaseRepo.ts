import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { db } from './firebase'

type EntityName = 'songs' | 'projects' | 'lyrics'
type RepoRecord = Record<string, unknown>

interface RuleLog {
  id: string
  song_id: string
  rule_id: string
  message: string
  created_at: string
}

function nowIso() {
  return new Date().toISOString()
}

function toNumber(value: unknown, fallback = 0): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function userCollection(uid: string, entity: EntityName) {
  return collection(db, 'users', uid, entity)
}

function userDoc(uid: string, entity: EntityName, id: string) {
  return doc(db, 'users', uid, entity, id)
}

function sanitizeArrayValue(value: unknown): unknown {
  if (value === undefined) return null
  return value
}

function mapDoc<T extends RepoRecord>(entry: { id: string; data: () => RepoRecord }): T & { id: string } {
  return {
    id: entry.id,
    ...entry.data()
  } as T & { id: string }
}

async function createEntity<T extends RepoRecord>(
  uid: string,
  entity: EntityName,
  data: T
): Promise<T & { id: string }> {
  const timestamp = nowIso()
  const payload = {
    ...data,
    created_at: timestamp,
    updated_at: timestamp
  }
  const ref = await addDoc(userCollection(uid, entity), payload)
  return { id: ref.id, ...(payload as T) }
}

async function getEntities<T extends RepoRecord>(uid: string, entity: EntityName): Promise<Array<T & { id: string }>> {
  const q = query(userCollection(uid, entity), orderBy('created_at', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((entry) => mapDoc<T>(entry))
}

async function getEntityById<T extends RepoRecord>(
  uid: string,
  entity: EntityName,
  id: string
): Promise<(T & { id: string }) | null> {
  const snap = await getDoc(userDoc(uid, entity, id))
  if (!snap.exists()) return null
  return {
    id: snap.id,
    ...(snap.data() as T)
  }
}

async function updateEntity<T extends RepoRecord>(
  uid: string,
  entity: EntityName,
  id: string,
  data: T
): Promise<(T & { id: string }) | null> {
  const payload = {
    ...data,
    updated_at: nowIso()
  }
  await updateDoc(userDoc(uid, entity, id), payload)
  return getEntityById<T>(uid, entity, id)
}

async function deleteEntity(uid: string, entity: EntityName, id: string): Promise<void> {
  await deleteDoc(userDoc(uid, entity, id))
}

export async function createSong(uid: string, songData: RepoRecord) {
  const payload = {
    title: String(songData.title ?? 'Untitled'),
    version: String(songData.version ?? 'v1'),
    genre: String(songData.genre ?? ''),
    notes: String(songData.notes ?? ''),
    bpm: toNumber(songData.bpm, 0),
    key: String(songData.key ?? ''),
    energy: String(songData.energy ?? ''),
    file_path: String(songData.file_path ?? ''),
    file_name: String(songData.file_name ?? ''),
    project_id: songData.project_id ?? null,
    play_count: toNumber(songData.play_count, 0),
    tags: Array.isArray(songData.tags) ? songData.tags.map((v) => String(v)) : []
  }

  return createEntity(uid, 'songs', payload)
}

export async function getSongs(uid: string) {
  return getEntities(uid, 'songs')
}

export async function updateSong(uid: string, songId: string, data: RepoRecord) {
  const payload: RepoRecord = {}
  for (const [key, value] of Object.entries(data)) {
    payload[key] = sanitizeArrayValue(value)
  }
  return updateEntity(uid, 'songs', songId, payload)
}

export async function deleteSong(uid: string, songId: string) {
  await deleteEntity(uid, 'songs', songId)
}

export async function createProject(uid: string, data: RepoRecord) {
  const payload = {
    title: String(data.title ?? 'Untitled Project'),
    status: String(data.status ?? 'active')
  }
  return createEntity(uid, 'projects', payload)
}

export async function getProjects(uid: string) {
  return getEntities(uid, 'projects')
}

export async function updateProject(uid: string, id: string, data: RepoRecord) {
  return updateEntity(uid, 'projects', id, data)
}

export async function deleteProject(uid: string, id: string) {
  await deleteEntity(uid, 'projects', id)
}

interface LyricSection {
  id: string
  section_type: string
  position: number
  content: string
}

export async function createLyrics(uid: string, data: RepoRecord) {
  const payload = {
    title: String(data.title ?? 'Untitled Draft'),
    structure: String(data.structure ?? 'verse-chorus'),
    song_id: data.song_id ?? null,
    status: String(data.status ?? 'draft'),
    sections: Array.isArray(data.sections) ? data.sections : []
  }
  return createEntity(uid, 'lyrics', payload)
}

export async function getLyrics(uid: string) {
  return getEntities(uid, 'lyrics')
}

export async function getLyricsById(uid: string, id: string) {
  return getEntityById(uid, 'lyrics', id)
}

export async function updateLyrics(uid: string, id: string, data: RepoRecord) {
  return updateEntity(uid, 'lyrics', id, data)
}

export async function deleteLyrics(uid: string, id: string) {
  await deleteEntity(uid, 'lyrics', id)
}

export async function addLyricSection(
  uid: string,
  lyricId: string,
  data: { section_type: string; position?: number; content?: string }
) {
  const lyric = await getLyricsById(uid, lyricId)
  if (!lyric) return null

  const sections = Array.isArray(lyric.sections) ? (lyric.sections as LyricSection[]) : []
  const newSection: LyricSection = {
    id: crypto.randomUUID(),
    section_type: data.section_type,
    position: typeof data.position === 'number' ? data.position : sections.length,
    content: data.content ?? ''
  }

  const nextSections = [...sections, newSection].sort((a, b) => a.position - b.position)
  await updateLyrics(uid, lyricId, { sections: nextSections })
  return newSection
}

export async function updateLyricSection(uid: string, sectionId: string, data: RepoRecord) {
  const lyrics = await getLyrics(uid)
  const draft = lyrics.find((item) =>
    Array.isArray(item.sections) && item.sections.some((section: LyricSection) => section.id === sectionId)
  )

  if (!draft) return null

  const nextSections = (draft.sections as LyricSection[]).map((section) =>
    section.id === sectionId
      ? {
          ...section,
          ...data
        }
      : section
  )

  await updateLyrics(uid, draft.id, { sections: nextSections })
  return nextSections.find((section) => section.id === sectionId) ?? null
}

export async function deleteLyricSection(uid: string, sectionId: string) {
  const lyrics = await getLyrics(uid)
  const draft = lyrics.find((item) =>
    Array.isArray(item.sections) && item.sections.some((section: LyricSection) => section.id === sectionId)
  )

  if (!draft) return false

  const nextSections = (draft.sections as LyricSection[]).filter((section) => section.id !== sectionId)
  await updateLyrics(uid, draft.id, { sections: nextSections })
  return true
}

function buildRuleLogsFromSongs(songs: Array<RepoRecord & { id: string }>): RuleLog[] {
  const logs: RuleLog[] = []
  const now = nowIso()
  const titleCounts = new Map<string, number>()

  for (const song of songs) {
    const title = String(song.title ?? '').trim().toLowerCase()
    if (title) titleCounts.set(title, (titleCounts.get(title) ?? 0) + 1)
  }

  for (const song of songs) {
    const songId = song.id
    const title = String(song.title ?? 'Untitled')
    const bpm = toNumber(song.bpm, 0)
    const genre = String(song.genre ?? '').trim()
    const version = String(song.version ?? '').toLowerCase()
    const energy = String(song.energy ?? '').toLowerCase()

    if (!genre) {
      logs.push({
        id: `${songId}-no-genre`,
        song_id: songId,
        rule_id: 'no_genre',
        message: `"${title}" has no genre tag yet.`,
        created_at: now
      })
    }

    if (bpm > 0 && bpm < 85) {
      logs.push({
        id: `${songId}-slow-bpm`,
        song_id: songId,
        rule_id: 'slow_bpm',
        message: `"${title}" is in a slower BPM pocket (${bpm}).`,
        created_at: now
      })
    }

    if (bpm > 135) {
      logs.push({
        id: `${songId}-fast-bpm`,
        song_id: songId,
        rule_id: 'fast_bpm',
        message: `"${title}" is a high-tempo track (${bpm}).`,
        created_at: now
      })
    }

    if (version === 'v1' || version === 'demo') {
      logs.push({
        id: `${songId}-version-pattern`,
        song_id: songId,
        rule_id: 'version_pattern',
        message: `"${title}" is still in an early draft version.`,
        created_at: now
      })
    }

    if (titleCounts.get(title.toLowerCase()) && (titleCounts.get(title.toLowerCase()) ?? 0) > 1) {
      logs.push({
        id: `${songId}-duplicate-title`,
        song_id: songId,
        rule_id: 'duplicate_title',
        message: `Duplicate title detected for "${title}".`,
        created_at: now
      })
    }

    if (energy === 'high') {
      logs.push({
        id: `${songId}-energy-high`,
        song_id: songId,
        rule_id: 'energy_high',
        message: `"${title}" has high-energy characteristics.`,
        created_at: now
      })
    }

    if (energy === 'low') {
      logs.push({
        id: `${songId}-energy-low`,
        song_id: songId,
        rule_id: 'energy_low',
        message: `"${title}" has low-energy characteristics.`,
        created_at: now
      })
    }
  }

  return logs
}

function growthBreakdown(songs: Array<RepoRecord & { id: string }>, projects: Array<RepoRecord & { id: string }>) {
  const totalSongs = songs.length
  const completed = songs.filter((song) =>
    ['final', 'master', 'mix', 'complete'].includes(String(song.version ?? '').toLowerCase())
  ).length
  const completionPct = totalSongs > 0 ? Math.round((completed / totalSongs) * 100) : 0
  const hasProjects = projects.length > 0 ? Math.min(100, projects.length * 10) : 0
  const consistency = Math.min(100, totalSongs * 8)

  const breakdown = [
    { category: 'Consistency', earned: consistency, max: 100 },
    { category: 'Completion', earned: completionPct, max: 100 },
    { category: 'Organization', earned: hasProjects, max: 100 }
  ]

  const score = Math.round(
    breakdown.reduce((sum, item) => sum + item.earned, 0) / Math.max(1, breakdown.length)
  )

  let label = 'Early Stage'
  if (score >= 80) label = 'Pro Momentum'
  else if (score >= 60) label = 'Solid Growth'
  else if (score >= 40) label = 'Building Consistency'

  return { score, label, breakdown }
}

export async function getRuleLogs(uid: string) {
  const songs = await getSongs(uid)
  return buildRuleLogsFromSongs(songs)
}

export async function getRuleNotifications(uid: string) {
  const logs = await getRuleLogs(uid)
  return logs.slice(0, 8).map((log, index) => ({
    id: log.id,
    priority: index % 3 === 0 ? 1 : 2,
    message: log.message,
    action: { label: 'Open Library', link: '/library' },
    created_at: log.created_at
  }))
}

export async function getProducerScore(uid: string) {
  const [songs, projects] = await Promise.all([getSongs(uid), getProjects(uid)])
  const growthScore = growthBreakdown(songs, projects)
  return { growthScore }
}

export async function getProducerReport(uid: string) {
  const [songs, projects] = await Promise.all([getSongs(uid), getProjects(uid)])
  const score = await getProducerScore(uid)

  const bpmSongs = songs.filter((song) => toNumber(song.bpm, 0) > 0)
  const avgBpm =
    bpmSongs.length > 0
      ? Math.round(bpmSongs.reduce((sum, song) => sum + toNumber(song.bpm, 0), 0) / bpmSongs.length)
      : 0

  const genreCounts = songs.reduce<Record<string, number>>((acc, song) => {
    const genre = String(song.genre ?? '').trim()
    if (!genre) return acc
    acc[genre] = (acc[genre] ?? 0) + 1
    return acc
  }, {})

  const topGenre =
    Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Multi-Genre'

  const patterns = [
    {
      type: 'workflow',
      label: 'Project Discipline',
      insight:
        projects.length > 0
          ? `You are maintaining ${projects.length} active project spaces.`
          : 'Create a project to start organizing your session pipeline.',
      confidence: Math.min(95, 30 + projects.length * 8)
    },
    {
      type: 'sonic',
      label: 'Tempo Identity',
      insight: avgBpm > 0 ? `Your average tempo is ${avgBpm} BPM.` : 'No tempo data yet.',
      confidence: bpmSongs.length > 0 ? 80 : 35
    }
  ]

  const timeline = songs.slice(0, 8).map((song) => ({
    date: String(song.created_at ?? nowIso()),
    event: 'Song added',
    details: `${song.title ?? 'Untitled'} (${song.version ?? 'v1'})`
  }))

  return {
    snapshot: {
      totalSongs: songs.length,
      avgBpm,
      topGenre,
      patterns,
      timeline
    },
    score
  }
}

export async function getPlugins() {
  return [
    {
      name: 'Core Pattern Plugin',
      version: '1.0.0',
      ruleCount: 3,
      rules: [
        { trigger: 'no_genre', message: 'Prompt for genre tagging when missing.' },
        { trigger: 'version_pattern', message: 'Encourage finishing draft tracks.' },
        { trigger: 'energy_high', message: 'Surface high-energy sessions for review.' }
      ]
    }
  ]
}

export async function ensureUserProfile(uid: string, data: RepoRecord) {
  await setDoc(doc(db, 'users', uid), data, { merge: true })
}
