import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  id: string;
  name: string;
  completed: boolean;
  description?: string;
  questionsCount: number;
}

export const ProjectCard = ({ id, name, completed, description, questionsCount }: ProjectCardProps) => {
  const router = useRouter();

  return (
    <Card
      className="hover:shadow-xl transition cursor-pointer"
      onClick={() => router.push(`/dashboard/project/${id}`)}
    >
      <CardHeader className="flex justify-between items-start">
        <CardTitle>{name}</CardTitle>
        <Badge variant={completed ? "default" : "outline"}>
          {completed ? "Completed" : "In Progress"}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{description || "No description provided."}</p>
        <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{questionsCount} Questions</span>
          <span>${questionsCount * 1000}</span>
        </div>
      </CardContent>
    </Card>
  );
};
