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
import useCreateOnboardingSchemas from "@/hooks/useCreateOnboardingSchemas";
import { useOnboarding } from "@/lib/store/useOnboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ParentDetailsInputs = z.infer<
  ReturnType<typeof useCreateOnboardingSchemas>["ParentDetailsSchema"]
>;

interface ParentDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function ParentDetailsStep({
  onNext,
  onPrevious,
}: ParentDetailsStepProps) {
  const { data, updateData } = useOnboarding();
  const t = useTranslations("onboarding.form");
  const { ParentDetailsSchema } = useCreateOnboardingSchemas();

  const form = useForm<ParentDetailsInputs>({
    resolver: zodResolver(ParentDetailsSchema),
    defaultValues: {
      childrenCount: data.childrenCount || "",
      childrenIds: data.childrenIds || "",
    },
  });

  const onSubmit = (values: ParentDetailsInputs) => {
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
                name="childrenCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.childrenCount")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder={t("placeholders.childrenCount")}
                        {...field}
                      />
                    </FormControl>
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
                name="childrenIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.childrenIds")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("placeholders.childrenIds")}
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
