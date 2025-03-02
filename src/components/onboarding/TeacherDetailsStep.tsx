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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useTeacherDetailsForm from "@/hooks/onboarding/useTeacherDetailsForm";
import { useLocale, useTranslations } from "next-intl";
import StepWrapper, {
  FormItem as AnimatedFormItem,
} from "./shared/StepWrapper";

interface TeacherDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function TeacherDetailsStep({
  onNext,
  onPrevious,
}: TeacherDetailsStepProps) {
  const t = useTranslations("onboarding.form");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const { form, onSubmit } = useTeacherDetailsForm();

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
          </AnimatedFormItem>

          <AnimatedFormItem index={2}>
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
          </AnimatedFormItem>

          <AnimatedFormItem index={3}>
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
          </AnimatedFormItem>

          <AnimatedFormItem index={4} className="flex justify-between">
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
