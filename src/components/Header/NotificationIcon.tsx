import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, BellRing, Check } from "lucide-react";
import React from "react";
import { FaRegBell } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type NotificationIconProps = React.ComponentProps<typeof Card>;

export default function NotificationIcon({
  className,
  ...props
}: NotificationIconProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex size-8 cursor-pointer items-center justify-center">
          <Bell className="size-6" />
          <span className="absolute right-1.5 top-0.5 flex size-2.5 items-center justify-center rounded-full bg-purple-500" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="mr-5 w-[350px] md:mr-20">
        <div className={cn("bg-transparent", className)} {...props}>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifcations
                </p>
                <p className="text-sm text-muted-foreground">
                  Send notifcations to device.
                </p>
              </div>
              <Switch />
            </div>
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex size-2 translate-y-1 rounded-full bg-sky-500"></span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Check /> Mark all as read
            </Button>
          </CardFooter>
        </div>
      </PopoverContent>
    </Popover>
  );
}
