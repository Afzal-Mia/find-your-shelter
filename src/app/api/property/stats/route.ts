import { NextResponse } from 'next/server';
import { Property } from '@/models/property';
import dbConnect from '@/lib/dbConnect';
import { z } from 'zod';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/property/stats – Retrieve property statistics.
 *
 * Query parameters:
 *   - `status`   – filter by status: available | partially_booked | fully_booked (default: all)
 */
export async function GET(request: Request) {
  await dbConnect();
  const authUser = await getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const url = new URL(request.url);
  const status = url.searchParams.get('status');

  const querySchema = z.object({
    status: z.enum(['available', 'partially_booked', 'fully_booked']).optional(),
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
    const stats = await Property.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgRent: { $avg: '$rent' },
          totalRooms: { $sum: '$totalRooms' },
          totalBookedRooms: { $sum: '$totalBookedRooms' },
        },
      },
    ]);

    const totalCount = await Property.countDocuments(matchStage);

    return NextResponse.json({
      success: true,
      totalProperties: totalCount,
      statsByStatus: stats,
    }, { status: 200 });

  } catch (error) {
    console.error('Property stats error:', error);
    return NextResponse.json({ message: 'Failed to retrieve property stats' }, { status: 500 });
  }
}
