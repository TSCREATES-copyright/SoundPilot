const express = require('express')
const router = express.Router()
const db = require('../db/init')
const l = require('../services/lyricEngine')

router.get('/', (req, res) => {
  try {
    const drafts = db.prepare('SELECT * FROM lyric_drafts ORDER BY updated_at DESC').all()
    res.json(drafts)
  } catch (err) {
    console.error('Lyrics GET error:', err)
    res.status(500).json({ error: err.message })
  }
})

router.post('/', (req, res) => {
  const { title, song_id, structure } = req.body
  const str = structure || 'verse-chorus'
  
  const result = db.prepare(
    'INSERT INTO lyric_drafts (title, song_id, structure) VALUES (?, ?, ?)'
  ).run(title, song_id || null, str)
  
  const draftId = result.lastInsertRowid
  
  const template = l.getSongStructureTemplate(str)
  const insertSection = db.prepare(
    'INSERT INTO lyric_sections (draft_id, section_type, position) VALUES (?, ?, ?)'
  )
  
  template.forEach((sec, idx) => {
    insertSection.run(draftId, sec.section_type, idx)
  })
  
  res.json({ id: draftId, title, song_id, structure: str })
})

router.get('/tools/rhyme', (req, res) => {
  const rhymes = l.getRhymes(req.query.word)
  res.json(rhymes)
})

router.get('/tools/syllables', (req, res) => {
  const counts = l.countSyllables(req.query.text || '')
  res.json(counts)
})

router.get('/tools/prompts', (req, res) => {
  const prompts = l.getWritingPrompts(req.query.type || 'verse')
  res.json(prompts)
})

router.get('/tools/structure', (req, res) => {
  const structure = l.getSongStructureTemplate(req.query.type || 'verse-chorus')
  res.json(structure)
})

router.post('/tools/analyze', (req, res) => {
    const lines = (req.body.text || "").split("\n")
    const analysis = l.analyzeRhymeScheme(lines)
    res.json(analysis)
})

router.patch('/sections/:sectionId', (req, res) => {
  const { content } = req.body
  if (content !== undefined) {
    db.prepare('UPDATE lyric_sections SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(content, req.params.sectionId)
  }
  res.json({ success: true })
})

router.delete('/sections/:sectionId', (req, res) => {
  db.prepare('DELETE FROM lyric_sections WHERE id = ?').run(req.params.sectionId)
  res.json({ success: true })
})

router.get('/:id', (req, res) => {
  const draft = db.prepare('SELECT * FROM lyric_drafts WHERE id = ?').get(req.params.id)
  if (!draft) return res.status(404).json({ error: 'Draft not found' })
    
  const sections = db.prepare('SELECT * FROM lyric_sections WHERE draft_id = ? ORDER BY position ASC').all(req.params.id)
  res.json({ ...draft, sections })
})

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM lyric_sections WHERE draft_id = ?').run(req.params.id)
  db.prepare('DELETE FROM lyric_drafts WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

router.patch('/:id', (req, res) => {
  const { title, status, structure } = req.body
  const updates = []
  const values = []
  
  if (title !== undefined) { updates.push('title = ?'); values.push(title) }
  if (status !== undefined) { updates.push('status = ?'); values.push(status) }
  if (structure !== undefined) { updates.push('structure = ?'); values.push(structure) }
  
  if (updates.length > 0) {
    updates.push('updated_at = CURRENT_TIMESTAMP')
    values.push(req.params.id)
    db.prepare(`UPDATE lyric_drafts SET ${updates.join(', ')} WHERE id = ?`).run(...values)
  }
  
  res.json({ success: true })
})

router.post('/:id/sections', (req, res) => {
  const { section_type, position, content } = req.body
  const result = db.prepare(
    'INSERT INTO lyric_sections (draft_id, section_type, position, content) VALUES (?, ?, ?, ?)'
  ).run(req.params.id, section_type, position || 0, content || '')
  
  res.json({ id: result.lastInsertRowid, draft_id: req.params.id, section_type, position, content })
})

module.exports = router
