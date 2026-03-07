const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// DB init
require('./db/init')

// Routes — every single one listed explicitly
app.use('/api/songs',    require('./routes/songs'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/rules',    require('./routes/rules'))
app.use('/api/producer', require('./routes/producer'))
app.use('/api/lyrics',   require('./routes/lyrics'))

// Health check — use this to confirm server is alive
app.get('/api/health', (req, res) => res.json({ status: 'ok', routes: ['songs','projects','rules','producer','lyrics'] }))

// Production static serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')))
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`SoundPilot server running on port ${PORT}`))
