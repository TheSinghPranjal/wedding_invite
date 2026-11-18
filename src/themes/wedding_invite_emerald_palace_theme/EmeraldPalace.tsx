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
import { SceneGoldenGarden, SceneTerrace, SceneGaneshaInvite, SceneFormalHeritage } from './scenes/SceneGarden';
import { SceneEmeraldInvite, SceneIvoryLattice, SceneCountdown, ScenePalaceDoor, SceneDarkHeritage, SceneFinalRsvp } from './scenes/SceneEmerald';
import EventScene from './scenes/EventScene';
import './styles/palace.css';

const Bridge = ({ from, to }: { from: string; to: string }) => <div aria-hidden="true" style={{ height: '26svh', background: `linear-gradient(${from}, ${to})` }} />;

/**
 * Theme 05 - Emerald Peacock Palace & Golden Heritage.
 * Journey: golden palace garden -> terrace -> Ganesha invitation -> formal heritage card -> events (from weddingData.events) ->
 * emerald invitation -> ivory lattice -> teal peacock invitation (staged text) -> countdown -> palace door -> dark heritage finale -> RSVP.
 * Peacock-feather circular wipes bridge the scenes; Lenis + GSAP ScrollTrigger drive everything.
 */
export default function EmeraldPalace() {
  const reduce = useReducedMotion();
  const lenis = useRef<Lenis | null>(null);
  const [opened, setOpened] = useState(false);
  const events = weddingData.events;

  useEffect(() => {
    const root = document.documentElement;
    const prev = document.title;
    root.classList.add('ep-active');
    document.title = `${weddingData.bride.firstName} & ${weddingData.groom.firstName} | Wedding Invitation`;
    return () => { root.classList.remove('ep-active', 'intro-open'); document.title = prev; music.pause(); };
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
    <main className="ep">
      <Defs />
      <Link to="/#themes" className="ep-back">← All themes</Link>
      <IntroOverlay onOpen={() => setOpened(true)} />
      <ScrollProgress />
      <SceneGoldenGarden opened={opened} />
      <Bridge from="#DDE8CE" to="#C9CBC8" />
      <SceneTerrace />
      <CircleWipe from="#F0D8A8" to="#FBF4E6" kind="lotus" ringColor="#C6A45D" fromSide="right" />
      <SceneGaneshaInvite />
      <CircleWipe from="#F3DAC4" to="#E6ECDC" kind="medallion" fromSide="left" />
      <SceneFormalHeritage />
      {events.map((ev, i) => (
        <div key={ev.id}>
          <CircleWipe from={i === 0 ? '#E4EADB' : st(events[i - 1]).edgeBottom} to={st(ev).edgeTop} kind={st(ev).wipe} ringColor={st(ev).ring} fromSide={i % 2 ? 'left' : 'right'} />
          <EventScene event={ev} index={i} />
        </div>
      ))}
      <CircleWipe from={events.length ? st(events[events.length - 1]).edgeBottom : '#E4EADB'} to="#167A76" kind="feather" fromSide="right" />
      <SceneEmeraldInvite id="ep-scene-05" />
      <CircleWipe from="#063F44" to="#E9E4D6" kind="gold" fromSide="left" />
      <SceneIvoryLattice />
      <CircleWipe from="#E9E4D6" to="#167A76" kind="feather" fromSide="right" />
      <SceneEmeraldInvite id="ep-scene-07" staged />
      <SceneCountdown />
      <CircleWipe from="#063F44" to="#EADFCB" kind="lotus" fromSide="left" />
      <ScenePalaceDoor />
      <SceneDarkHeritage />
      <SceneFinalRsvp />
      <MusicToggle />
    </main>
  );
}
