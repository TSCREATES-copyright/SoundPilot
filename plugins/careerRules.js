module.exports = {
  name: 'Career Coach',
  version: '1.0.0',
  rules: [
    {
      rule_id: 'replay_career_signal',
      trigger: 'song_play',
      condition: { field: 'play_count', op: '>', value: 8 },
      action: { type: 'insight', message: 'This track has strong replay signal. Consider it for release — repeated plays from a creator usually mean strong listener potential.' }
    }
  ]
}
