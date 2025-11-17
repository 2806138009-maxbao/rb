import { motion } from "motion/react";
import { Leaf } from "lucide-react";

interface AutumnLeafProps {
  delay: number;
  duration: number;
  startX: number;
}

export function AutumnLeaf({ delay, duration, startX }: AutumnLeafProps) {
  return (
    <motion.div
      className="absolute text-orange-400/30"
      initial={{ 
        top: -50, 
        left: `${startX}%`,
        rotate: 0,
        opacity: 0 
      }}
      animate={{
        top: ["0%", "100%"],
        left: [`${startX}%`, `${startX + 10}%`, `${startX - 5}%`, `${startX + 5}%`],
        rotate: [0, 180, 360, 540],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <Leaf size={32} fill="currentColor" />
    </motion.div>
  );
}
