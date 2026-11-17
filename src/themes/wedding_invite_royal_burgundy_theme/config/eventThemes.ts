import type { ComponentType } from 'react';
import type { WeddingEvent } from '../../../data/weddingData';
import { HaldiArt, MehendiArt, SangeetArt, WeddingArt, ReceptionArt, GenericArt } from '../scenes/EventArt';

export interface EventStyle {
  title: string;
  tagline: string;
  /** CSS background of the stage */
  bg: string;
  /** colour at the very top / very bottom of the scene, used by the mandala bridges */
  edgeTop: string;
  edgeBottom: string;
  ink: string;
  accent: string;
  light: boolean;
  Art: ComponentType;
}

const Eng = () => GenericArt({ engagement: true });
const Cust = () => GenericArt({});

/**
 * One entry per event type. A new type (or a custom event) only needs an entry here (or falls back to `custom`);
 * the scene, scroll animation and details layout in EventScene are shared.
 */
export const eventStyles: Record<WeddingEvent['theme'], EventStyle> = {
  haldi: { title: 'HALDI', tagline: 'A DAY FILLED WITH COLOURS, LOVE & BLESSINGS', bg: 'radial-gradient(ellipse at 50% 20%, #FFE27A, #F2B52A 55%, #D98A12)', edgeTop: '#FFE27A', edgeBottom: '#D98A12', ink: '#4A1D0A', accent: '#8E1B2E', light: true, Art: HaldiArt },
  mehendi: { title: 'MEHENDI', tagline: 'A CELEBRATION OF BEAUTY, COLOURS & TRADITION', bg: 'radial-gradient(ellipse at 50% 15%, #2F8A5C, #14573A 55%, #0A3524)', edgeTop: '#2F8A5C', edgeBottom: '#0A3524', ink: '#FFF9ED', accent: '#F1D58B', light: false, Art: MehendiArt },
  sangeet: { title: 'SANGEET', tagline: 'AN EVENING OF MUSIC, DANCE & CELEBRATION', bg: 'radial-gradient(ellipse at 50% 30%, #6C1D55, #3E0F3F 55%, #200827)', edgeTop: '#6C1D55', edgeBottom: '#200827', ink: '#FFF9ED', accent: '#F1D58B', light: false, Art: SangeetArt },
  wedding: { title: 'THE WEDDING CEREMONY', tagline: 'TWO SOULS, ONE SACRED UNION', bg: 'radial-gradient(ellipse at 50% 20%, #7A1230, #500A20 50%, #2A0414)', edgeTop: '#7A1230', edgeBottom: '#2A0414', ink: '#FFF9ED', accent: '#F1D58B', light: false, Art: WeddingArt },
  reception: { title: 'RECEPTION', tagline: 'AN EVENING TO CELEBRATE LOVE AND TOGETHERNESS', bg: 'radial-gradient(ellipse at 50% 10%, #FFFDF6, #F8EBD2 55%, #EBD6AE)', edgeTop: '#FFFDF6', edgeBottom: '#EBD6AE', ink: '#350719', accent: '#8E1B2E', light: true, Art: ReceptionArt },
  engagement: { title: 'ENGAGEMENT', tagline: 'THE BEGINNING OF FOREVER', bg: 'radial-gradient(ellipse at 50% 15%, #8A2A45, #5A0F2A 55%, #34071A)', edgeTop: '#8A2A45', edgeBottom: '#34071A', ink: '#FFF9ED', accent: '#F1D58B', light: false, Art: Eng },
  custom: { title: 'CELEBRATION', tagline: 'JOIN US FOR A SPECIAL OCCASION', bg: 'radial-gradient(ellipse at 50% 20%, #7A1230, #500A20 55%, #350719)', edgeTop: '#7A1230', edgeBottom: '#350719', ink: '#FFF9ED', accent: '#F1D58B', light: false, Art: Cust },
};

export const styleFor = (ev: WeddingEvent): EventStyle => {
  const s = eventStyles[ev.theme] ?? eventStyles.custom;
  const c = ev.themeConfig;
  return { ...s, title: ev.title ?? s.title, tagline: ev.tagline ?? s.tagline, bg: c?.background ?? s.bg, ink: c?.ink ?? s.ink, accent: c?.accent ?? s.accent };
};
