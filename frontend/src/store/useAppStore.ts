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
  userPassword: string;
  subscribedPlan: "basic" | "pro" | "enterprise" | null;
  subscriptionLimits: { [key: string]: number };

  // actions
  closeSidebar: () => void;
  toggleSidebar: () => void;
  toggleHelp: () => void;

  setUserAvatar: (avatar: string) => void;
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
  setUserPassword: (password: string) => void;
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
  getCurrentAnswer: (
    questions: QuestionItem[],
    isFirstQuiz: boolean
  ) => AnswerValue | null;

  // flow control
  isContinueAllowed: (
    question: QuestionItem | null,
    isFirstQuiz: boolean
  ) => boolean;
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
      userPassword: "",
      subscribedPlan: null,
      subscriptionLimits: {
        basic: 3,
        pro: 5,
        enterprise: Number.POSITIVE_INFINITY,
      },

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

      setFirstQuizQuestions: (questions) =>
        set({ firstQuizQuestions: questions }),
      setMainQuizQuestions: (questions) =>
        set({ mainQuizQuestions: questions }),

      setUserPassword: (password: string) => {
        if (password.length < 8 || password.length > 64) {
          console.warn("Password must be between 8 and 64 characters");
          return;
        }
        set({ userPassword: password });
      },

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
                  p.id === projectId
                    ? { ...p, mainQuizAnswers: updatedAnswers }
                    : p
                );
                return { projects: updatedProjects };
              });
            }
          }
        } catch (err) {
          console.error("setAnswer error:", err);
          showErrorToast?.({
            title: "Error",
            description: "Failed to save answer.",
          });
        }
      },

      getAnswerForQuestion: (question, isFirstQuiz) => {
        const state = get();
        if (isFirstQuiz) {
          const found = state.preQuizAnswers.find(
            (a) => a.question === question
          );
          return found ? found.answer : null;
        } else {
          const proj = state.currentProjectId
            ? state.projects.find((p) => p.id === state.currentProjectId)
            : null;
          if (proj) {
            const found = proj.mainQuizAnswers.find(
              (a) => a.question === question
            );
            return found ? found.answer : null;
          }
          const foundTemp = state.mainQuizAnswersTemp.find(
            (a) => a.question === question
          );
          return foundTemp ? foundTemp.answer : null;
        }
      },

      getCurrentAnswer: (questions, isFirstQuiz) => {
        const step = isFirstQuiz
          ? get().currentStepFirstQuiz
          : get().currentStepMainQuiz;
        const currentQuestion = questions[step - 1];
        if (!currentQuestion) return null;
        return get().getAnswerForQuestion(currentQuestion.title, isFirstQuiz);
      },

      isContinueAllowed: (question, isFirstQuiz) => {
        if (!question) return false;
        // گرفتن پاسخ ذخیره‌شده
        const answerVal = get().getAnswerForQuestion(
          question.title,
          isFirstQuiz
        );
        if (isEmptyAnswer(answerVal)) return false;

        // helper
        const trimmed = (v: string) => v.trim();

        // TEXT
        if (question.type === "text") {
          // multi-field
          if (
            question.fields &&
            typeof answerVal === "object" &&
            !Array.isArray(answerVal)
          ) {
            return question.fields.every((f) => {
              const v = trimmed(
                (answerVal as Record<string, string>)[f.label] || ""
              );
              if (f.validation?.required && !v) return false;
              if (
                f.validation?.pattern &&
                !new RegExp(f.validation.pattern).test(v)
              )
                return false;
              if (f.validation?.format === "email" && !emailRegex.test(v))
                return false;
              if (f.validation?.format === "usPhone" && !usPhoneRegex.test(v))
                return false;
              return true;
            });
          } else {
            const v =
              typeof answerVal === "string"
                ? trimmed(answerVal)
                : Array.isArray(answerVal)
                ? answerVal.join("")
                : String(answerVal);
            if (question.validation?.required && !v) return false;
            if (
              question.validation?.pattern &&
              !new RegExp(question.validation.pattern).test(v)
            )
              return false;
            if (question.validation?.format === "email" && !emailRegex.test(v))
              return false;
            if (
              question.validation?.format === "usPhone" &&
              !usPhoneRegex.test(v)
            )
              return false;
            if (
              question.validation?.minLength !== undefined &&
              v.length < question.validation.minLength
            )
              return false;
            return true;
          }
        }

        // NUMBER
        if (question.type === "number") {
          const value = Number(String(answerVal).split(" ")[0]);
          if (isNaN(value)) return false;
          if (
            question.validation?.min !== undefined &&
            value < question.validation.min
          )
            return false;
          if (
            question.validation?.max !== undefined &&
            value > question.validation.max
          )
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
            : String(answerVal)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
          const minSelected = question.validation?.minSelected ?? 1;
          const maxSelected =
            question.validation?.maxSelected ?? Number.POSITIVE_INFINITY;
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
          currentProjectId:
            state.currentProjectId === id ? null : state.currentProjectId,
          mainQuizAnswersTemp:
            state.currentProjectId === id ? [] : state.mainQuizAnswersTemp,
        }));
      },

      transferTempAnswersToProject: (projectId) => {
        set((state) => {
          const project = state.projects.find((p) => p.id === projectId);
          if (!project) return {};
          const merged = [
            ...project.mainQuizAnswers,
            ...state.mainQuizAnswersTemp,
          ];
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
          showErrorToast?.({
            title: "Sync error",
            description: "Failed to sync first quiz.",
          });
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
          const project = state.projects.find(
            (p) => p.id === state.currentProjectId
          );
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
          showErrorToast?.({
            title: "Sync error",
            description: "Failed to sync main quiz.",
          });
        }
      },
    }),
    { name: "app-storage-v2" }
  )
);
