import mainQuizDataRaw from "@/data/mainQuizData.json";
import { MainQuestion } from "@/store/useAppStore";

export const mainQuestions: MainQuestion[] = mainQuizDataRaw as MainQuestion[];
