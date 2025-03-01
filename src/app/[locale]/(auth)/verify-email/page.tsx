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
import { api } from "@/lib/api";
// import { apiService } from "@/lib/api";
// import { useSignupMutation } from "@/redux/features/apiSlice";
// import {
//   selectUser,
//   selectUserEmail,
//   selectUserToken,
// } from "@/redux/features/auth";
// import { RootState } from "@/redux/store/store";
import { useAuthStore } from "@/lib/store/authStore";
import formatTimer from "@/lib/utils/formatTimer";
import { Languages } from "@/types";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type React from "react"; // Added import for React
import { useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";

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
  const [isPending, startTransition] = useTransition();
  // const [signup, { isLoading, isSuccess, isError, data: signupData, error }] =
  //   useSignupMutation();

  // const signupData = useSelector(
  //   (state: RootState) => state.api.queries["sign({})"]?.data,
  // );

  const { user } = useAuthStore();

  // console.log("signupData from verification", signupData);

  // Localization
  const t = useTranslations("auth.signUp.form.verification");
  const locale = useLocale() as Languages;

  // Hooks
  // const user = useSelector(selectUser);
  const router = useRouter();
  // const accessToken = useSelector(selectUserToken);

  console.log("user", user);

  // Handlers
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle verification logic here
    console.log("Verifying code:", verificationCode);
    try {
      setIsResending(true);
      if (user) {
        const response = await api.post("/auth/verify-email", {
          userId: user.id,
          code: verificationCode,
        });
        console.log("response", response);
        router.push("/onboarding/general");
      }
    } catch (error) {
      console.log("error", error);
    }
    // startTransition(async () => {});
  };

  // Handle countdown
  const handleResend = () => {
    setTries(tries + 1);
    // Simulating resend delay

    setTimeout(() => {
      setIsResending(false);
      // Handle resend logic here
      if (tries === 1) {
        setCountdown(FIRST_VERIFICATION_CODE_LENGTH);
      } else if (tries === 2) {
        setCountdown(SECOND_VERIFICATION_CODE_LENGTH);
      } else if (tries === 3) {
        setCountdown(THIRD_VERIFICATION_CODE_LENGTH);
      } else {
        /// Send message to user try again later

        // but for now, just set it to 12 seconds
        setCountdown(12);
      }
      setIsActive(true);
      console.log("Resending verification code");
    }, 2000);
  };

  // UseEffects
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
