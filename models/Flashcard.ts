import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IFlashcard extends Document {
  subjectSlug: string;
  type: string;
  prompt: string;
  answer: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: Date;
}

const FlashcardSchema = new Schema<IFlashcard>({
  subjectSlug: { type: String, required: true, index: true },
  type: { type: String, required: true },
  prompt: { type: String, required: true },
  answer: { type: String, required: true },
  easeFactor: { type: Number, default: 2.5 },
  interval: { type: Number, default: 1 },
  repetitions: { type: Number, default: 0 },
  nextReview: { type: Date, default: Date.now },
});

export default models.Flashcard || model<IFlashcard>('Flashcard', FlashcardSchema);
