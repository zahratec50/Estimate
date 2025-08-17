// "use client";

// import React, { useEffect, useState } from "react";

// interface DigitalCountdownProps {
//   startHours?: number;
//   startMinutes?: number;
//   startSeconds?: number;
// }

// const DigitalCountdown: React.FC<DigitalCountdownProps> = ({
//   startHours = 1,
//   startMinutes = 10,
//   startSeconds = 0,
// }) => {
//   const [timeLeft, setTimeLeft] = useState(
//     startHours * 3600 + startMinutes * 60 + startSeconds
//   );

//   useEffect(() => {
//     // وقتی کامپوننت mount شد، شمارش معکوس شروع میشه
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 0) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const hours = Math.floor(timeLeft / 3600);
//   const minutes = Math.floor((timeLeft % 3600) / 60);
//   const seconds = timeLeft % 60;

//   const formatTime = (num: number) => num.toString().padStart(2, "0");

//   return (
//     <div className="flex justify-center items-center text-xl font-extrabold p-2 dark:bg-gray-900 rounded-lg">
//       <span>{formatTime(hours)}</span>
//       <span>:</span>
//       <span>{formatTime(minutes)}</span>
//       <span>:</span>
//       <span>{formatTime(seconds)}</span>
//     </div>
//   );
// };

// export default DigitalCountdown;


"use client";

import React, { useEffect, useState } from "react";

interface DigitalCountdownProps {
  startHours?: number;
  startMinutes?: number;
}

const DigitalCountdown: React.FC<DigitalCountdownProps> = ({
  startHours = 1,
  startMinutes = 10,
}) => {
  const [timeLeft, setTimeLeft] = useState(startHours * 60 + startMinutes); // زمان بر حسب دقیقه

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1 / 60; // کم کردن به اندازه 1 ثانیه
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 60);
  const minutes = Math.floor(timeLeft % 60);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex justify-center items-center text-xl font-mono p-2 rounded-lg">
      <span>{formatTime(hours)}</span>
      <span>:</span>
      <span>{formatTime(minutes)}</span>
    </div>
  );
};

export default DigitalCountdown;
