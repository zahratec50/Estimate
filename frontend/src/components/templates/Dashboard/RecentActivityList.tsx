import { RecentActivityItem } from "./RecentActivityItem";

interface RecentActivityListProps {
  activities: { text: string; time: string }[];
}

export const RecentActivityList = ({ activities }: RecentActivityListProps) => (
  <div className="space-y-4 mt-8">
    {activities.map((act, idx) => (
      <RecentActivityItem key={idx} text={act.text} time={act.time} />
    ))}
  </div>
);
