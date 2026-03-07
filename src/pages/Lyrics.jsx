import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import {
  getLyricDrafts, createLyricDraft, getLyricDraft, updateLyricDraft, deleteLyricDraft,
  addLyricSection, updateLyricSection, deleteLyricSection,
  getRhymes, getSyllables, getWritingPrompts, getSongs
} from '../utils/api'
import { useToast } from '../components/ToastProvider'

const STRUCTURE_OPTIONS = [
  { id: 'verse-chorus', label: "Verse / Chorus / Bridge (Standard)" },
  { id: 'aaba', label: "A / A / B / A (Jazz/Classic)" },
  { id: 'verse-only', label: "Verse / Verse / Verse (Narrative)" },
  { id: 'hook-first', label: "Hook / Verse / Hook / Bridge (Modern)" },
  { id: 'extended', label: "Intro / Verse / Pre-Chorus / Chorus / Bridge / Outro" }
]

const SECTION_OPTIONS = ['Verse', 'Pre-Chorus', 'Chorus', 'Bridge', 'Hook', 'Intro', 'Outro']

// Simple debounce helper
function debounce(fn, ms) {
  let timeoutId
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}

export default function Lyrics() {
  const toast = useToast()
  const [drafts, setDrafts] = useState([])
  const [songs, setSongs] = useState([])
  const [activeDraft, setActiveDraft] = useState(null)
  const [draftToDelete, setDraftToDelete] = useState(null)
  
  // New Form
  const [showNewForm, setShowNewForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newStructure, setNewStructure] = useState('verse-chorus')
  const [newSongId, setNewSongId] = useState('')

  // Rhymes Panel
  const [showRhymes, setShowRhymes] = useState(false)
  const [rhymeWord, setRhymeWord] = useState('')
  const [rhymeResults, setRhymeResults] = useState(null)
  const [fetchingRhymes, setFetchingRhymes] = useState(false)

  // Loading
  const [loading, setLoading] = useState(true)

  // Load Initial
  useEffect(() => {
    Promise.all([getLyricDrafts(), getSongs()])
      .then(([d, s]) => {
        setDrafts(Array.isArray(d) ? d : [])
        setSongs(Array.isArray(s) ? s : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load lyrics data:', err)
        toast.error('Failed to load drafts')
        setLoading(false)
      })
  }, [])

  const loadDraft = async (id) => {
    try {
      const d = await getLyricDraft(id)
      setActiveDraft(d)
      setShowRhymes(false)
    } catch (err) {
      console.error('Failed to load draft:', err)
      toast.error('Failed to load draft detail')
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    try {
      const d = await createLyricDraft({
        title: newTitle,
        structure: newStructure,
        song_id: newSongId || null
      })
      setDrafts([d, ...drafts])
      setShowNewForm(false)
      setNewTitle('')
      setNewStructure('verse-chorus')
      setNewSongId('')
      loadDraft(d.id)
      toast.success('Draft created')
    } catch (err) {
      console.error('Create draft failed:', err)
      toast.error('Failed to create draft')
    }
  }

  const handleDeleteDraft = async (e, id) => {
    e.stopPropagation()
    try {
      await deleteLyricDraft(id)
      setDrafts(drafts.filter((d) => d.id !== id))
      if (activeDraft?.id === id) setActiveDraft(null)
      toast.success('Draft deleted')
    } catch (err) {
      console.error('Delete draft failed:', err)
      toast.error('Failed to delete draft')
    }
    setDraftToDelete(null)
  }

  const handleFindRhymes = async (word) => {
    setShowRhymes(true)
    setRhymeWord(word)
    if (!word) {
      setRhymeResults(null)
      return
    }
    setFetchingRhymes(true)
    try {
      const res = await getRhymes(word)
      setRhymeResults(res)
    } catch (err) {
      console.error('Rhyme lookup failed:', err)
      setRhymeResults(null)
    }
    setFetchingRhymes(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', height: '100%', gap: '0', overflow: 'hidden' }}>
        {/* LEFT PANEL */}
        <div style={{ width: '280px', flexShrink: 0, height: '100%', overflowY: 'auto', borderRight: '1px solid #2a2a2a', background: '#181818' }}>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white tracking-wide">✍️ Lyrics</h2>
              <button
                onClick={() => setShowNewForm(!showNewForm)}
                className="text-accent hover:text-green-400 font-semibold text-sm transition"
              >
                ＋ New Draft
              </button>
            </div>

            {showNewForm && (
              <form onSubmit={handleCreate} className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 space-y-3">
                <input
                  autoFocus
                  className="w-full rounded bg-zinc-800 border border-zinc-700 px-2 py-1.5 text-sm text-white outline-none focus:border-accent"
                  placeholder="Draft Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
                <select
                  className="w-full rounded bg-zinc-800 border border-zinc-700 px-2 py-1.5 text-xs text-white outline-none focus:border-accent"
                  value={newStructure}
                  onChange={(e) => setNewStructure(e.target.value)}
                >
                  {STRUCTURE_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
                <select
                  className="w-full rounded bg-zinc-800 border border-zinc-700 px-2 py-1.5 text-xs text-white outline-none focus:border-accent"
                  value={newSongId}
                  onChange={(e) => setNewSongId(e.target.value)}
                >
                  <option value="">No song linked</option>
                  {songs.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                <div className="flex items-center gap-2 pt-1">
                  <button type="submit" className="flex-1 bg-accent text-black font-semibold rounded py-1.5 text-xs hover:brightness-110">
                    Create Draft
                  </button>
                  <button type="button" onClick={() => setShowNewForm(false)} className="flex-1 bg-zinc-700 text-white font-semibold rounded py-1.5 text-xs hover:bg-zinc-600">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {drafts.length === 0 && !showNewForm ? (
              <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500">
                <span className="text-3xl mb-2">✍️</span>
                <p className="text-sm">No drafts yet. Start writing your first song.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {drafts.map(d => {
                  const bgClass = activeDraft?.id === d.id ? 'bg-zinc-800 border-l-2 border-l-accent' : 'bg-[#1e1e1e] hover:bg-zinc-800 group'
                  const statusColor = d.status === 'draft' ? 'bg-zinc-700' : d.status === 'complete' ? 'bg-emerald-800' : 'bg-blue-800'
                  const song = songs.find(s => s.id === d.song_id)

                  return (
                    <div
                      key={d.id}
                      onClick={() => loadDraft(d.id)}
                      className={`p-3 rounded-lg border-y border-r border-[#2a2a2a] cursor-pointer transition relative ${bgClass}`}
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="text-white font-bold text-sm truncate pr-6">{d.title}</h3>
                        {draftToDelete === d.id ? (
                          <div className="absolute top-3 right-3 flex gap-2">
                             <span className="text-xs text-red-500 font-bold hover:underline" onClick={(e) => handleDeleteDraft(e, d.id)}>Yes</span>
                             <span className="text-xs text-zinc-400 hover:text-white" onClick={(e) => { e.stopPropagation(); setDraftToDelete(null) }}>No</span>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); setDraftToDelete(d.id) }}
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-400 text-xs transition transition-opacity duration-200"
                          >
                            🗑
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold text-white ${statusColor}`}>
                          {d.status || 'Draft'}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-col gap-0.5">
                        <span className="text-[11px] text-zinc-500 truncate">{song ? song.title : 'No song linked'}</span>
                        <span className="text-[11px] text-zinc-600">{new Date(d.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - Editor */}
        <div style={{ flex: 1, height: '100%', overflowY: 'auto', padding: '24px' }}>
          {!activeDraft ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="text-5xl mb-4">✍️</span>
              <h2 className="text-xl font-bold text-white mb-2">Select a draft to start writing</h2>
              <p className="text-zinc-400 text-sm mb-6">or create a new one to begin your next song</p>
              <button onClick={() => setShowNewForm(true)} className="bg-accent text-black font-semibold px-4 py-2 rounded-lg hover:brightness-110">
                + New Draft
              </button>
            </div>
          ) : (
            <EditorDraft
              draft={activeDraft}
              songs={songs}
              onUpdateDraft={(updates) => {
                 const merged = { ...activeDraft, ...updates }
                 setActiveDraft(merged)
                 setDrafts(drafts.map(d => d.id === merged.id ? merged : d))
              }}
              onReload={() => loadDraft(activeDraft.id)}
              onOpenRhymes={handleFindRhymes}
            />
          )}
        </div>

        {/* RHYMES TOOLBAR PANEL */}
        {showRhymes && (
          <div style={{ width: '260px', flexShrink: 0, height: '100%', overflowY: 'auto', background: '#111111', borderLeft: '1px solid #2a2a2a' }}>
            <div className="p-4 flex flex-col h-full relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Rhymes</h3>
                <button onClick={() => setShowRhymes(false)} className="text-zinc-500 hover:text-white">✕</button>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleFindRhymes(rhymeWord) }} className="flex gap-2 mb-6">
                <input
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm text-white focus:border-accent outline-none"
                  placeholder="Word..."
                  value={rhymeWord}
                  onChange={(e) => setRhymeWord(e.target.value)}
                />
                <button type="submit" className="bg-accent text-black font-semibold rounded px-2.5 py-1 text-xs hover:brightness-110">
                  Find
                </button>
              </form>

              <div className="flex-1 overflow-y-auto space-y-6">
                {fetchingRhymes ? (
                  <div className="flex justify-center py-8"><Spinner /></div>
                ) : !rhymeResults ? (
                  <p className="text-zinc-500 text-xs text-center">Type a word to find rhymes.</p>
                ) : (
                  <>
                    <RhymeGroup title="🎯 Perfect Rhymes" items={rhymeResults.perfect} />
                    <RhymeGroup title="〰️ Near Rhymes" items={rhymeResults.near} />
                    <RhymeGroup title="💫 Slant Rhymes" items={rhymeResults.slant} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function RhymeGroup({ title, items }) {
  const toast = useToast()
  
  if (!items || items.length === 0) return (
    <div>
      <h4 className="text-xs font-bold text-zinc-400 mb-2">{title}</h4>
      <p className="text-[11px] text-zinc-600 italic">No {title.split(' ')[1].toLowerCase()} rhymes found</p>
    </div>
  )
  return (
    <div>
      <h4 className="text-xs font-bold text-zinc-400 mb-2">{title} ({items.length})</h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              navigator.clipboard.writeText(item.word).then(() => {
                toast.success(`Copied: ${item.word}`)
              }).catch(() => {
                toast.error('Copy failed')
              })
            }}
            style={{ background: '#1f1f1f', color: '#22c55e', border: '1px solid #2a2a2a',
                     borderRadius: '20px', padding: '4px 10px', cursor: 'pointer',
                     display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            {item.word}
            <span style={{ fontSize: '10px', color: '#555', background: '#111',
                           borderRadius: '10px', padding: '1px 5px' }}>
              {item.syllables}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function EditorDraft({ draft, songs, onUpdateDraft, onReload, onOpenRhymes }) {
  const toast = useToast()
  const [editingTitle, setEditingTitle] = useState(false)
  const [titleVal, setTitleVal] = useState(draft.title)
  const [addingSection, setAddingSection] = useState('')

  const handleTitleSave = async () => {
    setEditingTitle(false)
    if (titleVal !== draft.title && titleVal.trim()) {
      try {
        await updateLyricDraft(draft.id, { title: titleVal })
        onUpdateDraft({ title: titleVal })
        toast.success('Title updated')
      } catch (err) {
        toast.error('Failed to update title')
        setTitleVal(draft.title)
      }
    } else {
      setTitleVal(draft.title)
    }
  }

  const handleStatusChange = async (e) => {
    const val = e.target.value
    try {
      await updateLyricDraft(draft.id, { status: val })
      onUpdateDraft({ status: val })
      toast.success('Status updated')
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  const handleAddSection = async () => {
    if (!addingSection) return
    try {
      await addLyricSection(draft.id, { section_type: addingSection, position: draft.sections.length })
      setAddingSection('')
      onReload()
      toast.success('Section added')
    } catch (err) {
      toast.error('Failed to add section')
    }
  }

  const linkedSong = songs.find(s => s.id === draft.song_id)

  return (
    <div className="w-full space-y-6">
      {/* Editor Header */}
      <div className="panel p-5 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1">
            {editingTitle ? (
              <input
                autoFocus
                className="bg-zinc-900 border border-accent rounded px-2 py-1 text-2xl font-bold text-white outline-none w-full"
                value={titleVal}
                onChange={e => setTitleVal(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={e => e.key === 'Enter' && handleTitleSave()}
              />
            ) : (
              <h1
                onClick={() => setEditingTitle(true)}
                className="text-3xl font-bold text-white cursor-text hover:bg-zinc-800/50 rounded -ml-2 px-2 py-1 inline-block transition"
              >
                {draft.title}
              </h1>
            )}
          </div>
          
          <select
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm font-semibold text-white outline-none focus:border-accent"
            value={draft.status}
            onChange={handleStatusChange}
          >
            <option value="draft">Draft</option>
            <option value="in progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-semibold flex items-center gap-1.5 text-zinc-300">
            <span>🎵</span>
            {linkedSong ? linkedSong.title : 'No song linked'}
          </div>
          <span className="text-zinc-500 text-xs">
            Template: {STRUCTURE_OPTIONS.find(s => s.id === draft.structure)?.label || draft.structure}
          </span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {draft.sections?.map((sec, idx) => (
          <SectionCard
             key={sec.id}
             section={sec}
             index={idx}
             total={draft.sections.length}
             onReload={onReload}
             onOpenRhymes={onOpenRhymes}
          />
        ))}
      </div>

      {/* Add Section */}
      <div className="flex items-center gap-2 pt-4">
        <select
          value={addingSection}
          onChange={(e) => setAddingSection(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-300 outline-none focus:border-accent"
        >
          <option value="">Choose section...</option>
          {SECTION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <button
          onClick={handleAddSection}
          disabled={!addingSection}
          className="bg-accent text-black font-semibold rounded px-4 py-2 text-sm hover:brightness-110 disabled:opacity-50"
        >
          Add Section
        </button>
      </div>
    </div>
  )
}

function SectionCard({ section, index, total, onReload, onOpenRhymes }) {
  const toast = useToast()
  const [content, setContent] = useState(section.content || '')
  const [savedTick, setSavedTick] = useState(false)
  const [counts, setCounts] = useState([])
  const [scheme, setScheme] = useState('')
  const [showPrompts, setShowPrompts] = useState(false)
  const [prompts, setPrompts] = useState([])
  const [isDeleting, setIsDeleting] = useState(false)

  const saveTimer = useRef(null)
  
  const debouncedSave = useCallback(
    debounce(async (sectionId, text) => {
      if (!sectionId) return
      try {
        await updateLyricSection(sectionId, { content: text })
        setSavedTick(true)
        setTimeout(() => setSavedTick(false), 2000)
      } catch (err) {
        console.error('Autosave failed:', err)
      }
    }, 500),
    []
  )

  const debouncedAnalyze = useCallback(
    debounce(async (text) => {
      try {
        const c = await getSyllables(text)
        setCounts(c || [])
        const res = await fetch('/api/lyrics/tools/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({text})
        }).then(r=>r.json())
        setScheme(res.scheme || '')
      } catch {}
    }, 500),
    []
  )

  useEffect(() => {
    if (content.trim()) {
      debouncedAnalyze(content)
    }
  }, [])

  const handleChange = (e) => {
    const val = e.target.value
    setContent(val)
    debouncedSave(section.id, val)
    debouncedAnalyze(val)
  }

  const handleFetchPrompts = async () => {
    try {
      const list = await getWritingPrompts(section.section_type)
      setPrompts(list || [])
    } catch {
      toast.error('Failed to load prompts')
    }
  }

  const handleTogglePrompts = async () => {
    if (!showPrompts) await handleFetchPrompts()
    setShowPrompts(!showPrompts)
  }

  const handleDelete = async () => {
    try {
      await deleteLyricSection(section.id)
      onReload()
      toast.success('Section removed')
    } catch (err) {
      toast.error('Failed to delete section')
    }
    setIsDeleting(false)
  }

  const handleDoubleClick = () => {
    const selection = window.getSelection().toString().trim()
    if (selection) onOpenRhymes(selection)
  }

  const lines = content.split('\n')
  
  return (
    <div className="panel flex flex-col overflow-hidden">
      <div className="px-5 py-3 border-b border-border bg-[#181818] flex items-center justify-between">
        <div>
          <h4 className="text-accent font-bold uppercase tracking-widest text-sm">{section.section_type}</h4>
          <p className="text-xs text-zinc-500 italic mt-0.5 max-w-lg">Write your {section.section_type.toLowerCase()} here</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs text-accent transition-opacity duration-300 ${savedTick ? 'opacity-100' : 'opacity-0'}`}>
            Saved ✓
          </span>
          <div className="px-2 py-0.5 rounded bg-zinc-800/80 text-xs font-mono text-zinc-400 border border-zinc-700/50">
            {scheme ? `Scheme: ${scheme}` : 'No scheme'}
          </div>
        </div>
      </div>

      <div className="flex bg-[#111111]">
        <textarea
          className="flex-1 bg-transparent p-4 text-[15px] text-white outline-none resize-none leading-[1.9]"
          style={{ minHeight: '120px' }}
          value={content}
          onChange={handleChange}
          onDoubleClick={handleDoubleClick}
          placeholder={`Begin writing your ${section.section_type}...`}
          rows={Math.max(4, content.split('\n').length)}
        />
        <div className="w-10 bg-zinc-900/40 border-l border-zinc-800/50 flex flex-col items-center pt-4 select-none leading-[1.9] text-[15px]">
          {lines.map((l, i) => {
            const s = counts[i]
            const display = s !== undefined && l.trim() !== '' ? (typeof s === 'object' ? s.syllableCount : s) : ''
            return (
              <span key={i} style={{ color: '#555', fontSize: '11px' }}>
                {display}&nbsp;
              </span>
            )
          })}
        </div>
      </div>

      {showPrompts && (
        <div className="bg-[#181818] border-t border-border p-4">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-sm font-bold text-zinc-300">💡 Prompts</h5>
            <button onClick={handleFetchPrompts} className="text-xs text-accent hover:underline">↺ Refresh</button>
          </div>
          <div className="grid gap-2">
            {prompts.map((p, i) => (
              <div key={i} className="flex gap-2 items-start justify-between bg-[#111111] border border-zinc-800 rounded p-2 text-sm text-zinc-300">
                <span>{p}</span>
                <button
                  onClick={() => { 
                    const newVal = content ? content + '\n' + p : p
                    setContent(newVal)
                    debouncedSave(section.id, newVal)
                    setShowPrompts(false) 
                  }}
                  className="shrink-0 text-accent font-medium hover:underline text-xs"
                >
                  → Insert
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-2 bg-[#181818] border-t border-border flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <button onClick={handleTogglePrompts} className="font-semibold text-zinc-400 hover:text-white transition">
            💡 Prompts
          </button>
          <button onClick={() => {
            const word = window.getSelection().toString().trim()
            onOpenRhymes(word || "word")
          }} className="font-semibold text-zinc-400 hover:text-white transition">
            🔤 Rhymes
          </button>
        </div>
        <div className="flex items-center gap-3 text-zinc-500">
          <div className="flex gap-2 items-center">
            {isDeleting ? (
              <div className="flex gap-2">
                <button onClick={() => setIsDeleting(false)} className="text-[10px] text-zinc-400 font-bold">Cancel</button>
                <button onClick={handleDelete} className="text-[10px] text-red-500 font-bold">Confirm</button>
              </div>
            ) : (
              <button onClick={() => setIsDeleting(true)} className="hover:text-red-400 transition" title="Delete section">🗑</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
