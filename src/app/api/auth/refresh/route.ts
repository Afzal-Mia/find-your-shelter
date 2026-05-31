import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import RefreshToken from '@/models/RefreshToken';
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  setAuthCookies,
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // 1. Get refresh token from cookies or request body
    const cookieToken = request.cookies.get('refreshToken')?.value;
    
    let token = cookieToken;

    if (!token) {
      try {
        const body = await request.json();
        token = body.refreshToken;
      } catch (e) {
        // Body might not be present or not JSON; fallback to undefined
      }
    }

    if (!token) {
      return NextResponse.json(
        { message: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // 2. Connect to database
    await dbConnect();

    // 3. Verify JWT signature
    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // 4. Find the refresh token in the database
    const dbToken = await RefreshToken.findOne({ token });
    if (!dbToken) {
      return NextResponse.json(
        { message: 'Refresh token has been revoked or is invalid' },
        { status: 401 }
      );
    }

    // 5. Find the user
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 401 }
      );
    }

    // 6. Delete the old refresh token (Token Rotation)
    await RefreshToken.deleteOne({ _id: dbToken._id });

    // 7. Generate new tokens
    const newAccessToken = generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    const newRefreshToken = generateRefreshToken({ id: user.id });

    // 8. Store new refresh token
    await storeRefreshToken(user.id, newRefreshToken);

    const userObj = user.toJSON();

    const response = NextResponse.json(
      {
        message: 'Token refreshed successfully',
        user: userObj,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
      { status: 200 }
    );

    // 9. Set the cookies with new tokens
    setAuthCookies(response, newAccessToken, newRefreshToken);

    return response;
  } catch (error: any) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}
