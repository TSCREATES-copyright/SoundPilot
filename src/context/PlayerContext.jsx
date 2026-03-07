import { createContext, useContext } from 'react'
import { useWavePlayer } from '../hooks/useWavePlayer'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const player = useWavePlayer()
  return (
    <PlayerContext.Provider value={player}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider')
  return ctx
}
