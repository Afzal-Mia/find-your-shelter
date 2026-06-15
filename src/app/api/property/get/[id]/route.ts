import { NextResponse } from 'next/server';
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
}
