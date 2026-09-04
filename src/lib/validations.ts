import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  fullName: z.string().min(3, 'Full legal name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^((\+92)|(0092)|0)?3[0-9]{9}$/, 'Valid 11-digit Pakistani phone number required (e.g. 0300-1234567)'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['customer', 'provider']),
});

export const providerOnboardingSchema = z.object({
  fullName: z.string().min(3, 'Full legal name must be at least 3 characters (e.g. Dayanand Sharma / Imran Ali)'),
  phone: z.string().regex(/^((\+92)|(0092)|0)?3[0-9]{9}$/, 'Valid 11-digit Pakistani mobile number required (e.g. 0300-1234567)'),
  cnic: z.string().regex(/^[0-9]{13}$/, 'Valid 13-digit CNIC number required (e.g. 41304-1234567-1)'),
  profession: z.string().min(2, 'Please select your primary trade profession'),
  startingPrice: z.coerce.number().min(100, 'Starting inspection fee must be at least Rs. 100'),
  serviceDescription: z.string().min(10, 'Specialty description must be at least 10 characters long'),
  cnicUploaded: z.boolean().refine((val) => val === true, {
    message: 'Please confirm CNIC document upload for NADRA/Guild verification',
  }),
});

export const bookingSchema = z.object({
  description: z.string().min(10, 'Please describe the problem in at least 10 characters'),
  location: z.string().min(5, 'Please provide a valid doorstep street & house address'),
  preferredDate: z.string().min(1, 'Please select a preferred schedule date'),
  paymentMethod: z.enum(['cod', 'easypaisa', 'jazzcash'], {
    invalid_type_error: 'Select a valid payment method',
  }),
});
