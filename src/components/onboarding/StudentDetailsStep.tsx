"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateOnboardingSchemas from "@/hooks/useCreateOnboardingSchemas";
import { useOnboarding } from "@/lib/store/useOnboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

type StudentDetailsInputs = z.infer<
  ReturnType<typeof useCreateOnboardingSchemas>["StudentDetailsSchema"]
>;

interface StudentDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function StudentDetailsStep({
  onNext,
  onPrevious,
}: StudentDetailsStepProps) {
  const { data, updateData } = useOnboarding();
  const t = useTranslations("onboarding.form");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const { StudentDetailsSchema } = useCreateOnboardingSchemas();

  const form = useForm<StudentDetailsInputs>({
    resolver: zodResolver(StudentDetailsSchema),
    defaultValues: {
      grade: data.grade || "",
      studentId: data.studentId || "",
      subjects: data.subjects || "",
    },
  });

  const onSubmit = (values: StudentDetailsInputs) => {
    updateData(values);
    onNext();
  };

  // Animation variants for form items
  const formItemVariants = {
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
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.grade")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl dir={dir}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("placeholders.grade")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent dir={dir}>
                        <SelectItem value="1">
                          {t("options.student.grade1")}
                        </SelectItem>
                        <SelectItem value="2">
                          {t("options.student.grade2")}
                        </SelectItem>
                        <SelectItem value="3">
                          {t("options.student.grade3")}
                        </SelectItem>
                        <SelectItem value="4">
                          {t("options.student.grade4")}
                        </SelectItem>
                        <SelectItem value="5">
                          {t("options.student.grade5")}
                        </SelectItem>
                        <SelectItem value="6">
                          {t("options.student.grade6")}
                        </SelectItem>
                        <SelectItem value="7">
                          {t("options.student.grade7")}
                        </SelectItem>
                        <SelectItem value="8">
                          {t("options.student.grade8")}
                        </SelectItem>
                        <SelectItem value="9">
                          {t("options.student.grade9")}
                        </SelectItem>
                        <SelectItem value="10">
                          {t("options.student.grade10")}
                        </SelectItem>
                        <SelectItem value="11">
                          {t("options.student.grade11")}
                        </SelectItem>
                        <SelectItem value="12">
                          {t("options.student.grade12")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.studentId")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("placeholders.studentId")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
            >
              <FormField
                control={form.control}
                name="subjects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.subjects")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("placeholders.subjects")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
              className="flex justify-between"
            >
              <Button type="button" variant="outline" onClick={onPrevious}>
                {t("buttons.previous")}
              </Button>
              <Button type="submit">{t("buttons.next")}</Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
