module.exports = {
  name: 'Mixing Coach',
  version: '1.0.0',
  rules: [
    {
      rule_id: 'high_energy_mix_tip',
      trigger: 'song_upload',
      condition: { field: 'energy', op: '==', value: 'high' },
      action: { type: 'suggestion', message: 'High energy track: watch for low-end buildup. High-pass non-bass elements above 80Hz and check your mix in mono.' }
    },
    {
      rule_id: 'low_energy_mix_tip',
      trigger: 'song_upload',
      condition: { field: 'energy', op: '==', value: 'low' },
      action: { type: 'suggestion', message: 'Low energy track: preserve dynamics. Avoid over-compression — let the quiet moments breathe.' }
    },
    {
      rule_id: 'fast_bpm_mix_tip',
      trigger: 'song_upload',
      condition: { field: 'bpm', op: '>', value: 130 },
      action: { type: 'suggestion', message: 'Fast tempo track: use shorter reverb tails (under 1.2s) to avoid muddiness between beats.' }
    }
  ]
}
