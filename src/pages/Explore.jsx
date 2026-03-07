import { useState } from 'react'

const TABS = [
  { id: 'songwriting', label: '✍️ Songwriting' },
  { id: 'mixing', label: '🎛️ Mixing' },
  { id: 'mastering', label: '🎚️ Mastering' },
  { id: 'ideas', label: '💡 Ideas' }
]

function SectionHeader({ title }) {
  return (
    <h3 className="text-lg font-bold text-white mb-4 border-l-2 border-accent pl-3">
      {title}
    </h3>
  )
}

function TipCard({ title, body }) {
  return (
    <div className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-5 hover:border-zinc-700 transition">
      <h4 className="text-white font-bold mb-2">{title}</h4>
      <p className="text-[#aaaaaa] text-sm leading-relaxed">{body}</p>
    </div>
  )
}

function GeneratorCard({ title, desc, onGenerate, resultNode }) {
  return (
    <div className="bg-[#1f1f1f] rounded-xl p-6 shadow-lg border border-zinc-800">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <h4 className="text-white font-bold text-lg">{title}</h4>
          <p className="text-zinc-400 text-sm mt-1">{desc}</p>
        </div>
        <button
          onClick={onGenerate}
          className="bg-accent text-black font-semibold px-4 py-2 rounded-lg text-sm hover:brightness-110 transition whitespace-nowrap"
        >
          Generate
        </button>
      </div>
      {resultNode && (
        <div className="mt-4 p-4 rounded-lg bg-[#2a2a2a]/50 border border-[#333] animate-in fade-in slide-in-from-top-2 duration-300">
          {resultNode}
        </div>
      )}
    </div>
  )
}

export default function Explore() {
  const [tab, setTab] = useState('songwriting')

  // Generator 1 State
  const [gen1Result, setGen1Result] = useState(null)
  const generateMashup = () => {
    const genres = [
      'Lo-fi', 'Afrobeats', 'Drill', 'Hyperpop', 'Jazz', 'Bossa Nova', 'Ambient', 'Vaporwave', 'Reggaeton', 'Soul',
      'Funk', 'Trap', 'House', 'Drum & Bass', 'Indie Folk', 'Shoegaze', 'Synthwave', 'Garage', 'Grime', 'Neo-Soul',
      'K-Pop', 'Cumbia', 'Footwork', 'Baile Funk', 'Jersey Club'
    ]
    let a = genres[Math.floor(Math.random() * genres.length)]
    let b = genres[Math.floor(Math.random() * genres.length)]
    while (a === b) b = genres[Math.floor(Math.random() * genres.length)]
    
    setGen1Result(
      <>
        <p className="text-white font-bold mb-2">Try blending {a} + {b}</p>
        <p className="text-sm text-zinc-300 mb-2">
          This fusion takes the rhythmic identity of {a.toLowerCase()} and recontextualizes it with the sonic textures of {b.toLowerCase()}. Focus on finding a BPM that satisfies both styles.
        </p>
        <p className="text-xs text-accent mt-3 font-medium">→ Production Tip: Commit to one genre&apos;s drum groove and the other&apos;s harmonic language before adding details.</p>
      </>
    )
  }

  // Generator 2 State
  const [gen2Result, setGen2Result] = useState(null)
  const generateConcept = () => {
    const moods = ['melancholic', 'euphoric', 'anxious', 'nostalgic', 'defiant', 'serene', 'restless', 'bittersweet', 'triumphant', 'detached']
    const settings = ['late-night highway', 'empty apartment', 'rooftop at sunrise', 'crowded subway', 'childhood bedroom', 'hotel room', 'beach at dusk', 'basement studio', 'city overlook', 'forest path']
    const themes = ['letting go', 'starting over', 'missing someone', 'finding yourself', 'outgrowing a friendship', 'chasing a dream', 'being misunderstood', 'returning home', 'moving on', 'first love']
    const anchors = ['sparse piano', 'filtered guitar', '808 sub', 'plucked strings', 'lo-fi drums', 'warm synth pad', 'live bass', 'vocal chops', 'steel drum', 'distorted keys']
    
    const mood = moods[Math.floor(Math.random() * moods.length)]
    const setting = settings[Math.floor(Math.random() * settings.length)]
    const theme = themes[Math.floor(Math.random() * themes.length)]
    const anchor = anchors[Math.floor(Math.random() * anchors.length)]

    setGen2Result(
      <>
        <p className="text-white font-medium text-lg leading-snug">
          A <span className="text-accent">{mood}</span> <span className="text-accent">{setting}</span> track about <span className="text-accent">{theme}</span>, anchored by <span className="text-accent">{anchor}</span>.
        </p>
        <p className="text-sm text-zinc-400 mt-2">
          Start by looping the {anchor} and building the core atmosphere of the {setting} before adding rhythm.
        </p>
      </>
    )
  }

  // Generator 3 State
  const [gen3Result, setGen3Result] = useState(null)
  const generateChords = () => {
    const progressions = [
      { p: 'i–VI–III–VII', desc: 'The Epic Minor — used by massive cinematic and pop records' },
      { p: 'I–V–vi–IV', desc: 'The Axis — foundation of hundreds of hit songs' },
      { p: 'i–VII–VI–VII', desc: 'The Andalusian Cadence — flamenco tension, cinematic power' },
      { p: 'ii–V–I', desc: 'The Jazz Standard — harmonic sophistication and resolution' },
      { p: 'I–IV–I–V', desc: 'The Blues Shell — raw and timeless' },
      { p: 'vi–IV–I–V', desc: 'The Sensitive Progression — emotional pop and indie standard' },
      { p: 'i–iv–VII–III', desc: 'The Dark Epic — cinematic and driving' },
      { p: 'I–iii–IV–V', desc: 'The Classic Rise — builds naturally to resolution' },
      { p: 'i–VI–VII–i', desc: 'The Loop — hypnotic and modern, great for loop-based production' },
      { p: 'IV–I–V–vi', desc: 'The Deceptive Resolution — starts resolved, ends uncertain' },
      { p: 'I–II–IV–I', desc: 'The Gospel Lift — uplifting and soulful' },
      { p: 'i–III–VI–VII', desc: 'The Neo-Soul Flow — warm, jazzy, modern R&B' },
      { p: 'I–V–II–IV', desc: 'The Pop Pivot — bright and anthemic' },
      { p: 'i–v–i–VII', desc: 'The Brooding Minor — introspective and heavy' },
      { p: 'II–V–I–VI', desc: 'The Turnaround — jazz-influenced forward motion' }
    ]
    const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'Eb']
    const prog = progressions[Math.floor(Math.random() * progressions.length)]
    const key = keys[Math.floor(Math.random() * keys.length)]

    setGen3Result(
      <>
        <p className="text-xl font-bold text-white tracking-widest">{prog.p}</p>
        <p className="text-sm text-zinc-300 mt-1">{prog.desc}</p>
        <p className="text-xs text-accent mt-3 px-2 py-1 bg-accent/10 rounded inline-block">
          Try this in the key of {key}
        </p>
      </>
    )
  }

  // Generator 4 State
  const [gen4Result, setGen4Result] = useState(null)
  const generateTitles = () => {
    const adjectives = ['neon', 'hollow', 'silent', 'fractured', 'golden', 'distant', 'raw', 'frozen', 'burning', 'faded', 'electric', 'lost', 'heavy', 'pale', 'sharp']
    const nouns = ['signal', 'architecture', 'meridian', 'current', 'static', 'frequency', 'drift', 'vessel', 'gravity', 'threshold', 'echo', 'sequence', 'aperture', 'bloom', 'collapse']
    const suffixes = [' (feat. nobody)', ' [interlude]', ' - demo', ' pt. II', ' (reprise)', ' v2', ' [unfinished]']

    const createTitle = () => {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
      const noun = nouns[Math.floor(Math.random() * nouns.length)]
      const useSuffix = Math.random() > 0.5
      const suffix = useSuffix ? suffixes[Math.floor(Math.random() * suffixes.length)] : ''
      return `${adj} ${noun}${suffix}`
    }

    setGen4Result(
      <ul className="space-y-2">
        <li className="text-white font-medium text-lg uppercase tracking-wider">{createTitle()}</li>
        <li className="text-white font-medium text-lg uppercase tracking-wider">{createTitle()}</li>
        <li className="text-white font-medium text-lg uppercase tracking-wider">{createTitle()}</li>
      </ul>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="page-title">Explore</h2>
      </div>

      <div className="flex gap-2 border-b border-border pb-2 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-t border-b-2 transition whitespace-nowrap ${
              tab === t.id
                ? 'border-accent text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {tab === 'songwriting' && (
          <div className="animate-in fade-in duration-300 space-y-10">
            <section>
              <SectionHeader title="Song Structure" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TipCard
                  title="The Verse-Chorus Contract"
                  body="Your verse creates tension, your chorus must release it. If your chorus doesn't feel like relief, rewrite it."
                />
                <TipCard
                  title="The 8-Bar Rule"
                  body="Most listeners decide in the first 8 bars. Put your most compelling element there — a hook, a riff, an interesting texture."
                />
                <TipCard
                  title="Build with Contrast"
                  body="Energy, density, pitch register, and rhythm should all shift between sections. Contrast is what makes transitions feel earned."
                />
              </div>
            </section>
            
            <section>
              <SectionHeader title="Melody & Hooks" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TipCard
                  title="Singability Test"
                  body="If you can't hum your hook while doing something else, it's not sticky enough yet."
                />
                <TipCard
                  title="Range Anchoring"
                  body="Place your most important melodic moment at the highest or lowest point in your vocal range. Extremes register emotionally."
                />
                <TipCard
                  title="Rhythm over Pitch"
                  body="A rhythmically interesting melody on simple notes outperforms a complex melody with no rhythmic identity."
                />
              </div>
            </section>
          </div>
        )}

        {tab === 'mixing' && (
          <div className="animate-in fade-in duration-300 space-y-10">
            <section>
              <SectionHeader title="Fundamentals" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TipCard
                  title="Gain Staging is Everything"
                  body="Every element entering your mix should hit around -18 dBFS RMS. Headroom prevents buildup and keeps your plugins performing correctly."
                />
                <TipCard
                  title="Mono First"
                  body="Mix in mono until your balance feels right. If it sounds good in mono, stereo will make it great. If it sounds bad in mono, stereo is hiding problems."
                />
                <TipCard
                  title="Low End is the Foundation"
                  body="Get your kick and bass relationship right before touching anything else. Everything else sits on top of this."
                />
              </div>
            </section>
          </div>
        )}

        {tab === 'mastering' && (
          <div className="animate-in fade-in duration-300 space-y-10">
            <section>
              <SectionHeader title="Preparation" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TipCard
                  title="The -6dB Rule"
                  body="Export your premaster with at least -6dB of headroom. If your mix is peaking at 0dB, the mastering chain has nowhere to work."
                />
                <TipCard
                  title="Bypass Your Bus Processing"
                  body="Remove limiting and heavy compression from your mix bus before sending to master. Let the mastering chain handle dynamics."
                />
                <TipCard
                  title="Reference Your Mix"
                  body="Before mastering, A/B your mix against 3 commercial references in the same genre at matched loudness (-14 LUFS). Note the differences."
                />
              </div>
            </section>
          </div>
        )}

        {tab === 'ideas' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <GeneratorCard
              title="Genre Mashup"
              desc="Combine two random genres to find a unique fusion point."
              onGenerate={generateMashup}
              resultNode={gen1Result}
            />
            <GeneratorCard
              title="Song Concept"
              desc="Build an atmosphere with mood, setting, theme, and an anchor instrument."
              onGenerate={generateConcept}
              resultNode={gen2Result}
            />
            <GeneratorCard
              title="Chord Progression"
              desc="Classic and modern harmonic foundations to start your track."
              onGenerate={generateChords}
              resultNode={gen3Result}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
