// Automatically generates tags for a song based on its analyzed properties
// No user input required — runs after audio analysis on upload

function generateTags(song) {
  const tags = []

  // BPM-based tags
  if (song.bpm) {
    if (song.bpm < 70) tags.push('slow', 'ambient')
    else if (song.bpm < 90) tags.push('chill', 'relaxed')
    else if (song.bpm < 110) tags.push('mid-tempo', 'smooth')
    else if (song.bpm < 130) tags.push('upbeat', 'driving')
    else if (song.bpm < 150) tags.push('fast', 'energetic')
    else tags.push('intense', 'aggressive')
  }

  // Energy-based tags
  if (song.energy === 'high') tags.push('hype', 'powerful')
  if (song.energy === 'medium') tags.push('balanced', 'versatile')
  if (song.energy === 'low') tags.push('mellow', 'atmospheric')

  // Key-based tags
  if (song.key && song.key.includes('minor')) tags.push('dark', 'emotional')
  if (song.key && song.key.includes('major')) tags.push('bright', 'uplifting')

  // Genre-based tags
  if (song.genre) tags.push(song.genre.toLowerCase())

  // Version-based tags
  if (['v1','Demo','demo'].includes(song.version)) tags.push('draft')
  if (['Master','Final','Mix'].includes(song.version)) tags.push('finished')

  return [...new Set(tags)] // deduplicate
}

module.exports = { generateTags }
