import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import weddingData from '../../data/weddingData';
import { gsap, ScrollTrigger } from './lib/gsap';
import { music } from './lib/music';
import { useReducedMotion } from './hooks/useReducedMotion';
import { eventStyles } from './config/eventThemes';
import Defs from './art/Defs';
import { IntroOverlay, MusicToggle, ScrollProgress, CircleWipe } from './ui/ui';
import { SceneSaveTheDate, ScenePeacockInvite, SceneFamilyCard, SceneWeddingLineArt } from './scenes/SceneCards';
import { SceneCountdown, SceneMonogram, SceneFinalInvite } from './scenes/SceneFinale';
import EventScene from './scenes/EventScene';
import './styles/peony.css';

/**
 * Theme 04 - Blush Peony & Peacock Heritage. Journey: Save the Date -> peacock invitation -> family card -> line-art wedding ->
 * events (from weddingData.events, in data order) -> countdown -> monogram -> final invitation & RSVP.
 * Circular floral wipes bridge the scenes; Lenis + GSAP ScrollTrigger drive everything.
 */
export default function PeonyPeacock() {
  const reduce = useReducedMotion();
  const lenis = useRef<Lenis | null>(null);
  const [opened, setOpened] = useState(false);
  const events = weddingData.events;

  useEffect(() => {
    const root = document.documentElement;
    const prev = document.title;
    root.classList.add('bp-active');
    document.title = `${weddingData.bride.firstName} & ${weddingData.groom.firstName} | Wedding Invitation`;
    return () => { root.classList.remove('bp-active', 'intro-open'); document.title = prev; music.pause(); };
  }, []);

  useEffect(() => {
    if (reduce) return;
    const l = new Lenis({ lerp: 0.1 });
    lenis.current = l;
    l.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); l.destroy(); lenis.current = null; };
  }, [reduce]);

  useEffect(() => {
    document.documentElement.classList.toggle('intro-open', !opened);
    if (opened) { lenis.current?.start(); ScrollTrigger.refresh(); } else lenis.current?.stop();
  }, [opened]);

  const st = (ev: (typeof events)[number]) => eventStyles[ev.theme] ?? eventStyles.custom;
  return (
    <main className="bp">
      <Defs />
      <Link to="/#themes" className="bp-back">← All themes</Link>
      <IntroOverlay onOpen={() => setOpened(true)} />
      <ScrollProgress />
      <SceneSaveTheDate opened={opened} />
      <CircleWipe from="#DE98A6" to="#EFE9D4" kind="lace" fromSide="right" />
      <ScenePeacockInvite />
      <CircleWipe from="#EFE9D4" to="#F6E5E5" kind="rose" ringColor="#DDA9B4" fromSide="left" />
      <SceneFamilyCard />
      <CircleWipe from="#F6E5E5" to="#F3E8CF" kind="wreath" ringColor="#DDA9B4" fromSide="right" />
      <SceneWeddingLineArt />
      {events.map((ev, i) => {
        const from = i === 0 ? '#F0E3C4' : st(events[i - 1]).edgeBottom;
        return (
          <div key={ev.id}>
            <CircleWipe from={from} to={st(ev).edgeTop} kind={st(ev).wipe} ringColor={st(ev).ring} fromSide={i % 2 ? 'left' : 'right'} />
            <EventScene event={ev} index={i} />
          </div>
        );
      })}
      <CircleWipe from={events.length ? st(events[events.length - 1]).edgeBottom : '#F0E3C4'} to="#F8E9E8" kind="lace" fromSide="left" />
      <SceneCountdown />
      <CircleWipe from="#F2D3D8" to="#FFFDF8" kind="gold" ringColor="#C3A16C" fromSide="right" />
      <SceneMonogram />
      <CircleWipe from="#FBEDEA" to="#FFF9EF" kind="rose" ringColor="#DDA9B4" fromSide="left" />
      <SceneFinalInvite />
      <MusicToggle />
    </main>
  );
}
