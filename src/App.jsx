import { Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: '#0f0f0f',
      color: '#ffffff'
    }}>

      {/* Sidebar — fixed left column */}
      <Sidebar />

      {/* Right side — page + player stacked vertically */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        minWidth: 0
      }}>

        {/* Page content — scrollable */}
        <main style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '32px',
          paddingBottom: '24px',
          minWidth: 0
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/lyrics" element={<Lyrics />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/coach" element={<Coach />} />
            <Route path="/producer" element={<Producer />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Player bar — always at bottom, full width of right column */}
        <Player />

      </div>
    </div>
  )
}
