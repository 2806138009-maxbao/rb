import { motion } from 'motion/react';
import { Heart, Star } from 'lucide-react';

export function WishWall() {
  const wishes = [
    {
      text: "希望我们能一直这样幸福下去",
      color: "from-pink-300 to-rose-300",
      icon: Heart,
    },
    {
      text: "未来要一起去更多地方，看更多风景",
      color: "from-purple-300 to-pink-300",
      icon: Star,
    },
    {
      text: "每年都要一起过生日，过纪念日",
      color: "from-rose-300 to-pink-300",
      icon: Heart,
    },
    {
      text: "要一直陪在你身边，成为你最坚实的后盾",
      color: "from-pink-300 to-purple-300",
      icon: Star,
    },
    {
      text: "希望时间慢一点，让我们慢慢变老",
      color: "from-rose-300 to-purple-300",
      icon: Heart,
    },
    {
      text: "未来的每一天，都想和你一起度过",
      color: "from-purple-300 to-rose-300",
      icon: Star,
    },
  ];

  return (
    <div className="w-full py-20">
      {/* 标题 */}
      <motion.h2
        className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#e03d62] text-[80px] text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        写给未来的我们
      </motion.h2>

      {/* 心愿卡片网格 */}
      <div className="grid grid-cols-2 gap-8 max-w-[1400px] mx-auto">
        {wishes.map((wish, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{ 
              scale: 1.05, 
              rotate: Math.random() > 0.5 ? 2 : -2,
              y: -10,
            }}
          >
            {/* 卡片 */}
            <div className={`relative backdrop-blur-md bg-gradient-to-br ${wish.color} bg-opacity-40 rounded-3xl p-8 shadow-xl border border-white/40 min-h-[180px] flex flex-col justify-between`}>
              {/* 装饰性图标 */}
              <div className="absolute top-4 right-4 opacity-20">
                <wish.icon size={48} className="text-white" />
              </div>

              {/* 文字内容 */}
              <p className="font-['Smiley_Sans',sans-serif] text-gray-800 text-[22px] leading-relaxed relative z-10">
                {wish.text}
              </p>

              {/* 底部小装饰 */}
              <div className="flex gap-2 mt-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white/60"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 飘动的心形装饰 */}
            <motion.div
              className="absolute -top-3 -right-3"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart size={24} className="text-pink-400 fill-pink-400" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
