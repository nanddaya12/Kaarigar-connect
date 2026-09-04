/**
 * KaarigarConnect - Real-Time GPS Tracking & Safety Verification Engine
 * Simulates real-time status updates (Dispatched -> En Route -> Arrived -> In Progress -> Completed),
 * doorstep Safety PIN verification (#8942), animated technician location map, and emergency SOS alerts.
 */

window.KaarigarTracking = (function () {
    let timerInterval = null;

    return {
        renderTrackingView: (containerId) => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const booking = KaarigarState.getActiveBooking();
            const kaarigar = KaarigarState.getKaarigarById(booking.kaarigarId);

            const steps = [
                { key: 'DISPATCHED', label: 'Dispatched', icon: 'assignment_turned_in' },
                { key: 'EN_ROUTE', label: 'En Route', icon: 'two_wheeler' },
                { key: 'ARRIVED', label: 'At Doorstep', icon: 'sensor_door' },
                { key: 'IN_PROGRESS', label: 'In Progress', icon: 'build' },
                { key: 'COMPLETED', label: 'Completed', icon: 'verified' }
            ];

            const currentIdx = steps.findIndex(s => s.key === booking.status);

            container.innerHTML = `
                <div class="max-w-4xl mx-auto space-y-6">
                    <!-- Tracking Header Alert Banner -->
                    <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-primary text-xs font-bold mb-2">
                                <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                                LIVE DISPATCH TRACKER · ORDER ${booking.id}
                            </div>
                            <h2 class="font-bold text-xl text-on-surface">${booking.serviceName}</h2>
                            <p class="text-xs text-on-surface-variant">${booking.customerAddress}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <a href="tel:${kaarigar.phone}" class="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-md">
                                <span class="material-symbols-outlined text-base">call</span>
                                Call ${kaarigar.name}
                            </a>
                            <button onclick="KaarigarTracking.triggerSosAlert('${booking.id}')" class="px-3 py-2 bg-error-container text-on-error-container hover:bg-error hover:text-on-error font-bold text-xs rounded-xl transition-colors flex items-center gap-1">
                                <span class="material-symbols-outlined text-base">sos</span>
                                Emergency SOS
                            </button>
                        </div>
                    </div>

                    <!-- Progress Status Timeline Cards -->
                    <div class="grid grid-cols-5 gap-2 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm text-center">
                        ${steps.map((s, idx) => {
                            const isDone = idx <= currentIdx;
                            const isCurrent = idx === currentIdx;
                            return `
                                <div class="flex flex-col items-center gap-1 ${isCurrent ? 'scale-105' : ''}">
                                    <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${isDone ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-high text-outline'}">
                                        <span class="material-symbols-outlined text-lg">${s.icon}</span>
                                    </div>
                                    <span class="text-[11px] font-bold ${isDone ? 'text-primary' : 'text-outline'}">${s.label}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    <!-- Main Grid: Live Map + Technician Card & Safety PIN -->
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <!-- Simulated Animated Live GPS Map -->
                        <div class="lg:col-span-7 bg-[#1a2636] h-[380px] rounded-2xl relative overflow-hidden shadow-inner border border-outline-variant/30 flex flex-col justify-between p-4">
                            <div class="absolute inset-0 bg-[radial-gradient(#2d3d54_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
                            
                            <!-- Animated Motorbike Route Marker -->
                            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                                <div class="px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                    <span class="material-symbols-outlined text-xs">two_wheeler</span>
                                    ${kaarigar.name} (${booking.etaMinutes} Mins)
                                </div>
                                <div class="w-3 h-3 bg-primary transform rotate-45 -mt-1"></div>
                            </div>

                            <div class="relative z-10 flex justify-between items-start">
                                <span class="px-3 py-1 bg-surface-container-lowest/90 text-on-surface text-xs font-bold rounded-lg backdrop-blur-xs">
                                    Sector: Latifabad Unit 6
                                </span>
                                <span class="px-3 py-1 bg-surface-container-lowest/90 text-primary text-xs font-bold rounded-lg backdrop-blur-xs">
                                    GPS Signal: Strong
                                </span>
                            </div>

                            <div class="relative z-10 bg-surface-container-lowest/90 backdrop-blur-md p-3 rounded-xl flex items-center justify-between text-xs text-on-surface">
                                <span>Estimated Arrival: <strong class="text-primary font-bold">${booking.etaMinutes} Mins</strong></span>
                                <span class="text-outline">Live Telemetry Synchronized</span>
                            </div>
                        </div>

                        <!-- Doorstep Safety PIN Verification & Technician Card -->
                        <div class="lg:col-span-5 space-y-4">
                            <!-- DOORSTEP SAFETY PIN CARD -->
                            <div class="bg-primary-container text-on-primary p-6 rounded-2xl shadow-xl space-y-3 relative overflow-hidden">
                                <div class="flex items-center justify-between">
                                    <span class="text-xs uppercase tracking-wider font-semibold opacity-90">Doorstep Safety Verification</span>
                                    <span class="material-symbols-outlined text-xl">shield_lock</span>
                                </div>
                                <div>
                                    <p class="text-xs opacity-80">Show this PIN to technician before granting entry:</p>
                                    <div class="text-4xl font-mono font-extrabold tracking-widest mt-1 bg-surface-container-lowest/20 py-2 px-4 rounded-xl text-center shadow-inner">
                                        #${booking.safetyPin}
                                    </div>
                                </div>
                                <p class="text-[11px] opacity-75">Matches NADRA CNIC Record: ${kaarigar.guildBadge}</p>
                            </div>

                            <!-- Technician Details Summary Card -->
                            <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-5 shadow-sm space-y-3">
                                <div class="flex items-center gap-3">
                                    <img src="${kaarigar.avatar}" class="w-12 h-12 rounded-full object-cover border-2 border-primary"/>
                                    <div>
                                        <h4 class="font-bold text-on-surface text-sm">${kaarigar.name}</h4>
                                        <p class="text-xs text-on-surface-variant">${kaarigar.trade}</p>
                                        <span class="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full mt-1">
                                            ✓ Sindh Guild Badge ${kaarigar.guildBadge}
                                        </span>
                                    </div>
                                </div>

                                <div class="pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
                                    <span>Payment Method:</span>
                                    <strong class="text-on-surface">${booking.paymentMethod}</strong>
                                </div>
                                <div class="flex items-center justify-between text-xs text-on-surface-variant">
                                    <span>Total Payable:</span>
                                    <strong class="text-primary font-mono text-sm">Rs. ${booking.estimatedCost}</strong>
                                </div>

                                <!-- Status Simulator Trigger Buttons (For Interactive Demo) -->
                                <div class="pt-3 border-t border-outline-variant/30 space-y-1">
                                    <label class="block text-[10px] font-bold text-outline uppercase">Demo Status Simulator</label>
                                    <div class="flex flex-wrap gap-1">
                                        <button onclick="KaarigarState.updateBookingStatus('${booking.id}', 'EN_ROUTE', 'Technician is en route'); KaarigarTracking.renderTrackingView('${containerId}');" class="px-2 py-1 bg-surface-container-low hover:bg-surface-container text-on-surface text-[10px] font-bold rounded">En Route</button>
                                        <button onclick="KaarigarState.updateBookingStatus('${booking.id}', 'ARRIVED', 'Technician arrived at doorstep'); KaarigarTracking.renderTrackingView('${containerId}');" class="px-2 py-1 bg-surface-container-low hover:bg-surface-container text-on-surface text-[10px] font-bold rounded">Arrived</button>
                                        <button onclick="KaarigarState.updateBookingStatus('${booking.id}', 'IN_PROGRESS', 'Repair work started'); KaarigarTracking.renderTrackingView('${containerId}');" class="px-2 py-1 bg-surface-container-low hover:bg-surface-container text-on-surface text-[10px] font-bold rounded">Work Started</button>
                                        <button onclick="KaarigarState.updateBookingStatus('${booking.id}', 'COMPLETED', 'Job completed and paid'); KaarigarTracking.renderTrackingView('${containerId}');" class="px-2 py-1 bg-primary text-on-primary text-[10px] font-bold rounded">Completed</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        triggerSosAlert: (bookingId) => {
            alert(`🚨 EMERGENCY SOS DISPATCHED FOR ORDER ${bookingId}!\nSaddar Police Division & Sindh Guild Rapid Response Team Notified.`);
            KaarigarState.addAuditLog('SOS_ALERT_TRIGGERED', `Emergency SOS pressed for booking ${bookingId}`);
        }
    };
})();
