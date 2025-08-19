"use client";

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
  estimatedCost?: number;
  estimatedTime?: number;
  lastUpdated?: string;
}

export default function History({
  id,
  name,
  completed,
  description,
  questionsCount,
  estimatedCost,
  estimatedTime,
  lastUpdated,
}: ProjectCardProps) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className="cursor-pointer hover:shadow-xl transition-all duration-200"
        onClick={() => router.push(`/dashboard/project/${id}`)}
      >
        <CardHeader className="flex flex-row justify-around items-start sm:items-center gap-2">
          <CardTitle className="truncate">{name}</CardTitle>
          <Badge variant={completed ? "default" : "outline"}>
            {completed ? "Completed" : "In Progress"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-2">
          {/* توضیحات پروژه */}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate sm:truncate-none">
              {description}
            </p>
          )}

          {/* جزئیات تخمین */}
          <div className="flex flex-row justify-around text-sm sm:text-xs text-gray-500 dark:text-gray-400 gap-2 mt-2">
            <span>{questionsCount} Questions</span>
            {estimatedCost !== undefined && <span>💰 ${estimatedCost.toLocaleString()}</span>}
            {estimatedTime !== undefined && <span>⏱ {estimatedTime} hrs</span>}
          </div>

          {/* آخرین آپدیت */}
          {lastUpdated && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Updated: {lastUpdated}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
