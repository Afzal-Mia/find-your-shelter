import { z } from 'zod';

export const propertyBaseSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 5 characters' }),
  description: z.string().optional(),
  type: z.enum(['flat', 'house', 'villa']),
  bhk: z.number().int().nonnegative().optional(),
  allowRoomBooking: z.boolean().optional(),
  rent: z.number().nonnegative().optional(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number()
  }).optional(),
  totalRooms: z.number().int().nonnegative().optional(),
  totalBookedRooms: z.number().int().nonnegative().optional(),
  propertyImages: z.array(
    z.object({
      url: z.string().url(),
      publicId: z.string()
    })
  ).optional(),
  status: z.enum(['available', 'partially_booked', 'fully_booked']).optional()
});

export const createPropertySchema = propertyBaseSchema.refine((data) => {
  const totalRooms = data.totalRooms || 0;
  const bookedRooms = data.totalBookedRooms || 0;
  if (!data.totalBookedRooms) return true;
  return bookedRooms <= totalRooms;
}, {
  message: "Booked rooms cannot be greater than total rooms",
  path: ["totalBookedRooms"]
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
