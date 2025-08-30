import axios from "axios";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { showSuccessToast } from "@/components/modules/toasts/SuccessToast";

interface FormValues {
  questionText: string;
  questionType: string;
  category: string;
  targetUser: string;
  options?: string[];
  selectionMode?: string;
}

export const submitQuestion = async (values: FormValues, reset: () => void) => {
  try {
    const payload = {
      ...values,
      options: values.options?.length ? values.options : undefined,
      selectionMode: ["select", "button"].includes(values.questionType)
        ? values.selectionMode
        : undefined,
    };

    const response = await axios.post("/api/admin/questions", payload, {
      withCredentials: true,
    });

    showSuccessToast({
      title: "Success",
      description: "Question created successfully.",
      actionLabel: "OK",
      onAction: () => {},
    });

    reset();
  } catch (error: any) {
    showErrorToast({
      title: "Error",
      description: error?.response?.data?.message || "Failed to create question.",
      actionLabel: "OK",
      onAction: () => {},
    });
  }
};