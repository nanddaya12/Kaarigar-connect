export type UserRole = 'customer' | 'provider' | 'admin';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';
export type AvailabilityStatus = 'online' | 'offline' | 'busy';
export type UrgencyLevel = 'express' | 'today' | 'scheduled';
export type RequestStatus = 'requested' | 'accepted' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar_url?: string;
  role: UserRole;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface KaarigarReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface ProviderProfile {
  id: string;
  user_id: string;
  name: string;
  profession: string;
  category: string;
  bio: string;
  experience_years: number;
  verification_status: VerificationStatus;
  availability_status: AvailabilityStatus;
  service_area: string;
  latitude: number;
  longitude: number;
  starting_price: number;
  hourly_rate: number;
  response_time: string;
  cnic_verified: boolean;
  guild_badge: string;
  guild_level: string;
  rating: number;
  review_count: number;
  jobs_completed: number;
  phone: string;
  avatar_url: string;
  skills: string[];
  reviews: KaarigarReview[];
  created_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface ServiceRequest {
  id: string;
  customer_id: string;
  provider_id?: string;
  kaarigar_name?: string;
  service_name: string;
  category: string;
  description: string;
  customer_name: string;
  customer_address: string;
  customer_phone: string;
  urgency: UrgencyLevel;
  status: RequestStatus;
  eta_minutes: number;
  safety_pin: string;
  estimated_cost: number;
  payment_method: string;
  uploaded_photo?: string;
  created_at: string;
  logs: Array<{ time: string; note: string }>;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  message: string;
  attachment_url?: string;
  created_at: string;
  read_at?: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  role: string;
  details: string;
}
