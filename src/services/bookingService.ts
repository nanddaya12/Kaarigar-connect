import { ServiceRequest, RequestStatus } from '../types/database.types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

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
  createRequest: async (bookingData: any): Promise<ServiceRequest> => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const serviceName = bookingData.service_title || bookingData.serviceName || 'General Repair';
    const cost = bookingData.budget || bookingData.estimatedCost || 1500;
    const address = bookingData.location_address || bookingData.location || 'Latifabad Unit 6';
    const payment = bookingData.payment_method || bookingData.paymentMethod || 'cod';

    const newReq: ServiceRequest = {
      id: 'KC-' + Math.floor(10000 + Math.random() * 90000),
      customer_id: 'cust-101',
      provider_id: bookingData.provider_id || bookingData.providerId || 'kaarigar-1',
      kaarigar_name: bookingData.kaarigarName || 'Imran Ali',
      service_name: serviceName,
      category: bookingData.category || 'electrical',
      description: bookingData.problem_description || bookingData.description || 'Doorstep maintenance',
      customer_name: 'Shahid Mehmood',
      customer_address: address,
      customer_phone: '0301-5544332',
      urgency: bookingData.urgency || 'express',
      status: 'requested',
      eta_minutes: 18,
      safety_pin: pin,
      estimated_cost: cost,
      payment_method: payment,
      created_at: new Date().toISOString(),
      logs: [
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Order created & verified' },
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Dispatched to nearest technician' }
      ]
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('service_requests').insert([
          {
            id: newReq.id,
            customer_id: newReq.customer_id,
            provider_id: newReq.provider_id,
            service_name: newReq.service_name,
            status: newReq.status,
            estimated_cost: newReq.estimated_cost,
            safety_pin: newReq.safety_pin,
            customer_address: newReq.customer_address
          }
        ]);
      } catch (err) {
        console.warn('Supabase insert error, saved locally:', err);
      }
    }

    mockServiceRequests.unshift(newReq);
    return newReq;
  },

  getRequestsByCustomer: async (): Promise<ServiceRequest[]> => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('service_requests').select('*');
        if (!error && data && data.length > 0) return data as any;
      } catch (err) {
        console.warn('Supabase get requests error, returning mock:', err);
      }
    }
    return mockServiceRequests;
  },

  updateStatus: async (requestId: string, newStatus: RequestStatus): Promise<ServiceRequest | null> => {
    const req = mockServiceRequests.find((r) => r.id === requestId);
    if (req) {
      req.status = newStatus;
      req.logs.push({
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        note: `Status updated to ${newStatus}`
      });
    }

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('service_requests').update({ status: newStatus }).eq('id', requestId);
      } catch (err) {
        console.warn('Supabase update status error:', err);
      }
    }

    return req || null;
  }
};
