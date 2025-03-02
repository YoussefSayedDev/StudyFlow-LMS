"use client";

import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function HomePage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const t = useTranslations("common");

  useEffect(() => {
    // If user is authenticated, redirect based on role
    if (user?.role) router.replace(`/${user.role}/home`);
  }, [user, router]);

  // Show loading state while checking authentication or during redirect
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">{t("redirecting")}</h1>
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    </div>
  );
}
