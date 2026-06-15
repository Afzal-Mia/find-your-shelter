import { NextResponse } from 'next/server';
import { Property } from '@/models/property';
import { z } from 'zod';
import dbConnect from '@/lib/dbConnect';

/**
 * GET /api/property/get – Retrieve a paginated, filtered list of properties.
 *
 * Query parameters:
 *   - `page`     – 1‑based page number (default: 1)
 *   - `limit`    – items per page (default: 10)
 *   - `search`   – case-insensitive title search
 *   - `type`     – filter by type: flat | house | villa
 *   - `status`   – filter by status: available | partially_booked | fully_booked
 *   - `minRent`  – minimum rent (inclusive)
 *   - `maxRent`  – maximum rent (inclusive)
 */
export async function GET(request: Request) {
  await dbConnect();


  const url = new URL(request.url);
  const sp = url.searchParams;

  const querySchema = z.object({
    page: z.string().regex(/^\d+$/).transform((s) => parseInt(s, 10)),
    limit: z.string().regex(/^\d+$/).transform((s) => parseInt(s, 10)),
    search: z.string().optional(),
    type: z.enum(['flat', 'house', 'villa']).optional(),
    status: z.enum(['available', 'partially_booked', 'fully_booked']).optional(),
    minRent: z.string().regex(/^\d+$/).transform((s) => parseInt(s, 10)).optional(),
    maxRent: z.string().regex(/^\d+$/).transform((s) => parseInt(s, 10)).optional(),
  });

  const parseResult = querySchema.safeParse({
    page: sp.get('page') || '1',
    limit: sp.get('limit') || '10',
    search: sp.get('search') || undefined,
    type: sp.get('type') || undefined,
    status: sp.get('status') || undefined,
    minRent: sp.get('minRent') || undefined,
    maxRent: sp.get('maxRent') || undefined,
  });

  if (!parseResult.success) {
    return NextResponse.json({ errors: parseResult.error.format() }, { status: 400 });
  }

  const { page, limit, search, type, status, minRent, maxRent } = parseResult.data;
  const safePage = Math.max(page, 1);
  const safeLimit = Math.max(limit, 1);

  // Build MongoDB filter
  const filter: Record<string, any> = {};
  if (search) filter.title = { $regex: search, $options: 'i' };
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (minRent !== undefined || maxRent !== undefined) {
    filter.rent = {};
    if (minRent !== undefined) filter.rent.$gte = minRent;
    if (maxRent !== undefined) filter.rent.$lte = maxRent;
  }

  try {
    const [total, properties] = await Promise.all([
      Property.countDocuments(filter),
      Property.find(filter)
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit)
        .lean(),
    ]);

    const totalPages = Math.ceil(total / safeLimit);

    return NextResponse.json(
      {
        data: properties,
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
    console.error('Get properties error:', error);
    return NextResponse.json({ message: 'Failed to retrieve properties' }, { status: 500 });
  }
}
