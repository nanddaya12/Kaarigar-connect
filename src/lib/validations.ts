import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Valid Pakistani phone number required (e.g. 0300-1234567)'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['customer', 'provider']),
});

export const bookingSchema = z.object({
  description: z.string().min(5, 'Please provide issue details'),
  location: z.string().min(3, 'Address is required'),
  urgency: z.enum(['express', 'today', 'scheduled']),
  paymentMethod: z.string().min(1, 'Select a payment method'),
});
