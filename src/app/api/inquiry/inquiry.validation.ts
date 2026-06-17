import { z } from 'zod';

export const inquiryCreateSchema = z.object({
  propertyId: z.string().optional(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(5, { message: 'Valid phone number is required' }),
  email: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
  message: z.string().min(2, { message: 'Message is required' }),
  status: z.enum(['new', 'contacted', 'closed']).optional(),
});

export const inquiryUpdateSchema = z.object({
  status: z.enum(['new', 'contacted', 'closed']),
});
