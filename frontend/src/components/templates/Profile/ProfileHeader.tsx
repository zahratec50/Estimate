// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { EditableField } from "./EditableField";

// interface ProfileHeaderProps {
//   name: string;
//   email: string;
//   userType: string;
//   onChange: (field: string, value: string) => void;
// }

// export const ProfileHeader = ({ name, email, userType, onChange }: ProfileHeaderProps) => (
//   <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
//     <div className="flex items-center gap-4">
//       <Avatar className="w-16 h-16">
//         <AvatarImage src={`/avatars/${name.toLowerCase()}.png`} alt={name} />
//         <AvatarFallback>{name[0]}</AvatarFallback>
//       </Avatar>
//       <div className="flex gap-6">
//         <EditableField label="Name" value={name} onChange={(v: string) => onChange("name", v)} />
//         <EditableField label="Email" value={email} onChange={(v: string) => onChange("email", v)} />
//         <EditableField label="User Type" value={userType} onChange={(v: string) => onChange("userType", v)} />
//       </div>
//     </div>
//   </div>
// );

"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditableField } from "./EditableField";
import { useAppStore } from "@/store/useAppStore";

interface ProfileHeaderProps {
  name: string;
  email: string;
  userType: string;
  onChange: (field: string, value: string) => void;
}

export const ProfileHeader = ({ name, email, userType, onChange }: ProfileHeaderProps) => {
  const userAvatar = useAppStore((state) => state.userAvatar);
  const setUserAvatar = useAppStore((state) => state.setUserAvatar);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (userAvatar) setPreview(userAvatar);
  }, [userAvatar]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      setUserAvatar(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-16 h-16">
            {preview ? <AvatarImage src={preview} alt={name} /> : <AvatarFallback>{name[0]}</AvatarFallback>}
          </Avatar>
          <input
            type="file"
            aria-label="image"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
          />
        </div>

        <div className="flex gap-6">
          <EditableField label="Name" value={name} onChange={(v: string) => onChange("name", v)} />
          <EditableField label="Email" value={email} onChange={(v: string) => onChange("email", v)} />
          <EditableField label="User Type" value={userType} onChange={(v: string) => onChange("userType", v)} />
        </div>
      </div>
    </div>
  );
};
