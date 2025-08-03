import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Answer {
  question: string;
  answer: string;
}

interface Project {
  id: string;
  mainQuizAnswers: Answer[];
  
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

        console.log("Sync with server...");
      },
    }),
    {
      name: "app-storage",
    }
  )
);
