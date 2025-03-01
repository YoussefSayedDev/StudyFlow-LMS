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

type TeacherDetailsInputs = z.infer<
  ReturnType<typeof useCreateOnboardingSchemas>["TeacherDetailsSchema"]
>;

interface TeacherDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function TeacherDetailsStep({
  onNext,
  onPrevious,
}: TeacherDetailsStepProps) {
  const { data, updateData } = useOnboarding();
  const t = useTranslations("onboarding.form");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const { TeacherDetailsSchema } = useCreateOnboardingSchemas();

  const form = useForm<TeacherDetailsInputs>({
    resolver: zodResolver(TeacherDetailsSchema),
    defaultValues: {
      department: data.department || "",
      teacherId: data.teacherId || "",
      subjects: data.subjects || "",
    },
  });

  const onSubmit = (values: TeacherDetailsInputs) => {
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
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.department")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl dir={dir}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("placeholders.department")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent dir={dir}>
                        <SelectItem value="mathematics">
                          {t("options.teacher.math")}
                        </SelectItem>
                        <SelectItem value="science">
                          {t("options.teacher.science")}
                        </SelectItem>
                        <SelectItem value="english">
                          {t("options.teacher.english")}
                        </SelectItem>
                        <SelectItem value="history">
                          {t("options.teacher.history")}
                        </SelectItem>
                        <SelectItem value="art">
                          {t("options.teacher.art")}
                        </SelectItem>
                        <SelectItem value="music">
                          {t("options.teacher.music")}
                        </SelectItem>
                        <SelectItem value="physical_education">
                          {t("options.teacher.physical_education")}
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
                name="teacherId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.teacherId")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("placeholders.teacherId")}
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
