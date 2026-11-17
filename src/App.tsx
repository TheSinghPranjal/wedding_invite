import { useEffect } from 'react';
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

export default function App() {
  const reduce = useReducedMotion();

  // Smooth wheel scrolling synced to ScrollTrigger. Touch stays native (Lenis default syncTouch:false).
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduce]);

  return (
    <main>
      <ScenePalace />
      <SceneLanterns />
      <ScenePhone />
      <SceneInvitation />
      <SceneFamily />
      <SceneEvents />
      <SceneCountdown />
      <SceneVenue />
      <SceneBrideGroom />
      <SceneLoveStory />
      <SceneGallery />
      <SceneFinal />
      <MusicToggle />
    </main>
  );
}
