import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useToast } from '../components/ToastProvider'
import { usePlayer } from '../context/PlayerContext'
import { getRuleLogs, getSongs, playSong, updateSong, deleteSong } from '../utils/api'
import { useAuth } from '../auth/hooks/useAuth'

const versionOptions = ['v1', 'Demo', 'Master', 'Mix', 'Final']

const tagMap = {
  slow_bpm: { text: '💡 Slow tempo', icon: '💡', style: 'bg-blue-500/20 text-blue-200 border-blue-500/30' },
  fast_bpm: { text: '💡 Fast tempo', icon: '💡', style: 'bg-blue-500/20 text-blue-200 border-blue-500/30' },
  no_genre: { text: '⚠️ No genre', icon: '⚠️', style: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30' },
  version_pattern: { text: '⚠️ Draft track', icon: '⚠️', style: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30' },
  duplicate_title: { text: '⚠️ Duplicate', icon: '⚠️', style: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30' },
  prolific_streak: { text: '🔥 Streak', icon: '🔥', style: 'bg-rose-500/20 text-rose-200 border-rose-500/30' },
  dormancy_alert: { text: '💡 Comeback', icon: '💡', style: 'bg-blue-500/20 text-blue-200 border-blue-500/30' },
  replay_insight: { text: '🔥 Replay fav', icon: '🔥', style: 'bg-rose-500/20 text-rose-200 border-rose-500/30' },
  replay_obsession: { text: '🔥 Obsession', icon: '🔥', style: 'bg-rose-500/20 text-rose-200 border-rose-500/30' },
  unfinished_projects: { text: '💡 Empty project', icon: '💡', style: 'bg-blue-500/20 text-blue-200 border-blue-500/30' },
  energy_high: { text: '🔥 High energy', icon: '🔥', style: 'bg-rose-500/20 text-rose-200 border-rose-500/30' },
  energy_low: { text: '💡 Low energy', icon: '💡', style: 'bg-blue-500/20 text-blue-200 border-blue-500/30' },
  mid_tempo: { text: '💡 Mid tempo', icon: '💡', style: 'bg-blue-500/20 text-blue-200 border-blue-500/30' }
}

function getEnergyColor(e) {
  const v = String(e || '').toLowerCase()
  if (v === 'high') return 'bg-red-500/20 text-red-400'
  if (v === 'medium') return 'bg-yellow-500/20 text-yellow-400'
  if (v === 'low') return 'bg-blue-500/20 text-blue-400'
  return 'bg-zinc-800 text-zinc-400'
}

function formatDate(ds) {
  const d = new Date(ds)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function parseSearchQuery(query) {
  const filters = {}
  const textParts = []

  query.trim().split(/\s+/).forEach(token => {
    const [key, val] = token.split(':')
    if (val !== undefined) {
      filters[key.toLowerCase()] = val.toLowerCase()
    } else {
      textParts.push(token.toLowerCase())
    }
  })

  return { text: textParts.join(' '), filters }
}

function applyFilters(songs, { text, filters }) {
  return songs.filter(song => {
    if (text && !song.title.toLowerCase().includes(text)) return false

    if (filters.bpm) {
      const bpm = song.bpm || 0
      if (filters.bpm.includes('-')) {
        const [min, max] = filters.bpm.split('-').map(Number)
        if (bpm < min || bpm > max) return false
      } else if (filters.bpm.startsWith('>')) {
        if (bpm <= Number(filters.bpm.slice(1))) return false
      } else if (filters.bpm.startsWith('<')) {
        if (bpm >= Number(filters.bpm.slice(1))) return false
      } else if (Number(filters.bpm) === bpm) {
         // exact match if no range or comparator
      } else if (!isNaN(filters.bpm)) {
         if (bpm !== Number(filters.bpm)) return false
      }
    }

    if (filters.energy && song.energy?.toLowerCase() !== filters.energy) return false
    if (filters.key && !song.key?.toLowerCase().includes(filters.key)) return false
    if (filters.genre && !song.genre?.toLowerCase().includes(filters.genre)) return false
    if (filters.version && song.version?.toLowerCase() !== filters.version) return false
    if (filters.unfinished === 'true') {
      if (!['v1','demo'].includes(song.version?.toLowerCase())) return false
    }
    if (filters.tag) {
      const tags = JSON.parse(song.tags || '[]')
      if (!tags.includes(filters.tag)) return false
    }

    return true
  })
}

function Library() {
  const [songs, setSongs] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [savedRowId, setSavedRowId] = useState(null)
  const [highlightSongId, setHighlightSongId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const rowRefs = useRef({})
  const [searchParams, setSearchParams] = useSearchParams()
  const toast = useToast()
  const { loadSong } = usePlayer()
  const { currentUser } = useAuth()

  const loadData = async () => {
    if (!currentUser?.uid) {
      setSongs([])
      setLogs([])
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const [songData, logData] = await Promise.all([getSongs(), getRuleLogs()])
      setSongs(Array.isArray(songData) ? songData : [])
      setLogs(Array.isArray(logData) ? logData : [])
    } catch (err) {
      console.error('Failed to load library data:', err)
      toast.error('Failed to load songs')
      setSongs([])
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [currentUser?.uid])

  useEffect(() => {
    if (!songs.length) return
    const highlight = Number(searchParams.get('highlight'))
    if (!highlight) return
    const row = rowRefs.current[highlight]
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setHighlightSongId(highlight)
      setTimeout(() => setHighlightSongId(null), 2000)
    }
    const updated = new URLSearchParams(searchParams)
    updated.delete('highlight')
    setSearchParams(updated, { replace: true })
  }, [songs, searchParams, setSearchParams])

  const tagsBySong = useMemo(() => {
    const map = new Map()
    for (const log of logs) {
      const songId = log.song_id
      if (!songId || !tagMap[log.rule_id]) continue
      const list = map.get(songId) || []
      const tag = tagMap[log.rule_id]
      if (!list.find((item) => item.text === tag.text)) {
        list.push(tag)
      }
      map.set(songId, list)
    }
    return map
  }, [logs])

  const filteredSongs = useMemo(() => {
    if (!query.trim()) return songs
    const parsed = parseSearchQuery(query)
    return applyFilters(songs, parsed)
  }, [songs, query])

  const handlePlay = async (song) => {
    try {
      await playSong(song.id)
      const url = song.file_path.startsWith('/uploads/') 
        ? song.file_path 
        : `/uploads/${song.file_path}`
      loadSong(url, song)
    } catch (err) {
      console.error('Play failed:', err)
      toast.error('Could not play track')
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await deleteSong(id)
      if (res.success) {
        setSongs(prev => prev.filter(s => s.id !== id))
        toast.success('Song deleted')
      } else {
        toast.error(res.error || 'Delete failed')
      }
    } catch (err) {
      console.error('Delete failed:', err)
      toast.error('Delete failed')
    }
    setConfirmDeleteId(null)
  }

  const saveEdit = async () => {
    if (!editing) return
    try {
      const payload = { [editing.field]: editing.value }
      const updated = await updateSong(editing.songId, payload)
      if (updated?.id) {
        setSongs((prev) => prev.map((song) => (song.id === updated.id ? updated : song)))
        setSavedRowId(editing.songId)
        setTimeout(() => setSavedRowId((current) => (current === editing.songId ? null : current)), 900)
      }
    } catch (err) {
      console.error('Update failed:', err)
      toast.error('Update failed')
    }
    setEditing(null)
  }

  const renderEditableCell = (song, field) => {
    const active = editing?.songId === song.id && editing?.field === field
    if (active) {
      const commonProps = {
        autoFocus: true,
        className: 'input-dark !h-8 !px-2 !py-1 text-sm',
        value: editing.value,
        onChange: (e) => setEditing((prev) => ({ ...prev, value: e.target.value })),
        onBlur: saveEdit,
        onKeyDown: (e) => {
          if (e.key === 'Enter') { e.preventDefault(); saveEdit(); }
          if (e.key === 'Escape') setEditing(null)
        }
      }
      if (field === 'version') {
        return (
          <select {...commonProps}>
            {versionOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      }
      return <input type="text" {...commonProps} />
    }
    return (
      <button
        type="button"
        className="w-full rounded px-1 py-1 text-left text-sm text-white hover:bg-[#1f1f1f]"
        onClick={() => setEditing({ songId: song.id, field, value: song[field] ?? '' })}
      >
        {song[field] || <span className="text-zinc-500">-</span>}
      </button>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div className="space-y-4">
        <h2 className="page-title">Library</h2>

        <div className="panel p-4">
          <input
            className="input-dark mb-2"
            placeholder="Search title... or use energy:high bpm:90-120 tag:dark"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p className="text-[10px] text-zinc-500">
            Try: <span className="text-zinc-400">bpm:90-120</span> · <span className="text-zinc-400">energy:high</span> · <span className="text-zinc-400">tag:dark</span> · <span className="text-zinc-400">unfinished:true</span>
          </p>
          {query.trim() && (
             <p className="text-[10px] text-accent mt-1">Showing {filteredSongs.length} of {songs.length} tracks</p>
          )}
        </div>

        <div className="panel overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center p-12"><Spinner /></div>
          ) : songs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center text-zinc-500">
              <span className="text-4xl mb-4">🎵</span>
              <p>No tracks yet. Upload your first song from the Dashboard.</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="border-b border-border bg-zinc-900/60 text-zinc-400 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="px-4 py-3 w-12 text-center">#</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3 w-20">BPM</th>
                  <th className="px-4 py-3 w-24">Energy</th>
                  <th className="px-4 py-3 w-20">Key</th>
                  <th className="px-4 py-3 w-32">Genre</th>
                  <th className="px-4 py-3 w-24">Version</th>
                  <th className="px-4 py-3 w-16 text-right">Plays</th>
                  <th className="px-4 py-3 w-24">Date</th>
                  <th className="px-4 py-3 min-w-[140px]">Tags</th>
                  <th className="px-4 py-3 w-12 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {filteredSongs.map((song, idx) => {
                  const tags = tagsBySong.get(song.id) || []
                  const autoTags = JSON.parse(song.tags || '[]')
                  
                  return (
                    <tr
                      key={song.id}
                      ref={(el) => { rowRefs.current[song.id] = el }}
                      className={`border-b border-border/40 group transition hover:bg-[#1f1f1f] h-[52px] ${idx % 2 === 1 ? 'bg-[#0f0f0f]' : 'bg-[#141414]'} ${
                        highlightSongId === song.id ? 'bg-green-500/20 animate-pulse' : ''
                      }`}
                    >
                      <td className="px-4 py-2 text-center">
                        <button 
                          className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center hover:scale-105 transition shadow-lg shrink-0" 
                          onClick={() => handlePlay(song)} 
                        >
                          <span className="ml-[2px] text-xs">▶</span>
                        </button>
                      </td>
                      <td className="px-4 py-2 font-bold text-white max-w-[200px] truncate" title={song.title}>
                        {renderEditableCell(song, 'title')}
                      </td>
                      <td className="px-4 py-2 font-mono text-xs text-zinc-300">{song.bpm || '—'}</td>
                      <td className="px-4 py-2">
                        {song.energy ? (
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${getEnergyColor(song.energy)}`}>
                            {song.energy}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-2 text-zinc-500">{song.key || '—'}</td>
                      <td className="px-4 py-2 text-zinc-400">{song.genre || '—'}</td>
                      <td className="px-4 py-2">{renderEditableCell(song, 'version')}</td>
                      <td className="px-4 py-2 text-right font-mono">{song.play_count || 0}</td>
                      <td className="px-4 py-2 text-zinc-500 text-[11px]">{formatDate(song.created_at)}</td>
                      <td className="px-4 py-2">
                        <div className="flex flex-wrap gap-1">
                          {autoTags.map(t => (
                            <span key={t} className="bg-zinc-800 text-[9px] text-zinc-400 px-1.5 py-0.5 rounded uppercase font-bold border border-zinc-700/50">{t}</span>
                          ))}
                          {tags.slice(0, 1).map(tag => (
                             <span key={tag.text} className="bg-accent/10 text-accent text-[9px] px-1.5 py-0.5 rounded uppercase font-bold border border-accent/20">{tag.text.replace(/^[^\s]+\s/,'')}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        {confirmDeleteId === song.id ? (
                          <div className="flex items-center justify-end gap-2">
                            <button className="text-[10px] text-zinc-400 hover:text-white" onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                            <button className="text-[10px] text-red-500 font-bold" onClick={() => handleDelete(song.id)}>Delete</button>
                          </div>
                        ) : (
                          <button 
                            className="opacity-0 group-hover:opacity-100 transition text-zinc-600 hover:text-red-400"
                            onClick={() => setConfirmDeleteId(song.id)}
                          >
                            🗑
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
                {filteredSongs.length === 0 && songs.length > 0 && (
                   <tr>
                     <td colSpan="11" className="px-4 py-12 text-center text-zinc-500 italic">No tracks match your search filters.</td>
                   </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Library
