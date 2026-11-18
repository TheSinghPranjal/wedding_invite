import type { ComponentType } from 'react';
import type { WeddingEvent } from '../../../data/weddingData';
import { HaldiArt, MehendiArt, SangeetArt, WeddingArt, ReceptionArt, GenericArt } from '../scenes/EventArt';

export interface EventStyle {
  title: string;
  tagline: string;
  bg: string;
  edgeTop: string;
  edgeBottom: string;
  ink: string;
  accent: string;
  heading: string;
  titleTop: string;
  detailsBottom: string;
  wipe: 'feather' | 'gold' | 'lotus' | 'medallion' | 'filigree' | 'eye';
  ring: string;
  Art: ComponentType;
}

/** One entry per event type; custom events fall back to `custom`. The shared EventScene supplies layout, scroll timeline and details. */
export const eventStyles: Record<WeddingEvent['theme'], EventStyle> = {
  haldi: { title: 'Haldi Celebration', tagline: 'A DAY FILLED WITH HAPPINESS AND BLESSINGS', bg: 'radial-gradient(ellipse at 50% 30%, #FFF2C0, #F8DA78 55%, #E6B040)', edgeTop: '#FFF2C0', edgeBottom: '#E6B040', ink: '#4A3210', accent: '#126B67', heading: '#126B67', titleTop: '8%', detailsBottom: '5cqw', wipe: 'medallion', ring: '#C6A45D', Art: HaldiArt },
  mehendi: { title: 'Mehendi', tagline: 'CELEBRATING LOVE AND TRADITION', bg: 'radial-gradient(ellipse at 50% 25%, #1B7A6E, #0F5A52 55%, #08423C)', edgeTop: '#1B7A6E', edgeBottom: '#08423C', ink: '#F8F1E3', accent: '#E5D1A2', heading: '#F0DEAE', titleTop: '14%', detailsBottom: '5cqw', wipe: 'feather', ring: '#C6A45D', Art: MehendiArt },
  sangeet: { title: 'Sangeet Night', tagline: 'MUSIC, DANCE & CELEBRATION', bg: 'radial-gradient(ellipse at 50% 30%, #2A7894, #11506C 55%, #082F44)', edgeTop: '#2A7894', edgeBottom: '#082F44', ink: '#F8F1E3', accent: '#E5D1A2', heading: '#F0DEAE', titleTop: '11%', detailsBottom: '5cqw', wipe: 'filigree', ring: '#E5D1A2', Art: SangeetArt },
  wedding: { title: 'The Wedding Ceremony', tagline: '', bg: 'radial-gradient(ellipse at 50% 30%, #FBF4E6, #F1E5C8 55%, #D9E9D6)', edgeTop: '#FBF4E6', edgeBottom: '#D9E9D6', ink: '#244B36', accent: '#126B67', heading: '#126B67', titleTop: '8%', detailsBottom: '5cqw', wipe: 'feather', ring: '#C6A45D', Art: WeddingArt },
  reception: { title: 'The Reception', tagline: 'AN EVENING OF LOVE AND TOGETHERNESS', bg: 'radial-gradient(ellipse at 50% 30%, #5C4630, #3A2A1E 55%, #271B17)', edgeTop: '#5C4630', edgeBottom: '#271B17', ink: '#F8F1E3', accent: '#E5D1A2', heading: '#F0DEAE', titleTop: '10%', detailsBottom: '5cqw', wipe: 'medallion', ring: '#C6A45D', Art: ReceptionArt },
  engagement: { title: 'The Engagement', tagline: 'THE BEGINNING OF FOREVER', bg: 'radial-gradient(ellipse at 50% 30%, #167A76, #0A5A5C 55%, #063F44)', edgeTop: '#167A76', edgeBottom: '#063F44', ink: '#F8F1E3', accent: '#E5D1A2', heading: '#F0DEAE', titleTop: '10%', detailsBottom: '5cqw', wipe: 'feather', ring: '#C6A45D', Art: GenericArt },
  custom: { title: 'Celebration', tagline: 'JOIN US FOR A SPECIAL OCCASION', bg: 'radial-gradient(ellipse at 50% 30%, #167A76, #0A5A5C 55%, #063F44)', edgeTop: '#167A76', edgeBottom: '#063F44', ink: '#F8F1E3', accent: '#E5D1A2', heading: '#F0DEAE', titleTop: '10%', detailsBottom: '5cqw', wipe: 'eye', ring: '#C6A45D', Art: GenericArt },
};

export const styleFor = (ev: WeddingEvent): EventStyle => {
  const s = eventStyles[ev.theme] ?? eventStyles.custom;
  const c = ev.themeConfig;
  return { ...s, title: ev.title ?? s.title, tagline: ev.tagline ?? s.tagline, bg: c?.background ?? s.bg, ink: c?.ink ?? s.ink, accent: c?.accent ?? s.accent };
};
