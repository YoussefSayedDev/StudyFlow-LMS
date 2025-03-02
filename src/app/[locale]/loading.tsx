"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-background to-muted/30">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-6 text-3xl font-bold text-primary">StudyFlow</h1>
        </motion.div>

        <div className="relative mx-auto h-16 w-16">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0 rounded-full border-2 border-primary"
              initial={{ opacity: 0.2, scale: 1 }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
          <motion.div
            className="absolute inset-4 rounded-full bg-primary"
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.p
          className="mt-8 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading your experience...
        </motion.p>
      </div>
    </div>
  );
}
