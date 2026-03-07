const express = require('express')
const db = require('../db/init')

const router = express.Router()

const validStatuses = ['active', 'in_progress', 'mastering', 'complete']

router.get('/', (_req, res) => {
  const projects = db
    .prepare(
      `SELECT p.*, COUNT(ps.song_id) AS song_count
       FROM projects p
       LEFT JOIN project_songs ps ON ps.project_id = p.id
       GROUP BY p.id
       ORDER BY p.created_at DESC`
    )
    .all()

  res.json(projects)
})

router.post('/', (req, res) => {
  const { name, description = '' } = req.body

  if (!name) {
    return res.status(400).json({ error: 'Project name is required' })
  }

  const result = db.prepare('INSERT INTO projects (name, description) VALUES (?, ?)').run(name, description)
  const project = db
    .prepare(
      `SELECT p.*, COUNT(ps.song_id) AS song_count
       FROM projects p
       LEFT JOIN project_songs ps ON ps.project_id = p.id
       WHERE p.id = ?
       GROUP BY p.id`
    )
    .get(result.lastInsertRowid)

  return res.status(201).json(project)
})

router.patch('/:id', (req, res) => {
  const projectId = Number(req.params.id)
  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId)

  if (!existing) {
    return res.status(404).json({ error: 'Project not found' })
  }

  const name = req.body.name ?? existing.name
  const description = req.body.description ?? existing.description
  const status = req.body.status ?? existing.status

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' })
  }

  db.prepare('UPDATE projects SET name = ?, description = ?, status = ? WHERE id = ?').run(
    name,
    description,
    status,
    projectId
  )

  const project = db
    .prepare(
      `SELECT p.*, COUNT(ps.song_id) AS song_count
       FROM projects p
       LEFT JOIN project_songs ps ON ps.project_id = p.id
       WHERE p.id = ?
       GROUP BY p.id`
    )
    .get(projectId)

  return res.json(project)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.prepare('DELETE FROM project_songs WHERE project_id = ?').run(id)
  db.prepare('DELETE FROM projects WHERE id = ?').run(id)
  return res.json({ success: true })
})

router.post('/:id/songs', (req, res) => {
  const projectId = Number(req.params.id)
  const { song_id: songId } = req.body

  const project = db.prepare('SELECT id FROM projects WHERE id = ?').get(projectId)
  const song = db.prepare('SELECT id FROM songs WHERE id = ?').get(songId)

  if (!project) return res.status(404).json({ error: 'Project not found' })
  if (!song) return res.status(404).json({ error: 'Song not found' })

  const existing = db
    .prepare('SELECT id FROM project_songs WHERE project_id = ? AND song_id = ?')
    .get(projectId, songId)

  if (existing) {
    return res.status(200).json({ success: true, message: 'Song already in project' })
  }

  db.prepare('INSERT INTO project_songs (project_id, song_id) VALUES (?, ?)').run(projectId, songId)

  return res.status(201).json({ success: true })
})

router.delete('/:id/songs/:songId', (req, res) => {
  const projectId = Number(req.params.id)
  const songId = Number(req.params.songId)

  const result = db
    .prepare('DELETE FROM project_songs WHERE project_id = ? AND song_id = ?')
    .run(projectId, songId)

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Project song link not found' })
  }

  return res.json({ success: true })
})

router.get('/:id/songs', (req, res) => {
  const projectId = Number(req.params.id)

  const songs = db
    .prepare(
      `SELECT s.*
       FROM songs s
       INNER JOIN project_songs ps ON ps.song_id = s.id
       WHERE ps.project_id = ?
       ORDER BY s.created_at DESC`
    )
    .all(projectId)

  return res.json(songs)
})

module.exports = router
