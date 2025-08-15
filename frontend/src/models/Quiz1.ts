import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnswer {
  question: string;
  /** stored as comma-joined for multi-select */
  answer: string;
}

export interface IQuestion {
  id: number;
  title: string;
  type: "single-choice" | "multi-choice" | "select" | "text-input" | "image-choice";
  options: string[] | { label: string; imageUrl: string }[];
  multiple?: boolean;
  validation: {
    required: boolean;
    errorMessage: string;
    minSelected?: number;
    maxSelected?: number;
    pattern?: string;
  };
  fields?: Array<{
    label: string;
    placeholder: string;
    validation: { required: boolean; pattern: string; errorMessage: string };
  }>;
}

export interface IProject {
  id: string;
  mainQuizAnswers: IAnswer[];
}

export interface IQuiz extends Document {
  questions: IQuestion[];
  preQuizAnswers: IAnswer[];
  mainQuizAnswers: IAnswer[];
  isRegistered: boolean;
  userType: string;
  projects: IProject[];
  currentProjectId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const QuestionSchema = new Schema<IQuestion>(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["single-choice", "multi-choice", "select", "text-input", "image-choice"],
      required: true,
    },
    // store options as Mixed to support string[] or image options
    options: { type: Schema.Types.Mixed, default: [] },
    multiple: { type: Boolean, default: false },
    validation: {
      required: { type: Boolean, default: false },
      errorMessage: { type: String, default: "" },
      minSelected: { type: Number },
      maxSelected: { type: Number },
      pattern: { type: String },
    },
    fields: [
      {
        label: { type: String },
        placeholder: { type: String },
        validation: {
          required: { type: Boolean, default: false },
          pattern: { type: String },
          errorMessage: { type: String },
        },
      },
    ],
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>({
  id: { type: String, required: true },
  mainQuizAnswers: [AnswerSchema],
});

const QuizSchema = new Schema<IQuiz>(
  {
    questions: [QuestionSchema],
    preQuizAnswers: [AnswerSchema],
    mainQuizAnswers: [AnswerSchema],
    isRegistered: { type: Boolean, required: true },
    userType: { type: String, required: true },
    projects: [ProjectSchema],
    currentProjectId: { type: String, default: null },
  },
  { timestamps: true }
);

const QuizModel: Model<IQuiz> =
  mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);

export default QuizModel;
