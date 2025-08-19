// import { ProjectCard } from "./ProjectCard";
// import { Project } from "@/store/useAppStore";

// interface ProjectsGridProps {
//   projects: Project[];
// }

// export const ProjectsGrid = ({ projects }: ProjectsGridProps) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {projects.map((p) => (
//       <ProjectCard
//         key={p.id}
//         id={p.id}
//         name={p.name}
//         completed={p.completed || false}
//         description={p.description}
//         questionsCount={p.mainQuizAnswers.length}
//       />
//     ))}
//   </div>
// );

import { ProjectCard } from "./ProjectCard";
import { Project } from "@/store/useAppStore";
import { motion } from "framer-motion";

interface ProjectsGridProps {
  projects: Project[];
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <motion.div
      className="flex items-center justify-center md:justify-stretch gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {[...projects].reverse().slice(0, 3).map((p) => (
        <ProjectCard
          key={p.id}
          id={p.id}
          name={p.name}
          completed={p.completed || false}
          description={p.description}
          questionsCount={p.mainQuizAnswers.length}
        />
      ))}
    </motion.div>
  );
};
