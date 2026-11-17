import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/gsap';
import { useReducedMotion } from './hooks/useReducedMotion';
import ScenePalace from './components/scenes/Scene01Palace';
import SceneLanterns from './components/scenes/Scene02Lanterns';
import ScenePhone from './components/scenes/Scene03PhoneMockup';
import SceneInvitation from './components/scenes/Scene04Invitation';
import SceneFamily from './components/scenes/Scene05Family';
import SceneEvents from './components/scenes/Scene06Events';
import SceneCountdown from './components/scenes/Scene07Countdown';
import SceneVenue from './components/scenes/Scene08Venue';
import SceneBrideGroom from './components/scenes/Scene09BrideGroom';
import SceneLoveStory from './components/scenes/Scene10LoveStory';
import SceneGallery from './components/scenes/Scene11Gallery';
import SceneFinal from './components/scenes/Scene12Final';
import MusicToggle from './components/ui/MusicToggle';
import IntroOverlay from './components/ui/IntroOverlay';
import ScrollProgress from './components/ui/ScrollProgress';
import Bridge from './components/ui/Bridge';

export default function App() {
  const reduce = useReducedMotion();
  const lenis = useRef<Lenis | null>(null);
  const [opened, setOpened] = useState(false);

  // Smooth wheel scrolling synced to ScrollTrigger. Touch stays native.
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
    <main>
      <IntroOverlay onOpen={() => setOpened(true)} />
      <ScrollProgress />
      <ScenePalace />
      <SceneLanterns />
      <ScenePhone />
      <SceneInvitation />
      <SceneFamily />
      <Bridge from="#2b6a5c" to="#0a0e27" />
      <SceneEvents />
      <Bridge from="#0c0408" to="#2b6a5c" />
      <SceneCountdown />
      <SceneVenue />
      <Bridge from="#1a1326" to="#e8bdd0" />
      <SceneBrideGroom />
      <SceneLoveStory />
      <SceneGallery />
      <Bridge from="#faf3e0" to="#2a2a55" />
      <SceneFinal />
      <MusicToggle />
    </main>
  );
}
