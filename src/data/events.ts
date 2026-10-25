export interface MinistryEvent {
  id: string;
  title: string;
  tagline: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  type: 'revival_storm' | 'worship_experience' | 'campus_tour' | 'conference';
  status: 'upcoming' | 'completed';
  registrationUrl?: string;
  bannerImage: string;
}

export const ministryEvents: MinistryEvent[] = [
  {
    id: 'evt-1',
    title: 'MASS Revival Festival: Awakening The Nations',
    tagline: 'An unbroken atmosphere of prophetic worship, spiritual warfare, and signs & wonders.',
    date: 'November 20 - 22, 2026',
    time: '5:00 PM Daily',
    location: 'Lagos, Nigeria',
    venue: 'Tafawa Balewa Square (TBS) Main Arena',
    type: 'revival_storm',
    status: 'upcoming',
    registrationUrl: '/contact?category=general',
    bannerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'evt-2',
    title: 'Campus Revival Storm: University of Ibadan',
    tagline: 'Igniting the fire on campus altars and commissioning young kings and priests.',
    date: 'December 12, 2026',
    time: '6:00 PM',
    location: 'Ibadan, Oyo State',
    venue: 'Sub Hall, University of Ibadan',
    type: 'campus_tour',
    status: 'upcoming',
    registrationUrl: '/contact?category=general',
    bannerImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'evt-3',
    title: 'The Prophetic Harp & Altar: Ministers Retreat',
    tagline: 'Intensive consecration and impartation for worship ministers, psalmists, and intercessors.',
    date: 'January 15 - 17, 2027',
    time: '9:00 AM & 6:00 PM',
    location: 'Abuja, FCT',
    venue: 'Transcorp Hilton Congress Hall',
    type: 'conference',
    status: 'upcoming',
    registrationUrl: '/contact?category=conference',
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80'
  }
];
