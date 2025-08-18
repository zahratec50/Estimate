import { Card, CardContent } from "@/components/ui/card";

interface ActivityItemProps {
  text: string;
  time: string;
}

export const RecentActivityItem = ({ text, time }: ActivityItemProps) => (
  <Card className="p-4 hover:shadow-md transition">
    <CardContent className="flex justify-between items-center">
      <span>{text}</span>
      <span className="text-gray-400 dark:text-gray-500 text-xs">{time}</span>
    </CardContent>
  </Card>
);
