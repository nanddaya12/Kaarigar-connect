import { ProviderProfile, ServiceCategory } from '../types/database.types';

export const mockCategories: ServiceCategory[] = [
  { id: 'c1', name: 'Electrician & UPS', slug: 'electrical', description: 'Inverter AC wiring, breaker box, UPS backup, 3-phase motor', icon: 'bolt' },
  { id: 'c2', name: 'AC & Cooling', slug: 'ac_repair', description: 'R32 gas refill, PCB inverter repair, compressor overhaul', icon: 'ac_unit' },
  { id: 'c3', name: 'Plumbing & Motor', slug: 'plumbing', description: 'Water pump motor rewinding, sanitary fitting, leak detection', icon: 'plumbing' },
  { id: 'c4', name: 'Painting & Seepage', slug: 'painting', description: 'Roof heat reflective coating, seepage treatment, interior', icon: 'format_paint' },
  { id: 'c5', name: 'Carpentry & Doors', slug: 'carpentry', description: 'Door lock repair, wooden frame alignment, custom cabinets', icon: 'carpentry' }
];

export const mockProviders: ProviderProfile[] = [
  {
    id: 'kaarigar-1',
    user_id: 'u101',
    name: 'Imran Ali',
    profession: 'Senior Electrician & Plumber',
    category: 'electrical',
    bio: 'Certified master electrician with 12+ years serving Latifabad and Qasimabad. Specialized in dual-inverter AC power boards and heavy load home wiring.',
    experience_years: 12,
    verification_status: 'verified',
    availability_status: 'online',
    service_area: 'Latifabad Unit 6',
    latitude: 25.3670,
    longitude: 68.3680,
    starting_price: 500,
    hourly_rate: 800,
    response_time: '18 Mins',
    cnic_verified: true,
    guild_badge: 'SD-8821',
    guild_level: 'Master Craftsman',
    rating: 4.9,
    review_count: 142,
    jobs_completed: 389,
    phone: '0300-8392019',
    avatar_url: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80',
    skills: ['Inverter AC PCB Diagnostics', '3-Phase Motor Rewinding', 'PEX Pipe Fitting', 'UPS Backup Wiring'],
    reviews: [
      { id: 'r1', author: 'Tariq Mansoor (Qasimabad)', rating: 5, date: '2 days ago', text: 'Imran arrived within 20 mins during peak afternoon heat and fixed our inverter AC PCB issue effortlessly. Very honest pricing!' },
      { id: 'r2', author: 'Dr. Sarah Ahmed (Auto Bhan)', rating: 5, date: '1 week ago', text: 'Clean work on complete bathroom plumbing replacement. Showed CNIC and Sindh Guild badge before entering.' }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'kaarigar-2',
    user_id: 'u102',
    name: 'Master Tariq Mehmood',
    profession: 'AC Inverter & HVAC Specialist',
    category: 'ac_repair',
    bio: 'Dedicated HVAC expert with specialized toolset for Japanese and local inverter AC units. Sindh Guild master trainer.',
    experience_years: 15,
    verification_status: 'verified',
    availability_status: 'online',
    service_area: 'Qasimabad Phase 1',
    latitude: 25.3920,
    longitude: 68.3410,
    starting_price: 600,
    hourly_rate: 1000,
    response_time: '25 Mins',
    cnic_verified: true,
    guild_badge: 'SD-9102',
    guild_level: 'Senior Master',
    rating: 4.8,
    review_count: 98,
    jobs_completed: 245,
    phone: '0313-9201827',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    skills: ['R32 Gas Refill', 'Compressor Overhaul', 'Chiller Unit Diagnostics', 'Wall Unit Installation'],
    reviews: [
      { id: 'r3', author: 'Bilal Sheikh (Saddar)', rating: 5, date: '3 days ago', text: 'Diagnosed gas leak accurately and refilled gas with pressure test guarantee.' }
    ],
    created_at: new Date().toISOString()
  },
  {
    id: 'kaarigar-3',
    user_id: 'u103',
    name: 'Rashid Khan',
    profession: 'Sanitary & Water Motor Technician',
    category: 'plumbing',
    bio: 'Expert in domestic water pressure systems, underground line repairs, and tank cleaning across Saddar & Cantt.',
    experience_years: 9,
    verification_status: 'verified',
    availability_status: 'online',
    service_area: 'Saddar Bazaar',
    latitude: 25.3980,
    longitude: 68.3560,
    starting_price: 400,
    hourly_rate: 700,
    response_time: '15 Mins',
    cnic_verified: true,
    guild_badge: 'SD-7719',
    guild_level: 'Certified Artisan',
    rating: 4.9,
    review_count: 114,
    jobs_completed: 310,
    phone: '0321-4455667',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    skills: ['Submersible Pump Fitting', 'Underground Leak Detection', 'Geyser Installation', 'Drainage Unclogging'],
    reviews: [
      { id: 'r4', author: 'Usman Ali (Citizen Colony)', rating: 5, date: 'Yesterday', text: 'Water motor stopped working at 8 AM. Rashid fixed the capacitor and impeller by 9:15 AM.' }
    ],
    created_at: new Date().toISOString()
  }
];

export const marketplaceService = {
  getCategories: async (): Promise<ServiceCategory[]> => {
    return mockCategories;
  },

  getProviders: async (categorySlug?: string, searchQuery?: string, locality?: string): Promise<ProviderProfile[]> => {
    return mockProviders.filter(p => {
      const matchCat = !categorySlug || categorySlug === 'all' || p.category === categorySlug;
      const q = (searchQuery || '').toLowerCase();
      const matchQuery = !q || 
        p.name.toLowerCase().includes(q) || 
        p.profession.toLowerCase().includes(q) ||
        p.skills.some(s => s.toLowerCase().includes(q));
      const matchLocality = !locality || p.service_area.toLowerCase().includes(locality.toLowerCase()) || true;
      return matchCat && matchQuery && matchLocality;
    });
  },

  getProviderById: async (id: string): Promise<ProviderProfile | null> => {
    return mockProviders.find(p => p.id === id) || mockProviders[0];
  }
};
