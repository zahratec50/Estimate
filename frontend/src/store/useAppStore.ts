import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

interface Answer {
  question: string;
  answer: string | string[];
}

interface Project {
  id: string;
  mainQuizAnswers: Answer[];
}

interface QuestionItem {
  id: number;
  type: "single-choice" | "multi-choice" | "select" | "text-input";
  title: string;
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
    validation: { required: boolean; pattern: string; errorMessage: string };
  }>;
}

interface AppState {
  currentStep: number;
  preQuizAnswers: Answer[];
  mainQuizAnswers: Answer[];
  isRegistered: boolean;
  userType: string;
  projects: Project[];
  currentProjectId: string | null;

  isSidebarOpen: boolean;
  isHelpOpen: boolean;

  setCurrentStep: (step: number) => void;
  setPreQuizAnswer: (question: string, answer: string | string[]) => void;
  setMainQuizAnswer: (
    projectId: string,
    question: string,
    answer: string | string[]
  ) => void;
  getCurrentAnswer: (questions: QuestionItem[]) => string | string[] | null;
  isContinueAllowed: (question: QuestionItem) => boolean;

  setRegistered: (value: boolean) => void;
  setUserType: (value: string) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProjectId: (id: string) => void;

  toggleSidebar: () => void;
  toggleHelp: () => void;

  syncWithServer: () => void;

  clearQuizData: () => void;

  loginMethod: "manual" | "google" | "apple" | null;
  setLoginMethod: (method: AppState["loginMethod"]) => void;
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

      loginMethod: null,
      setLoginMethod: (method) => set({ loginMethod: method }),
      setCurrentStep: (step) => set({ currentStep: step }),

      setPreQuizAnswer: (question, answer) => {
        const existing = get().preQuizAnswers.find(
          (a) => a.question === question
        );

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
            let updatedAnswers;
            if (
              Array.isArray(answer) ? answer.length === 0 : answer.trim() === ""
            ) {
              updatedAnswers = p.mainQuizAnswers.filter(
                (a) => a.question !== question
              );
            } else {
              const existing = p.mainQuizAnswers.find(
                (a) => a.question === question
              );
              if (existing) {
                updatedAnswers = p.mainQuizAnswers.map((a) =>
                  a.question === question ? { question, answer } : a
                );
              } else {
                updatedAnswers = [...p.mainQuizAnswers, { question, answer }];
              }
            }
            return { ...p, mainQuizAnswers: updatedAnswers };
          }
          return p;
        });
        set({ projects });
      },

      getCurrentAnswer: (questions) => {
        const {
          currentStep,
          isRegistered,
          currentProjectId,
          preQuizAnswers,
          projects,
        } = get();
        const currentQuestion = questions[currentStep - 1];
        if (!currentQuestion) return null;

        if (isRegistered && currentProjectId) {
          const project = projects.find((p) => p.id === currentProjectId);
          return (
            project?.mainQuizAnswers.find(
              (a) => a.question === currentQuestion.title
            )?.answer || null
          );
        }
        return (
          preQuizAnswers.find((a) => a.question === currentQuestion.title)
            ?.answer || null
        );
      },

      isContinueAllowed: (question: QuestionItem) => {
        const {
          currentStep,
          isRegistered,
          currentProjectId,
          preQuizAnswers,
          projects,
        } = get();
        if (!question) return false;

        let answerEntry: Answer | undefined;
        if (isRegistered && currentProjectId) {
          const project = projects.find((p) => p.id === currentProjectId);
          answerEntry = project?.mainQuizAnswers.find(
            (a) => a.question === question.title
          );
        } else {
          answerEntry = preQuizAnswers.find(
            (a) => a.question === question.title
          );
        }

        if (!answerEntry || !answerEntry.answer) return false;

        if (question.type === "text-input") {
          const answer = Array.isArray(answerEntry.answer)
            ? answerEntry.answer.join("")
            : answerEntry.answer.trim();
          return emailRegex.test(answer) || usPhoneRegex.test(answer);
        }

        if (question.type === "multi-choice") {
          const answers = Array.isArray(answerEntry.answer)
            ? answerEntry.answer
            : answerEntry.answer.split(",");
          if (
            question.validation.minSelected &&
            answers.length < question.validation.minSelected
          )
            return false;
          if (
            question.validation.maxSelected &&
            answers.length > question.validation.maxSelected
          )
            return false;
        }

        return true;
      },

      setRegistered: (value) => set({ isRegistered: value }),
      setUserType: (value) => set({ userType: value }),
      setProjects: (projects) => set({ projects }),
      setCurrentProjectId: (id) => set({ currentProjectId: id }),

      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleHelp: () => set((state) => ({ isHelpOpen: !state.isHelpOpen })),

      clearQuizData: () => {
        set({
          preQuizAnswers: [],
          mainQuizAnswers: [],
          currentStep: 1,
          projects: [],
          currentProjectId: null,
        });
      },

      syncWithServer: async () => {
        console.log("Sync with server...");
        const state = get();
        const formattedPreQuizAnswers = state.preQuizAnswers.map((answer) => ({
          question: answer.question,
          answer: Array.isArray(answer.answer)
            ? answer.answer.join(",")
            : answer.answer,
        }));
        const formattedProjects = state.projects.map((project) => ({
          ...project,
          mainQuizAnswers: project.mainQuizAnswers.map((answer) => ({
            question: answer.question,
            answer: Array.isArray(answer.answer)
              ? answer.answer.join(",")
              : answer.answer,
          })),
        }));
        try {
          const res = await axios.post("/api/saveQuiz", {
            preQuizAnswers: formattedPreQuizAnswers,
            mainQuizAnswers: state.mainQuizAnswers,
            isRegistered: state.isRegistered,
            userType: state.userType,
            projects: formattedProjects,
            currentProjectId: state.currentProjectId,
          });
          console.log("Server response:", res.data);
        } catch (err) {
          console.error("Error syncing with server:", err);
        }
      },
    }),
    {
      name: "app-storage",
    }
  )
);
