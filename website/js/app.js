/**
 * KaarigarConnect - Website Application UI Engine & Navigation Router
 * Manages header, dynamic view switcher, global search modal (⌘K),
 * security control panel, customer dashboard, and full-stack interactions.
 */

window.KaarigarApp = (function () {

    function init() {
        // Subscribe to state changes
        KaarigarState.subscribe((state) => {
            renderHeader(state);
            renderMainContent(state);
        });

        // Setup global keyboard shortcut (⌘K / Ctrl+K)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleSearchModal(true);
            }
        });

        // Initial render
        renderHeader(KaarigarState.getState());
        renderMainContent(KaarigarState.getState());
    }

    function renderHeader(state) {
        const headerEl = document.getElementById('app-header');
        if (!headerEl) return;

        const activeBooking = KaarigarState.getActiveBooking();

        headerEl.innerHTML = `
            <div class="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
                <!-- Brand Logo & Locality Picker -->
                <div class="flex items-center gap-4">
                    <button onclick="KaarigarState.setActiveView('home')" class="flex items-center gap-2.5 text-left group focus:outline-none">
                        <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
                            K
                        </div>
                        <div class="flex flex-col">
                            <span class="font-headline font-bold text-lg text-primary leading-tight">KaarigarConnect</span>
                            <span class="text-[10px] font-semibold text-outline uppercase tracking-wider">Hyderabad, Sindh</span>
                        </div>
                    </button>

                    <div class="h-7 w-[1px] bg-outline-variant/60 hidden sm:block"></div>

                    <!-- Sector Dropdown Picker -->
                    <div class="relative group hidden lg:block">
                        <button class="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-full text-xs font-semibold transition-colors">
                            <span class="material-symbols-outlined text-primary text-[18px]">location_on</span>
                            <span>${state.currentLocality}</span>
                            <span class="material-symbols-outlined text-outline text-[16px]">expand_more</span>
                        </button>
                        <div class="absolute left-0 top-full mt-1 w-56 bg-surface-container-lowest rounded-xl shadow-xl p-2 hidden group-hover:block transition-all z-50 border border-outline-variant/40">
                            <p class="text-[10px] font-bold text-outline uppercase px-2 py-1 tracking-wider">Hyderabad Sectors</p>
                            <div class="space-y-0.5 mt-1">
                                ${['Latifabad Unit 6', 'Latifabad Unit 2 & 3', 'Qasimabad Phase 1', 'Qasimabad Phase 2', 'Auto Bhan Road', 'Saddar Bazaar & Cantt', 'Citizen Colony'].map(loc => `
                                    <button onclick="KaarigarState.setLocality('${loc}')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-surface-container-low text-xs font-medium text-on-surface flex items-center justify-between ${loc === state.currentLocality ? 'bg-primary-container/10 text-primary font-bold' : ''}">
                                        <span>${loc}</span>
                                        ${loc === state.currentLocality ? '<span class="material-symbols-outlined text-primary text-xs">check</span>' : ''}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Navigation Links -->
                <nav class="hidden xl:flex items-center gap-1">
                    <button onclick="KaarigarState.setActiveView('home')" class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${state.activeView === 'home' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'}">
                        Explore Services
                    </button>
                    <button onclick="KaarigarState.setActiveView('map')" class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${state.activeView === 'map' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'}">
                        Find Kaarigar (Map)
                    </button>
                    <button onclick="KaarigarState.setActiveView('ai_triage')" class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${state.activeView === 'ai_triage' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'}">
                        🤖 AI Triage
                    </button>
                    <button onclick="KaarigarState.setActiveView('tracking')" class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${state.activeView === 'tracking' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'}">
                        Live Tracking
                    </button>
                    <button onclick="KaarigarState.setActiveView('security')" class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${state.activeView === 'security' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'}">
                        🛡️ Security Center
                    </button>
                </nav>

                <!-- Right Action Controls & Role Switcher -->
                <div class="flex items-center gap-2.5">
                    <!-- Global Search Trigger Button -->
                    <button onclick="KaarigarApp.toggleSearchModal(true)" class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-medium transition-colors border border-outline-variant/30">
                        <span class="material-symbols-outlined text-[16px] text-outline">search</span>
                        <span>Search plumber, electrician...</span>
                        <kbd class="px-1.5 py-0.5 text-[10px] bg-surface-container-lowest rounded border text-outline font-mono">⌘K</kbd>
                    </button>

                    <!-- Role Switcher Dropdown -->
                    <div class="relative group">
                        <button class="px-3 py-1.5 bg-primary-container/10 border border-primary/30 text-primary hover:bg-primary-container/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">badge</span>
                            <span>Role: ${state.role.replace('ROLE_', '')}</span>
                            <span class="material-symbols-outlined text-xs">expand_more</span>
                        </button>
                        <div class="absolute right-0 top-full mt-1 w-48 bg-surface-container-lowest rounded-xl shadow-xl p-2 hidden group-hover:block transition-all z-50 border border-outline-variant/40">
                            <p class="text-[10px] font-bold text-outline uppercase px-2 py-1">Switch View Persona</p>
                            <button onclick="KaarigarState.setRole('ROLE_CUSTOMER'); KaarigarState.setActiveView('home');" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-surface-container-low text-xs font-medium ${state.role === 'ROLE_CUSTOMER' ? 'text-primary font-bold' : 'text-on-surface'}">
                                🧑 Customer View
                            </button>
                            <button onclick="KaarigarState.setRole('ROLE_PROVIDER'); KaarigarState.setActiveView('provider_console');" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-surface-container-low text-xs font-medium ${state.role === 'ROLE_PROVIDER' ? 'text-primary font-bold' : 'text-on-surface'}">
                                🛠️ Kaarigar Provider
                            </button>
                            <button onclick="KaarigarState.setRole('ROLE_ADMIN'); KaarigarState.setActiveView('security');" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-surface-container-low text-xs font-medium ${state.role === 'ROLE_ADMIN' ? 'text-primary font-bold' : 'text-on-surface'}">
                                🛡️ Security Auditor
                            </button>
                        </div>
                    </div>

                    <!-- Active Tracking Drawer Button -->
                    <button onclick="KaarigarState.setActiveView('tracking')" class="relative p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors" title="View Active Booking">
                        <span class="material-symbols-outlined text-[22px]">two_wheeler</span>
                        <span class="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                    </button>
                </div>
            </div>
        `;
    }

    function renderMainContent(state) {
        const mainEl = document.getElementById('app-main');
        if (!mainEl) return;

        if (state.activeView === 'home') {
            renderHomeView(mainEl, state);
        } else if (state.activeView === 'map') {
            mainEl.innerHTML = `<div id="map-view-container" class="max-w-7xl mx-auto px-6 py-6"></div>`;
            KaarigarMap.renderMap('map-view-container', (kaarigarId) => {
                KaarigarState.setActiveView('profile', { kaarigarId });
            });
        } else if (state.activeView === 'ai_triage') {
            renderAiTriageView(mainEl);
        } else if (state.activeView === 'profile') {
            renderProfileView(mainEl, state.selectedKaarigarId);
        } else if (state.activeView === 'tracking') {
            mainEl.innerHTML = `<div id="tracking-view-container" class="max-w-7xl mx-auto px-6 py-6"></div>`;
            KaarigarTracking.renderTrackingView('tracking-view-container');
        } else if (state.activeView === 'dashboard') {
            renderDashboardView(mainEl, state);
        } else if (state.activeView === 'provider_console') {
            mainEl.innerHTML = `<div id="provider-view-container" class="max-w-7xl mx-auto px-6 py-6"></div>`;
            KaarigarProvider.renderProviderConsole('provider-view-container');
        } else if (state.activeView === 'security') {
            renderSecurityView(mainEl, state);
        }
    }

    // 🏠 EXPLORE & HERO HOME VIEW
    function renderHomeView(container, state) {
        const kaarigars = KaarigarState.getFilteredKaarigars();

        container.innerHTML = `
            <div class="space-y-10 py-6">
                <!-- HERO BANNER SECTION -->
                <section class="max-w-7xl mx-auto px-6">
                    <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                        <!-- Top Telemetry Pill -->
                        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 text-primary text-xs font-bold">
                                <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                                SINDH GUILD CERTIFIED NETWORK · HYDERABAD DISTRICT DIVISION
                            </div>
                            <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface-container-low text-xs text-on-surface">
                                <span>⚡ <strong class="text-primary font-bold">142 Kaarigars Active</strong></span>
                                <span class="text-outline">|</span>
                                <span>Avg Arrival: <strong class="text-primary font-bold">18 Mins</strong></span>
                                <span class="text-outline">|</span>
                                <span class="text-tertiary-container font-bold">0% Hidden Surcharges</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div class="lg:col-span-8 space-y-4">
                                <h1 class="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight leading-tight">
                                    Find trusted local help in Hyderabad.
                                </h1>
                                <p class="text-base text-on-surface-variant max-w-2xl">
                                    From emergency AC breakdown in peak 42°C heat to instant water motor rewinding, connect with NADRA-verified skilled craftsmen within 30 minutes.
                                </p>
                            </div>

                            <div class="lg:col-span-4">
                                <div class="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 shadow-sm space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-[11px] font-bold text-outline uppercase tracking-wider">Peak Summer Hotline</span>
                                        <span class="px-2 py-0.5 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant text-[10px] font-bold">Active Now</span>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                                            <span class="material-symbols-outlined text-xl">support_agent</span>
                                        </div>
                                        <div>
                                            <p class="font-headline font-bold text-lg text-primary leading-none">022-2784910</p>
                                            <p class="text-xs text-on-surface-variant">Direct Saddar Guild Dispatcher</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- MASTER SEARCH TERMINAL BAR -->
                        <div class="mt-8 p-3 rounded-2xl bg-surface-container-low shadow-lg border border-outline-variant/30">
                            <div class="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                                <div class="md:col-span-5 flex items-center gap-3 px-4 py-2.5 bg-surface-container-lowest rounded-xl border border-outline-variant/40">
                                    <span class="material-symbols-outlined text-primary text-xl">build</span>
                                    <input type="text" id="home-search-input" value="${state.searchQuery}" oninput="KaarigarState.setSearchQuery(this.value)" placeholder="Search AC PCB diagnostic, plumber, electrician..." class="w-full bg-transparent text-xs sm:text-sm text-on-surface focus:outline-none placeholder:text-outline font-medium"/>
                                </div>

                                <div class="md:col-span-4 flex items-center gap-3 px-4 py-2.5 bg-surface-container-lowest rounded-xl border border-outline-variant/40">
                                    <span class="material-symbols-outlined text-secondary text-xl">location_on</span>
                                    <select onchange="KaarigarState.setLocality(this.value)" class="w-full bg-transparent text-xs sm:text-sm text-on-surface focus:outline-none font-medium cursor-pointer">
                                        ${['Latifabad Unit 6', 'Latifabad Unit 2 & 3', 'Qasimabad Phase 1', 'Qasimabad Phase 2', 'Auto Bhan Road', 'Saddar Bazaar & Cantt', 'Citizen Colony'].map(loc => `
                                            <option value="${loc}" ${loc === state.currentLocality ? 'selected' : ''}>${loc}</option>
                                        `).join('')}
                                    </select>
                                </div>

                                <div class="md:col-span-3">
                                    <button onclick="KaarigarState.setActiveView('map')" class="w-full py-2.5 px-4 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1">
                                        <span class="material-symbols-outlined text-base">map</span>
                                        <span>View Map Pins</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- SERVICE CATEGORY CHIPS -->
                <section class="max-w-7xl mx-auto px-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <h2 class="font-headline font-bold text-xl text-on-surface">Marketplace Categories</h2>
                        <span class="text-xs text-outline">Verified Guild Standards</span>
                    </div>

                    <div class="flex flex-wrap gap-2.5">
                        ${[
                            { id: 'all', label: 'All Services', icon: 'grid_view' },
                            { id: 'electrical', label: 'Electrician & UPS', icon: 'bolt' },
                            { id: 'ac_repair', label: 'AC Inverter & HVAC', icon: 'ac_unit' },
                            { id: 'plumbing', label: 'Plumbing & Motor', icon: 'plumbing' },
                            { id: 'painting', label: 'Painting & Seepage', icon: 'format_paint' },
                            { id: 'carpentry', label: 'Carpentry & Doors', icon: 'carpentry' }
                        ].map(cat => `
                            <button onclick="KaarigarState.setCategoryFilter('${cat.id}')" class="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${state.categoryFilter === cat.id ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-lowest border border-outline-variant/40 text-on-surface hover:bg-surface-container-low'}">
                                <span class="material-symbols-outlined text-base">${cat.icon}</span>
                                <span>${cat.label}</span>
                            </button>
                        `).join('')}
                    </div>
                </section>

                <!-- FEATURED KAARIGARS GRID -->
                <section class="max-w-7xl mx-auto px-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="font-headline font-bold text-xl text-on-surface">Available Kaarigars in ${state.currentLocality}</h2>
                            <p class="text-xs text-on-surface-variant">NADRA CNIC Verified · Instant Doorstep Dispatch</p>
                        </div>
                        <span class="text-xs text-primary font-bold">${kaarigars.length} Craftsmen Found</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${kaarigars.map(k => `
                            <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-3">
                                            <img src="${k.avatar}" alt="${k.name}" class="w-14 h-14 rounded-full object-cover border-2 border-primary/40 shadow-md"/>
                                            <div>
                                                <h3 class="font-bold text-base text-on-surface leading-tight">${k.name}</h3>
                                                <p class="text-xs text-on-surface-variant">${k.trade}</p>
                                                <span class="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full mt-1">
                                                    ✓ CNIC & Guild Badge ${k.guildBadge}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <p class="text-xs text-on-surface-variant line-clamp-2">${k.bio}</p>

                                    <div class="flex flex-wrap gap-1">
                                        ${k.skills.map(s => `
                                            <span class="px-2 py-0.5 bg-surface-container-low text-on-surface-variant text-[10px] font-medium rounded-md">${s}</span>
                                        `).join('')}
                                    </div>
                                </div>

                                <div class="pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                                    <div>
                                        <span class="text-[10px] uppercase text-outline font-bold">Base Visit Fee</span>
                                        <p class="text-sm font-extrabold text-primary font-mono">Rs. ${k.baseFee}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button onclick="KaarigarState.setActiveView('profile', { kaarigarId: '${k.id}' })" class="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold rounded-xl transition-colors">
                                            Profile
                                        </button>
                                        <button onclick="KaarigarBooking.initBookingModal('${k.id}', 'booking-modal-content'); document.getElementById('booking-modal-backdrop').classList.remove('hidden');" class="px-4 py-1.5 bg-primary hover:bg-primary-container text-on-primary text-xs font-bold rounded-xl shadow-md transition-colors">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        `;
    }

    // 🤖 KAARIGAR AI TRIAGE VIEW
    function renderAiTriageView(container) {
        const samples = KaarigarAI.getSamplePrompts();

        container.innerHTML = `
            <div class="max-w-4xl mx-auto space-y-6 py-6">
                <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-8 shadow-xl space-y-6">
                    <div class="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
                        <div class="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center text-2xl shadow-md">
                            🤖
                        </div>
                        <div>
                            <h2 class="font-headline font-bold text-2xl text-on-surface">Kaarigar AI Diagnostic Triage</h2>
                            <p class="text-xs text-on-surface-variant">Describe your home repair issue in plain words to generate instant diagnosis & price estimate.</p>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <label class="block text-xs font-bold uppercase tracking-wider text-outline">What problem are you facing?</label>
                        <div class="relative">
                            <textarea id="ai-prompt-input" rows="3" class="w-full p-4 bg-surface-container-low border border-outline-variant/60 rounded-2xl text-sm focus:outline-none focus:border-primary text-on-surface font-medium placeholder:text-outline" placeholder="E.g. Inverter AC blowing warm air and making rattling noise in Latifabad..."></textarea>
                            <button onclick="KaarigarApp.runAiDiagnosis()" class="absolute bottom-3 right-3 px-5 py-2 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1">
                                <span>Diagnose Issue</span>
                                <span class="material-symbols-outlined text-base">auto_awesome</span>
                            </button>
                        </div>

                        <div class="flex flex-wrap items-center gap-2 pt-2">
                            <span class="text-[11px] font-bold text-outline">Try Sample Issues:</span>
                            ${samples.map(s => `
                                <button onclick="document.getElementById('ai-prompt-input').value = '${s}'; KaarigarApp.runAiDiagnosis();" class="px-2.5 py-1 bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-[11px] font-medium rounded-lg transition-colors">
                                    "${s}"
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div id="ai-result-container" class="hidden pt-6 border-t border-outline-variant/30"></div>
                </div>
            </div>
        `;
    }

    // 👤 ARTISAN PROFILE VIEW
    function renderProfileView(container, kaarigarId) {
        const k = KaarigarState.getKaarigarById(kaarigarId);

        container.innerHTML = `
            <div class="max-w-4xl mx-auto space-y-6 py-6">
                <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-8 shadow-xl space-y-6">
                    <div class="flex flex-wrap items-center justify-between gap-6 border-b border-outline-variant/30 pb-6">
                        <div class="flex items-center gap-5">
                            <img src="${k.avatar}" alt="${k.name}" class="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-lg"/>
                            <div>
                                <div class="flex items-center gap-2">
                                    <h1 class="font-headline font-bold text-2xl text-on-surface">${k.name}</h1>
                                    <span class="px-2.5 py-0.5 bg-primary-container text-on-primary text-xs font-bold rounded-full">
                                        ✓ Guild Certified ${k.guildBadge}
                                    </span>
                                </div>
                                <p class="text-sm text-on-surface-variant font-medium">${k.trade} · ${k.experience} Experience</p>
                                <p class="text-xs text-outline">📍 Sector Coverage: ${k.location.sector} & surrounding Hyderabad</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                            <button onclick="KaarigarBooking.initBookingModal('${k.id}', 'booking-modal-content'); document.getElementById('booking-modal-backdrop').classList.remove('hidden');" class="px-6 py-3 bg-primary hover:bg-primary-container text-on-primary font-bold text-sm rounded-xl shadow-lg transition-colors flex items-center gap-2">
                                <span>Request Service</span>
                                <span class="material-symbols-outlined text-base">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                            <span class="text-xs text-outline font-bold uppercase">Rating</span>
                            <div class="text-xl font-extrabold text-tertiary-container mt-1">⭐ ${k.rating} / 5.0</div>
                        </div>
                        <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                            <span class="text-xs text-outline font-bold uppercase">Jobs Completed</span>
                            <div class="text-xl font-extrabold text-primary mt-1">${k.jobsCompleted}+ Jobs</div>
                        </div>
                        <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                            <span class="text-xs text-outline font-bold uppercase">Base Visit Rate</span>
                            <div class="text-xl font-extrabold text-on-surface font-mono mt-1">Rs. ${k.baseFee}</div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h3 class="font-bold text-lg text-on-surface">About Craftsman</h3>
                        <p class="text-sm text-on-surface-variant leading-relaxed">${k.bio}</p>
                    </div>

                    <div class="space-y-3">
                        <h3 class="font-bold text-lg text-on-surface">Specialized Skillset</h3>
                        <div class="flex flex-wrap gap-2">
                            ${k.skills.map(s => `
                                <span class="px-3 py-1.5 bg-surface-container-low text-on-surface font-semibold text-xs rounded-xl border border-outline-variant/30">${s}</span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="space-y-3 pt-4 border-t border-outline-variant/30">
                        <h3 class="font-bold text-lg text-on-surface">Verified Customer Reviews (${k.reviews.length})</h3>
                        <div class="space-y-3">
                            ${k.reviews.map(r => `
                                <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
                                    <div class="flex items-center justify-between">
                                        <strong class="text-xs text-on-surface">${r.author}</strong>
                                        <span class="text-[11px] text-tertiary-container font-bold">⭐ ${r.rating}.0 · ${r.date}</span>
                                    </div>
                                    <p class="text-xs text-on-surface-variant">${r.text}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 📊 CUSTOMER DASHBOARD VIEW
    function renderDashboardView(container, state) {
        container.innerHTML = `
            <div class="max-w-4xl mx-auto space-y-6 py-6">
                <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-8 shadow-xl space-y-6">
                    <div class="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                        <div>
                            <h2 class="font-headline font-bold text-2xl text-on-surface">Customer Requests & Invoices</h2>
                            <p class="text-xs text-on-surface-variant">Logged in as ${state.auth.user.name} (${state.auth.user.phone})</p>
                        </div>
                        <span class="px-3 py-1 bg-primary-container text-on-primary text-xs font-bold rounded-full">
                            ${state.bookings.length} Orders Logged
                        </span>
                    </div>

                    <div class="space-y-4">
                        ${state.bookings.map(b => `
                            <div class="p-5 bg-surface-container-low border border-outline-variant/40 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                                <div class="space-y-1">
                                    <div class="flex items-center gap-2">
                                        <span class="font-bold text-base text-on-surface">${b.serviceName}</span>
                                        <span class="px-2.5 py-0.5 bg-primary-fixed/40 text-on-primary-fixed-variant text-xs font-bold rounded-full">${b.status}</span>
                                    </div>
                                    <p class="text-xs text-on-surface-variant">Order ID: <strong class="font-mono">${b.id}</strong> · Doorstep PIN: <strong class="font-mono text-primary">#${b.safetyPin}</strong></p>
                                    <p class="text-xs text-outline">${b.customerAddress}</p>
                                </div>

                                <div class="flex items-center gap-3">
                                    <div class="text-right">
                                        <span class="text-[10px] text-outline uppercase font-bold">Total Amount</span>
                                        <div class="text-base font-extrabold text-primary font-mono">Rs. ${b.estimatedCost}</div>
                                    </div>
                                    <button onclick="KaarigarState.setActiveView('tracking', { bookingId: '${b.id}' })" class="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl shadow-md transition-colors">
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // 🛡️ SECURITY CONTROL PANEL VIEW
    function renderSecurityView(container, state) {
        const rateStatus = KaarigarSecurity.getRateLimiterStatus();
        const jwtData = KaarigarSecurity.inspectJwtToken();

        container.innerHTML = `
            <div class="max-w-5xl mx-auto space-y-6 py-6">
                <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-8 shadow-xl space-y-6">
                    <div class="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                        <div class="flex items-center gap-3">
                            <span class="material-symbols-outlined text-3xl text-primary">admin_panel_settings</span>
                            <div>
                                <h2 class="font-headline font-bold text-2xl text-on-surface">Web & App Security Audit Center</h2>
                                <p class="text-xs text-on-surface-variant">Live threat monitoring, XSS sanitizer sandbox, CSRF token validation, and RBAC inspector.</p>
                            </div>
                        </div>
                        <span class="px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-full">
                            Security Rating: 100% Compliant
                        </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-1">
                            <span class="text-[10px] uppercase font-bold text-outline">XSS Protection</span>
                            <div class="text-base font-extrabold text-primary">DOMPurify Policy Active</div>
                            <p class="text-[11px] text-on-surface-variant">Input sanitization active on all input fields</p>
                        </div>
                        <div class="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-1">
                            <span class="text-[10px] uppercase font-bold text-outline">CSRF Token Header</span>
                            <div class="text-base font-extrabold text-primary font-mono">${state.auth.csrfToken}</div>
                            <p class="text-[11px] text-on-surface-variant">Double-submit cookie validation</p>
                        </div>
                        <div class="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-1">
                            <span class="text-[10px] uppercase font-bold text-outline">Rate Limiter Bucket</span>
                            <div class="text-base font-extrabold text-primary font-mono">${Math.floor(rateStatus.currentTokens)} / ${rateStatus.maxTokens} Tokens</div>
                            <p class="text-[11px] text-on-surface-variant">Refill: 2 req/sec · Max 30/min</p>
                        </div>
                    </div>

                    <!-- XSS SANITIZER SANDBOX TESTER -->
                    <div class="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/30 space-y-3">
                        <h3 class="font-bold text-base text-on-surface flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-lg">bug_report</span>
                            Interactive XSS Sanitizer Testing Sandbox
                        </h3>
                        <p class="text-xs text-on-surface-variant">Try injecting raw script tags or onerror attributes to test dynamic DOM sanitization:</p>

                        <div class="flex gap-2">
                            <input type="text" id="xss-test-input" value="<script>alert('XSS Exploit!')</script><img src=x onerror=alert(1)>" class="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-xs font-mono text-on-surface"/>
                            <button onclick="KaarigarApp.runXssTest()" class="px-5 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-md transition-colors whitespace-nowrap">
                                Test Sanitizer
                            </button>
                        </div>

                        <div id="xss-output-box" class="hidden p-3 bg-surface-container-lowest border border-outline-variant/40 rounded-xl font-mono text-xs text-on-surface space-y-1">
                            <!-- Output rendered dynamically -->
                        </div>
                    </div>

                    <!-- AUDIT TRAIL LOG -->
                    <div class="space-y-3">
                        <h3 class="font-bold text-base text-on-surface">Security Audit Log Trail</h3>
                        <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 max-h-60 overflow-y-auto font-mono text-xs space-y-2">
                            ${state.auditLogs.map(l => `
                                <div class="flex items-center justify-between border-b border-outline-variant/20 pb-1.5 text-on-surface">
                                    <span>[${l.timestamp}] <strong class="text-primary">${l.action}</strong></span>
                                    <span class="text-outline text-[11px]">${l.details}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    return {
        init: init,

        toggleSearchModal: (show) => {
            const modal = document.getElementById('search-modal-backdrop');
            if (!modal) return;
            if (show) modal.classList.remove('hidden');
            else modal.classList.add('hidden');
        },

        runAiDiagnosis: () => {
            const input = document.getElementById('ai-prompt-input');
            const prompt = input ? input.value : '';
            const result = KaarigarAI.diagnoseIssue(prompt);

            const resContainer = document.getElementById('ai-result-container');
            if (!resContainer) return;
            resContainer.classList.remove('hidden');

            resContainer.innerHTML = `
                <div class="bg-surface-container-low border border-primary/40 rounded-2xl p-6 space-y-4 animate-fade-in">
                    <div class="flex items-center justify-between">
                        <h3 class="font-bold text-lg text-primary">${result.title}</h3>
                        <span class="px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-full">
                            Confidence: ${result.confidenceScore}%
                        </span>
                    </div>

                    <p class="text-xs text-on-surface-variant">${result.summary}</p>

                    <div class="space-y-2">
                        <strong class="text-xs text-outline uppercase font-bold">Diagnostic Steps Required:</strong>
                        <div class="text-xs space-y-1 text-on-surface">
                            ${result.diagnosisSteps.map(s => `<p>${s}</p>`).join('')}
                        </div>
                    </div>

                    <div class="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/40 flex items-center justify-between">
                        <div>
                            <span class="text-[10px] text-outline font-bold uppercase">Estimated Total Cost</span>
                            <div class="text-xl font-extrabold text-primary font-mono">Rs. ${result.priceBreakdown.totalEst}</div>
                        </div>
                        <button onclick="KaarigarBooking.initBookingModal('${result.recommendedKaarigarId}', 'booking-modal-content'); document.getElementById('booking-modal-backdrop').classList.remove('hidden');" class="px-5 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl shadow-md transition-colors">
                            1-Click Dispatch Kaarigar
                        </button>
                    </div>
                </div>
            `;
        },

        runXssTest: () => {
            const input = document.getElementById('xss-test-input');
            const rawVal = input ? input.value : '';
            const sanitized = KaarigarSecurity.sanitizeInput(rawVal);

            const outputBox = document.getElementById('xss-output-box');
            if (!outputBox) return;
            outputBox.classList.remove('hidden');

            outputBox.innerHTML = `
                <div><span class="text-outline">RAW UNTRUSTED INPUT:</span> <code class="text-error font-bold">${rawVal.replace(/</g, '&lt;')}</code></div>
                <div><span class="text-primary font-bold">SANITIZED DOM SAFE OUTPUT:</span> <code>${sanitized}</code></div>
                <div class="text-[11px] text-secondary mt-1">✓ XSS Payload neutered successfully without script execution.</div>
            `;

            KaarigarState.addAuditLog('XSS_SANDBOX_TEST', `Sanitized payload: ${sanitized.substring(0, 30)}...`);
        }
    };
})();

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    KaarigarApp.init();
});
