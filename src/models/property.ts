import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description?: string;
  type: 'flat' | 'house' | 'villa';
  bhk: number;
  allowRoomBooking: boolean;
  rent?: number;
  coordinates: { latitude: number; longitude: number; };
  totalRooms: number;
  totalBookedRooms?: number;
  propertyImages: {
    url: string;
    publicId: string;
  }[];
  status: 'available' | 'partially_booked' | 'fully_booked';
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ['flat', 'house', 'villa'],
      required: true,
    },
    bhk: { type: Number },
    allowRoomBooking: { type: Boolean, default: false },
    totalRooms: { type: Number },
    totalBookedRooms: { type: Number, default: 0 },
    rent: { type: Number },
    coordinates: { latitude: { type: Number }, longitude: { type: Number } },
    propertyImages: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ['available', 'partially_booked', 'fully_booked'],
      required: true,
    },
  },
  { timestamps: true }
);

propertySchema.pre('save', async function () {
  if (this.status === 'fully_booked') {
    this.totalBookedRooms = this.totalRooms;
  } else if (this.totalRooms && this.totalBookedRooms === this.totalRooms) {
    this.status = 'fully_booked';
  } else if (this.status === 'available') {
    this.totalBookedRooms = 0;
  } else if (this.totalBookedRooms === 0) {
    this.status = 'available';
  } else if (this.totalBookedRooms !== undefined && this.totalBookedRooms > 0 && this.totalBookedRooms < (this.totalRooms || 0)) {
    this.status = 'partially_booked';
  }
});

export const Property: Model<IProperty> = mongoose.models.Property || mongoose.model<IProperty>('Property', propertySchema);
