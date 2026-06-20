import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { Property } from '@/models/property';
import { propertyBaseSchema } from '@/app/api/property/property.validation';
import { z } from 'zod';
import { deleteCloudinaryImages } from '@/lib/cloudinaryUtils';
import dbConnect from '@/lib/dbConnect';

/**
 * Validation schema for updating a property.
 * Allows any of the fields to be optional (partial update).
 */
const updatePropertySchema = propertyBaseSchema.partial().extend({
  propertyId: z.string().min(1, { message: 'propertyId is required' })
}).refine((data) => {
  const totalRooms = data.totalRooms;
  const bookedRooms = data.totalBookedRooms;
  if (totalRooms !== undefined && bookedRooms !== undefined) {
    return bookedRooms <= totalRooms;
  }
  return true;
}, {
  message: "Booked rooms cannot be greater than total rooms",
  path: ["totalBookedRooms"]
});

/**
 * PUT /api/property/update – Update a property’s details.
 */
export async function PUT(request: Request) {
  await dbConnect();
  // 1️⃣ Authentication
  const authUser = await getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // 2️⃣ Parse & validate request body
  const body = await request.json();
  const result = updatePropertySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.format() }, { status: 400 });
  }
  const { propertyId, ...updates } = result.data;

  // 3️⃣ Ensure the property exists
  const property = await Property.findById(propertyId);
  if (!property) {
    return NextResponse.json({ message: 'Property not found' }, { status: 404 });
  }

  try {
    // If propertyImages are being updated, delete any removed images from Cloudinary
    if (updates.propertyImages) {
      const oldPublicIds = property.propertyImages?.map((img: any) => img.publicId) ?? [];
      const newPublicIds = updates.propertyImages.map((img: any) => img.publicId);
      const idsToDelete = oldPublicIds.filter((id) => !newPublicIds.includes(id));
      if (idsToDelete.length) {
        await deleteCloudinaryImages(idsToDelete);
      }
    }

    // 4️⃣ Apply updates (run validators & return the updated doc)
    property.set(updates);
    const updated = await property.save();
    return NextResponse.json({ property: updated }, { status: 200 });
  } catch (error) {
    console.error('Update property error:', error);
    return NextResponse.json({ message: 'Failed to update property' }, { status: 500 });
  }
}
