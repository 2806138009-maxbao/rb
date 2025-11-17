import { motion } from "motion/react";

interface SnowflakeProps {
  delay: number;
  duration: number;
  startX: number;
}

export function Snowflake({ delay, duration, startX }: SnowflakeProps) {
  return (
    <motion.div
      className="absolute text-white/80 text-[24px]"
      initial={{
        x: `${startX}%`,
        y: -50,
        rotate: 0,
        opacity: 0,
      }}
      animate={{
        x: [`${startX}%`, `${startX + (Math.random() - 0.5) * 20}%`, `${startX + (Math.random() - 0.5) * 40}%`],
        y: ["0%", "120%"],
        rotate: [0, 360, 720],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      ❄️
    </motion.div>
  );
}
