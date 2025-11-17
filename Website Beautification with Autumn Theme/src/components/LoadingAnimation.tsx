import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 模拟加载进度
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-[#F8F0F4] via-[#F5F3F7] to-[#F3EFF8]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 背景装饰 */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  opacity: 0.3,
                }}
                animate={{
                  y: window.innerHeight + 50,
                  rotate: 360,
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'linear',
                }}
              >
                <Heart size={20 + Math.random() * 20} className="text-pink-300" fill="currentColor" />
              </motion.div>
            ))}
          </div>

          {/* 加载内容 */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* 标题 */}
            <motion.h1
              className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#e03d62] text-[80px] text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              致亲爱的燕包
            </motion.h1>

            {/* 跳动的心形 */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart size={64} className="text-pink-500" fill="currentColor" />
            </motion.div>

            {/* 进度条 */}
            <div className="w-[400px]">
              <div className="h-2 bg-pink-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.p
                className="font-['Smiley_Sans',sans-serif] text-[#c97487] text-[24px] text-center mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                加载中... {progress}%
              </motion.p>
            </div>

            {/* 提示文字 */}
            <motion.p
              className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#c97487] text-[20px] text-center max-w-[500px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              准备好了吗？一起回顾我们的美好回忆吧~
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
