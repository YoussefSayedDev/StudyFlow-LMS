"use client";

import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function HomePage() {
  const { user, error } = useAuthStore();
  const router = useRouter();
  const t = useTranslations("common");

  useEffect(() => {
    // If user doesn't exist, redirect to sign-in page
    if (!user) {
      router.push("/sign-in");
    }
    // If user is authenticated, redirect based on role
    if (user?.role) router.replace(`/${user.role}/home`);
  }, [user, router]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const circleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-background to-muted/30">
      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h1 className="mb-2 text-3xl font-bold text-primary">
            {t("appName")}
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            {t("redirecting")}
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto h-24 w-24"
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            variants={circleVariants}
            animate="animate"
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-primary/40"
            variants={circleVariants}
            animate="animate"
            transition={{ delay: 0.2 }}
          />
          <motion.div
            className="absolute inset-4 rounded-full bg-primary/60"
            variants={circleVariants}
            animate="animate"
            transition={{ delay: 0.4 }}
          />
          <motion.div
            className="absolute inset-6 rounded-full bg-primary"
            variants={circleVariants}
            animate="animate"
            transition={{ delay: 0.6 }}
          />
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-muted-foreground"
          variants={itemVariants}
        >
          {t("preparingExperience")}
        </motion.p>
      </motion.div>
    </div>
  );
}
