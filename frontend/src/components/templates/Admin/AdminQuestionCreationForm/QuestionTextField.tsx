"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface QuestionTextFieldProps {
  control: Control<any>;
}

export default function QuestionTextField({ control }: QuestionTextFieldProps) {
  return (
    <FormField
      control={control}
      name="questionText"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Question Text</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter the question here (e.g., What is the size of the room?)"
              className="resize-none bg-white"
              {...field}
            />
          </FormControl>
          <FormDescription className="text-xs">
            Provide a clear and concise question for the estimation process.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}