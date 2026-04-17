import { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getRuleNotifications } from '../utils/api'
import { useAuth } from '../auth/hooks/useAuth'

const links = [
  { to: '/', label: '🏠 Home' },
  { to: '/library', label: '🎵 Library' },
  { to: '/lyrics', label: '✍️ Lyrics' },
  { to: '/projects', label: '📁 Projects' },
  { to: '/explore', label: '🔍 Explore' },
  { to: '/coach', label: '🎯 Coach' },
  { to: '/producer', label: '✨ Producer' },
  { to: '/profile', label: '👤 Profile' }
]

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, currentUser } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [showPanel, setShowPanel] = useState(false)
  const [dismissed, setDismissed] = useState(new Set())
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const fetchNotifications = async () => {
    if (!currentUser?.uid) {
      setNotifications([])
      return
    }

    try {
      const data = await getRuleNotifications()
      setNotifications(data ?? [])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchNotifications()
    const int = setInterval(fetchNotifications, 5 * 60 * 1000)
    return () => clearInterval(int)
  }, [currentUser?.uid])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  const activeNotifs = notifications.filter(n => !dismissed.has(n.id))

  const handleDismiss = (id) => {
    setDismissed(prev => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const getPriorityColor = (p) => {
    if (p === 1) return 'bg-red-500/20 text-red-500 border border-red-500/30'
    if (p === 2) return 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
    return 'bg-green-500/20 text-green-500 border border-green-500/30'
  }

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate('/auth', { replace: true })
    }
  }

  return (
    <>
      <aside className="sidebar-shell">
        <div className="sidebar-inner">
          <div className="sidebar-header">
            <h1 className="text-xl font-bold text-accent">SoundPilot</h1>
            <button
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="sidebar-mobile-toggle"
              aria-label="Toggle navigation"
              aria-expanded={mobileNavOpen}
            >
              ☰
            </button>
          </div>

          <nav className={`sidebar-nav ${mobileNavOpen ? 'is-open' : ''}`}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `sidebar-link rounded-full px-3 py-2 text-sm transition ${
                    isActive ? 'bg-accent text-black font-semibold' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button
              onClick={handleLogout}
              className="sidebar-action mb-2 flex w-full items-center gap-2 rounded-lg p-2 text-sm font-semibold text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              <span>↩</span>
              <span>Logout</span>
            </button>
            <button
              onClick={() => setShowPanel(true)}
              className="sidebar-action flex items-center gap-3 w-full p-2 rounded-lg hover:bg-zinc-800 transition text-zinc-300 group"
            >
              <div className="relative">
                <span className="text-xl group-hover:animate-pulse">🔔</span>
                {activeNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {activeNotifs.length}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold">Notifications</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Slide-out Notif Panel */}
      {showPanel && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setShowPanel(false)} />
          <div className="fixed top-0 right-0 w-full sm:w-80 h-full bg-[#111] border-l border-border z-50 shadow-2xl flex flex-col transform transition-transform">
            <div className="p-4 border-b border-border flex justify-between items-center bg-[#151515]">
              <h2 className="font-bold text-white flex items-center gap-2">
                <span>Inbox</span>
                <span className="bg-zinc-800 text-xs px-2 py-0.5 rounded-full text-zinc-400">{activeNotifs.length}</span>
              </h2>
              <button onClick={() => setShowPanel(false)} className="text-zinc-500 hover:text-white p-1">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeNotifs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-2">
                  <span className="text-4xl mb-2">✨</span>
                  <p className="font-semibold text-sm text-zinc-400">All caught up ✓</p>
                  <p className="text-xs text-center max-w-[200px]">No new notifications at the moment.</p>
                </div>
              ) : (
                activeNotifs.map(n => (
                  <div key={n.id} className="bg-[#181818] border border-zinc-800 rounded-lg p-3 group relative hover:border-zinc-700 transition">
                    <button 
                      onClick={(e) => { e.preventDefault(); handleDismiss(n.id) }} 
                      className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                      title="Dismiss"
                    >
                      ✕
                    </button>
                    <div className="flex items-start gap-2 mb-2 pr-4">
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${getPriorityColor(n.priority)}`}>
                        P{n.priority}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-snug mb-3">
                      {n.message}
                    </p>
                    {n.action && (
                      <NavLink onClick={() => setShowPanel(false)} to={n.action.link} className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 w-fit">
                        {n.action.label} <span>→</span>
                      </NavLink>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Sidebar
