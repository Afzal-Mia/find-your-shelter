import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Invite from '@/models/Invite';
import { getAuthUser } from '@/lib/auth'; // helper returning decoded JWT payload

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const authUser = await getAuthUser(request);
    if (!authUser || authUser.role !== 'superAdmin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }


    // Find the invite first to check its status
    const invite = await Invite.findOne({ email });
    if (!invite) {
      return NextResponse.json({ message: 'Invite not found' }, { status: 404 });
    }
    if (invite.status === 'completed') {
      return NextResponse.json({ message: 'Cannot delete a completed invite' }, { status: 400 });
    }
    // Delete the invite since it's not completed
    await Invite.deleteOne({ _id: invite._id });
    return NextResponse.json({ message: 'Invite removed' }, { status: 200 });
  } catch (error: any) {
    console.error('Remove invite error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
