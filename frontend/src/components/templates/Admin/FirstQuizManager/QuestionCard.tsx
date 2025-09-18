"use client";

import { useState } from "react";
import {
  useFirstQuizStore,
  QuestionItem,
  FieldItem,
} from "@/store/useFirstQuizStore";
import { SortableOption } from "./SortableOption";
import { CiTrash } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CustomSelect from "../../../modules/CustomSelect/CustomSelect";

interface Props {
  question: QuestionItem;
}

export const QuestionCard = ({ question }: Props) => {
  const { updateQuestion, removeQuestion } = useFirstQuizStore();
  const [localQuestion, setLocalQuestion] = useState<QuestionItem>({
    ...question,
  });

  // تبدیل options برای SortableContext
  const sortableOptions = (localQuestion.options || []).map((opt, idx) => ({
    id: typeof opt === "string" ? `opt-${idx}` : `opt-${idx}`,
    value: typeof opt === "string" ? opt : opt.label,
    imageUrl: typeof opt === "string" ? undefined : opt.imageUrl,
  }));

  const handleUpdate = (updated: QuestionItem) => {
    setLocalQuestion(updated);
    updateQuestion(question.id, updated);
  };

  const handleOptionChange = (index: number, value: string) => {
    if (!localQuestion.options) return;
    const newOptions = [...localQuestion.options];
    newOptions[index] = value;
    handleUpdate({ ...localQuestion, options: newOptions });
  };

  const handleAddOption = () => {
    handleUpdate({
      ...localQuestion,
      options: [...(localQuestion.options || []), "New Option"],
    });
  };

  const handleDeleteOption = (index: number) => {
    if (!localQuestion.options) return;
    const newOptions = localQuestion.options.filter((_, i) => i !== index);
    handleUpdate({ ...localQuestion, options: newOptions });
  };

  const showOptions = [
    "select",
    "checkbox",
    "radio",
    "button",
    "image-choice",
  ].includes(localQuestion.type);
  const showSelectionMode = showOptions;

  return (
    <div className="bg-secondary-900 p-4 rounded-lg border border-secondary-700 flex flex-col gap-3">
      {/* Header: Title, Type, Delete */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <input
          type="text"
          value={localQuestion.title}
          placeholder="Question title"
          onChange={(e) =>
            handleUpdate({ ...localQuestion, title: e.target.value })
          }
          className="flex-1 px-2 py-1 rounded-md bg-secondary-800 border border-secondary-600 text-gray-100"
        />
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
              fields: [],
              multiple: false,
            })
          }
          placeholder="Question Type"
          name="Type"
        />
        <button
          onClick={() => removeQuestion(localQuestion.id)}
          className="text-red-500 hover:text-red-600 flex items-center gap-1"
        >
          <CiTrash /> Delete
        </button>
      </div>

      {/* Selection Mode */}
      {showSelectionMode && (
        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-2">
          <span className="text-gray-300 text-sm">Selection Mode:</span>
          <CustomSelect
            options={["single", "multiple"]}
            value={localQuestion.multiple ? "multiple" : "single"}
            onChange={(val) =>
              handleUpdate({ ...localQuestion, multiple: val === "multiple" })
            }
            placeholder="Select mode"
            name="Selection Mode"
          />
        </div>
      )}

      {/* Options Manager */}
      {showOptions && (
        <div>
          <DndContext collisionDetection={closestCenter}>
            <SortableContext
              items={sortableOptions.map((opt) => opt.id)}
              strategy={verticalListSortingStrategy}
            >
              {sortableOptions.map((opt, idx) => (
                <SortableOption
                  key={opt.id}
                  id={opt.id}
                  value={opt.value}
                  onChange={(val) => {
                    if (val === "") {
                      handleDeleteOption(idx);
                    } else {
                      handleOptionChange(idx, val);
                    }
                  }}
                />
              ))}
            </SortableContext>
          </DndContext>

          <button
            onClick={handleAddOption}
            className="mt-2 flex items-center gap-1 text-primary-500 hover:underline text-sm"
          >
            <GoPlus /> Add Option
          </button>
        </div>
      )}

      {/* Text Fields */}
      {localQuestion.type === "text" && (
        <div className="flex flex-col gap-2 mt-2">
          {(localQuestion.fields || []).map((field, idx) => (
            <div
              key={idx}
              className="bg-secondary-800 p-2 rounded-md border border-secondary-700 flex flex-col gap-1"
            >
              <input
                type="text"
                value={field.label}
                placeholder="Field label"
                onChange={(e) => {
                  const newFields = [...(localQuestion.fields || [])];
                  newFields[idx].label = e.target.value;
                  handleUpdate({ ...localQuestion, fields: newFields });
                }}
                className="px-2 py-1 rounded-md bg-secondary-900 border border-secondary-600 text-gray-100"
              />
              <input
                type="text"
                value={field.placeholder || ""}
                placeholder="Placeholder (optional)"
                onChange={(e) => {
                  const newFields = [...(localQuestion.fields || [])];
                  newFields[idx].placeholder = e.target.value;
                  handleUpdate({ ...localQuestion, fields: newFields });
                }}
                className="px-2 py-1 rounded-md bg-secondary-900 border border-secondary-600 text-gray-100"
              />
              <label className="flex items-center gap-2 text-gray-300 text-sm">
                <input
                  type="checkbox"
                  checked={field.validation.required || false}
                  onChange={(e) => {
                    const newFields = [...(localQuestion.fields || [])];
                    newFields[idx].validation.required = e.target.checked;
                    handleUpdate({ ...localQuestion, fields: newFields });
                  }}
                />
                Required
              </label>
              <button
                onClick={() => {
                  const newFields = (localQuestion.fields || []).filter(
                    (_, i) => i !== idx
                  );
                  handleUpdate({ ...localQuestion, fields: newFields });
                }}
                className="text-red-500 hover:text-red-600 text-sm mt-1"
              >
                Delete Field
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newField: FieldItem = {
                label: "New Field",
                placeholder: "",
                validation: { required: false },
              };
              handleUpdate({
                ...localQuestion,
                fields: [...(localQuestion.fields || []), newField],
              });
            }}
            className="mt-2 flex items-center gap-1 text-primary-500 hover:underline text-sm"
          >
            <GoPlus /> Add Field
          </button>
        </div>
      )}
    </div>
  );
};
