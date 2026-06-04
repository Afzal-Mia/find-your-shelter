import { z } from 'zod';

export const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim().toLowerCase(),
});

export type InviteInput = z.infer<typeof inviteSchema>;
