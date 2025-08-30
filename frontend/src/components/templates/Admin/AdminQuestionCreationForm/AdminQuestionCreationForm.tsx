"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import QuestionTextField from "./QuestionTextField";
import QuestionTypeSelect from "./QuestionTypeSelect";
import CategorySelect from "./CategorySelect";
import TargetUserSelect from "./TargetUserSelect";
import SelectionModeSelect from "./SelectionModeSelect";
import OptionsManager from "./OptionsManager";
import SubmitButton from "./SubmitButton";
import { submitQuestion } from "./submitQuestion";

// Define Zod schema for validation
const formSchema = z.object({
  questionText: z
    .string()
    .min(5, { message: "Question must be at least 5 characters." }),
  questionType: z.enum(["text", "number", "select", "checkbox", "radio", "button"], {
    message: "Please select a valid question type.",
  }),
  category: z.enum(["bathroom", "kitchen", "living_room", "bedroom", "other"], {
    message: "Please select a category.",
  }),
  targetUser: z.enum(["homeowner", "contractor", "architect", "other"], {
    message: "Please select the target user.",
  }),
  options: z.array(z.string().min(1, { message: "Option cannot be empty." })).optional(),
  selectionMode: z.enum(["single", "multiple"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminQuestionCreationForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: "",
      questionType: "text",
      category: "bathroom",
      targetUser: "homeowner",
      options: [],
      selectionMode: "single",
    },
  });

  const { watch } = form;
  const questionType = watch("questionType");

  const showOptions = ["select", "checkbox", "radio", "button"].includes(questionType);
  const showSelectionMode = ["select", "button"].includes(questionType);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white font-roboto">
        Create New Question
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => submitQuestion(values, form.reset))}
          className="space-y-6"
        >
          <QuestionTextField control={form.control} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TargetUserSelect
              control={form.control}
              isSubmitting={form.formState.isSubmitting}
            /> 
            <CategorySelect
              control={form.control}
              isSubmitting={form.formState.isSubmitting}
            />
            <QuestionTypeSelect
              control={form.control}
              isSubmitting={form.formState.isSubmitting}
            />
            {showSelectionMode && (
              <SelectionModeSelect
                control={form.control}
                isSubmitting={form.formState.isSubmitting}
              />
            )}
            {showOptions && (
              <OptionsManager control={form.control} isSubmitting={form.formState.isSubmitting} />
            )}
          </div>
          <SubmitButton isSubmitting={form.formState.isSubmitting} />
        </form>
      </Form>
    </div>
  );
}