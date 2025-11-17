import { motion } from "motion/react";

interface FlowerPetalProps {
  delay: number;
  duration: number;
  startX: number;
}

export function FlowerPetal({ delay, duration, startX }: FlowerPetalProps) {
  const flowers = ["🌸", "🌺", "🌼", "🌻", "🌷"];
  const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];

  return (
    <motion.div
      className="absolute text-[28px]"
      initial={{
        x: `${startX}%`,
        y: -50,
        rotate: 0,
        opacity: 0,
      }}
      animate={{
        x: [`${startX}%`, `${startX + (Math.random() - 0.5) * 30}%`, `${startX + (Math.random() - 0.5) * 50}%`],
        y: ["0%", "120%"],
        rotate: [0, 180 + Math.random() * 180, 360 + Math.random() * 180],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {randomFlower}
    </motion.div>
  );
}
