import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IModuleItem {
  id: number;
  title: string;
  duration: string;
  progress?: number;
  status: 'completed' | 'active' | 'locked';
}

export interface ISubject extends Document {
  slug: string;
  title: string;
  category: string;
  badge: string;
  icon: string;
  desc: string;
  modulesCount: number;
  learners: string;
  avgRating: number;
  xpEarned: number;
  completionPct: number;
  completedModules: number;
  modules: IModuleItem[];
}

const ModuleItemSchema = new Schema<IModuleItem>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  progress: { type: Number },
  status: { type: String, enum: ['completed', 'active', 'locked'], default: 'locked' }
});

const SubjectSchema = new Schema<ISubject>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  badge: { type: String, required: true },
  icon: { type: String, required: true },
  desc: { type: String, required: true },
  modulesCount: { type: Number, required: true },
  learners: { type: String, required: true },
  avgRating: { type: Number, required: true },
  xpEarned: { type: Number, required: true },
  completionPct: { type: Number, default: 0 },
  completedModules: { type: Number, default: 0 },
  modules: [ModuleItemSchema]
});

export default models.Subject || model<ISubject>('Subject', SubjectSchema);
