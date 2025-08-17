import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const usPhoneRegex = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;

export interface Answer {
  question: string;
  answer: string | string[];
}

export interface Project {
  id: string;
  name: string;
  mainQuizAnswers: Answer[];
}

export interface ImageOption {
  label: string;
  imageUrl: string;
}

export interface QuestionItem {
  id: number;
  type:
    | "single-choice"
    | "multi-choice"
    | "select"
    | "text-input"
    | "image-choice";
  title: string;
  options: string[] | ImageOption[];
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

export interface AppState {
  currentStepFirstQuiz: number;
  currentStepMainQuiz: number;
  preQuizAnswers: Answer[];
  mainQuizAnswersTemp: Answer[];
  isRegistered: boolean;
  userType: string;
  projects: Project[];
  currentProjectId: string | null;
  isSidebarOpen: boolean;
  isHelpOpen: boolean;
  loginMethod: "manual" | "google" | "apple" | null;

  setCurrentStepFirstQuiz: (step: number) => void;
  setCurrentStepMainQuiz: (step: number) => void;
  setAnswer: (
    question: QuestionItem,
    answer: string | string[],
    isFirstQuiz: boolean
  ) => void;
  addProject: (name: string) => void;
  removeProject: (id: string) => void;
  transferTempAnswersToProject: (projectId: string) => void;
  getCurrentAnswer: (
    questions: QuestionItem[],
    isFirstQuiz: boolean
  ) => string | string[] | null;
  isContinueAllowed: (question: QuestionItem, isFirstQuiz: boolean) => boolean;
  setRegistered: (value: boolean) => void;
  setUserType: (value: string) => void;
  setProjects: (projects: Project[]) => void;
  setCurrentProjectId: (id: string | null) => void;
  toggleSidebar: () => void;
  toggleHelp: () => void;
  setLoginMethod: (method: AppState["loginMethod"]) => void;
  syncFirstQuizWithServer: () => Promise<void>;
  syncMainQuizWithServer: () => Promise<void>;
  clearQuizData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentStepFirstQuiz: 1,
      currentStepMainQuiz: 1,
      preQuizAnswers: [],
      mainQuizAnswersTemp: [],
      isRegistered: false,
      userType: "",
      projects: [],
      currentProjectId: null,
      isSidebarOpen: false,
      isHelpOpen: false,
      loginMethod: null,

      setLoginMethod: (method) => set({ loginMethod: method }),
      setCurrentStepFirstQuiz: (step) => set({ currentStepFirstQuiz: step }),
      setCurrentStepMainQuiz: (step) => set({ currentStepMainQuiz: step }),

      setAnswer: (question, answer, isFirstQuiz) => {
        if(isFirstQuiz) {
          const existing = get().preQuizAnswers.find(
            (a) => a.question === question.title
          );
          const updated = existing
            ? get().preQuizAnswers.map((a) =>
                a.question === question.title
                  ? { question: question.title, answer }
                  : a
              )
            : [...get().preQuizAnswers, { question: question.title, answer }];
          set({ preQuizAnswers: updated });
          console.log("Updated preQuizAnswers:", updated);
        } else {
          const projectId = get().currentProjectId;
          if (!projectId) {
            console.warn("No project ID found, creating a new project");
            const newProjectId = crypto.randomUUID();
            const newProject: Project = {
              id: newProjectId,
              name: `Project ${newProjectId}`,
              mainQuizAnswers: [{ question: question.title, answer }],
            };
            set({
              projects: [...get().projects, newProject],
              currentProjectId: newProjectId,
            });
            console.log("Created and updated new project:", newProject);
            return;
          }

          const project = get().projects.find((p) => p.id === projectId);
          if (!project) {
            console.warn("No project found for ID:", projectId);
            const newProject: Project = {
              id: projectId,
              name: `Project ${projectId}`,
              mainQuizAnswers: [{ question: question.title, answer }],
            };
            set({
              projects: [...get().projects, newProject],
              currentProjectId: projectId,
            });
            console.log("Created and updated new project:", newProject);
            return;
          }

          const existing = project.mainQuizAnswers.find(
            (a) => a.question === question.title
          );
          const updatedAnswers = existing
            ? project.mainQuizAnswers.map((a) =>
                a.question === question.title
                  ? { question: question.title, answer }
                  : a
              )
            : [
                ...project.mainQuizAnswers,
                { question: question.title, answer },
              ];

          const updatedProjects = get().projects.map((p) =>
            p.id === projectId ? { ...p, mainQuizAnswers: updatedAnswers } : p
          );

          set({ projects: updatedProjects });
          
        }
      },

      transferTempAnswersToProject: (projectId: string) => {
        const project = get().projects.find((p) => p.id === projectId);
        if (!project) return;

        const updatedProject: Project = {
          ...project,
          mainQuizAnswers: [
            ...project.mainQuizAnswers,
            ...get().mainQuizAnswersTemp,
          ],
        };

        set({
          projects: get().projects.map((p) =>
            p.id === projectId ? updatedProject : p
          ),
          mainQuizAnswersTemp: [],
        });
      },

      addProject: (name: string) => {
        const id = crypto.randomUUID();
        const newProject: Project = { id, name, mainQuizAnswers: [] };
        set((state) => ({
          projects: [...state.projects, newProject],
          currentProjectId: id,
          currentStepMainQuiz: 1,
        }));
        get().transferTempAnswersToProject(id);
        
      },

      removeProject: (id: string) => {
        const projects = get().projects.filter((p) => p.id !== id);
        const currentProjectId =
          get().currentProjectId === id ? null : get().currentProjectId;
        set({ projects, currentProjectId });
      },

      getCurrentAnswer: (questions, isFirstQuiz) => {
        const step = isFirstQuiz
          ? get().currentStepFirstQuiz
          : get().currentStepMainQuiz;
        const currentQuestion = questions[step - 1];
        if (!currentQuestion) return null;

        if (isFirstQuiz) {
          return (
            get().preQuizAnswers.find(
              (a) => a.question === currentQuestion.title
            )?.answer || null
          );
        } else {
          const project = get().currentProjectId
            ? get().projects.find((p) => p.id === get().currentProjectId)
            : null;
          return (
            project?.mainQuizAnswers.find(
              (a) => a.question === currentQuestion.title
            )?.answer ||
            get().mainQuizAnswersTemp.find(
              (a) => a.question === currentQuestion.title
            )?.answer ||
            null
          );
        }
      },

      isContinueAllowed: (question, isFirstQuiz) => {
        let answerEntry: Answer | undefined;
        let project: Project | null | undefined = null; // تعریف project با مقدار اولیه null

        if (isFirstQuiz) {
          answerEntry = get().preQuizAnswers.find(
            (a) => a.question === question.title
          );
        } else {
          project = get().currentProjectId
            ? get().projects.find((p) => p.id === get().currentProjectId)
            : null;
          answerEntry = project
            ? project.mainQuizAnswers.find((a) => a.question === question.title)
            : get().mainQuizAnswersTemp.find(
                (a) => a.question === question.title
              );
        }

        if (!answerEntry || !answerEntry.answer) {
          return false;
        }

        // Text input validation
        if (question.type === "text-input") {
          const answer = Array.isArray(answerEntry.answer)
            ? answerEntry.answer.join("")
            : answerEntry.answer.trim();
          return emailRegex.test(answer) || usPhoneRegex.test(answer);
        }

        // Single-choice / Select validation
        if (question.type === "single-choice" || question.type === "select") {
          return (
            !!answerEntry.answer && (answerEntry.answer as string).trim() !== ""
          );
        }

        // Multi-choice or Image-choice validation
        if (
          question.type === "multi-choice" ||
          question.type === "image-choice"
        ) {
          let answers: string[] = [];
          if (Array.isArray(answerEntry.answer)) {
            answers = answerEntry.answer;
          } else {
            answers = (answerEntry.answer as string)
              .split(",")
              .map((a) => a.trim())
              .filter((a) => a);
          }

          const minSelected = question.validation.minSelected ?? 1;
          const maxSelected = question.validation.maxSelected ?? Infinity;

          return answers.length >= minSelected && answers.length <= maxSelected;
        }

        return true;
      },

      setRegistered: (value) => set({ isRegistered: value }),
      setUserType: (value) => set({ userType: value }),
      setProjects: (projects) => set({ projects }),
      setCurrentProjectId: (id) => set({ currentProjectId: id }),

      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleHelp: () => set({ isHelpOpen: !get().isHelpOpen }),

      clearQuizData: () => {
        set({
          preQuizAnswers: [],
          mainQuizAnswersTemp: [],
          currentStepFirstQuiz: 1,
          currentStepMainQuiz: 1,
          projects: [],
          currentProjectId: null,
        });
      },

      syncFirstQuizWithServer: async () => {
        const state = get();
        const formattedPreQuizAnswers = state.preQuizAnswers.map((answer) => ({
          question: answer.question,
          answer: Array.isArray(answer.answer)
            ? answer.answer.join(",")
            : answer.answer,
        }));

        try {
          const res = await axios.post("/api/saveFirstQuiz", {
            preQuizAnswers: formattedPreQuizAnswers,
            isRegistered: state.isRegistered,
            userType: state.userType,
          });
          console.log("First Quiz synced:", res.data);
        } catch (err) {
          console.error("Error syncing First Quiz:", err);
        }
      },

      syncMainQuizWithServer: async () => {
        const state = get();
        if (!state.currentProjectId) return;

        const project = state.projects.find(
          (p) => p.id === state.currentProjectId
        );
        if (!project) return;

        const formattedMainQuizAnswers = project.mainQuizAnswers.map(
          (answer) => ({
            question: answer.question,
            answer: Array.isArray(answer.answer)
              ? answer.answer.join(",")
              : answer.answer,
          })
        );

        try {
          const res = await axios.post("/api/saveMainQuiz", {
            mainQuizAnswers: formattedMainQuizAnswers,
            currentProjectId: state.currentProjectId,
            isRegistered: state.isRegistered,
            userType: state.userType,
          });
          console.log("Main Quiz synced:", res.data);
        } catch (err) {
          console.error("Error syncing Main Quiz:", err);
        }
      },

    }),
    { name: "app-storage" }
  )
);
