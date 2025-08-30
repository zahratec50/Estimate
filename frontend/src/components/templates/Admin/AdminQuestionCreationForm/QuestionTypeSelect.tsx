"use client";

import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import CustomSelect from "../../CustomSelect/CustomSelect";

interface QuestionTypeSelectProps {
  control: Control<any>;
  isSubmitting: boolean;
}

export default function QuestionTypeSelect({ control, isSubmitting }: QuestionTypeSelectProps) {
  return (
    <FormField
      control={control}
      name="questionType"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <CustomSelect
              options={["text", "number", "select", "checkbox", "radio", "button"]}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select question type"
              name="Question Type"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormDescription className="text-xs">
            Choose the input type for the question.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}