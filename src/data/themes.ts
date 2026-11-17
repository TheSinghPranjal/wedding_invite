import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import fortPreview from '../themes/wedding_invite_fort_theme/assets/palace.jpg';

export interface ThemeEntry {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  preview: string;
  /** Lazy-loaded so each theme's code and CSS only ship when visited. */
  component: LazyExoticComponent<ComponentType>;
}

/** Register new themes here - the gallery and routes pick them up automatically. */
export const themes: ThemeEntry[] = [
  {
    id: 'wedding_invite_fort_theme',
    number: '01',
    name: 'Royal Palace Wedding',
    category: 'Royal Indian Wedding',
    description:
      'A traditional Rajasthani palace-inspired invitation: a scroll-told story of lantern-lit nights, ornate events, a live countdown and a heartfelt RSVP.',
    tags: ['Palace', 'Lanterns', 'Golden', 'Animated'],
    preview: fortPreview,
    component: lazy(() => import('../themes/wedding_invite_fort_theme')),
  },
];

export const getTheme = (id: string) => themes.find((t) => t.id === id);
