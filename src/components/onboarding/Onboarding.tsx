"use client";

import { useOnboardingStore } from "@/lib/store/useOnboardingStore";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSelector from "../Localization/LanguageSelector";
import ParentDetailsStep from "./ParentDetailsStep";
import PersonalInfoStep from "./PersonalInfoStep";
import Progressbar from "./Progressbar";
import ReviewStep from "./ReviewStep";
import RoleSelectionStep from "./RoleSelectionStep";
import StudentDetailsStep from "./StudentDetailsStep";
import TeacherDetailsStep from "./TeacherDetailsStep";

export default function Onboarding() {
  const { step, setStep, data } = useOnboardingStore();
  const t = useTranslations("onboarding.welcome");

  const next = () => {
    setStep(step + 1);
  };

  const previous = () => {
    setStep(step - 1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.0,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <PersonalInfoStep onNext={next} />;
      case 1:
        return <RoleSelectionStep onNext={next} onPrevious={previous} />;
      case 2:
        if (data.role === "student") {
          return <StudentDetailsStep onNext={next} onPrevious={previous} />;
        } else if (data.role === "teacher") {
          return <TeacherDetailsStep onNext={next} onPrevious={previous} />;
        } else if (data.role === "parent") {
          return <ParentDetailsStep onNext={next} onPrevious={previous} />;
        }
        return null;
      case 3:
        return <ReviewStep onPrevious={previous} />;
      default:
        return <PersonalInfoStep onNext={next} />;
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <motion.main
        className="container flex max-w-2xl flex-col items-center justify-between gap-4 px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="mb-4 mt-20"
          variants={{
            hidden: { y: -20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          <h1 className="text-center text-3xl">{t("title")}👋</h1>
          <h3 className="mt-2 text-center text-sm text-muted-foreground">
            {t("subtitle")}
          </h3>
        </motion.div>

        {/* Progress Bar  */}
        <motion.div
          className="w-full"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          <Progressbar
            currentStep={step}
            totalSteps={4}
            labels={["Personal Info", "Role", "Details", "Review"]}
          />
        </motion.div>

        {/* Render Steps */}
        <div className="h-[600px] w-full">{renderStep()}</div>
      </motion.main>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 p-4">
        <LanguageSelector />
      </div>
    </div>
  );
}
