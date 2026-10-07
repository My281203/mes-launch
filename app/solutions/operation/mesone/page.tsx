'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, animate, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, Boxes, Check, ChevronLeft, ChevronRight, CirclePlay, Factory, Layers3, Menu, Network, PackageCheck, Play, ScanLine, Settings2, Sparkles, X, Zap } from 'lucide-react'

const navItems = [['Overview', 'overview'], ['Features', 'features'], ["What's New", 'new'], ['Roadmap', 'roadmap'], ['Implementations', 'implementations'], ['About', 'about']]
const sectionNavItems = [['Overview', 'overview'], ['Platform', 'mes'], ['The Shift', 'problem'], ['The Flow', 'solution'], ['The Toolkit', 'features'], ['Product Demo', 'demo'], ["What's New", 'new'], ['Roadmap', 'roadmap'], ['Implementations', 'implementations'], ['Impact', 'impact'], ['About', 'about'], ['Future Vision', 'future'], ['Explore', 'explore'], ['Request a demo', 'contact']]
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

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const match = value.match(/^([\d,.]+)(.*)$/)
  const target = match ? parseFloat(match[1].replace(/,/g, '')) : 0
  const decimals = match?.[1].includes('.') ? (match[1].split('.')[1] ?? '').length : 0
  const hasNumber = match !== null
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (!inView || !hasNumber) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(target); return }
    const controls = animate(0, target, { duration: 1.6, ease: [.22, 1, .36, 1], onUpdate: setShown })
    return () => controls.stop()
  }, [inView, hasNumber, target])
  if (!match) return <strong ref={ref}>{value}</strong>
  return <strong ref={ref}>{shown.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{match[2]}</strong>
}

// The two dashed ellipses in the hero (.line-a / .line-b in globals.css), as fractions of the visual box.
// Speed and direction per orbit; the geometry itself is read from the .flow-line elements so it always matches the drawing.
const heroOrbits = [
  { period: 26, direction: 1 },
  { period: 34, direction: -1 },
]

function HeroOrbit() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = ref.current
    if (!host) return
    const nodes = Array.from(host.children) as HTMLElement[]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = Array.from(host.parentElement?.querySelectorAll<HTMLElement>('.flow-line') ?? [])
    type Geometry = { cx: number; cy: number; rx: number; ry: number; theta: number }
    let geometry: Geometry[] = []
    // Read each dashed ellipse as the browser actually lays it out (any breakpoint, any size).
    const measure = () => {
      geometry = lines.map((line) => {
        const matrix = new DOMMatrixReadOnly(getComputedStyle(line).transform)
        return { cx: line.offsetLeft + line.offsetWidth / 2, cy: line.offsetTop + line.offsetHeight / 2, rx: line.offsetWidth / 2, ry: line.offsetHeight / 2, theta: Math.atan2(matrix.b, matrix.a) }
      })
    }
    let frame = 0
    const place = (now: number) => {
      nodes.forEach((node, i) => {
        const orbit = heroOrbits[i % 2]
        const shape = geometry[i % 2]
        if (!shape) return
        const slot = Math.floor(i / 2)
        const angle = (slot / 3) * Math.PI * 2 + (i % 2) * .6 + (reduced ? 0 : orbit.direction * (now / 1000 / orbit.period) * Math.PI * 2)
        const lx = shape.rx * Math.cos(angle)
        const ly = shape.ry * Math.sin(angle)
        node.style.setProperty('--x', (shape.cx + lx * Math.cos(shape.theta) - ly * Math.sin(shape.theta)).toFixed(1))
        node.style.setProperty('--y', (shape.cy + lx * Math.sin(shape.theta) + ly * Math.cos(shape.theta)).toFixed(1))
      })
      if (!reduced) frame = requestAnimationFrame(place)
    }
    measure()
    frame = requestAnimationFrame(place)
    const observer = new ResizeObserver(() => { measure(); if (reduced) requestAnimationFrame(place) })
    observer.observe(host)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [])
  return <div ref={ref} className="flow-nodes">{stages.slice(0, 6).map((stage) => <div key={stage.label} className="flow-node"><stage.icon size={16}/><span>{stage.label}</span></div>)}</div>
}

const ecoNodes = ['Production planning', 'Warehouse', 'Quality', 'Traceability', 'Analytics', 'SAP integration']
const ecoStats = [['94%', 'plan adherence'], ['08', 'locations live'], ['98.2%', 'pass rate'], ['12,840', 'units today'], ['+12.8%', 'throughput'], ['● synced', 'ERP link']]
// Card centres in the 520x480 ecosystem box (same points as the .eco-N rules in globals.css).
const ecoPoints = [[260, 24], [462.6, 132], [462.6, 348], [260, 456], [57.4, 348], [57.4, 132]]
const ecoCore = [260, 240]

function Ecosystem() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const reduced = useReducedMotion()
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!inView || started) return
    const timer = window.setTimeout(() => setStarted(true), reduced ? 0 : 2200)
    return () => window.clearTimeout(timer)
  }, [inView, reduced, started])
  const show = inView || started
  return <div ref={ref} className="ecosystem">
    <motion.div className="eco-core" style={{ x: "-50%", y: "-50%" }} initial={{ scale: .6, opacity: 0 }} animate={show ? { scale: 1, opacity: 1 } : {}} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>MES<span>one source of truth</span>{started && !reduced && <i className="eco-pulse"/>}</motion.div>
    <svg className="eco-flow" viewBox="0 0 520 480" aria-hidden="true">
      {ecoPoints.map(([x, y], i) => <motion.line key={i} x1={ecoCore[0]} y1={ecoCore[1]} x2={x} y2={y} initial={{ pathLength: 0, opacity: 0 }} animate={show ? { pathLength: 1, opacity: 1 } : {}} transition={{ duration: .9, delay: .5 + i * .12, ease: 'easeOut' }}/>)}
      {started && !reduced && ecoPoints.map(([x, y], i) => {
        const inbound = i % 2 === 1
        const [fromX, fromY, toX, toY] = inbound ? [x, y, ecoCore[0], ecoCore[1]] : [ecoCore[0], ecoCore[1], x, y]
        return <motion.circle key={i} r="3.5" initial={{ cx: fromX, cy: fromY, opacity: 0 }} animate={{ cx: [fromX, toX], cy: [fromY, toY], opacity: [0, 1, 1, 0] }} transition={{ duration: 2.8, delay: i * .55, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut', times: [0, .15, .85, 1], opacity: { duration: 2.8, delay: i * .55, repeat: Infinity, repeatDelay: 1.4, times: [0, .15, .85, 1] } }}/>
      })}
    </svg>
    <div className="eco-lines"/>
    {ecoNodes.map((name, i) => {
      const inbound = i % 2 === 1
      return <motion.div key={name} className={`eco-node eco-${i}`} style={{ x: "-50%", y: "-50%" }} initial={{ opacity: 0, scale: .85 }} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ duration: .6, delay: 1.1 + i * .12, ease: [.22, 1, .36, 1] }}>
        <span className="eco-name">{name}</span>
        <span className="eco-stat">{started && !reduced ? <motion.b animate={{ scale: [1, 1, 1.18, 1] }} transition={{ duration: 4.2, delay: i * .55, repeat: Infinity, times: inbound ? [0, .01, .08, .3] : [0, .62, .7, .92], ease: 'easeOut' }}>{ecoStats[i][0]}</motion.b> : <b>{ecoStats[i][0]}</b>}<em>{ecoStats[i][1]}</em></span>
        {started && !reduced && <motion.b className="eco-flash" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 0] }} transition={{ duration: 4.2, delay: i * .55, repeat: Infinity, times: inbound ? [0, .01, .08, .3] : [0, .62, .7, .92], ease: 'easeOut' }}/>}
      </motion.div>
    })}
  </div>
}

// A small ring that trails the pointer and swells over links and buttons (fine pointers only).
function CursorRing() {
  const ref = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const ring = ref.current
    if (!ring || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let x = -100, y = -100, tx = -100, ty = -100, frame = 0
    const move = (event: PointerEvent) => {
      tx = event.clientX; ty = event.clientY
      ring.classList.add('cursor-on')
      const hit = (event.target as HTMLElement)?.closest?.('a,button,[role="button"]')
      ring.classList.toggle('cursor-hover', !!hit)
      const label = hit?.getAttribute('data-cursor') ?? ''
      ring.classList.toggle('cursor-label', !!label)
      if (labelRef.current && labelRef.current.textContent !== label) labelRef.current.textContent = label
    }
    const down = () => ring.classList.add('cursor-down')
    const up = () => ring.classList.remove('cursor-down')
    const leave = () => ring.classList.remove('cursor-on')
    const tick = () => {
      x += (tx - x) * .2; y += (ty - y) * .2
      ring.style.transform = `translate3d(${x}px,${y}px,0)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('pointerleave', leave)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', down); window.removeEventListener('pointerup', up); document.removeEventListener('pointerleave', leave) }
  }, [])
  return <div ref={ref} className="cursor-ring" aria-hidden="true"><i/><span ref={labelRef}/></div>
}

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) { return <div className={`section-label ${dark ? 'dark-label' : ''}`}><span className="label-dot"/>{children}</div> }

const demoVideoId = 'Z0YatNniMas'

function VideoPanel() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const close = useCallback(() => setOpen(false), [])

  // Lightbox behaviour: Esc closes, page scroll/snap is locked, focus moves to the close button.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close() }
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => { window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = previous }
  }, [open, close])

  const videoSrc = `https://www.youtube-nocookie.com/embed/${demoVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
  return <>
    <button type="button" className="demo-card" data-cursor="Play" onClick={() => setOpen(true)} aria-label="Play MES product demo" aria-haspopup="dialog" style={{ backgroundImage: `url(${factoryMedia.hero})` }}>
      <span className="demo-grid"/>
      <span className="demo-top"><i/>PRODUCT DEMO</span>
      <span className="demo-play"><span className="demo-ring"/><span className="demo-ring demo-ring-2"/><Play fill="currentColor" size={26}/></span>
      <span className="demo-bottom"><strong>See how it all connects.</strong><small>Production, quality, warehouse and operations, working as one connected MES.</small></span>
      <span className="demo-chip">Watch the demo <ArrowRight size={15}/></span>
      <span className="demo-signal"><i/>LINE A <b>RUNNING</b><small>OUTPUT 1,184 PCS · EFFICIENCY 98.6%</small></span>
    </button>
    {typeof document !== 'undefined' && createPortal(<AnimatePresence>{open && <motion.div className="demo-modal" role="dialog" aria-modal="true" aria-label="MES product demo video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }} onClick={close}>
      <motion.div className="demo-player" initial={{ opacity: 0, scale: .96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .35, ease: [.22, 1, .36, 1] }} onClick={(event) => event.stopPropagation()}>
        <iframe src={videoSrc} title="MES product demo" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      </motion.div>
      <button ref={closeRef} type="button" className="demo-close" onClick={close} aria-label="Close video"><X size={20}/></button>
    </motion.div>}</AnimatePresence>, document.body)}
  </>
}

let activeStorySection: string | null = null
const storyListeners = new Set<() => void>()

function useStoryAutoplay(id: string, count: number, selected: number, onSelect: (index: number) => void) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  // Progress is written straight to a CSS variable so the bar animates every frame without re-rendering the page.
  const setProgress = useCallback((value: number) => { ref.current?.style.setProperty('--story-progress', value.toFixed(2)) }, [])
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
    setProgress(0)
    const tick = (now: number) => {
      const elapsed = now - startedAt
      const wait = Math.max(activationDelay, manualPause)
      const nextProgress = elapsed <= wait ? 0 : Math.min(100, ((elapsed - wait) / hold) * 100)
      setProgress(nextProgress)
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
  }, [count, id, onSelect, reducedMotion, selected, setProgress, visible])

  const select = (index: number) => { claim(); manualUntil.current = performance.now() + 3000; setProgress(0); onSelect(index) }
  return { ref, select, active: visible && activeStorySection === id }
}

function SectionRail({ activeId }: { activeId: string }) {
  const railIndex = Math.max(0, sectionNavItems.slice(0, -1).findIndex(([, id]) => id === activeId))
  return <aside className="section-rail" aria-label="Page sections" style={{ '--rail-index': railIndex } as React.CSSProperties}>{sectionNavItems.slice(0, -1).map(([label, id], i) => <button key={id} className={activeId === id ? 'rail-active' : i < railIndex ? 'rail-done' : ''} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })} aria-label={`Go to ${label}`} aria-current={activeId === id ? 'true' : undefined}><span>{label}</span></button>)}</aside>
}

export default function Page() {
  const [activeStage, setActiveStage] = useState(0); const [shownStage, setShownStage] = useState(0); const [activeFeature, setActiveFeature] = useState(0); const [release, setRelease] = useState(0); const [menu, setMenu] = useState(false); const { scrollY, scrollYProgress } = useScroll(); const [scrolled, setScrolled] = useState(false); const [activeId, setActiveId] = useState('overview'); useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 36))
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section-nav]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveId((visible.target as HTMLElement).id)
    }, { threshold: [0.35, 0.55, 0.75], rootMargin: '-8% 0px -8% 0px' })
    sections.forEach((section) => observer.observe(section))
    const onKeyDown = (event: KeyboardEvent) => {
      if (reduced.matches || ['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement)?.tagName)) return
      const index = sectionNavItems.findIndex(([, id]) => id === activeId)
      const direction = event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ' ? 1 : event.key === 'ArrowUp' || event.key === 'PageUp' ? -1 : 0
      if (!direction) return
      event.preventDefault()
      document.getElementById(sectionNavItems[Math.max(0, Math.min(sectionNavItems.length - 1, index + direction))][1])?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { observer.disconnect(); window.removeEventListener('keydown', onKeyDown) }
  }, [activeId])
  useEffect(() => {
    document.querySelector('.site-shell')?.classList.add('snap-anim')
    // Chapter numbers ("03 / THE FLOW") feed the large outlined numeral behind each section.
    document.querySelectorAll<HTMLElement>('[data-section-nav]').forEach((section) => {
      const num = section.querySelector('.section-label')?.textContent?.match(/^(\d\d)/)?.[1]
      if (num) section.dataset.num = num
    })
  }, [])
  useMotionValueEvent(scrollYProgress, 'change', (v) => { document.documentElement.style.setProperty('--page-progress', v.toFixed(4)) })
  useEffect(() => { document.querySelectorAll<HTMLElement>('[data-section-nav]').forEach((section) => section.classList.toggle('is-active', section.id === activeId))
    const dark = document.getElementById(activeId)?.matches('.hero,.dark-section,.final-cta') ?? false
    document.querySelector('.section-rail')?.classList.toggle('rail-on-dark', dark)
  }, [activeId])
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: .3 })
  const onHeroMove = (event: React.MouseEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', ((event.clientX - box.left) / box.width - .5).toFixed(3))
    event.currentTarget.style.setProperty('--my', ((event.clientY - box.top) / box.height - .5).toFixed(3))
  }
  const sectionRail = <SectionRail activeId={activeId} />
  const chooseStage = useCallback((index: number) => setActiveStage(index), [])
  const chooseFeature = useCallback((index: number) => setActiveFeature(index), [])
  const chooseRelease = useCallback((index: number) => setRelease(index), [])
  const flowStory = useStoryAutoplay('flow', stages.length, activeStage, chooseStage)
  const toolkitStory = useStoryAutoplay('toolkit', features.length, activeFeature, chooseFeature)
  const releasesStory = useStoryAutoplay('releases', releases.length, release, chooseRelease)
  return <main className="site-shell">
    {sectionRail}
    <CursorRing />
    <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
    <div className="mes-corporate-bridge"><a href="/" aria-label="Back to THLOne corporate website"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kt5OejVUGH9ZzRmNr0RB4f0a7T3YHC.png" alt="THLOne" /></a><nav><a href="/#solutions">Solutions</a><a href="/#services">Services</a><a href="/#industries">Industries</a><a href="/#insights">Insights</a><a href="/#company">Company</a></nav><a className="mes-back" href="/">Back to THLOne <ArrowUpRight size={15}/></a></div>
    <header className={`navbar ${scrolled && activeId !== 'overview' ? 'nav-scrolled' : ''}`}><a href="#overview" className="logo"><span className="logo-mark"><i/><i/><i/></span><span>MES<span className="logo-sub">SYSTEMS</span></span></a><nav>{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><a href="#contact" className="nav-cta">Request a demo <ArrowUpRight size={16}/></a><button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button>{menu && <div className="mobile-menu">{navItems.map(([label, id]) => <a onClick={() => setMenu(false)} key={id} href={`#${id}`}>{label}</a>)}<a href="#contact">Request a demo <ArrowRight size={16}/></a></div>}</header>
    <section id="overview" data-section-nav className="hero" onMouseMove={onHeroMove}><div className="hero-grid-floor"/><div className="hero-orbit orbit-one"><i className="orbit-dot"/></div><div className="hero-orbit orbit-two"><i className="orbit-dot"/></div><div className="hero-copy"><SectionLabel dark>THE OPERATING SYSTEM FOR MODERN MANUFACTURING</SectionLabel><h1>Connected manufacturing <span>starts here.</span></h1><p>Connect the factory, empower production, and turn operational data into intelligence with one complete MES platform.</p><div className="hero-actions"><a className="btn btn-blue" href="#mes">Explore MES <ArrowRight size={17}/></a><a className="text-link light-link" href="#contact">Request a demo <ArrowUpRight size={16}/></a></div></div><div className="hero-visual"><div className="hero-core"><div className="core-ring"/><span>MES</span><small>CONNECTED<br/>OPERATIONS</small></div><HeroOrbit /><div className="flow-line line-a"/><div className="flow-line line-b"/></div><a href="#mes" className="scroll-cue"><span className="scroll-line"/>Scroll to explore <ArrowDownRight size={15}/></a></section>
    <section id="mes" data-section-nav className="section intro"><div className="intro-copy"><SectionLabel>01 / THE PLATFORM</SectionLabel><Reveal><h2>Meet your <em>connected</em> operation.</h2><p>Connect people, processes, systems, and production data in one intelligent manufacturing ecosystem.</p><a className="text-link" href="#solution">Explore how it works <ArrowRight size={16}/></a></Reveal></div><Ecosystem /></section>
    <section id="problem" data-section-nav className="dark-section problem"><div className="problem-inner"><SectionLabel dark>02 / THE SHIFT</SectionLabel><Reveal><h2>Manufacturing is <em>complex.</em></h2><p className="lead-muted">The work is hard enough. Your systems should make it easier.</p></Reveal><div className="problem-list">{['Disconnected systems', 'Manual processes', 'Limited visibility', 'Delayed information', 'Data inconsistency', 'Difficult traceability'].map((x, i) => <Reveal key={x} delay={i * .07}><div><span>0{i + 1}</span>{x}<Check size={16}/></div></Reveal>)}</div><Reveal><div className="problem-transition">What if everything could <span>work as one?</span> <ArrowDownRight/></div></Reveal></div></section>
    <section id="solution" data-section-nav ref={flowStory.ref} className={`section solution ${flowStory.active ? 'story-active' : ''}`}><div className="section-head"><div><SectionLabel>03 / THE FLOW</SectionLabel><Reveal><h2>One MES. One <em>connected</em> operation.</h2></Reveal></div><p>From the first plan to the final shipment, every moment stays in sync across one manufacturing execution platform.</p></div><div className="stage-layout"><div className="stage-list" style={{ '--stage-index': activeStage } as React.CSSProperties}>{stages.map((s, i) => <button key={s.label} className={activeStage === i ? 'stage-active' : ''} onClick={() => flowStory.select(i)} aria-pressed={activeStage === i}><span>0{i + 1}</span><s.icon size={18}/><strong>{s.label}</strong><ArrowRight size={15}/>{activeStage === i && <i className="story-progress"/>}</button>)}</div><div className="stage-detail" style={{ '--stage-image': `url(${stageMedia[shownStage]})` } as React.CSSProperties}><motion.div key={`photo-${activeStage}`} className="stage-photo" style={{ backgroundImage: `url(${stageMedia[activeStage]})` }} initial={activeStage === shownStage ? false : { clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: .9, ease: [.76, 0, .24, 1] }} onAnimationComplete={() => setShownStage(activeStage)}/>{activeStage !== shownStage && <motion.i key={`wipe-${activeStage}`} className="stage-wipe" initial={{ left: '0%', opacity: 1 }} animate={{ left: '100%', opacity: .2 }} transition={{ duration: .9, ease: [.76, 0, .24, 1] }}/>}<div className="stage-number">0{activeStage + 1} / 07</div><motion.div className="stage-content" key={activeStage} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}><h3>{stages[activeStage].title}</h3><p>{stages[activeStage].desc}</p><div className="stage-stat"><CountUp key={activeStage} value={stages[activeStage].stat}/><span>{stages[activeStage].statLabel}</span></div></motion.div><div className="stage-signal"><span>{stages[activeStage].label} / LIVE FLOOR SIGNAL</span><div className="mini-bars">{[38,62,48,82,66,90].map((h, i) => <i key={i} style={{height: `${h}%`}}/>)}</div></div></div></div></section>
    <section id="features" data-section-nav ref={toolkitStory.ref} className={`dark-section features ${toolkitStory.active ? 'story-active' : ''}`}><div className="section-head dark-head"><div><SectionLabel dark>04 / THE TOOLKIT</SectionLabel><Reveal><h2>Built for the <em>factory floor.</em></h2></Reveal></div><p>Powerful enough for the factory. Simple enough for everyone.</p></div><div className="feature-story"><div className="feature-tabs">{features.map((f, i) => <button key={f[0] as string} className={activeFeature === i ? 'feature-active' : ''} onClick={() => toolkitStory.select(i)} aria-pressed={activeFeature === i}><span>0{i + 1}</span>{f[0] as string}<ArrowRight size={15}/>{activeFeature === i && <i className="story-progress"/>}</button>)}</div><motion.div className="feature-copy" key={activeFeature} initial={{opacity:0, x:15}} animate={{opacity:1,x:0}}><SectionLabel dark>{features[activeFeature][2] as string}</SectionLabel><h3>{features[activeFeature][0] as string}</h3><p>{features[activeFeature][1] as string}</p><a className="text-link light-link" href="#contact">Explore capability <ArrowRight size={16}/></a></motion.div><div className="feature-ui" style={{ backgroundImage: `linear-gradient(180deg, hsl(calc(var(--hn) + 3.3 * var(--hk)) calc(29% * var(--ns)) 6.1% / .02), hsl(calc(var(--hn) + 3.3 * var(--hk)) calc(29% * var(--ns)) 6.1% / .08)), url(${featureMedia[activeFeature]})` }}><div className="feature-media-signal"><span>{features[activeFeature][2] as string}</span><strong>{features[activeFeature][3] as string}</strong><small>{features[activeFeature][4] as string}</small></div><div className="feature-media-scan"/></div></div></section>
    <section id="demo" data-section-nav className="section demo"><div className="section-head"><div><SectionLabel>05 / PRODUCT DEMO</SectionLabel><Reveal><h2>See MES <em>in action.</em></h2></Reveal></div><p>One continuous thread from the factory floor to the decisions that move your business forward.</p></div><Reveal><VideoPanel/></Reveal></section>
    <section id="new" data-section-nav ref={releasesStory.ref} className={`section releases ${releasesStory.active ? 'story-active' : ''}`}><div className="section-head"><div><SectionLabel>06 / RELEASES</SectionLabel><Reveal><h2>What&apos;s <em>new.</em></h2></Reveal></div><p>Continuous improvements. Smarter workflows. Better manufacturing visibility.</p></div><div className="release-show"><div className={`release-art release-${release}`} style={{ backgroundImage: `linear-gradient(180deg, hsl(calc(var(--hn) + 3.3 * var(--hk)) calc(29% * var(--ns)) 6.1% / .1), hsl(calc(var(--hn) + 3.3 * var(--hk)) calc(29% * var(--ns)) 6.1% / .8)), url(${releaseMedia[release]})` }}><div className="release-grid"/><span>{releases[release].tag}</span><strong>{releases[release].title}</strong>{release === 1 ? <div className="release-dashboard"><div className="release-dashboard-top"><span>MES / MATERIAL READINESS</span><b>● LIVE</b></div><div className="release-dashboard-kpis"><strong>92%<small>Ready to issue</small></strong><strong>1,248<small>SKUs tracked</small></strong><strong>08<small>At-risk orders</small></strong></div><div className="release-dashboard-bars">{[58,72,46,86,64,92,78].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><div className="release-dashboard-row"><span>Fabric rolls / Lot 2048</span><b>READY</b></div></div> : <div className="release-chart">{[35,52,42,78,58,92,71,84].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div>}</div><div className="release-info"><SectionLabel>{releases[release].tag}</SectionLabel><h3>{releases[release].title}</h3><p>{releases[release].copy}</p><a className="text-link" href="#contact">Explore release <ArrowRight size={16}/></a><div className="carousel-controls"><button onClick={() => releasesStory.select((release + releases.length - 1) % releases.length)} aria-label="Previous release"><ChevronLeft/></button><span>0{release + 1} <i/> 0{releases.length}</span><button onClick={() => releasesStory.select((release + 1) % releases.length)} aria-label="Next release"><ChevronRight/></button></div></div></div></section>
    <section id="roadmap" data-section-nav className="dark-section roadmap"><div className="roadmap-head"><SectionLabel dark>07 / THE HORIZON</SectionLabel><Reveal><h2>What&apos;s coming <em>next.</em></h2></Reveal><p>Our roadmap is a living commitment to better ways of working.</p></div><div className="timeline">{roadmap.map((r, i) => <Reveal key={r[1]} delay={i*.1}><div className="timeline-item"><div className="timeline-dot"/><span className="timeline-quarter">{r[0]}</span><small>{r[2]}</small><h3>{r[1]}</h3><p>{r[3]}</p></div></Reveal>)}</div><a className="text-link light-link roadmap-cta" href="#contact">Explore the roadmap <ArrowRight size={16}/></a></section>
    <section id="implementations" data-section-nav className="section implementations"><div className="section-head"><div><SectionLabel>08 / IN THE FIELD</SectionLabel><Reveal><h2>Explore MES in the <em>real world.</em></h2></Reveal></div><p>See how our platform is adapted to different manufacturing environments.</p></div><div className="case-grid">{implementations.map((item, i) => <Reveal key={item.name} delay={i*.1}><article className="case-card"><div className={`case-art bg-gradient-to-br ${item.accent}`} style={{ backgroundImage: `linear-gradient(180deg, hsl(calc(var(--hn) + 3.3 * var(--hk)) calc(29% * var(--ns)) 6.1% / .08), hsl(calc(var(--hn) + 3.3 * var(--hk)) calc(29% * var(--ns)) 6.1% / .78)), url(${item.image})` }}><Factory/><span>EXAMPLE / DEMO · 0{i+1}</span><div className="case-lines"/></div><div className="case-info"><div><h3>{item.name}</h3><p>{item.industry} · {item.country}</p></div><ArrowUpRight size={16}/><span className="case-modules">{item.modules}</span><a href="#contact">Explore implementation <ArrowRight size={15}/></a></div></article></Reveal>)}</div></section>
    <section id="impact" data-section-nav className="section impact"><SectionLabel>09 / THE IMPACT</SectionLabel><Reveal><h2>Built for <em>real operations.</em></h2></Reveal><p className="demo-note">Illustrative demo metrics · subject to actual deployment scale</p><div className="impact-marquee" aria-label="Illustrative demo metrics"><div className="impact-grid">{[['50+', 'Production lines'], ['1,200+', 'Active users'], ['18M+', 'Production records'], ['24', 'MES modules'], ['12', 'Connected sites'], ['98.6%', 'Data availability'], ['3.2M+', 'Work orders tracked'], ['25M+', 'Material transactions']].map(([n,l]) => <div key={l}><CountUp value={n}/><span>{l}</span></div>)}</div><div className="impact-grid" aria-hidden="true">{[['50+', 'Production lines'], ['1,200+', 'Active users'], ['18M+', 'Production records'], ['24', 'MES modules'], ['12', 'Connected sites'], ['98.6%', 'Data availability'], ['3.2M+', 'Work orders tracked'], ['25M+', 'Material transactions']].map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></div></section>
    <section id="about" data-section-nav className="dark-section why"><SectionLabel dark>10 / THE DIFFERENCE</SectionLabel><Reveal><h2>More than production <em>tracking.</em></h2></Reveal><div className="why-list">{['Real-time visibility', 'End-to-end traceability', 'Flexible workflows', 'Enterprise integration', 'Data-driven decisions'].map((x,i)=><Reveal key={x} delay={i*.08}><div><span>0{i+1}</span><strong>{x}</strong><ArrowUpRight size={16}/></div></Reveal>)}</div></section>
    <section id="future" data-section-nav className="section future"><div className="future-copy"><SectionLabel>11 / FUTURE VISION</SectionLabel><Reveal><h2>From MES to <em>manufacturing intelligence.</em></h2><p>Turn operational data into better decisions. The next chapter is already taking shape.</p></Reveal><span className="future-badge"><Sparkles size={14}/> FUTURE VISION</span></div><div className="future-list">{['AI Production Assistant', 'Production Anomaly Detection', 'Predictive Insights', 'Smart Material Planning', 'Natural Language Analytics'].map((x,i)=><Reveal key={x} delay={i*.08}><div><span>0{i+1}</span><strong>{x}</strong><small>COMING SOON</small><ArrowRight size={16}/></div></Reveal>)}</div></section>
    <section id="explore" data-section-nav className="section explore"><SectionLabel>12 / KEEP EXPLORING</SectionLabel><Reveal><h2>There&apos;s more to <em>discover.</em></h2></Reveal><div className="explore-cards">{[['01', 'Explore features', 'See the capabilities built for your operation.', '#features', Layers3, 'View features'], ['02', 'See implementations', 'Meet the teams already moving forward.', '#implementations', Factory, 'View implementations'], ['03', 'Explore roadmap', 'See where manufacturing intelligence is going.', '#roadmap', Sparkles, 'View roadmap']].map(([n, t, d, href, Icon, cta]) => { const CardIcon = Icon as typeof Layers3; return <a className="ex-card" href={href as string} key={n as string}><span className="ex-head"><span className="ex-num">{n as string}</span><i className="ex-icon"><CardIcon size={22}/></i></span><span className="ex-body"><h3>{t as string}</h3><p>{d as string}</p></span><span className="ex-cta">{cta as string}<span className="ex-arrow"><ArrowUpRight size={16}/></span></span></a> })}</div></section>
    <section id="contact" className="final-cta"><div className="cta-grid"/><SectionLabel dark>READY WHEN YOU ARE</SectionLabel><h2>Ready to connect<br/><em>your factory?</em></h2><p>Connect your people, processes, and production data with a complete MES platform.</p><div className="hero-actions"><a className="btn btn-blue" href="mailto:hello@messystems.example">Request a demo <ArrowRight size={17}/></a><a className="text-link light-link" href="#overview">Explore MES <ArrowUpRight size={16}/></a></div></section>
    <footer><div className="footer-brand"><a href="#overview" className="logo"><span className="logo-mark"><i/><i/><i/></span><span>MES<span className="logo-sub">SYSTEMS</span></span></a><p>The operating system for modern manufacturing.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#features">Features</a><a href="#new">What&apos;s new</a><a href="#roadmap">Roadmap</a></div><div><strong>Company</strong><a href="#implementations">Implementations</a><a href="#about">About MES</a><a href="#contact">Request a demo</a></div><div><strong>Contact</strong><a href="mailto:hello@messystems.example">hello@messystems.example</a><span>© 2026 MES Systems</span></div></div></footer>
  </main>
}
