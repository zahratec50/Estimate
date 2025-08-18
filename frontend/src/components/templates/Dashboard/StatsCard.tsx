import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  label: string;
  value: string | number;
}

export const StatsCard = ({ label, value }: StatsCardProps) => (
  <Card className="hover:shadow-lg transition cursor-pointer">
    <CardHeader>
      <CardTitle>{label}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
    </CardContent>
  </Card>
);
