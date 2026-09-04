/**
 * KaarigarConnect - Kaarigar AI Diagnostic Triage & Quote Engine
 * Uses intelligent symptom matching to analyze home repair issues,
 * estimate required tools, forecast repair duration, and compute transparent PKR pricing.
 */

window.KaarigarAI = (function () {
    const diagnosticDatabase = [
        {
            keywords: ['ac', 'air conditioner', 'cooling', 'warm air', 'inverter', 'gas', 'pcb', 'leak'],
            category: 'ac_repair',
            title: 'AC Inverter PCB & Refrigerant Pressure Diagnostic',
            severity: 'High (Summer Peak Heat)',
            summary: 'Likely compressor capacitor failure, low R32 gas pressure, or inverter power board voltage fault.',
            diagnosisSteps: [
                '1. Test outdoor unit PCB signal voltage with multimeter.',
                '2. Measure R32 gas pressure gauge (Normal: 120-140 PSI).',
                '3. Inspect indoor blower coil for water condensation block.'
            ],
            toolsNeeded: ['Digital Multimeter', 'R32 Gauge Manifold', 'Leak Sensor Probe', 'Capacitor Tester'],
            estimatedHours: '45 - 60 Mins',
            priceBreakdown: {
                visitFee: 500,
                laborFee: 800,
                partsEst: 950,
                totalEst: 2250
            },
            recommendedKaarigarId: 'kaarigar-2'
        },
        {
            keywords: ['light', 'electric', 'short circuit', 'breaker', 'spark', 'ups', 'wiring', 'switch', 'socket'],
            category: 'electrical',
            title: '3-Phase / UPS Electrical Circuit Short Triage',
            severity: 'Urgent (Fire Risk)',
            summary: 'Circuit overload, neutral wire looseness in main distribution box, or damaged UPS inverter relay.',
            diagnosisSteps: [
                '1. Check main DB box breaker trip condition.',
                '2. Trace live wire continuity and earth resistance.',
                '3. Inspect switchboard contacts for thermal damage.'
            ],
            toolsNeeded: ['Insulated VDE Screwdrivers', 'Clamp Meter', 'Wire Stripper', 'Voltage Detector Pen'],
            estimatedHours: '30 - 45 Mins',
            priceBreakdown: {
                visitFee: 500,
                laborFee: 600,
                partsEst: 400,
                totalEst: 1500
            },
            recommendedKaarigarId: 'kaarigar-1'
        },
        {
            keywords: ['pipe', 'leak', 'water', 'motor', 'pump', 'tap', 'flush', 'basin', 'geyser', 'drain'],
            category: 'plumbing',
            title: 'Water Pressure Motor & Sanitary Line Leak Triage',
            severity: 'Medium (Property Damage Risk)',
            summary: 'Submersible water pump starter capacitor failure, pipe joint pressure seal breach, or valve clog.',
            diagnosisSteps: [
                '1. Inspect water suction line for air suction leak.',
                '2. Verify motor winding resistance and automatic float switch.',
                '3. Test main overhead supply line pressure.'
            ],
            toolsNeeded: ['Pipe Wrench Set', 'Teflon Tape & Seals', 'Pressure Gauge', 'Motor Capacitor'],
            estimatedHours: '30 - 60 Mins',
            priceBreakdown: {
                visitFee: 400,
                laborFee: 700,
                partsEst: 500,
                totalEst: 1600
            },
            recommendedKaarigarId: 'kaarigar-3'
        },
        {
            keywords: ['door', 'lock', 'wood', 'cabinet', 'siding', 'almirah', 'furniture', 'hinge', 'polish'],
            category: 'carpentry',
            title: 'Wooden Door Frame Lock & Cabinet Alignment Triage',
            severity: 'Low',
            summary: 'Door jam due to humidity expansion, worn cylindrical lock mechanism, or misaligned hinges.',
            diagnosisSteps: [
                '1. Check door frame squareness and clearance.',
                '2. Inspect cylinder lock bolt alignment with striker plate.',
                '3. Plane bottom door edge if binding on floor tile.'
            ],
            toolsNeeded: ['Hand Plane', 'Chisel Set', 'Electric Drill', 'Heavy Duty Mortise Lock'],
            estimatedHours: '45 - 90 Mins',
            priceBreakdown: {
                visitFee: 500,
                laborFee: 750,
                partsEst: 650,
                totalEst: 1900
            },
            recommendedKaarigarId: 'kaarigar-5'
        }
    ];

    return {
        diagnoseIssue: (userPrompt) => {
            if (!userPrompt || typeof userPrompt !== 'string') {
                return diagnosticDatabase[0]; // Default fallback
            }

            const cleanPrompt = userPrompt.toLowerCase();
            let bestMatch = diagnosticDatabase[0];
            let maxScore = 0;

            diagnosticDatabase.forEach(item => {
                let score = 0;
                item.keywords.forEach(kw => {
                    if (cleanPrompt.includes(kw)) score += 1;
                });
                if (score > maxScore) {
                    maxScore = score;
                    bestMatch = item;
                }
            });

            return {
                ...bestMatch,
                originalPrompt: userPrompt,
                confidenceScore: maxScore > 0 ? Math.min(98, 75 + maxScore * 8) : 70
            };
        },

        getSamplePrompts: () => [
            'AC unit blowing warm air with rattling sound in Latifabad',
            'Main circuit breaker keeps tripping when UPS turns on',
            'Water motor pump making loud noise but no water in tank',
            'Wooden main entrance door lock stuck and binding'
        ]
    };
})();
