import { useEffect, useMemo, useRef, useState } from 'react'

function useAudioPlayer() {
  const audioRef = useRef(new Audio())
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(1)
  const [isLooping, setIsLooping] = useState(false)

  useEffect(() => {
    const audio = audioRef.current

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDuration = () => setDuration(audio.duration || 0)
    const handleEnded = () => {
      if (!audio.loop) setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  return useMemo(
    () => ({
      currentSong,
      isPlaying,
      currentTime,
      duration,
      volume,
      isLooping,
      loadSong: (url, title) => {
        const audio = audioRef.current
        audio.src = url
        setCurrentSong({ url, title })
        setCurrentTime(0)
      },
      play: async () => {
        await audioRef.current.play()
        setIsPlaying(true)
      },
      pause: () => {
        audioRef.current.pause()
        setIsPlaying(false)
      },
      seek: (time) => {
        audioRef.current.currentTime = time
        setCurrentTime(time)
      },
      setVolume: (v) => {
        audioRef.current.volume = v
        setVolumeState(v)
      },
      toggleLoop: () => {
        const next = !audioRef.current.loop
        audioRef.current.loop = next
        setIsLooping(next)
      }
    }),
    [currentSong, isPlaying, currentTime, duration, volume, isLooping]
  )
}

export default useAudioPlayer
