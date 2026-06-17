import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth';

// GET paginated list of admin users (excluding passwords)
export async function GET(request: Request) {

    try {
        const authUser = await getAuthUser(request);
        if (!authUser || authUser.role !== 'superAdmin') {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 10;
        const skip = (page - 1) * limit;

        await dbConnect();

        const [admins, total] = await Promise.all([
            User.find({ role: 'admin' })
                .select('-password')
                .skip(skip)
                .limit(limit),
            User.countDocuments({ role: 'admin' })
        ]);

        return NextResponse.json(
            {
                admins,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Fetch admins error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
