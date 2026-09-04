/**
 * KaarigarConnect - Central Application State & Data Engine
 * Manages Kaarigar profiles, marketplace categories, booking requests,
 * live GPS tracking status, mock backend store, and RBAC authentication state.
 */

window.KaarigarState = (function () {
    // Initial Mock Kaarigars Database (Hyderabad District Division)
    const initialKaarigars = [
        {
            id: 'kaarigar-1',
            name: 'Imran Ali',
            trade: 'Senior Electrician & Plumber',
            category: 'electrical',
            rating: 4.9,
            reviewCount: 142,
            jobsCompleted: 389,
            experience: '12 Years',
            cnicVerified: true,
            guildBadge: 'SD-8821',
            guildLevel: 'Master Craftsman',
            phone: '0300-8392019',
            baseFee: 500,
            hourlyRate: 800,
            avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80',
            location: { sector: 'Latifabad Unit 6', lat: 25.3670, lng: 68.3680 },
            distance: '1.2 km',
            availability: 'Online - Instant Dispatch',
            skills: ['Inverter AC PCB Diagnostics', '3-Phase Motor Rewinding', 'PEX Pipe Fitting', 'UPS Backup Wiring'],
            bio: 'Certified master electrician with 12+ years serving Latifabad and Qasimabad. Specialized in dual-inverter AC power boards and heavy load home wiring.',
            reviews: [
                { author: 'Tariq Mansoor (Qasimabad)', rating: 5, date: '2 days ago', text: 'Imran arrived within 20 mins during peak afternoon heat and fixed our inverter AC PCB issue effortlessly. Very honest pricing!' },
                { author: 'Dr. Sarah Ahmed (Auto Bhan)', rating: 5, date: '1 week ago', text: 'Clean work on complete bathroom plumbing replacement. Showed CNIC and Sindh Guild badge before entering.' }
            ]
        },
        {
            id: 'kaarigar-2',
            name: 'Master Tariq Mehmood',
            trade: 'AC Inverter & HVAC Specialist',
            category: 'ac_repair',
            rating: 4.8,
            reviewCount: 98,
            jobsCompleted: 245,
            experience: '15 Years',
            cnicVerified: true,
            guildBadge: 'SD-9102',
            guildLevel: 'Senior Master',
            phone: '0313-9201827',
            baseFee: 600,
            hourlyRate: 1000,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
            location: { sector: 'Qasimabad Phase 1', lat: 25.3920, lng: 68.3410 },
            distance: '2.4 km',
            availability: 'Online - 25 Mins Arrival',
            skills: ['R32 Gas Refill', 'Compressor Overhaul', 'Chiller Unit Diagnostics', 'Wall Unit Installation'],
            bio: 'Dedicated HVAC expert with specialized toolset for Japanese and local inverter AC units. Sindh Guild master trainer.',
            reviews: [
                { author: 'Bilal Sheikh (Saddar)', rating: 5, date: '3 days ago', text: 'Diagnosed gas leak accurately and refilled gas with pressure test guarantee.' }
            ]
        },
        {
            id: 'kaarigar-3',
            name: 'Rashid Khan',
            trade: 'Sanitary & Water Motor Technician',
            category: 'plumbing',
            rating: 4.9,
            reviewCount: 114,
            jobsCompleted: 310,
            experience: '9 Years',
            cnicVerified: true,
            guildBadge: 'SD-7719',
            guildLevel: 'Certified Artisan',
            phone: '0321-4455667',
            baseFee: 400,
            hourlyRate: 700,
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
            location: { sector: 'Saddar Bazaar', lat: 25.3980, lng: 68.3560 },
            distance: '3.1 km',
            availability: 'Online - Instant Dispatch',
            skills: ['Submersible Pump Fitting', 'Underground Leak Detection', 'Geyser Installation', 'Drainage Unclogging'],
            bio: 'Expert in domestic water pressure systems, underground line repairs, and tank cleaning across Saddar & Cantt.',
            reviews: [
                { author: 'Usman Ali (Citizen Colony)', rating: 5, date: 'Yesterday', text: 'Water motor stopped working at 8 AM. Rashid fixed the capacitor and impeller by 9:15 AM.' }
            ]
        },
        {
            id: 'kaarigar-4',
            name: 'Zubaida Bibi & Team',
            trade: 'Home Painting & Waterproofing',
            category: 'painting',
            rating: 5.0,
            reviewCount: 67,
            jobsCompleted: 180,
            experience: '8 Years',
            cnicVerified: true,
            guildBadge: 'SD-6540',
            guildLevel: 'Master Artisan',
            phone: '0333-1122334',
            baseFee: 800,
            hourlyRate: 1200,
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
            location: { sector: 'Auto Bhan Road', lat: 25.3750, lng: 68.3500 },
            distance: '1.8 km',
            availability: 'Scheduled Today',
            skills: ['Heat Reflective Roof Coating', 'Wall Seepage Treatment', 'Velvet Finish Interior', 'Texture Spray'],
            bio: 'Lead artisan specializing in summer roof heat-insulation and seepage treatment for residential houses.',
            reviews: [
                { author: 'Fatima Zafar (Latifabad 2)', rating: 5, date: '5 days ago', text: 'Reduced our top floor temperature by 4 degrees with solar reflective roof paint!' }
            ]
        },
        {
            id: 'kaarigar-5',
            name: 'Kamran Craftsmanship',
            trade: 'Master Carpenter & Door Specialist',
            category: 'carpentry',
            rating: 4.7,
            reviewCount: 76,
            jobsCompleted: 215,
            experience: '14 Years',
            cnicVerified: true,
            guildBadge: 'SD-8120',
            guildLevel: 'Senior Artisan',
            phone: '0345-7788990',
            baseFee: 500,
            hourlyRate: 750,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
            location: { sector: 'Citizen Colony', lat: 25.3850, lng: 68.3480 },
            distance: '2.0 km',
            availability: 'Online - 30 Mins Arrival',
            skills: ['Solid Wood Door Fitting', 'Modular Kitchen Repair', 'Aluminium Window Lock', 'Sofa Frame Polish'],
            bio: 'Precision woodworking, door lock repair, and custom cabinet installation in Hyderabad.',
            reviews: [
                { author: 'Adeel Murtaza', rating: 4.8, date: '1 week ago', text: 'Fixed 4 sliding doors and kitchen cabinet hinges smoothly.' }
            ]
        }
    ];

    // Initial Active Bookings Queue
    const initialBookings = [
        {
            id: 'KC-89214',
            kaarigarId: 'kaarigar-1',
            kaarigarName: 'Imran Ali',
            serviceName: 'AC Inverter PCB & Capacitor Replacement',
            category: 'electrical',
            customerName: 'Shahid Mehmood',
            customerAddress: 'House 42, Block C, Latifabad Unit 6, Hyderabad',
            customerPhone: '0301-5544332',
            urgency: 'Express (< 45 mins)',
            status: 'EN_ROUTE', // DISPATCHED, EN_ROUTE, ARRIVED, IN_PROGRESS, COMPLETED
            etaMinutes: 14,
            safetyPin: '8942',
            estimatedCost: 1800,
            paymentMethod: 'Cash on Service',
            timestamp: new Date().toISOString(),
            logs: [
                { time: '13:30', note: 'Request created by customer' },
                { time: '13:32', note: 'Imran Ali accepted dispatch request' },
                { time: '13:35', note: 'Technician en route on motorbike (ETA 14 mins)' }
            ]
        }
    ];

    // Application State Object
    let state = {
        role: 'ROLE_CUSTOMER', // ROLE_CUSTOMER, ROLE_PROVIDER, ROLE_ADMIN
        currentLocality: 'Latifabad Unit 6',
        activeView: 'home', // home, map, ai_triage, profile, booking, tracking, dashboard, provider_console, security
        selectedKaarigarId: 'kaarigar-1',
        searchQuery: '',
        categoryFilter: 'all',
        urgencyFilter: 'all',
        kaarigars: initialKaarigars,
        bookings: initialBookings,
        activeBookingId: 'KC-89214',
        telemetry: {
            activeCount: 142,
            avgArrivalMins: 18,
            completedToday: 312,
            satisfactionRate: '99.4%'
        },
        auth: {
            user: { name: 'Shahid Mehmood', phone: '0301-5544332', cnic: '41304-******-1' },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsInJvbGUiOiJST0xFX0NVU1RPTUVSIiwiaWF0IjoxNjczODkwMDB9',
            csrfToken: 'csrf-token-98234-x89',
            isAuthenticated: true
        },
        auditLogs: [
            { id: 'LOG-101', timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(), action: 'AUTH_LOGIN_SUCCESS', user: 'Shahid Mehmood', role: 'ROLE_CUSTOMER', details: 'User authenticated via OTP SMS' },
            { id: 'LOG-102', timestamp: new Date(Date.now() - 1800000).toLocaleTimeString(), action: 'CSRF_TOKEN_VERIFIED', user: 'Shahid Mehmood', role: 'ROLE_CUSTOMER', details: 'Double-submit cookie validation passed' },
            { id: 'LOG-103', timestamp: new Date(Date.now() - 600000).toLocaleTimeString(), action: 'JOB_DISPATCH_CREATED', user: 'Shahid Mehmood', role: 'ROLE_CUSTOMER', details: 'Order KC-89214 created with Safety PIN #8942' }
        ]
    };

    // Subscriptions for Reactive UI Updates
    const listeners = [];

    return {
        getState: () => state,
        
        subscribe: (listener) => {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if (index > -1) listeners.splice(index, 1);
            };
        },

        notify: () => {
            listeners.forEach(fn => fn(state));
        },

        setRole: (role) => {
            state.role = role;
            this.addAuditLog('ROLE_SWITCH', `User switched role to ${role}`);
            KaarigarState.notify();
        },

        setActiveView: (viewName, extraData = {}) => {
            state.activeView = viewName;
            if (extraData.kaarigarId) state.selectedKaarigarId = extraData.kaarigarId;
            if (extraData.bookingId) state.activeBookingId = extraData.bookingId;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            KaarigarState.notify();
        },

        setSearchQuery: (query) => {
            state.searchQuery = query;
            KaarigarState.notify();
        },

        setCategoryFilter: (category) => {
            state.categoryFilter = category;
            KaarigarState.notify();
        },

        setLocality: (locality) => {
            state.currentLocality = locality;
            this.addAuditLog('LOCALITY_CHANGE', `Locality updated to ${locality}`);
            KaarigarState.notify();
        },

        // Booking Lifecycle Methods
        createBooking: (bookingData) => {
            const pin = Math.floor(1000 + Math.random() * 9000).toString();
            const newBooking = {
                id: 'KC-' + Math.floor(10000 + Math.random() * 90000),
                kaarigarId: bookingData.kaarigarId || 'kaarigar-1',
                kaarigarName: bookingData.kaarigarName || 'Imran Ali',
                serviceName: bookingData.serviceName || 'Home Diagnostic Service',
                category: bookingData.category || 'electrical',
                customerName: state.auth.user.name,
                customerAddress: bookingData.address || `${state.currentLocality}, Hyderabad`,
                customerPhone: state.auth.user.phone,
                urgency: bookingData.urgency || 'Express (< 45 mins)',
                status: 'DISPATCHED',
                etaMinutes: 18,
                safetyPin: pin,
                estimatedCost: bookingData.estimatedCost || 1200,
                paymentMethod: bookingData.paymentMethod || 'Cash on Service',
                timestamp: new Date().toISOString(),
                logs: [
                    { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Request created and verified' },
                    { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Dispatched to nearest technician' }
                ]
            };
            state.bookings.unshift(newBooking);
            state.activeBookingId = newBooking.id;
            this.addAuditLog('JOB_CREATE_SUCCESS', `New job ${newBooking.id} dispatched with PIN #${pin}`);
            KaarigarState.notify();
            return newBooking;
        },

        updateBookingStatus: (bookingId, newStatus, note) => {
            const booking = state.bookings.find(b => b.id === bookingId);
            if (booking) {
                booking.status = newStatus;
                if (note) {
                    booking.logs.push({
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        note: note
                    });
                }
                this.addAuditLog('JOB_STATUS_UPDATE', `Job ${bookingId} updated status to ${newStatus}`);
                KaarigarState.notify();
            }
        },

        // Security Audit Logging
        addAuditLog: (action, details) => {
            const log = {
                id: 'LOG-' + Math.floor(100 + Math.random() * 900),
                timestamp: new Date().toLocaleTimeString(),
                action: action,
                user: state.auth.user.name,
                role: state.role,
                details: details
            };
            state.auditLogs.unshift(log);
            if (state.auditLogs.length > 50) state.auditLogs.pop();
        },

        // Getters
        getKaarigarById: (id) => {
            return state.kaarigars.find(k => k.id === id) || state.kaarigars[0];
        },

        getActiveBooking: () => {
            return state.bookings.find(b => b.id === state.activeBookingId) || state.bookings[0];
        },

        getFilteredKaarigars: () => {
            return state.kaarigars.filter(k => {
                const matchesCategory = state.categoryFilter === 'all' || k.category === state.categoryFilter;
                const query = state.searchQuery.toLowerCase().trim();
                const matchesQuery = !query || 
                    k.name.toLowerCase().includes(query) || 
                    k.trade.toLowerCase().includes(query) || 
                    k.skills.some(s => s.toLowerCase().includes(query)) ||
                    k.location.sector.toLowerCase().includes(query);
                return matchesCategory && matchesQuery;
            });
        }
    };
})();
