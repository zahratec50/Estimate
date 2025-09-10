"use client";

import React, { useState } from "react";
import { useFirstQuizStore, QuestionItem } from "@/store/useFirstQuizStore";
import FirstQuizManagerModal from "./FirstQuizManagerModal";
import { CiTrash, CiEdit } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { toast } from "react-hot-toast";

export default function FirstQuizManagerAdvanced() {
  const { questions, addQuestion, removeQuestion } = useFirstQuizStore();
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);
  const [isNew, setIsNew] = useState(false); // آیا سوال جدید است؟

  const handleAddNewQuestion = () => {
    // ایجاد یک سوال موقت برای مدال
    const newQuestion: QuestionItem = {
      id: Date.now().toString(),
      type: "text",
      title: "",
      multiple: false,
      fields: [{ label: "Field 1", placeholder: "", validation: { required: false } }],
    };
    setEditingQuestion(newQuestion);
    setIsNew(true); // نشان بده سوال جدید است
  };

  const handleDelete = (question: QuestionItem) => {
    if (confirm("Are you sure you want to delete this question?")) {
      removeQuestion(question.id);
      toast.custom((t) => (
        <div className="bg-secondary-800 border border-secondary-700 p-3 rounded-md flex justify-between items-center text-gray-100">
          Question deleted
          <button
            className="text-primary-500 font-medium"
            onClick={() => {
              addQuestion(question);
              toast.dismiss(t.id);
            }}
          >
            Undo
          </button>
        </div>
      ));
    }
  };

  const handleSaveFromModal = (question: QuestionItem) => {
    if (isNew) {
      // سوال جدید در ابتدای لیست اضافه شود
      useFirstQuizStore.setState((state) => ({
      questions: [question, ...state.questions],
    }));
    } else {
      // سوال ویرایش شده قبلاً update شده است
    }
    setEditingQuestion(null);
    setIsNew(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white font-roboto">
        First Quiz Admin Panel
      </h1>
      
      <div className="pb-10">
        <button
        onClick={handleAddNewQuestion}
        className="flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg"
      >
        <GoPlus className="size-6" />
        Add New Question
      </button>
      </div>
      
      

      <div className="space-y-4 mt-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className="flex justify-between items-center gap-2 bg-gray-201 dark:bg-secondary-900 p-4 rounded-lg border dark:border-secondary-700"
          >
            <span className="flex-1  dark:text-gray-100">{q.title || "Untitled Question"}</span>
            <div className="flex gap-2">
              <button
                className="text-blue-700"
                aria-label="Edit"
                onClick={() => setEditingQuestion(q)}
              >
                <CiEdit className="size-5" />
                
              </button>
              <button
                aria-label="trash"
                className="text-red-600 flex items-center gap-1"
                onClick={() => handleDelete(q)}
              >
                <CiTrash className="size-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingQuestion && (
        <FirstQuizManagerModal
          question={editingQuestion}
          onClose={() => setEditingQuestion(null)}
          onSave={handleSaveFromModal} // اضافه کردن prop جدید
        />
      )}
    </div>
  );
}
