import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import weddingData from '../../data/weddingData';
import { gsap, ScrollTrigger } from './lib/gsap';
import { music } from './lib/music';
import { useReducedMotion } from './hooks/useReducedMotion';
import { eventStyles, styleFor } from './config/eventThemes';
import Defs from './art/Defs';
import { IntroOverlay, MusicToggle, ScrollProgress, MandalaBridge } from './ui/ui';
import SceneGanesha from './scenes/Scene01Ganesha';
import SceneInvitation from './scenes/Scene02Invitation';
import SceneIllustrated from './scenes/Scene03Illustrated';
import SceneFamily from './scenes/Scene04Family';
import EventScene from './scenes/EventScene';
import SceneCountdown from './scenes/Scene10Countdown';
import SceneVenue from './scenes/Scene11Venue';
import SceneMeet from './scenes/Scene12Meet';
import SceneStory from './scenes/Scene13Story';
import SceneFinal from './scenes/Scene14Final';
import './styles/royal.css';

/** Theme 02 - Royal Burgundy & Gold. Smooth-scroll controller, scene order, and event scenes generated from weddingData.events. */
export default function RoyalBurgundy() {
  const reduce = useReducedMotion();
  const lenis = useRef<Lenis | null>(null);
  const [opened, setOpened] = useState(false);
  const events = weddingData.events;

  useEffect(() => {
    const root = document.documentElement;
    const prev = document.title;
    root.classList.add('rb-active');
    document.title = `${weddingData.bride.firstName} & ${weddingData.groom.firstName} | Wedding Invitation`;
    return () => { root.classList.remove('rb-active', 'intro-open'); document.title = prev; music.pause(); };
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

  return (
    <main className="rb">
      <Defs />
      <Link to="/#themes" className="rb-back">← All themes</Link>
      <IntroOverlay onOpen={() => setOpened(true)} />
      <ScrollProgress />
      <SceneGanesha opened={opened} />
      <SceneInvitation />
      <MandalaBridge from="#350719" to="#E8C65A" />
      <SceneIllustrated />
      <MandalaBridge from="#C99A24" to="#650D25" />
      <SceneFamily />
      {events.map((ev, i) => {
        const prevBottom = i === 0 ? '#350719' : styleFor(events[i - 1]).edgeBottom;
        return (
          <div key={ev.id}>
            <MandalaBridge from={prevBottom} to={(eventStyles[ev.theme] ?? eventStyles.custom).edgeTop} />
            <EventScene event={ev} index={i} />
          </div>
        );
      })}
      <MandalaBridge from={events.length ? styleFor(events[events.length - 1]).edgeBottom : '#350719'} to="#500A20" />
      <SceneCountdown />
      <MandalaBridge from="#350719" to="#2A0414" />
      <SceneVenue />
      <MandalaBridge from="#1D0615" to="#FFF9ED" />
      <SceneMeet />
      <SceneStory />
      <MandalaBridge from="#FFF9ED" to="#500A20" />
      <SceneFinal />
      <MusicToggle />
    </main>
  );
}
