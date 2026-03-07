const fs = require('fs')
const path = require('path')

function normalizeTitle(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function daysBetween(dateA, dateB) {
  const ms = Math.abs(new Date(dateA).getTime() - new Date(dateB).getTime())
  return ms / (1000 * 60 * 60 * 24)
}

function matchCondition(song, condition, db, context) {
  if (!condition) return false

  if (condition.op === '&&' && Array.isArray(condition.conditions)) {
    return condition.conditions.every((item) => matchCondition(song, item, db, context))
  }

  if (Array.isArray(condition.all)) {
    return condition.all.every((item) => matchCondition(song, item, db, context))
  }

  const field = condition.field
  const op = condition.op
  const value = condition.value

  // Null check field
  const left = song?.[field]
  if (left === null || left === undefined) {
    // Some fields like uploads_last_7_days don't come from the song object
    if (!['uploads_last_7_days', 'days_since_last_upload', 'unfinished_projects'].includes(field)) {
      return false
    }
  }

  if (field === 'title' && op === 'contains_any') {
    const title = String(song?.title || '').toLowerCase()
    return Array.isArray(value) && value.some((keyword) => title.includes(String(keyword).toLowerCase()))
  }

  if (field === 'title' && op === 'duplicate_title') {
    const current = normalizeTitle(song?.title)
    if (!current) return false

    const others = db.prepare('SELECT id, title FROM songs WHERE id != ?').all(song?.id || -1)
    return others.some((item) => {
      const candidate = normalizeTitle(item.title)
      if (!candidate) return false
      if (candidate === current) return true
      if (candidate.length >= 5 && (candidate.includes(current) || current.includes(candidate))) return true
      return false
    })
  }

  if (field === 'uploads_last_7_days') {
    const row = db
      .prepare("SELECT COUNT(*) AS count FROM songs WHERE datetime(created_at) >= datetime('now','-7 days')")
      .get()
    context.uploadsLast7Days = row?.count || 0
    if (op === '>=') return context.uploadsLast7Days >= Number(value)
    if (op === '>') return context.uploadsLast7Days > Number(value)
    return false
  }

  if (field === 'days_since_last_upload') {
    const previous = db
      .prepare('SELECT created_at FROM songs WHERE id != ? ORDER BY created_at DESC LIMIT 1')
      .get(song?.id || -1)

    if (!previous?.created_at) return false

    const days = daysBetween(new Date(), previous.created_at)
    context.daysSinceLastUpload = days
    if (op === '>') return days > Number(value)
    if (op === '>=') return days >= Number(value)
    return false
  }

  if (field === 'unfinished_projects') {
    const row = db
      .prepare(
        `SELECT p.name, COUNT(ps.song_id) AS song_count
         FROM projects p
         LEFT JOIN project_songs ps ON ps.project_id = p.id
         GROUP BY p.id
         HAVING song_count = 0
         ORDER BY p.created_at DESC
         LIMIT 1`
      )
      .get()

    context.unfinishedProjectName = row?.name || ''
    const countRow = db
      .prepare(
        `SELECT COUNT(*) AS count
         FROM (
           SELECT p.id
           FROM projects p
           LEFT JOIN project_songs ps ON ps.project_id = p.id
           GROUP BY p.id
           HAVING COUNT(ps.song_id) = 0
         )`
      )
      .get()

    context.unfinishedProjectCount = countRow?.count || 0
    if (op === '>') return context.unfinishedProjectCount > Number(value)
    if (op === '>=') return context.unfinishedProjectCount >= Number(value)
    return false
  }

  if (op === '<') return Number(left) < Number(value)
  if (op === '>') return Number(left) > Number(value)
  if (op === '>=') return Number(left) >= Number(value)
  if (op === '<=') return Number(left) <= Number(value)
  if (op === '==') return String(left ?? '') === String(value)
  if (op === 'between') return Number(left) >= Number(condition.min) && Number(left) <= Number(condition.max)

  return false
}

function resolveMessage(rule, context) {
  let message = rule.action.message

  if (rule.rule_id === 'prolific_streak') {
    message = `You've uploaded ${context.uploadsLast7Days || 0} tracks this week. You're on a roll.`
  }

  if (rule.rule_id === 'unfinished_projects' && context.unfinishedProjectName) {
    message = `Your project '${context.unfinishedProjectName}' has no songs yet. Start adding tracks.`
  }

  return message
}

const { getPluginRules } = require('../plugins/index')

function evaluateRules(song, trigger, db) {
  try {
    const rulesPath = path.join(__dirname, '..', 'rules', 'default_rules.json')
    const defaultRules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'))
    const pluginRules = getPluginRules()
    const rules = [...defaultRules, ...pluginRules]
    
    const relevantRules = rules
      .filter((rule) => rule.trigger === trigger)
      .sort((a, b) => Number(a.priority || 999) - Number(b.priority || 999))

    const insertLog = db.prepare('INSERT INTO rule_logs (song_id, rule_id, message) VALUES (?, ?, ?)')
    const alerts = []
    const context = {}

    for (const rule of relevantRules) {
      if (matchCondition(song, rule.condition, db, context)) {
        const message = resolveMessage(rule, context)
        const songId = rule.rule_id === 'unfinished_projects' ? null : song?.id || null

        insertLog.run(songId, rule.rule_id, message)
        alerts.push({
          rule_id: rule.rule_id,
          priority: rule.priority || 999,
          type: rule.action.type,
          message
        })
      }
    }

    return alerts
  } catch (err) {
    console.error('[RuleEngine] Error evaluating rules:', err)
    return []
  }
}

module.exports = { evaluateRules }
