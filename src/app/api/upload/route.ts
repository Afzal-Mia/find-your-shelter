import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getAuthUser } from '@/lib/auth';

export const maxDuration = 60; // allow up to 60s for large uploads (Vercel/Next.js edge limit)

export async function POST(request: Request) {
  // Verify authentication
  const authUser = await getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file found in request' }, { status: 400 });
    }

    const MAX_SIZE_BYTES = 1 * 1024 * 1024; // 1 MB
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ message: 'File size exceeds 1MB limit' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`[Upload] Processing ${file.name} - Size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);

    const os = require('os');
    const path = require('path');
    const fs = require('fs/promises');
    const crypto = require('crypto');

    // Create a temporary file path
    const tempFileName = `${crypto.randomBytes(16).toString('hex')}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const tempFilePath = path.join(os.tmpdir(), tempFileName);

    try {
      // Write buffer to the temporary file
      await fs.writeFile(tempFilePath, buffer);
      console.log(`[Upload] Saved temporary file to ${tempFilePath}`);

      console.log(`[Upload] Sending file to Cloudinary...`);
      // Cloudinary SDK handles chunking automatically for local file paths, preventing timeouts and size limits
      const result = await cloudinary.uploader.upload(tempFilePath, {
        folder: 'find-your-shelter',
        resource_type: 'auto',
        timeout: 120000, // 120s timeout
      });

      console.log(`[Upload] Success! URL: ${result.secure_url}`);

      // Clean up the temporary file
      await fs.unlink(tempFilePath).catch(console.error);

      return NextResponse.json(
        { url: result.secure_url, publicId: result.public_id },
        { status: 200 }
      );
    } catch (error: any) {
      // Ensure temp file is cleaned up even if upload fails
      await fs.unlink(tempFilePath).catch(() => { });
      throw error;
    }
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ message: 'Upload failed', detail: error.message }, { status: 500 });
  }
}
