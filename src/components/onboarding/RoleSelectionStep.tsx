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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { GiTeacher } from "react-icons/gi";
import { PiStudent } from "react-icons/pi";
import { RiParentLine } from "react-icons/ri";
import { z } from "zod";

const roleSchema = z.object({
  role: z.enum(["student", "teacher", "parent"], {
    required_error: "You need to select a role",
  }),
});

type RoleInputs = z.infer<typeof roleSchema>;

export default function RoleSelectionStep({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) {
  const { data, updateData } = useOnboardingStore();
  const t = useTranslations("onboarding.form");

  const form = useForm<RoleInputs>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: (data.role as "student" | "teacher" | "parent") || undefined,
    },
  });

  const onSubmit = (values: RoleInputs) => {
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
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select your role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-4"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FormItem>
                            <FormControl>
                              <RadioGroupItem
                                value="student"
                                id="student"
                                className="peer sr-only"
                              />
                            </FormControl>
                            <label
                              htmlFor="student"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <PiStudent className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">
                                {t("roles.student")}
                              </span>
                            </label>
                          </FormItem>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FormItem>
                            <FormControl>
                              <RadioGroupItem
                                value="teacher"
                                id="teacher"
                                className="peer sr-only"
                              />
                            </FormControl>
                            <label
                              htmlFor="teacher"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <GiTeacher className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">
                                {t("roles.teacher")}
                              </span>
                            </label>
                          </FormItem>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FormItem>
                            <FormControl>
                              <RadioGroupItem
                                value="parent"
                                id="parent"
                                className="peer sr-only"
                              />
                            </FormControl>
                            <label
                              htmlFor="parent"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <RiParentLine className="mb-3 h-6 w-6" />
                              <span className="text-sm font-medium">
                                {t("roles.parent")}
                              </span>
                            </label>
                          </FormItem>
                        </motion.div>
                      </RadioGroup>
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
