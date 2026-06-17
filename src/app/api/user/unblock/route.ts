import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth';

// Unblock a user by setting isBlocked to false
export async function POST(request: Request) {

  try {
    const authUser = await getAuthUser(request);
    if (!authUser || authUser.role !== 'superAdmin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.isBlocked = false;
    await user.save();

    return NextResponse.json({ message: 'User unblocked successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Unblock user error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
