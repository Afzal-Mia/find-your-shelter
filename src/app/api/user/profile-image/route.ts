import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';
import getPublicIdFromUrl from '@/lib/getPublicIdFromUrl';

export async function POST(request: Request) {
  const authUser = await getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Connect to DB and fetch the user document
    await dbConnect();
    const user = await User.findById(authUser.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Expect JSON body with the new image URL (already uploaded via /api/upload)
    const { url: newUrl } = await request.json();
    if (!newUrl) {
      return NextResponse.json({ message: 'Image URL is required' }, { status: 400 });
    }

    // If a profile image already exists, delete it from Cloudinary
    if (user.profileImage) {
      const publicId = getPublicIdFromUrl(user.profileImage);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (delErr) {
          console.warn('Failed to delete previous Cloudinary image', delErr);
        }
      }
    }

    // Update user's profileImage field and save
    user.profileImage = newUrl;
    await user.save();

    return NextResponse.json({ url: newUrl }, { status: 200 });
  } catch (error: any) {
    console.error('Update profile image error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
