import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

interface ProgressbarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export default function Progressbar({
  currentStep,
  totalSteps,
  labels,
}: ProgressbarProps) {
  const t = useTranslations("onboarding.steps");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <motion.div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "border border-muted bg-background"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {index < currentStep ? "✓" : index + 1}
            </motion.div>
            {labels && (
              <span
                className={`mt-2 text-xs ${
                  index <= currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {t(labels[index].toLowerCase().replaceAll(" ", ""))}
              </span>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-2 flex w-full">
        {Array.from({ length: totalSteps - 1 }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 flex-1 ${
              index < currentStep ? "bg-primary" : "bg-muted"
            }`}
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: index < currentStep ? 1 : 0,
              transition: { duration: 0.5, delay: 0.2 },
            }}
            style={{
              originX: isRTL ? 1 : 0,
              transformOrigin: isRTL ? "right" : "left",
            }}
          />
        ))}
      </div>
    </div>
  );
}
