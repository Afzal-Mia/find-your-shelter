import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Invite from '@/models/Invite';
import { getAuthUser } from '@/lib/auth'; // helper returning decoded JWT payload

export async function GET(request: Request) {
  try {
    await dbConnect();
    const authUser = await getAuthUser(request);
    if (!authUser || authUser.role !== 'superAdmin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    // Return paginated non‑expired invites
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const [invites, total] = await Promise.all([
      Invite.find({ expiresAt: { $gt: new Date() } })
        .select('email status expiresAt invitedBy')
        .skip(skip)
        .limit(limit)
        .lean(),
      Invite.countDocuments({ expiresAt: { $gt: new Date() } })
    ]);
    return NextResponse.json({
      invites,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get invites error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
