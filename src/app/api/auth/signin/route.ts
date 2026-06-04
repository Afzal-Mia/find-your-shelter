import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { signInSchema } from '@/app/api/auth/auth.validation';
import {
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  setAuthCookies,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const result = signInSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: result.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Connect to database
    await dbConnect();

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (user.isBlocked) {
      return NextResponse.json(
        { message: 'Access Denied' },
        { status: 403 }
      );
    }

    // Verify the password
    if (!user.password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const userObj = user.toJSON();

    // Generate access and refresh tokens
    const accessToken = generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({ id: user.id });

    // Store the refresh token in database
    await storeRefreshToken(user.id, refreshToken);

    // Create the response object
    const response = NextResponse.json(
      {
        message: 'Signed in successfully',
        user: userObj,
        accessToken,
        refreshToken,
      },
      { status: 200 }
    );

    // Set tokens as HTTP-Only Cookies for additional security
    setAuthCookies(response, accessToken, refreshToken);

    return response;
  } catch (error: any) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}

