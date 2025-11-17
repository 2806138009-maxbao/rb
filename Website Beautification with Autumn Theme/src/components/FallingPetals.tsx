import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // 生成20个花瓣
    const newPetals: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // 0-100%
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10, // 10-20秒
      size: 10 + Math.random() * 15, // 10-25px
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: '-50px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(petal.id) * 100, 0],
            rotate: [0, 360 * 2],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* 樱花花瓣形状 */}
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2C12 2 9 5 9 8C9 11 10.5 12 12 12C13.5 12 15 11 15 8C15 5 12 2 12 2Z"
              fill="#FFB3D9"
              opacity="0.7"
            />
            <path
              d="M12 22C12 22 9 19 9 16C9 13 10.5 12 12 12C13.5 12 15 13 15 16C15 19 12 22 12 22Z"
              fill="#FFC8E3"
              opacity="0.6"
            />
            <path
              d="M2 12C2 12 5 9 8 9C11 9 12 10.5 12 12C12 13.5 11 15 8 15C5 15 2 12 2 12Z"
              fill="#FFD4EC"
              opacity="0.7"
            />
            <path
              d="M22 12C22 12 19 9 16 9C13 9 12 10.5 12 12C12 13.5 13 15 16 15C19 15 22 12 22 12Z"
              fill="#FFB3D9"
              opacity="0.6"
            />
            <circle cx="12" cy="12" r="2" fill="#FF91C7" opacity="0.8" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
