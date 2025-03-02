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

import usePersonalInfoForm from "@/hooks/onboarding/usePersonalInfoForm";
import { useTranslations } from "next-intl";
import StepWrapper, {
  FormItem as AnimatedFormItem,
} from "./shared/StepWrapper";

interface PersonalInfoStepProps {
  onNext: () => void;
}

export default function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
  const t = useTranslations("onboarding.form");

  const { form, onSubmit } = usePersonalInfoForm();

  const handleSubmit = (values: any) => {
    onSubmit(values, onNext);
  };

  return (
    <StepWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <AnimatedFormItem index={1}>
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
          </AnimatedFormItem>

          <AnimatedFormItem index={2}>
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
          </AnimatedFormItem>

          <AnimatedFormItem index={3}>
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
          </AnimatedFormItem>

          <AnimatedFormItem index={4}>
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
          </AnimatedFormItem>

          <AnimatedFormItem index={5} className="flex justify-end">
            <Button type="submit">{t("buttons.next")}</Button>
          </AnimatedFormItem>
        </form>
      </Form>
    </StepWrapper>
  );
}
