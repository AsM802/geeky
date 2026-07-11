import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IDebate extends Document {
  author: string;
  avatar: string;
  title: string;
  tag: string;
  content: string;
  support: number;
  challenge: number;
  votes: Map<string, 'support' | 'challenge'>; // Key: username, Value: voteType
  createdAt: Date;
}

const DebateSchema = new Schema<IDebate>({
  author: { type: String, required: true },
  avatar: { type: String, required: true },
  title: { type: String, required: true },
  tag: { type: String, required: true },
  content: { type: String, required: true },
  support: { type: Number, default: 0 },
  challenge: { type: Number, default: 0 },
  votes: { type: Map, of: String, default: {} },
  createdAt: { type: Date, default: Date.now }
});

export default models.Debate || model<IDebate>('Debate', DebateSchema);
