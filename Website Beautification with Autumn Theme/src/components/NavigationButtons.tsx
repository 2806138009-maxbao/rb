import { motion } from 'motion/react';
import { ArrowUp, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavigationButtonsProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export function NavigationButtons({ scrollContainerRef }: NavigationButtonsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 500);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToTimeline = () => {
    // 时间轴位置大约在 3100px * scale
    scrollContainerRef.current?.scrollTo({
      top: 2000, // 调整这个值以匹配实际时间轴位置
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed left-8 bottom-8 z-[9999] flex flex-col gap-4">
      {/* 跳转到时间轴 */}
      <motion.button
        onClick={scrollToTimeline}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-2xl flex items-center justify-center group overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="跳转到时间轴"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Calendar size={24} className="relative z-10" />
      </motion.button>

      {/* 回到顶部 */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-2xl flex items-center justify-center group overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="回到顶部"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <ArrowUp size={24} className="relative z-10" />
          
          {/* 上升动画 */}
          <motion.div
            className="absolute bottom-2"
            animate={{
              y: [-5, -15, -5],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowUp size={16} className="text-white/50" />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}
