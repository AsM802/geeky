import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  passwordHash: string;
  level: number;
  xp: number;
  streak: number;
  achievements: string[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  achievements: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model<IUser>('User', UserSchema);
