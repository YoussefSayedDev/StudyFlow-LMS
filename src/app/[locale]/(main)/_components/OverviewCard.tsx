import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CircleFadingArrowUp, LucideIcon, MoveRight } from "lucide-react";

interface OverviewCardProps {
  title: string;
  number: number;
  percentage: number;
  icon: React.ReactNode;
  link: string;
  className?: string;
}

export default function OverviewCard({
  className,
  title,
  number,
  percentage,
  icon,
}: OverviewCardProps) {
  return (
    <Card className={cn("w-full min-w-[300px]", className)}>
      <CardContent className="m-2 mb-0 flex items-center justify-between gap-2 rounded-md bg-sidebar-background p-4">
        <div className="">
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <div className="flex items-center gap-1">
            <p className="text-lg text-muted-foreground">{number}</p>
            <span className="flex items-center justify-center gap-1 rounded-md bg-green-500 px-2 py-1 text-xs font-bold text-muted">
              <CircleFadingArrowUp className="size-3" />
              {percentage}
            </span>
          </div>
        </div>
        <div>{icon}</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2 py-2">
        <span>Show more</span>
        <MoveRight />
      </CardFooter>
    </Card>
  );
}
