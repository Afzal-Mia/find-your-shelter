import { NextResponse } from 'next/server';
import { Review } from '@/models/Review';
import dbConnect from '@/lib/dbConnect';
import { z } from 'zod';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/review/stats – Retrieve review statistics.
 *
 * Query parameters:
 *   - `status`   – filter by status: pending | approved | rejected (default: all)
 */
export async function GET(request: Request) {
  await dbConnect();
  const authUser = await getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Ensure role is admin or superAdmin
  if (authUser.role !== 'admin' && authUser.role !== 'superAdmin') {
    return NextResponse.json({ message: 'Forbidden. Admin access required.' }, { status: 403 });
  }
  const url = new URL(request.url);
  const status = url.searchParams.get('status');

  const querySchema = z.object({
    status: z.enum(['pending', 'approved', 'rejected']).optional(),
  });

  const parseResult = querySchema.safeParse({ status: status || undefined });

  if (!parseResult.success) {
    return NextResponse.json({ errors: parseResult.error.format() }, { status: 400 });
  }

  const validStatus = parseResult.data.status;
  const matchStage: any = {};
  if (validStatus) {
    matchStage.status = validStatus;
  }

  try {
    const stats = await Review.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    const totalCount = await Review.countDocuments(matchStage);

    return NextResponse.json({
      success: true,
      totalReviews: totalCount,
      statsByStatus: stats,
    }, { status: 200 });

  } catch (error) {
    console.error('Review stats error:', error);
    return NextResponse.json({ message: 'Failed to retrieve review stats' }, { status: 500 });
  }
}
