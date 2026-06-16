import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { Review } from '@/models/Review';
import dbConnect from '@/lib/dbConnect';
import { z } from 'zod';

const updateReviewStatusSchema = z.object({
  reviewId: z.string().min(1, { message: 'reviewId is required' }),
  status: z.enum(['pending', 'approved', 'rejected']),
});

export async function PATCH(request: Request) {
  await dbConnect();
  
  // 1️⃣ Authentication
  const authUser = await getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Ensure role is admin or superAdmin
  if (authUser.role !== 'admin' && authUser.role !== 'superAdmin') {
    return NextResponse.json({ message: 'Forbidden. Admin access required.' }, { status: 403 });
  }

  // 2️⃣ Parse & validate request body
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const result = updateReviewStatusSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.format() }, { status: 400 });
  }

  const { reviewId, status } = result.data;

  // 3️⃣ Update the review status
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ review: updatedReview, message: 'Review status updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Update review status error:', error);
    return NextResponse.json({ message: 'Failed to update review status' }, { status: 500 });
  }
}
