import Meyda from 'meyda'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function estimateKeyFromCentroid(centroid) {
  if (centroid < 1500) return 'A minor'
  if (centroid < 2500) return 'C major'
  if (centroid < 3500) return 'E minor'
  return 'G major'
}

function estimateEnergyLabel(avgEnergy) {
  if (avgEnergy < 0.015) return 'low'
  if (avgEnergy < 0.045) return 'medium'
  return 'high'
}

function estimateBrightness(avgCentroid) {
  return avgCentroid < 2300 ? 'dark' : 'bright'
}

function detectBpmFromRms(rmsValues, hopSize, sampleRate) {
  if (!rmsValues.length) return 120

  const mean = rmsValues.reduce((acc, n) => acc + n, 0) / rmsValues.length
  const variance = rmsValues.reduce((acc, n) => acc + (n - mean) ** 2, 0) / rmsValues.length
  const stdDev = Math.sqrt(variance)
  const threshold = mean + stdDev * 0.75
  const minGapFrames = Math.max(1, Math.floor((0.25 * sampleRate) / hopSize))

  const peaks = []

  for (let i = 1; i < rmsValues.length - 1; i += 1) {
    const value = rmsValues[i]
    if (value < threshold) continue

    if (value > rmsValues[i - 1] && value >= rmsValues[i + 1]) {
      if (!peaks.length || i - peaks[peaks.length - 1] >= minGapFrames) {
        peaks.push(i)
      }
    }
  }

  if (peaks.length < 2) return 120

  const bpmCandidates = []

  for (let i = 1; i < peaks.length; i += 1) {
    const intervalFrames = peaks[i] - peaks[i - 1]
    const intervalSeconds = (intervalFrames * hopSize) / sampleRate
    if (intervalSeconds <= 0) continue

    let bpm = 60 / intervalSeconds

    while (bpm < 40) bpm *= 2
    while (bpm > 220) bpm /= 2

    if (bpm >= 40 && bpm <= 220) {
      bpmCandidates.push(bpm)
    }
  }

  if (!bpmCandidates.length) return 120

  bpmCandidates.sort((a, b) => a - b)
  const median = bpmCandidates[Math.floor(bpmCandidates.length / 2)]
  return clamp(Math.round(median), 40, 220)
}

export async function analyzeAudioFile(file) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  const audioContext = new AudioCtx()

  try {
    const arrayBuffer = await file.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0))

    const data = audioBuffer.getChannelData(0)
    const sampleRate = audioBuffer.sampleRate
    const frameSize = 1024
    const hopSize = 512

    const rmsValues = []
    const energyValues = []
    const centroidValues = []

    for (let start = 0; start + frameSize < data.length; start += hopSize) {
      const frame = data.subarray(start, start + frameSize)
      const features = Meyda.extract(['rms', 'energy', 'spectralCentroid'], frame)

      if (!features) continue
      if (Number.isFinite(features.rms)) rmsValues.push(features.rms)
      if (Number.isFinite(features.energy)) energyValues.push(features.energy)
      if (Number.isFinite(features.spectralCentroid)) centroidValues.push(features.spectralCentroid)
    }

    const avgEnergy = energyValues.length
      ? energyValues.reduce((acc, n) => acc + n, 0) / energyValues.length
      : 0
    const avgCentroid = centroidValues.length
      ? centroidValues.reduce((acc, n) => acc + n, 0) / centroidValues.length
      : 0

    const bpm = detectBpmFromRms(rmsValues, hopSize, sampleRate)
    const energy = estimateEnergyLabel(avgEnergy)
    const spectralBrightness = estimateBrightness(avgCentroid)
    const keyEstimate = estimateKeyFromCentroid(avgCentroid)

    return {
      bpm,
      energy,
      spectralBrightness,
      key_estimate: keyEstimate,
      keyEstimate
    }
  } finally {
    await audioContext.close()
  }
}
