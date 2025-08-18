"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, Project } from "@/store/useAppStore";
import { Edit2, Trash2 } from "lucide-react";

const ProjectSetup: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const projects = useAppStore((state) => state.projects);
  const currentProjectId = useAppStore((state) => state.currentProjectId);
  const addProject = useAppStore((state) => state.addProject);
  const setCurrentProjectId = useAppStore((state) => state.setCurrentProjectId);
  const setProjects = useAppStore((state) => state.setProjects);

  const router = useRouter();

  const handleStartProject = () => {
    const nameTrimmed = projectName.trim();

    // Validate project name length
    if (nameTrimmed.length < 3) {
      setError("Project name must be at least 3 characters long");
      return;
    }

    if (editingId) {
      // Edit mode → Update the existing project's name
      const updatedProjects = projects.map((p) =>
        p.id === editingId ? { ...p, name: nameTrimmed } : p
      );
      setProjects(updatedProjects);
      setEditingId(null);
      setProjectName("");
    } else {
      // Start mode → Add new project and navigate to the next page
      const newId = addProject(nameTrimmed);
      setCurrentProjectId(newId);
      setProjectName("");
      router.push("/mainQuiz/1"); // Change this path to your desired route
    }

    // Clear error message after successful operation
    setError("");
  };

  const handleEdit = (project: Project) => {
    // Switch to edit mode and prefill the input with selected project name
    setEditingId(project.id);
    setProjectName(project.name);
  };

  const handleDelete = (id: string) => {
    // Remove the selected project from the list
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);

    // If the deleted project was the current one, reset the currentProjectId
    if (currentProjectId === id) setCurrentProjectId(null);
  };

  const handleSelect = (id: string) => {
    // Mark the selected project as the current active project
    setCurrentProjectId(id);
    router.push(`/dashboard/project/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-fit px-4 py-8">
      <div className="rounded-2xl p-6 w-full max-w-lg">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Let’s set up your project
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Create and manage your projects to get started.
        </p>

        {/* Input form */}
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          <button
            onClick={handleStartProject}
            className="bg-primary-500 text-white px-4 py-3 rounded-lg hover:bg-primary-300 transition font-medium"
          >
            {editingId ? "Update" : "Start"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Projects list */}
        <div className="space-y-2 mb-6">
          {[...projects].reverse().map((project) => (
            <div
              key={project.id}
              onClick={() => handleSelect(project.id)}
              className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer ${
                currentProjectId === project.id
                  ? "border-gray-400 bg-neutral-100"
                  : "border-gray-200"
              }`}
            >
              <span className="font-medium text-gray-700">{project.name}</span>
              <div className="flex gap-3">
                {/* Edit project button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // جلوگیری از trigger شدن handleSelect
                    handleEdit(project);
                  }}
                  className="text-neutral-300 hover:text-neutral-400"
                  title="Edit"
                >
                  <Edit2 size={20} />
                </button>
                {/* Delete project button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // جلوگیری از trigger شدن handleSelect
                    handleDelete(project.id);
                  }}
                  className="text-neutral-300 hover:text-neutral-400"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {projects.length === 0 && (
            <p className="text-gray-400 text-sm text-center">
              No projects yet. Start by adding one above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectSetup;
