"use client";

import { Input } from "@/components/ui/input";
import { memo } from "react";
import { motion } from "framer-motion";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export const EditableField = memo(({ label, value, onChange, type= "text" }: EditableFieldProps) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col gap-1"
  >
    <label className="text-gray-700 dark:text-gray-300 font-medium">{label}</label>
    <Input
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </motion.div>
));
