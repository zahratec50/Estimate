"use client";

import React, { useState } from "react";
import { QuestionItem, useFirstQuizStore } from "@/store/useFirstQuizStore";
import CustomSelect from "../../CustomSelect/CustomSelect";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableOption } from "./SortableOption";
import { GoPlus } from "react-icons/go";
import { Button } from "@/components/ui/button";

interface EditQuestionPanelProps {
  question: QuestionItem;
  onClose: () => void;
  onSave: (question: QuestionItem) => void;
}

export default function EditQuestionPanel({
  question,
  onClose,
  onSave,
}: EditQuestionPanelProps) {
  const { updateQuestion } = useFirstQuizStore();
  const [localQuestion, setLocalQuestion] = useState<QuestionItem>({
    ...question,
  });

  const handleUpdate = (updated: QuestionItem) => setLocalQuestion(updated);
  const handleSave = () => {
    updateQuestion(localQuestion.id, localQuestion);
    onSave(localQuestion);
    onClose();
  };

  const sortableOptions = (localQuestion.options || []).map((opt, idx) => ({
    id: `opt-${idx}`,
    value: typeof opt === "string" ? opt : opt.label,
    imageUrl: typeof opt === "string" ? undefined : opt.imageUrl,
  }));

  const handleOptionChange = (index: number, value: string) => {
    if (!localQuestion.options) return;
    const newOptions = [...localQuestion.options];
    newOptions[index] = value;
    handleUpdate({ ...localQuestion, options: newOptions });
  };

  const handleAddOption = () =>
    handleUpdate({
      ...localQuestion,
      options: [...(localQuestion.options || []), "New Option"],
    });

  const showOptions = [
    "select",
    "checkbox",
    "radio",
    "button",
    "image-choice",
  ].includes(localQuestion.type);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 dark:bg-white/40" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white dark:bg-secondary-900 p-6 rounded-lg w-full max-w-3xl z-[2001] flex flex-col gap-4 m-4">
        <h2 className="text-xl font-semibold dark:text-gray-100">
          Edit Question
        </h2>

        {/* Title */}
        <input
          type="text"
          value={localQuestion.title}
          onChange={(e) =>
            handleUpdate({ ...localQuestion, title: e.target.value })
          }
          placeholder="Question title"
          className="w-full px-2 py-3 rounded-md border dark:bg-secondary-800 border-secondary-600 dark:text-gray-100"
        />

        {/* Type */}
        <CustomSelect
          options={[
            "text",
            "number",
            "select",
            "checkbox",
            "radio",
            "button",
            "file",
            "image-choice",
          ]}
          value={localQuestion.type}
          onChange={(val) =>
            handleUpdate({
              ...localQuestion,
              type: val as QuestionItem["type"],
              options: [],
              multiple: false,
            })
          }
          placeholder="Question Type"
          name="Type"
        />

        {/* Selection Mode */}
        {showOptions && (
          <CustomSelect
            options={["single", "multiple"]}
            value={localQuestion.multiple ? "multiple" : "single"}
            onChange={(val) =>
              handleUpdate({ ...localQuestion, multiple: val === "multiple" })
            }
            placeholder="Selection Mode"
            name="Selection Mode"
          />
        )}

        {/* Options */}
        {showOptions && (
          <div>
            <DndContext collisionDetection={closestCenter}>
              <SortableContext
                items={sortableOptions.map((o) => o.id)}
                strategy={verticalListSortingStrategy}
              >
                <span className="font-roboto font-medium">Options</span>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sortableOptions.map((opt, idx) => (
                    <SortableOption
                      key={opt.id}
                      id={opt.id}
                      value={opt.value}
                      onChange={(val) =>
                        val === ""
                          ? handleUpdate({
                              ...localQuestion,
                              options: localQuestion.options?.filter(
                                (_, i) => i !== idx
                              ),
                            })
                          : handleOptionChange(idx, val)
                      }
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <button
              className="mt-4 flex items-center gap-1 bg-gray-201 text-primary-500 hover:underline p-2 rounded-lg"
              onClick={handleAddOption}
            >
              <GoPlus /> Add Option
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="hover:bg-secondary-600 hover:text-white">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="text-white bg-secondary-700 hover:bg-secondary-800"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
