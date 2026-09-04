/**
 * KaarigarConnect - Kaarigar Provider Dispatch & Console Engine
 * Dedicated control center for skilled technicians to manage incoming jobs,
 * toggle online/offline dispatch state, view daily earnings, and accept doorstep service requests.
 */

window.KaarigarProvider = (function () {
    let isOnline = true;
    let todayEarnings = 4200;

    return {
        renderProviderConsole: (containerId) => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const state = KaarigarState.getState();
            const currentProvider = state.kaarigars[0]; // Imran Ali
            const pendingJobs = state.bookings.filter(b => b.status === 'DISPATCHED' || b.status === 'EN_ROUTE');

            container.innerHTML = `
                <div class="max-w-5xl mx-auto space-y-6">
                    <!-- Provider Header Banner -->
                    <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <img src="${currentProvider.avatar}" class="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-md"/>
                            <div>
                                <div class="flex items-center gap-2">
                                    <h2 class="font-bold text-xl text-on-surface">${currentProvider.name}</h2>
                                    <span class="px-2 py-0.5 bg-primary-container text-on-primary text-xs font-bold rounded-full">
                                        ✓ Sindh Guild ${currentProvider.guildBadge}
                                    </span>
                                </div>
                                <p class="text-xs text-on-surface-variant">${currentProvider.trade} · ${currentProvider.location.sector}</p>
                            </div>
                        </div>

                        <!-- Online Status Toggle & Quick Stats -->
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <span class="text-[10px] uppercase font-bold text-outline">Today's Earnings</span>
                                <div class="text-xl font-bold text-primary font-mono">Rs. ${todayEarnings}</div>
                            </div>
                            <button id="provider-online-toggle" onclick="KaarigarProvider.toggleOnlineStatus('${containerId}')" class="px-5 py-2.5 rounded-xl font-bold text-xs shadow-md flex items-center gap-2 transition-all ${isOnline ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}">
                                <span class="w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-400 animate-ping' : 'bg-gray-400'}"></span>
                                ${isOnline ? 'ONLINE - RECEIVING DISPATCHES' : 'OFFLINE - PAUSED'}
                            </button>
                        </div>
                    </div>

                    <!-- Provider Telemetry Cards Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm">
                            <span class="text-xs font-bold text-outline uppercase">Jobs Completed Today</span>
                            <div class="text-2xl font-extrabold text-on-surface mt-1">4 Jobs</div>
                        </div>
                        <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm">
                            <span class="text-xs font-bold text-outline uppercase">Average Client Rating</span>
                            <div class="text-2xl font-extrabold text-tertiary-container mt-1">⭐ 4.9 / 5.0</div>
                        </div>
                        <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm">
                            <span class="text-xs font-bold text-outline uppercase">Acceptance Rate</span>
                            <div class="text-2xl font-extrabold text-primary mt-1">98.5%</div>
                        </div>
                        <div class="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm">
                            <span class="text-xs font-bold text-outline uppercase">Guild Trust Score</span>
                            <div class="text-2xl font-extrabold text-secondary mt-1">Tier 1 Master</div>
                        </div>
                    </div>

                    <!-- Incoming Dispatch Offers Queue -->
                    <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-md space-y-4">
                        <div class="flex items-center justify-between border-b border-outline-variant/30 pb-3">
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-primary text-xl">notifications_active</span>
                                <h3 class="font-bold text-lg text-on-surface">Incoming Job Dispatches</h3>
                                <span class="px-2.5 py-0.5 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant text-xs font-bold">${pendingJobs.length} Available</span>
                            </div>
                            <span class="text-xs text-outline font-mono">Auto-Refresh Active</span>
                        </div>

                        ${pendingJobs.length > 0 ? `
                            <div class="space-y-3">
                                ${pendingJobs.map(job => `
                                    <div class="p-4 bg-surface-container-low border border-outline-variant/40 rounded-xl flex flex-wrap items-center justify-between gap-4">
                                        <div class="space-y-1">
                                            <div class="flex items-center gap-2">
                                                <span class="font-bold text-sm text-on-surface">${job.serviceName}</span>
                                                <span class="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold rounded">${job.urgency}</span>
                                            </div>
                                            <p class="text-xs text-on-surface-variant">📍 ${job.customerAddress}</p>
                                            <p class="text-xs text-outline">Client: ${job.customerName} (${job.customerPhone})</p>
                                        </div>

                                        <div class="flex items-center gap-3">
                                            <div class="text-right">
                                                <span class="text-[10px] text-outline uppercase font-bold">Estimated Payout</span>
                                                <div class="text-base font-extrabold text-primary font-mono">Rs. ${job.estimatedCost}</div>
                                            </div>
                                            <button onclick="KaarigarProvider.acceptJob('${job.id}', '${containerId}')" class="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl shadow-md transition-colors">
                                                Accept Job
                                            </button>
                                            <button onclick="KaarigarProvider.declineJob('${job.id}', '${containerId}')" class="px-3 py-2 bg-surface-container-high hover:bg-outline-variant text-on-surface text-xs font-bold rounded-xl transition-colors">
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <div class="py-8 text-center text-on-surface-variant space-y-2">
                                <span class="material-symbols-outlined text-3xl text-outline">done_all</span>
                                <p class="text-sm font-semibold">No pending job dispatches right now.</p>
                                <p class="text-xs text-outline">Stay online to receive instant job alerts in Latifabad and Qasimabad.</p>
                            </div>
                        `}
                    </div>
                </div>
            `;
        },

        toggleOnlineStatus: (containerId) => {
            isOnline = !isOnline;
            KaarigarState.addAuditLog('PROVIDER_ONLINE_TOGGLE', `Provider online status toggled to ${isOnline}`);
            KaarigarProvider.renderProviderConsole(containerId);
        },

        acceptJob: (jobId, containerId) => {
            KaarigarState.updateBookingStatus(jobId, 'EN_ROUTE', 'Job accepted by technician Imran Ali');
            todayEarnings += 1800;
            alert(`✅ Job ${jobId} accepted! Navigation details dispatched to your mobile map.`);
            KaarigarProvider.renderProviderConsole(containerId);
        },

        declineJob: (jobId, containerId) => {
            KaarigarState.addAuditLog('JOB_DECLINED', `Provider declined job ${jobId}`);
            KaarigarProvider.renderProviderConsole(containerId);
        }
    };
})();
