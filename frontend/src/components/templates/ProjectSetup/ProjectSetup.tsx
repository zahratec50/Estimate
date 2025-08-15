"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, Project } from "@/store/useAppStore";

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

  const handleAddOrEditProject = () => {
    const nameTrimmed = projectName.trim();
    if (nameTrimmed.length < 3) {
      setError("نام پروژه باید حداقل ۳ کاراکتر باشد");
      return;
    }

    if (editingId) {
      // ویرایش پروژه
      const updatedProjects = projects.map(p =>
        p.id === editingId ? { ...p, name: nameTrimmed } : p
      );
      setProjects(updatedProjects);
      setEditingId(null);
      setProjectName("");
    } else {
      // اضافه کردن پروژه جدید
      addProject(nameTrimmed);
      setProjectName("");
    }
    setError("");
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setProjectName(project.name);
  };

  const handleDelete = (id: string) => {
    const filtered = projects.filter(p => p.id !== id);
    setProjects(filtered);
    if (currentProjectId === id) setCurrentProjectId(null);
  };

  const handleSelect = (id: string) => {
    setCurrentProjectId(id);
  };

  const handleContinue = () => {
    if (currentProjectId) {
      router.push("/mainQuiz/1");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">مدیریت پروژه‌ها</h2>

        {/* فرم اضافه/ویرایش پروژه */}
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="نام پروژه"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={handleAddOrEditProject}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
          >
            {editingId ? "ویرایش" : "افزودن"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* فهرست پروژه‌ها */}
        <div className="space-y-2 mb-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex justify-between items-center p-2 border rounded-md ${
                currentProjectId === project.id ? "border-green-500 bg-green-50" : "border-gray-300"
              }`}
            >
              <span className="font-medium">{project.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSelect(project.id)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  انتخاب
                </button>
                <button
                  onClick={() => handleEdit(project)}
                  className="text-sm text-yellow-600 hover:underline"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-gray-400 text-sm text-center">هیچ پروژه‌ای ایجاد نشده است</p>}
        </div>

        {/* دکمه ادامه */}
        {currentProjectId && (
          <button
            onClick={handleContinue}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            ادامه به سوالات
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectSetup;
