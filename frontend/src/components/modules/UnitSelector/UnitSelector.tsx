// "use client";

// import clsx from "clsx";

// interface UnitSelectorProps {
//   units: string[];
//   selectedUnit: string;               // اضافه کردن selectedUnit
//   setSelectedUnit: (unit: string) => void;  // اضافه کردن setSelectedUnit
// }

// export default function UnitSelector({ units, selectedUnit, setSelectedUnit }: UnitSelectorProps) {
//   return (
//     <div className="flex gap-2 mt-2">
//       {units.map((u) => (
//         <button
//           key={u}
//           onClick={() => setSelectedUnit(u)}
//           className={clsx(
//             "px-3 py-1 rounded-md border transition-colors",
//             u === selectedUnit
//               ? "bg-primary-500 text-white border-primary-500"
//               : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//           )}
//         >
//           {u}
//         </button>
//       ))}
//     </div>
//   );
// }


"use client";
import { IoIosCheckmark } from "react-icons/io";

interface Props {
  units: string[];
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
}

export const UnitSelector = ({ units, selectedUnit, setSelectedUnit }: Props) => {
  return (
    <div className="flex gap-2 mt-2">
      {units.map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => setSelectedUnit(u)}
          className={`px-3 py-1 rounded-md border ${
            u === selectedUnit ? "bg-primary-500 text-white" : "border-gray-300"
          }`}
        >
          {u} {u === selectedUnit && <IoIosCheckmark className="inline ml-1" />}
        </button>
      ))}
    </div>
  );
};
