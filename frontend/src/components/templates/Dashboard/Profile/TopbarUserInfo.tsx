import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";

const TopbarUserInfo = () => {
  const { userName, userAvatar, isRegistered } = useAppStore();

  if (!isRegistered) return null;

  return (
    <Link href="/dashboard/profile" className="flex items-center gap-2 cursor-pointer">
      <Avatar className="w-10 h-10">
        {userAvatar ? (
          <AvatarImage src={userAvatar} alt={userName} />
        ) : (
          <AvatarFallback>{userName[0]}</AvatarFallback>
        )}
      </Avatar>
      <span className="hidden sm:block font-medium">{userName}</span>
    </Link>
  );
};

export default TopbarUserInfo;

