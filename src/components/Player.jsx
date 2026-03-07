import { usePlayer } from '../context/PlayerContext'

export default function Player() {
  const {
    setWaveContainer, togglePlay, seek, setVolume, toggleLoop, stop,
    isPlaying, currentTime, duration, volume, isLooping,
    currentSong, isLoading, isReady, formatTime
  } = usePlayer()

  const handleWaveClick = (e) => {
    if (!isReady) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    seek(pct)
  }

  return (
    <div style={{
      width: '100%',
      height: '80px',
      background: '#111111',
      borderTop: '1px solid #2a2a2a',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '16px',
      flexShrink: 0,
      boxSizing: 'border-box'
    }}>

      {/* Song Info */}
      <div style={{ width: '180px', flexShrink: 0 }}>
        {currentSong ? (
          <>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentSong.title}
            </div>
            <div style={{ color: '#666', fontSize: '11px', marginTop: '2px' }}>
              {currentSong.version || 'v1'}
              {currentSong.bpm ? ` · ${currentSong.bpm} BPM` : ''}
            </div>
          </>
        ) : (
          <div style={{ color: '#444', fontSize: '12px' }}>No track loaded</div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button onClick={() => seek(0)}
          style={{ background: 'none', border: 'none', color: '#aaa',
            fontSize: '16px', cursor: 'pointer', padding: '4px' }}>
          ⏮
        </button>
        <button onClick={togglePlay}
          style={{ background: '#22c55e', border: 'none', color: '#000',
            width: '36px', height: '36px', borderRadius: '50%',
            fontSize: '16px', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center' }}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={toggleLoop}
          style={{ background: 'none', border: 'none',
            color: isLooping ? '#22c55e' : '#444',
            fontSize: '14px', cursor: 'pointer', padding: '4px' }}>
          🔁
        </button>
      </div>

      {/* Waveform */}
      <div style={{ flex: 1, position: 'relative' }}>
        {isLoading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: '#444', fontSize: '12px', zIndex: 1 }}>
            Loading waveform...
          </div>
        )}
        <div
          ref={setWaveContainer}
          onClick={handleWaveClick}
          style={{ width: '100%', cursor: isReady ? 'pointer' : 'default',
            opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.3s' }}
        />
      </div>

      {/* Time */}
      <div style={{ flexShrink: 0, color: '#666', fontSize: '11px',
        fontVariantNumeric: 'tabular-nums', minWidth: '70px', textAlign: 'center' }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      {/* Volume */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ color: '#666', fontSize: '13px' }}>🔊</span>
        <input type="range" min="0" max="1" step="0.01"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          style={{ width: '70px', accentColor: '#22c55e' }}
        />
      </div>

    </div>
  )
}
