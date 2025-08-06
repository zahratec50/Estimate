// 'use client';

// import clsx from 'clsx';
// import { useAppStore } from '@/store/useAppStore';

// export default function ProgressSegment({ isHelpOpen }: { isHelpOpen: boolean }) {
//   const { isRegistered, userType } = useAppStore();
//   const currentStep = useAppStore((state) => state.currentStep);
//   const totalSteps = isRegistered && userType ? 1 : 7;

//   return (
//     <div className={`w-full max-w-[300px] ${isHelpOpen ? 'ml-0 lg:ml-40 2xl:ml-64' : ' mx-auto'}  mb-6`}>
//       <div className="flex items-center justify-between">
//         <div
//           className="grid w-full"
//           style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}
//         >
//           {Array.from({ length: totalSteps }, (_, index) => (
//             <div key={index} className="flex items-center">
//               <div
//                 className={clsx(
//                   'w-6 h-6 rounded-full flex items-center justify-center text-white text-sm',
//                   currentStep > index + 1
//                     ? 'bg-primary-500 dark:bg-secondary-300'
//                     : currentStep === index + 1
//                     ? 'bg-primary-400 dark:bg-secondary-300'
//                     : 'bg-gray-300 dark:bg-gray-600'
//                 )}
//               >
//                 {index + 1}
//               </div>
//               {index < totalSteps - 1 && (
//                 <div
//                   className={clsx(
//                     'h-1 flex-1 mx-1',
//                     currentStep > index + 1
//                       ? 'bg-primary-500 dark:bg-secondary-300'
//                       : 'bg-gray-300 dark:bg-gray-600'
//                   )}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import clsx from 'clsx';
// import { useAppStore } from '@/store/useAppStore';
// import { Check } from 'lucide-react';

// export default function ProgressSegment({ isHelpOpen }: { isHelpOpen: boolean }) {
//   const { isRegistered, userType } = useAppStore();
//   const currentStep = useAppStore((state) => state.currentStep);
//   const totalSteps = isRegistered && userType ? 1 : 7;

//   return (
//     <div
//       className={clsx(
//         'w-full max-w-[300px] mb-6 transition-all duration-300',
//         isHelpOpen ? 'ml-0 lg:ml-40 2xl:ml-64' : 'mx-auto'
//       )}
//     >
//       <div className="flex items-center justify-between">
//         <div
//           className="grid w-full gap-1"
//           style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}
//         >
//           {Array.from({ length: totalSteps }, (_, index) => {
//             const stepNumber = index + 1;
//             const isDone = currentStep > stepNumber;
//             const isActive = currentStep === stepNumber;

//             return (
//               <div key={index} className="flex items-center">
//                 <div
//                   className={clsx(
//                     'w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium',
//                     isDone
//                       ? 'bg-primary-500 text-white'
//                       : isActive
//                       ? 'border-2 border-primary-500 text-primary-700 bg-white dark:bg-secondary-900 dark:text-secondary-300 dark:border-secondary-300'
//                       : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
//                   )}
//                 >
//                   {isDone ? <Check size={16} /> : stepNumber}
//                 </div>

//                 {index < totalSteps - 1 && (
//                   <div
//                     className={clsx(
//                       'h-1 flex-1 mx-1 rounded-full',
//                       isDone
//                         ? 'bg-primary-500 dark:bg-secondary-300'
//                         : 'bg-gray-300 dark:bg-gray-600'
//                     )}
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


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

//! اینو میخوام

'use client';

import clsx from 'clsx';
import { useAppStore } from '@/store/useAppStore';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProgressSegment({ isHelpOpen }: { isHelpOpen: boolean }) {
  const { isRegistered, userType } = useAppStore();
  const currentStep = useAppStore((state) => state.currentStep);
  const totalSteps = isRegistered && userType ? 1 : 7;

  // حالت برای scale انیمیشن مرحله جاری
  const [animatedStep, setAnimatedStep] = useState(currentStep);

  useEffect(() => {
    setAnimatedStep(currentStep);
  }, [currentStep]);

  return (
    <div
      className={clsx(
        'w-full max-w-[700px] mx-auto mb-10 transition-all duration-300 rounded-lg bg-opacity-90 dark:bg-secondary-900 dark:bg-opacity-80',
        isHelpOpen ? 'ml-0 lg:mr-40 2xl:mr-64 px-8 py-6' : 'px-6'
      )}
    >
      <div className="relative flex items-center justify-between px-4">
        {/* خط کلی پیشرفت */}
        <div className="absolute top-1/2 left-6 right-6 h-1.5 bg-gray-100 dark:bg-gray-700 z-0 transform -translate-y-1/2 rounded-full" />
        {/* خط پر شده */}
        <div
          className="absolute top-1/2 left-6 h-1.5 bg-gradient-to-r from-primary-500 to-primary-300 dark:from-secondary-300 dark:to-secondary-200 z-10 transform -translate-y-1/2 rounded-full transition-all duration-500"
          style={{
            width:
              totalSteps > 1
                ? `${((currentStep - 1) / (totalSteps - 1)) * 100}%`
                : '100%',
          }}
        />

        {/* دایره‌ها */}
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const isDone = currentStep > step;
          const isCurrent = currentStep === step;
          const isAnimated = animatedStep === step;

          return (
            <div
              key={step}
              className="relative z-20 flex flex-col items-center transition-transform duration-300"
              style={{
                transform: isAnimated ? 'scale(1.2)' : 'scale(1)',
                
              }}
            >
              <div
                className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-colors duration-300',
                  isDone
                    ? 'bg-primary-500 text-white dark:bg-secondary-300 dark:text-black'
                    : isCurrent
                    ? 'bg-primary-400 text-white dark:bg-secondary-900 dark:border-secondary-300 dark:text-secondary-200'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                )}
              >
                {isDone ? <Check size={20} /> : step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// 'use client';

// import clsx from 'clsx';
// import { useAppStore } from '@/store/useAppStore';

// export default function ProgressSegment({ isHelpOpen }: { isHelpOpen: boolean }) {
//   const currentStep = useAppStore((state) => state.currentStep);
//   const totalSteps = 7; // به دلخواه تو میتونی تغییر بدی

//   const clampedStep = Math.max(1, Math.min(currentStep, totalSteps));
//   const progressPercent = ((clampedStep - 1) / (totalSteps - 1)) * 100;

//   return (
//     <div
//       className={clsx(
//         'flex justify-center pb-6 font-roboto w-full transition-all duration-300',
//         isHelpOpen ? 'max-w-[900px] mx-auto px-8' : 'max-w-[400px] mx-auto px-4'
//       )}
//     >
//       <div className="relative w-full max-w-[700px] h-12">
//         {/* Background line */}
//         <div className="w-full h-4 bg-gray-200 dark:bg-secondary-800 rounded-full overflow-hidden relative shadow-inner">
//           {/* Progress fill */}
//           <div
//             className="absolute top-0 left-0 h-4 bg-gradient-to-r from-primary-500 to-primary-400 dark:from-secondary-500 dark:to-secondary-400 rounded-full transition-all duration-700 ease-in-out"
//             style={{ width: `${progressPercent}%` }}
//           />
//         </div>

//         {/* Progress knob */}
//         <div
//           className="absolute top-0 h-8 w-8 rounded-full bg-white border-4 border-primary-500 dark:border-secondary-500 shadow-lg transform -translate-y-1/2 transition-all duration-700 ease-in-out"
//           style={{ left: `calc(${progressPercent}% - 16px)` }}
//         />

//         {/* Step markers */}
//         <div className="absolute top-full left-0 right-0 flex justify-between mt-3 px-2 select-none">
//           {Array.from({ length: totalSteps }).map((_, idx) => {
//             const stepNumber = idx + 1;
//             const isActive = stepNumber === clampedStep;
//             const isCompleted = stepNumber < clampedStep;

//             return (
//               <div key={stepNumber} className="flex flex-col items-center w-16">
//                 <div
//                   className={clsx(
//                     'w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300',
//                     isCompleted
//                       ? 'bg-primary-600 dark:bg-secondary-400 text-white'
//                       : isActive
//                       ? 'bg-white border-2 border-primary-600 dark:border-secondary-400 text-primary-600 dark:text-secondary-400 shadow-md'
//                       : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
//                   )}
//                 >
//                   {stepNumber}
//                 </div>
//                 <span
//                   className={clsx(
//                     'mt-1 text-xs font-medium truncate w-full text-center',
//                     isActive
//                       ? 'text-primary-600 dark:text-secondary-400'
//                       : 'text-gray-500 dark:text-gray-400'
//                   )}
//                 >
//                   Step {stepNumber}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


//todo: cute

// 'use client';

// import clsx from 'clsx';
// import { useAppStore } from '@/store/useAppStore';
// import { useEffect, useState } from 'react';

// export default function ProgressSegment({ isHelpOpen }: { isHelpOpen: boolean }) {
//   const { isRegistered, userType } = useAppStore();
//   const currentStep = useAppStore((state) => state.currentStep);
//   const totalSteps = isRegistered && userType ? 1 : 7;

//   const [animatedStep, setAnimatedStep] = useState(currentStep);

//   useEffect(() => {
//     setAnimatedStep(currentStep);
//   }, [currentStep]);

//   // درصد پیشرفت از 0 تا 100
//   const progressPercent =
//     totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 100;

//   return (
//     <div
//       className={clsx(
//         'w-full max-w-[900px] mx-auto mb-10 rounded-lg',
//         isHelpOpen ? 'ml-0 lg:ml-40 2xl:ml-64 px-8 py-6' : 'px-6 py-5',
//         'bg-gradient-to-r from-primary-50 to-primary-300 dark:from-gray-700 dark:to-gray-800',
//         'shadow-sm'
//       )}
//     >
//       <div className="relative h-4 rounded-full bg-primary-50 dark:bg-gray-600 overflow-hidden">
//         {/* نوار پیشرفت */}
//         <div
//           className="absolute top-0 left-0 h-4 bg-gradient-to-r from-primary-100 to-primary-400 transition-all duration-700 ease-in-out"
//           style={{ width: `${progressPercent}%` }}
//         />

//         {/* نقاط نشانگر مراحل */}
//         <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-2">
//           {Array.from({ length: totalSteps }).map((_, idx) => {
//             const step = idx + 1;
//             const isPassed = currentStep > step;
//             const isActive = currentStep === step;

//             return (
//               <div
//                 key={step}
//                 className={clsx(
//                   'w-6 h-6 rounded-full border-2 border-white bg-white dark:bg-gray-900 flex items-center justify-center transition-all duration-500',
//                   isPassed
//                     ? 'bg-primary-600 border-primary-600 shadow-lg scale-110'
//                     : isActive
//                     ? 'bg-primary-400 border-primary-400 shadow-md scale-125'
//                     : 'bg-secondary-300 dark:bg-gray-700 border-gray-400'
//                 )}
//                 style={{
//                   filter: isPassed ? 'drop-shadow(0 0 5px #C7A16F)' : 'none',
//                 }}
//               >
//                 {/* نقطه کوچک داخل به جای عدد */}
//                 <div
//                   className={clsx(
//                     'w-2 h-2 rounded-full bg-white',
//                     !isPassed && 'opacity-50'
//                   )}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useEffect, useState } from 'react';
// import clsx from 'clsx';
// import { useAppStore } from '@/store/useAppStore';

// export default function ProgressSegment({ isHelpOpen }: { isHelpOpen: boolean }) {
//   const { isRegistered, userType } = useAppStore();
//   const currentStep = useAppStore((state) => state.currentStep);
//   const totalSteps = isRegistered && userType ? 1 : 7;

//   // درصد پیشرفت بر اساس مرحله جاری
//   const progressPercent =
//     totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 100;

//   // مختصات نقاط روی خط به درصد (برای نمایش دایره‌ها)
//   const pointsPercent = Array.from({ length: totalSteps }).map(
//     (_, idx) => (idx / (totalSteps - 1)) * 100
//   );

//   return (
//     <div
//       className={clsx(
//         'w-full max-w-[900px] mx-auto mb-10 rounded-lg',
//         isHelpOpen ? 'ml-0 lg:ml-40 2xl:ml-64 px-8 py-6' : 'px-6 py-5',
//         'dark:bg-gray-900'
//       )}
//     >
//       <div className="relative h-6">
//         {/* خط پس زمینه خاکستری */}
//         <div className="absolute inset-0 rounded-full bg-primary-50 dark:bg-gray-700" />

//         {/* خط پیشرفت با گرادیان متحرک */}
//         <div
//           className="absolute left-0 top-0 h-6 rounded-full"
//           style={{
//             width: `${progressPercent}%`,
//             background:
//               'linear-gradient(90deg, #F4ECE2 0%, #E9D9C5 50%, #D2B48C 100%)',
//             transition: 'width 0.6s ease-in-out',
//           }}
//         />

//         {/* نقاط مراحل */}
//         {pointsPercent.map((pos, idx) => {
//           const isPassed = currentStep - 1 >= idx;
//           return (
//             <div
//               key={idx}
//               className={clsx(
//                 'absolute top-1/2 w-6 h-6 rounded-full border-2 transform -translate-y-1/2',
//                 isPassed
//                   ? 'bg-primary-400 border-primary-400 shadow-lg'
//                   : 'bg-primary-100 border-primary-100 dark:bg-gray-800 dark:border-gray-600',
//                 'transition-all duration-500 ease-in-out'
//               )}
//               style={{ left: `calc(${pos}% - 12px)` }}
//             >
//               {/* نقطه درون دایره برای مراحل گذرانده شده */}
//               {isPassed && (
//                 <div className="w-3 h-3 bg-primary-100 border-primary-400 rounded-full mx-auto mt-1 shadow" />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
