const Database = require('better-sqlite3')
const fs = require('fs')
const path = require('path')

const db = new Database(path.join(__dirname, 'database.sqlite'))
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
db.exec(schema)

// Safe column additions
try {
  db.prepare("ALTER TABLE songs ADD COLUMN tags TEXT DEFAULT '[]'").run()
} catch (e) {
  // Column already exists, ignore
}

try {
  db.prepare("ALTER TABLE songs ADD COLUMN energy TEXT").run()
} catch (e) {
  // Column already exists, ignore
}

module.exports = db
