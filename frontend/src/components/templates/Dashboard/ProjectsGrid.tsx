import { ProjectCard } from "./ProjectCard";
import { Project } from "@/store/useAppStore";

interface ProjectsGridProps {
  projects: Project[];
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((p) => (
      <ProjectCard
        key={p.id}
        id={p.id}
        name={p.name}
        completed={p.completed || false}
        description={p.description}
        questionsCount={p.mainQuizAnswers.length}
      />
    ))}
  </div>
);
