"use client";

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
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react"; // Added import for React
import { useState } from "react";

export default function VerifyEmail() {
  // State variables
  const [verificationCode, setVerificationCode] = useState("");
  const [isResending, setIsResending] = useState(false);

  // Localization
  const t = useTranslations("auth.signUp.form.verification");
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle verification logic here
    console.log("Verifying code:", verificationCode);
  };

  const handleResend = () => {
    setIsResending(true);
    // Simulating resend delay
    setTimeout(() => {
      setIsResending(false);
      // Handle resend logic here
      console.log("Resending verification code");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify}>
            <div className="grid gap-4">
              <Input
                type="text"
                placeholder={t("placeholder")}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="text-center text-lg"
                maxLength={6}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" onClick={handleVerify}>
            {t("submit")}
          </Button>
          <Button
            variant="link"
            className="text-sm text-muted-foreground"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? t("resend") : t("didNotReceive")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
