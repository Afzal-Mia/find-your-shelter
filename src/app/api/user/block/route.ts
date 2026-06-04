import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth';

// Block a user by setting isBlocked to true
export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    await dbConnect();
    const authUser = await getAuthUser(request);
    if (!authUser || authUser.role !== 'superAdmin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.isBlocked = true;
    await user.save();

    return NextResponse.json({ message: 'User blocked successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Block user error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
