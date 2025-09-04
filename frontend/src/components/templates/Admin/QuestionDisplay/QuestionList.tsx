"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import EditQuestionForm from "./EditQuestionForm";
import { showSuccessToast } from "@/components/modules/toasts/SuccessToast";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

interface Question {
  _id: string;
  questionText: string;
  questionType: "text" | "number" | "select" | "checkbox" | "radio" | "button";
  category: "bathroom" | "kitchen" | "living_room" | "bedroom" | "other";
  targetUser: "homeowner" | "contractor" | "architect" | "other";
  options?: string[];
  selectionMode?: "single" | "multiple";
}

interface QuestionListProps {
  targetUser: string;
  category: string;
}

interface QuestionsResponse {
  questions: Question[];
  total: number;
  page: number;
  totalPages: number;
}

export default function QuestionList({
  targetUser,
  category,
}: QuestionListProps) {
  const queryClient = useQueryClient();
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const { data, isLoading, error } = useQuery<QuestionsResponse, Error>({
    queryKey: ["questions", targetUser, category],
    queryFn: async () => {
      const response = await axios.get(
        `/api/admin/questions?category=${category}&targetUser=${targetUser}`
      );
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/admin/questions?id=${id}`);
      return response.data;
    },
    onSuccess: () => {
      showSuccessToast({
        title: "Success",
        description: "Question deleted successfully.",
        actionLabel: "OK",
        onAction: () => {},
      });
      queryClient.invalidateQueries({
        queryKey: ["questions", targetUser, category],
      });
    },
    onError: (error: any) => {
      showErrorToast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to delete question.",
        actionLabel: "OK",
        onAction: () => {},
      });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-6">
        Failed to load questions: {error.message}
      </div>
    );
  }

  const questions: Question[] = data?.questions || [];

  const btnEditQuestion = (question: Question) => {
    setEditingQuestion(question);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-roboto">
        Questions for {category.replace("_", " ")} (
        {targetUser.replace("_", " ")})
      </h3>
      {questions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No questions found for this category and target user.
        </p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {questions.map((question) => (
            <Card key={question._id} className="relative group px-5 lg:px-10">
              <CardHeader>
                <CardTitle className="text-md font-roboto">
                  {question.questionText}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Type:</strong> {question.questionType}
                </p>
                {question.options && question.options.length > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Options:</strong> {question.options.join(", ")}
                  </p>
                )}
                {question.selectionMode && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Selection Mode:</strong> {question.selectionMode}
                  </p>
                )}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => btnEditQuestion(question)}
                    disabled={deleteMutation.isPending}
                    className="hover:bg-primary-50 dark:hover:bg-primary-200 dark:border-none"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(question._id)}
                    disabled={deleteMutation.isPending}
                    className="hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {editingQuestion && (
        <EditQuestionForm
          question={editingQuestion}
          onClose={() => 
            setEditingQuestion(null)
          }
          targetUser={targetUser}
          category={category}
        />
      )}
    </div>
  );
}
