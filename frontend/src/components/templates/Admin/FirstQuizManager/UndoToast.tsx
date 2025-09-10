"use client";

import { toast } from "react-hot-toast";
import { QuestionItem, useFirstQuizStore } from "@/store/useFirstQuizStore";

export const showUndoToast = (question: QuestionItem) => {
  const { addQuestion } = useFirstQuizStore.getState();

  toast.custom((t) => (
    <div className={`bg-secondary-800 border border-secondary-700 p-3 rounded-md flex justify-between items-center gap-3 text-gray-100`}>
      <span>Question deleted</span>
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
};
