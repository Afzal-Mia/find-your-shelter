import { z } from 'zod';

export const signUpSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(50, { message: 'Name must be less than 50 characters long' })
        .trim(),
    email: z
        .string()
        .email({ message: 'Please enter a valid email address' })
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const signInSchema = z.object({
    email: z
        .string()
        .email({ message: 'Please enter a valid email address' })
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(1, { message: 'Password is required' }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
