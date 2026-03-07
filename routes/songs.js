const express = require('express')
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const db = require('../db/init')
const { evaluateRules } = require('../services/ruleEngine')
const { generateTags } = require('../services/autoTagger')

const router = express.Router()

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname)
    cb(null, `${uuidv4()}${extension}`)
  }
})

const upload = multer({ storage })

router.get('/', (_req, res) => {
  const songs = db.prepare('SELECT * FROM songs ORDER BY created_at DESC').all()
  res.json(songs)
})

router.post('/upload', upload.single('audio'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Audio file is required.' })
    }

    const {
      title,
      bpm = null,
      key = '',
      genre = '',
      mood = '',
      energy = '',
      version = 'v1',
      notes = ''
    } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Title is required.' })
    }

    const insert = db.prepare(
      `INSERT INTO songs (title, file_path, bpm, key, genre, mood, energy, version, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )

    const file_path = `/uploads/${req.file.filename}`
    const result = insert.run(
      title,
      file_path,
      bpm ? Number(bpm) : null,
      key,
      genre,
      mood,
      energy,
      version,
      notes
    )

    const song = db.prepare('SELECT * FROM songs WHERE id = ?').get(result.lastInsertRowid)
    
    // Auto-tagging logic
    const tags = generateTags(song)
    db.prepare('UPDATE songs SET tags = ? WHERE id = ?').run(JSON.stringify(tags), song.id)
    song.tags = JSON.stringify(tags)

    const alerts = evaluateRules(song, 'song_upload', db)
    return res.status(201).json({ song, alerts })
  } catch (error) {
    console.error('Upload failed:', error)
    return res.status(500).json({ error: 'Upload failed', details: error.message })
  }
})

router.get('/:id', (req, res) => {
  const song = db.prepare('SELECT * FROM songs WHERE id = ?').get(req.params.id)
  if (!song) return res.status(404).json({ error: 'Song not found' })
  return res.json(song)
})

router.patch('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM songs WHERE id = ?').get(req.params.id)
  if (!existing) {
    return res.status(404).json({ error: 'Song not found' })
  }

  const { bpm, key, genre, mood, energy, notes, version, title } = req.body

  const update = db.prepare(
    `UPDATE songs
     SET title = ?, bpm = ?, key = ?, genre = ?, mood = ?, energy = ?, notes = ?, version = ?
     WHERE id = ?`
  )

  update.run(
    title ?? existing.title,
    bpm !== undefined ? bpm : existing.bpm,
    key !== undefined ? key : existing.key,
    genre !== undefined ? genre : existing.genre,
    mood !== undefined ? mood : existing.mood,
    energy !== undefined ? energy : existing.energy,
    notes !== undefined ? notes : existing.notes,
    version !== undefined ? version : existing.version,
    req.params.id
  )

  const song = db.prepare('SELECT * FROM songs WHERE id = ?').get(req.params.id)
  return res.json(song)
})

router.post('/:id/play', (req, res) => {
  const increment = db.prepare('UPDATE songs SET play_count = play_count + 1 WHERE id = ?')
  const result = increment.run(req.params.id)

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Song not found' })
  }

  const song = db.prepare('SELECT * FROM songs WHERE id = ?').get(req.params.id)
  db.prepare('INSERT INTO rule_logs (song_id, rule_id, message) VALUES (?, ?, ?)').run(
    song.id,
    'play_event',
    `Played ${song.title}`
  )

  const alerts = evaluateRules(song, 'song_play', db)

  return res.json({ song, alerts })
})

router.delete('/:id', (req, res) => {
  try {
    const song = db.prepare('SELECT * FROM songs WHERE id = ?').get(req.params.id)
    if (!song) return res.status(404).json({ error: 'Song not found' })

    // Remove from project_songs
    db.prepare('DELETE FROM project_songs WHERE song_id = ?').run(req.params.id)
    // Remove rule logs
    db.prepare('DELETE FROM rule_logs WHERE song_id = ?').run(req.params.id)
    // Remove lyric draft links
    db.prepare('UPDATE lyric_drafts SET song_id = NULL WHERE song_id = ?').run(req.params.id)
    
    // Delete actual file from uploads/
    const absolutePath = path.join(__dirname, '..', song.file_path)
    if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath)
    
    // Delete DB record
    db.prepare('DELETE FROM songs WHERE id = ?').run(req.params.id)

    res.json({ success: true })
  } catch (err) {
    console.error('Delete song error:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
