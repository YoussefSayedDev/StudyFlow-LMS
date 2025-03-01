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

type PersonalInfoInputs = z.infer<
  ReturnType<typeof useCreateOnboardingSchemas>["PersonalInfoSchema"]
>;

interface PersonalInfoStepProps {
  onNext: () => void;
}

export default function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
  const { data, updateData } = useOnboarding();
  const t = useTranslations("onboarding.form");
  const { PersonalInfoSchema } = useCreateOnboardingSchemas();

  const form = useForm<PersonalInfoInputs>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      phoneNumber: data.phoneNumber || "",
      birthOfDate: data.birthOfDate || "",
    },
  });

  const onSubmit = (values: PersonalInfoInputs) => {
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.firstName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("placeholders.firstName")}
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.lastName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("placeholders.lastName")}
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.phoneNumber")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("placeholders.phoneNumber")}
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
            >
              <FormField
                control={form.control}
                name="birthOfDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.birthOfDate")}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={formItemVariants}
              className="flex justify-end"
            >
              <Button type="submit">{t("buttons.next")}</Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
