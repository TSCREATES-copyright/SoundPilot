import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { getProjects, createProject, getSongs, updateProject, deleteProject, updateSong } from '../utils/api'
import { useToast } from '../components/ToastProvider'
import { usePlayer } from '../context/PlayerContext'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNewModal, setShowNewModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [activeProject, setActiveProject] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  
  const toast = useToast()
  const player = usePlayer()

  const loadData = async () => {
    try {
      const [p, s] = await Promise.all([getProjects(), getSongs()])
      setProjects(Array.isArray(p) ? p : [])
      setSongs(Array.isArray(s) ? s : [])
    } catch (err) {
      console.error('Failed to load projects data:', err)
      toast.error('Failed to load projects')
      setProjects([])
      setSongs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    try {
      const p = await createProject({ title: newTitle })
      setProjects([p, ...projects])
      setNewTitle('')
      setShowNewModal(false)
      toast.success('Project created')
    } catch (err) {
      console.error('Create project failed:', err)
      toast.error('Failed to create project')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProject(id)
      setProjects(projects.filter(p => p.id !== id))
      toast.success('Project deleted')
    } catch (err) {
      console.error('Delete project failed:', err)
      toast.error('Failed to delete project')
    }
    setConfirmDeleteId(null)
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      const updated = await updateProject(id, { status })
      setProjects(projects.map(p => p.id === id ? updated : p))
    } catch (err) {
      console.error('Update status failed:', err)
      toast.error('Failed to update status')
    }
  }

  const handlePlaySong = (song) => {
    const url = song.file_path.startsWith('/uploads/') 
      ? song.file_path 
      : `/uploads/${song.file_path}`
    player.loadSong(url, song)
  }

  const getSongsForProject = (pid) => songs.filter(s => s.project_id === pid)

  const handleMoveSong = async (songId, projectId) => {
    try {
      await updateSong(songId, { project_id: projectId })
      loadData()
      toast.success('Song moved')
    } catch (err) {
      console.error('Move song failed:', err)
      toast.error('Failed to move song')
    }
  }

  if (loading) return <div className="flex items-center justify-center p-12"><Spinner /></div>

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="page-title">Projects</h2>
        <button 
          onClick={() => setShowNewModal(true)}
          className="bg-accent text-black font-bold px-4 py-2 rounded-lg hover:brightness-110 transition"
        >
          ＋ New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 text-center text-zinc-500 panel">
          <span className="text-4xl mb-4">📁</span>
          <p>No projects yet. Create one to organize your tracks.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(p => {
            const projectSongs = getSongsForProject(p.id)
            const isOpen = activeProject === p.id

            return (
              <div key={p.id} className="panel flex flex-col overflow-hidden">
                <div className="p-5 border-b border-border bg-[#181818] flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1">{projectSongs.length} tracks</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <select 
                      value={p.status} 
                      onChange={(e) => handleUpdateStatus(p.id, e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 text-[10px] rounded px-2 py-1 outline-none text-zinc-300 font-bold uppercase"
                    >
                      <option value="active">Active</option>
                      <option value="complete">Complete</option>
                      <option value="on hold">On Hold</option>
                    </select>
                    {confirmDeleteId === p.id ? (
                      <div className="flex gap-2">
                        <button onClick={() => setConfirmDeleteId(null)} className="text-[10px] text-zinc-500 font-bold">Cancel</button>
                        <button onClick={() => handleDelete(p.id)} className="text-[10px] text-red-500 font-bold">Confirm</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDeleteId(p.id)} className="text-xs text-zinc-600 hover:text-red-500">Delete</button>
                    )}
                  </div>
                </div>

                <div className="flex-1 bg-[#111] max-h-[300px] overflow-y-auto">
                  {projectSongs.length === 0 ? (
                    <div className="p-8 text-center text-xs text-zinc-600 italic">No tracks yet</div>
                  ) : (
                    <ul className="divide-y divide-zinc-800/50">
                      {projectSongs.map(s => (
                        <li key={s.id} className="px-4 py-3 flex items-center justify-between hover:bg-[#181818] group transition">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => handlePlaySong(s)}
                              className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] hover:bg-accent hover:text-black transition"
                            >
                              ▶
                            </button>
                            <span className="text-sm text-zinc-300 font-medium truncate max-w-[120px]">{s.title}</span>
                          </div>
                          <span className="text-[10px] text-zinc-600 uppercase font-bold">{s.version}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="p-3 bg-[#181818] border-t border-border flex justify-between items-center">
                   <button 
                     onClick={() => setActiveProject(isOpen ? null : p.id)}
                     className="text-xs font-bold text-accent hover:underline px-2 py-1"
                   >
                     {isOpen ? 'Close' : 'Add tracks →'}
                   </button>
                   <Link to={`/library?project=${p.id}`} className="text-[10px] text-zinc-500 hover:text-white uppercase font-bold px-2">Manage</Link>
                </div>

                {isOpen && (
                  <div className="p-4 bg-zinc-900 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
                     <p className="text-[10px] uppercase font-bold text-zinc-500 mb-2">Move track to project:</p>
                     <select 
                       onChange={(e) => handleMoveSong(e.target.value, p.id)}
                       className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-xs text-white outline-none"
                       defaultValue=""
                     >
                       <option value="" disabled>Select a track...</option>
                       {songs.filter(s => s.project_id !== p.id).map(s => (
                         <option key={s.id} value={s.id}>{s.title} ({s.version})</option>
                       ))}
                     </select>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {showNewModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="bg-[#181818] border border-border rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Create New Project</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <input 
                autoFocus
                className="input-dark"
                placeholder="Project Title"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 btn-primary">Create</button>
                <button type="button" onClick={() => setShowNewModal(false)} className="flex-1 btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
