// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axios from "axios";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

// export type PlanId = "basic" | "pro" | "enterprise";

// interface SubscriptionState {
//   subscribedPlan: PlanId | null;
//   subscribePlan: (plan: PlanId) => void;
//   cancelSubscription: () => void;
// }

// export interface Answer {
//   question: string;
//   answer: string | string[];
// }

// export interface Project {
//   id: string;
//   name: string;
//   mainQuizAnswers: Answer[];
//   completed?: boolean;
//   description?: string;
//   updatedAt?: string;
// }

// export interface FieldItem {
//     label: string;
//     placeholder: string;
//     validation: {
//       required: boolean;
//       pattern?: string;
//       errorMessage?: string;
//     };
//   }

//   export interface ImageOption {
//     label: string;
//     imageUrl?: string;
//   }

//   export interface QuestionItem {
//     id: string;
//     type:
//       | "text"
//       | "number"
//       | "select"
//       | "checkbox"
//       | "radio"
//       | "button"
//       | "file"
//       | "image-choice";
//     title: string;
//     placeholder?: string;
//     hint?: string;
//     imageUrl?: string;
//     options?: Array<string | ImageOption>;
//     multiple?: boolean;
//     fields?: FieldItem[];
//     validation?: {
//       required?: boolean;
//       minSelected?: number;
//       maxSelected?: number;
//       minLength?: number;
//       maxLength?: number;
//       pattern?: string;
//       errorMessage?: string;
//     };
//     completed?: boolean;
//   }

// export interface AppState {
//   currentStepFirstQuiz: number;
//   currentStepMainQuiz: number;
//   preQuizAnswers: Answer[];
//   mainQuizAnswersTemp: Answer[];
//   isRegistered: boolean;
//   userType: string;
//   projects: Project[];
//   currentProjectId: string | null;
//   isSidebarOpen: boolean;
//   isHelpOpen: boolean;
//   loginMethod: "manual" | "google" | "apple" | null;
//   userName: string;
//   userEmail: string;
//   userAvatar: string;
//   subscribedPlan: PlanId | null; // پلان فعلی کاربر
//   subscriptionLimits: { [key in PlanId]: number }; // محدودیت پروژه‌ها بر اساس پلان

//   closeSidebar: () => void;
//   subscribePlan: (plan: PlanId) => void;
//   cancelSubscription: () => void;

//   setUserAvatar: (avatar: string) => void;

//   setUserName: (name: string) => void;
//   setUserEmail: (email: string) => void;

//   setCurrentStepFirstQuiz: (step: number) => void;
//   setCurrentStepMainQuiz: (step: number) => void;
//   setAnswer: (
//     question: QuestionItem,
//     answer: string | string[],
//     isFirstQuiz: boolean
//   ) => void;
//   addProject: (name: string) => string;
//   removeProject: (id: string) => void;
//   transferTempAnswersToProject: (projectId: string) => void;
//   getCurrentAnswer: (
//     questions: QuestionItem[],
//     isFirstQuiz: boolean
//   ) => string | string[] | null;
//   isContinueAllowed: (question: QuestionItem, isFirstQuiz: boolean) => boolean;
//   setRegistered: (value: boolean) => void;
//   setUserType: (value: string) => void;
//   setProjects: (projects: Project[]) => void;
//   setCurrentProjectId: (id: string | null) => void;
//   toggleSidebar: () => void;
//   toggleHelp: () => void;
//   setLoginMethod: (method: AppState["loginMethod"]) => void;
//   syncFirstQuizWithServer: () => Promise<void>;
//   syncMainQuizWithServer: () => Promise<void>;
//   clearQuizData: () => void;
// }

// export const useAppStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       currentStepFirstQuiz: 1,
//       currentStepMainQuiz: 1,
//       preQuizAnswers: [],
//       mainQuizAnswersTemp: [],
//       isRegistered: false,
//       userType: "",
//       projects: [],
//       currentProjectId: null,
//       isSidebarOpen: false,
//       isHelpOpen: false,
//       loginMethod: null,
//       userName: "",
//       userEmail: "",
//       userAvatar: "",
//       subscribedPlan: null,
//       subscriptionLimits: { basic: 3, pro: 5, enterprise: Infinity },

//       closeSidebar: () => set({ isSidebarOpen: false }),

//       subscribePlan: (plan: PlanId) => {
//         set({ subscribedPlan: plan });
//         // می‌تونی اینجا dailyProjectCount و lastProjectDate رو هم ریست کنی اگر لازم باشه
//       },

//       cancelSubscription: () => {
//         set({ subscribedPlan: null });
//       },

//       setUserAvatar: (avatar: string) => set({ userAvatar: avatar }),

//       setUserName: (name: string) => set({ userName: name }),
//       setUserEmail: (email: string) => set({ userEmail: email }),

//       setLoginMethod: (method) => set({ loginMethod: method }),
//       setCurrentStepFirstQuiz: (step) => set({ currentStepFirstQuiz: step }),
//       setCurrentStepMainQuiz: (step) => set({ currentStepMainQuiz: step }),
//       setAnswer: (question, answer, isFirstQuiz) => {
//         // --- First Quiz ---
//         if (isFirstQuiz) {
//           const existing = get().preQuizAnswers.find(
//             (a) => a.question === question.title
//           );

//           // اگر سوال از نوع image-choice یا multi-choice باشه، همیشه آرایه ذخیره کن
//           let formattedAnswer: string | string[] = answer;
//           if (
//             question.type === "multi-choice" ||
//             question.type === "image-choice"
//           ) {
//             formattedAnswer = Array.isArray(answer) ? answer : [answer].flat();
//           }

//           const updated = existing
//             ? get().preQuizAnswers.map((a) =>
//                 a.question === question.title
//                   ? { question: question.title, answer: formattedAnswer }
//                   : a
//               )
//             : [
//                 ...get().preQuizAnswers,
//                 { question: question.title, answer: formattedAnswer },
//               ];

//           set({ preQuizAnswers: updated });
//           console.log("Updated preQuizAnswers:", updated);
//           return;
//         }

//         // --- Main Quiz ---
//         const projectId = get().currentProjectId;
//         let currentProjectId = projectId ?? crypto.randomUUID();

//         // اگر پروژه وجود نداشت، ایجاد کن
//         let project = get().projects.find((p) => p.id === currentProjectId);
//         if (!project) {
//           const newProject: Project = {
//             id: currentProjectId,
//             name: `Project ${currentProjectId}`,
//             mainQuizAnswers: [],
//           };
//           set({
//             projects: [...get().projects, newProject],
//             currentProjectId,
//           });
//           project = newProject;
//         }

//         // جواب رو فرمت کن: آرایه برای multi-choice و image-choice
//         let formattedAnswer: string | string[] = answer;
//         if (
//           question.type === "multi-choice" ||
//           question.type === "image-choice"
//         ) {
//           formattedAnswer = Array.isArray(answer) ? answer : [answer].flat();
//         }

//         // اضافه یا به‌روزرسانی جواب
//         const existing = project.mainQuizAnswers.find(
//           (a) => a.question === question.title
//         );
//         const updatedAnswers = existing
//           ? project.mainQuizAnswers.map((a) =>
//               a.question === question.title
//                 ? { question: question.title, answer: formattedAnswer }
//                 : a
//             )
//           : [
//               ...project.mainQuizAnswers,
//               { question: question.title, answer: formattedAnswer },
//             ];

//         // پروژه‌ها را آپدیت کن
//         const updatedProjects = get().projects.map((p) =>
//           p.id === currentProjectId
//             ? { ...p, mainQuizAnswers: updatedAnswers }
//             : p
//         );

//         set({ projects: updatedProjects, currentProjectId });
//         console.log(
//           "Updated mainQuizAnswers for project:",
//           currentProjectId,
//           updatedAnswers
//         );
//       },

//       transferTempAnswersToProject: (projectId: string) => {
//         const project = get().projects.find((p) => p.id === projectId);
//         if (!project) return;

//         const updatedProject: Project = {
//           ...project,
//           mainQuizAnswers: [
//             ...project.mainQuizAnswers,
//             ...get().mainQuizAnswersTemp,
//           ],
//         };

//         set({
//           projects: get().projects.map((p) =>
//             p.id === projectId ? updatedProject : p
//           ),
//           mainQuizAnswersTemp: [],
//         });
//       },

//       addProject: (name: string) => {
//         const plan = get().subscribedPlan ?? "basic";
//         const limit = get().subscriptionLimits[plan];

//         if (get().projects.length >= limit) {
//           // Show error toast using the custom toast component
//           showErrorToast({
//             title: "Project Limit Reached",
//             description: `You have reached the maximum number of projects for the ${plan} plan (${limit})`,
//           });
//           return ""; // Prevent project creation
//         }
//         const id = crypto.randomUUID();
//         const newProject: Project = { id, name, mainQuizAnswers: [] };
//         set((state) => ({
//           projects: [...state.projects, newProject],
//           currentProjectId: id,
//           currentStepMainQuiz: 1,
//         }));
//         get().transferTempAnswersToProject(id);

//         return id;
//       },

//       removeProject: (id: string) => {
//         const projects = get().projects.filter((p) => p.id !== id);
//         const currentProjectId =
//           get().currentProjectId === id ? null : get().currentProjectId;
//         set({ projects, currentProjectId });
//       },

//       getCurrentAnswer: (questions, isFirstQuiz) => {
//         const step = isFirstQuiz
//           ? get().currentStepFirstQuiz
//           : get().currentStepMainQuiz;
//         const currentQuestion = questions[step - 1];
//         if (!currentQuestion) return null;

//         if (isFirstQuiz) {
//           return (
//             get().preQuizAnswers.find(
//               (a) => a.question === currentQuestion.title
//             )?.answer || null
//           );
//         } else {
//           const project = get().currentProjectId
//             ? get().projects.find((p) => p.id === get().currentProjectId)
//             : null;
//           return (
//             project?.mainQuizAnswers.find(
//               (a) => a.question === currentQuestion.title
//             )?.answer ||
//             get().mainQuizAnswersTemp.find(
//               (a) => a.question === currentQuestion.title
//             )?.answer ||
//             null
//           );
//         }
//       },

//       isContinueAllowed: (question, isFirstQuiz) => {
//         let answerEntry: Answer | undefined;
//         let project: Project | null | undefined = null; // تعریف project با مقدار اولیه null

//         if (isFirstQuiz) {
//           answerEntry = get().preQuizAnswers.find(
//             (a) => a.question === question.title
//           );
//         } else {
//           project = get().currentProjectId
//             ? get().projects.find((p) => p.id === get().currentProjectId)
//             : null;
//           answerEntry = project
//             ? project.mainQuizAnswers.find((a) => a.question === question.title)
//             : get().mainQuizAnswersTemp.find(
//                 (a) => a.question === question.title
//               );
//         }

//         if (!answerEntry || !answerEntry.answer) {
//           return false;
//         }

//         // Text input validation
//         if (question.type === "text-input") {
//           const answer = Array.isArray(answerEntry.answer)
//             ? answerEntry.answer.join("")
//             : answerEntry.answer.trim();
//           return emailRegex.test(answer) || usPhoneRegex.test(answer);
//         }

//         // Single-choice / Select validation
//         if (question.type === "single-choice" || question.type === "select") {
//           return (
//             !!answerEntry.answer && (answerEntry.answer as string).trim() !== ""
//           );
//         }

//         // Multi-choice or Image-choice validation
//         if (
//           question.type === "multi-choice" ||
//           question.type === "image-choice"
//         ) {
//           let answers: string[] = [];
//           if (Array.isArray(answerEntry.answer)) {
//             answers = answerEntry.answer;
//           } else {
//             answers = (answerEntry.answer as string)
//               .split(",")
//               .map((a) => a.trim())
//               .filter((a) => a);
//           }

//           const minSelected = question.validation.minSelected ?? 1;
//           const maxSelected = question.validation.maxSelected ?? Infinity;

//           return answers.length >= minSelected && answers.length <= maxSelected;
//         }

//         return true;
//       },

//       setRegistered: (value) => set({ isRegistered: value }),
//       setUserType: (value) => set({ userType: value }),
//       setProjects: (projects) => set({ projects }),
//       setCurrentProjectId: (id) => set({ currentProjectId: id }),

//       toggleSidebar: () =>
//         set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
//       toggleHelp: () => set({ isHelpOpen: !get().isHelpOpen }),

//       clearQuizData: () => {
//         set({
//           preQuizAnswers: [],
//           mainQuizAnswersTemp: [],
//           currentStepFirstQuiz: 1,
//           currentStepMainQuiz: 1,
//           projects: [],
//           currentProjectId: null,
//         });
//       },

//       syncFirstQuizWithServer: async () => {
//         const state = get();
//         const formattedPreQuizAnswers = state.preQuizAnswers.map((answer) => ({
//           question: answer.question,
//           answer: Array.isArray(answer.answer)
//             ? answer.answer
//             : [answer.answer],
//         }));

//         try {
//           const res = await axios.post("/api/saveFirstQuiz", {
//             preQuizAnswers: formattedPreQuizAnswers,
//             isRegistered: state.isRegistered,
//             userType: state.userType,
//           });
//           console.log("First Quiz synced:", res.data);
//         } catch (err) {
//           console.error("Error syncing First Quiz:", err);
//         }
//       },

//       syncMainQuizWithServer: async () => {
//         const state = get();
//         if (!state.currentProjectId) return;

//         const project = state.projects.find(
//           (p) => p.id === state.currentProjectId
//         );
//         if (!project) return;

//         const formattedMainQuizAnswers = project.mainQuizAnswers.map(
//           (answer) => ({
//             question: answer.question,
//             // answer: Array.isArray(answer.answer)
//             //   ? answer.answer.join(",")
//             //   : answer.answer,
//             answer: Array.isArray(answer.answer)
//               ? answer.answer
//               : [answer.answer],
//           })
//         );

//         try {
//           const res = await axios.post("/api/saveMainQuiz", {
//             mainQuizAnswers: formattedMainQuizAnswers,
//             currentProjectId: state.currentProjectId,
//             isRegistered: state.isRegistered,
//             userType: state.userType,
//           });
//           console.log("Main Quiz synced:", res.data);
//         } catch (err) {
//           console.error("Error syncing Main Quiz:", err);
//         }
//       },
//     }),
//     { name: "app-storage" }
//   )
// );

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axios from "axios";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

// export type PlanId = "basic" | "pro" | "enterprise";

// export interface Answer {
//   question: string;
//   answer: string | string[] | Record<string,string>;
// }

// export interface Project {
//   id: string;
//   name: string;
//   mainQuizAnswers: Answer[];
//   completed?: boolean;
//   description?: string;
//   updatedAt?: string;
// }

// export interface FieldItem {
//   label: string;
//   placeholder: string;
//   validation: {
//     required: boolean;
//     pattern?: string;
//     errorMessage?: string;
//   };
// }

// export interface ImageOption {
//   label: string;
//   imageUrl?: string;
// }

// export interface QuestionItem {
//   id: string;
//   type:
//     | "text"
//     | "number"
//     | "select"
//     | "checkbox"
//     | "radio"
//     | "button"
//     | "file"
//     | "image-choice";
//   title: string;
//   placeholder?: string;
//   hint?: string;
//   imageUrl?: string;
//   options?: Array<string | ImageOption>;
//   multiple?: boolean;
//   fields?: FieldItem[];
//   validation?: {
//     required?: boolean;
//     minSelected?: number;
//     maxSelected?: number;
//     minLength?: number;
//     maxLength?: number;
//     pattern?: string;
//     errorMessage?: string;
//     min?: number;
//     max?: number;
//     format?: "email" | "usPhone";
//   };
//   completed?: boolean;
// }

// export interface AppState {
//   currentStepFirstQuiz: number;
//   currentStepMainQuiz: number;
//   preQuizAnswers: Answer[];
//   mainQuizAnswersTemp: Answer[];
//   isRegistered: boolean;
//   userType: string;
//   projects: Project[];
//   currentProjectId: string | null;
//   isSidebarOpen: boolean;
//   isHelpOpen: boolean;
//   loginMethod: "manual" | "google" | "apple" | null;
//   userName: string;
//   userEmail: string;
//   userAvatar: string;
//   subscribedPlan: PlanId | null;
//   subscriptionLimits: { [key in PlanId]: number };

//   closeSidebar: () => void;
//   subscribePlan: (plan: PlanId) => void;
//   cancelSubscription: () => void;

//   setUserAvatar: (avatar: string) => void;
//   setUserName: (name: string) => void;
//   setUserEmail: (email: string) => void;

//   setCurrentStepFirstQuiz: (step: number) => void;
//   setCurrentStepMainQuiz: (step: number) => void;
//   setAnswer: (
//     question: QuestionItem,
//     answer: string | string[] | Record<string, string>,
//     isFirstQuiz: boolean
//   ) => void;
//   addProject: (name: string) => string;
//   removeProject: (id: string) => void;
//   transferTempAnswersToProject: (projectId: string) => void;
//   getCurrentAnswer: (
//     questions: QuestionItem[],
//     isFirstQuiz: boolean
//   ) => string | string[] | Record<string, string> | null;
//   isContinueAllowed: (question: QuestionItem, isFirstQuiz: boolean) => boolean;
//   setRegistered: (value: boolean) => void;
//   setUserType: (value: string) => void;
//   setProjects: (projects: Project[]) => void;
//   setCurrentProjectId: (id: string | null) => void;
//   toggleSidebar: () => void;
//   toggleHelp: () => void;
//   setLoginMethod: (method: AppState["loginMethod"]) => void;
//   syncFirstQuizWithServer: () => Promise<void>;
//   syncMainQuizWithServer: () => Promise<void>;
//   clearQuizData: () => void;
// }

// export const useAppStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       currentStepFirstQuiz: 1,
//       currentStepMainQuiz: 1,
//       preQuizAnswers: [],
//       mainQuizAnswersTemp: [],
//       isRegistered: false,
//       userType: "",
//       projects: [],
//       currentProjectId: null,
//       isSidebarOpen: false,
//       isHelpOpen: false,
//       loginMethod: null,
//       userName: "",
//       userEmail: "",
//       userAvatar: "",
//       subscribedPlan: null,
//       subscriptionLimits: {
//         basic: 3,
//         pro: 5,
//         enterprise: Number.POSITIVE_INFINITY,
//       },

//       closeSidebar: () => set({ isSidebarOpen: false }),
//       subscribePlan: (plan: PlanId) => set({ subscribedPlan: plan }),
//       cancelSubscription: () => set({ subscribedPlan: null }),
//       setUserAvatar: (avatar: string) => set({ userAvatar: avatar }),
//       setUserName: (name: string) => set({ userName: name }),
//       setUserEmail: (email: string) => set({ userEmail: email }),
//       setLoginMethod: (method) => set({ loginMethod: method }),
//       setCurrentStepFirstQuiz: (step) => set({ currentStepFirstQuiz: step }),
//       setCurrentStepMainQuiz: (step) => set({ currentStepMainQuiz: step }),

//       setAnswer: (question, answer, isFirstQuiz) => {
//         // پاک کردن پاسخ نامعتبر یا خالی
//         if (
//           answer === "" ||
//           answer === null ||
//           (Array.isArray(answer) && answer.length === 0) ||
//           (typeof answer === "object" &&
//             !Array.isArray(answer) &&
//             Object.keys(answer).length === 0)
//         ) {
//           if (isFirstQuiz) {
//             set({
//               preQuizAnswers: get().preQuizAnswers.filter(
//                 (a) => a.question !== question.title
//               ),
//             });
//           } else {
//             if (get().currentProjectId) {
//               const updatedProjects = get().projects.map((p) =>
//                 p.id === get().currentProjectId
//                   ? {
//                       ...p,
//                       mainQuizAnswers: p.mainQuizAnswers.filter(
//                         (a) => a.question !== question.title
//                       ),
//                     }
//                   : p
//               );
//               set({ projects: updatedProjects });
//             } else {
//               set({
//                 mainQuizAnswersTemp: get().mainQuizAnswersTemp.filter(
//                   (a) => a.question !== question.title
//                 ),
//               });
//             }
//           }
//           return;
//         }

//         if (isFirstQuiz) {
//           const existing = get().preQuizAnswers.find(
//             (a) => a.question === question.title
//           );
//           // let formattedAnswer: string | string[] | Record<string, string> = answer;
//           // if (
//           //   question.type === "checkbox" ||
//           //   question.type === "image-choice"
//           // ) {
//           //   formattedAnswer = Array.isArray(answer) ? answer : [answer].flat();
//           // }
//           let formattedAnswer: string | string[] | Record<string, string>;

//           if (
//             question.fields &&
//             typeof answer === "object" &&
//             !Array.isArray(answer)
//           ) {
//             // سوال چند فیلدی -> تبدیل به Record<string, string>
//             formattedAnswer = answer as Record<string, string>;
//           } else if (
//             question.type === "checkbox" ||
//             question.type === "image-choice"
//           ) {
//             // سوال چندگزینه‌ای -> همیشه آرایه
//             formattedAnswer = Array.isArray(answer)
//               ? answer
//               : ([answer].flat() as string[]);
//           } else {
//             // سایر موارد -> string یا string[]
//             formattedAnswer = answer as string | string[];
//           }

//           const updated = existing
//             ? get().preQuizAnswers.map((a) =>
//                 a.question === question.title
//                   ? { question: question.title, answer: formattedAnswer }
//                   : a
//               )
//             : [
//                 ...get().preQuizAnswers,
//                 { question: question.title, answer: formattedAnswer },
//               ];
//           set({ preQuizAnswers: updated });
//           return;
//         }

//         // --- Main Quiz ---
//         const projectId = get().currentProjectId ?? crypto.randomUUID();
//         let project = get().projects.find((p) => p.id === projectId);
//         if (!project) {
//           const newProject: Project = {
//             id: projectId,
//             name: `Project ${projectId}`,
//             mainQuizAnswers: [],
//           };
//           set({
//             projects: [...get().projects, newProject],
//             currentProjectId: projectId,
//           });
//           project = newProject;
//         }

//         // let formattedAnswer: string | string[] | Record<string, string> =
//         //   answer;
//         // if (question.type === "checkbox" || question.type === "image-choice") {
//         //   formattedAnswer = Array.isArray(answer) ? answer : [answer].flat();
//         // }

//         let formattedAnswer: string | string[] | Record<string, string> =
//           answer;

//         if (question.fields) {
//           // سوال چندفیلدی -> پاسخ باید Record<string, string> باشد
//           formattedAnswer = answer as Record<string, string>;
//         } else if (
//           question.type === "checkbox" ||
//           question.type === "image-choice"
//         ) {
//           // سوال چندگزینه‌ای -> پاسخ باید string[]
//           if (Array.isArray(answer)) {
//             formattedAnswer = answer as string[];
//           } else {
//             formattedAnswer = [answer as string].flat();
//           }
//         } else {
//           // سایر انواع -> string یا string[]
//           formattedAnswer = answer as string | string[];
//         }

//         const existing = project.mainQuizAnswers.find(
//           (a) => a.question === question.title
//         );
//         const updatedAnswers = existing
//           ? project.mainQuizAnswers.map((a) =>
//               a.question === question.title
//                 ? { question: question.title, answer: formattedAnswer }
//                 : a
//             )
//           : [
//               ...project.mainQuizAnswers,
//               { question: question.title, answer: formattedAnswer },
//             ];

//         const updatedProjects = get().projects.map((p) =>
//           p.id === projectId ? { ...p, mainQuizAnswers: updatedAnswers } : p
//         );
//         set({ projects: updatedProjects, currentProjectId: projectId });
//       },

//       isContinueAllowed: (question, isFirstQuiz) => {
//         const state = get();

//         let answerEntry: Answer | undefined;
//         if (isFirstQuiz) {
//           answerEntry = state.preQuizAnswers.find(
//             (a) => a.question === question.title
//           );
//         } else {
//           const project = state.currentProjectId
//             ? state.projects.find((p) => p.id === state.currentProjectId)
//             : null;
//           answerEntry = project
//             ? project.mainQuizAnswers.find((a) => a.question === question.title)
//             : state.mainQuizAnswersTemp.find(
//                 (a) => a.question === question.title
//               );
//         }

//         if (
//           !answerEntry ||
//           answerEntry.answer === null ||
//           answerEntry.answer === undefined
//         )
//           return false;

//         const raw = answerEntry.answer;
//         const toString = (v: any) =>
//           Array.isArray(v) ? v.join("") : String(v);
//         const trimmed = (s: string) => s.trim();

//         // --- Text type ---
//         if (question.type === "text") {
//           if (
//             question.fields &&
//             typeof raw === "object" &&
//             !Array.isArray(raw)
//           ) {
//             // سوال با فیلدهای چندگانه
//             return question.fields.every((field) => {
//               const value = trimmed(raw[field.label] || "");
//               if (!value) return false;
//               if (
//                 field.validation?.pattern &&
//                 !new RegExp(field.validation.pattern).test(value)
//               )
//                 return false;
//               return true;
//             });
//           } else {
//             const value = trimmed(toString(raw));
//             const minLength = question.validation?.minLength ?? 5;
//             if (
//               question.validation?.pattern &&
//               !new RegExp(question.validation.pattern).test(value)
//             )
//               return false;
//             return value.length >= minLength;
//           }
//         }

//         // --- Number ---
//         if (question.type === "number") {
//           const num = Number(toString(raw));
//           if (Number.isNaN(num)) return false;
//           if (
//             question.validation?.min !== undefined &&
//             num < question.validation.min
//           )
//             return false;
//           if (
//             question.validation?.max !== undefined &&
//             num > question.validation.max
//           )
//             return false;
//           return true;
//         }

//         // --- Select / Radio / Button ---
//         if (["select", "radio", "button"].includes(question.type)) {
//           return Array.isArray(raw)
//             ? raw.length > 0
//             : trimmed(toString(raw)).length > 0;
//         }

//         // --- Checkbox / Image-choice ---
//         if (["checkbox", "image-choice"].includes(question.type)) {
//           const answers = Array.isArray(raw)
//             ? raw.map((a) => trimmed(String(a))).filter(Boolean)
//             : String(raw)
//                 .split(",")
//                 .map((a) => trimmed(a))
//                 .filter(Boolean);
//           const minSelected = question.validation?.minSelected ?? 1;
//           const maxSelected =
//             question.validation?.maxSelected ?? Number.POSITIVE_INFINITY;
//           return answers.length >= minSelected && answers.length <= maxSelected;
//         }

//         // --- File ---
//         if (question.type === "file") {
//           return Array.isArray(raw)
//             ? raw.length > 0
//             : trimmed(toString(raw)).length > 0;
//         }

//         return false;
//       },

//       transferTempAnswersToProject: (projectId) => {
//         const project = get().projects.find((p) => p.id === projectId);
//         if (!project) return;
//         const updatedProject: Project = {
//           ...project,
//           mainQuizAnswers: [
//             ...project.mainQuizAnswers,
//             ...get().mainQuizAnswersTemp,
//           ],
//         };
//         set({
//           projects: get().projects.map((p) =>
//             p.id === projectId ? updatedProject : p
//           ),
//           mainQuizAnswersTemp: [],
//         });
//       },

//       addProject: (name) => {
//         const plan = get().subscribedPlan ?? "basic";
//         const limit = get().subscriptionLimits[plan];
//         if (get().projects.length >= limit) {
//           showErrorToast({
//             title: "Project Limit Reached",
//             description: `You have reached the maximum number of projects for the ${plan} plan (${limit})`,
//           });
//           return "";
//         }
//         const id = crypto.randomUUID();
//         const newProject: Project = { id, name, mainQuizAnswers: [] };
//         set((state) => ({
//           projects: [...state.projects, newProject],
//           currentProjectId: id,
//           currentStepMainQuiz: 1,
//           mainQuizAnswersTemp: [],
//         }));
//         return id;
//       },

//       removeProject: (id) => {
//         const projects = get().projects.filter((p) => p.id !== id);
//         const currentProjectId =
//           get().currentProjectId === id ? null : get().currentProjectId;
//         set({
//           projects,
//           currentProjectId,
//           mainQuizAnswersTemp:
//             get().currentProjectId === id ? [] : get().mainQuizAnswersTemp,
//         });
//       },

//       getCurrentAnswer: (questions, isFirstQuiz) => {
//         const step = isFirstQuiz
//           ? get().currentStepFirstQuiz
//           : get().currentStepMainQuiz;
//         const currentQuestion = questions[step - 1];
//         if (!currentQuestion) return null;

//         if (isFirstQuiz) {
//           return (
//             get().preQuizAnswers.find(
//               (a) => a.question === currentQuestion.title
//             )?.answer || null
//           );
//         } else {
//           const project = get().currentProjectId
//             ? get().projects.find((p) => p.id === get().currentProjectId)
//             : null;
//           return (
//             project?.mainQuizAnswers.find(
//               (a) => a.question === currentQuestion.title
//             )?.answer ||
//             get().mainQuizAnswersTemp.find(
//               (a) => a.question === currentQuestion.title
//             )?.answer ||
//             null
//           );
//         }
//       },

//       setRegistered: (value) => set({ isRegistered: value }),
//       setUserType: (value) => set({ userType: value }),
//       setProjects: (projects) => set({ projects }),
//       setCurrentProjectId: (id) => set({ currentProjectId: id }),
//       toggleSidebar: () =>
//         set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
//       toggleHelp: () => set({ isHelpOpen: !get().isHelpOpen }),
//       clearQuizData: () =>
//         set({
//           preQuizAnswers: [],
//           mainQuizAnswersTemp: [],
//           currentStepFirstQuiz: 1,
//           currentStepMainQuiz: 1,
//           projects: [],
//           currentProjectId: null,
//         }),

//       syncFirstQuizWithServer: async () => {
//         const state = get();
//         const formattedPreQuizAnswers = state.preQuizAnswers.map((answer) => ({
//           question: answer.question,
//           answer: Array.isArray(answer.answer)
//             ? answer.answer
//             : [answer.answer],
//         }));
//         try {
//           const res = await axios.post("/api/saveFirstQuiz", {
//             preQuizAnswers: formattedPreQuizAnswers,
//             isRegistered: state.isRegistered,
//             userType: state.userType,
//           });
//           console.log("First Quiz synced:", res.data);
//         } catch (err) {
//           console.error("Error syncing First Quiz:", err);
//         }
//       },

//       syncMainQuizWithServer: async () => {
//         const state = get();
//         if (!state.currentProjectId) return;
//         const project = state.projects.find(
//           (p) => p.id === state.currentProjectId
//         );
//         if (!project) return;
//         const formattedMainQuizAnswers = project.mainQuizAnswers.map(
//           (answer) => ({
//             question: answer.question,
//             answer: Array.isArray(answer.answer)
//               ? answer.answer
//               : [answer.answer],
//           })
//         );
//         try {
//           const res = await axios.post("/api/saveMainQuiz", {
//             mainQuizAnswers: formattedMainQuizAnswers,
//             currentProjectId: state.currentProjectId,
//             isRegistered: state.isRegistered,
//             userType: state.userType,
//           });
//           console.log("Main Quiz synced:", res.data);
//         } catch (err) {
//           console.error("Error syncing Main Quiz:", err);
//         }
//       },
//     }),
//     { name: "app-storage" }
//   )
// );



// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import axios from 'axios';
// import { showErrorToast } from '@/components/modules/toasts/ErrorToast';
// import firstQuestion from '@/data/firstQuestion.json';
// import mainQuizData from '@/data/mainQuizData.json';

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

// export type PlanId = 'basic' | 'pro' | 'enterprise';

// export interface Answer {
//   question: string;
//   answer: string | string[] | Record<string, string>;
// }

// export interface Project {
//   id: string;
//   name: string;
//   mainQuizAnswers: Answer[];
//   completed?: boolean;
//   description?: string;
//   updatedAt?: string;
// }

// export interface FieldItem {
//   label: string;
//   placeholder: string;
//   hint?: string;
//   validation: {
//     required: boolean;
//     pattern?: string;
//     errorMessage?: string;
//     format?: 'email' | 'usPhone';
//     min?: number;
//     max?: number;
//   };
// }

// export interface ImageOption {
//   label: string;
//   imageUrl?: string;
// }

// export interface QuestionItem {
//   id: string;
//   type:
//     | 'text'
//     | 'number'
//     | 'select'
//     | 'checkbox'
//     | 'radio'
//     | 'button'
//     | 'file'
//     | 'image-choice';
//   title: string;
//   placeholder?: string;
//   hint?: string;
//   imageUrl?: string;
//   options?: Array<string | ImageOption>;
//   multiple?: boolean;
//   fields?: FieldItem[];
//   validation?: {
//     required?: boolean;
//     minSelected?: number;
//     maxSelected?: number;
//     minLength?: number;
//     maxLength?: number;
//     pattern?: string;
//     errorMessage?: string;
//     min?: number;
//     max?: number;
//     step?: number;
//     units?: string[];
//     format?: 'email' | 'usPhone';
//   };
//   completed?: boolean;
// }

// export interface AppState {
//   currentStepFirstQuiz: number;
//   currentStepMainQuiz: number;
//   preQuizAnswers: Answer[];
//   mainQuizAnswersTemp: Answer[];
//   isRegistered: boolean;
//   userType: string;
//   projects: Project[];
//   currentProjectId: string | null;
//   isSidebarOpen: boolean;
//   isHelpOpen: boolean;
//   loginMethod: 'manual' | 'google' | 'apple' | null;
//   userName: string;
//   userEmail: string;
//   userAvatar: string;
//   subscribedPlan: PlanId | null;
//   subscriptionLimits: { [key in PlanId]: number };
//   questions: QuestionItem[];

//   closeSidebar: () => void;
//   subscribePlan: (plan: PlanId) => void;
//   cancelSubscription: () => void;
//   setUserAvatar: (avatar: string) => void;
//   setUserName: (name: string) => void;
//   setUserEmail: (email: string) => void;
//   setCurrentStepFirstQuiz: (step: number) => void;
//   setCurrentStepMainQuiz: (step: number) => void;
//   setAnswer: (
//     question: QuestionItem,
//     answer: string | string[] | Record<string, string>,
//     isFirstQuiz: boolean
//   ) => void;
//   addProject: (name: string) => string;
//   removeProject: (id: string) => void;
//   transferTempAnswersToProject: (projectId: string) => void;
//   getCurrentAnswer: (
//     questions: QuestionItem[],
//     isFirstQuiz: boolean
//   ) => string | string[] | Record<string, string> | null;
//   isContinueAllowed: (question: QuestionItem | null, isFirstQuiz: boolean) => boolean;
//   setRegistered: (value: boolean) => void;
//   setUserType: (value: string) => void;
//   setProjects: (projects: Project[]) => void;
//   setCurrentProjectId: (id: string | null) => void;
//   toggleSidebar: () => void;
//   toggleHelp: () => void;
//   setLoginMethod: (method: AppState['loginMethod']) => void;
//   syncFirstQuizWithServer: () => Promise<void>;
//   syncMainQuizWithServer: () => Promise<void>;
//   clearQuizData: () => void;
//   setQuestions: (questions: QuestionItem[]) => void;
// }

// export const useAppStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       currentStepFirstQuiz: 1,
//       currentStepMainQuiz: 1,
//       preQuizAnswers: [],
//       mainQuizAnswersTemp: [],
//       isRegistered: false,
//       userType: '',
//       projects: [],
//       currentProjectId: null,
//       isSidebarOpen: false,
//       isHelpOpen: false,
//       loginMethod: null,
//       userName: '',
//       userEmail: '',
//       userAvatar: '',
//       subscribedPlan: null,
//       subscriptionLimits: {
//         basic: 3,
//         pro: 5,
//         enterprise: Number.POSITIVE_INFINITY,
//       },
//       questions: [],

//       closeSidebar: () => set({ isSidebarOpen: false }),
//       subscribePlan: (plan: PlanId) => set({ subscribedPlan: plan }),
//       cancelSubscription: () => set({ subscribedPlan: null }),
//       setUserAvatar: (avatar: string) => set({ userAvatar: avatar }),
//       setUserName: (name: string) => set({ userName: name }),
//       setUserEmail: (email: string) => set({ userEmail: email }),
//       setLoginMethod: (method) => set({ loginMethod: method }),
//       setCurrentStepFirstQuiz: (step) => set({ currentStepFirstQuiz: step }),
//       setCurrentStepMainQuiz: (step) => set({ currentStepMainQuiz: step }),
//       setQuestions: (questions) => set({ questions }),

//       setAnswer: (question, answer, isFirstQuiz) => {
//         if (
//           answer === '' ||
//           answer === null ||
//           (Array.isArray(answer) && answer.length === 0) ||
//           (typeof answer === 'object' && !Array.isArray(answer) && Object.keys(answer).length === 0)
//         ) {
//           if (isFirstQuiz) {
//             set({
//               preQuizAnswers: get().preQuizAnswers.filter((a) => a.question !== question.title),
//             });
//           } else {
//             if (get().currentProjectId) {
//               const updatedProjects = get().projects.map((p) =>
//                 p.id === get().currentProjectId
//                   ? {
//                       ...p,
//                       mainQuizAnswers: p.mainQuizAnswers.filter(
//                         (a) => a.question !== question.title
//                       ),
//                     }
//                   : p
//               );
//               set({ projects: updatedProjects });
//             } else {
//               set({
//                 mainQuizAnswersTemp: get().mainQuizAnswersTemp.filter(
//                   (a) => a.question !== question.title
//                 ),
//               });
//             }
//           }
//           return;
//         }

//         let formattedAnswer: string | string[] | Record<string, string> = answer;
//         if (question.type === 'number') {
//           formattedAnswer = typeof answer === 'object' && 'value' in answer
//             ? `${answer.value} ${answer.unit || 'm'}`
//             : String(answer);
//         } else if (question.fields) {
//           formattedAnswer = answer as Record<string, string>;
//         } else if (question.type === 'checkbox' || question.type === 'image-choice') {
//           formattedAnswer = Array.isArray(answer) ? answer : [String(answer)];
//         }

//         if (isFirstQuiz) {
//           const existing = get().preQuizAnswers.find((a) => a.question === question.title);
//           const updated = existing
//             ? get().preQuizAnswers.map((a) =>
//                 a.question === question.title
//                   ? { question: question.title, answer: formattedAnswer }
//                   : a
//               )
//             : [...get().preQuizAnswers, { question: question.title, answer: formattedAnswer }];
//           set({ preQuizAnswers: updated });
//         } else {
//           const projectId = get().currentProjectId ?? crypto.randomUUID();
//           let project = get().projects.find((p) => p.id === projectId);
//           if (!project) {
//             const newProject: Project = {
//               id: projectId,
//               name: `Project ${projectId}`,
//               mainQuizAnswers: [],
//             };
//             set({
//               projects: [...get().projects, newProject],
//               currentProjectId: projectId,
//             });
//             project = newProject;
//           }

//           const existing = project.mainQuizAnswers.find((a) => a.question === question.title);
//           const updatedAnswers = existing
//             ? project.mainQuizAnswers.map((a) =>
//                 a.question === question.title
//                   ? { question: question.title, answer: formattedAnswer }
//                   : a
//               )
//             : [...project.mainQuizAnswers, { question: question.title, answer: formattedAnswer }];

//           const updatedProjects = get().projects.map((p) =>
//             p.id === projectId ? { ...p, mainQuizAnswers: updatedAnswers } : p
//           );
//           set({ projects: updatedProjects, currentProjectId: projectId });
//         }
//       },

//       isContinueAllowed: (question, isFirstQuiz) => {
//         if (!question) return false;

//         const state = get();
//         let answerEntry: Answer | undefined;
//         if (isFirstQuiz) {
//           answerEntry = state.preQuizAnswers.find((a) => a.question === question.title);
//         } else {
//           const project = state.currentProjectId
//             ? state.projects.find((p) => p.id === state.currentProjectId)
//             : null;
//           answerEntry = project
//             ? project.mainQuizAnswers.find((a) => a.question === question.title)
//             : state.mainQuizAnswersTemp.find((a) => a.question === question.title);
//         }

//         if (!answerEntry || !answerEntry.answer) return false;

//         const raw = answerEntry.answer;
//         const toString = (v: any) => (Array.isArray(v) ? v.join('') : String(v));
//         const trimmed = (s: string) => s.trim();

//         if (question.type === 'text') {
//           if (question.fields && typeof raw === 'object' && !Array.isArray(raw)) {
//             return question.fields.every((field) => {
//               const value = trimmed(raw[field.label] || '');
//               if (field.validation.required && !value) return false;
//               if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value))
//                 return false;
//               if (field.validation.format === 'email' && !emailRegex.test(value))
//                 return false;
//               if (field.validation.format === 'usPhone' && !usPhoneRegex.test(value))
//                 return false;
//               return true;
//             });
//           } else {
//             const value = trimmed(toString(raw));
//             const minLength = question.validation?.minLength ?? 0;
//             if (question.validation?.required && !value) return false;
//             if (question.validation?.pattern && !new RegExp(question.validation.pattern).test(value))
//               return false;
//             if (question.validation?.format === 'email' && !emailRegex.test(value))
//               return false;
//             if (question.validation?.format === 'usPhone' && !usPhoneRegex.test(value))
//               return false;
//             return value.length >= minLength;
//           }
//         }

//         if (question.type === 'number') {
//           const value = typeof raw === 'string' ? parseFloat(raw.split(' ')[0]) : Number(raw);
//           if (isNaN(value)) return false;
//           if (question.validation?.min !== undefined && value < question.validation.min)
//             return false;
//           if (question.validation?.max !== undefined && value > question.validation.max)
//             return false;
//           return true;
//         }

//         if (['select', 'radio', 'button'].includes(question.type)) {
//           return Array.isArray(raw) ? raw.length > 0 : trimmed(toString(raw)).length > 0;
//         }

//         if (['checkbox', 'image-choice'].includes(question.type)) {
//           const answers = Array.isArray(raw)
//             ? raw.map((a) => trimmed(String(a))).filter(Boolean)
//             : trimmed(toString(raw)).split(',').map((a) => trimmed(a)).filter(Boolean);
//           const minSelected = question.validation?.minSelected ?? 1;
//           const maxSelected = question.validation?.maxSelected ?? Number.POSITIVE_INFINITY;
//           return answers.length >= minSelected && answers.length <= maxSelected;
//         }

//         if (question.type === 'file') {
//           return Array.isArray(raw) ? raw.length > 0 : trimmed(toString(raw)).length > 0;
//         }

//         return false;
//       },

//       transferTempAnswersToProject: (projectId) => {
//         const project = get().projects.find((p) => p.id === projectId);
//         if (!project) return;
//         const updatedProject: Project = {
//           ...project,
//           mainQuizAnswers: [...project.mainQuizAnswers, ...get().mainQuizAnswersTemp],
//         };
//         set({
//           projects: get().projects.map((p) => (p.id === projectId ? updatedProject : p)),
//           mainQuizAnswersTemp: [],
//         });
//       },

//       addProject: (name) => {
//         const plan = get().subscribedPlan ?? 'basic';
//         const limit = get().subscriptionLimits[plan];
//         if (get().projects.length >= limit) {
//           showErrorToast({
//             title: 'Project Limit Reached',
//             description: `You have reached the maximum number of projects for the ${plan} plan (${limit})`,
//           });
//           return '';
//         }
//         const id = crypto.randomUUID();
//         const newProject: Project = { id, name, mainQuizAnswers: [] };
//         set((state) => ({
//           projects: [...state.projects, newProject],
//           currentProjectId: id,
//           currentStepMainQuiz: 1,
//           mainQuizAnswersTemp: [],
//         }));
//         return id;
//       },

//       removeProject: (id) => {
//         const projects = get().projects.filter((p) => p.id !== id);
//         const currentProjectId = get().currentProjectId === id ? null : get().currentProjectId;
//         set({
//           projects,
//           currentProjectId,
//           mainQuizAnswersTemp: get().currentProjectId === id ? [] : get().mainQuizAnswersTemp,
//         });
//       },

//       getCurrentAnswer: (questions, isFirstQuiz) => {
//         const step = isFirstQuiz ? get().currentStepFirstQuiz : get().currentStepMainQuiz;
//         const currentQuestion = questions[step - 1];
//         if (!currentQuestion) return null;

//         if (isFirstQuiz) {
//           return (
//             get().preQuizAnswers.find((a) => a.question === currentQuestion.title)?.answer || null
//           );
//         } else {
//           const project = get().currentProjectId
//             ? get().projects.find((p) => p.id === get().currentProjectId)
//             : null;
//           return (
//             project?.mainQuizAnswers.find((a) => a.question === currentQuestion.title)?.answer ||
//             get().mainQuizAnswersTemp.find((a) => a.question === currentQuestion.title)?.answer ||
//             null
//           );
//         }
//       },

//       setRegistered: (value) => set({ isRegistered: value }),
//       setUserType: (value) => set({ userType: value }),
//       setProjects: (projects) => set({ projects }),
//       setCurrentProjectId: (id) => set({ currentProjectId: id }),
//       toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
//       toggleHelp: () => set({ isHelpOpen: !get().isHelpOpen }),
//       clearQuizData: () =>
//         set({
//           preQuizAnswers: [],
//           mainQuizAnswersTemp: [],
//           currentStepFirstQuiz: 1,
//           currentStepMainQuiz: 1,
//           projects: [],
//           currentProjectId: null,
//         }),

//       syncFirstQuizWithServer: async () => {
//         const state = get();
//         const formattedPreQuizAnswers = state.preQuizAnswers.map((answer) => ({
//           question: answer.question,
//           answer: Array.isArray(answer.answer)
//             ? answer.answer
//             : typeof answer.answer === 'object'
//             ? Object.values(answer.answer)
//             : [answer.answer],
//         }));
//         try {
//           const res = await axios.post('/api/saveFirstQuiz', {
//             preQuizAnswers: formattedPreQuizAnswers,
//             isRegistered: state.isRegistered,
//             userType: state.userType,
//           });
//           console.log('First Quiz synced:', res.data);
//         } catch (err) {
//           console.error('Error syncing First Quiz:', err);
//         }
//       },

//       syncMainQuizWithServer: async () => {
//         const state = get();
//         if (!state.currentProjectId) return;
//         const project = state.projects.find((p) => p.id === state.currentProjectId);
//         if (!project) return;
//         const formattedMainQuizAnswers = project.mainQuizAnswers.map((answer) => ({
//           question: answer.question,
//           answer: Array.isArray(answer.answer)
//             ? answer.answer
//             : typeof answer.answer === 'object'
//             ? Object.values(answer.answer)
//             : [answer.answer],
//         }));
//         try {
//           const res = await axios.post('/api/saveMainQuiz', {
//             mainQuizAnswers: formattedMainQuizAnswers,
//             currentProjectId: state.currentProjectId,
//             isRegistered: state.isRegistered,
//             userType: state.userType,
//           });
//           console.log('Main Quiz synced:', res.data);
//         } catch (err) {
//           console.error('Error syncing Main Quiz:', err);
//         }
//       },
//     }),
//     { name: 'app-storage' }
//   )
// );

// /store/useAppStore.ts
// "use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axios from "axios";
// import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

// // Validation regex
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

// // --- Types ---
// export type AnswerValue = string | string[] | Record<string, string>;

// export type Answer = {
//   question: string;
//   answer: AnswerValue;
// };

//   export interface ImageOption {
//     label: string;
//     imageUrl?: string;
//   }

// export interface StoredAnswer {
//   questionId: string;
//   questionTitle: string;
//   answer: AnswerValue;
// }

// export interface Project {
//   id: string;
//   name: string;
//   mainQuizAnswers: StoredAnswer[]; // answers for that project
//   completed?: boolean;
//   description?: string;
//   updatedAt?: string;
// }

// export interface FieldItem {
//   label: string;
//   placeholder?: string;
//   hint?: string;
//   validation?: {
//     required?: boolean;
//     pattern?: string;
//     errorMessage?: string;
//     format?: "email" | "usPhone";
//     min?: number;
//     max?: number;
//   };
// }

// export interface QuestionItem {
//   id: string;
//   title: string;
//   type:
//     | "text"
//     | "number"
//     | "select"
//     | "checkbox"
//     | "radio"
//     | "button"
//     | "file"
//     | "image-choice";
//   placeholder?: string;
//   hint?: string;
//   imageUrl?: string;
//   options?: Array<string | { label: string; imageUrl?: string }>;
//   multiple?: boolean;
//   fields?: FieldItem[];
//   validation?: {
//     required?: boolean;
//     minSelected?: number;
//     maxSelected?: number;
//     minLength?: number;
//     maxLength?: number;
//     pattern?: string;
//     errorMessage?: string;
//     min?: number;
//     max?: number;
//     step?: number;
//     units?: string[];
//     format?: "email" | "usPhone";
//   };
//   completed?: boolean;
// }

// // --- App state type ---
// export interface AppState {
//   // steps
//   currentStepFirstQuiz: number;
//   currentStepMainQuiz: number;

//   // answers
//   preQuizAnswers: StoredAnswer[]; // stored by questionId + questionTitle
//   preQuizCompleted: boolean; // if true -> first quiz asked and saved (won't re-ask unless cleared)
//   mainQuizAnswersTemp: StoredAnswer[]; // temporary answers if no project selected

//   // projects
//   projects: Project[];
//   currentProjectId: string | null;

//   // user, UI
//   isRegistered: boolean;
//   userType: string;
//   isSidebarOpen: boolean;
//   isHelpOpen: boolean;
//   loginMethod: "manual" | "google" | "apple" | null;
//   userName: string;
//   userEmail: string;
//   userAvatar: string;
//   subscribedPlan: "basic" | "pro" | "enterprise" | null;
//   subscriptionLimits: { [key: string]: number };

//   // questions metadata (optional)
//   questions: QuestionItem[];

//   // actions
//   closeSidebar: () => void;
//   toggleSidebar: () => void;
//   toggleHelp: () => void;

//   setUserAvatar: (avatar: string) => void;
//   setUserName: (name: string) => void;
//   setUserEmail: (email: string) => void;
//   setLoginMethod: (m: AppState["loginMethod"]) => void;

//   setCurrentStepFirstQuiz: (step: number) => void;
//   setCurrentStepMainQuiz: (step: number) => void;

//   // core: set/get answers
//   setAnswer: (
//     question: QuestionItem,
//     answer: AnswerValue,
//     isFirstQuiz: boolean
//   ) => void;
//   getAnswerForQuestion: (
//     questionId: string,
//     isFirstQuiz: boolean
//   ) => AnswerValue | null;
//   getCurrentAnswer: (questions: QuestionItem[], isFirstQuiz: boolean) => AnswerValue | null;

//   // flow control
//   isContinueAllowed: (question: QuestionItem | null, isFirstQuiz: boolean) => boolean;
//   setRegistered: (v: boolean) => void;
//   setUserType: (v: string) => void;
//   setProjects: (projects: Project[]) => void;
//   setCurrentProjectId: (id: string | null) => void;
//   clearQuizData: () => void;
//   addProject: (name: string) => string;
//   removeProject: (id: string) => void;
//   transferTempAnswersToProject: (projectId: string) => void;

//   // sync
//   syncFirstQuizWithServer: () => Promise<void>;
//   syncMainQuizWithServer: () => Promise<void>;

//   // set questions metadata
//   setQuestions: (questions: QuestionItem[]) => void;
// }

// // --- Helpers ---
// const isEmptyAnswer = (value: AnswerValue | null | undefined) => {
//   if (value === null || value === undefined) return true;
//   if (typeof value === "string") return value.trim() === "";
//   if (Array.isArray(value)) return value.length === 0;
//   if (typeof value === "object") return Object.keys(value).length === 0;
//   return false;
// };

// // --- Store ---
// export const useAppStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       // initial
//       currentStepFirstQuiz: 1,
//       currentStepMainQuiz: 1,
//       preQuizAnswers: [],
//       preQuizCompleted: false,
//       mainQuizAnswersTemp: [],
//       projects: [],
//       currentProjectId: null,
//       isRegistered: false,
//       userType: "",
//       isSidebarOpen: false,
//       isHelpOpen: false,
//       loginMethod: null,
//       userName: "",
//       userEmail: "",
//       userAvatar: "",
//       subscribedPlan: null,
//       subscriptionLimits: { basic: 3, pro: 5, enterprise: Number.POSITIVE_INFINITY },
//       questions: [],

//       // UI actions
//       closeSidebar: () => set({ isSidebarOpen: false }),
//       toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
//       toggleHelp: () => set((s) => ({ isHelpOpen: !s.isHelpOpen })),

//       setUserAvatar: (avatar) => set({ userAvatar: avatar }),
//       setUserName: (name) => set({ userName: name }),
//       setUserEmail: (email) => set({ userEmail: email }),
//       setLoginMethod: (m) => set({ loginMethod: m }),

//       setCurrentStepFirstQuiz: (step) => set({ currentStepFirstQuiz: step }),
//       setCurrentStepMainQuiz: (step) => set({ currentStepMainQuiz: step }),

//       setQuestions: (questions) => set({ questions }),

//       // core: setAnswer
//       setAnswer: (question, answer, isFirstQuiz) => {
//         try {
//           // Normalize: stored answer object includes questionId + questionTitle
//           const stored: StoredAnswer = {
//             questionId: question.id,
//             questionTitle: question.title,
//             answer,
//           };

//           // if empty -> remove existing entry
//           if (isEmptyAnswer(answer)) {
//             if (isFirstQuiz) {
//               set((state) => ({
//                 preQuizAnswers: state.preQuizAnswers.filter((a) => a.questionId !== question.id),
//               }));
//             } else {
//               const projectId = get().currentProjectId;
//               if (projectId) {
//                 set((state) => ({
//                   projects: state.projects.map((p) =>
//                     p.id === projectId ? { ...p, mainQuizAnswers: p.mainQuizAnswers.filter((a) => a.questionId !== question.id) } : p
//                   ),
//                 }));
//               } else {
//                 set((state) => ({ mainQuizAnswersTemp: state.mainQuizAnswersTemp.filter((a) => a.questionId !== question.id) }));
//               }
//             }
//             return;
//           }

//           // Validate lightly here for text/fields if question defines them (optional)
//           // (We don't block storing here — UI components should validate — but we do basic normalization.)
//           // Store: update if exists, else append
//           if (isFirstQuiz) {
//             set((state) => {
//               const exists = state.preQuizAnswers.some((a) => a.questionId === question.id);
//               const next = exists
//                 ? state.preQuizAnswers.map((a) => (a.questionId === question.id ? stored : a))
//                 : [...state.preQuizAnswers, stored];
//               return { preQuizAnswers: next, preQuizCompleted: true };
//             });
//           } else {
//             const projectId = get().currentProjectId ?? crypto.randomUUID();
//             let project = get().projects.find((p) => p.id === projectId);

//             if (!project) {
//               // create new project record
//               const newProject: Project = { id: projectId, name: `Project ${projectId}`, mainQuizAnswers: [stored] };
//               set((state) => ({ projects: [...state.projects, newProject], currentProjectId: projectId }));
//             } else {
//               set((state) => {
//                 const exists = project!.mainQuizAnswers.some((a) => a.questionId === question.id);
//                 const updatedAnswers = exists
//                   ? project!.mainQuizAnswers.map((a) => (a.questionId === question.id ? stored : a))
//                   : [...project!.mainQuizAnswers, stored];

//                 const updatedProjects = state.projects.map((p) => (p.id === projectId ? { ...p, mainQuizAnswers: updatedAnswers } : p));
//                 return { projects: updatedProjects, currentProjectId: projectId };
//               });
//             }
//           }
//         } catch (err) {
//           console.error("setAnswer error:", err);
//           showErrorToast?.({ title: "Error", description: "Failed to save answer." });
//         }
//       },

//       getAnswerForQuestion: (questionId, isFirstQuiz) => {
//         const state = get();
//         if (isFirstQuiz) {
//           const found = state.preQuizAnswers.find((a) => a.questionId === questionId);
//           return found ? found.answer : null;
//         } else {
//           const proj = state.currentProjectId ? state.projects.find((p) => p.id === state.currentProjectId) : null;
//           if (proj) {
//             const found = proj.mainQuizAnswers.find((a) => a.questionId === questionId);
//             return found ? found.answer : null;
//           }
//           const foundTemp = state.mainQuizAnswersTemp.find((a) => a.questionId === questionId);
//           return foundTemp ? foundTemp.answer : null;
//         }
//       },

//       getCurrentAnswer: (questions, isFirstQuiz) => {
//         const step = isFirstQuiz ? get().currentStepFirstQuiz : get().currentStepMainQuiz;
//         const currentQuestion = questions[step - 1];
//         if (!currentQuestion) return null;
//         return get().getAnswerForQuestion(currentQuestion.id, isFirstQuiz);
//       },

//       isContinueAllowed: (question, isFirstQuiz) => {
//         if (!question) return false;
//         const state = get();
//         // get stored answer
//         const answerVal = get().getAnswerForQuestion(question.id, isFirstQuiz);
//         if (isEmptyAnswer(answerVal)) return false;

//         // helper
//         const trimmed = (v: string) => v.trim();

//         // TEXT
//         if (question.type === "text") {
//           // multi-field
//           if (question.fields && typeof answerVal === "object" && !Array.isArray(answerVal)) {
//             return question.fields.every((f) => {
//               const v = trimmed((answerVal as Record<string, string>)[f.label] || "");
//               if (f.validation?.required && !v) return false;
//               if (f.validation?.pattern && !new RegExp(f.validation.pattern).test(v)) return false;
//               if (f.validation?.format === "email" && !emailRegex.test(v)) return false;
//               if (f.validation?.format === "usPhone" && !usPhoneRegex.test(v)) return false;
//               return true;
//             });
//           } else {
//             const v = typeof answerVal === "string" ? trimmed(answerVal) : Array.isArray(answerVal) ? answerVal.join("") : String(answerVal);
//             if (question.validation?.required && !v) return false;
//             if (question.validation?.pattern && !new RegExp(question.validation.pattern).test(v)) return false;
//             if (question.validation?.format === "email" && !emailRegex.test(v)) return false;
//             if (question.validation?.format === "usPhone" && !usPhoneRegex.test(v)) return false;
//             if (question.validation?.minLength !== undefined && v.length < question.validation.minLength) return false;
//             return true;
//           }
//         }

//         // NUMBER
//         if (question.type === "number") {
//           const value = Number(String(answerVal).split(" ")[0]);
//           if (isNaN(value)) return false;
//           if (question.validation?.min !== undefined && value < question.validation.min) return false;
//           if (question.validation?.max !== undefined && value > question.validation.max) return false;
//           return true;
//         }

//         // SELECT / RADIO / BUTTON
//         if (["select", "radio", "button"].includes(question.type)) {
//           if (Array.isArray(answerVal)) return answerVal.length > 0;
//           return trimmed(String(answerVal)).length > 0;
//         }

//         // CHECKBOX / IMAGE-CHOICE
//         if (["checkbox", "image-choice"].includes(question.type)) {
//           const arr = Array.isArray(answerVal) ? (answerVal as string[]) : String(answerVal).split(",").map((s) => s.trim()).filter(Boolean);
//           const minSelected = question.validation?.minSelected ?? 1;
//           const maxSelected = question.validation?.maxSelected ?? Number.POSITIVE_INFINITY;
//           return arr.length >= minSelected && arr.length <= maxSelected;
//         }

//         // FILE
//         if (question.type === "file") {
//           if (Array.isArray(answerVal)) return answerVal.length > 0;
//           return trimmed(String(answerVal)).length > 0;
//         }

//         return false;
//       },

//       // user & projects
//       setRegistered: (v) => set({ isRegistered: v }),
//       setUserType: (v) => set({ userType: v }),
//       setProjects: (projects) => set({ projects }),
//       setCurrentProjectId: (id) => set({ currentProjectId: id }),

//       clearQuizData: () =>
//         set({
//           preQuizAnswers: [],
//           preQuizCompleted: false,
//           mainQuizAnswersTemp: [],
//           currentStepFirstQuiz: 1,
//           currentStepMainQuiz: 1,
//           projects: [],
//           currentProjectId: null,
//         }),

//       addProject: (name) => {
//         const plan = get().subscribedPlan ?? "basic";
//         const limit = get().subscriptionLimits[plan];
//         if (get().projects.length >= limit) {
//           showErrorToast?.({ title: "Project Limit Reached", description: `You have reached the maximum number of projects for the ${plan} plan (${limit})` });
//           return "";
//         }
//         const id = crypto.randomUUID();
//         const newProject: Project = { id, name, mainQuizAnswers: [] };
//         set((state) => ({ projects: [...state.projects, newProject], currentProjectId: id, currentStepMainQuiz: 1, mainQuizAnswersTemp: [] }));
//         return id;
//       },

//       removeProject: (id) => {
//         set((state) => ({
//           projects: state.projects.filter((p) => p.id !== id),
//           currentProjectId: state.currentProjectId === id ? null : state.currentProjectId,
//           mainQuizAnswersTemp: state.currentProjectId === id ? [] : state.mainQuizAnswersTemp,
//         }));
//       },

//       transferTempAnswersToProject: (projectId) => {
//         set((state) => {
//           const project = state.projects.find((p) => p.id === projectId);
//           if (!project) return {};
//           const merged = [...project.mainQuizAnswers, ...state.mainQuizAnswersTemp];
//           return { projects: state.projects.map((p) => (p.id === projectId ? { ...p, mainQuizAnswers: merged } : p)), mainQuizAnswersTemp: [] };
//         });
//       },

//       // sync functions
//       syncFirstQuizWithServer: async () => {
//         try {
//           const state = get();
//           const formatted = state.preQuizAnswers.map((a) => ({ questionId: a.questionId, question: a.questionTitle, answer: Array.isArray(a.answer) ? a.answer : typeof a.answer === "object" ? Object.values(a.answer) : [a.answer] }));
//           await axios.post("/api/saveFirstQuiz", { preQuizAnswers: formatted, isRegistered: state.isRegistered, userType: state.userType });
//         } catch (err) {
//           console.error("syncFirstQuizWithServer error:", err);
//           showErrorToast?.({ title: "Sync error", description: "Failed to sync first quiz." });
//         }
//       },

//       syncMainQuizWithServer: async () => {
//         try {
//           const state = get();
//           if (!state.currentProjectId) {
//             showErrorToast?.({ title: "No project", description: "No project selected to sync." });
//             return;
//           }
//           const project = state.projects.find((p) => p.id === state.currentProjectId);
//           if (!project) return;
//           const formatted = project.mainQuizAnswers.map((a) => ({ questionId: a.questionId, question: a.questionTitle, answer: Array.isArray(a.answer) ? a.answer : typeof a.answer === "object" ? Object.values(a.answer) : [a.answer] }));
//           await axios.post("/api/saveMainQuiz", { mainQuizAnswers: formatted, currentProjectId: state.currentProjectId, isRegistered: state.isRegistered, userType: state.userType });
//         } catch (err) {
//           console.error("syncMainQuizWithServer error:", err);
//           showErrorToast?.({ title: "Sync error", description: "Failed to sync main quiz." });
//         }
//       },
//     }),
//     { name: "app-storage-v2" }
//   )
// );



"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

// Validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

// --- Types ---
export type AnswerValue = string | string[] | Record<string, string>;

export type Answer = {
  question: string;
  answer: AnswerValue;
};

export interface StoredAnswer {
  question: string; // فقط عنوان سؤال
  answer: AnswerValue;
}

export interface Project {
  id: string;
  name: string;
  mainQuizAnswers: StoredAnswer[]; // فقط سؤال و پاسخ
  completed?: boolean;
  description?: string;
  updatedAt?: string;
}

export interface FieldItem {
  label: string;
  placeholder?: string;
  hint?: string;
  validation?: {
    required?: boolean;
    pattern?: string;
    errorMessage?: string;
    format?: "email" | "usPhone";
    min?: number;
    max?: number;
  };
}

export interface ImageOption {
  label: string;
  imageUrl?: string;
}

export interface QuestionItem {
  id: string;
  title: string;
  type:
    | "text"
    | "number"
    | "select"
    | "checkbox"
    | "radio"
    | "button"
    | "file"
    | "image-choice";
  placeholder?: string;
  hint?: string;
  imageUrl?: string;
  options?: Array<string | ImageOption>;
  multiple?: boolean;
  fields?: FieldItem[];
  validation?: {
    required?: boolean;
    minSelected?: number;
    maxSelected?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    errorMessage?: string;
    min?: number;
    max?: number;
    step?: number;
    units?: string[];
    format?: "email" | "usPhone";
  };
  completed?: boolean;
}

// --- App state type ---
export interface AppState {
  // steps
  currentStepFirstQuiz: number;
  currentStepMainQuiz: number;

  // questions
  firstQuizQuestions: QuestionItem[];
  mainQuizQuestions: QuestionItem[];

  // answers
  preQuizAnswers: StoredAnswer[]; // فقط سؤال و پاسخ
  preQuizCompleted: boolean;
  mainQuizAnswersTemp: StoredAnswer[];

  // projects
  projects: Project[];
  currentProjectId: string | null;

  // user, UI
  isRegistered: boolean;
  userType: string;
  userId: string;
  isSidebarOpen: boolean;
  isHelpOpen: boolean;
  loginMethod: "manual" | "google" | "apple" | null;
  userName: string;
  userEmail: string;
  userAvatar: string;
  subscribedPlan: "basic" | "pro" | "enterprise" | null;
  subscriptionLimits: { [key: string]: number };

  // actions
  closeSidebar: () => void;
  toggleSidebar: () => void;
  toggleHelp: () => void;

  setUserAvatar: (avatar: string) => void;
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
  setLoginMethod: (m: AppState["loginMethod"]) => void;

  setCurrentStepFirstQuiz: (step: number) => void;
  setCurrentStepMainQuiz: (step: number) => void;

  setFirstQuizQuestions: (questions: QuestionItem[]) => void;
  setMainQuizQuestions: (questions: QuestionItem[]) => void;

  // core: set/get answers
  setAnswer: (
    question: QuestionItem,
    answer: AnswerValue,
    isFirstQuiz: boolean
  ) => void;
  getAnswerForQuestion: (
    question: string,
    isFirstQuiz: boolean
  ) => AnswerValue | null;
  getCurrentAnswer: (questions: QuestionItem[], isFirstQuiz: boolean) => AnswerValue | null;

  // flow control
  isContinueAllowed: (question: QuestionItem | null, isFirstQuiz: boolean) => boolean;
  setRegistered: (v: boolean) => void;
  setUserType: (v: string) => void;
  setUserId: (id: string) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProjectId: (id: string | null) => void;
  clearQuizData: () => void;
  addProject: (name: string) => string;
  removeProject: (id: string) => void;
  transferTempAnswersToProject: (projectId: string) => void;

  // sync
  syncFirstQuizWithServer: () => Promise<void>;
  syncMainQuizWithServer: () => Promise<void>;
}

// --- Helpers ---
const isEmptyAnswer = (value: AnswerValue | null | undefined) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

// --- Store ---
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // initial
      currentStepFirstQuiz: 1,
      currentStepMainQuiz: 1,
      firstQuizQuestions: [],
      mainQuizQuestions: [],
      preQuizAnswers: [],
      preQuizCompleted: false,
      mainQuizAnswersTemp: [],
      projects: [],
      currentProjectId: null,
      isRegistered: false,
      userType: "",
      userId: "",
      isSidebarOpen: false,
      isHelpOpen: false,
      loginMethod: null,
      userName: "",
      userEmail: "",
      userAvatar: "",
      subscribedPlan: null,
      subscriptionLimits: { basic: 3, pro: 5, enterprise: Number.POSITIVE_INFINITY },

      // UI actions
      closeSidebar: () => set({ isSidebarOpen: false }),
      toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
      toggleHelp: () => set((s) => ({ isHelpOpen: !s.isHelpOpen })),

      setUserAvatar: (avatar) => set({ userAvatar: avatar }),
      setUserName: (name) => set({ userName: name }),
      setUserEmail: (email) => set({ userEmail: email }),
      setLoginMethod: (m) => set({ loginMethod: m }),

      setUserId: (id) => set({ userId: id }),

      setCurrentStepFirstQuiz: (step) => set({ currentStepFirstQuiz: step }),
      setCurrentStepMainQuiz: (step) => set({ currentStepMainQuiz: step }),

      setFirstQuizQuestions: (questions) => set({ firstQuizQuestions: questions }),
      setMainQuizQuestions: (questions) => set({ mainQuizQuestions: questions }),

      // core: setAnswer
      setAnswer: (question, answer, isFirstQuiz) => {
        try {
          // فقط سؤال و پاسخ ذخیره می‌شه
          const stored: StoredAnswer = {
            question: question.title,
            answer,
          };

          // اگر پاسخ خالیه، ورودی موجود رو حذف کن
          if (isEmptyAnswer(answer)) {
            if (isFirstQuiz) {
              set((state) => ({
                preQuizAnswers: state.preQuizAnswers.filter(
                  (a) => a.question !== question.title
                ),
              }));
            } else {
              const projectId = get().currentProjectId;
              if (projectId) {
                set((state) => ({
                  projects: state.projects.map((p) =>
                    p.id === projectId
                      ? {
                          ...p,
                          mainQuizAnswers: p.mainQuizAnswers.filter(
                            (a) => a.question !== question.title
                          ),
                        }
                      : p
                  ),
                }));
              } else {
                set((state) => ({
                  mainQuizAnswersTemp: state.mainQuizAnswersTemp.filter(
                    (a) => a.question !== question.title
                  ),
                }));
              }
            }
            return;
          }

          // ذخیره: اگر وجود داره به‌روزرسانی کن، وگرنه اضافه کن
          if (isFirstQuiz) {
            set((state) => {
              const exists = state.preQuizAnswers.some(
                (a) => a.question === question.title
              );
              const next = exists
                ? state.preQuizAnswers.map((a) =>
                    a.question === question.title ? stored : a
                  )
                : [...state.preQuizAnswers, stored];
              return { preQuizAnswers: next, preQuizCompleted: true };
            });
          } else {
            const projectId = get().currentProjectId ?? crypto.randomUUID();
            let project = get().projects.find((p) => p.id === projectId);

            if (!project) {
              // ایجاد پروژه جدید
              const newProject: Project = {
                id: projectId,
                name: `Project ${projectId}`,
                mainQuizAnswers: [stored],
              };
              set((state) => ({
                projects: [...state.projects, newProject],
                currentProjectId: projectId,
              }));
            } else {
              set((state) => {
                const exists = project!.mainQuizAnswers.some(
                  (a) => a.question === question.title
                );
                const updatedAnswers = exists
                  ? project!.mainQuizAnswers.map((a) =>
                      a.question === question.title ? stored : a
                    )
                  : [...project!.mainQuizAnswers, stored];

                const updatedProjects = state.projects.map((p) =>
                  p.id === projectId ? { ...p, mainQuizAnswers: updatedAnswers } : p
                );
                return { projects: updatedProjects };
              });
            }
          }
        } catch (err) {
          console.error("setAnswer error:", err);
          showErrorToast?.({ title: "Error", description: "Failed to save answer." });
        }
      },

      getAnswerForQuestion: (question, isFirstQuiz) => {
        const state = get();
        if (isFirstQuiz) {
          const found = state.preQuizAnswers.find((a) => a.question === question);
          return found ? found.answer : null;
        } else {
          const proj = state.currentProjectId
            ? state.projects.find((p) => p.id === state.currentProjectId)
            : null;
          if (proj) {
            const found = proj.mainQuizAnswers.find((a) => a.question === question);
            return found ? found.answer : null;
          }
          const foundTemp = state.mainQuizAnswersTemp.find(
            (a) => a.question === question
          );
          return foundTemp ? foundTemp.answer : null;
        }
      },

      getCurrentAnswer: (questions, isFirstQuiz) => {
        const step = isFirstQuiz ? get().currentStepFirstQuiz : get().currentStepMainQuiz;
        const currentQuestion = questions[step - 1];
        if (!currentQuestion) return null;
        return get().getAnswerForQuestion(currentQuestion.title, isFirstQuiz);
      },

      isContinueAllowed: (question, isFirstQuiz) => {
        if (!question) return false;
        // گرفتن پاسخ ذخیره‌شده
        const answerVal = get().getAnswerForQuestion(question.title, isFirstQuiz);
        if (isEmptyAnswer(answerVal)) return false;

        // helper
        const trimmed = (v: string) => v.trim();

        // TEXT
        if (question.type === "text") {
          // multi-field
          if (question.fields && typeof answerVal === "object" && !Array.isArray(answerVal)) {
            return question.fields.every((f) => {
              const v = trimmed((answerVal as Record<string, string>)[f.label] || "");
              if (f.validation?.required && !v) return false;
              if (f.validation?.pattern && !new RegExp(f.validation.pattern).test(v))
                return false;
              if (f.validation?.format === "email" && !emailRegex.test(v)) return false;
              if (f.validation?.format === "usPhone" && !usPhoneRegex.test(v))
                return false;
              return true;
            });
          } else {
            const v = typeof answerVal === "string"
              ? trimmed(answerVal)
              : Array.isArray(answerVal)
              ? answerVal.join("")
              : String(answerVal);
            if (question.validation?.required && !v) return false;
            if (question.validation?.pattern && !new RegExp(question.validation.pattern).test(v))
              return false;
            if (question.validation?.format === "email" && !emailRegex.test(v))
              return false;
            if (question.validation?.format === "usPhone" && !usPhoneRegex.test(v))
              return false;
            if (question.validation?.minLength !== undefined && v.length < question.validation.minLength)
              return false;
            return true;
          }
        }

        // NUMBER
        if (question.type === "number") {
          const value = Number(String(answerVal).split(" ")[0]);
          if (isNaN(value)) return false;
          if (question.validation?.min !== undefined && value < question.validation.min)
            return false;
          if (question.validation?.max !== undefined && value > question.validation.max)
            return false;
          return true;
        }

        // SELECT / RADIO / BUTTON
        if (["select", "radio", "button"].includes(question.type)) {
          if (Array.isArray(answerVal)) return answerVal.length > 0;
          return trimmed(String(answerVal)).length > 0;
        }

        // CHECKBOX / IMAGE-CHOICE
        if (["checkbox", "image-choice"].includes(question.type)) {
          const arr = Array.isArray(answerVal)
            ? answerVal
            : String(answerVal).split(",").map((s) => s.trim()).filter(Boolean);
          const minSelected = question.validation?.minSelected ?? 1;
          const maxSelected = question.validation?.maxSelected ?? Number.POSITIVE_INFINITY;
          return arr.length >= minSelected && arr.length <= maxSelected;
        }

        // FILE
        if (question.type === "file") {
          if (Array.isArray(answerVal)) return answerVal.length > 0;
          return trimmed(String(answerVal)).length > 0;
        }

        return false;
      },

      // user & projects
      setRegistered: (v) => set({ isRegistered: v }),
      setUserType: (v) => set({ userType: v }),
      setProjects: (projects) => set({ projects }),
      setCurrentProjectId: (id) => set({ currentProjectId: id }),

      clearQuizData: () =>
        set({
          preQuizAnswers: [],
          preQuizCompleted: false,
          mainQuizAnswersTemp: [],
          currentStepFirstQuiz: 1,
          currentStepMainQuiz: 1,
          projects: [],
          currentProjectId: null,
        }),

      addProject: (name) => {
        const plan = get().subscribedPlan ?? "basic";
        const limit = get().subscriptionLimits[plan];
        if (get().projects.length >= limit) {
          showErrorToast?.({
            title: "Project Limit Reached",
            description: `You have reached the maximum number of projects for the ${plan} plan (${limit})`,
          });
          return "";
        }
        const id = crypto.randomUUID();
        const newProject: Project = { id, name, mainQuizAnswers: [] };
        set((state) => ({
          projects: [...state.projects, newProject],
          currentProjectId: id,
          currentStepMainQuiz: 1,
          mainQuizAnswersTemp: [],
        }));
        return id;
      },

      removeProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          currentProjectId: state.currentProjectId === id ? null : state.currentProjectId,
          mainQuizAnswersTemp: state.currentProjectId === id ? [] : state.mainQuizAnswersTemp,
        }));
      },

      transferTempAnswersToProject: (projectId) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (!project) return {};
          const merged = [...project.mainQuizAnswers, ...state.mainQuizAnswersTemp];
          return {
            projects: state.projects.map((p) =>
              p.id === projectId ? { ...p, mainQuizAnswers: merged } : p
            ),
            mainQuizAnswersTemp: [],
          };
        });
      },

      // sync functions
      syncFirstQuizWithServer: async () => {
        try {
          const state = get();
          const formatted = state.preQuizAnswers.map((a) => ({
            question: a.question,
            answer: Array.isArray(a.answer)
              ? a.answer
              : typeof a.answer === "object"
              ? Object.values(a.answer)
              : [a.answer],
          }));
          await axios.post("/api/saveFirstQuiz", {
            preQuizAnswers: formatted,
            isRegistered: state.isRegistered,
            userType: state.userType,
          });
        } catch (err) {
          console.error("syncFirstQuizWithServer error:", err);
          showErrorToast?.({ title: "Sync error", description: "Failed to sync first quiz." });
        }
      },

      syncMainQuizWithServer: async () => {
        try {
          const state = get();
          if (!state.currentProjectId) {
            showErrorToast?.({
              title: "No project",
              description: "No project selected to sync.",
            });
            return;
          }
          const project = state.projects.find((p) => p.id === state.currentProjectId);
          if (!project) return;
          const formatted = project.mainQuizAnswers.map((a) => ({
            question: a.question,
            answer: Array.isArray(a.answer)
              ? a.answer
              : typeof a.answer === "object"
              ? Object.values(a.answer)
              : [a.answer],
          }));
          await axios.post("/api/saveMainQuiz", {
            mainQuizAnswers: formatted,
            currentProjectId: state.currentProjectId,
            isRegistered: state.isRegistered,
            userType: state.userType,
          });
        } catch (err) {
          console.error("syncMainQuizWithServer error:", err);
          showErrorToast?.({ title: "Sync error", description: "Failed to sync main quiz." });
        }
      },
    }),
    { name: "app-storage-v2" }
  )
);