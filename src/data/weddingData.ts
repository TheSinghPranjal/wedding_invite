export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  description: string;
  dressCode?: string;
  image?: string;
  theme: 'mehendi' | 'haldi' | 'sangeet' | 'wedding' | 'reception' | 'engagement' | 'custom';
}

export interface FamilyMember {
  relation: string;
  name: string;
}

export interface StoryMilestone {
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface WeddingData {
  bride: {
    firstName: string;
    lastName: string;
    bio: string;
    photo: string;
    family: FamilyMember[];
  };
  groom: {
    firstName: string;
    lastName: string;
    bio: string;
    photo: string;
    family: FamilyMember[];
  };
  /** Calendar date of the wedding, YYYY-MM-DD */
  weddingDate: string;
  /** 24h 'HH:mm' in the wedding timezone. Leave '' until confirmed - countdown then targets 00:00 of the wedding day. */
  ceremonyTime: string;
  timezone: string;
  venue: {
    name: string;
    address: string;
    city: string;
    mapsUrl: string;
    photo: string;
  };
  events: WeddingEvent[];
  story: StoryMilestone[];
  gallery: { src: string; alt: string; category: string }[];
  rsvp: {
    endpoint: string;
    deadline: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
  music: {
    src: string;
    title: string;
  };
  blessings: {
    line1: string;
    line2: string;
  };
  /** Short sentence shown under the countdown */
  countdownNote: string;
}

const ev = (id: string, name: string, theme: WeddingEvent['theme'], description: string, date = ''): WeddingEvent => ({
  id, name, theme, description, date, time: '', venue: '', address: '', mapsUrl: '',
});

/**
 * SINGLE SOURCE OF TRUTH.
 * Everything blank ('') is intentionally unannounced - scenes show a graceful
 * "to be announced" state instead of invented details.
 * Add / remove / reorder events freely: the events scene renders whatever is here.
 */
const weddingData: WeddingData = {
  bride: {
    firstName: 'Rati',
    lastName: '',
    bio: '',
    photo: '', // e.g. '/images/rati.jpg'
    family: [], // e.g. [{ relation: 'Daughter of', name: '...' }]
  },
  groom: {
    firstName: 'Pranjal',
    lastName: '',
    bio: '',
    photo: '', // e.g. '/images/pranjal.jpg'
    family: [],
  },
  weddingDate: '2027-02-04',
  ceremonyTime: '',
  timezone: 'Asia/Kolkata',
  venue: { name: '', address: '', city: '', mapsUrl: '', photo: '' },
  events: [
    ev('mehendi', 'Mehendi', 'mehendi', 'An evening of colour, music and henna.'),
    ev('haldi', 'Haldi', 'haldi', 'A golden morning of blessings and laughter.'),
    ev('sangeet', 'Sangeet', 'sangeet', 'A night of song, dance and celebration.'),
    ev('wedding', 'Wedding Ceremony', 'wedding', 'The sacred union of two souls.', '2027-02-04'),
    ev('reception', 'Reception', 'reception', 'An elegant evening to celebrate together.'),
  ],
  story: [],
  gallery: [],
  rsvp: { endpoint: '', deadline: '' },
  contact: { phone: '', email: '', whatsapp: '' },
  music: { src: '/music/wedding-music.mp3', title: 'Wedding Music' },
  blessings: { line1: 'ॐ श्री गणेशाय नमः', line2: 'With the blessings of our families' },
  countdownNote: 'Our families are delighted that you are able to join us in celebrating one of the happiest days of our lives.',
};

export default weddingData;
