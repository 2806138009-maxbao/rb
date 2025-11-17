import { motion } from "motion/react";

interface GreenLeafProps {
  delay: number;
  duration: number;
  startX: number;
}

export function GreenLeaf({ delay, duration, startX }: GreenLeafProps) {
  const leaves = ["🍃", "🌿", "🌱"];
  const randomLeaf = leaves[Math.floor(Math.random() * leaves.length)];

  return (
    <motion.div
      className="absolute text-[26px]"
      initial={{
        x: `${startX}%`,
        y: -50,
        rotate: 0,
        opacity: 0,
      }}
      animate={{
        x: [`${startX}%`, `${startX + (Math.random() - 0.5) * 25}%`, `${startX + (Math.random() - 0.5) * 45}%`],
        y: ["0%", "120%"],
        rotate: [0, -90 + Math.random() * 180, -180 + Math.random() * 360],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {randomLeaf}
    </motion.div>
  );
}
