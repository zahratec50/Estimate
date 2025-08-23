"use client";

import { useAppStore } from "@/store/useAppStore";
import { useState, useMemo, useCallback } from "react";
import Lightbox from "./Lightbox";
import AnswerItem from "./AnswerItem";
import StatsCard from "./StatsCard";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectDetailsProps {
  projectId: string;
}

export default function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const projects = useAppStore((state) => state.projects);
  const project = useMemo(() => projects.find((p) => p.id === projectId), [projects, projectId]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const handleImageClick = useCallback((img: string) => {
    setCurrentImage(img);
    setLightboxOpen(true);
  }, []);

  if (!project) return <p className="text-center text-gray-500 mt-6">Project not found</p>;

  const estimatedCost = project.mainQuizAnswers.length * 1000;
  const estimatedTime = project.mainQuizAnswers.length * 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-6 dark:bg-secondary-800 rounded-2xl ${lightboxOpen ? '' : 'space-y-8'}`}
    >
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsCard label="Estimated Cost" value={`$${estimatedCost}`} icon="💰" />
        <StatsCard label="Estimated Time" value={`${estimatedTime} hours`} icon="⏳" />
      </div>

      {/* Project Name */}
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{project.name}</h2>

      {/* Answers with Accordion Style */}
      <ul className="space-y-4">
        {project.mainQuizAnswers.map((a, idx) => (
          <AnswerItem
            key={idx}
            question={a.question}
            answer={a.answer}
            onImageClick={handleImageClick}
          />
        ))}
      </ul>

      {/* Back Button */}
      <Link
        href="/dashboard/projectStart"
        className="inline-flex items-center gap-2 font-bold px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 transition"
      >
        <IoMdArrowBack className="size-5" />
        Back
      </Link>

      {/* Lightbox */}
      {lightboxOpen && <Lightbox image={currentImage} onClose={() => setLightboxOpen(false)} />}
    </motion.div>
  );
}
