import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { Property } from '@/models/property';
import { z } from 'zod';
import { deleteCloudinaryImages } from '@/lib/cloudinaryUtils';
import dbConnect from '@/lib/dbConnect';

/**
 * Payload schema for deleting a property.
 * Expects a JSON body with a `propertyId` field.
 */
const deletePropertySchema = z.object({
  propertyId: z.string().min(1, { message: 'propertyId is required' })
});

/**
 * DELETE /api/property/delete – Remove a property,
 * and all related Cloudinary images.
 */
export async function DELETE(request: Request) {
  await dbConnect();
  // Authenticate the user
  const authUser = await getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Parse and validate request body
  const body = await request.json();
  const result = deletePropertySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.format() }, { status: 400 });
  }
  const { propertyId } = result.data;

  // Verify the property exists
  const property = await Property.findById(propertyId);
  if (!property) {
    return NextResponse.json({ message: 'Property not found' }, { status: 404 });
  }

  try {
    // Gather all Cloudinary publicIds from the property and its rooms
    const propertyImageIds = property.propertyImages?.map((img: any) => img.publicId) ?? [];
    const allImageIds = [...propertyImageIds];

    // Delete images from Cloudinary (if any)
    if (allImageIds.length) {
      await deleteCloudinaryImages(allImageIds);
    }

    // Delete the property itself
    await Property.findByIdAndDelete(propertyId);

    return NextResponse.json({ message: 'Property deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete property error:', error);
    return NextResponse.json({ message: 'Failed to delete property' }, { status: 500 });
  }
}
