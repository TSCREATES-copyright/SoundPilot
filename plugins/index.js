// Loads all plugin rule files from the plugins/ directory
// Each plugin exports: { name, version, rules: [], onSongUpload, onSongPlay, onProjectCreate }
// Returns merged rule set from all plugins
const path = require('path')
const fs = require('fs')

function loadPlugins() {
  const pluginFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('Rules.js'))
  
  const plugins = pluginFiles.map(file => {
    try {
      const plugin = require(path.join(__dirname, file))
      console.log(`[Plugin] Loaded: ${plugin.name} v${plugin.version}`)
      return plugin
    } catch (err) {
      console.error(`[Plugin] Failed to load ${file}:`, err.message)
      return null
    }
  }).filter(Boolean)

  return plugins
}

function getPluginRules() {
  return loadPlugins().flatMap(p => p.rules || [])
}

module.exports = { loadPlugins, getPluginRules }
