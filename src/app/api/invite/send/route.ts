import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Invite from '@/models/Invite';
import { inviteSchema } from '@/app/api/invite/invite.validation';
import { getAuthUser } from '@/lib/auth'; // helper returning decoded JWT payload

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const result = inviteSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { message: 'Invalid data', errors: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }
        const { email } = result.data;

        // Verify requester is superAdmin
        const authUser = await getAuthUser(request);
        if (!authUser || authUser.role !== 'superAdmin') {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 7 days

        // Upsert to avoid duplicate invites for the same email
        await Invite.findOneAndUpdate(
            { email },
            { invitedBy: authUser.id, expiresAt },
            { upsert: true, new: true }
        );

        // TODO: integrate email service to send invitation link if desired
        return NextResponse.json({ message: 'Invite created/updated', expiresAt }, { status: 201 });
    } catch (error: any) {
        console.error('Send invite error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
