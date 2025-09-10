"use client";

import { useAppStore } from "@/store/useAppStore";
import { ProfileHeader } from "./ProfileHeader";
import { EditableFirstQuiz } from "./EditableFirstQuiz";
import { useCallback } from "react";

export default function ProfilePage() {
  const { userName, userEmail, userType, setUserName, setUserEmail, setUserType } = useAppStore();

  const handleFieldChange = useCallback((field: string, value: string) => {
    if (field === "name") setUserName(value);
    else if (field === "email") setUserEmail(value);
    else if (field === "userType") setUserType(value);
  }, [setUserName, setUserEmail, setUserType]);

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <ProfileHeader
        name={userName}
        email={userEmail}
        userType={userType}
        onChange={handleFieldChange}
      />
      
      <EditableFirstQuiz />
    </div>
  );
}



// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useCallback } from "react";
// import { ProfileHeader } from "./ProfileHeader";
// import { EditableFirstQuiz } from "./EditableFirstQuiz";
// import { useAppStore } from "@/store/useAppStore";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";
// import axios from "axios";

// export async function generateStaticParams() {
//   // Fetch quiz IDs from the server at build time
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/saveFirstQuiz`, {
//       headers: { "Content-Type": "application/json" },
//     });
//     const quizzes = await response.json();
//     return quizzes.map((quiz: any) => ({
//       id: quiz._id.toString(),
//     }));
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return [];
//   }
// }

// interface ProfilePageProps {
//   params: { id: string };
// }

// export default function Profile({ params }: ProfilePageProps) {
//   const { userName, userEmail, userType, setUserName, setUserEmail, setUserType } = useAppStore();
//   const router = useRouter();

//   // Fetch quiz data using React Query
//   const { data: quizData, isLoading, error } = useQuery({
//     queryKey: ["firstQuiz", params.id],
//     queryFn: async () => {
//       const response = await axios.get(`/api/saveFirstQuiz/${params.id}`);
//       return response.data;
//     },
//   });

//   const handleFieldChange = useCallback(
//     (field: string, value: string) => {
//       if (field === "name") setUserName(value);
//       else if (field === "email") setUserEmail(value);
//       else if (field === "userType") setUserType(value);
//     },
//     [setUserName, setUserEmail, setUserType]
//   );

//   if (isLoading) {
//     return (
//       <div className="px-6 py-8 max-w-4xl mx-auto">
//         <Skeleton className="h-16 w-full mb-8" />
//         <Skeleton className="h-8 w-1/2 mb-4" />
//         <Skeleton className="h-12 w-full mb-4" />
//         <Skeleton className="h-12 w-full mb-4" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="px-6 py-8 max-w-4xl mx-auto text-red-500">
//         Error loading quiz data: {(error as any).message}
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="px-6 py-8 max-w-4xl mx-auto"
//     >
//       <ProfileHeader
//         name={userName}
//         email={userEmail}
//         userType={userType}
//         onChange={handleFieldChange}
//       />
//       <h2 className="text-xl font-semibold mb-4">Your First Quiz Answers</h2>
//       <EditableFirstQuiz quizId={params.id} initialAnswers={quizData?.preQuizAnswers || []} />
//     </motion.div>
//   );
// }


// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useCallback } from "react";
// import { ProfileHeader } from "./ProfileHeader";
// import { EditableFirstQuiz } from "./EditableFirstQuiz";
// import { useAppStore } from "@/store/useAppStore";
// import { Skeleton } from "@/components/ui/skeleton";
// import { motion } from "framer-motion";
// import axios from "axios";

// interface InitialQuizData {
//   _id: string;
//   preQuizAnswers: Array<{ question: string; answer: string[] }>;
//   isRegistered: boolean;
//   userType: string;
// }

// interface ProfilePageProps {
//   params: { id: string };
//   initialQuizData: InitialQuizData;
// }

// export default function ProfilePage({ params, initialQuizData }: ProfilePageProps) {
//   const { userName, userEmail, userType, setUserName, setUserEmail, setUserType } = useAppStore();
//   const router = useRouter();

//   // Fetch quiz data using React Query, with initial data
//   const { data: quizData, isLoading, error } = useQuery({
//     queryKey: ["firstQuiz", params.id],
//     queryFn: async () => {
//       const response = await axios.get(`/api/saveFirstQuiz/${params.id}`);
//       return response.data;
//     },
//     initialData: initialQuizData,
//   });

//   const handleFieldChange = useCallback(
//     (field: string, value: string) => {
//       if (field === "name") setUserName(value);
//       else if (field === "email") setUserEmail(value);
//       else if (field === "userType") setUserType(value);
//     },
//     [setUserName, setUserEmail, setUserType]
//   );

//   if (isLoading) {
//     return (
//       <div className="px-6 py-8 max-w-4xl mx-auto">
//         <Skeleton className="h-16 w-full mb-8" />
//         <Skeleton className="h-8 w-1/2 mb-4" />
//         <Skeleton className="h-12 w-full mb-4" />
//         <Skeleton className="h-12 w-full mb-4" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="px-6 py-8 max-w-4xl mx-auto text-red-500">
//         Error loading quiz data: {(error as any).message}
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="px-6 py-8 max-w-4xl mx-auto"
//     >
//       <ProfileHeader
//         name={userName}
//         email={userEmail}
//         userType={userType}
//         onChange={handleFieldChange}
//       />
//       <h2 className="text-xl font-semibold mb-4">Your First Quiz Answers</h2>
//       <EditableFirstQuiz quizId={params.id} initialAnswers={quizData?.preQuizAnswers || []} />
//     </motion.div>
//   );
// }