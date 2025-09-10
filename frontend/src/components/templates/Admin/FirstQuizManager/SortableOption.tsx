"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CiTrash } from "react-icons/ci";
import { Input } from "@/components/ui/input";

interface SortableOptionProps {
  id: string;
  value: string;
  onChange: (val: string) => void;
}

export const SortableOption = ({ id, value, onChange }: SortableOptionProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="flex items-center gap-2 px-2 py-1 border border-gray-300 dark:border-secondary-600 rounded-md bg-gray-201 dark:bg-secondary-800">
      <Input value={value} onChange={e=>onChange(e.target.value)} className="flex-1 h-10 bg-transparent border-none focus:ring-0"/>
      <button type="button" aria-label="Delete" onClick={()=>onChange("")} className="text-red-500 hover:text-red-600 p-1"><CiTrash size={18}/></button>
    </div>
  );
};
