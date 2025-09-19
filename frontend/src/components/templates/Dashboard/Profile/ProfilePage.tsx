import { ProfileHeader } from "./ProfileHeader";
import { EditableFirstQuiz } from "./EditableFirstQuiz";

export default function ProfilePage() {
  

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto space-y-8">
      <ProfileHeader />
      <EditableFirstQuiz />
    </div>
  );
}
