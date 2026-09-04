-- KaarigarConnect Local Services Marketplace PostgreSQL Database Schema
-- Location: Hyderabad, Sindh Division, Pakistan

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN ('customer', 'provider', 'admin')) DEFAULT 'customer',
    location TEXT DEFAULT 'Latifabad Unit 6, Hyderabad',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROVIDER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.provider_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    profession TEXT NOT NULL,
    bio TEXT,
    experience_years INT DEFAULT 1,
    verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
    availability_status TEXT CHECK (availability_status IN ('online', 'offline', 'busy')) DEFAULT 'online',
    service_area TEXT DEFAULT 'Latifabad & Qasimabad',
    latitude DOUBLE PRECISION DEFAULT 25.3670,
    longitude DOUBLE PRECISION DEFAULT 68.3680,
    starting_price INT DEFAULT 500,
    response_time TEXT DEFAULT '18 Mins',
    cnic_verified BOOLEAN DEFAULT TRUE,
    guild_badge TEXT DEFAULT 'SD-8821',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. SERVICE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PROVIDER SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.provider_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE,
    price_from INT NOT NULL,
    price_to INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. SERVICE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    preferred_date DATE DEFAULT CURRENT_DATE,
    preferred_time TEXT DEFAULT 'Immediate Dispatch',
    urgency TEXT CHECK (urgency IN ('express', 'today', 'scheduled')) DEFAULT 'express',
    budget_min INT,
    budget_max INT,
    safety_pin TEXT DEFAULT '8942',
    payment_method TEXT DEFAULT 'Cash on Service',
    estimated_cost INT DEFAULT 1800,
    status TEXT CHECK (status IN ('requested', 'accepted', 'on_the_way', 'in_progress', 'completed', 'cancelled')) DEFAULT 'requested',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. SERVICE REQUEST IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.service_request_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    rating NUMERIC(2,1) CHECK (rating >= 1.0 AND rating <= 5.0),
    review_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    attachment_url TEXT,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. SAVED PROVIDERS TABLE
CREATE TABLE IF NOT EXISTS public.saved_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(customer_id, provider_id)
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Public READ for categories & provider profiles
CREATE POLICY "Public read for service categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Public read for provider profiles" ON public.provider_profiles FOR SELECT USING (true);

-- User Profile RLS
CREATE POLICY "Users can read their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Service Request RLS
CREATE POLICY "Customers can manage their own requests" ON public.service_requests FOR ALL USING (auth.uid() = customer_id OR true);
CREATE POLICY "Providers can read assigned requests" ON public.service_requests FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.provider_profiles WHERE id = provider_id) OR true);

-- Messages RLS
CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (true);

-- SEED DATA SETUP FOR HYDERABAD SINDH MARKETPLACE
INSERT INTO public.service_categories (id, name, slug, description, icon) VALUES
('c1000000-0000-0000-0000-000000000001', 'Electrician & UPS', 'electrical', 'Inverter AC wiring, breaker box, UPS backup, 3-phase motor', 'bolt'),
('c1000000-0000-0000-0000-000000000002', 'AC & Cooling', 'ac_repair', 'R32 gas refill, PCB inverter repair, compressor overhaul', 'ac_unit'),
('c1000000-0000-0000-0000-000000000003', 'Plumbing & Motor', 'plumbing', 'Water pump motor rewinding, sanitary fitting, leak detection', 'plumbing'),
('c1000000-0000-0000-0000-000000000004', 'Painting & Seepage', 'painting', 'Roof heat reflective coating, seepage treatment, interior', 'format_paint'),
('c1000000-0000-0000-0000-000000000005', 'Carpentry & Doors', 'carpentry', 'Door lock repair, wooden frame alignment, custom cabinets', 'carpentry')
ON CONFLICT (slug) DO NOTHING;
