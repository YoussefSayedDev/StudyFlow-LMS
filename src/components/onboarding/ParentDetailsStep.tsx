"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useParentDetailsForm from "@/hooks/onboarding/useParentDetailsForm";
import { useTranslations } from "next-intl";
import StepWrapper, {
  FormItem as AnimatedFormItem,
} from "./shared/StepWrapper";
interface ParentDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function ParentDetailsStep({
  onNext,
  onPrevious,
}: ParentDetailsStepProps) {
  const t = useTranslations("onboarding.form");

  const { form, onSubmit } = useParentDetailsForm();

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
          </AnimatedFormItem>

          <AnimatedFormItem index={2}>
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
          </AnimatedFormItem>

          <AnimatedFormItem index={3} className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrevious}>
              {t("buttons.previous")}
            </Button>
            <Button type="submit">{t("buttons.next")}</Button>
          </AnimatedFormItem>
        </form>
      </Form>
    </StepWrapper>
  );
}
