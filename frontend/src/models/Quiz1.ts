// import mongoose, { Schema, Document, Model } from "mongoose";

// export interface IAnswer {
//   question: string;
//   /** stored as comma-joined for multi-select */
//   answer: string;
// }

// export interface IQuestion {
//   id: number;
//   title: string;
//   type: "single-choice" | "multi-choice" | "select" | "text-input" | "image-choice";
//   options: string[] | { label: string; imageUrl: string }[];
//   multiple?: boolean;
//   validation: {
//     required: boolean;
//     errorMessage: string;
//     minSelected?: number;
//     maxSelected?: number;
//     pattern?: string;
//   };
//   fields?: Array<{
//     label: string;
//     placeholder: string;
//     validation: { required: boolean; pattern: string; errorMessage: string };
//   }>;
// }

// export interface IProject {
//   id: string;
//   mainQuizAnswers: IAnswer[];
// }

// export interface IQuiz extends Document {
//   questions: IQuestion[];
//   preQuizAnswers: IAnswer[];
//   mainQuizAnswers: IAnswer[];
//   isRegistered: boolean;
//   userType: string;
//   projects: IProject[];
//   currentProjectId?: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const AnswerSchema = new Schema<IAnswer>(
//   {
//     question: { type: String, required: true },
//     answer: { type: String, required: true },
//   },
//   { _id: false }
// );

// const QuestionSchema = new Schema<IQuestion>(
//   {
//     id: { type: Number, required: true },
//     title: { type: String, required: true },
//     type: {
//       type: String,
//       enum: ["single-choice", "multi-choice", "select", "text-input", "image-choice"],
//       required: true,
//     },
//     // store options as Mixed to support string[] or image options
//     options: { type: Schema.Types.Mixed, default: [] },
//     multiple: { type: Boolean, default: false },
//     validation: {
//       required: { type: Boolean, default: false },
//       errorMessage: { type: String, default: "" },
//       minSelected: { type: Number },
//       maxSelected: { type: Number },
//       pattern: { type: String },
//     },
//     fields: [
//       {
//         label: { type: String },
//         placeholder: { type: String },
//         validation: {
//           required: { type: Boolean, default: false },
//           pattern: { type: String },
//           errorMessage: { type: String },
//         },
//       },
//     ],
//   },
//   { _id: false }
// );

// const ProjectSchema = new Schema<IProject>({
//   id: { type: String, required: true },
//   mainQuizAnswers: [AnswerSchema],
// });

// const QuizSchema = new Schema<IQuiz>(
//   {
//     questions: [QuestionSchema],
//     preQuizAnswers: [AnswerSchema],
//     mainQuizAnswers: [AnswerSchema],
//     isRegistered: { type: Boolean, required: true },
//     userType: { type: String, required: true },
//     projects: [ProjectSchema],
//     currentProjectId: { type: String, default: null },
//   },
//   { timestamps: true }
// );

// const QuizModel: Model<IQuiz> =
//   mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);

// export default QuizModel;


// import mongoose, { Schema, Document, Model } from "mongoose";

// // Interface for answer
// export interface IAnswer {
//   question: string;
//   answer: string[]; // Store answers as an array of strings
// }

// // Interface for image option
// export interface IImageOption {
//   label: string;
//   imageUrl?: string; // Optional image URL
// }

// // Interface for question
// export interface IQuestion {
//   id: string; // Use string to match useAppStore
//   title: string;
//   type: "text" | "number" | "select" | "checkbox" | "radio" | "button" | "file" | "image-choice"; // Updated types
//   imageUrl?: string; // Optional image URL for question
//   options?: Array<string | IImageOption>;
//   multiple?: boolean;
//   validation?: {
//     required?: boolean;
//     errorMessage?: string;
//     minSelected?: number;
//     maxSelected?: number;
//     minLength?: number;
//     maxLength?: number;
//     pattern?: string;
//     format?: "email" | "usPhone";
//     min?: number;
//     max?: number;
//     step?: number;
//     units?: string[];
//   };
//   fields?: Array<{
//     label: string;
//     placeholder?: string;
//     validation?: {
//       required?: boolean;
//       pattern?: string;
//       errorMessage?: string;
//       format?: "email" | "usPhone";
//     };
//   }>;
// }

// // Interface for project
// export interface IProject {
//   id: string;
//   name?: string; // Optional project name
//   mainQuizAnswers: IAnswer[];
//   completed?: boolean;
//   description?: string;
//   updatedAt?: string;
// }

// // Interface for quiz document
// export interface IQuiz extends Document {
//   questions: IQuestion[];
//   preQuizAnswers: IAnswer[];
//   mainQuizAnswers: IAnswer[];
//   isRegistered: boolean;
//   userType: string;
//   projects: IProject[];
//   currentProjectId?: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const AnswerSchema = new Schema<IAnswer>(
//   {
//     question: { type: String, required: true },
//     answer: [{ type: String }], // Array of strings to support multiple answers
//   },
//   { _id: false }
// );

// const ImageOptionSchema = new Schema<IImageOption>(
//   {
//     label: { type: String, required: true },
//     imageUrl: { type: String },
//   },
//   { _id: false }
// );

// const QuestionSchema = new Schema<IQuestion>(
//   {
//     id: { type: String, required: true }, // String to match useAppStore
//     title: { type: String, required: true },
//     type: {
//       type: String,
//       enum: ["text", "number", "select", "checkbox", "radio", "button", "file", "image-choice"],
//       required: true,
//     },
//     imageUrl: { type: String }, // Optional image URL
//     options: [
//       {
//         type: Schema.Types.Mixed, // Support string or ImageOption
//         validate: {
//           validator: (value: any) => {
//             return (
//               typeof value === "string" ||
//               (typeof value === "object" &&
//                 value !== null &&
//                 typeof value.label === "string")
//             );
//           },
//           message: "Options must be either a string or an object with a label",
//         },
//       },
//     ],
//     multiple: { type: Boolean, default: false },
//     validation: {
//       required: { type: Boolean, default: false },
//       errorMessage: { type: String, default: "" },
//       minSelected: { type: Number },
//       maxSelected: { type: Number },
//       minLength: { type: Number },
//       maxLength: { type: Number },
//       pattern: { type: String },
//       format: { type: String, enum: ["email", "usPhone"] },
//       min: { type: Number },
//       max: { type: Number },
//       step: { type: Number },
//       units: [{ type: String }],
//     },
//     fields: [
//       {
//         label: { type: String },
//         placeholder: { type: String },
//         validation: {
//           required: { type: Boolean, default: false },
//           pattern: { type: String },
//           errorMessage: { type: String },
//           format: { type: String, enum: ["email", "usPhone"] },
//         },
//       },
//     ],
//   },
//   { _id: false }
// );

// const ProjectSchema = new Schema<IProject>(
//   {
//     id: { type: String, required: true },
//     name: { type: String }, // Optional project name
//     mainQuizAnswers: [AnswerSchema],
//     completed: { type: Boolean, default: false },
//     description: { type: String },
//     updatedAt: { type: String },
//   },
//   { _id: false }
// );

// const QuizSchema = new Schema<IQuiz>(
//   {
//     questions: [QuestionSchema],
//     preQuizAnswers: [AnswerSchema],
//     mainQuizAnswers: [AnswerSchema],
//     isRegistered: { type: Boolean, required: true },
//     userType: { type: String, required: true },
//     projects: [ProjectSchema],
//     currentProjectId: { type: String, default: null },
//   },
//   { timestamps: true }
// );

// const QuizModel: Model<IQuiz> =
//   mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);

// export default QuizModel;




import mongoose, { Schema, Document } from "mongoose";

export interface IQuiz extends Document {
  _id: string;
  questions: Array<{
    id: string;
    title: string;
    type: "text" | "number" | "select" | "checkbox" | "radio" | "button" | "file" | "image-choice";
    options?: string[];
    multiple?: boolean;
    validation?: { required: boolean; errorMessage?: string };
    fields?: Array<{ label: string; placeholder: string }>;
    imageUrl?: string;
  }>;
  preQuizAnswers: Array<{ question: string; answer: string[] }>;
  mainQuizAnswers?: Array<{ question: string; answer: string[] }>;
  isRegistered: boolean;
  userType: string;
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new Schema<IQuiz>(
  {
    questions: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        type: {
          type: String,
          enum: ["text", "number", "select", "checkbox", "radio", "button", "file", "image-choice"],
          required: true,
        },
        options: [{ type: String }],
        multiple: { type: Boolean, default: false },
        validation: {
          required: { type: Boolean, default: false },
          errorMessage: { type: String },
        },
        fields: [{ label: { type: String }, placeholder: { type: String } }],
        imageUrl: { type: String },
      },
    ],
    preQuizAnswers: [
      {
        question: { type: String, required: true },
        answer: [{ type: String }],
      },
    ],
    mainQuizAnswers: [
      {
        question: { type: String },
        answer: [{ type: String }],
      },
    ],
    isRegistered: { type: Boolean, default: false },
    userType: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// اگه _id رو به‌صورت ObjectId می‌خوای، این خط رو حذف کن یا تنظیمش کن
quizSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret._id = ret._id.toString();
    return ret;
  },
});

const QuizModel = mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", quizSchema);

export default QuizModel;