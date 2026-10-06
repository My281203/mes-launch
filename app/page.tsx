'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, Boxes, Check, ChevronLeft, ChevronRight, CirclePlay, Factory, Layers3, Menu, Network, PackageCheck, Play, ScanLine, Settings2, Sparkles, X, Zap } from 'lucide-react'

const navItems = [['Overview', 'overview'], ['Features', 'features'], ["What's New", 'new'], ['Roadmap', 'roadmap'], ['Implementations', 'implementations'], ['About', 'about']]
const stages = [
  { label: 'PLAN', title: 'Production planning', desc: 'Translate demand into an executable production plan with clear priorities.', icon: Layers3, stat: '94%', statLabel: 'plan adherence' },
  { label: 'MATERIAL', title: 'Material readiness', desc: 'Ensure material availability before production starts, with shortages surfaced early.', icon: Boxes, stat: 'LIVE', statLabel: 'readiness status' },
  { label: 'PRODUCTION', title: 'Shop floor execution', desc: 'Track production progress in real time and give every line the context to move forward.', icon: Factory, stat: '24/7', statLabel: 'line visibility' },
  { label: 'QUALITY', title: 'Quality at the source', desc: 'Monitor quality throughout every production stage, not after the fact.', icon: ScanLine, stat: '100%', statLabel: 'digital traceability' },
  { label: 'PACKING', title: 'Order-ready packing', desc: 'Keep packing aligned to the plan with clear status from finished unit to shipment.', icon: PackageCheck, stat: 'SYNC', statLabel: 'shipment readiness' },
  { label: 'WAREHOUSE', title: 'Connected warehouse', desc: 'Keep finished goods moving with a single, accurate source of truth.', icon: PackageCheck, stat: '1', statLabel: 'connected flow' },
  { label: 'ANALYTICS', title: 'Operational intelligence', desc: 'Turn production data into decisions your teams can act on.', icon: BarChart3, stat: 'REAL', statLabel: 'time insight' },
]
const features = [
  ['Production Management', 'See the entire production pulse in one place.', 'Live line status', '24 Lines', '96.4%', BarChart3],
  ['Work Order Management', 'Turn each order into a clear, accountable execution path.', 'Work order flow', '384', 'active orders', Settings2],
  ['Material Management', 'Move from material uncertainty to readiness confidence.', 'Material readiness', '1,248', 'SKUs tracked', Boxes],
  ['Warehouse Management', 'Keep inventory, packing, and dispatch connected to production.', 'Warehouse status', '08', 'locations live', PackageCheck],
  ['Quality Management', 'Build quality into every step of the operation.', 'Quality signals', '98.2%', 'pass rate', ScanLine],
  ['Traceability', 'Follow every order, bundle, and unit through the floor.', 'End-to-end trace', '12,840', 'units today', Network],
  ['Analytics & Reporting', 'Make operational performance visible and actionable.', 'Decision signals', '12.8%', 'throughput lift', BarChart3],
  ['SAP / ERP Integration', 'Connect enterprise planning with what is happening on the floor.', 'System sync', 'LIVE', 'data exchange', Zap],
]
const releases = [
  { tag: 'NEW / 02.26', title: 'Production Dashboard', copy: 'A faster, clearer view of what is happening across every line.', tone: 'blue' },
  { tag: 'NEW / 01.26', title: 'Material Readiness', copy: 'Surface shortages before they become production delays.', tone: 'lime' },
  { tag: 'NEW / 12.25', title: 'Enhanced Quality Tracking', copy: 'Capture, contextualize, and close the loop on quality events.', tone: 'violet' },
]
const roadmap = [
  ['Q4 2026', 'AI Production Assistant', 'IN DEVELOPMENT', 'Ask your operation anything.'],
  ['Q1 2027', 'Advanced Production Analytics', 'COMING SOON', 'Find the patterns behind performance.'],
  ['Q1 2027', 'Predictive Material Planning', 'COMING SOON', 'See risk before it reaches the line.'],
  ['Q2 2027', 'Natural Language Analytics', 'EXPLORING', 'Make every question a useful insight.'],
]
const implementations = [
  { name: 'KUGIL', country: 'Vietnam', industry: 'Garment manufacturing', modules: 'Planning · Production · Quality', image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=85', accent: 'from-cyan-400/35 to-blue-700/10' },
  { name: 'THLONE', country: 'Vietnam', industry: 'Garment manufacturing', modules: 'Material · Warehouse · Analytics', image: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1400&q=85', accent: 'from-violet-400/30 to-blue-700/10' },
]

const factoryMedia = {
  hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1800&q=85',
  plan: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1400&q=85',
  material: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=1400&q=85',
  production: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=85',
  quality: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85',
  packing: 'https://images.unsplash.com/photo-1586528116493-da8b0b1a4b28?auto=format&fit=crop&w=1400&q=85',
  warehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
  analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85',
}

const stageMedia = [factoryMedia.plan, factoryMedia.material, factoryMedia.production, factoryMedia.quality, factoryMedia.packing, factoryMedia.warehouse, factoryMedia.analytics]
const featureMedia = [factoryMedia.production, factoryMedia.plan, factoryMedia.material, factoryMedia.warehouse, factoryMedia.quality, factoryMedia.quality, factoryMedia.analytics, factoryMedia.analytics]
const releaseMedia = [factoryMedia.production, factoryMedia.warehouse, factoryMedia.quality]

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .7, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}

function UiMockup({ compact = false }: { compact?: boolean }) {
  return <div className={`ui-mockup ${compact ? 'compact' : ''}`}><div className="ui-top"><span className="ui-dot active"/><span className="ui-dot"/><span className="ui-dot"/><span className="ui-brand">MES / CONTROL TOWER</span><span className="ui-live">● LIVE</span></div><div className="ui-body"><div className="ui-sidebar"><i/><i/><i/><i/><i/></div><div className="ui-content"><div className="ui-heading"><span>Factory control tower</span><small>Live floor · 14 Nov 2026</small></div><div className="ui-kpis"><b><strong>98.6%</strong><em>OEE today</em></b><b><strong>1,184</strong><em>Daily output</em></b><b><strong>92%</strong><em>Material ready</em></b></div><div className="ui-chart"><div className="chart-label">Line performance <span>+12.8%</span></div><div className="bars">{[45,68,52,80,62,92,72,86,64,96,78,88].map((h, i) => <i key={i} style={{height: `${h}%`}}/>)}</div></div><div className="ui-table"><span>Line A / Sewing <b className="green">Running</b></span><span>Quality / First pass <b className="yellow">98.2%</b></span><span>Warehouse / Dispatch <b className="green">Ready</b></span></div></div></div></div>
}

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) { return <div className={`section-label ${dark ? 'dark-label' : ''}`}><span className="label-dot"/>{children}</div> }

function VideoPanel() {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
      setPlaying(entry.isIntersecting)
    }, { threshold: 0.35 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const videoSrc = 'https://www.youtube-nocookie.com/embed/Z0YatNniMas?autoplay=1&mute=1&controls=0&loop=1&playlist=Z0YatNniMas&rel=0&modestbranding=1&playsinline=1'
  return <div ref={ref} className="video-panel" role="region" aria-label="MES product demo">
    <div className="video-media" style={{ backgroundImage: `url(${factoryMedia.hero})` }}>
      {playing && visible ? <iframe src={videoSrc} title="MES product demo: connected garment manufacturing" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /> : <><div className="video-grid"/><button className="play-button" onClick={() => setPlaying(true)} aria-label="Play MES product demo"><Play fill="currentColor" size={20}/></button></>}
      <div className="video-overlay-copy"><span>REAL FACTORY</span><span>REAL-TIME DATA</span><span>ONE CONNECTED MES</span></div>
      <div className="video-signal"><i/>LINE A <b>RUNNING</b><small>OUTPUT 1,184 PCS · EFFICIENCY 98.6%</small></div>
    </div>
    <div className="video-copy"><span>PRODUCT DEMO / REAL FACTORY · REAL-TIME DATA</span><strong>{playing ? 'The factory, connected.' : 'See how it all connects.'}</strong><p>See how MES connects production, quality, warehouse, and manufacturing operations in real time.</p></div><div className="video-caption"><span>From factory floor</span><ArrowRight size={14}/><span>to operational intelligence</span></div>
  </div>
}

let activeStorySection: string | null = null
const storyListeners = new Set<() => void>()

function useStoryAutoplay(id: string, count: number, selected: number, onSelect: (index: number) => void) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const manualUntil = useRef(0)

  const claim = useCallback(() => {
    if (activeStorySection !== id) {
      activeStorySection = id
      storyListeners.forEach((listener) => listener())
    }
  }, [id])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    updateMotion()
    media.addEventListener('change', updateMotion)
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
      if (entry.isIntersecting) claim()
      else if (activeStorySection === id) activeStorySection = null
    }, { threshold: 0.25 })
    if (ref.current) observer.observe(ref.current)
    const rerender = () => setVisible((current) => current)
    storyListeners.add(rerender)
    return () => { observer.disconnect(); media.removeEventListener('change', updateMotion); storyListeners.delete(rerender); if (activeStorySection === id) activeStorySection = null }
  }, [claim, id])

  useEffect(() => {
    if (!visible || reducedMotion || activeStorySection !== id) { setProgress(0); return }
    const activationDelay = selected === 0 && manualUntil.current === 0 ? 700 : 0
    const manualPause = Math.max(0, manualUntil.current - performance.now())
    const hold = 3000
    const startedAt = performance.now()
    let frame = 0
    let lastProgress = -1
    const tick = (now: number) => {
      const elapsed = now - startedAt
      const wait = Math.max(activationDelay, manualPause)
      const nextProgress = elapsed <= wait ? 0 : Math.min(100, ((elapsed - wait) / hold) * 100)
      if (Math.floor(nextProgress) !== lastProgress) { lastProgress = Math.floor(nextProgress); setProgress(nextProgress) }
      if (elapsed >= wait + hold) {
        onSelect((selected + 1) % count)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    const visibility = () => { if (document.hidden) cancelAnimationFrame(frame) }
    document.addEventListener('visibilitychange', visibility)
    return () => { cancelAnimationFrame(frame); document.removeEventListener('visibilitychange', visibility) }
  }, [count, id, onSelect, reducedMotion, selected, visible])

  const select = (index: number) => { claim(); manualUntil.current = performance.now() + 3000; setProgress(0); onSelect(index) }
  return { ref, progress, select, active: visible && activeStorySection === id }
}

export default function Page() {
  const [activeStage, setActiveStage] = useState(0); const [activeFeature, setActiveFeature] = useState(0); const [release, setRelease] = useState(0); const [menu, setMenu] = useState(false); const { scrollY } = useScroll(); const [scrolled, setScrolled] = useState(false); useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 36))
  const chooseStage = useCallback((index: number) => setActiveStage(index), [])
  const chooseFeature = useCallback((index: number) => setActiveFeature(index), [])
  const chooseRelease = useCallback((index: number) => setRelease(index), [])
  const flowStory = useStoryAutoplay('flow', stages.length, activeStage, chooseStage)
  const toolkitStory = useStoryAutoplay('toolkit', features.length, activeFeature, chooseFeature)
  const releasesStory = useStoryAutoplay('releases', releases.length, release, chooseRelease)
  return <main className="site-shell">
    <header className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}><a href="#overview" className="logo"><span className="logo-mark"><i/><i/><i/></span><span>MES<span className="logo-sub">SYSTEMS</span></span></a><nav>{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><a href="#contact" className="nav-cta">Request a demo <ArrowUpRight size={16}/></a><button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button>{menu && <div className="mobile-menu">{navItems.map(([label, id]) => <a onClick={() => setMenu(false)} key={id} href={`#${id}`}>{label}</a>)}<a href="#contact">Request a demo <ArrowRight size={16}/></a></div>}</header>
    <section id="overview" className="hero"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-copy"><SectionLabel dark>THE OPERATING SYSTEM FOR MODERN MANUFACTURING</SectionLabel><h1>Connected manufacturing <span>starts here.</span></h1><p>Connect the factory, empower production, and turn operational data into intelligence with one complete MES platform.</p><div className="hero-actions"><a className="btn btn-blue" href="#mes">Explore MES <ArrowRight size={17}/></a><a className="text-link light-link" href="#contact">Request a demo <ArrowUpRight size={16}/></a></div></div><div className="hero-visual"><div className="hero-core"><div className="core-ring"/><span>MES</span><small>CONNECTED<br/>OPERATIONS</small></div>{stages.slice(0, 6).map((stage, i) => <div key={stage.label} className={`flow-node node-${i}`}><stage.icon size={16}/><span>{stage.label}</span></div>)}<div className="flow-line line-a"/><div className="flow-line line-b"/></div><a href="#mes" className="scroll-cue"><span className="scroll-line"/>Scroll to explore <ArrowDownRight size={15}/></a></section>
    <section id="mes" className="section intro"><div className="intro-copy"><SectionLabel>01 / THE PLATFORM</SectionLabel><Reveal><h2>Meet your <em>connected</em> operation.</h2><p>Connect people, processes, systems, and production data in one intelligent manufacturing ecosystem.</p><a className="text-link" href="#solution">Explore how it works <ArrowRight size={16}/></a></Reveal></div><div className="ecosystem"><div className="eco-core">MES<span>one source of truth</span></div>{['Production planning', 'Warehouse', 'Quality', 'Traceability', 'Analytics', 'SAP integration'].map((x, i) => <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3 + i * .3, repeat: Infinity, delay: i * .2 }} className={`eco-node eco-${i}`} key={x}><span>{x}</span></motion.div>)}<div className="eco-lines"/></div></section>
    <section className="dark-section problem"><div className="problem-inner"><SectionLabel dark>02 / THE SHIFT</SectionLabel><Reveal><h2>Manufacturing is <em>complex.</em></h2><p className="lead-muted">The work is hard enough. Your systems should make it easier.</p></Reveal><div className="problem-list">{['Disconnected systems', 'Manual processes', 'Limited visibility', 'Delayed information', 'Data inconsistency', 'Difficult traceability'].map((x, i) => <Reveal key={x} delay={i * .07}><div><span>0{i + 1}</span>{x}<Check size={16}/></div></Reveal>)}</div><Reveal><div className="problem-transition">What if everything could <span>work as one?</span> <ArrowDownRight/></div></Reveal></div></section>
    <section id="solution" ref={flowStory.ref} className={`section solution ${flowStory.active ? 'story-active' : ''}`}><div className="section-head"><div><SectionLabel>03 / THE FLOW</SectionLabel><Reveal><h2>One MES. One <em>connected</em> operation.</h2></Reveal></div><p>From the first plan to the final shipment, every moment stays in sync across one manufacturing execution platform.</p></div><div className="stage-layout"><div className="stage-list">{stages.map((s, i) => <button key={s.label} className={activeStage === i ? 'stage-active' : ''} onClick={() => flowStory.select(i)} aria-pressed={activeStage === i}><span>0{i + 1}</span><s.icon size={18}/><strong>{s.label}</strong><ArrowRight size={15}/>{activeStage === i && <i className="story-progress" style={{ '--progress': `${flowStory.progress}%` } as React.CSSProperties}/>}</button>)}</div><div className="stage-detail" style={{ '--stage-image': `url(${stageMedia[activeStage]})` } as React.CSSProperties}><div className="stage-number">0{activeStage + 1} / 07</div><motion.div className="stage-content" key={activeStage} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}><h3>{stages[activeStage].title}</h3><p>{stages[activeStage].desc}</p><div className="stage-stat"><strong>{stages[activeStage].stat}</strong><span>{stages[activeStage].statLabel}</span></div></motion.div><div className="stage-signal"><span>{stages[activeStage].label} / LIVE FLOOR SIGNAL</span><div className="mini-bars">{[38,62,48,82,66,90].map((h, i) => <i key={i} style={{height: `${h}%`}}/>)}</div></div></div></div></section>
    <section id="features" ref={toolkitStory.ref} className={`dark-section features ${toolkitStory.active ? 'story-active' : ''}`}><div className="section-head dark-head"><div><SectionLabel dark>04 / THE TOOLKIT</SectionLabel><Reveal><h2>Built for the <em>factory floor.</em></h2></Reveal></div><p>Powerful enough for the factory. Simple enough for everyone.</p></div><div className="feature-story"><div className="feature-tabs">{features.map((f, i) => <button key={f[0] as string} className={activeFeature === i ? 'feature-active' : ''} onClick={() => toolkitStory.select(i)} aria-pressed={activeFeature === i}><span>0{i + 1}</span>{f[0] as string}<ArrowRight size={15}/>{activeFeature === i && <i className="story-progress" style={{ '--progress': `${toolkitStory.progress}%` } as React.CSSProperties}/>}</button>)}</div><motion.div className="feature-copy" key={activeFeature} initial={{opacity:0, x:15}} animate={{opacity:1,x:0}}><SectionLabel dark>{features[activeFeature][2] as string}</SectionLabel><h3>{features[activeFeature][0] as string}</h3><p>{features[activeFeature][1] as string}</p><a className="text-link light-link" href="#contact">Explore capability <ArrowRight size={16}/></a></motion.div><div className="feature-ui" style={{ backgroundImage: `linear-gradient(180deg, rgba(11,15,20,.02), rgba(11,15,20,.08)), url(${featureMedia[activeFeature]})` }}><div className="feature-media-signal"><span>{features[activeFeature][2] as string}</span><strong>{features[activeFeature][3] as string}</strong><small>{features[activeFeature][4] as string}</small></div><div className="feature-media-scan"/></div></div></section>
    <section className="section demo"><div className="section-head"><div><SectionLabel>05 / PRODUCT DEMO</SectionLabel><Reveal><h2>See MES <em>in action.</em></h2></Reveal></div><p>One continuous thread from the factory floor to the decisions that move your business forward.</p></div><Reveal><VideoPanel/></Reveal></section>
    <section id="new" ref={releasesStory.ref} className={`section releases ${releasesStory.active ? 'story-active' : ''}`}><div className="section-head"><div><SectionLabel>06 / RELEASES</SectionLabel><Reveal><h2>What&apos;s <em>new.</em></h2></Reveal></div><p>Continuous improvements. Smarter workflows. Better manufacturing visibility.</p></div><div className="release-show"><div className={`release-art release-${release}`} style={{ backgroundImage: `linear-gradient(180deg, rgba(11,15,20,.1), rgba(11,15,20,.8)), url(${releaseMedia[release]})` }}><div className="release-grid"/><span>{releases[release].tag}</span><strong>{releases[release].title}</strong>{release === 1 ? <div className="release-dashboard"><div className="release-dashboard-top"><span>MES / MATERIAL READINESS</span><b>● LIVE</b></div><div className="release-dashboard-kpis"><strong>92%<small>Ready to issue</small></strong><strong>1,248<small>SKUs tracked</small></strong><strong>08<small>At-risk orders</small></strong></div><div className="release-dashboard-bars">{[58,72,46,86,64,92,78].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><div className="release-dashboard-row"><span>Fabric rolls / Lot 2048</span><b>READY</b></div></div> : <div className="release-chart">{[35,52,42,78,58,92,71,84].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div>}</div><div className="release-info"><SectionLabel>{releases[release].tag}</SectionLabel><h3>{releases[release].title}</h3><p>{releases[release].copy}</p><a className="text-link" href="#contact">Explore release <ArrowRight size={16}/></a><div className="carousel-controls"><button onClick={() => releasesStory.select((release + releases.length - 1) % releases.length)} aria-label="Previous release"><ChevronLeft/></button><span>0{release + 1} <i/> 0{releases.length}</span><button onClick={() => releasesStory.select((release + 1) % releases.length)} aria-label="Next release"><ChevronRight/></button></div></div></div></section>
    <section id="roadmap" className="dark-section roadmap"><div className="roadmap-head"><SectionLabel dark>07 / THE HORIZON</SectionLabel><Reveal><h2>What&apos;s coming <em>next.</em></h2></Reveal><p>Our roadmap is a living commitment to better ways of working.</p></div><div className="timeline">{roadmap.map((r, i) => <Reveal key={r[1]} delay={i*.1}><div className="timeline-item"><div className="timeline-dot"/><span className="timeline-quarter">{r[0]}</span><small>{r[2]}</small><h3>{r[1]}</h3><p>{r[3]}</p></div></Reveal>)}</div><a className="text-link light-link roadmap-cta" href="#contact">Explore the roadmap <ArrowRight size={16}/></a></section>
    <section id="implementations" className="section implementations"><div className="section-head"><div><SectionLabel>08 / IN THE FIELD</SectionLabel><Reveal><h2>Explore MES in the <em>real world.</em></h2></Reveal></div><p>See how our platform is adapted to different manufacturing environments.</p></div><div className="case-grid">{implementations.map((item, i) => <Reveal key={item.name} delay={i*.1}><article className="case-card"><div className={`case-art bg-gradient-to-br ${item.accent}`} style={{ backgroundImage: `linear-gradient(180deg, rgba(11,15,20,.08), rgba(11,15,20,.78)), url(${item.image})` }}><Factory/><span>EXAMPLE / DEMO · 0{i+1}</span><div className="case-lines"/></div><div className="case-info"><div><h3>{item.name}</h3><p>{item.industry} · {item.country}</p></div><ArrowUpRight size={16}/><span className="case-modules">{item.modules}</span><a href="#contact">Explore implementation <ArrowRight size={15}/></a></div></article></Reveal>)}</div></section>
    <section className="section impact"><SectionLabel>09 / THE IMPACT</SectionLabel><Reveal><h2>Built for <em>real operations.</em></h2></Reveal><p className="demo-note">Illustrative demo metrics · subject to actual deployment scale</p><div className="impact-marquee" aria-label="Illustrative demo metrics"><div className="impact-grid">{[['50+', 'Production lines'], ['1,200+', 'Active users'], ['18M+', 'Production records'], ['24', 'MES modules'], ['12', 'Connected sites'], ['98.6%', 'Data availability'], ['3.2M+', 'Work orders tracked'], ['25M+', 'Material transactions']].map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div><div className="impact-grid" aria-hidden="true">{[['50+', 'Production lines'], ['1,200+', 'Active users'], ['18M+', 'Production records'], ['24', 'MES modules'], ['12', 'Connected sites'], ['98.6%', 'Data availability'], ['3.2M+', 'Work orders tracked'], ['25M+', 'Material transactions']].map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></div></section>
    <section id="about" className="dark-section why"><SectionLabel dark>10 / THE DIFFERENCE</SectionLabel><Reveal><h2>More than production <em>tracking.</em></h2></Reveal><div className="why-list">{['Real-time visibility', 'End-to-end traceability', 'Flexible workflows', 'Enterprise integration', 'Data-driven decisions'].map((x,i)=><Reveal key={x} delay={i*.08}><div><span>0{i+1}</span><strong>{x}</strong><ArrowUpRight size={16}/></div></Reveal>)}</div></section>
    <section className="section future"><div className="future-copy"><SectionLabel>11 / FUTURE VISION</SectionLabel><Reveal><h2>From MES to <em>manufacturing intelligence.</em></h2><p>Turn operational data into better decisions. The next chapter is already taking shape.</p></Reveal><span className="future-badge"><Sparkles size={14}/> FUTURE VISION</span></div><div className="future-list">{['AI Production Assistant', 'Production Anomaly Detection', 'Predictive Insights', 'Smart Material Planning', 'Natural Language Analytics'].map((x,i)=><Reveal key={x} delay={i*.08}><div><span>0{i+1}</span><strong>{x}</strong><small>COMING SOON</small><ArrowRight size={16}/></div></Reveal>)}</div></section>
    <section className="section explore"><SectionLabel>12 / KEEP EXPLORING</SectionLabel><Reveal><h2>There&apos;s more to <em>discover.</em></h2></Reveal><div className="explore-grid">{[['01', 'Explore features', 'See the capabilities built for your operation.', '#features'], ['02', 'See implementations', 'Meet the teams already moving forward.', '#implementations'], ['03', 'Explore roadmap', 'See where manufacturing intelligence is going.', '#roadmap']].map(([n,t,d,href])=><a href={href} key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowUpRight size={16}/></a>)}</div></section>
    <section id="contact" className="final-cta"><div className="cta-grid"/><SectionLabel dark>READY WHEN YOU ARE</SectionLabel><h2>Ready to connect<br/><em>your factory?</em></h2><p>Connect your people, processes, and production data with a complete MES platform.</p><div className="hero-actions"><a className="btn btn-blue" href="mailto:hello@messystems.example">Request a demo <ArrowRight size={17}/></a><a className="text-link light-link" href="#overview">Explore MES <ArrowUpRight size={16}/></a></div></section>
    <footer><div className="footer-brand"><a href="#overview" className="logo"><span className="logo-mark"><i/><i/><i/></span><span>MES<span className="logo-sub">SYSTEMS</span></span></a><p>The operating system for modern manufacturing.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#features">Features</a><a href="#new">What&apos;s new</a><a href="#roadmap">Roadmap</a></div><div><strong>Company</strong><a href="#implementations">Implementations</a><a href="#about">About MES</a><a href="#contact">Request a demo</a></div><div><strong>Contact</strong><a href="mailto:hello@messystems.example">hello@messystems.example</a><span>© 2026 MES Systems</span></div></div></footer>
  </main>
}
