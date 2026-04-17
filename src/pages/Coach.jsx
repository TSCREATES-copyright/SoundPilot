import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { getRuleLogs } from '../utils/api'
import { useToast } from '../components/ToastProvider'
import { useAuth } from '../auth/hooks/useAuth'

const MODULES = [
  {
    id: 'structure',
    title: 'Song Structure Fundamentals',
    desc: 'Master the building blocks of modern songwriting: Verse, Chorus, Bridge, and the emotional arc of a track.',
    lessons: [
      { id: '1.1', title: 'The Hook Principle', body: 'The hook is the emotional center of your song. It should be memorable, singable, and repeated enough to stick but not so much that it irritates. Practice writing a 4-bar melody that resolves on the tonic.' },
      { id: '1.2', title: 'Dynamic Contrast', body: 'Energy levels must shift between sections. If your verse is busy, make your chorus sparse. If your verse is high-register, make your chorus grounded. Contrast creates the "drop" feeling.' }
    ]
  },
  {
    id: 'theory',
    title: 'Harmony & Chord Progressions',
    desc: 'Understand why certain chords evoke specific emotions and how to build tension and release.',
    lessons: [
      { id: '2.1', title: 'The Power of the IV-V-I', body: 'The most fundamental resolution in Western music. Moving from the subdominant (IV) to the dominant (V) and finally resolving to the tonic (I) provides a sense of homecoming.' },
      { id: '2.2', title: 'Borrowing from Minor', body: 'Inject emotion into a major key by "borrowing" chords from the parallel minor. The bVI and bVII chords are staples of cinematic pop.' }
    ]
  },
  {
    id: 'mixing',
    title: 'The Pro Mix Workflow',
    desc: 'From initial balance to the final polish. Learn how to carve space for every element.',
    lessons: [
      { id: '3.1', title: 'Subtractive EQ', body: 'Before boosting frequencies you like, cut the ones you don\'t. Removing "mud" (200-500Hz) from non-bass instruments creates clarity without adding volume.' }
    ]
  }
]

export default function Coach() {
  const [activeModule, setActiveModule] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (!currentUser?.uid) {
      setLogs([])
      setLoading(false)
      return
    }

    setLoading(true)
    getRuleLogs()
      .then(data => {
        setLogs(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load coach logs:', err)
        toast.error('Failed to load insights')
        setLogs([])
        setLoading(false)
      })
  }, [currentUser?.uid])

  if (loading) return <div className="flex items-center justify-center p-12 h-screen"><Spinner /></div>

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', borderLeft: '4px solid #fff', paddingLeft: '12px' }}>
        Pilot Creative Coach
      </h2>

      {!activeModule ? (
        <div className="space-y-12">
          <div className="grid gap-6 md:grid-cols-2">
            {MODULES.map(m => (
              <div key={m.id} className="panel p-6 hover:border-zinc-500 transition cursor-pointer group" onClick={() => setActiveModule(m)}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition">{m.title}</h3>
                  <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded font-bold text-zinc-400">{m.lessons.length} LESSONS</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{m.desc}</p>
                <button className="text-sm font-bold text-accent group-hover:underline">Start Module →</button>
              </div>
            ))}
          </div>

          <section className="pt-8 border-t border-zinc-900">
             <h3 className="text-lg font-bold text-white mb-6">Personalized Insights</h3>
             {logs.length === 0 ? (
               <div className="panel p-12 flex flex-col items-center justify-center text-center text-zinc-500">
                 <span className="text-4xl mb-4">💡</span>
                 <p>No insights yet. Upload tracks to start receiving feedback.</p>
               </div>
             ) : (
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 {logs.slice(0, 6).map(log => (
                   <div key={log.id} className="panel p-4 bg-[#111] border-l-4 border-l-accent overflow-hidden">
                     <p className="text-sm text-zinc-300 leading-snug">{log.message}</p>
                     <p className="text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-wider">{new Date(log.created_at).toLocaleDateString()}</p>
                   </div>
                 ))}
               </div>
             )}
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          <button onClick={() => {setActiveModule(null); setActiveLesson(null)}} className="text-zinc-500 hover:text-white text-sm font-bold flex items-center gap-2">
            ← Back to Modules
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar for Module */}
            <div className="md:w-64 flex-shrink-0 space-y-2">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Module Content</h3>
              {activeModule.lessons.map(l => (
                <button
                  key={l.id}
                  onClick={() => setActiveLesson(l)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition ${
                    activeLesson?.id === l.id ? 'bg-accent text-black' : 'bg-transparent text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  {l.id}. {l.title}
                </button>
              ))}
            </div>

            {/* Lesson Content */}
            <div className="flex-1">
              {!activeLesson ? (
                <div className="panel p-8 text-center bg-[#181818]/50">
                   <h3 className="text-white font-bold text-lg mb-2">Welcome to {activeModule.title}</h3>
                   <p className="text-zinc-500 text-sm">Select a lesson from the sidebar to begin your training.</p>
                </div>
              ) : (
                <div className="panel p-8 space-y-6 bg-[#181818] animate-in fade-in slide-in-from-top-4 duration-500">
                  <div>
                    <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Lesson {activeLesson.id}</span>
                    <h2 className="text-2xl font-bold text-white mt-1">{activeLesson.title}</h2>
                  </div>
                  <div className="text-zinc-300 leading-relaxed text-lg space-y-4">
                     {activeLesson.body.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                  <div className="pt-8 border-t border-zinc-800 flex justify-between">
                     <button className="bg-zinc-800 text-white font-bold px-6 py-2 rounded-lg hover:bg-zinc-700 transition">Mark as Complete</button>
                     <button className="text-accent font-bold hover:underline">Next Lesson →</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
