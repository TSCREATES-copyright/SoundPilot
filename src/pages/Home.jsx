import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import UploadBox from '../components/UploadBox'
import { getRuleLogs, getSongs, getLyricDrafts, getProjects } from '../utils/api'
import { useToast } from '../components/ToastProvider'

// Computes the creative DNA based on actual library data
function computeDNA(songs, projects) {
  const total = songs.length;
  const bpmSongs = songs.filter(s => s.bpm)
  const avgBpm = bpmSongs.length ? Math.round(bpmSongs.reduce((a, b) => a + Number(b.bpm), 0) / bpmSongs.length) : 0
  
  const progressed = songs.filter(s => s.version && !['v1', 'demo'].includes(s.version.toLowerCase())).length;
  const completionRate = total ? Math.round((progressed / total) * 100) : 0;

  // Session Style
  const hours = songs.map(s => new Date(s.created_at).getHours())
  const night = hours.filter(h => h >= 22 || h < 4).length
  const early = hours.filter(h => h >= 6 && h < 12).length
  const aft = hours.filter(h => h >= 12 && h < 18).length
  const eve = hours.filter(h => h >= 18 && h < 22).length
  const maxH = Math.max(night, early, aft, eve)
  let sessionStyle = "Undefined"
  if (total) {
      if (maxH === night) sessionStyle = "Night Owl 🌙"
      else if (maxH === early) sessionStyle = "Early Bird ☀️"
      else if (maxH === aft) sessionStyle = "Afternoon Creator 🌤"
      else sessionStyle = "Evening Producer 🌆"
  }

  // Primary Style
  const genres = songs.map(s => s.genre).filter(Boolean)
  const genreCounts = genres.reduce((acc, g) => { acc[g] = (acc[g] || 0) + 1; return acc }, {})
  const topGenre = Object.entries(genreCounts).sort((a,b)=>b[1]-a[1])[0]?.[0]
  
  const energies = songs.map(s => s.energy && s.energy.toLowerCase()).filter(Boolean)
  const highE = energies.filter(e => e === 'high').length
  const lowE = energies.filter(e => e === 'low').length
  const midE = energies.filter(e => e === 'medium').length

  let primaryStyle = "Eclectic Producer"
  if (topGenre) {
    primaryStyle = topGenre
  } else if (total) {
    if (highE >= lowE && highE >= midE && avgBpm > 130) primaryStyle = "High Energy Producer"
    else if (highE >= lowE && highE >= midE && avgBpm >= 100 && avgBpm <= 130) primaryStyle = "Trap / Hip-Hop"
    else if (lowE >= highE && lowE >= midE && avgBpm < 80) primaryStyle = "Ambient / Cinematic"
    else if (midE >= highE && midE >= lowE && avgBpm >= 80 && avgBpm <= 110) primaryStyle = "R&B / Soul"
  }

  // Tempo Identity
  let tempoIdentity = "Fluid"
  if (avgBpm > 0) {
    if (avgBpm < 75) tempoIdentity = "Slow Burn"
    else if (avgBpm < 95) tempoIdentity = "Mid-Tempo Groove"
    else if (avgBpm < 115) tempoIdentity = "Upbeat Flow"
    else if (avgBpm < 135) tempoIdentity = "High Drive"
    else tempoIdentity = "Full Throttle"
  }

  // Signature Key
  const keys = songs.filter(s => s.key && s.key.trim() !== '').map(s => s.key.trim())
  const keyCounts = keys.reduce((acc, k) => { acc[k] = (acc[k] || 0) + 1; return acc }, {})
  const signatureKey = Object.entries(keyCounts).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'N/A'

  // Produce Type & Streak
  let producerType = "The Explorer"
  const mostPlayedIds = [...songs].sort((a,b)=>(b.play_count||0) - (a.play_count||0))
  const topPlayCount = mostPlayedIds[0]?.play_count || 0
  
  let currentStreak = 0;
  if (total) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const dateStrs = new Set(songs.map(d => new Date(d.created_at).toISOString().slice(0, 10)))
      for (let i = 0; i <= 30; i++) {
          const checkDate = new Date(today.getTime() - i * 86400000)
          if (dateStrs.has(checkDate.toISOString().slice(0, 10))) {
              currentStreak++
          } else if (i > 0) {
              break 
          }
      }
  }

  if (completionRate > 60 && topPlayCount > 5) producerType = "The Finisher"
  else if (projects.length > 5 && completionRate < 30) producerType = "The Visionary"
  else if (sessionStyle.includes("Night Owl") && avgBpm < 90) producerType = "The Atmospherist"
  else if (avgBpm > 120 && highE >= lowE && highE >= midE) producerType = "The Energist"
  else if (currentStreak >= 3) producerType = "The Disciplined"

  return {
    primaryStyle,
    tempoIdentity,
    sessionStyle,
    completionRate,
    signatureKey,
    avgBpm,
    producerType,
    currentStreak
  }
}

function Home() {
  const [songs, setSongs] = useState([])
  const [projects, setProjects] = useState([])
  const [logs, setLogs] = useState([])
  const [drafts, setDrafts] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const loadData = async () => {
    try {
      const [songData, pData, logData, draftsData] = await Promise.all([
        getSongs(), 
        getProjects(), 
        getRuleLogs(), 
        getLyricDrafts()
      ])
      setSongs(Array.isArray(songData) ? songData : [])
      setProjects(Array.isArray(pData) ? pData : [])
      setLogs(Array.isArray(logData) ? logData : [])
      setDrafts(Array.isArray(draftsData) ? draftsData : [])
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
      toast.error('Failed to load dashboard data')
      setSongs([])
      setProjects([])
      setLogs([])
      setDrafts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const dna = computeDNA(songs, projects)

  const cardStyle = {
    background: '#181818',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '20px',
    minHeight: '200px'
  }

  const emptyStateStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    textAlign: 'center',
    padding: '24px'
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '24px',
        borderLeft: '3px solid #22c55e', paddingLeft: '12px' }}>
        Dashboard
      </h1>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-[20px]">
          {/* Top row — 3 equal columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {/* Quick Upload */}
            <section style={cardStyle}>
              <h3 className="mb-3 text-lg font-semibold">Quick Upload</h3>
              <UploadBox onUploaded={loadData} />
            </section>

            {/* Recent Uploads */}
            <section style={cardStyle}>
              <h3 className="mb-3 text-lg font-semibold">Recent Uploads</h3>
              {songs.length === 0 ? (
                <div style={emptyStateStyle}>
                  <span className="text-3xl mb-2">🎵</span>
                  <p className="text-sm">No uploads yet. Your journey starts with the first track.</p>
                </div>
              ) : (
                <ul className="space-y-2 text-sm z-0">
                   {songs.slice(0, 5).map((song) => (
                    <li key={song.id} className="rounded-md bg-[#1f1f1f] p-3 truncate font-medium text-white border border-transparent hover:border-zinc-700 transition">
                      <Link to={`/library`} className="w-full inline-block">{song.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Creative DNA Snapshot */}
            <section style={{ ...cardStyle, borderTop: '2px solid #22c55e' }}>
               <h3 className="mb-3 text-lg font-bold flex items-center gap-2">
                 <span>🧬</span> DNA Snapshot
               </h3>
               {songs.length === 0 ? (
                  <div style={emptyStateStyle}>
                    <span className="text-3xl mb-2">🔭</span>
                    <p className="text-sm">Upload tracks to generate your Creative DNA profile.</p>
                  </div>
               ) : (
                 <>
                   <div className="bg-[#111] rounded-xl p-4 flex flex-col gap-3 shadow-inner">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#22c55e] border border-[#22c55e]/20 bg-[#22c55e]/10 px-2 py-1 rounded w-fit inline-block">
                        {dna.producerType}
                      </span>
                      
                      <div className="grid grid-cols-2 gap-2 mt-1">
                         <div>
                           <p className="text-[10px] uppercase text-zinc-500 font-bold mb-0.5">Avg BPM</p>
                           <p className="text-sm font-semibold text-white">{dna.avgBpm > 0 ? dna.avgBpm : 'N/A'}</p>
                         </div>
                         <div>
                           <p className="text-[10px] uppercase text-zinc-500 font-bold mb-0.5">Session</p>
                           <p className="text-sm font-semibold text-white truncate" title={dna.sessionStyle}>{dna.sessionStyle.split(' ')[0]}</p>
                         </div>
                         <div className="col-span-2">
                           <p className="text-[10px] uppercase text-zinc-500 font-bold mb-0.5">Completion Rate</p>
                           <p className="text-sm font-bold text-[#22c55e]">{dna.completionRate}% complete</p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-4 pt-4 border-t border-zinc-800 text-center">
                      <Link to="/profile" className="text-sm font-bold text-accent hover:text-white transition">→ View Full DNA</Link>
                   </div>
                 </>
               )}
            </section>
          </div>

          {/* Bottom row — 2 columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            {/* AI Insights */}
            <section style={cardStyle}>
              <h3 className="mb-3 text-lg font-semibold flex items-center gap-2">
                 <span>✨</span> AI Insights
              </h3>
              {logs.length === 0 ? (
                <div style={emptyStateStyle}>
                  <span className="text-3xl mb-2">💡</span>
                  <p className="text-sm">No insights yet. Keep creating to unlock AI analysis.</p>
                </div>
              ) : (
                <>
                  <ul className="space-y-2 text-sm">
                    {logs.slice(0, 4).map((log) => (
                      <li key={log.id} className="rounded-md bg-[#111] p-3 text-zinc-300 font-medium leading-snug border border-zinc-800">
                        <span className="text-accent mr-2 font-bold select-none">•</span>
                        {log.message}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-left">
                      <Link to="/producer" className="text-xs text-zinc-400 hover:text-white transition">Read more in Producer →</Link>
                  </div>
                </>
              )}
            </section>

            {/* Lyric Drafts */}
            <section style={cardStyle}>
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-base font-bold text-zinc-200">Recent Lyric Drafts</h3>
                 <Link to="/lyrics" className="text-xs font-bold text-[#22c55e] hover:text-white border border-[#22c55e]/30 px-3 py-1 rounded-full transition">New Draft</Link>
               </div>
               
               {drafts.length === 0 ? (
                 <div style={emptyStateStyle}>
                   <span className="text-3xl mb-2">✍️</span>
                   <p className="text-sm">No lyric drafts yet. Start writing your next hit.</p>
                 </div>
               ) : (
                 <div className="grid gap-4 md:grid-cols-2">
                    {drafts.slice(0, 4).map((d) => (
                       <div key={d.id} className="rounded-lg bg-[#111] border border-zinc-800 p-4 flex flex-col justify-between hover:border-zinc-700 transition group cursor-pointer" onClick={() => window.location.href = `/lyrics?id=${d.id}`}>
                         <div>
                           <div className="flex justify-between items-start mb-2">
                             <span className="font-bold text-white text-sm truncate pr-2">{d.title}</span>
                             <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold text-white shrink-0 ${d.status === 'draft' ? 'bg-zinc-700' : d.status === 'complete' ? 'bg-[#22c55e] text-black' : 'bg-blue-600'}`}>
                               {d.status}
                             </span>
                           </div>
                           <p className="text-[11px] text-zinc-500 mb-2">{new Date(d.updated_at).toLocaleDateString()}</p>
                         </div>
                         <div className="flex items-center text-[11px] text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                           Open Editor →
                         </div>
                       </div>
                    ))}
                 </div>
               )}
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
