import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import Invite from '@/models/Invite';
import { signUpSchema } from '@/app/api/auth/auth.validation';
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
    const result = signUpSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: result.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Connect to database
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Verify invitation exists and is pending
    const invite = await Invite.findOne({ email });
    if (!invite) {
      return NextResponse.json(
        { message: 'Only invited user can sign up' },
        { status: 400 }
      );
    }

    if (invite.expiresAt < new Date()) {
      return NextResponse.json(
        { message: 'Invitation has expired' },
        { status: 400 }
      );
    }

    // Hash the password securely
    const hashedPassword = await bcryptjs.hash(password, 12);

    // Save user to database using Mongoose Model
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // Mark invitation as completed
    await Invite.updateOne({ _id: invite._id }, { status: 'completed' });

    const userObj = newUser.toJSON();

    // Generate access and refresh tokens
    const accessToken = generateAccessToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
    const refreshToken = generateRefreshToken({ id: newUser.id });

    // Store the refresh token in database
    await storeRefreshToken(newUser.id, refreshToken);

    const response = NextResponse.json(
      {
        message: 'User registered successfully',
        user: userObj,
        accessToken,
        refreshToken,
      },
      { status: 201 }
    );

    // Set tokens as HTTP-Only Cookies for additional security
    setAuthCookies(response, accessToken, refreshToken);

    return response;
  } catch (error: any) {
    console.error('Sign-up error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}

