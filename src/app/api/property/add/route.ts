import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { Property } from '@/models/property';
import { createPropertySchema } from '@/app/api/property/property.validation';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: Request) {
  await dbConnect();
  // Verify authentication
  const authUser = await getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const parsed = await request.json();
    const result = createPropertySchema.safeParse(parsed);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.format() }, { status: 400 });
    }
    // Create a new property document. Assumes request body matches IProperty fields.
    const property = await Property.create(result.data);
    return NextResponse.json({ property }, { status: 201 });
  } catch (error: any) {
    console.error('Create property error:', error);
    return NextResponse.json({ message: 'Failed to create property' }, { status: 500 });
  }
}
