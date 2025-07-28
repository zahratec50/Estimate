import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EstimationForm {
  roomType: string;
  dimensions: { width: number; height: number; length: number };
  materials: { name: string; costPerUnit: number; quantity: number }[];
  location: string;
}

interface QuizAnswer {
  questionIndex: number;
  selectedOption: number | null;
}

interface Project {
  id: string;
  estimationForm: EstimationForm;
  mainQuizAnswers: QuizAnswer[];
}

interface AppState {
  isSidebarOpen: boolean;
  isHelpOpen: boolean;
  wasSidebarOpen: boolean;
  preQuizAnswers: QuizAnswer[];
  projects: Project[];
  currentProjectId: string | null;
  currentStep: number;
  isRegistered: boolean;
  userType: "homeowner" | "contractor" | "designer" | null;

  toggleSidebar: () => void;
  toggleHelp: () => void;

  setPreQuizAnswer: (
    questionIndex: number,
    selectedOption: number | null
  ) => void;
  setMainQuizAnswer: (
     projectId: string,
    questionIndex: number,
    selectedOption: number | null
  ) => void;

  addProject: (project: Project) => void;
  updateProject: (projectId: string, data: Partial<Project>) => void;
  setCurrentProjectId: (projectId: string | null) => void;
  setCurrentStep: (step: number) => void;
  setRegistered: (isRegistered: boolean) => void;
  setUserType: (
    userType: "homeowner" | "contractor" | "designer" | null
  ) => void;

  syncWithServer: () => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isSidebarOpen: false,
      isHelpOpen: false,
      wasSidebarOpen: false,
      preQuizAnswers: [],
      projects: [],
      currentProjectId: null,
      currentStep: 1,
      isRegistered: false,
      userType: null,

      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      toggleHelp: () =>
        set((state) => {
          if (!state.isHelpOpen) {
            return {
              isHelpOpen: true,
              wasSidebarOpen: state.isSidebarOpen,
              isSidebarOpen: false,
            };
          }
          return {
            isHelpOpen: false,
            isSidebarOpen: state.wasSidebarOpen,
          };
        }),

      setPreQuizAnswer: (questionIndex, selectedOption) => {
        set((state) => {
          const existing = state.preQuizAnswers.filter((a) => a.questionIndex !== questionIndex);
          return {
            preQuizAnswers: [...existing, { questionIndex, selectedOption }],
          };
        });
      },
      setMainQuizAnswer: (projectId, questionIndex, selectedOption) => {
        const { currentProjectId, projects } = get();
        if (!currentProjectId) return;
        const updatedProjects = projects.map((project) => {
          if (project.id !== currentProjectId) return project;
          const filteredAnswers = project.mainQuizAnswers.filter(
            (a) => a.questionIndex !== questionIndex
          );
          return {
            ...project,
            mainQuizAnswers: [...filteredAnswers, { questionIndex, selectedOption }],
          };
        });
        set({ projects: updatedProjects });
      },

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
          currentProjectId: project.id,
        })),

      updateProject: (projectId, data) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId ? { ...p, ...data } : p
          ),
        })),

      setCurrentProjectId: (projectId) => set({ currentProjectId: projectId }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setRegistered: (isRegistered) => set({ isRegistered }),
      setUserType: (userType) => set({ userType }),

      syncWithServer: async () => {
        const { preQuizAnswers, projects, isRegistered, userType } = get();
        if (isRegistered) {
          await fetch("/api/sync", {
            method: "POST",
            body: JSON.stringify({ preQuizAnswers, projects, userType }),
          });
        }
      },
    }),
    {
      name: "app-storage",
    }
  )
);
