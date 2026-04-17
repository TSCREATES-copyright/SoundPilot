import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Home from './pages/Home'
import Library from './pages/Library'
import Lyrics from './pages/Lyrics'
import Projects from './pages/Projects'
import Explore from './pages/Explore'
import Coach from './pages/Coach'
import Producer from './pages/Producer'
import Profile from './pages/Profile'
import AuthContainer from './auth/components/AuthContainer'
import { useAuth } from './auth/hooks/useAuth'

export default function App() {
  const { currentUser, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-[#0f0f0f] text-white px-4 text-center">
        Loading session...
      </div>
    )
  }

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    )
  }

  return (
    <div className="app-shell">

      {/* Sidebar — fixed left column */}
      <Sidebar />

      {/* Right side — page + player stacked vertically */}
      <div className="app-main">

        {/* Page content — scrollable */}
        <main className="app-routes">
          <Routes>
            <Route path="/auth" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/lyrics" element={<Lyrics />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/coach" element={<Coach />} />
            <Route path="/producer" element={<Producer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Player bar — always at bottom, full width of right column */}
        <Player />

      </div>
    </div>
  )
}
