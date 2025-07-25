// "use client";
// import React from "react";

// type NumberPageProps = {
//   numberPage: number;
// };

// const ProgressSegment: React.FC<NumberPageProps> = ({ numberPage }) => {
//   const segments = 4;

//   const clampedPage = Math.max(1, Math.min(numberPage, segments));
//   const progress = (clampedPage / segments) * 100;

//   const getCircleLeft = () => `calc(${progress}% - 10px)`;

//   return (
//     <div className="flex items-center justify-start p-0 md:py-4 font-sans">
//       <div className="w-[350px] sm:w-[235px] lg:w-[390px] h-[34px]  relative">
//         {/* Progress line */}
//         <div className="w-full h-3 bg-primary-200 rounded-full relative overflow-hidden">
//           <div
//             className="absolute top-0 left-0 h-3 bg-primary-500 rounded-full transition-[width] duration-1000 ease-in-out"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>

//         {/* Main white circle */}
//         <div
//           className="absolute top-[6px] -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg transition-[left] duration-1000 ease-in-out"
//           style={{ left: getCircleLeft() }}
//         ></div>

//         {/* Segment markers */}
//         <div className="absolute inset-0 flex justify-between px-2 mt-4">
//           {Array.from({ length: segments }).map((_, idx) => (
//             <div
//               key={idx}
//               className="w-[89px] h-3 flex flex-col items-end ml-4"
//             >
//               <span className="text-xs text-black-50 font-medium mb-2">
//                 Title
//               </span>
//               <div className="w-4 h-4 rounded-full bg-gray-300 mt-[6px]" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressSegment;
"use client";

import React from "react";

type NumberPageProps = {
  numberPage: number;
};

const ProgressSegment: React.FC<NumberPageProps> = ({ numberPage }) => {
  const segments = 4;
  const clampedPage = Math.max(1, Math.min(numberPage, segments));
  const progress = (clampedPage / segments) * 100;

  return (
    <div className="flex items-center justify-center py-4 font-sans w-full">
      <div className="relative w-[350px] sm:w-[235px] lg:w-[390px] h-[34px]">
        {/* خط پیشرفت */}
        <div className="w-full h-3 bg-primary-200 rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-3 bg-primary-500 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* دایره سفید اصلی */}
        <div
          className="absolute top-[1.5px] w-2 h-2 bg-white rounded-full shadow-lg transition-all duration-1000 ease-in-out"
          style={{ left: `calc(${progress}% - 10px)` }}
        ></div>

        {/* مارکرها */}
        <div className="absolute inset-0 flex justify-between px-2 mt-4">
          {Array.from({ length: segments }).map((_, idx) => (
            <div
              key={idx}
              className="w-[89px] h-3 flex flex-col items-end ml-4"
            >
              <span className="text-xs text-black-50 font-medium mb-2">
                Title
              </span>
              <div
                className={`w-4 h-4 rounded-full ${
                  idx + 1 <= clampedPage ? "bg-primary-500" : "bg-gray-300"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSegment;
