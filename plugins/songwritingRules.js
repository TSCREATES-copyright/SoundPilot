module.exports = {
  name: 'Songwriting Coach',
  version: '1.0.0',
  rules: [
    {
      rule_id: 'slow_bpm_songwriting',
      trigger: 'song_upload',
      condition: { field: 'bpm', op: '<', value: 80 },
      action: { type: 'insight', message: 'Slow tempo gives space for lyrical depth. Consider adding a spoken word section or extended melodic phrases.' }
    },
    {
      rule_id: 'mid_tempo_songwriting',
      trigger: 'song_upload',
      condition: { field: 'bpm', op: 'between', min: 80, max: 110 },
      action: { type: 'insight', message: 'Mid-tempo range is ideal for melodic hooks. Focus on a strong 4-8 syllable chorus phrase that sits naturally in this groove.' }
    }
  ]
}
