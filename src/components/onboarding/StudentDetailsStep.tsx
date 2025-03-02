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
import useStudentDetailsForm from "@/hooks/onboarding/useStudentDetailsForm";
import { useLocale, useTranslations } from "next-intl";
import StepWrapper, {
  FormItem as AnimatedFormItem,
} from "./shared/StepWrapper";

interface StudentDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function StudentDetailsStep({
  onNext,
  onPrevious,
}: StudentDetailsStepProps) {
  const t = useTranslations("onboarding.form");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  const { form, onSubmit } = useStudentDetailsForm();

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
          </AnimatedFormItem>

          <AnimatedFormItem index={2}>
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
