import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

type LoveStat = {
  icon: typeof Heart;
  value: string;
  color: string;
  iconColor: string;
};

export function LoveStats() {
  const stats: LoveStat[] = [
    {
      icon: Heart,
      value: '在一起291天',
      color: 'from-pink-400 to-rose-400',
      iconColor: 'text-pink-500',
    },
  ];

  return (
    <div className="flex gap-8 justify-center items-center">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.value}
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          {/* 玻璃卡片效果 */}
          <div className="relative backdrop-blur-md bg-white/30 rounded-3xl p-8 shadow-xl border border-white/40 min-w-[200px]">
            {/* 渐变光晕 */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 rounded-3xl`} />
            
            {/* 内容 */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              {/* 图标 */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <stat.icon className={`w-10 h-10 ${stat.iconColor}`} />
              </motion.div>
              
              {/* 数值 */}
              <div className="flex items-baseline gap-1">
                <motion.span
                  className="font-['Smiley_Sans',sans-serif] text-5xl text-gray-800"
                  key={stat.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
