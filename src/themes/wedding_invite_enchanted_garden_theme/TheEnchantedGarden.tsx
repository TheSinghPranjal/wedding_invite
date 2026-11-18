import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import weddingData from '../../data/weddingData';
import { gsap, ScrollTrigger } from './lib/gsap';
import { music } from './lib/music';
import { useReducedMotion } from './hooks/useReducedMotion';
import { eventStyles, styleFor } from './config/eventThemes';
import Defs from './art/Defs';
import { IntroOverlay, MusicToggle, ScrollProgress, CircleWipe } from './ui/ui';
import { SceneFestiveOpen, SceneFestiveCeremony, SceneFestiveDetails } from './scenes/SceneFestive';
import { SceneTransition, SceneBotanicalIntro, SceneSaveTheDate, SceneCoupleReveal } from './scenes/SceneBotanical';
import { SceneCountdown, SceneMonogram, SceneJustMarried, SceneFinalGarden } from './scenes/SceneFinale';
import EventScene from './scenes/EventScene';
import './styles/garden.css';

/**
 * Theme 03 - Enchanted Garden. Journey: festive pink chapter (canopy, ceremony invitation, details, festive events)
 * -> circular floral transition -> botanical chapter (save the date, couple, reception, countdown, monogram, car, final).
 * Event scenes are generated from weddingData.events; festive types run before the transition, botanical types after.
 */
export default function TheEnchantedGarden() {
  const reduce = useReducedMotion();
  const lenis = useRef<Lenis | null>(null);
  const [opened, setOpened] = useState(false);
  const events = weddingData.events;
  const festive = events.filter((e) => styleFor(e).chapter === 'festive');
  const botanical = events.filter((e) => styleFor(e).chapter === 'botanical');

  useEffect(() => {
    const root = document.documentElement;
    const prev = document.title;
    root.classList.add('tg-active');
    document.title = `${weddingData.bride.firstName} & ${weddingData.groom.firstName} | Wedding Invitation`;
    return () => { root.classList.remove('tg-active', 'intro-open'); document.title = prev; music.pause(); };
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

  const edge = (ev: (typeof events)[number]) => eventStyles[ev.theme] ?? eventStyles.custom;
  const chain = (list: typeof events, startFrom: string, startIndex: number) => list.map((ev, i) => {
    const prevBottom = i === 0 ? startFrom : styleFor(list[i - 1]).edgeBottom;
    return (
      <div key={ev.id}>
        <CircleWipe from={prevBottom} to={edge(ev).edgeTop} kind={edge(ev).wipe} fromSide={(startIndex + i) % 2 ? 'left' : 'right'} />
        <EventScene event={ev} index={startIndex + i} />
      </div>
    );
  });
  const lastFestiveBottom = festive.length ? styleFor(festive[festive.length - 1]).edgeBottom : '#911A33';
  const lastBotBottom = botanical.length ? styleFor(botanical[botanical.length - 1]).edgeBottom : '#A7A582';

  return (
    <main className="tg">
      <Defs />
      <Link to="/#themes" className="tg-back">← All themes</Link>
      <IntroOverlay onOpen={() => setOpened(true)} />
      <ScrollProgress />
      <SceneFestiveOpen opened={opened} />
      <SceneFestiveCeremony />
      <SceneFestiveDetails />
      {chain(festive, '#911A33', 0)}
      <CircleWipe from={lastFestiveBottom} to="#B3254F" kind="festive" fromSide="left" />
      <SceneTransition />
      <SceneBotanicalIntro />
      <SceneSaveTheDate />
      <CircleWipe from="#ECE6C3" to="#6F7059" kind="gold" fromSide="right" />
      <SceneCoupleReveal />
      {chain(botanical, '#A7A582', festive.length)}
      <CircleWipe from={botanical.length ? lastBotBottom : '#A7A582'} to="#747658" kind="leaf" fromSide="left" />
      <SceneCountdown />
      <CircleWipe from="#ECE6C3" to="#F0EBD0" kind="pink" fromSide="right" />
      <SceneMonogram />
      <SceneJustMarried />
      <CircleWipe from="#0B0B0B" to="#D5E4EF" kind="pink" fromSide="left" />
      <SceneFinalGarden />
      <MusicToggle />
    </main>
  );
}
