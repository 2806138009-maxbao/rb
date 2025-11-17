import { AutumnLeaf } from "./AutumnLeaf";
import { Snowflake } from "./Snowflake";
import { FlowerPetal } from "./FlowerPetal";
import { GreenLeaf } from "./GreenLeaf";

interface SeasonalBackgroundProps {
  scrollY: number;
  timelineStartY: number;
  timelineEvents: Array<{ date: string }>;
}

// 从日期字符串中提取月份
function getMonthFromDate(dateStr: string): number {
  const match = dateStr.match(/\d{4}\.(\d{1,2})\.\d{1,2}/);
  return match ? parseInt(match[1], 10) : 0;
}

// 根据滚动位置判断当前应该显示哪个月份的动画
function getCurrentSeasonMonth(
  scrollY: number,
  timelineStartY: number,
  timelineEvents: Array<{ date: string }>
): number {
  // 如果还没滚动到时间轴，显示默认（11月落叶）
  if (scrollY < timelineStartY) {
    return 11;
  }

  // 时间轴区域的高度，假设每个事件占据一定高度
  const eventHeight = 800; // 每个事件卡片的大概高度
  const relativeScroll = scrollY - timelineStartY;
  const currentEventIndex = Math.floor(relativeScroll / eventHeight);

  // 确保索引在有效范围内
  const eventIndex = Math.max(0, Math.min(currentEventIndex, timelineEvents.length - 1));
  
  return getMonthFromDate(timelineEvents[eventIndex].date);
}

export function SeasonalBackground({ scrollY, timelineStartY, timelineEvents }: SeasonalBackgroundProps) {
  const currentMonth = getCurrentSeasonMonth(scrollY, timelineStartY, timelineEvents);

  // 生成粒子配置
  const particles = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 2,
    duration: 12 + Math.random() * 10,
    startX: Math.random() * 100,
  }));

  // 11月 - 落叶
  if (currentMonth === 11) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {particles.map((particle, i) => (
          <AutumnLeaf
            key={i}
            delay={particle.delay}
            duration={particle.duration}
            startX={particle.startX}
          />
        ))}
      </div>
    );
  }

  // 12月-2月 - 雪花
  if (currentMonth === 12 || currentMonth === 1 || currentMonth === 2) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {particles.map((particle, i) => (
          <Snowflake
            key={i}
            delay={particle.delay}
            duration={particle.duration}
            startX={particle.startX}
          />
        ))}
      </div>
    );
  }

  // 3月-5月 - 鲜花
  if (currentMonth >= 3 && currentMonth <= 5) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {particles.map((particle, i) => (
          <FlowerPetal
            key={i}
            delay={particle.delay}
            duration={particle.duration}
            startX={particle.startX}
          />
        ))}
      </div>
    );
  }

  // 7月-9月 - 绿叶
  if (currentMonth >= 7 && currentMonth <= 9) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {particles.map((particle, i) => (
          <GreenLeaf
            key={i}
            delay={particle.delay}
            duration={particle.duration}
            startX={particle.startX}
          />
        ))}
      </div>
    );
  }

  // 默认显示落叶
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle, i) => (
        <AutumnLeaf
          key={i}
          delay={particle.delay}
          duration={particle.duration}
          startX={particle.startX}
        />
      ))}
    </div>
  );
}
