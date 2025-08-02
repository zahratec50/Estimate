'use client';

import clsx from 'clsx';
import { useAppStore } from '@/store/useAppStore';

export default function ProgressSegment({ isHelpOpen }: { isHelpOpen: boolean }) {
  const { isRegistered, userType } = useAppStore();
  const currentStep = useAppStore((state) => state.currentStep);
  const totalSteps = isRegistered && userType ? 1 : 7;

  return (
    <div className={`w-full max-w-[300px] ${isHelpOpen ? 'ml-0 lg:ml-40 2xl:ml-64' : ' mx-auto'}  mb-6`}>
      <div className="flex items-center justify-between">
        <div
          className="grid w-full"
          style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}
        >
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={clsx(
                  'w-6 h-6 rounded-full flex items-center justify-center text-white text-sm',
                  currentStep > index + 1
                    ? 'bg-primary-500 dark:bg-secondary-300'
                    : currentStep === index + 1
                    ? 'bg-primary-400 dark:bg-secondary-300'
                    : 'bg-gray-300 dark:bg-gray-600'
                )}
              >
                {index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={clsx(
                    'h-1 flex-1 mx-1',
                    currentStep > index + 1
                      ? 'bg-primary-500 dark:bg-secondary-300'
                      : 'bg-gray-300 dark:bg-gray-600'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import clsx from 'clsx';
// import { useAppStore } from '@/store/useAppStore';

// export default function ProgressSegment() {
//   const { currentStep } = useAppStore();
//   const segments: number = 4;
//   const clampedPage = Math.max(1, Math.min(currentStep, segments));
//   const progress = (clampedPage / segments) * 100;

//   return (
//     <div className="flex items-center justify-center pb-6 font-roboto w-full">
//       <div className="relative w-[300px] h-[34px]">
//         {/* Progress line */}
//         <div className="w-full h-3 bg-gray-201 dark:bg-secondary-800 rounded-full overflow-hidden relative">
//           <div
//             className="absolute top-0 left-0 h-3 bg-primary-500 dark:bg-secondary-500 rounded-full transition-all duration-1000 ease-in-out"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>

//         {/* Main white circle */}
//         <div
//           className="absolute top-[1.5px] w-2 h-2 bg-white rounded-full shadow-lg transition-all duration-1000 ease-in-out"
//           style={{ left: `calc(${progress}% - 10px)` }}
//         ></div>

//         {/* Markers */}
//         <div className="absolute inset-0 flex justify-between px-2 mt-4">
//           {Array.from({ length: segments }).map((_, idx) => (
//             <div key={idx} className="w-[75px] h-3 flex flex-col items-center">
//               <span className="text-xs dark:text-white text-black-50 font-medium mb-2">
//                 Step {idx + 1}
//               </span>
//               <div
//                 className={clsx(
//                   'w-4 h-4 rounded-full',
//                   idx + 1 <= clampedPage ? 'bg-primary-500 dark:bg-secondary-500' : 'bg-gray-300 dark:bg-gray-600'
//                 )}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }