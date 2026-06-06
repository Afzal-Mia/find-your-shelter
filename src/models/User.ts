import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface representing a User document in MongoDB
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional if you use OAuth providers later
  role: 'superAdmin' | 'admin';
  isEmailVerified: boolean;
  isBlocked: boolean;
  profileImage?: string; // Optional URL to profile image
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema for the User
const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name must be less than 50 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['superAdmin', 'admin'],
      default: 'admin',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt properties
    toJSON: {
      transform(_, ret: any) {
        delete ret.password;
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Define and export the User Model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
