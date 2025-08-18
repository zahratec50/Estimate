// interface AnswerItemProps {
//   question: string;
//   answer: string | string[];
//   onImageClick: (img: string) => void;
// }

// const AnswerItem = ({ question, answer, onImageClick }: AnswerItemProps) => {
//   const answerArray = Array.isArray(answer) ? answer : [answer];

//   return (
//     <li className="border-b border-gray-200 dark:border-secondary-600 pb-4 pl-5">
//       <p className="font-medium text-gray-700 dark:text-gray-200">{question}:</p>
//       <div className="mt-2 flex flex-wrap gap-3">
//         {answerArray.map((ans, i) =>
//           typeof ans === "string" && ans.startsWith("/images") ? (
//             <img
//               key={i}
//               src={ans}
//               alt={question}
//               className="h-28 w-28 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
//               onClick={() => onImageClick(ans)}
//             />
//           ) : (
//             <span
//               key={i}
//               className="px-3 py-1 bg-gray-200 dark:bg-secondary-600 rounded-full text-gray-800 dark:text-gray-100"
//             >
//               {ans}
//             </span>
//           )
//         )}
//       </div>
//     </li>
//   );
// };

// export default AnswerItem;

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoChevronDown, IoChevronUp } from "react-icons/io5";

// interface AnswerItemProps {
//   question: string;
//   answer: string | string[];
//   onImageClick: (img: string) => void;
// }

// const AnswerItem = ({ question, answer, onImageClick }: AnswerItemProps) => {
//   const answerArray = Array.isArray(answer) ? answer : [answer];
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="bg-white dark:bg-secondary-700 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-secondary-600">
//       {/* Header */}
//       <button
//         className="w-full flex justify-between items-center px-4 py-3 font-medium text-gray-700 dark:text-gray-200"
//         onClick={() => setOpen(!open)}
//       >
//         {question}
//         {open ? <IoChevronUp /> : <IoChevronDown />}
//       </button>

//       {/* Content */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="px-4 pb-4"
//           >
//             <div className="flex flex-wrap gap-3 mt-2">
//               {answerArray.map((ans, i) =>
//                 typeof ans === "string" && ans.startsWith("/images") ? (
//                   <img
//                     key={i}
//                     src={ans}
//                     alt={question}
//                     className="h-24 w-24 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
//                     onClick={() => onImageClick(ans)}
//                   />
//                 ) : (
//                   <span
//                     key={i}
//                     className="px-3 py-1 bg-gray-200 dark:bg-secondary-600 rounded-full text-gray-800 dark:text-gray-100"
//                   >
//                     {ans}
//                   </span>
//                 )
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AnswerItem;

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

interface AnswerItemProps {
  question: string;
  answer: string | string[];
  onImageClick: (img: string) => void;
}

const AnswerItem = ({ question, answer, onImageClick }: AnswerItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerArray = Array.isArray(answer) ? answer : [answer];

  return (
    <li className="border rounded-xl bg-white dark:bg-secondary-700 shadow-sm">
      <button
        className="w-full flex justify-between items-center px-4 py-3 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-700 dark:text-gray-100">
          {question}
        </span>
        <FiChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 flex flex-wrap gap-3">
              {answerArray.map((ans, i) =>
                typeof ans === "string" && ans.startsWith("/images") ? (
                  <img
                    key={i}
                    src={ans}
                    alt={question}
                    className="h-28 w-28 object-cover rounded-lg border cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => onImageClick(ans)}
                  />
                ) : (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-200 dark:bg-secondary-600 rounded-full text-gray-800 dark:text-gray-100"
                  >
                    {ans}
                  </span>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default AnswerItem;
