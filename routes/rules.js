const express = require('express')
const db = require('../db/init')

const router = express.Router()

router.get('/logs', (_req, res) => {
  const logs = db
    .prepare(
      `SELECT rl.id, rl.song_id, rl.rule_id, rl.message, rl.created_at, s.title AS song_title
       FROM rule_logs rl
       LEFT JOIN songs s ON s.id = rl.song_id
       ORDER BY rl.created_at DESC`
    )
    .all()

  return res.json(logs)
})

const { generateNotifications } = require('../services/notificationEngine')

router.get('/notifications', (_req, res) => {
  const notifications = generateNotifications(db)
  return res.json(notifications)
})

module.exports = router
