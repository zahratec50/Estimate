"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FieldArrayPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomSelect from "../../CustomSelect/CustomSelect";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { showSuccessToast } from "@/components/modules/toasts/SuccessToast";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { AnimatePresence, motion } from "framer-motion";

interface Question {
  _id: string;
  questionText: string;
  questionType: "text" | "number" | "select" | "checkbox" | "radio" | "button";
  category: "bathroom" | "kitchen" | "living_room" | "bedroom" | "other";
  targetUser: "homeowner" | "contractor" | "architect" | "other";
  options?: string[];
  selectionMode?: "single" | "multiple";
}

interface EditQuestionFormProps {
  question: Question;
  onClose: () => void;
  targetUser: string;
  category: string;
}

const formSchema = z.object({
  questionText: z
    .string()
    .min(5, { message: "Question must be at least 5 characters." }),
  questionType: z.enum([
    "text",
    "number",
    "select",
    "checkbox",
    "radio",
    "button",
  ]),
  category: z.enum(["bathroom", "kitchen", "living_room", "bedroom", "other"]),
  targetUser: z.enum(["homeowner", "contractor", "architect", "other"]),
  options: z
    .array(z.string().min(1, { message: "Option cannot be empty." }))
    .optional(),
  selectionMode: z.enum(["single", "multiple"]).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditQuestionForm({
  question,
  onClose,
  targetUser,
  category,
}: EditQuestionFormProps) {
  const queryClient = useQueryClient();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questionText: question.questionText,
      questionType: question.questionType,
      category: question.category,
      targetUser: question.targetUser,
      options: question.options ?? [],
      selectionMode: question.selectionMode ?? "single",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray<FormValues>({
    control: form.control,
    name: "options" as FieldArrayPath<FormValues>,
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const response = await axios.put(
        `/api/admin/questions?id=${question._id}`,
        values
      );
      return response.data;
    },
    onSuccess: () => {
      showSuccessToast({
        title: "Success",
        description: "Question updated successfully.",
        actionLabel: "OK",
        onAction: () => {},
      });
      queryClient.invalidateQueries({
        queryKey: ["questions", targetUser, category],
      });
      onClose();
    },
    onError: (error: any) => {
      showErrorToast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to update question",
        actionLabel: "OK",
        onAction: () => {},
      });
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    mutation.mutate({
      ...values,
      options: ["select", "checkbox", "radio", "button"].includes(
        values.questionType
      )
        ? values.options ?? []
        : [],
      selectionMode: ["select", "button"].includes(values.questionType)
        ? values.selectionMode
        : undefined,
    });
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [form.watch("questionText")]);

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const watchedType = form.watch("questionType");
  const showOptions = ["select", "checkbox", "radio", "button"].includes(
    watchedType
  );
  const showSelectionMode = ["select", "button"].includes(watchedType);

  const isFormChanged = form.formState.isDirty;
  const isSubmitting = mutation.isPending;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-[10000] bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-lg w-full max-w-[650px] max-h-[90vh] overflow-y-auto text-gray-900 dark:text-gray-100">
        <h2 className="text-xl font-roboto mb-4">Edit Question</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Question Text */}
            <FormField
              control={form.control}
              name="questionText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Text</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      ref={textareaRef}
                      disabled={isSubmitting}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none
                                 bg-white dark:bg-secondary-900
                                 text-gray-900 dark:text-gray-100
                                 border-gray-300 dark:border-gray-700
                                 placeholder-gray-400 dark:placeholder-gray-500"
                      style={{ minHeight: "40px" }}
                      onInput={handleTextareaInput}
                      placeholder="Enter question text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Selects */}
            <div className="grid grid-cols-2 gap-4">
              {/* Target User */}
              <FormField
                control={form.control}
                name="targetUser"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomSelect
                        options={[
                          "homeowner",
                          "contractor",
                          "architect",
                          "other",
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select target user"
                        name="Target User"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomSelect
                        options={[
                          "bathroom",
                          "kitchen",
                          "living_room",
                          "bedroom",
                          "other",
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select category"
                        name="Category"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Question Type */}
              <FormField
                control={form.control}
                name="questionType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomSelect
                        options={[
                          "text",
                          "number",
                          "select",
                          "checkbox",
                          "radio",
                          "button",
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select question type"
                        name="Question Type"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Selection Mode */}
              {showSelectionMode && (
                <FormField
                  control={form.control}
                  name="selectionMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomSelect
                          options={["single", "multiple"]}
                          value={field.value || "single"}
                          onChange={field.onChange}
                          placeholder="Select selection mode"
                          name="Selection Mode"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Options */}
            {showOptions && (
              <FormItem>
                <FormLabel>Options</FormLabel>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <AnimatePresence>
                      {fields.map((f, index) => (
                        <motion.div
                          key={f.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.18 }}
                          className="flex items-center gap-1"
                        >
                          <FormField
                            control={form.control}
                            name={`options.${index}` as `options.${number}`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    placeholder={`option ${index + 1}`}
                                    {...field}
                                    disabled={isSubmitting}
                                    className="h-10
                                               bg-white dark:bg-secondary-700
                                               text-gray-900 dark:text-gray-100
                                               border-gray-300 dark:border-gray-700
                                               placeholder-gray-400 dark:placeholder-secondary-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={isSubmitting}
                            className="size-7"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append("")}
                    disabled={isSubmitting}
                    className="mt-2
                               bg-white dark:bg-secondary-800
                               text-gray-800 dark:text-gray-100
                               border-gray-300 dark:border-secondary-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>
              </FormItem>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="bg-white dark:bg-secondary-700
                           text-gray-800 dark:text-gray-100
                           border-gray-300 dark:border-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isFormChanged || isSubmitting}
                className={`${
                  !isFormChanged
                    ? "opacity-60 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>,
    document.body
  );
}
