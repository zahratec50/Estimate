'use client'

import React, { useState } from 'react';

const ProgressSegment: React.FC = () => {
  const segments = 4; // تعداد بخش‌ها
  const [progress, setProgress] = useState(0); // درصد پیشرفت

  // درصد به سمت هر بخش (0 تا 100)
  const handleStep = (stepIndex: number) => {
    // هر بخش 100 / segments درصد است
    const newProgress = (stepIndex / (segments - 1)) * 100;
    setProgress(newProgress);
  };

 
  const getCircleLeft = () => {
    return `calc(${progress}% - 10px)`; 
  };

  return (
    <div className="flex items-center justify-center p-4 font-sans">
      <div className="w-[380px] h-[34px] sm:w-[400px] relative">
        {/* خط پیشرفت */}
        <div className="w-full h-3 bg-primary-200 rounded-full">
          {/* قسمت پر شده */}
          <div
            className="absolute top-0 h-3 bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* دایره */}
        <div
          className="absolute top-[6px] -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg cursor-pointer transition-[left] duration-300"
          style={{
            left: getCircleLeft(),
          }}
          onClick={() => {
            // افزایش پیشرفت به سمت بخش بعد
            const nextStep = Math.round((progress / 100) * (segments - 1)) + 1;
            if (nextStep <= segments - 1) {
              handleStep(nextStep);
            }
          }}
        ></div>

        {/* زیر هر بخش عنوان "Title" */}
        <div className="absolute inset-0 flex justify-between px-2 mt-4">
          {Array.from({ length: segments }).map((_, idx) => (
            <div key={idx} className="w-[89px] h-3 flex flex-col items-end ml-4">
              {/* محل قرارگیری بر اساس درصد */}
              <span className="text-xs text-black-50 font-medium mb-2">Title</span>
              {/* موقعیت دایره رو با توجه به بخش‌ها تنظیم کن */}
              <div
                className="w-4 h-4 rounded-full bg-gray-300 mt-[6px]"
                // style={{
                //   marginTop: '6px', // کمی فاصله از عنوان
                // }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* کنترل‌های کم و زیاد کردن پیشرفت */}
      {/* <div className="mt-6 flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setProgress(prev => Math.max(prev - 25, 0))}
        >
          کاهش
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setProgress(prev => Math.min(prev + 25, 100))}
        >
          افزایش
        </button>
      </div> */}
    </div>
  );
};

export default ProgressSegment;