// "use client";

// import { use, useState } from "react";
// import Topbar from "../Topbar/Topbar";
// import Sidebar from "../Sidebar/Sidebar";
// import { useWindowWidth } from "@/hooks/useWindowWidth";

// export default function ClientShell({ children }: { children: React.ReactNode }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isHelpOpen, setIsHelpOpen] = useState(false)

//   const width = useWindowWidth();
//   const shouldShowSidebar = !(isHelpOpen && width < 1024);

//   return (
//     <div className="flex min-h-screen dark:bg-secondary-900 bg-gray-50">
//       {/* <Sidebar isOpen={isSidebarOpen} isHelpOpen={isHelpOpen} onClose={() => setIsSidebarOpen(false)} /> */}
//       {shouldShowSidebar && (
//         <Sidebar
//           isOpen={isSidebarOpen}
//           isHelpOpen={isHelpOpen}
//           onClose={() => setIsSidebarOpen(false)}
//         />
//       )}

//       <div className={`max-w-full flex flex-col flex-1 ${isHelpOpen ? 'lg:pr-[320px]' : 'mr-0'}`}>
//         <Topbar onMenuClick={() => setIsSidebarOpen(true)} onHelpToggle={(open: boolean) => setIsHelpOpen(open)} />
//         <main className={`flex-grow ${isHelpOpen ? 'px-0 md:px-5 lg:px-10 xl:px-20' : ' md:px-10 lg:px-20 xl:px-40'} py-5 sm:py-20 md:ml-64`}>{children}</main>
//       </div>
//     </div>
//   );
// }

// components/ClientShell.tsx
// 'use client';

// import Sidebar from '../Sidebar/Sidebar';
// import Topbar from '../Topbar/Topbar';
// import QuizPage from '@/components/templates/QuizPage/QuizPage';
// import QuizNavigation from '@/components/templates/QuizNavigation/QuizNavigation';
// import ProgressSegment from '../ProgressBar/ProgressBar';
// import { useAppStore } from '@/store/useAppStore';

// export default function ClientShell() {
//   const { currentStep } = useAppStore();

//   return (
//     <div className="flex min-h-screen dark:bg-secondary-900 bg-gray-50">
//       <Sidebar />
//       <div className="max-w-full flex flex-col flex-1">
//         <Topbar />
//         <main className="flex-grow md:ml-64 py-5 sm:py-20 px-5 sm:px-10 lg:px-20 xl:px-40">
//           <ProgressSegment />
//           <QuizPage />
//           <QuizNavigation />
//         </main>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import Sidebar from '../Sidebar/Sidebar';
// import Topbar from '../Topbar/Topbar';
// import QuizPage from '@/components/templates/QuizPage/QuizPage';
// import QuizNavigation from '@/components/templates/QuizNavigation/QuizNavigation';
// import ProgressSegment from '../ProgressBar/ProgressBar';
// import EstimationForm from '@/components/templates/EstimationForm/EstimationForm';
// import { useAppStore } from '@/store/useAppStore';

// export default function ClientShell() {
//   const { isRegistered, userType, preQuizAnswers, setUserType, syncWithServer } = useAppStore();
//   const router = useRouter();

//   // Analyze preQuizAnswers to determine userType
//   useEffect(() => {
//     if (!isRegistered && preQuizAnswers.length === 4) {
//       // Simple logic to determine userType (replace with AI logic)
//       const budgetAnswer = preQuizAnswers.find((answer) => answer.questionIndex === 2)?.selectedOption;
//       const userType = budgetAnswer === 3 ? 'designer' : budgetAnswer && budgetAnswer >= 1 ? 'contractor' : 'homeowner';
//       setUserType(userType);
//       router.push('/register');
//     }
//   }, [preQuizAnswers, isRegistered, setUserType, router]);

//   // Sync data with server after registration
//   useEffect(() => {
//     if (isRegistered) {
//       syncWithServer();
//     }
//   }, [isRegistered, syncWithServer]);

//   return (
//     <div className="flex min-h-screen dark:bg-secondary-900 bg-gray-50">
//       <Sidebar />
//       <div className="max-w-full flex flex-col flex-1">
//         <Topbar />
//         <main className="flex-grow md:ml-64 py-5 sm:py-10 px-5 sm:px-10 lg:px-20 xl:px-40">
//           <ProgressSegment />
//           <QuizPage />
//           <QuizNavigation />
//           {isRegistered && <EstimationForm />}
//         </main>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import Sidebar from '../Sidebar/Sidebar';
// import Topbar from '../Topbar/Topbar';
// import QuizPage from '@/components/templates/QuizPage/QuizPage';
// import QuizNavigation from '@/components/templates/QuizNavigation/QuizNavigation';
// import ProgressSegment from '../ProgressBar/ProgressBar';
// import EstimationForm from '@/components/templates/EstimationForm/EstimationForm';
// import { useAppStore } from '@/store/useAppStore';

// export default function ClientShell() {
//   const { isRegistered, userType, preQuizAnswers, setUserType, syncWithServer } = useAppStore();
//   const router = useRouter();

//   // Analyze preQuizAnswers to determine userType
//   useEffect(() => {
//     if (!isRegistered && preQuizAnswers.length === 4) {
//       // Simple logic to determine userType (replace with AI logic)
//       const budgetAnswer = preQuizAnswers.find((answer) => answer.questionIndex === 2)?.selectedOption;
//       const userType = budgetAnswer === 3 ? 'designer' : budgetAnswer && budgetAnswer >= 1 ? 'contractor' : 'homeowner';
//       setUserType(userType);
//       router.push('/register');
//     }
//   }, [preQuizAnswers, isRegistered, setUserType, router]);

//   // Sync data with server after registration
//   useEffect(() => {
//     if (isRegistered) {
//       syncWithServer();
//     }
//   }, [isRegistered, syncWithServer]);

//   return (
//     <div className="flex min-h-screen dark:bg-secondary-900 bg-gray-50">
//       <Sidebar />
//       <div className="max-w-full flex flex-col flex-1">
//         <Topbar />
//         <main className="flex-grow md:ml-64 py-5 sm:py-20 px-5 sm:px-10 lg:px-20 xl:px-40">
//           <ProgressSegment />
//           <QuizPage />
//           <QuizNavigation />
//           {isRegistered && <EstimationForm />}
//         </main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Sidebar from "../Sidebar/Sidebar";
// import Topbar from "../Topbar/Topbar";
// import QuizPage from "@/components/templates/QuizPage/QuizPage";
// import QuizNavigation from "@/components/templates/QuizNavigation/QuizNavigation";
// import ProgressSegment from "../ProgressBar/ProgressBar";
// import EstimationForm from "@/components/templates/EstimationForm/EstimationForm";
// import { useAppStore } from "@/store/useAppStore";
// import { clsx } from "clsx";

// export default function ClientShell() {
//   const {
//     isRegistered,
//     userType,
//     preQuizAnswers,
//     setUserType,
//     syncWithServer,
//     isSidebarOpen,
//     isHelpOpen,
//     toggleSidebar,
//     toggleHelp,
//     currentStep,
//   } = useAppStore();
//   const router = useRouter();

//   // Analyze preQuizAnswers to determine userType
//   useEffect(() => {
//     if (!isRegistered && preQuizAnswers.length === 4) {
//       const budgetAnswer = preQuizAnswers.find(
//         (answer) => answer.questionIndex === 2
//       )?.selectedOption;
//       const userType =
//         budgetAnswer === 3
//           ? "designer"
//           : budgetAnswer && budgetAnswer >= 1
//           ? "contractor"
//           : "homeowner";
//       setUserType(userType);
//     }
//   }, [preQuizAnswers, isRegistered, setUserType, router]);

//   // Sync data with server after registration
//   useEffect(() => {
//     if (isRegistered) {
//       syncWithServer();
//     }
//   }, [isRegistered, syncWithServer]);

//   return (
//     <div className="flex min-h-screen dark:bg-secondary-900 bg-gray-50 relative">
//       {/* Sidebar: Hidden when help is open on mobile */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         isHelpOpen={isHelpOpen}
//         onClose={toggleSidebar}
//       />

//       <div
//         className={clsx(
//           "flex flex-col flex-1 transition-all duration-300",
//           isHelpOpen ? "md:ml-64 lg:ml-[400px]" : "md:ml-64"
//         )}
//       >
//         <Topbar
//           isHelpOpen={isHelpOpen}
//           onHelpToggle={toggleHelp}
//           onMenuClick={toggleSidebar}
//         />
//         <main className="flex-grow py-5 sm:py-10 px-5 sm:px-10 lg:px-20 xl:px-40">
//           <ProgressSegment />
//           <QuizPage currentStep={currentStep} />
//           <QuizNavigation />
//           {isRegistered && <EstimationForm />}
//         </main>
//       </div>

//       {/* Help Panel */}
//       {isHelpOpen && (
//         <div className="fixed top-0 right-0 h-full w-[300px] bg-white dark:bg-secondary-800 shadow-lg z-50 p-4">
//           <button
//             onClick={() => setIsHelpOpen(false)}
//             className="absolute top-4 right-4 text-gray-500 dark:text-gray-300"
//             aria-label="Close help panel"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//           <h2 className="text-xl font-bold mb-4 dark:text-white">Help</h2>
//           <p className="text-gray-600 dark:text-gray-300">
//             Here you can find guidance on how to answer the questions or contact
//             support.
//           </p>
//           {/* Add more help content as needed */}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import QuizPage from "@/components/templates/QuizPage/QuizPage";
import QuizNavigation from "@/components/templates/QuizNavigation/QuizNavigation";
import ProgressSegment from "../ProgressBar/ProgressBar";
import EstimationForm from "@/components/templates/EstimationForm/EstimationForm";
import { useAppStore } from "@/store/useAppStore";
import { clsx } from "clsx";
import HelpPanel from "../HelpPanel/HelpPanel";

export default function ClientShell() {
  const {
    isRegistered,
    userType,
    preQuizAnswers,
    setUserType,
    syncWithServer,
    isSidebarOpen,
    isHelpOpen,
    toggleSidebar,
    toggleHelp,
    currentStep,
  } = useAppStore();

  const router = useRouter();

  // تعیین نوع کاربر
  useEffect(() => {
    if (!isRegistered && preQuizAnswers.length === 4) {
      const budgetAnswer = preQuizAnswers.find(
        (answer) => answer.questionIndex === 2
      )?.selectedOption;
      const userType =
        budgetAnswer === 3
          ? "designer"
          : budgetAnswer && budgetAnswer >= 1
          ? "contractor"
          : "homeowner";
      setUserType(userType);
    }
  }, [preQuizAnswers, isRegistered, setUserType, router]);

  // همگام‌سازی با سرور
  useEffect(() => {
    if (isRegistered) {
      syncWithServer();
    }
  }, [isRegistered, syncWithServer]);

  return (
    <div className="flex min-h-screen dark:bg-secondary-900 bg-gray-50 relative">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isHelpOpen={isHelpOpen}
        onClose={toggleSidebar}
      />

      {/* Main Content */}
      <div
        className={clsx(
          "flex flex-col flex-1 transition-all duration-300",
          isHelpOpen ? " lg:mr-[320px]" : "md:ml-64"
        )}
      >
        <Topbar
          isHelpOpen={isHelpOpen}
          onHelpToggle={toggleHelp}
          onMenuClick={toggleSidebar}
        />
        <main className={`flex-grow w-full ${isHelpOpen ? 'px-0 md:px-5 lg:pl-5 xl:px-20' : ' md:px-10 lg:px-20 xl:px-40'} py-5 sm:py-20`}>
          <ProgressSegment isHelpOpen={isHelpOpen} />
          <QuizPage isHelpOpen={isHelpOpen} />
          <QuizNavigation isHelpOpen={isHelpOpen} />
        </main>
      </div>

      {/* Help Panel */}
      {isHelpOpen && (
        <div className="fixed top-0 right-0 h-full w-[320px] bg-white dark:bg-secondary-800 shadow-lg z-50 p-4">
          <button
            onClick={toggleHelp}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300"
            aria-label="Close help panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <HelpPanel isHelpOpen={isHelpOpen} />
        </div>
      )}
    </div>
  );
}
