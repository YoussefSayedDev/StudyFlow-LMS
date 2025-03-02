import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepWrapperProps {
  children: ReactNode;
}

export default function StepWrapper({ children }: StepWrapperProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}

export const FormItem = ({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) => (
  <motion.div
    custom={index}
    initial="hidden"
    animate="visible"
    variants={{
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
    }}
    className={className}
  >
    {children}
  </motion.div>
);
