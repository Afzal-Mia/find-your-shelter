import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: Request) {
  // Verify authentication
  const authUser = await getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image');
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
    }

    // Convert Blob to Buffer
    const arrayBuffer = await (file as Blob).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'find-your-shelter',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}
