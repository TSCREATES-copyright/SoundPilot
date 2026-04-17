import { useRef, useState } from 'react'
import { analyzeAudioFile } from '../utils/audioAnalyzer'
import { uploadSong } from '../utils/api'
import { useToast } from './ToastProvider'
import RuleAlert from './RuleAlert'
import { useAuth } from '../auth/hooks/useAuth'

const initialMeta = {
  title: '',
  version: 'v1',
  genre: '',
  notes: ''
}

const versionOptions = ['v1', 'Demo', 'Master', 'Mix', 'Final']

function formatEnergy(value) {
  if (!value) return '-'
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function UploadBox({ onUploaded }) {
  const fileInputRef = useRef(null)
  const toast = useToast()
  const { currentUser } = useAuth()

  const [file, setFile] = useState(null)
  const [meta, setMeta] = useState(initialMeta)
  const [alerts, setAlerts] = useState([])
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleSelectFile = async (selected) => {
    if (!selected) return

    setFile(selected)
    setAnalysis(null)
    setAlerts([])

    if (!meta.title) {
      const inferred = selected.name.replace(/\.[^/.]+$/, '')
      setMeta((prev) => ({ ...prev, title: inferred }))
    }

    try {
      setIsAnalyzing(true)
      const result = await analyzeAudioFile(selected)
      setAnalysis(result)
      toast.success('Track analysis complete')
    } catch (error) {
      toast.error('Audio analysis failed. You can still upload the file.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!currentUser?.uid) {
      toast.error('Please sign in to upload songs')
      return
    }
    if (!file || !meta.title.trim()) return

    const formData = new FormData()
    formData.append('audio', file)
    formData.append('title', meta.title.trim())
    formData.append('version', meta.version)
    formData.append('genre', meta.genre)
    formData.append('notes', meta.notes)

    if (analysis) {
      formData.append('bpm', String(analysis.bpm))
      formData.append('key', analysis.keyEstimate)
      formData.append('energy', analysis.energy)
    }

    try {
      const response = await uploadSong(formData)
      setAlerts(response.alerts || [])
      setFile(null)
      setMeta(initialMeta)
      setAnalysis(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      onUploaded?.(response.song)
      toast.success('Song uploaded')
    } catch (error) {
      toast.error('Upload failed')
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`rounded-lg border-2 border-dashed p-6 text-center transition ${
          isDragging ? 'border-accent bg-zinc-900' : 'border-zinc-700'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleSelectFile(e.dataTransfer.files?.[0])
        }}
      >
        <p className="mb-2 text-sm">Drop your track. SoundPilot will analyze it and give you feedback.</p>
        <button type="button" className="btn-primary" onClick={() => fileInputRef.current?.click()}>
          Choose File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => handleSelectFile(e.target.files?.[0])}
        />
      </div>

      {isAnalyzing && <p className="animate-pulse text-sm text-accent">🎵 Analyzing your track...</p>}

      {analysis && (
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-zinc-800 px-3 py-1">Detected: ~{analysis.bpm} BPM</span>
          <span className="rounded-full bg-zinc-800 px-3 py-1">Energy: {formatEnergy(analysis.energy)}</span>
          <span className="rounded-full bg-zinc-800 px-3 py-1">Est. Key: {analysis.keyEstimate} (estimated)</span>
        </div>
      )}

      {file && (
        <form onSubmit={handleSubmit} className="grid gap-3">
          <label className="text-sm">
            <span className="mb-1 block text-zinc-300">Song Title</span>
            <input
              className="input-dark"
              required
              value={meta.title}
              onChange={(e) => setMeta((prev) => ({ ...prev, title: e.target.value }))}
            />
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-zinc-300">Version</span>
            <select
              className="input-dark"
              value={meta.version}
              onChange={(e) => setMeta((prev) => ({ ...prev, version: e.target.value }))}
            >
              {versionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-zinc-300">Genre (optional)</span>
            <select
              className="input-dark"
              value={meta.genre}
              onChange={(e) => setMeta((prev) => ({ ...prev, genre: e.target.value }))}
            >
              <option value="">Genre (optional)</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="R&B">R&B</option>
              <option value="Pop">Pop</option>
              <option value="Trap">Trap</option>
              <option value="Drill">Drill</option>
              <option value="Afrobeats">Afrobeats</option>
              <option value="Lo-fi">Lo-fi</option>
              <option value="Ambient">Ambient</option>
              <option value="House">House</option>
              <option value="Drum & Bass">Drum & Bass</option>
              <option value="Neo-Soul">Neo-Soul</option>
              <option value="Jazz">Jazz</option>
              <option value="Indie">Indie</option>
              <option value="Electronic">Electronic</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-zinc-300">Notes (optional)</span>
            <textarea
              className="input-dark"
              rows={3}
              value={meta.notes}
              onChange={(e) => setMeta((prev) => ({ ...prev, notes: e.target.value }))}
            />
          </label>

          <button className="btn-primary" type="submit" disabled={isAnalyzing || !currentUser?.uid}>
            Upload Song
          </button>
        </form>
      )}

      <RuleAlert messages={alerts} />
    </div>
  )
}

export default UploadBox
