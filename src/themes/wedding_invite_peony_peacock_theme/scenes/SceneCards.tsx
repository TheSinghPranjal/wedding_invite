import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import weddingData from '../../../data/weddingData';
import { gsap } from '../lib/gsap';
import { useStage } from '../hooks/useStage';
import { SideOrnamentController, Rose, type OrbitSpec } from '../art/Orbit';
import { RaspberryPlaque, LineFlower, Peacock, Magnolia, MagnoliaBranch, RoseCorner, PinkString, LineCouple, scallopRectPath } from '../art/Heritage';
import GoldBorder from '../art/GoldBorder';
import { dateParts, formatTime } from '../lib/dates';
import { A, Letters } from './common';

const orbits = (kinds: [OrbitSpec['kind'], OrbitSpec['kind']], op = 0.6): OrbitSpec[] => [
  { side: 'left', kind: kinds[0], size: 520, top: 38, crop: 0.64, dir: 1, rotate: 110, opacity: op, parallax: 120 },
  { side: 'right', kind: kinds[1], size: 540, top: 66, crop: 0.64, dir: -1, rotate: 100, opacity: op, parallax: 160 },
  { side: 'left', kind: 'gold', size: 220, top: 90, crop: 0.5, dir: -1, rotate: 220, opacity: 0.5, parallax: 240, desktopOnly: true },
  { side: 'right', kind: 'star', size: 210, top: 10, crop: 0.5, dir: 1, rotate: 240, opacity: 0.5, parallax: 260, desktopOnly: true },
];

const longDate = () => { const p = dateParts(weddingData.weddingDate); return p ? { ...p, short: `${p.day}.${weddingData.weddingDate.slice(5, 7)}.${p.year}`, dots: `${p.day} . ${weddingData.weddingDate.slice(5, 7)} . ${p.year}` } : null; };
const timeOf = () => (/^\d{2}:\d{2}$/.test(weddingData.ceremonyTime) ? formatTime(weddingData.ceremonyTime) : '');
const venueLine = () => { const { venue } = weddingData; return { name: venue.name, addr: [venue.address, venue.city].filter(Boolean).join(', ') }; };

/** Section 01 - ornamental Save the Date: floral lattice, raspberry plaque, line-art flower. Timed reveal when the card opens, then a gentle scroll drift. */
export function SceneSaveTheDate({ opened }: { opened: boolean }) {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  const d = longDate();
  useGSAP(() => {
    if (!opened) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.s1-lattice', { clipPath: 'circle(0% at 50% 50%)', opacity: 1 }, { clipPath: 'circle(150% at 50% 50%)', duration: 2.4, ease: 'power2.inOut' }, 0)
        .fromTo('.s1-plaque', { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 }, 0.9)
        .fromTo('.s1-flower .bp-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.8, stagger: 0.1, ease: 'power1.inOut' }, 1.6)
        .fromTo('.s1-petal', { x: 0, y: 0, opacity: 0, scale: 0.4 }, { x: (i) => Math.cos(i * 1.4) * 80, y: (i) => 40 + Math.sin(i * 1.4) * 60, opacity: 0.9, scale: 1, duration: 1.6, stagger: 0.12, rotation: 120 }, 2.2)
        .to('.s1-petal', { opacity: 0, duration: 1 }, 3.6)
        .fromTo('.s1-names', { opacity: 0, letterSpacing: '.6em' }, { opacity: 1, letterSpacing: '.16em', duration: 1.6 }, 2.6)
        .fromTo('.s1-title', { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.3 }, 3.1)
        .fromTo('.s1-date', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1 }, 4);
    });
    return () => mm.revert();
  }, { scope: root, dependencies: [opened] });
  useStage(root, (tl) => {
    tl.to('.s1-lattice-s', { yPercent: -5, duration: 1 }, 0).to('.s1-plaque-s', { scale: 1.05, y: -10, duration: 1 }, 0);
  }, { end: '+=110%' });
  return (
    <section id="bp-scene-01" ref={root} className={`bp-scene${opened ? '' : ' is-pre'}`}>
      <div className="bp-stage" style={{ background: 'linear-gradient(135deg,#F1C2C9,#DE98A6)' }}>
        <SideOrnamentController specs={orbits(['lace', 'lace'], 0.7)} color="#fff" />
        <div className="bp-board bp-paper" style={{ background: 'linear-gradient(135deg,#F3C9CF,#DE98A6)' }}>
          <A className="s1-lattice g-anim" style={{ inset: 0 }}><div className="s1-lattice-s" style={{ position: 'absolute', inset: '-6% 0' }}><svg width="100%" height="100%" aria-hidden="true"><rect width="100%" height="100%" fill="url(#bpLattice)" /></svg></div></A>
          <A className="s1-plaque g-anim" style={{ left: '9cqw', top: 'calc(50% - 71cqw)', width: '82cqw', height: '142cqw', zIndex: 3 }}>
            <div className="s1-plaque-s" style={{ position: 'relative', width: '100%', height: '100%', filter: 'drop-shadow(0 18px 24px rgba(110,20,50,.35))' }}>
              <RaspberryPlaque className="bp-fit" />
              <A className="s1-flower" style={{ left: '28%', top: '5%', width: '44%' }}><LineFlower className="bp-fit-w" />{[0, 1, 2, 3, 4].map((i) => <span key={i} className="s1-petal" style={{ position: 'absolute', left: '46%', top: '40%', width: 8, height: 12, borderRadius: '50% 50% 50% 0', background: '#F6E5E5', opacity: 0 }} />)}</A>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', alignContent: 'start', justifyItems: 'center', textAlign: 'center', color: '#FFF4F2', paddingTop: '38%' }}>
                <p className="s1-names bp-display" style={{ fontSize: '3.7cqw', letterSpacing: '.16em', lineHeight: 1.6, maxWidth: '58cqw' }}>{bride.firstName} &amp; {groom.firstName} are getting married</p>
                <div style={{ overflow: 'hidden', marginTop: '7cqw' }}><p className="s1-title bp-display" style={{ fontSize: '10.5cqw', letterSpacing: '.04em', textTransform: 'none', lineHeight: 1.2 }}>Save the<br />Date</p></div>
                <p className="s1-date bp-display" style={{ fontSize: '4.3cqw', marginTop: '10cqw' }}>{d ? `${d.month} ${Number(d.day)}, ${d.year}` : 'Date to be announced'}</p>
              </div>
            </div>
          </A>
        </div>
      </div>
    </section>
  );
}

const BottomBlooms = ({ className = '' }: { className?: string }) => {
  const items = [[20, 90, 26, 'm', -20], [62, 100, 22, 'r', 0], [104, 96, 30, 'm', 15], [150, 104, 24, 'r', 30], [200, 98, 32, 'm', -10], [250, 104, 24, 'r', 10], [296, 96, 30, 'm', 20], [340, 100, 24, 'r', -15], [382, 92, 26, 'm', 10]] as const;
  return (
    <svg viewBox="0 0 400 130" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true" focusable="false">
      {items.map(([x, y, r, k, rot], i) => k === 'm' ? <Magnolia key={i} x={x} y={y} r={r} rot={rot} /> : <Rose key={i} x={x} y={y} r={r * 0.7} rot={rot} />)}
    </svg>
  );
};

/** Section 02 - peacock & flowers invitation on a soft ivory scalloped panel. */
export function ScenePeacockInvite() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  const d = longDate(); const t = timeOf(); const v = venueLine();
  useStage(root, (tl) => {
    tl.fromTo('.p-peacock-l', { x: '-40cqw', y: -60, rotation: -12, opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
      .fromTo('.p-peacock-r', { x: '40cqw', y: -60, rotation: 12, opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
      .fromTo('.p-rose', { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(1.4)' }, 0.1)
      .fromTo('.p-string', { y: -240, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' }, 0.1)
      .fromTo('.p-panel', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 }, 0.05)
      .fromTo('.p-line', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.12, stagger: 0.06 }, 0.25)
      .fromTo('.p-name', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.2, stagger: 0.14 }, 0.22)
      .fromTo('.p-bottom', { yPercent: 100 }, { yPercent: 0, duration: 0.35, ease: 'power2.out' }, 0.3)
      .fromTo('.p-branch', { xPercent: -30, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.35 }, 0.3)
      .fromTo('.p-branch-r', { xPercent: 30, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.35 }, 0.3);
  }, { end: '+=150%' });
  return (
    <section id="bp-scene-02" ref={root} className="bp-scene">
      <div className="bp-stage" style={{ background: '#EFE9D4' }}>
        <SideOrnamentController specs={orbits(['rose', 'wreath'], 0.55)} color="#E3B0B8" />
        <div className="bp-board bp-paper" style={{ background: '#EFE9D4' }}>
          <A className="p-panel" style={{ left: '4cqw', top: '17%', width: '92cqw', height: '63%', zIndex: 2 }}><svg viewBox="0 0 400 700" preserveAspectRatio="none" className="bp-fit" aria-hidden="true"><path d={scallopRectPath(400, 700, 5, 9, 10)} fill="#FDFCF7" /></svg></A>
          <A className="p-rose" style={{ left: '28cqw', top: '-2cqw', width: '44cqw', zIndex: 1 }}><svg viewBox="0 0 200 120" className="bp-fit-w"><Rose x={100} y={44} r={34} /><Rose x={50} y={34} r={24} rot={40} /><Rose x={150} y={34} r={24} rot={80} /></svg></A>
          <A className="p-rose" style={{ left: '-6cqw', top: '-4cqw', width: '38cqw', zIndex: 1 }}><RoseCorner className="bp-fit-w" /></A>
          <A className="p-rose" style={{ right: '-6cqw', top: '-4cqw', width: '38cqw', zIndex: 1, transform: 'scaleX(-1)' }}><RoseCorner className="bp-fit-w" /></A>
          <A className="p-peacock-l" style={{ left: '-3cqw', top: '2cqw', width: '40cqw', zIndex: 4 }}><Peacock className="bp-fit-w" /></A>
          <A className="p-peacock-r" style={{ right: '-3cqw', top: '2cqw', width: '40cqw', zIndex: 4, transform: 'scaleX(-1)' }}><Peacock className="bp-fit-w" /></A>
          {[22, 34, 66, 78].map((x, i) => <A key={x} className="p-string" style={{ left: `${x}%`, top: 0, width: '7cqw', zIndex: 3 }}><PinkString length={70 + (i % 2) * 40} delay={i * 0.4} /></A>)}
          <div className="bp-text" style={{ top: '31%', display: 'grid', gap: '1.4cqw', justifyItems: 'center', color: '#2B1A20', zIndex: 5 }}>
            <p className="p-line bp-sans" style={{ fontSize: '3.7cqw', lineHeight: 1.5 }}>you are cordially invited<br />to the wedding of</p>
            <p className="p-name bp-names" style={{ fontSize: '19cqw', color: '#AB5670', marginTop: '3cqw' }}>{bride.firstName}</p>
            <p className="p-line bp-sans" style={{ fontSize: '3.8cqw' }}>and</p>
            <p className="p-name bp-names" style={{ fontSize: '19cqw', color: '#AB5670' }}>{groom.firstName}</p>
            <p className="p-line bp-sans" style={{ fontSize: '4.2cqw', background: '#AF4C6C', color: '#FFF9EF', padding: '1.6cqw 5cqw', borderRadius: '99px', marginTop: '3cqw', letterSpacing: '.04em' }}>{d ? `${d.month} ${Number(d.day)}, ${d.year}` : 'Date to be announced'}{t ? ` | ${t}` : ''}</p>
            <p className="p-line bp-sans" style={{ fontSize: '3.8cqw', lineHeight: 1.5, maxWidth: '66cqw', marginTop: '2cqw' }}>{v.name || 'Venue to be announced'}{v.addr ? <><br />{v.addr}</> : null}</p>
          </div>
          <A className="p-branch" style={{ left: '-4cqw', bottom: '12cqw', width: '40cqw', zIndex: 4 }}><MagnoliaBranch className="bp-fit-w" /></A>
          <A className="p-branch-r" style={{ right: '-4cqw', bottom: '12cqw', width: '40cqw', zIndex: 4, transform: 'scaleX(-1)' }}><MagnoliaBranch className="bp-fit-w" /></A>
          <A className="p-bottom" style={{ left: 0, right: 0, bottom: 0, height: '28cqw', zIndex: 5 }}><BottomBlooms className="bp-fit" /></A>
        </div>
      </div>
    </section>
  );
}

const Sprig = ({ className = '', style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 100 130" className={className} style={style} fill="none" stroke="#7E8E69" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path className="bp-draw" d="M50 128C46 100 50 70 62 40M50 100C34 92 26 80 24 62M52 78C68 70 78 58 80 44" />
    {[[62, 40], [24, 62], [80, 44], [40, 100], [60, 80]].map(([x, y], i) => <circle key={i} className="bp-draw" cx={x} cy={y} r="3.4" stroke="#C77589" />)}
  </svg>
);

/** Section 03 - formal family invitation card. Hosts, parents and contact come from weddingData; nothing is invented when empty. */
export function SceneFamilyCard() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom, rsvp, contact } = weddingData;
  const d = longDate(); const t = timeOf(); const v = venueLine();
  useStage(root, (tl) => {
    tl.fromTo('.f-corner', { scale: 0.5, opacity: 0, transformOrigin: '0 0' }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.06, ease: 'power2.out' }, 0)
      .fromTo('.f-frame .bp-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, stagger: 0.08 }, 0.05)
      .fromTo('.f-sprig .bp-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.4, stagger: 0.04 }, 0.2)
      .fromTo('.f-line', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.05 }, 0.2)
      .fromTo('.f-name', { opacity: 0, y: 24, letterSpacing: '.1em' }, { opacity: 1, y: 0, letterSpacing: '0em', duration: 0.18, stagger: 0.1 }, 0.35)
      .fromTo('.f-rsvp', { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.85);
  }, { end: '+=150%' });
  const host = bride.family.filter((m) => m.name); const son = groom.family.filter((m) => m.name);
  const small = (t2: string, k = '') => <p className={`f-line bp-serif ${k}`} style={{ fontSize: '3.6cqw', fontStyle: 'italic', lineHeight: 1.35 }}>{t2}</p>;
  const hand = (t2: string) => <p className="f-line bp-names" style={{ fontSize: '6.2cqw', lineHeight: 1.25 }}>{t2}</p>;
  return (
    <section id="bp-scene-03" ref={root} className="bp-scene bp-paper">
      <div className="bp-stage" style={{ background: '#F6E5E5' }}>
        <SideOrnamentController specs={orbits(['rose', 'lace'], 0.55)} color="#E3B0B8" />
        <div className="bp-board" style={{ background: '#F8E9E8' }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} aria-hidden="true"><rect width="100%" height="100%" fill="url(#bpMandalaLine)" /></svg>
          <A className="f-frame" style={{ left: '13cqw', right: '13cqw', top: '5cqw', bottom: '5cqw', background: '#F8E9E8', zIndex: 1 }}><GoldBorder inset={4} /></A>
          {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => <A key={i} className="f-corner" style={{ left: x ? undefined : '-4cqw', right: x ? '-4cqw' : undefined, top: y ? undefined : '-4cqw', bottom: y ? '-4cqw' : undefined, width: '38cqw', zIndex: 3, transform: `scale(${x ? -1 : 1}, ${y ? -1 : 1})` }}><RoseCorner className="bp-fit-w" /></A>)}
          {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => <A key={`s${i}`} className="f-sprig" style={{ left: x ? undefined : '15cqw', right: x ? '15cqw' : undefined, top: y ? undefined : '26cqw', bottom: y ? '26cqw' : undefined, width: '16cqw', zIndex: 2, transform: `scale(${x ? -1 : 1}, ${y ? -1 : 1})` }}><Sprig className="bp-fit-w" /></A>)}
          <div className="bp-text" style={{ top: '9cqw', bottom: '9cqw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.6cqw', color: '#9B4A62', zIndex: 4, padding: '0 18cqw' }}>
            {host.length ? host.map((m) => hand(m.name)) : hand('Together with our families')}
            {small('cordially invite your esteemed presence')}{small(host.length ? 'for the marriage of' : 'to celebrate the marriage of')}
            <p className="f-name bp-names" style={{ fontSize: '14cqw', color: '#9B4A62' }}>{bride.firstName}</p>
            <p className="f-name bp-names" style={{ fontSize: '7cqw', lineHeight: 0.8 }}>&amp;</p>
            <p className="f-name bp-names" style={{ fontSize: '14cqw', color: '#9B4A62' }}>{groom.firstName}</p>
            {son.length > 0 && <>{small('son of')}{son.map((m) => hand(m.name))}</>}
            {small('which will be held at')}
            <p className="f-line bp-sans" style={{ fontSize: '3.7cqw', fontWeight: 600, textTransform: 'uppercase', lineHeight: 1.4, color: '#874052' }}>{v.name || 'Venue to be announced'}{v.addr ? <><br />{v.addr}</> : null}</p>
            {small('on')}
            <p className="f-line bp-sans" style={{ fontSize: '3.9cqw', fontWeight: 600, textTransform: 'uppercase', lineHeight: 1.4, color: '#874052' }}>{d ? `${Number(d.day)} ${d.month}, ${d.year}` : 'Date to be announced'}{t ? <><br />at {t}</> : null}</p>
            <div className="f-line" style={{ width: '40cqw', height: 2, background: '#B87D91', position: 'relative', margin: '1cqw 0' }}><span style={{ position: 'absolute', left: -2, top: -2.5, width: 6, height: 6, background: '#B87D91', transform: 'rotate(45deg)' }} /><span style={{ position: 'absolute', right: -2, top: -2.5, width: 6, height: 6, background: '#B87D91', transform: 'rotate(45deg)' }} /></div>
            <p className="f-rsvp bp-sans" style={{ fontSize: '3cqw', lineHeight: 1.6, color: '#874052' }}>{rsvp.deadline ? `RSVP before ${rsvp.deadline}` : 'RSVP'}{contact.phone ? <><br />on {contact.phone}</> : null}{contact.email ? <><br />{contact.email}</> : null}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Section 04 - parchment wedding illustration: gold line-art couple draws itself, then moves up as the invitation text arrives. */
export function SceneWeddingLineArt() {
  const root = useRef<HTMLElement>(null);
  const { bride, groom } = weddingData;
  const d = longDate(); const v = venueLine();
  useStage(root, (tl) => {
    tl.fromTo('.w-corner', { scale: 0.6, opacity: 0, transformOrigin: '0 0' }, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.05 }, 0)
      .fromTo('.w-peacock-a', { x: '-30cqw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.25 }, 0.05).fromTo('.w-peacock-b', { x: '30cqw', opacity: 0 }, { x: 0, opacity: 1, duration: 0.25 }, 0.05)
      .fromTo('.w-couple .bp-draw', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.35, stagger: 0.012, ease: 'none' }, 0.1)
      .fromTo('.w-title', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.1 }, 0.3)
      .fromTo('.w-invit .bp-ch', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.04, stagger: 0.012 }, 0.38)
      .fromTo('.w-edge', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, stagger: 0.04, ease: 'back.out(1.6)' }, 0.3)
      .to('.w-title, .w-invit', { opacity: 0, duration: 0.12 }, 0.58)
      .to('.w-peacock-a, .w-peacock-b', { opacity: 0.35, duration: 0.2 }, 0.58)
      .to('.w-couple', { scale: 0.45, y: () => -(root.current?.clientHeight ?? 800) * 0.2, transformOrigin: '50% 0', duration: 0.3, ease: 'power2.inOut' }, 0.58)
      .fromTo('.w-text > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1, stagger: 0.06 }, 0.72);
  }, { end: '+=230%' });
  const col = '#B5543A';
  return (
    <section id="bp-scene-04" ref={root} className="bp-scene bp-paper">
      <div className="bp-stage" style={{ background: '#F3E8CF' }}>
        <SideOrnamentController specs={orbits(['gold', 'rose'], 0.5)} color="#E3B0B8" />
        <div className="bp-board" style={{ background: 'radial-gradient(ellipse at 50% 40%, #F8EFD9, #F0E3C4)' }}>
          {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => <A key={i} className="w-corner" style={{ left: x ? undefined : '-5cqw', right: x ? '-5cqw' : undefined, top: y ? undefined : '-5cqw', bottom: y ? '-5cqw' : undefined, width: '36cqw', zIndex: 2, transform: `scale(${x ? -1 : 1}, ${y ? -1 : 1})` }}><RoseCorner tone="coral" className="bp-fit-w" /></A>)}
          {[22, 40, 60, 76].map((y, i) => <A key={y} className="w-edge" style={{ left: i % 2 ? undefined : '-3cqw', right: i % 2 ? '-3cqw' : undefined, top: `${y}%`, width: '9cqw', zIndex: 2 }}><svg viewBox="-20 -20 40 40" className="bp-fit-w"><Magnolia x={0} y={0} r={15} rot={i * 40} /></svg></A>)}
          <A className="w-peacock-a" style={{ left: '4cqw', bottom: '14%', width: '26cqw', zIndex: 3 }}><Peacock className="bp-fit-w" /></A>
          <A className="w-peacock-b" style={{ right: '4cqw', top: '12%', width: '26cqw', zIndex: 3, transform: 'scaleX(-1)' }}><Peacock className="bp-fit-w" /></A>
          <A className="w-couple" style={{ left: '50%', top: '22%', width: '60cqw', marginLeft: '-30cqw', zIndex: 4 }}><LineCouple className="bp-fit-w" /></A>
          <p className="w-title bp-mar" style={{ position: 'absolute', left: '16cqw', top: '24%', fontSize: '7cqw', color: col, zIndex: 5 }}>Wedding</p>
          <p className="w-invit bp-mar" style={{ position: 'absolute', right: '14cqw', bottom: '17%', fontSize: '7cqw', color: col, zIndex: 5 }}><Letters text="INVITATION" /></p>
          <div className="w-text bp-text" style={{ top: '34%', display: 'grid', gap: '2cqw', justifyItems: 'center', color: col, zIndex: 5 }}>
            <p className="bp-mar" style={{ fontSize: '4.4cqw', lineHeight: 1.5, maxWidth: '72cqw' }}>Invite you to celebrate their wedding</p>
            <p className="bp-mar" style={{ fontSize: '15cqw', lineHeight: 1.05, letterSpacing: '.1em', marginTop: '3cqw' }}>{bride.firstName}</p>
            <p className="bp-mar" style={{ fontSize: '9cqw', lineHeight: 0.9 }}>&amp;</p>
            <p className="bp-mar" style={{ fontSize: '15cqw', lineHeight: 1.05, letterSpacing: '.1em' }}>{groom.firstName}</p>
            <p className="bp-mar" style={{ fontSize: '7.4cqw', marginTop: '5cqw', letterSpacing: '.1em' }}>{d ? d.dots : 'Date to be announced'}</p>
            <p className="bp-mar" style={{ fontSize: '5.6cqw', marginTop: '3cqw' }}>{v.name || 'Venue to be announced'}</p>
            {v.addr && <p className="bp-mar" style={{ fontSize: '3.8cqw', maxWidth: '70cqw', lineHeight: 1.5 }}>{v.addr}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
