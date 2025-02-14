"use client";

import { useEffect, useState } from "react";

export const useVerificationTimer = (initialTime: number) => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(initialTime);

  useEffect(() => {
    if (!isActive || countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, countdown]);

  const resetTimer = (newTime: number) => {
    setCountdown(newTime);
    setIsActive(true);
  };

  return { isActive, countdown, resetTimer, setIsActive };
};
