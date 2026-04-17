import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { getProducerReport, getPlugins } from '../utils/api'
import { useToast } from '../components/ToastProvider'
import { useAuth } from '../auth/hooks/useAuth'

const TABS = [
  { id: 'patterns', label: 'Patterns' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'plugins', label: 'Plugins' }
]

function RatingItem({ label, value, max = 100 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  let color = 'bg-accent'
  if (pct < 40) color = 'bg-red-500'
  else if (pct < 70) color = 'bg-yellow-500'

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-500">
        <span>{label}</span>
        <span className="text-zinc-300">{value} / {max}</span>
      </div>
      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function Producer() {
  const [report, setReport] = useState(null)
  const [plugins, setPlugins] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('patterns')
  const toast = useToast()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (!currentUser?.uid) {
      setReport(null)
      setPlugins([])
      setLoading(false)
      return
    }

    setLoading(true)
    Promise.all([getProducerReport(), getPlugins()])
      .then(([rep, plugs]) => {
        setReport(rep)
        setPlugins(Array.isArray(plugs) ? plugs : [])
      })
      .catch(err => {
        console.error('Failed to load producer report:', err)
        toast.error('Failed to load analysis')
        setReport(null)
        setPlugins([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentUser?.uid])

  if (loading) return <div className="flex items-center justify-center p-12 h-screen"><Spinner /></div>

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center text-zinc-500 h-[60vh]">
        <span className="text-4xl mb-4">🔍</span>
        <p>Upload more tracks to unlock pattern analysis.</p>
        <p className="text-xs text-zinc-600 mt-2">We need more historical data to generate a creative snapshot.</p>
      </div>
    )
  }

  const { snapshot, score } = report

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="page-title !mb-1">Producer Pilot</h2>
          <p className="text-zinc-500 text-sm">Deep analysis of your creative output and workflow patterns.</p>
        </div>
        <div className="bg-[#181818] border border-zinc-800 rounded-2xl px-6 py-4 flex items-center gap-6 shadow-xl">
           <div className="text-center">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Health Score</p>
              <p className={`text-3xl font-black ${score.growthScore.score > 70 ? 'text-accent' : 'text-yellow-500'}`}>
                {score.growthScore.score}
              </p>
           </div>
           <div className="h-10 w-[1px] bg-zinc-800" />
           <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</p>
              <p className="text-sm font-bold text-white whitespace-nowrap">{score.growthScore.label}</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column: Stats & Ratings */}
        <div className="lg:col-span-1 space-y-6">
          <section className="panel p-6 space-y-6">
             <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-4 border-b border-zinc-800 pb-2">Core Metrics</h3>
             <div className="space-y-5">
               {score.growthScore.breakdown.map(item => (
                 <RatingItem key={item.category} label={item.category} value={item.earned} max={item.max} />
               ))}
             </div>
          </section>

          <section className="panel p-6">
             <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-4 border-b border-zinc-800 pb-2">Library Stats</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111] p-3 rounded-xl border border-zinc-800">
                   <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Total Songs</p>
                   <p className="text-xl font-bold text-white">{snapshot.totalSongs}</p>
                </div>
                <div className="bg-[#111] p-3 rounded-xl border border-zinc-800">
                   <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Avg BPM</p>
                   <p className="text-xl font-bold text-white">{snapshot.avgBpm}</p>
                </div>
                <div className="col-span-2 bg-[#111] p-3 rounded-xl border border-zinc-800">
                   <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Primary Style</p>
                   <p className="text-base font-bold text-accent">{snapshot.topGenre || 'Multi-Genre'}</p>
                </div>
             </div>
          </section>
        </div>

        {/* Right Column: Dynamic Tabs (Patterns, Timeline, Plugins) */}
        <div className="lg:col-span-2 flex flex-col">
           <div className="flex gap-1 bg-[#181818] p-1 rounded-xl w-fit mb-4 border border-zinc-800">
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition ${tab === t.id ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {t.label}
                </button>
              ))}
           </div>

           <div className="flex-1">
              {tab === 'patterns' && (
                <div className="grid md:grid-cols-2 gap-4 animate-in fade-in duration-500">
                   {(!snapshot.patterns || snapshot.patterns.length === 0) ? (
                     <div className="col-span-2 panel p-12 text-center text-zinc-500 flex flex-col items-center">
                       <span className="text-3xl mb-3">🧩</span>
                       <p className="italic">No strong patterns detected yet. Complete more tracks to unlock insights.</p>
                     </div>
                   ) : (
                     snapshot.patterns.map((p, idx) => (
                       <div key={idx} className="panel p-5 border-l-4 border-l-accent hover:bg-[#1f1f1f] transition">
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-[10px] font-black text-accent uppercase tracking-widest">{p.type}</span>
                             <span className="text-[10px] font-bold text-zinc-600">CONFIDENCE: {p.confidence}%</span>
                          </div>
                          <h4 className="text-white font-bold mb-2">{p.label}</h4>
                          <p className="text-zinc-400 text-sm leading-relaxed">{p.insight}</p>
                       </div>
                     ))
                   )}
                </div>
              )}

              {tab === 'timeline' && (
                <div className="panel p-6 animate-in fade-in duration-500">
                   <h3 className="text-sm font-bold text-white mb-6">Recent Creative History</h3>
                   <div className="relative border-l-2 border-zinc-800 ml-3 pl-8 space-y-8 py-2">
                      {snapshot.timeline?.map((item, idx) => (
                        <div key={idx} className="relative">
                           <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-accent border-4 border-[#0f0f0f]" />
                           <div className="text-[10px] font-bold text-zinc-500 uppercase mb-1">{new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                           <h4 className="text-sm font-bold text-white mb-1">{item.event}</h4>
                           <p className="text-xs text-zinc-400">{item.details}</p>
                        </div>
                      ))}
                      {(!snapshot.timeline || snapshot.timeline.length === 0) && (
                        <div className="flex flex-col items-center py-8 text-zinc-500 italic text-sm">
                           <p>No timeline events recorded yet.</p>
                        </div>
                      )}
                   </div>
                </div>
              )}

              {tab === 'plugins' && (
                <div className="animate-in fade-in duration-500 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {plugins.length === 0 ? (
                      <div className="col-span-2 panel p-12 text-center text-zinc-500 flex flex-col items-center">
                        <span className="text-3xl mb-3">🔌</span>
                        <p>No active rule plugins found.</p>
                      </div>
                    ) : (
                      plugins.map((plugin, idx) => (
                        <div key={idx} className="panel p-5 border border-zinc-800 hover:border-zinc-700 transition flex items-start gap-4">
                          <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-2xl shrink-0">
                             ✨
                          </div>
                          <div className="flex-1">
                             <div className="flex justify-between items-start">
                               <h4 className="text-white font-bold text-sm">{plugin.name}</h4>
                               <span className="text-[10px] text-zinc-500 font-mono">v{plugin.version}</span>
                             </div>
                             <p className="text-xs text-zinc-500 mt-1">{plugin.ruleCount} active rules installed</p>
                             
                             <div className="mt-4 space-y-2">
                               {plugin.rules?.slice(0, 2).map((rule, ridx) => (
                                 <div key={ridx} className="text-[10px] bg-zinc-900/50 p-2 rounded border border-zinc-800/50">
                                   <span className="text-accent font-bold uppercase tracking-tighter mr-2">{rule.trigger}</span>
                                   <span className="text-zinc-400">{rule.message.slice(0, 60)}...</span>
                                 </div>
                               ))}
                             </div>
                             {plugin.ruleCount > 2 && (
                               <p className="text-[10px] text-zinc-600 mt-2 font-bold uppercase">+ {plugin.ruleCount - 2} more rules</p>
                             )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}
