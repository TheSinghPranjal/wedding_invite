import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import royalPreview from '../themes/wedding_invite_royal_burgundy_theme/assets/preview.svg';
import gardenPreview from '../themes/wedding_invite_enchanted_garden_theme/assets/preview.svg';
import peonyPreview from '../themes/wedding_invite_peony_peacock_theme/assets/preview.svg';
import palacePreview from '../themes/wedding_invite_emerald_palace_theme/assets/preview.svg';
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
  {
    id: 'wedding_invite_royal_burgundy_theme',
    number: '02',
    name: 'Royal Burgundy & Gold',
    category: 'Traditional Indian Wedding',
    description:
      'A sacred Ganesha opening, rotating gold mandalas and illustrated Haldi, Mehendi, Sangeet, Wedding and Reception scenes in burgundy, antique gold and ivory.',
    tags: ['Ganesha', 'Mandala', 'Illustrated', 'Burgundy & Gold'],
    preview: royalPreview,
    component: lazy(() => import('../themes/wedding_invite_royal_burgundy_theme')),
  },
  {
    id: 'wedding_invite_enchanted_garden_theme',
    number: '03',
    name: 'Enchanted Garden',
    category: 'Festive & Botanical Wedding',
    description:
      'A raspberry-pink festive canopy with an illustrated couple, a circular floral transition into a sage watercolor garden, decorated elephants, an R & P monogram and a Just Married vintage car.',
    tags: ['Festive pink', 'Botanical', 'Elephants', 'Vintage car'],
    preview: gardenPreview,
    component: lazy(() => import('../themes/wedding_invite_enchanted_garden_theme')),
  },
  {
    id: 'wedding_invite_peony_peacock_theme',
    number: '04',
    name: 'Blush Peony & Peacock',
    category: 'Romantic Heritage Wedding',
    description:
      'A dusty-pink lace Save the Date, symmetrical peacocks and magnolias, a formal rose-cornered family card and gold line-art illustrations, in dusty rose, ivory and antique gold.',
    tags: ['Dusty rose', 'Peacocks', 'Line-art', 'Calligraphy'],
    preview: peonyPreview,
    component: lazy(() => import('../themes/wedding_invite_peony_peacock_theme')),
  },
  {
    id: 'wedding_invite_emerald_palace_theme',
    number: '05',
    name: 'Emerald Peacock Palace',
    category: 'Royal Palace Heritage Wedding',
    description:
      'A golden palace-garden opening, carved palace doors that swing open, deep-teal and antique-gold invitations with hanging elephant charms, and a luminous dark-heritage finale.',
    tags: ['Emerald & gold', 'Peacock', 'Palace door', 'Heritage'],
    preview: palacePreview,
    component: lazy(() => import('../themes/wedding_invite_emerald_palace_theme')),
  },
];

export const getTheme = (id: string) => themes.find((t) => t.id === id);
