import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import RefreshToken from '@/models/RefreshToken';
import { z } from 'zod';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || 'your-fallback-access-secret-key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-fallback-refresh-secret-key';

// ─── Validation Schemas ───────────────────────────────────────────────────────

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

export function generateAccessToken(user: { id: string; name: string; email: string; role: string }) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' } // Short-lived access token
  );
}

export function generateRefreshToken(user: { id: string }) {
  return jwt.sign(
    {
      id: user.id,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // Long-lived refresh token
  );
}

export async function storeRefreshToken(userId: string, token: string) {
  // Calculate expiration (7 days from now)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // We can choose to allow multiple active sessions/tokens per user.
  // Storing each token uniquely lets us do that.
  await RefreshToken.create({
    user: userId,
    token,
    expiresAt,
  });
}

export function setAuthCookies(response: NextResponse, accessToken: string, refreshToken: string) {
  const isProduction = process.env.NODE_ENV === 'production';

  // Set access token cookie
  response.cookies.set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 60 * 15, // 15 minutes
    path: '/',
  });

  // Set refresh token cookie
  response.cookies.set({
    name: 'refreshToken',
    value: refreshToken,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set({
    name: 'accessToken',
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });

  response.cookies.set({
    name: 'refreshToken',
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as { id: string };
  } catch (error) {
    return null;
  }
}
