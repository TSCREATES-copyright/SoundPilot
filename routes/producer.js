const express = require('express')
const db = require('../db/init')
const {
  analyzeCatalog,
  computeGrowthScore,
  detectPatterns,
  buildProducerFeed
} = require('../services/patternEngine')

const router = express.Router()

router.get('/report', (req, res) => {
  try {
    const report = analyzeCatalog(db)
    res.json(report)
  } catch (err) {
    console.error('[Producer API] Error in /report:', err)
    res.status(500).json({ error: 'Failed to generate report', details: err.message })
  }
})

router.get('/patterns', (req, res) => {
  try {
    const patterns = detectPatterns(db)
    res.json(patterns || [])
  } catch (err) {
    console.error('[Producer API] Error in /patterns:', err)
    res.status(500).json({ error: 'Failed to detect patterns', details: err.message, fallback: [] })
  }
})

router.get('/score', (req, res) => {
  try {
    const score = computeGrowthScore(db)
    res.json(score)
  } catch (err) {
    console.error('[Producer API] Error in /score:', err)
    // Return a default score so UI never breaks
    res.status(500).json({
      score: 10, label: 'Error Calculating', breakdown: [
        { category: 'Upload Consistency', earned: 0, max: 25 },
        { category: 'Completion Rate', earned: 0, max: 25 },
        { category: 'Project Activity', earned: 0, max: 20 },
        { category: 'Replay Engagement', earned: 0, max: 15 },
        { category: 'Catalog Diversity', earned: 0, max: 15 }
      ]
    })
  }
})

router.get('/feed', (req, res) => {
  try {
    const feed = buildProducerFeed(db)
    res.json(feed || [])
  } catch (err) {
    console.error('[Producer API] Error in /feed:', err)
    res.status(500).json({ error: 'Failed to build feed', details: err.message, fallback: [] })
  }
})

router.get('/timeline', (req, res) => {
  res.json([])
})

const { loadPlugins } = require('../plugins/index')
router.get('/plugins', (req, res) => {
  const plugins = loadPlugins().map(p => ({
    name: p.name,
    version: p.version,
    ruleCount: (p.rules || []).length,
    rules: (p.rules || []).map(r => ({ rule_id: r.rule_id, trigger: r.trigger, message: r.action.message }))
  }))
  res.json(plugins)
})

module.exports = router
