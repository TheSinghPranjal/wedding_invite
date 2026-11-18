import type { ComponentType } from 'react';
import type { WeddingEvent } from '../../../data/weddingData';
import { HaldiArt, MehendiArt, SangeetArt, WeddingArt, ReceptionArt, GenericArt } from '../scenes/EventArt';

export interface EventStyle {
  title: string;
  tagline: string;
  /** stage background and the solid colours at its top / bottom (used by the circular wipes) */
  bg: string;
  edgeTop: string;
  edgeBottom: string;
  ink: string;
  accent: string;
  /** title colour */
  heading: string;
  titleTop: string;
  detailsBottom: string;
  wipe: 'lace' | 'rose' | 'wreath' | 'peony' | 'gold';
  ring: string;
  Art: ComponentType;
}

/** One entry per event type; custom events fall back to `custom`. The shared EventScene supplies layout, scroll timeline and details. */
export const eventStyles: Record<WeddingEvent['theme'], EventStyle> = {
  haldi: { title: 'Haldi', tagline: 'A DAY FILLED WITH LOVE, LAUGHTER & BLESSINGS', bg: 'radial-gradient(ellipse at 50% 30%, #FFF6CE, #FBE59A 55%, #F2CB5C)', edgeTop: '#FFF6CE', edgeBottom: '#F2CB5C', ink: '#5E3A12', accent: '#B5543A', heading: '#B5543A', titleTop: '8%', detailsBottom: '5cqw', wipe: 'peony', ring: '#fff', Art: HaldiArt },
  mehendi: { title: 'Mehendi', tagline: 'CELEBRATING LOVE IN EVERY LITTLE DETAIL', bg: 'radial-gradient(ellipse at 50% 20%, #C5CFB1, #9BA88B 55%, #737956)', edgeTop: '#C5CFB1', edgeBottom: '#737956', ink: '#FFF9EF', accent: '#F6E5E5', heading: '#FFF9EF', titleTop: '16%', detailsBottom: '5cqw', wipe: 'rose', ring: '#fff', Art: MehendiArt },
  sangeet: { title: 'Sangeet', tagline: 'AN EVENING OF MUSIC, DANCE & CELEBRATION', bg: 'radial-gradient(ellipse at 50% 30%, #B87D91, #874052 58%, #5E2A3C)', edgeTop: '#B87D91', edgeBottom: '#5E2A3C', ink: '#FFF9EF', accent: '#E8D2A0', heading: '#FFF9EF', titleTop: '12%', detailsBottom: '5cqw', wipe: 'gold', ring: '#E8D2A0', Art: SangeetArt },
  wedding: { title: 'The Wedding Ceremony', tagline: '', bg: 'radial-gradient(ellipse at 50% 30%, #FFFDF7, #FFF9EF 60%, #F6E5E5)', edgeTop: '#FFFDF7', edgeBottom: '#F6E5E5', ink: '#4A2A33', accent: '#AF3155', heading: '#874052', titleTop: '8%', detailsBottom: '5cqw', wipe: 'wreath', ring: '#DDA9B4', Art: WeddingArt },
  reception: { title: 'The Reception', tagline: 'AN EVENING TO CELEBRATE OUR NEW BEGINNING', bg: 'linear-gradient(180deg, #FBEDEA, #F6E5E5 50%, #EFE0C4)', edgeTop: '#FBEDEA', edgeBottom: '#EFE0C4', ink: '#4A2A33', accent: '#B87D91', heading: '#874052', titleTop: '12%', detailsBottom: '5cqw', wipe: 'gold', ring: '#C3A16C', Art: ReceptionArt },
  engagement: { title: 'The Engagement', tagline: 'THE BEGINNING OF FOREVER', bg: 'linear-gradient(180deg, #FBEDEA, #F6E5E5)', edgeTop: '#FBEDEA', edgeBottom: '#F6E5E5', ink: '#4A2A33', accent: '#B87D91', heading: '#874052', titleTop: '12%', detailsBottom: '5cqw', wipe: 'rose', ring: '#DDA9B4', Art: GenericArt },
  custom: { title: 'Celebration', tagline: 'JOIN US FOR A SPECIAL OCCASION', bg: 'linear-gradient(180deg, #FBEDEA, #F6E5E5)', edgeTop: '#FBEDEA', edgeBottom: '#F6E5E5', ink: '#4A2A33', accent: '#B87D91', heading: '#874052', titleTop: '12%', detailsBottom: '5cqw', wipe: 'lace', ring: '#DDA9B4', Art: GenericArt },
};

export const styleFor = (ev: WeddingEvent): EventStyle => {
  const s = eventStyles[ev.theme] ?? eventStyles.custom;
  const c = ev.themeConfig;
  return { ...s, title: ev.title ?? s.title, tagline: ev.tagline ?? s.tagline, bg: c?.background ?? s.bg, ink: c?.ink ?? s.ink, accent: c?.accent ?? s.accent };
};
