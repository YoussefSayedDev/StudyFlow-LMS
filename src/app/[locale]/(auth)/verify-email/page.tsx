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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "@/i18n/routing";
import { useVerifyEmailMutation } from "@/lib/auth/authApi";
import { useAuthStore } from "@/lib/store/useAuthStore";
import formatTimer from "@/lib/utils/formatTimer";
import { Languages } from "@/types";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type React from "react";
import { useEffect, useState } from "react";

const FIRST_VERIFICATION_CODE_LENGTH = 60;
const SECOND_VERIFICATION_CODE_LENGTH = 90;
const THIRD_VERIFICATION_CODE_LENGTH = 120;

export default function VerifyEmail() {
  // State variables
  const [verificationCode, setVerificationCode] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(6);
  const [tries, setTries] = useState(0);

  // Auth store
  const { user, error, clearError } = useAuthStore();

  // React Query mutation
  const { mutate, isPending } = useVerifyEmailMutation();

  // Localization
  const t = useTranslations("auth.signUp.form.verification");
  const locale = useLocale() as Languages;

  // Router
  const router = useRouter();

  // Handlers
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !verificationCode || verificationCode.length !== 6) {
      return;
    }

    clearError();
    mutate({
      userId: user.id,
      code: verificationCode,
    });
  };

  // Handle countdown
  const handleResend = () => {
    setIsResending(true);
    setTries(tries + 1);

    // TODO: Add actual resend API call here
    // const resendCode = async () => {
    //   try {
    //     await api.post("/auth/resend-verification", { userId: user?.id });
    //   } catch (error) {
    //     console.error("Failed to resend code:", error);
    //   }
    // };
    // resendCode();

    setTimeout(() => {
      setIsResending(false);
      if (tries === 0) {
        setCountdown(FIRST_VERIFICATION_CODE_LENGTH);
      } else if (tries === 1) {
        setCountdown(SECOND_VERIFICATION_CODE_LENGTH);
      } else {
        setCountdown(THIRD_VERIFICATION_CODE_LENGTH);
      }
      setIsActive(true);
    }, 2000);
  };

  // Redirect after successful verification
  useEffect(() => {
    if (user?.isVerified) {
      router.push("/onboarding");
    }
  }, [user?.isVerified, router]);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, countdown]);

  // Redirect if no user is found
  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            {isPending && <p>Loading</p>}
            {t("title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify}>
            <div className="w-full space-y-2">
              <div className="mx-auto w-fit">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={(value) => setVerificationCode(value)}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup dir="ltr">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="mt-2 text-center text-sm">
                  {verificationCode === "" ? (
                    <>{t("enterCode")}</>
                  ) : (
                    <>
                      {t("youEntered")}{" "}
                      <span className="font-bold">{verificationCode}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="flex w-full items-center gap-2"
            onClick={handleVerify}
            disabled={isResending}
          >
            {isResending && <Loader2 className="animate-spin" />}
            {t("submit")}
          </Button>

          <div>
            {isActive ? (
              <Button variant="link" disabled className="text-sm text-gray-500">
                {t("resendCode")}
                <span>{formatTimer(countdown, false, locale)}</span>
              </Button>
            ) : (
              <Button
                variant="link"
                className="text-sm text-muted-foreground"
                onClick={handleResend}
                disabled={isResending}
              >
                <p>{isResending ? t("resend") : t("didNotReceive")}</p>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
