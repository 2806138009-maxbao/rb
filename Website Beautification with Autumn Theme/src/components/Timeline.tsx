import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ImageModal } from "./ImageModal";
import { useState } from "react";
import winterBg from "figma:asset/5761c0b070528fb69c33012227e2d0107e971ec7.png";

interface TimelineEvent {
  date: string;
  location: string;
  description?: string;
  image?: string;
  isFuture?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
}

// 季节背景图片
const seasonalBackgrounds = {
  autumn:
    "https://images.unsplash.com/photo-1666379262585-0d900a8eb189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBsZWF2ZXMlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MzI1NjE1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  winter: winterBg,
  spring:
    "https://images.unsplash.com/photo-1647405647666-2cf2382e10ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBmbG93ZXJzJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NjMzMjc1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  summer:
    "https://images.unsplash.com/photo-1655561804951-4e66a3755b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MzMyNzU2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

// 根据日期获取季节
function getSeasonFromDate(dateStr: string): keyof typeof seasonalBackgrounds {
  // 从日期字符串中提取月份 (格式: "2024.11.18" 或 "2025.01")
  const parts = dateStr.split('.');
  const month = parseInt(parts[1]);
  
  // 10-11月：秋天
  if (month === 10 || month === 11) return 'autumn';
  // 12-2月：冬天
  if (month === 12 || month === 1 || month === 2) return 'winter';
  // 3-5月：春天
  if (month >= 3 && month <= 5) return 'spring';
  // 7-9月：夏天 (6月按夏天处理)
  return 'summer';
}

export function Timeline({ events }: TimelineProps) {
  const [modalImage, setModalImage] = useState<{ 
    src: string; 
    location: string; 
    date: string; 
    description: string 
  } | null>(null);

  return (
    <div className="relative w-full py-24">
      {/* 图片模态框 */}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
          imageSrc={modalImage.src}
          location={modalImage.location}
          date={modalImage.date}
          description={modalImage.description}
        />
      )}

      {/* 时间轴标题 */}
      <motion.div
        className="relative text-center mb-16 z-20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#e03d62] text-[128px] mb-4">
          我们的时光轴
        </h2>
        <p className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#c97487] text-[48px]">
          记录每一个美好瞬间
        </p>
      </motion.div>

      {/* 中央时间线 */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-200 via-rose-300 to-pink-200 transform -translate-x-1/2" />

      {/* 时间轴事件 */}
      <div className="relative space-y-32">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          const season = getSeasonFromDate(event.date);
          const seasonBackground = seasonalBackgrounds[season];

          // 如果是未来事件（2025.11.18），特殊处理
          if (event.isFuture) {
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* 时间轴节点 */}
                <motion.div
                  className="absolute left-1/2 top-0 transform -translate-x-1/2 z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 via-rose-400 to-pink-300 shadow-lg border-4 border-white" />
                </motion.div>

                {/* 日期标签 - 居中显示 */}
                <div className="text-center pt-16 pb-8">
                  <motion.div
                    className="inline-block bg-gradient-to-r from-pink-400 to-rose-500 text-white px-8 py-3 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[28px]">
                      {event.date}
                    </span>
                  </motion.div>
                </div>

                {/* 未完待续文字 */}
                <motion.div
                  className="text-center"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <h3 className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#e03d62] text-[80px] mb-4">
                    {event.location}
                  </h3>
                  <p className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#c97487] text-[36px]">
                    我们的故事还在继续...
                  </p>
                </motion.div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* 时间轴节点 */}
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg border-4 border-white" />
              </motion.div>

              {/* 内容卡片 */}
              <div
                className={`flex items-center ${isLeft ? "justify-end pr-[calc(50%+64px)]" : "justify-start pl-[calc(50%+64px)]"}`}
              >
                <motion.div
                  className="max-w-[600px] w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl p-8 overflow-hidden">
                    {/* 季节背景图片 */}
                    <div className="absolute inset-0 z-0 opacity-20">
                      <ImageWithFallback
                        src={seasonBackground}
                        alt={`${season} background`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 图片 */}
                    {event.image && (
                      <div className="relative w-full h-[300px] rounded-[20px] overflow-hidden mb-6 z-10">
                        <ImageWithFallback
                          src={event.image}
                          alt={event.location}
                          className="w-full h-full object-cover"
                          onClick={() => setModalImage({
                            src: event.image,
                            location: event.location,
                            date: event.date,
                            description: event.description || ""
                          })}
                        />
                        {/* 图片遮罩 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                    )}

                    {/* 日期 */}
                    <motion.div
                      className="relative inline-block bg-gradient-to-r from-pink-400 to-rose-500 text-white px-6 py-2 rounded-full mb-4 z-10"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[24px]">
                        {event.date}
                      </span>
                    </motion.div>

                    {/* 地点 */}
                    <h3 className="relative font-['Smiley_Sans:Oblique',sans-serif] italic text-[#e03d62] text-[56px] mb-3 z-10">
                      {event.location}
                    </h3>

                    {/* 描述 */}
                    {event.description && (
                      <p className="relative font-['Smiley_Sans:Oblique',sans-serif] italic text-[#c97487] text-[32px] leading-relaxed z-10">
                        {event.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* 连接线动画 */}
              <motion.div
                className={`absolute top-1/2 ${isLeft ? "right-1/2 mr-4" : "left-1/2 ml-4"} w-12 h-0.5 bg-gradient-to-${isLeft ? "l" : "r"} from-pink-300 to-transparent`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  transformOrigin: isLeft ? "right" : "left",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* 底部装饰 */}
      <motion.div
        className="relative text-center mt-24 z-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* 文字框 */}
        <div className="max-w-5xl mx-auto px-8">
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-16 shadow-xl border border-pink-200/50">
            {/* 标题 */}
            <motion.h3 
              className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#e03d62] text-[64px] mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              想对你说的话
            </motion.h3>
            
            {/* 内容 */}
            <motion.div 
              className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#c97487] text-[28px] text-left leading-relaxed space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>燕包，一周年快乐！</p>
              
              <p>很抱歉这个网站没有复原我们生活中更多的精彩瞬间，但这也变相地为某个一周年礼物设下了伏笔吧嘿嘿。在想学做网站的那一刻我就有了"要不要做一个网站来记录我们的时光"的念头，正好我们相识一周年的日子马上就到了，所以这个网站就是我给你准备的小小惊喜啦！（虽然早都告诉你了吧就是！）。</p>
              
              <p>这也可以算得上我名正言顺做的第一个网站吧~感觉它就向我们感情的萌芽一样，从11月18号这天开始生长呢，那么就像我刚才说的，如果说11月18号的萌芽能在1月31号长成爱情的果实，那么这份心意也一样啦！</p>
              
              <p>好啦！在这个一周年到来之际，我也很感慨呢，说实话之前无数次的想过异国恋之间的距离会导致怎么怎么样的隔阂，怎么怎么样的矛盾。。。但到现在，我可以充满自信地说：我和燕包就是天生一对！即使是距离也不能隔开我们之间心与心的距离！</p>
              
              <p>那么现在，就让我们享受这美妙的时刻吧，并且再一次地打心底相信，我们的相遇，就是我们人生的"好运设计"啊</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}