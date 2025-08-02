// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface EstimationForm {
//   roomType: string;
//   dimensions: { width: number; height: number; length: number };
//   materials: { name: string; costPerUnit: number; quantity: number }[];
//   location: string;
// }

// interface TextQuizAnswer {
//   question: string;
//   answer: string;
// }

// interface Project {
//   id: string;
//   estimationForm: EstimationForm;
//   mainQuizAnswers: TextQuizAnswer[];
// }

// interface AppState {
//   isSidebarOpen: boolean;
//   isHelpOpen: boolean;
//   wasSidebarOpen: boolean;
//   preQuizAnswers: TextQuizAnswer[];
//   projects: Project[];
//   currentProjectId: string | null;
//   currentStep: number;
//   isRegistered: boolean;
//   userType: "homeowner" | "contractor" | "designer" | null;

//   toggleSidebar: () => void;
//   toggleHelp: () => void;

//   setPreQuizAnswer: (
//     questionIndex: number,
//     selectedOption: number | null
//   ) => void;
//   setMainQuizAnswer: (
//     projectId: string,
//     questionIndex: number,
//     selectedOption: number | null
//   ) => void;

//   addProject: (project: Project) => void;
//   updateProject: (projectId: string, data: Partial<Project>) => void;
//   setCurrentProjectId: (projectId: string | null) => void;
//   setCurrentStep: (step: number) => void;
//   setRegistered: (isRegistered: boolean) => void;
//   setUserType: (
//     userType: "homeowner" | "contractor" | "designer" | null
//   ) => void;

//   syncWithServer: () => Promise<void>;
// }

// export const useAppStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       isSidebarOpen: false,
//       isHelpOpen: false,
//       wasSidebarOpen: false,
//       preQuizAnswers: [],
//       projects: [],
//       currentProjectId: null,
//       currentStep: 1,
//       isRegistered: false,
//       userType: null,

//       toggleSidebar: () =>
//         set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

//       toggleHelp: () =>
//         set((state) => {
//           if (!state.isHelpOpen) {
//             return {
//               isHelpOpen: true,
//               wasSidebarOpen: state.isSidebarOpen,
//               isSidebarOpen: false,
//             };
//           }
//           return {
//             isHelpOpen: false,
//             isSidebarOpen: state.wasSidebarOpen,
//           };
//         }),

//       setPreQuizAnswer: (question: string, answer: string) => {
//         set((state) => {
//           const existing = state.preQuizAnswers.filter(
//             (a) => a.question !== question
//           );
//           return {
//             preQuizAnswers: [...existing, { question, answer }],
//           };
//         });
//       },
//       setMainQuizAnswer: (projectId, question, answer) => {
//         const { currentProjectId, projects } = get();
//         if (!currentProjectId) return;
//         const updatedProjects = projects.map((project) => {
//           if (project.id !== currentProjectId) return project;
//           const filteredAnswers = project.mainQuizAnswers.filter(
//             (a) => a.question !== question
//           );
//           return {
//             ...project,
//             mainQuizAnswers: [...filteredAnswers, { question, answer }],
//           };
//         });
//         set({ projects: updatedProjects });
//       },

//       addProject: (project) =>
//         set((state) => ({
//           projects: [...state.projects, project],
//           currentProjectId: project.id,
//         })),

//       updateProject: (projectId, data) =>
//         set((state) => ({
//           projects: state.projects.map((p) =>
//             p.id === projectId ? { ...p, ...data } : p
//           ),
//         })),

//       setCurrentProjectId: (projectId) => set({ currentProjectId: projectId }),
//       setCurrentStep: (step) => set({ currentStep: step }),
//       setRegistered: (isRegistered) => set({ isRegistered }),
//       setUserType: (userType) => set({ userType }),

//       syncWithServer: async () => {
//         const { preQuizAnswers, projects, isRegistered, userType } = get();
//         if (isRegistered) {
//           await fetch("/api/sync", {
//             method: "POST",
//             body: JSON.stringify({ preQuizAnswers, projects, userType }),
//           });
//         }
//       },
//     }),
//     {
//       name: "app-storage",
//     }
//   )
// );


// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface EstimationForm {
//   roomType: string;
//   dimensions: { width: number; height: number; length: number };
//   materials: { name: string; costPerUnit: number; quantity: number }[];
//   location: string;
// }

// // ✅ نوع جدید برای ذخیره‌ی سوال و جواب به‌صورت متن کامل
// interface TextQuizAnswer {
//   question: string;
//   answer: string;
// }

// interface Project {
//   id: string;
//   estimationForm: EstimationForm;
//   mainQuizAnswers: TextQuizAnswer[];
// }

// interface AppState {
//   isSidebarOpen: boolean;
//   isHelpOpen: boolean;
//   wasSidebarOpen: boolean;
//   preQuizAnswers: TextQuizAnswer[];
//   projects: Project[];
//   currentProjectId: string | null;
//   currentStep: number;
//   isRegistered: boolean;
//   userType: "homeowner" | "contractor" | "designer" | null;

//   toggleSidebar: () => void;
//   toggleHelp: () => void;

//   setPreQuizAnswer: (question: string, answer: string) => void;
//   setMainQuizAnswer: (projectId: string, question: string, answer: string) => void;

//   addProject: (project: Project) => void;
//   updateProject: (projectId: string, data: Partial<Project>) => void;
//   setCurrentProjectId: (projectId: string | null) => void;
//   setCurrentStep: (step: number) => void;
//   setRegistered: (isRegistered: boolean) => void;
//   setUserType: (userType: "homeowner" | "contractor" | "designer" | null) => void;

//   syncWithServer: () => Promise<void>;
// }

// export const useAppStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       isSidebarOpen: false,
//       isHelpOpen: false,
//       wasSidebarOpen: false,
//       preQuizAnswers: [],
//       projects: [],
//       currentProjectId: null,
//       currentStep: 1,
//       isRegistered: false,
//       userType: null,

//       toggleSidebar: () =>
//         set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

//       toggleHelp: () =>
//         set((state) => {
//           if (!state.isHelpOpen) {
//             return {
//               isHelpOpen: true,
//               wasSidebarOpen: state.isSidebarOpen,
//               isSidebarOpen: false,
//             };
//           }
//           return {
//             isHelpOpen: false,
//             isSidebarOpen: state.wasSidebarOpen,
//           };
//         }),

//       // ✅ ذخیره سوال و جواب به صورت متن
//       setPreQuizAnswer: (question, answer) => {
//         set((state) => {
//           const existing = state.preQuizAnswers.filter((a) => a.question !== question);
//           return {
//             preQuizAnswers: [...existing, { question, answer }],
//           };
//         });
//       },

//       setMainQuizAnswer: (projectId, question, answer) => {
//         const { projects } = get();
//         const updatedProjects = projects.map((project) => {
//           if (project.id !== projectId) return project;
//           const filteredAnswers = project.mainQuizAnswers.filter(
//             (a) => a.question !== question
//           );
//           return {
//             ...project,
//             mainQuizAnswers: [...filteredAnswers, { question, answer }],
//           };
//         });
//         set({ projects: updatedProjects });
//       },

//       addProject: (project) =>
//         set((state) => ({
//           projects: [...state.projects, project],
//           currentProjectId: project.id,
//         })),

//       updateProject: (projectId, data) =>
//         set((state) => ({
//           projects: state.projects.map((p) =>
//             p.id === projectId ? { ...p, ...data } : p
//           ),
//         })),

//       setCurrentProjectId: (projectId) => set({ currentProjectId: projectId }),
//       setCurrentStep: (step) => set({ currentStep: step }),
//       setRegistered: (isRegistered) => set({ isRegistered }),
//       setUserType: (userType) => set({ userType }),

//       syncWithServer: async () => {
//         const { preQuizAnswers, projects, isRegistered, userType } = get();
//         if (isRegistered) {
//           await fetch("/api/sync", {
//             method: "POST",
//             body: JSON.stringify({ preQuizAnswers, projects, userType }),
//           });
//         }
//       },
//     }),
//     {
//       name: "app-storage", // ⬅ نامی که در localStorage ذخیره می‌شود
//     }
//   )
// );


// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface Answer {
//   question: string;
//   answer: string;
// }

// interface AppState {
//   currentStep: number;
//   answers: Answer[];
//   isRegistered: boolean;
//   userType: string;
//   projects: any[];
//   currentProjectId: string | null;
//   setCurrentStep: (step: number) => void;
//   setAnswer: (question: string, answer: string) => void;
//   getCurrentAnswer: (questions: { question: string }[]) => string | null;
//   isContinueAllowed: (questions: { question: string; answers: string[] }[]) => boolean;
//   setRegistered: (value: boolean) => void;
//   setUserType: (value: string) => void;
//   setProjects: (projects: any[]) => void;
//   setCurrentProjectId: (id: string) => void;
// }

// export const useAppStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       currentStep: 1,
//       answers: [],
//       isRegistered: false,
//       userType: "",
//       projects: [],
//       currentProjectId: null,

//       setCurrentStep: (step) => set({ currentStep: step }),

//       setAnswer: (question, answer) => {
//         const existing = get().answers.find((item) => item.question === question);
//         const updatedAnswers = existing
//           ? get().answers.map((item) =>
//               item.question === question ? { ...item, answer } : item
//             )
//           : [...get().answers, { question, answer }];

//         set({ answers: updatedAnswers });
//       },

//       getCurrentAnswer: (questions) => {
//         const { currentStep, answers } = get();
//         const currentQuestion = questions[currentStep - 1];
//         const entry = answers.find((a) => a.question === currentQuestion.question);
//         return entry?.answer || null;
//       },

//       isContinueAllowed: (questions) => {
//         const { currentStep, answers } = get();
//         const currentQuestion = questions[currentStep - 1];
//         const answerEntry = answers.find(
//           (a) => a.question === currentQuestion.question
//         );

//         if (!answerEntry || !answerEntry.answer) return false;

//         const isTextInput = currentQuestion.answers.includes("Text input");
//         if (isTextInput) {
//           return answerEntry.answer.trim().length >= 5;
//         }

//         return true;
//       },

//       setRegistered: (value) => set({ isRegistered: value }),
//       setUserType: (value) => set({ userType: value }),
//       setProjects: (projects) => set({ projects }),
//       setCurrentProjectId: (id) => set({ currentProjectId: id }),
//     }),
//     {
//       name: "app-storage", // key in localStorage
//     }
//   )
// );


// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface Answer {
//   question: string;
//   answer: string;
// }

// interface Project {
//   id: string;
//   mainQuizAnswers: Answer[];
//   // سایر فیلدهای پروژه در صورت نیاز
// }

// interface AppState {
//   currentStep: number;
//   preQuizAnswers: Answer[]; // پاسخ‌های قبل ثبت‌نام (اگر جدا می‌خواهید)
//   projects: Project[];
//   currentProjectId: string | null;
//   isRegistered: boolean;
//   userType: string;

//   setCurrentStep: (step: number) => void;

//   // ذخیره پاسخ برای preQuiz
//   setPreQuizAnswer: (question: string, answer: string) => void;
//   // ذخیره پاسخ برای پروژه فعلی (ثبت‌نام شده)
//   setMainQuizAnswer: (projectId: string, question: string, answer: string) => void;

//   // گرفتن پاسخ فعلی سوال جاری بر اساس مرحله فعلی و سوالات
//   getCurrentAnswer: (questions: { question: string }[]) => string | null;

//   // چک کردن امکان ادامه (دکمه فعال باشد یا نه)
//   isContinueAllowed: (questions: { question: string; answers: string[] }[]) => boolean;

//   setRegistered: (value: boolean) => void;
//   setUserType: (value: string) => void;
//   setProjects: (projects: Project[]) => void;
//   setCurrentProjectId: (id: string) => void;
// }

// export const useAppStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       currentStep: 1,
//       preQuizAnswers: [],
//       projects: [],
//       currentProjectId: null,
//       isRegistered: false,
//       userType: "",

//       setCurrentStep: (step) => set({ currentStep: step }),

//       setPreQuizAnswer: (question, answer) => {
//         const existing = get().preQuizAnswers.find((a) => a.question === question);
//         const updated = existing
//           ? get().preQuizAnswers.map((a) =>
//               a.question === question ? { question, answer } : a
//             )
//           : [...get().preQuizAnswers, { question, answer }];

//         set({ preQuizAnswers: updated });
//       },

//       setMainQuizAnswer: (projectId, question, answer) => {
//         const projects = get().projects.slice();
//         const projectIndex = projects.findIndex((p) => p.id === projectId);
//         if (projectIndex === -1) return;

//         const project = projects[projectIndex];
//         const existing = project.mainQuizAnswers.find((a) => a.question === question);
//         if (existing) {
//           project.mainQuizAnswers = project.mainQuizAnswers.map((a) =>
//             a.question === question ? { question, answer } : a
//           );
//         } else {
//           project.mainQuizAnswers.push({ question, answer });
//         }
//         projects[projectIndex] = project;
//         set({ projects });
//       },

//       getCurrentAnswer: (questions) => {
//         const { currentStep, preQuizAnswers, projects, currentProjectId, isRegistered } = get();
//         if (currentStep < 1 || currentStep > questions.length) return null;
//         const currentQuestion = questions[currentStep - 1].question;

//         if (isRegistered && currentProjectId) {
//           const project = projects.find((p) => p.id === currentProjectId);
//           if (!project) return null;
//           const answerObj = project.mainQuizAnswers.find((a) => a.question === currentQuestion);
//           return answerObj?.answer ?? null;
//         } else {
//           const answerObj = preQuizAnswers.find((a) => a.question === currentQuestion);
//           return answerObj?.answer ?? null;
//         }
//       },

//       isContinueAllowed: (questions) => {
//         const { currentStep, preQuizAnswers, projects, currentProjectId, isRegistered } = get();
//         if (currentStep < 1 || currentStep > questions.length) return false;
//         const currentQuestion = questions[currentStep - 1];
//         let answerEntry: Answer | undefined;

//         if (isRegistered && currentProjectId) {
//           const project = projects.find((p) => p.id === currentProjectId);
//           if (!project) return false;
//           answerEntry = project.mainQuizAnswers.find((a) => a.question === currentQuestion.question);
//         } else {
//           answerEntry = preQuizAnswers.find((a) => a.question === currentQuestion.question);
//         }

//         if (!answerEntry || !answerEntry.answer) return false;

//         if (currentQuestion.answers.includes("Text input")) {
//           return answerEntry.answer.trim().length >= 5;
//         }

//         // در سایر موارد اگر پاسخی هست ادامه مجاز است
//         return true;
//       },

//       setRegistered: (value) => set({ isRegistered: value }),
//       setUserType: (value) => set({ userType: value }),
//       setProjects: (projects) => set({ projects }),
//       setCurrentProjectId: (id) => set({ currentProjectId: id }),
//     }),
//     {
//       name: "app-storage", // کلید ذخیره در localStorage
//     }
//   )
// );


// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface Answer {
//   question: string;
//   answer: string;
// }

// interface AppState {
//   currentStep: number;
//   answers: Answer[];
//   isRegistered: boolean;
//   userType: string;
//   projects: any[];
//   currentProjectId: string | null;

//   isSidebarOpen: boolean;
//   isHelpOpen: boolean;

//   setCurrentStep: (step: number) => void;
//   setAnswer: (question: string, answer: string) => void;
//   getCurrentAnswer: (questions: { question: string }[]) => string | null;
//   isContinueAllowed: (questions: { question: string; answers: string[] }[]) => boolean;

//   setRegistered: (value: boolean) => void;
//   setUserType: (value: string) => void;
//   setProjects: (projects: any[]) => void;
//   setCurrentProjectId: (id: string) => void;

//   toggleSidebar: () => void;
//   toggleHelp: () => void;

//   syncWithServer: () => void;
// }

// export const useAppStore = create<AppState>()(
//   persist(
//     (set, get) => ({
//       currentStep: 1,
//       answers: [],
//       isRegistered: false,
//       userType: "",
//       projects: [],
//       currentProjectId: null,

//       isSidebarOpen: false,
//       isHelpOpen: false,

//       setCurrentStep: (step) => set({ currentStep: step }),

//       setAnswer: (question, answer) => {
//         const existing = get().answers.find((item) => item.question === question);
//         const updatedAnswers = existing
//           ? get().answers.map((item) =>
//               item.question === question ? { ...item, answer } : item
//             )
//           : [...get().answers, { question, answer }];

//         set({ answers: updatedAnswers });
//       },

//       getCurrentAnswer: (questions) => {
//         const { currentStep, answers } = get();
//         const currentQuestion = questions[currentStep - 1];
//         const entry = answers.find((a) => a.question === currentQuestion.question);
//         return entry?.answer || null;
//       },

//       isContinueAllowed: (questions) => {
//         const { currentStep, answers } = get();
//         const currentQuestion = questions[currentStep - 1];
//         const answerEntry = answers.find(
//           (a) => a.question === currentQuestion.question
//         );

//         if (!answerEntry || !answerEntry.answer) return false;

//         const isTextInput = currentQuestion.answers.includes("Text input");
//         if (isTextInput) {
//           return answerEntry.answer.trim().length >= 5;
//         }

//         return true;
//       },

//       setRegistered: (value) => set({ isRegistered: value }),
//       setUserType: (value) => set({ userType: value }),
//       setProjects: (projects) => set({ projects }),
//       setCurrentProjectId: (id) => set({ currentProjectId: id }),

//       toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
//       toggleHelp: () => set((state) => ({ isHelpOpen: !state.isHelpOpen })),

//       syncWithServer: () => {
//         // اینجا کد همگام‌سازی با سرور رو اضافه کن
//         console.log("Syncing data with server...");
//       },
//     }),
//     {
//       name: "app-storage",
//     }
//   )
// );


import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Answer {
  question: string;
  answer: string;
}

interface Project {
  id: string;
  mainQuizAnswers: Answer[];
  // هر فیلد دیگری که لازم داری اینجا اضافه کن
}

interface AppState {
  currentStep: number;
  preQuizAnswers: Answer[];
  mainQuizAnswers: Answer[];
  isRegistered: boolean;
  userType: string;
  projects: Project[];
  currentProjectId: string | null;

  // پنل‌ها
  isSidebarOpen: boolean;
  isHelpOpen: boolean;

  // Setter ها و توابع
  setCurrentStep: (step: number) => void;
  setPreQuizAnswer: (question: string, answer: string) => void;
  setMainQuizAnswer: (projectId: string, question: string, answer: string) => void;
  getCurrentAnswer: (questions: { question: string }[]) => string | null;
  isContinueAllowed: (questions: { question: string; answers: string[] }[]) => boolean;

  setRegistered: (value: boolean) => void;
  setUserType: (value: string) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProjectId: (id: string) => void;

  toggleSidebar: () => void;
  toggleHelp: () => void;

  syncWithServer: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      preQuizAnswers: [],
      mainQuizAnswers: [],
      isRegistered: false,
      userType: "",
      projects: [],
      currentProjectId: null,

      isSidebarOpen: false,
      isHelpOpen: false,

      setCurrentStep: (step) => set({ currentStep: step }),

      setPreQuizAnswer: (question, answer) => {
        const existing = get().preQuizAnswers.find((a) => a.question === question);
        let updated: Answer[];
        if (existing) {
          updated = get().preQuizAnswers.map((a) =>
            a.question === question ? { question, answer } : a
          );
        } else {
          updated = [...get().preQuizAnswers, { question, answer }];
        }
        set({ preQuizAnswers: updated });
      },

      setMainQuizAnswer: (projectId, question, answer) => {
        const projects = get().projects.map((p) => {
          if (p.id === projectId) {
            const existing = p.mainQuizAnswers.find((a) => a.question === question);
            let updatedAnswers;
            if (existing) {
              updatedAnswers = p.mainQuizAnswers.map((a) =>
                a.question === question ? { question, answer } : a
              );
            } else {
              updatedAnswers = [...p.mainQuizAnswers, { question, answer }];
            }
            return { ...p, mainQuizAnswers: updatedAnswers };
          }
          return p;
        });
        set({ projects });
      },

      getCurrentAnswer: (questions) => {
        const { currentStep, isRegistered, currentProjectId, preQuizAnswers, projects } = get();
        const currentQuestion = questions[currentStep - 1];
        if (!currentQuestion) return null;

        if (isRegistered && currentProjectId) {
          const project = projects.find((p) => p.id === currentProjectId);
          return project?.mainQuizAnswers.find((a) => a.question === currentQuestion.question)?.answer || null;
        }
        return preQuizAnswers.find((a) => a.question === currentQuestion.question)?.answer || null;
      },

      isContinueAllowed: (questions) => {
        const { currentStep, isRegistered, currentProjectId, preQuizAnswers, projects } = get();
        const currentQuestion = questions[currentStep - 1];
        if (!currentQuestion) return false;

        let answerEntry: Answer | undefined;
        if (isRegistered && currentProjectId) {
          const project = projects.find((p) => p.id === currentProjectId);
          answerEntry = project?.mainQuizAnswers.find((a) => a.question === currentQuestion.question);
        } else {
          answerEntry = preQuizAnswers.find((a) => a.question === currentQuestion.question);
        }

        if (!answerEntry || !answerEntry.answer) return false;

        const isTextInput = currentQuestion.answers.includes("Text input");
        if (isTextInput) {
          return answerEntry.answer.trim().length >= 5;
        }

        return true;
      },

      setRegistered: (value) => set({ isRegistered: value }),
      setUserType: (value) => set({ userType: value }),
      setProjects: (projects) => set({ projects }),
      setCurrentProjectId: (id) => set({ currentProjectId: id }),

      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleHelp: () => set((state) => ({ isHelpOpen: !state.isHelpOpen })),

      syncWithServer: () => {
        // اینجا می‌تونی فراخوانی API یا همگام‌سازی واقعی را قرار بدی
        console.log("Sync with server...");
      },
    }),
    {
      name: "app-storage",
    }
  )
);
