// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAppStore, Project } from "@/store/useAppStore";

// const ProjectSetup: React.FC = () => {
//   const [projectName, setProjectName] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [error, setError] = useState("");
//   const projects = useAppStore((state) => state.projects);
//   const currentProjectId = useAppStore((state) => state.currentProjectId);
//   const addProject = useAppStore((state) => state.addProject);
//   const setCurrentProjectId = useAppStore((state) => state.setCurrentProjectId);
//   const setProjects = useAppStore((state) => state.setProjects);

//   const router = useRouter();

//   const handleAddOrEditProject = () => {
//     const nameTrimmed = projectName.trim();
//     if (nameTrimmed.length < 3) {
//       setError("نام پروژه باید حداقل ۳ کاراکتر باشد");
//       return;
//     }

//     if (editingId) {
//       // ویرایش پروژه
//       const updatedProjects = projects.map((p) =>
//         p.id === editingId ? { ...p, name: nameTrimmed } : p
//       );
//       setProjects(updatedProjects);
//       setEditingId(null);
//       setProjectName("");
//     } else {
//       // اضافه کردن پروژه جدید
//       addProject(nameTrimmed);
//       setProjectName("");
//     }
//     setError("");
//   };

//   const handleEdit = (project: Project) => {
//     setEditingId(project.id);
//     setProjectName(project.name);
//   };

//   const handleDelete = (id: string) => {
//     const filtered = projects.filter((p) => p.id !== id);
//     setProjects(filtered);
//     if (currentProjectId === id) setCurrentProjectId(null);
//   };

//   const handleSelect = (id: string) => {
//     setCurrentProjectId(id);
//   };

//   const handleContinue = () => {
//     if (currentProjectId) {
//       router.push("/mainQuiz/1");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-fit bg-gray-50 p-4">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center">Project Management</h2>

//         {/* فرم اضافه/ویرایش پروژه */}
//         <div className="flex mb-4 gap-2">
//           <input
//             type="text"
//             placeholder="Project Name"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           />
//           <button
//             onClick={handleAddOrEditProject}
//             className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
//           >
//             {editingId ? "Edit" : "Add"}
//           </button>
//         </div>
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//         {/* فهرست پروژه‌ها */}
//         <div className="space-y-2 mb-4">
//           {projects.map((project) => (
//             <div
//               key={project.id}
//               className={`flex justify-between items-center p-2 border rounded-md ${
//                 currentProjectId === project.id
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-300"
//               }`}
//             >
//               <span className="font-medium">{project.name}</span>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleSelect(project.id)}
//                   className="text-sm text-blue-500 hover:underline"
//                 >
//                   Choice
//                 </button>
//                 <button
//                   onClick={() => handleEdit(project)}
//                   className="text-sm text-yellow-600 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(project.id)}
//                   className="text-sm text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//           {projects.length === 0 && (
//             <p className="text-gray-400 text-sm text-center">
//               No Projects Have Been Created
//             </p>
//           )}
//         </div>

//         {/* دکمه ادامه */}
//         {currentProjectId && (
//           <button
//             onClick={handleContinue}
//             className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
//           >
//             ادامه به سوالات
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectSetup;


// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAppStore, Project } from "@/store/useAppStore";
// import { CheckCircle, Edit2, Trash2 } from "lucide-react"; // آیکون‌های مدرن

// const ProjectSetup: React.FC = () => {
//   const [projectName, setProjectName] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [error, setError] = useState("");
//   const projects = useAppStore((state) => state.projects);
//   const currentProjectId = useAppStore((state) => state.currentProjectId);
//   const addProject = useAppStore((state) => state.addProject);
//   const setCurrentProjectId = useAppStore((state) => state.setCurrentProjectId);
//   const setProjects = useAppStore((state) => state.setProjects);

//   const router = useRouter();

//   const handleAddOrEditProject = () => {
//     const nameTrimmed = projectName.trim();
//     if (nameTrimmed.length < 3) {
//       setError("نام پروژه باید حداقل ۳ کاراکتر باشد");
//       return;
//     }

//     if (editingId) {
//       const updatedProjects = projects.map((p) =>
//         p.id === editingId ? { ...p, name: nameTrimmed } : p
//       );
//       setProjects(updatedProjects);
//       setEditingId(null);
//       setProjectName("");
//     } else {
//       addProject(nameTrimmed);
//       setProjectName("");
//     }
//     setError("");
//   };

//   const handleEdit = (project: Project) => {
//     setEditingId(project.id);
//     setProjectName(project.name);
//   };

//   const handleDelete = (id: string) => {
//     const filtered = projects.filter((p) => p.id !== id);
//     setProjects(filtered);
//     if (currentProjectId === id) setCurrentProjectId(null);
//   };

//   const handleSelect = (id: string) => {
//     setCurrentProjectId(id);
//   };

//   const handleContinue = () => {
//     if (currentProjectId) {
//       router.push("/mainQuiz/1");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
//       <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
//         {/* عنوان */}
//         <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
//           Let’s set up your project
//         </h2>
//         <p className="text-gray-500 text-center mb-6">
//           Create and manage your projects to get started.
//         </p>

//         {/* فرم ورودی */}
//         <div className="flex mb-4 gap-2">
//           <input
//             type="text"
//             placeholder="Enter project name"
//             value={projectName}
//             onChange={(e) => setProjectName(e.target.value)}
//             className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleAddOrEditProject}
//             className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
//           >
//             {editingId ? "Update" : "Add"}
//           </button>
//         </div>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         {/* لیست پروژه‌ها */}
//         <div className="space-y-3 mb-6">
//           {projects.map((project) => (
//             <div
//               key={project.id}
//               className={`flex justify-between items-center p-3 rounded-lg border ${
//                 currentProjectId === project.id
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200"
//               }`}
//             >
//               <span className="font-medium text-gray-700">{project.name}</span>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => handleSelect(project.id)}
//                   className="text-green-500 hover:text-green-600"
//                   title="Select"
//                 >
//                   <CheckCircle size={20} />
//                 </button>
//                 <button
//                   onClick={() => handleEdit(project)}
//                   className="text-yellow-500 hover:text-yellow-600"
//                   title="Edit"
//                 >
//                   <Edit2 size={20} />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(project.id)}
//                   className="text-red-500 hover:text-red-600"
//                   title="Delete"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}
//           {projects.length === 0 && (
//             <p className="text-gray-400 text-sm text-center">
//               No projects yet. Start by adding one above.
//             </p>
//           )}
//         </div>

//         {/* دکمه ادامه */}
//         <button
//           onClick={handleContinue}
//           disabled={!currentProjectId}
//           className={`w-full py-3 rounded-lg font-semibold transition ${
//             currentProjectId
//               ? "bg-green-600 text-white hover:bg-green-700"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProjectSetup;


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, Project } from "@/store/useAppStore";
import { CheckCircle, Edit2, Trash2 } from "lucide-react";

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
    if (nameTrimmed.length < 3) {
      setError("نام پروژه باید حداقل ۳ کاراکتر باشد");
      return;
    }

    if (editingId) {
      // حالت ویرایش → فقط آپدیت نام
      const updatedProjects = projects.map((p) =>
        p.id === editingId ? { ...p, name: nameTrimmed } : p
      );
      setProjects(updatedProjects);
      setEditingId(null);
      setProjectName("");
    } else {
      // حالت استارت → پروژه جدید اضافه کن و به صفحه برو
      const newId = addProject(nameTrimmed);
      setCurrentProjectId(newId);
      setProjectName("");
      router.push("/mainQuiz/1"); // اینجا مسیر دلخواهت رو بذار
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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        {/* عنوان */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Let’s set up your project
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Create and manage your projects to get started.
        </p>

        {/* فرم ورودی */}
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleStartProject}
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition font-medium"
          >
            {editingId ? "Update" : "Start"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* لیست پروژه‌ها */}
        <div className="space-y-3 mb-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex justify-between items-center p-3 rounded-lg border ${
                currentProjectId === project.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <span className="font-medium text-gray-700">{project.name}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSelect(project.id)}
                  className="text-green-500 hover:text-green-600"
                  title="Select"
                >
                  <CheckCircle size={20} />
                </button>
                <button
                  onClick={() => handleEdit(project)}
                  className="text-yellow-500 hover:text-yellow-600"
                  title="Edit"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-500 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
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
