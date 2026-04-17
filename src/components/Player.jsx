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
    <div className="player-shell">

      {/* Song Info */}
      <div className="player-song">
        {currentSong ? (
          <>
            <div className="player-song-title">
              {currentSong.title}
            </div>
            <div className="player-song-meta">
              {currentSong.version || 'v1'}
              {currentSong.bpm ? ` · ${currentSong.bpm} BPM` : ''}
            </div>
          </>
        ) : (
          <div className="player-song-empty">No track loaded</div>
        )}
      </div>

      {/* Controls */}
      <div className="player-controls">
        <button onClick={() => seek(0)}
          className="player-btn-icon">
          ⏮
        </button>
        <button onClick={togglePlay}
          className="player-btn-main">
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={toggleLoop}
          className={`player-btn-icon ${isLooping ? 'is-active' : ''}`}>
          🔁
        </button>
      </div>

      {/* Waveform */}
      <div className="player-wave-wrap">
        {isLoading && (
          <div className="player-wave-loading">
            Loading waveform...
          </div>
        )}
        <div
          ref={setWaveContainer}
          onClick={handleWaveClick}
          className="player-wave"
          style={{
            cursor: isReady ? 'pointer' : 'default',
            opacity: isLoading ? 0.3 : 1
          }}
        />
      </div>

      {/* Time */}
      <div className="player-time">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      {/* Volume */}
      <div className="player-volume">
        <span className="player-volume-icon">🔊</span>
        <input type="range" min="0" max="1" step="0.01"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className="player-volume-slider"
        />
      </div>

    </div>
  )
}
