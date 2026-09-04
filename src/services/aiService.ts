export interface AiDiagnosticResult {
  title: string;
  category: string;
  severity: string;
  summary: string;
  diagnosisSteps: string[];
  toolsNeeded: string[];
  estimatedHours: string;
  priceBreakdown: {
    visitFee: number;
    laborFee: number;
    partsEst: number;
    totalEst: number;
  };
  recommendedKaarigarId: string;
  confidenceScore: number;
}

const diagnosticDatabase: AiDiagnosticResult[] = [
  {
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
    recommendedKaarigarId: 'kaarigar-2',
    confidenceScore: 96
  },
  {
    category: 'electrical',
    title: '3-Phase / UPS Electrical Circuit Short Triage',
    severity: 'Urgent (Fire Risk)',
    summary: 'Circuit overload, neutral wire looseness in main distribution box, or damaged UPS inverter relay.',
    diagnosisSteps: [
      '1. Check main DB box breaker trip condition.',
      '2. Trace live wire continuity and earth resistance.',
      '3. Inspect switchboard contacts for thermal damage.'
    ],
    toolsNeeded: ['Insulated VDE Screwdrivers', 'Clamp Meter', 'Wire Stripper', 'Voltage Pen'],
    estimatedHours: '30 - 45 Mins',
    priceBreakdown: {
      visitFee: 500,
      laborFee: 600,
      partsEst: 400,
      totalEst: 1500
    },
    recommendedKaarigarId: 'kaarigar-1',
    confidenceScore: 94
  },
  {
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
    recommendedKaarigarId: 'kaarigar-3',
    confidenceScore: 92
  }
];

export const aiService = {
  diagnoseProblem: async (userPrompt: string): Promise<AiDiagnosticResult> => {
    if (!userPrompt || userPrompt.trim().length === 0) {
      return diagnosticDatabase[0];
    }

    const cleanPrompt = userPrompt.toLowerCase();
    
    if (cleanPrompt.includes('electric') || cleanPrompt.includes('light') || cleanPrompt.includes('ups') || cleanPrompt.includes('breaker')) {
      return { ...diagnosticDatabase[1], confidenceScore: 95 };
    } else if (cleanPrompt.includes('water') || cleanPrompt.includes('pipe') || cleanPrompt.includes('motor') || cleanPrompt.includes('pump')) {
      return { ...diagnosticDatabase[2], confidenceScore: 93 };
    }

    return { ...diagnosticDatabase[0], confidenceScore: 96 };
  },

  getSamplePrompts: (): string[] => [
    'AC unit blowing warm air with rattling sound in Latifabad',
    'Main circuit breaker keeps tripping when UPS turns on',
    'Water motor pump making loud noise but no water in tank',
    'Wooden main entrance door lock stuck and binding'
  ]
};
