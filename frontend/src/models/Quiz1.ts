// import mongoose, { Schema, Document, Model } from "mongoose";

// export interface IAnswer {
//   question: string;
//   answer: string;
// }

// export interface IProject {
//   id: string;
//   mainQuizAnswers: IAnswer[];
// }

// export interface IQuiz extends Document {
//   preQuizAnswers: IAnswer[];
//   mainQuizAnswers: IAnswer[];
//   isRegistered: boolean;
//   userType: string;
//   projects: IProject[];
//   currentProjectId?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const AnswerSchema = new Schema<IAnswer>(
//   {
//     question: { type: String, required: true },
//     answer: { type: String, required: true },
//   },
//   { _id: false } // چون اینها زیرمجموعه هستن نیازی به id جدا ندارن
// );

// const ProjectSchema = new Schema<IProject>({
//   id: { type: String, required: true },
//   mainQuizAnswers: [AnswerSchema],
// });

// const QuizSchema = new Schema<IQuiz>(
//   {
//     preQuizAnswers: [AnswerSchema],
//     mainQuizAnswers: [AnswerSchema],
//     isRegistered: { type: Boolean, required: true },
//     userType: { type: String, required: true },
//     projects: [ProjectSchema],
//     currentProjectId: { type: String },
//   },
//   { timestamps: true }
// );

// const QuizModel: Model<IQuiz> =
//   mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);

// export default QuizModel;


import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnswer {
  question: string;
  answer: string;
}

export interface IQuestion {
  id: number;
  title: string;
  type: "single-choice" | "multi-choice" | "select" | "text-input";
  options: string[];
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
    validation: {
      required: boolean;
      pattern: string;
      errorMessage: string;
    };
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
  currentProjectId?: string;
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
      enum: ["single-choice", "multi-choice", "select", "text-input"],
      required: true,
    },
    options: { type: [String], default: [] },
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
    currentProjectId: { type: String },
  },
  { timestamps: true }
);

const QuizModel: Model<IQuiz> =
  mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);

export default QuizModel;