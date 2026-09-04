/**
 * KaarigarConnect - Interactive Booking Flow Engine
 * Manages the 4-step wizard for placing local service dispatch orders:
 * 1. Problem Description & Photo Upload
 * 2. Sector Locality & Urgency Level
 * 3. Time Slot & Kaarigar Match
 * 4. Transparent PKR Pricing & Payment Confirmation
 */

window.KaarigarBooking = (function () {
    let currentStep = 1;
    let bookingDraft = {
        kaarigarId: 'kaarigar-1',
        serviceName: 'AC Inverter PCB & Gas Diagnostics',
        category: 'ac_repair',
        address: 'House 42, Block C, Latifabad Unit 6, Hyderabad',
        urgency: 'Express (< 45 mins)',
        timeSlot: 'Immediate Dispatch',
        notes: '',
        uploadedPhoto: null,
        paymentMethod: 'Cash on Service',
        estimatedCost: 1800
    };

    return {
        initBookingModal: (kaarigarId, containerId) => {
            const kaarigar = KaarigarState.getKaarigarById(kaarigarId);
            bookingDraft.kaarigarId = kaarigar.id;
            bookingDraft.serviceName = `${kaarigar.trade} - Inspection & Diagnostic`;
            bookingDraft.estimatedCost = kaarigar.baseFee + 800;
            currentStep = 1;
            KaarigarBooking.renderStep(containerId);
        },

        renderStep: (containerId) => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const kaarigar = KaarigarState.getKaarigarById(bookingDraft.kaarigarId);
            const state = KaarigarState.getState();

            let stepHtml = '';

            if (currentStep === 1) {
                stepHtml = `
                    <div class="space-y-4">
                        <div class="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                            <img src="${kaarigar.avatar}" class="w-12 h-12 rounded-full object-cover border border-primary/40"/>
                            <div>
                                <h4 class="font-bold text-on-surface text-sm">${kaarigar.name}</h4>
                                <p class="text-xs text-on-surface-variant">${kaarigar.trade} · <span class="text-primary font-semibold">Rs. ${kaarigar.baseFee} Base Fee</span></p>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Describe the Issue</label>
                            <textarea id="booking-notes-input" rows="3" class="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface" placeholder="E.g. Inverter AC compressor making buzzing noise, cooling reduced in main bedroom...">${bookingDraft.notes}</textarea>
                        </div>

                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Attach Photo / Video (Optional)</label>
                            <div class="border-2 border-dashed border-outline-variant/60 rounded-xl p-4 text-center hover:bg-surface-container-low transition-colors cursor-pointer" onclick="document.getElementById('booking-photo-file').click()">
                                <span class="material-symbols-outlined text-primary text-2xl">add_a_photo</span>
                                <p class="text-xs text-on-surface-variant font-medium mt-1">Tap to upload picture of unit / fault area</p>
                                <input type="file" id="booking-photo-file" class="hidden" accept="image/*" onchange="KaarigarBooking.handlePhotoUpload(this)"/>
                            </div>
                            <div id="photo-preview-container" class="mt-2 hidden">
                                <span class="px-2.5 py-1 bg-primary-container text-on-primary text-xs rounded-full inline-flex items-center gap-1">
                                    <span class="material-symbols-outlined text-xs">image</span> Photo attached
                                </span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (currentStep === 2) {
                stepHtml = `
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Service Address (Hyderabad)</label>
                            <input type="text" id="booking-address-input" value="${bookingDraft.address}" class="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface font-medium"/>
                        </div>

                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Dispatch Urgency</label>
                            <div class="grid grid-cols-2 gap-2">
                                <button type="button" class="urgency-option-btn p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${bookingDraft.urgency === 'Express (< 45 mins)' ? 'bg-primary-container/10 border-primary text-primary font-bold' : 'border-outline-variant text-on-surface'}" onclick="KaarigarBooking.setUrgency('Express (< 45 mins)', 200)">
                                    <span class="text-xs uppercase tracking-wider">⚡ Express</span>
                                    <span class="text-sm">&lt; 45 Mins Arrival</span>
                                    <span class="text-[10px] text-tertiary-container font-semibold">+Rs. 200 Priority</span>
                                </button>
                                <button type="button" class="urgency-option-btn p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${bookingDraft.urgency === 'Today Afternoon' ? 'bg-primary-container/10 border-primary text-primary font-bold' : 'border-outline-variant text-on-surface'}" onclick="KaarigarBooking.setUrgency('Today Afternoon', 0)">
                                    <span class="text-xs uppercase tracking-wider">📅 Today Afternoon</span>
                                    <span class="text-sm">Flexible Window</span>
                                    <span class="text-[10px] text-outline font-semibold">Standard Rate</span>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            } else if (currentStep === 3) {
                stepHtml = `
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Select Time Slot</label>
                            <select id="booking-timeslot-select" class="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary text-on-surface font-medium cursor-pointer">
                                <option value="Immediate Dispatch (ETA 18 mins)">Immediate Dispatch (ETA 18 mins)</option>
                                <option value="Today: 4:00 PM - 5:00 PM">Today: 4:00 PM - 5:00 PM</option>
                                <option value="Today: 6:00 PM - 7:00 PM">Today: 6:00 PM - 7:00 PM</option>
                                <option value="Tomorrow Morning 10:00 AM">Tomorrow Morning 10:00 AM</option>
                            </select>
                        </div>

                        <div class="p-3 bg-surface-container-low rounded-xl text-xs space-y-1 text-on-surface-variant">
                            <p class="font-bold text-on-surface">🛡️ Sindh Guild Protection Guarantee</p>
                            <p>All service visits include NADRA identity verification, upfront rate card confirmation, and 7-day labor warranty.</p>
                        </div>
                    </div>
                `;
            } else if (currentStep === 4) {
                stepHtml = `
                    <div class="space-y-4">
                        <div class="p-4 bg-surface-container-lowest border border-outline-variant/60 rounded-xl space-y-2 text-sm">
                            <h4 class="font-bold text-on-surface border-b border-outline-variant/40 pb-2">Price Summary</h4>
                            <div class="flex justify-between text-on-surface-variant text-xs">
                                <span>Base Visit & Inspection Fee</span>
                                <span class="font-mono">Rs. ${kaarigar.baseFee}</span>
                            </div>
                            <div class="flex justify-between text-on-surface-variant text-xs">
                                <span>Labor & Fault Diagnosis</span>
                                <span class="font-mono">Rs. 800</span>
                            </div>
                            <div class="flex justify-between text-on-surface-variant text-xs">
                                <span>Express Priority Fee</span>
                                <span class="font-mono">Rs. ${bookingDraft.urgency.includes('Express') ? 200 : 0}</span>
                            </div>
                            <div class="flex justify-between text-on-surface font-bold pt-2 border-t border-outline-variant/40 text-base">
                                <span>Total Estimated Payable</span>
                                <span class="text-primary font-mono">Rs. ${bookingDraft.estimatedCost}</span>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold uppercase tracking-wider text-outline mb-1">Payment Method</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button type="button" class="p-2.5 rounded-xl border text-center text-xs font-bold ${bookingDraft.paymentMethod === 'Cash on Service' ? 'bg-primary-container/10 border-primary text-primary' : 'border-outline-variant text-on-surface'}" onclick="KaarigarBooking.setPayment('Cash on Service')">
                                    💵 Cash
                                </button>
                                <button type="button" class="p-2.5 rounded-xl border text-center text-xs font-bold ${bookingDraft.paymentMethod === 'JazzCash / EasyPaisa' ? 'bg-primary-container/10 border-primary text-primary' : 'border-outline-variant text-on-surface'}" onclick="KaarigarBooking.setPayment('JazzCash / EasyPaisa')">
                                    📱 JazzCash
                                </button>
                                <button type="button" class="p-2.5 rounded-xl border text-center text-xs font-bold ${bookingDraft.paymentMethod === 'Credit Card' ? 'bg-primary-container/10 border-primary text-primary' : 'border-outline-variant text-on-surface'}" onclick="KaarigarBooking.setPayment('Credit Card')">
                                    💳 Card
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }

            container.innerHTML = `
                <div class="bg-surface-container-lowest rounded-2xl p-5 shadow-2xl max-w-lg mx-auto border border-outline-variant/40">
                    <div class="flex items-center justify-between border-b border-outline-variant/30 pb-3 mb-4">
                        <div>
                            <span class="text-[10px] font-bold text-outline uppercase tracking-wider">Step ${currentStep} of 4</span>
                            <h3 class="font-bold text-lg text-on-surface">Book ${kaarigar.name}</h3>
                        </div>
                        <button onclick="document.getElementById('booking-modal-backdrop').classList.add('hidden')" class="p-1 rounded-full hover:bg-surface-container-low text-outline">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    ${stepHtml}

                    <div class="flex items-center justify-between mt-6 pt-4 border-t border-outline-variant/30">
                        ${currentStep > 1 ? `
                            <button onclick="KaarigarBooking.prevStep('${containerId}')" class="px-4 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs rounded-xl transition-colors">
                                Back
                            </button>
                        ` : '<div></div>'}

                        ${currentStep < 4 ? `
                            <button onclick="KaarigarBooking.nextStep('${containerId}')" class="px-5 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl transition-colors shadow-md">
                                Continue
                            </button>
                        ` : `
                            <button onclick="KaarigarBooking.confirmOrder('${containerId}')" class="px-6 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-bold text-sm rounded-xl transition-colors shadow-lg flex items-center gap-1.5">
                                <span>Confirm & Dispatch</span>
                                <span class="material-symbols-outlined text-base">arrow_forward</span>
                            </button>
                        `}
                    </div>
                </div>
            `;
        },

        nextStep: (containerId) => {
            if (currentStep === 1) {
                const notes = document.getElementById('booking-notes-input');
                if (notes) bookingDraft.notes = KaarigarSecurity.sanitizeInput(notes.value);
            } else if (currentStep === 2) {
                const addr = document.getElementById('booking-address-input');
                if (addr) bookingDraft.address = KaarigarSecurity.sanitizeInput(addr.value);
            }
            if (currentStep < 4) {
                currentStep++;
                KaarigarBooking.renderStep(containerId);
            }
        },

        prevStep: (containerId) => {
            if (currentStep > 1) {
                currentStep--;
                KaarigarBooking.renderStep(containerId);
            }
        },

        setUrgency: (urgencyStr, extraFee) => {
            bookingDraft.urgency = urgencyStr;
            const kaarigar = KaarigarState.getKaarigarById(bookingDraft.kaarigarId);
            bookingDraft.estimatedCost = kaarigar.baseFee + 800 + extraFee;
            KaarigarBooking.renderStep('booking-modal-content');
        },

        setPayment: (methodStr) => {
            bookingDraft.paymentMethod = methodStr;
            KaarigarBooking.renderStep('booking-modal-content');
        },

        handlePhotoUpload: (input) => {
            if (input.files && input.files[0]) {
                bookingDraft.uploadedPhoto = input.files[0].name;
                const prev = document.getElementById('photo-preview-container');
                if (prev) prev.classList.remove('hidden');
            }
        },

        confirmOrder: () => {
            const newBooking = KaarigarState.createBooking(bookingDraft);
            const modalBackdrop = document.getElementById('booking-modal-backdrop');
            if (modalBackdrop) modalBackdrop.classList.add('hidden');
            // Navigate directly to tracking view
            KaarigarState.setActiveView('tracking', { bookingId: newBooking.id });
        }
    };
})();
