import { z } from 'zod';

export const createReviewSchema = z.object({
  propertyId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid property ID'),
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, 'Comment is required').trim(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
