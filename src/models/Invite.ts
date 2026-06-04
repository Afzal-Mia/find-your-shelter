import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IInvite extends Document {
  email: string;          // Email being invited
  invitedBy: Types.ObjectId; // User ID of the superAdmin who created it
  expiresAt: Date;        // Expiration datetime
  status: 'pending' | 'completed'; // Invitation status
}

const InviteSchema = new Schema<IInvite>(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    invitedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), immutable: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  },
  { timestamps: true }
);
InviteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Invite: Model<IInvite> = mongoose.models.Invite || mongoose.model<IInvite>('Invite', InviteSchema);
export default Invite;
