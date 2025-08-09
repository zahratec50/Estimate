import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnswer {
  question: string;
  answer: string;
}

export interface IProject {
  id: string;
  mainQuizAnswers: IAnswer[];
}

export interface IQuiz extends Document {
  preQuizAnswers: IAnswer[];
  mainQuizAnswers: IAnswer[];
  isRegistered: boolean;
  userType: string;
  projects: IProject[];
  currentProjectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false } // چون اینها زیرمجموعه هستن نیازی به id جدا ندارن
);

const ProjectSchema = new Schema<IProject>({
  id: { type: String, required: true },
  mainQuizAnswers: [AnswerSchema],
});

const QuizSchema = new Schema<IQuiz>(
  {
    preQuizAnswers: [AnswerSchema],
    mainQuizAnswers: [AnswerSchema],
    isRegistered: { type: Boolean, required: true },
    userType: { type: String, required: true },
    projects: [ProjectSchema],
    currentProjectId: { type: String },
  },
  { timestamps: true }
);

const QuizModel: Model<IQuiz> =
  mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);

export default QuizModel;
