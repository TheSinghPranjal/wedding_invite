import type { ComponentType } from 'react';
import type { WeddingEvent } from '../../../data/weddingData';
import { HaldiArt, MehendiArt, SangeetArt, WeddingArt, ReceptionArt, GenericArt } from '../scenes/EventArt';

export type Chapter = 'festive' | 'botanical';
export interface EventStyle {
  title: string;
  tagline: string;
  /** which half of the experience this event belongs to */
  chapter: Chapter;
  /** stage background (CSS) and the solid colours at its top / bottom (used by the circular wipes) */
  bg: string;
  edgeTop: string;
  edgeBottom: string;
  ink: string;
  accent: string;
  light: boolean;
  /** title block vertical position (% of board) */
  titleTop: string;
  /** space reserved at the bottom of the board for the details block */
  detailsBottom: string;
  wipe: 'festive' | 'pink' | 'leaf' | 'gold' | 'concentric';
  Art: ComponentType;
}

/**
 * One entry per event type. Add a type (or let a custom event fall back to `custom`) and the shared EventScene,
 * scroll timeline and details block work unchanged. Festive events appear before the pink -> sage transition,
 * botanical events (reception, engagement, custom) after the botanical chapter opens.
 */
export const eventStyles: Record<WeddingEvent['theme'], EventStyle> = {
  haldi: { title: 'The Haldi Ceremony', tagline: 'A DAY OF SUNSHINE, SMILES & BLESSINGS', chapter: 'festive', bg: 'radial-gradient(ellipse at 50% 30%, #FFE27A, #F5BC2C 55%, #E0900F)', edgeTop: '#FFE27A', edgeBottom: '#E0900F', ink: '#5A2A0A', accent: '#A8231F', light: true, titleTop: '7%', detailsBottom: '4cqw', wipe: 'festive', Art: HaldiArt },
  mehendi: { title: 'The Mehendi Celebration', tagline: 'COLOURS, LAUGHTER & BEAUTIFUL MEMORIES', chapter: 'festive', bg: 'radial-gradient(ellipse at 50% 20%, #7C9A6A, #4E7A52 55%, #2F5A40)', edgeTop: '#7C9A6A', edgeBottom: '#2F5A40', ink: '#FFF6E6', accent: '#F4D77A', light: false, titleTop: '7%', detailsBottom: '4cqw', wipe: 'leaf', Art: MehendiArt },
  sangeet: { title: 'The Sangeet Night', tagline: 'MUSIC, DANCE & ENDLESS CELEBRATION', chapter: 'festive', bg: 'radial-gradient(ellipse at 50% 30%, #A52C5E, #6A1544 55%, #3A0B2E)', edgeTop: '#A52C5E', edgeBottom: '#3A0B2E', ink: '#FFF1F3', accent: '#F4D77A', light: false, titleTop: '7%', detailsBottom: '4cqw', wipe: 'pink', Art: SangeetArt },
  wedding: { title: 'The Wedding Ceremony', tagline: '', chapter: 'festive', bg: 'radial-gradient(ellipse at 50% 46%, #D9457A 0%, #B3254F 42%, #911A33 100%)', edgeTop: '#B3254F', edgeBottom: '#911A33', ink: '#FFF1F3', accent: '#F7C52D', light: false, titleTop: '27%', detailsBottom: '12cqw', wipe: 'festive', Art: WeddingArt },
  reception: { title: 'The Reception', tagline: 'AN EVENING OF LOVE & TOGETHERNESS', chapter: 'botanical', bg: 'linear-gradient(180deg, #6F705A, #BDB895 60%, #E8E4BE)', edgeTop: '#6F705A', edgeBottom: '#E8E4BE', ink: '#5E3A22', accent: '#8A5A34', light: true, titleTop: '24%', detailsBottom: '4cqw', wipe: 'leaf', Art: ReceptionArt },
  engagement: { title: 'The Engagement', tagline: 'THE BEGINNING OF FOREVER', chapter: 'botanical', bg: 'linear-gradient(180deg, #6F705A, #7D7E62)', edgeTop: '#6F705A', edgeBottom: '#7D7E62', ink: '#F4EFD2', accent: '#E8C97A', light: false, titleTop: '27%', detailsBottom: '4cqw', wipe: 'gold', Art: GenericArt },
  custom: { title: 'Celebration', tagline: 'JOIN US FOR A SPECIAL OCCASION', chapter: 'botanical', bg: 'linear-gradient(180deg, #6F705A, #7D7E62)', edgeTop: '#6F705A', edgeBottom: '#7D7E62', ink: '#F4EFD2', accent: '#E8C97A', light: false, titleTop: '27%', detailsBottom: '4cqw', wipe: 'gold', Art: GenericArt },
};

export const styleFor = (ev: WeddingEvent): EventStyle => {
  const s = eventStyles[ev.theme] ?? eventStyles.custom;
  const c = ev.themeConfig;
  return { ...s, title: ev.title ?? s.title, tagline: ev.tagline ?? s.tagline, bg: c?.background ?? s.bg, ink: c?.ink ?? s.ink, accent: c?.accent ?? s.accent };
};
