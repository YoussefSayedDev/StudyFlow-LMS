"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnboarding } from "@/lib/store/useOnboarding";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

async function submitOnboarding(data: any) {
  const res = await fetch("/api/onboarding/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export default function ReviewStep({ onPrevious }: { onPrevious: () => void }) {
  const router = useRouter();
  const { data } = useOnboarding();
  const t = useTranslations("onboarding");

  const { mutate, isPending } = useMutation({
    mutationFn: submitOnboarding,
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const handleSubmit = () => {
    mutate(data);
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle>{t("review.title")}</CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="space-y-2"
        >
          <h3 className="text-lg font-medium">{t("review.personalInfo")}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {t("form.labels.firstName")}
              </p>
              <p>{data.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t("form.labels.lastName")}
              </p>
              <p>{data.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t("form.labels.phoneNumber")}
              </p>
              <p>{data.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t("form.labels.birthOfDate")}
              </p>
              <p>{data.birthOfDate}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="space-y-2"
        >
          <h3 className="text-lg font-medium">{t("review.roleInfo")}</h3>
          <p className="capitalize">{t(`form.roles.${data.role}`)}</p>
        </motion.div>

        {data.role === "student" && (
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="space-y-2"
          >
            <h3 className="text-lg font-medium">
              {t("review.studentDetails")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("form.labels.grade")}
                </p>
                <p>{data.grade}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("form.labels.studentId")}
                </p>
                <p>{data.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("form.labels.subjects")}
                </p>
                <p>{data.subjects}</p>
              </div>
            </div>
          </motion.div>
        )}

        {data.role === "teacher" && (
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="space-y-2"
          >
            <h3 className="text-lg font-medium">
              {t("review.teacherDetails")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("form.labels.department")}
                </p>
                <p className="capitalize">{data.department}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("form.labels.teacherId")}
                </p>
                <p>{data.teacherId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("form.labels.subjects")}
                </p>
                <p>{data.subjects}</p>
              </div>
            </div>
          </motion.div>
        )}

        {data.role === "parent" && (
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="space-y-2"
          >
            <h3 className="text-lg font-medium">{t("review.parentDetails")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("form.labels.childrenCount")}
                </p>
                <p>{data.childrenCount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("form.labels.childrenIds")}
                </p>
                <p>{data.childrenIds}</p>
              </div>
            </div>
          </motion.div>
        )}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="flex justify-between pt-6"
        >
          <Button type="button" variant="outline" onClick={onPrevious}>
            {t("form.buttons.previous")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="relative"
          >
            {isPending ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
              </motion.div>
            ) : (
              t("form.buttons.complete")
            )}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
