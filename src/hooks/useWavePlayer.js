import { useEffect, useRef, useState, useCallback } from 'react'
import WaveSurfer from 'wavesurfer.js'

export function useWavePlayer() {
  const wavesurferRef = useRef(null)
  const waveContainerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const [isLooping, setIsLooping] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const pendingUrlRef = useRef(null)

  // Initialize WaveSurfer ONLY when container div is available
  const setWaveContainer = useCallback((node) => {
    if (!node) return
    waveContainerRef.current = node

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy()
    }

    const ws = WaveSurfer.create({
      container: node,
      waveColor: '#2a2a2a',
      progressColor: '#22c55e',
      cursorColor: '#22c55e',
      cursorWidth: 2,
      height: 44,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      normalize: true,
      interact: true,
    })

    ws.on('ready', () => {
      setDuration(ws.getDuration())
      setIsLoading(false)
      setIsReady(true)
      ws.setVolume(volume)
      ws.play()
      // If a song was queued before ready, load it now
      if (pendingUrlRef.current) {
        ws.load(pendingUrlRef.current)
        pendingUrlRef.current = null
      }
    })

    ws.on('play', () => setIsPlaying(true))
    ws.on('pause', () => setIsPlaying(false))
    ws.on('finish', () => {
      setIsPlaying(false)
      setCurrentTime(0)
      if (isLooping) ws.play()
    })

    ws.on('error', (err) => {
      console.error('[WaveSurfer] Error:', err)
      setIsLoading(false)
      setIsReady(false)
    })

    wavesurferRef.current = ws
  }, [volume, isLooping])

  const loadSong = useCallback((url, songData) => {
    // Ensure URL is absolute for WaveSurfer
    const fullUrl = url.startsWith('http')
      ? url
      : `http://localhost:3001${url}`

    setIsLoading(true)
    setIsReady(false)
    setCurrentTime(0)
    setCurrentSong(songData)

    if (wavesurferRef.current) {
      wavesurferRef.current.load(fullUrl)
    } else {
      // Queue it — container not mounted yet
      pendingUrlRef.current = fullUrl
    }
  }, [])

  const togglePlay = useCallback(() => {
    wavesurferRef.current?.playPause()
  }, [])

  const seek = useCallback((pct) => {
    wavesurferRef.current?.seekTo(Math.max(0, Math.min(1, pct)))
  }, [])

  const setVolume = useCallback((v) => {
    setVolumeState(v)
    wavesurferRef.current?.setVolume(v)
  }, [])

  const toggleLoop = useCallback(() => {
    setIsLooping(l => !l)
  }, [])

  const stop = useCallback(() => {
    wavesurferRef.current?.stop()
    setCurrentSong(null)
    setIsPlaying(false)
    setCurrentTime(0)
  }, [])

  // Cleanup on unmount & State Sync
  useEffect(() => {
    let mounted = true
    const ws = wavesurferRef.current

    if (ws) {
      const handleProcess = () => {
        if (mounted) setCurrentTime(ws.getCurrentTime())
      }
      ws.on('audioprocess', handleProcess)
    }

    return () => {
      mounted = false
      wavesurferRef.current?.destroy()
    }
  }, [])

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return {
    setWaveContainer,
    loadSong, togglePlay, seek, setVolume, toggleLoop, stop,
    isPlaying, currentTime, duration, volume, isLooping,
    currentSong, isLoading, isReady, formatTime
  }
}
