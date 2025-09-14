"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, Project } from "@/store/useAppStore";
import { Edit2, Trash2 } from "lucide-react";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

const PLAN_LIMITS: Record<string, number> = {
  basic: 3,
  pro: 5,
  enterprise: Infinity,
};

const ProjectSetup: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const projects = useAppStore((state) => state.projects);
  const currentProjectId = useAppStore((state) => state.currentProjectId);
  const addProject = useAppStore((state) => state.addProject);
  const setCurrentProjectId = useAppStore((state) => state.setCurrentProjectId);
  const setProjects = useAppStore((state) => state.setProjects);
  const subscribedPlan = useAppStore((state) => state.subscribedPlan);

  const router = useRouter();

  const projectLimit = subscribedPlan ? PLAN_LIMITS[subscribedPlan] : 3;
  const isLimitReached = projects.length >= projectLimit;

  const handleStartProject = () => {
    const nameTrimmed = projectName.trim();
    if (nameTrimmed.length < 3) {
      setError("Project name must be at least 3 characters long");
      return;
    }

    if (editingId) {
      const updatedProjects = projects.map((p) =>
        p.id === editingId ? { ...p, name: nameTrimmed } : p
      );
      setProjects(updatedProjects);
      setEditingId(null);
      setProjectName("");
    } else {
      if (isLimitReached) {
        showErrorToast({
          title: "Error",
          description: "You have reached your project limit for your plan.",
          actionLabel: "OK",
          onAction: () => {},
        });
        // setError("You have reached your project limit for your plan.");
        return;
      }

      const newId = addProject(nameTrimmed);
      setCurrentProjectId(newId);
      router.push("/mainQuiz/1");
      setProjectName("");
    }
    setError("");
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setProjectName(project.name);
  };

  const handleDelete = (id: string) => {
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
    if (currentProjectId === id) setCurrentProjectId(null);
  };

  const handleSelect = (id: string) => {
    setCurrentProjectId(id);
    router.push(`/dashboard/project/${id}`);
  };

  useEffect(() => {
    router.prefetch("/mainQuiz/1");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-fit px-4 py-8">
      <div className="rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-2">
          Let’s set up your project
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Create and manage your projects to get started.
        </p>

        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg p-3 
              bg-white dark:bg-secondary-800 
              text-gray-800 dark:text-gray-100 
              focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <button
            onClick={handleStartProject}
            disabled={isLimitReached && !editingId}
            className={`px-4 py-3 rounded-lg font-medium transition ${
              isLimitReached && !editingId
                ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-primary-500 text-white hover:bg-primary-300 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            }`}
          >
            {editingId ? "Update" : "Start"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {isLimitReached && !editingId && (
          <p className="text-red-500 text-sm mb-4">
            You have reached your project limit for the {subscribedPlan} plan.
          </p>
        )}

        <div className="space-y-2 mb-6">
          {[...projects].reverse().map((project) => (
            <div
              key={project.id}
              onClick={() => handleSelect(project.id)}
              className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer 
                ${
                  currentProjectId === project.id
                    ? "border-gray-400 bg-neutral-100 dark:border-gray-500 dark:bg-secondary-800"
                    : "border-gray-200 dark:border-gray-700"
                }`}
            >
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {project.name}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(project);
                  }}
                  className="text-neutral-300 dark:text-neutral-400 hover:text-neutral-400 hover:dark:text-neutral-300"
                  title="Edit"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(project.id);
                  }}
                  className="text-neutral-300 dark:text-neutral-400 hover:text-neutral-400 hover:dark:text-neutral-300"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <p className="text-gray-400 dark:text-gray-500 text-sm text-center">
              No projects yet. Start by adding one above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectSetup);
