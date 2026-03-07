module.exports = {
  name: 'Marketing Coach',
  version: '1.0.0',
  rules: [
    {
      rule_id: 'high_energy_marketing',
      trigger: 'song_upload',
      condition: { field: 'energy', op: '==', value: 'high' },
      action: { type: 'suggestion', message: 'High energy tracks perform well on TikTok and Reels. Identify the most exciting 15-second clip for your short-form content.' }
    },
    {
      rule_id: 'ambient_marketing',
      trigger: 'song_upload',
      condition: { field: 'energy', op: '==', value: 'low' },
      action: { type: 'suggestion', message: 'Low energy tracks suit YouTube study/chill playlists and Spotify ambient categories. Tag and pitch accordingly.' }
    }
  ]
}
