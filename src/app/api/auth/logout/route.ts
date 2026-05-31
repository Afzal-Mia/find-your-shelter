import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import RefreshToken from '@/models/RefreshToken';
import { clearAuthCookies } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('refreshToken')?.value;

    if (token) {
      // Connect to database and delete the token
      await dbConnect();
      await RefreshToken.deleteOne({ token });
    }

    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    // Clear the HTTP-Only cookies
    clearAuthCookies(response);

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
