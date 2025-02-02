"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function StudyTimeTracker() {
  const [isTraking, setIsTracking] = useState(false);
  const [time, setTime] = useState(0);

  const toggleTracking = () => {
    setIsTracking(!isTraking);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTraking) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTraking, time]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Study Time Tracker
        </CardTitle>
        <Clock className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between text-3xl font-bold">
          <span>{formatTime(time)}</span>
          <Button
            onClick={() => setTime(0)}
            className="h-7 text-sm font-medium"
            variant="secondary"
          >
            Clear
          </Button>
        </div>
        <Button onClick={toggleTracking} className="w-full">
          {isTraking ? (
            <>
              <Pause className="mr-2 h-4 w-4" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2 size-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
