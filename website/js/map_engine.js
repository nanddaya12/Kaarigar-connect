/**
 * KaarigarConnect - Interactive Directory Map Engine
 * Renders interactive grid map of Hyderabad sectors (Latifabad, Qasimabad, Saddar, Auto Bhan, Citizen Colony)
 * with pinpointed worker location cards, distance calculations, filter drawers, and quick booking triggers.
 */

window.KaarigarMap = (function () {
    let currentMapContainer = null;
    let selectedMarkerId = null;

    const sectorsMapData = [
        { name: 'Latifabad Unit 6', code: 'LAT-6', lat: 25.3670, lng: 68.3680, xPercent: 55, yPercent: 65 },
        { name: 'Latifabad Unit 2 & 3', code: 'LAT-2', lat: 25.3720, lng: 68.3620, xPercent: 48, yPercent: 58 },
        { name: 'Qasimabad Phase 1', code: 'QAS-1', lat: 25.3920, lng: 68.3410, xPercent: 30, yPercent: 35 },
        { name: 'Qasimabad Phase 2', code: 'QAS-2', lat: 25.4010, lng: 68.3380, xPercent: 25, yPercent: 25 },
        { name: 'Auto Bhan Road Corridor', code: 'AB-RD', lat: 25.3750, lng: 68.3500, xPercent: 42, yPercent: 48 },
        { name: 'Saddar Bazaar & Cantt', code: 'SAD-C', lat: 25.3980, lng: 68.3560, xPercent: 58, yPercent: 30 },
        { name: 'Citizen Colony & Wadhu Wah', code: 'CIT-C', lat: 25.3850, lng: 68.3480, xPercent: 38, yPercent: 42 }
    ];

    return {
        renderMap: (containerId, onMarkerClickCallback) => {
            const container = document.getElementById(containerId);
            if (!container) return;
            currentMapContainer = container;

            const state = KaarigarState.getState();
            const kaarigars = KaarigarState.getFilteredKaarigars();

            container.innerHTML = `
                <div class="relative w-full h-[520px] bg-[#1a2636] rounded-2xl overflow-hidden shadow-inner border border-outline-variant/30 select-none">
                    <!-- Map Background Tiles Grid Simulation -->
                    <div class="absolute inset-0 bg-[radial-gradient(#2d3d54_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
                    <div class="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0d5c46_1px,transparent_1px),linear-gradient(to_bottom,#0d5c46_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

                    <!-- Sector Boundaries & Roads Lines -->
                    <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-40 stroke-primary/50" fill="none" stroke-width="2">
                        <!-- Main Auto Bhan Arterial Road -->
                        <path d="M 100 450 Q 300 250 800 100" stroke="#0d5c46" stroke-dasharray="6,6" stroke-width="3"/>
                        <!-- Indus River Ribbon Curve -->
                        <path d="M 50 500 Q 150 200 200 50" stroke="#006a63" stroke-width="6" opacity="0.6"/>
                    </svg>

                    <!-- Map Overlay Header Controls -->
                    <div class="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest/90 backdrop-blur-md p-3 rounded-xl shadow-md border border-outline-variant/40">
                        <div class="flex items-center gap-2">
                            <span class="material-symbols-outlined text-primary text-[20px]">explore</span>
                            <span class="font-label-lg font-bold text-on-surface text-sm">Hyderabad Sector Map</span>
                            <span class="px-2 py-0.5 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant text-[11px] font-semibold">${kaarigars.length} Kaarigars Pinpointed</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <button id="map-recenter-btn" class="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors">
                                <span class="material-symbols-outlined text-[16px] text-primary">my_location</span>
                                Recenter Latifabad
                            </button>
                        </div>
                    </div>

                    <!-- Sector Region Labels -->
                    ${sectorsMapData.map(s => `
                        <div class="absolute z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" style="left: ${s.xPercent}%; top: ${s.yPercent}%;">
                            <span class="px-2 py-1 bg-surface-container-lowest/80 text-on-surface-variant rounded text-[10px] font-semibold border border-outline-variant/30 backdrop-blur-xs tracking-wide">
                                ${s.name}
                            </span>
                        </div>
                    `).join('')}

                    <!-- Kaarigar Interactive Map Pin Markers -->
                    <div id="map-markers-layer" class="absolute inset-0 z-20">
                        ${kaarigars.map((k, index) => {
                            // Assign map position based on index & sector
                            const sector = sectorsMapData[index % sectorsMapData.length];
                            const offsetX = (index % 3 - 1) * 8;
                            const offsetY = (Math.floor(index / 2) % 2 - 0.5) * 10;
                            const posX = Math.max(15, Math.min(85, sector.xPercent + offsetX));
                            const posY = Math.max(15, Math.min(85, sector.yPercent + offsetY));

                            return `
                                <div class="kaarigar-marker absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform hover:scale-125 z-30" 
                                     style="left: ${posX}%; top: ${posY}%;" 
                                     data-id="${k.id}">
                                    <div class="relative flex flex-col items-center group">
                                        <!-- Hover Mini Tooltip -->
                                        <div class="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center bg-surface-container-lowest text-on-surface p-2 rounded-lg shadow-xl border border-outline-variant/40 min-w-[140px] z-50">
                                            <p class="font-bold text-xs leading-tight text-primary">${k.name}</p>
                                            <p class="text-[10px] text-on-surface-variant truncate">${k.trade}</p>
                                            <span class="mt-1 px-1.5 py-0.5 bg-primary-container text-on-primary text-[9px] font-bold rounded">Rs. ${k.baseFee} Base</span>
                                        </div>

                                        <!-- Marker Avatar Ring Pin -->
                                        <div class="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-lowest p-0.5 shadow-lg relative flex items-center justify-center">
                                            <img src="${k.avatar}" alt="${k.name}" class="w-full h-full rounded-full object-cover"/>
                                            <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-primary text-on-primary rounded-full flex items-center justify-center text-[9px] font-bold">✓</span>
                                        </div>
                                        <div class="w-2 h-2 bg-primary transform rotate-45 -mt-1 shadow-md"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <!-- Map Footer Legend -->
                    <div class="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-4 py-2 bg-surface-container-lowest/90 backdrop-blur-md rounded-xl text-xs text-on-surface-variant border border-outline-variant/30">
                        <div class="flex items-center gap-4">
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-primary"></span> NADRA Verified Kaarigar</span>
                            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Urgent Triage Dispatch</span>
                        </div>
                        <span class="font-mono text-[11px] text-outline">HYD-GPS-REF: 25.3960° N, 68.3578° E</span>
                    </div>
                </div>
            `;

            // Bind click events on markers
            const markers = container.querySelectorAll('.kaarigar-marker');
            markers.forEach(m => {
                m.addEventListener('click', (e) => {
                    const id = m.getAttribute('data-id');
                    selectedMarkerId = id;
                    if (onMarkerClickCallback) onMarkerClickCallback(id);
                });
            });

            // Bind recenter button
            const recenterBtn = container.querySelector('#map-recenter-btn');
            if (recenterBtn) {
                recenterBtn.addEventListener('click', () => {
                    KaarigarState.setLocality('Latifabad Unit 6');
                });
            }
        }
    };
})();
