import { NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/dbConnect';
import { Review } from '@/models/Review';

export async function GET(request: Request) {
  await dbConnect();

  const url = new URL(request.url);
  const sp = url.searchParams;

  const querySchema = z.object({
    page: z.string().regex(/^\d+$/).transform((s) => parseInt(s, 10)),
    limit: z.string().regex(/^\d+$/).transform((s) => parseInt(s, 10)),
    search: z.string().optional(),
    status: z.enum(['pending', 'approved', 'rejected']).optional(),
  });

  const parseResult = querySchema.safeParse({
    page: sp.get('page') || '1',
    limit: sp.get('limit') || '10',
    search: sp.get('search') || undefined,
    status: sp.get('status') || undefined,
  });

  if (!parseResult.success) {
    return NextResponse.json({ errors: parseResult.error.format() }, { status: 400 });
  }

  const { page, limit, search, status } = parseResult.data;
  const safePage = Math.max(page, 1);
  const safeLimit = Math.max(limit, 1);

  // Build MongoDB filter
  const filter: Record<string, any> = {};
  
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (status) {
    filter.status = status;
  }

  try {
    const [total, reviews] = await Promise.all([
      Review.countDocuments(filter),
      Review.find(filter)
        .populate('propertyId', 'title')
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit)
        .lean(),
    ]);

    const totalPages = Math.ceil(total / safeLimit);

    return NextResponse.json(
      {
        data: reviews,
        pagination: {
          total,
          page: safePage,
          limit: safeLimit,
          totalPages,
          hasNextPage: safePage < totalPages,
          hasPrevPage: safePage > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json({ message: 'Failed to retrieve reviews' }, { status: 500 });
  }
}
