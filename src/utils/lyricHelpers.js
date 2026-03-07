export function computeLiveSyllables(text) {
  const lines = text.split('\n')
  return lines.map(line => {
    const words = line.trim().split(/\s+/)
    if (words.length === 1 && words[0] === '') return 0
    let total = 0
    words.forEach(w => {
      if (w) total += countWordSyllables(w)
    })
    return total
  })
}

function countWordSyllables(word) {
  let w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (w.length <= 3) return 1
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  w = w.replace(/^y/, '')
  const matches = w.match(/[aeiouy]{1,2}/g)
  let count = matches ? matches.length : 1
  if (w.endsWith('le') && w.length > 2 && !/[aeiou]/.test(w[w.length-3])) {
    count += 1
  }
  return Math.max(1, count)
}

export function highlightRhymingWords(lines) {
  return {}
}

export function formatSectionLabel(type, index) {
  const t = type.toLowerCase()
  const display = t.charAt(0).toUpperCase() + t.slice(1)
  if (['verse', 'chorus', 'prechorus', 'hook'].includes(t)) {
    return `${display} ${index + 1}`
  }
  return display
}
