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
},import { NextResponse } from 'next/server';
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
},import { NextResponse } from 'next/server';
import { Property } from '@/models/property';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: 'Property ID is required' },
        { status: 400 }
      );
    }

    const property = await Property.findById(id).lean();

    if (!property) {
      return NextResponse.json(
        { message: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ property }, { status: 200 });
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve property' },
      { status: 500 }
    );
  }
},import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Inquiry } from "@/models/Inquiry";
import { inquiryCreateSchema } from "./inquiry.validation";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const validationResult = inquiryCreateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, phone, email, message, propertyId } = validationResult.data;

    const inquiry = await Inquiry.create({
      propertyId,
      name,
      phone,
      email,
      message,
    });

    return NextResponse.json(
      { message: "Inquiry submitted successfully", inquiry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Inquiry Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}


