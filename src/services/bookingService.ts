import { ServiceRequest, RequestStatus } from '../types/database.types';

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: 'KC-89214',
    customer_id: 'cust-101',
    provider_id: 'kaarigar-1',
    kaarigar_name: 'Imran Ali',
    service_name: 'AC Inverter PCB & Gas Diagnostics',
    category: 'ac_repair',
    description: 'Compressor tripping during peak heat in main bedroom',
    customer_name: 'Shahid Mehmood',
    customer_address: 'House 42, Block C, Latifabad Unit 6, Hyderabad',
    customer_phone: '0301-5544332',
    urgency: 'express',
    status: 'on_the_way',
    eta_minutes: 14,
    safety_pin: '8942',
    estimated_cost: 1800,
    payment_method: 'Cash on Service',
    created_at: new Date().toISOString(),
    logs: [
      { time: '13:30', note: 'Request created and NADRA verified' },
      { time: '13:32', note: 'Imran Ali accepted job dispatch' },
      { time: '13:35', note: 'Technician en route on motorbike (ETA 14 mins)' }
    ]
  }
];

export const bookingService = {
  createRequest: async (bookingData: {
    providerId?: string;
    kaarigarName?: string;
    serviceName: string;
    category: string;
    description: string;
    location: string;
    urgency: 'express' | 'today' | 'scheduled';
    estimatedCost: number;
    paymentMethod: string;
  }): Promise<ServiceRequest> => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const newReq: ServiceRequest = {
      id: 'KC-' + Math.floor(10000 + Math.random() * 90000),
      customer_id: 'cust-101',
      provider_id: bookingData.providerId || 'kaarigar-1',
      kaarigar_name: bookingData.kaarigarName || 'Imran Ali',
      service_name: bookingData.serviceName,
      category: bookingData.category,
      description: bookingData.description,
      customer_name: 'Shahid Mehmood',
      customer_address: bookingData.location,
      customer_phone: '0301-5544332',
      urgency: bookingData.urgency,
      status: 'requested',
      eta_minutes: 18,
      safety_pin: pin,
      estimated_cost: bookingData.estimatedCost,
      payment_method: bookingData.paymentMethod,
      created_at: new Date().toISOString(),
      logs: [
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Order created & verified' },
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Dispatched to nearest technician' }
      ]
    };
    mockServiceRequests.unshift(newReq);
    return newReq;
  },

  getRequestsByCustomer: async (): Promise<ServiceRequest[]> => {
    return mockServiceRequests;
  },

  updateStatus: async (requestId: string, newStatus: RequestStatus): Promise<ServiceRequest | null> => {
    const req = mockServiceRequests.find(r => r.id === requestId);
    if (req) {
      req.status = newStatus;
      req.logs.push({
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        note: `Status updated to ${newStatus}`
      });
    }
    return req || null;
  }
};
