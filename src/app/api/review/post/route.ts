import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Review } from '@/models/Review';
import { createReviewSchema } from '../review.validation';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const parsed = await request.json();
    const result = createReviewSchema.safeParse(parsed);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.format() }, { status: 400 });
    }

    // Create a new review document
    const review = await Review.create(result.data);

    return NextResponse.json({ review, message: 'Review submitted successfully' }, { status: 201 });
  } catch (error: any) {
    console.error('Create review error:', error);
    return NextResponse.json({ message: 'Failed to create review' }, { status: 500 });
  }
}
