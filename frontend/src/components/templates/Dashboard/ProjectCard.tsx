import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  name: string;
  completed: boolean;
  description?: string;
  questionsCount: number;
}

export const ProjectCard = ({
  id,
  name,
  completed,
  description,
  questionsCount,
}: ProjectCardProps) => {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      
    >
      <Card
        className="w-[250px] cursor-pointer dark:bg-secondary-800 dark:border-none"
        onClick={() => router.push(`/dashboard/project/${id}`)}
      >
        <CardHeader className="flex flex-row justify-around items-center gap-2">
          <CardTitle className="text-base xl:text-lg truncate">{name}</CardTitle>
          <Badge variant={completed ? "default" : "outline"} className="text-xs md:text-sm">
            {completed ? "Completed" : "In Progress"}
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-row justify-around gap-2 mt-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
          <span>{questionsCount} Questions</span>
          <span>${questionsCount * 1000}</span>
        </CardContent>
        {description && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 truncate sm:truncate-none">
            {description}
          </p>
        )}
      </Card>
    </motion.div>
  );
};
