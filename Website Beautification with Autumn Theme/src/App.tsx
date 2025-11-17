import { Timeline } from './components/Timeline';
import { ZoomControls } from './components/ZoomControls';
import { BackgroundMusic } from './components/BackgroundMusic';
import { FallingPetals } from './components/FallingPetals';
import { LoveStats } from './components/LoveStats';
import { NavigationButtons } from './components/NavigationButtons';
import { WishWall } from './components/WishWall';
import { LoadingAnimation } from './components/LoadingAnimation';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Figma from "./imports/svg-w01e22e8ce";
import svgPaths from "./imports/svg-wg56ef214f";
import "./styles/globals.css";
import weddingHallImg from "figma:asset/22dcb4c84bc1f86f1b5bd4cf9bc84e9a0e6b90ba.png";
import startImage from "figma:asset/1c1538f44edab2adf4634190e0e7fbd2253c1a58.png";
import decemberImage from "figma:asset/4fcc85d10b7fb1a3e7b18e4760cbdb6755b51f1b.png";
import januaryImage from "figma:asset/c1c41014e87e3023073793546718495697025fd2.png";
import februaryImage from "figma:asset/761cd241d267c9131ef41c70452b9acf817bcca6.png";
import marchImage from "figma:asset/0550a3525ee54d04853ed5166459a9205434926f.png";
import aprilImage from "figma:asset/c4e4ab7eae0e9f83434d5691aa521179e634b8b6.png";
import mayImage from "figma:asset/7be976b0c69cb6595a0ed170d840757123d12aaa.png";
import juneImage from "figma:asset/6c0de46db29bbf65d91529f34b9ed0e765363d4b.png";
import julyImage from "figma:asset/8adb7f378eb6ffa30b8a3ec4a0074b5da2db7b71.png";
import augustImage from "figma:asset/e65644f6591e8929386ec4eaf40e90ad2b1abd3e.png";
import septemberImage from "figma:asset/2d7c23ae49b6a54f9b4f77114d68e4bb9c14be10.png";
import octoberImage from "figma:asset/b56462e58efc5b22ef84df64a9a5f6f75c7810c3.png";
import ArrowDown from './components/ArrowDown';
import CalloutIcons from './components/CalloutIcons';
import LiquidGlassRegularLarge from './imports/LiquidGlassRegularLarge';

function App() {
  // 缩放状态管理
  const [scale, setScale] = useState(0.75);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 时间轴数据
  const timelineEvents = [
    {
      date: "2024.11.18",
      location: "开始的开始",
      description: "一年前的今天~ 我们两个当时都没想到我们会在一起并且互相承诺要永远在一起吧~",
      image: startImage
    },
    {
      date: "2024.12",
      location: "燕包的心意",
      description: "从这时候开始，一切都变得明朗起来了呢~",
      image: decemberImage
    },
    {
      date: "2025.01",
      location: "Day1",
      description: "从这一天开始，是我们的Day1，相信直觉果然是对的",
      image: januaryImage
    },
    {
      date: "2025.02",
      location: "只有枣知道",
      description: "度过了最难忘的一个情人节~",
      image: februaryImage
    },
    {
      date: "2025.03",
      location: "初见祥云小镇",
      description: "避雷园景了呢！但也是在那一天我更深刻地意识到你真的是特别的人~",
      image: marchImage
    },
    {
      date: "2025.04",
      location: "我们与地坛",
      description: "一直都以为我们的恋情就是我们彼此人生\"好运设计\"的一部分",
      image: aprilImage
    },
    {
      date: "2025.05",
      location: "天津之行",
      description: "无需多言，我相信未来任何时候回忆起这一天都会让我热泪盈眶，比如说现在",
      image: mayImage
    },
    {
      date: "2025.06",
      location: "毕业典礼",
      description: "那天的日光很温暖，而上次一是一月十九号",
      image: juneImage
    },
    {
      date: "2025.07",
      location: "暑假来啦",
      description: "我还是很喜欢你那天的打扮嘿嘿",
      image: julyImage
    },
    {
      date: "2025.08",
      location: "暑假玩玩玩",
      description: "如果说印象最深的话还是去吃萨拉伯尔！！！我真的好想和你再吃一次啊啊啊啊啊啊啊",
      image: augustImage
    },
    {
      date: "2025.09",
      location: "你的白天，我的夜晚",
      description: "我真的好舍不得你，但我们都相信分别是为了更好的相聚",
      image: septemberImage
    },
    {
      date: "2025.10",
      location: "年年有今日",
      description: "我们最最可爱最最善解人意的燕包18岁啦~让我们未来也度过每一个1019吧！",
      image: octoberImage
    },
    {
      date: "2025.11.18",
      location: "未完待续",
      isFuture: true
    }
  ];

  // 缩放函数
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.1));
  };

  const handleResetZoom = () => {
    setScale(0.75);
  };

  // 滚轮缩放
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#F8F0F4] via-[#F5F3F7] to-[#F3EFF8]">
      {/* 加载动画 */}
      <LoadingAnimation />
      
      {/* 飘落的花瓣效果 */}
      <FallingPetals />
      
      {/* FOR MY LOVE 水印效果 - 固定在视口上 */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* 水印 1 - 顶部 */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-[8%] opacity-8"
          animate={{
            opacity: [0.06, 0.10, 0.06],
            x: ['-50%', 'calc(-50% + 20px)', '-50%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="font-['Quicksand',sans-serif] text-[120px] text-pink-400 whitespace-nowrap rotate-[-12deg]">
            FOR MY LOVE
          </div>
        </motion.div>
        
        {/* 水印 2 - 中上 */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-[30%] opacity-8"
          animate={{
            opacity: [0.08, 0.12, 0.08],
            rotate: [8, 10, 8],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="font-['Quicksand',sans-serif] text-[110px] text-rose-400 whitespace-nowrap rotate-[8deg]">
            FOR MY LOVE
          </div>
        </motion.div>
        
        {/* 水印 3 - 中下 */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-[62%] opacity-8"
          animate={{
            opacity: [0.07, 0.11, 0.07],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="font-['Quicksand',sans-serif] text-[115px] text-pink-300 whitespace-nowrap rotate-[-10deg]">
            FOR MY LOVE
          </div>
        </motion.div>
        
        {/* 水印 4 - 底部 */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 bottom-[5%] opacity-8"
          animate={{
            opacity: [0.09, 0.13, 0.09],
            x: ['-50%', 'calc(-50% + 25px)', '-50%'],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="font-['Quicksand',sans-serif] text-[105px] text-rose-300 whitespace-nowrap rotate-[12deg]">
            FOR MY LOVE
          </div>
        </motion.div>
      </div>

      {/* 主要内容区域 - 居中显示 */}
      <div ref={scrollContainerRef} className="absolute inset-0 flex justify-center overflow-auto bg-[rgba(255,249,249,0)] z-[10]">
        <div className="relative flex-shrink-0" style={{ width: '4200px', height: '5512px', transform: `scale(${scale})`, transformOrigin: 'top center', margin: '0 auto' }}>
        {/* 纯色背景 */}
        <div className="absolute h-[5159px] left-[1104px] top-[353px] w-[1979px]" />
        
        <motion.div 
          className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.14619135856628418)+(var(--transform-inner-height)*0.9892563223838806)))] items-center justify-center left-[1461px] top-[1021px] w-[calc(1px*((var(--transform-inner-height)*0.14619135856628418)+(var(--transform-inner-width)*0.9892563223838806)))]" 
          style={{ "--transform-inner-width": "1137.296875", "--transform-inner-height": "1149.078125" } as React.CSSProperties}
          animate={{
            rotate: [351.594, 352, 351.594],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex-none rotate-[351.594deg]">
            <div className="bg-[#ff6f61] h-[1149.09px] opacity-40 w-[1137.31px]" />
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7660444378852844)+(var(--transform-inner-height)*0.6427876353263855)))] items-center justify-center left-[772px] top-0 w-[calc(1px*((var(--transform-inner-height)*0.7660444378852844)+(var(--transform-inner-width)*0.6427876353263855)))]" 
          style={{ "--transform-inner-width": "2579.84375", "--transform-inner-height": "1286.46875", opacity: 0, pointerEvents: 'none' } as React.CSSProperties}
        >
          <div className="flex-none rotate-[310deg]">
            <div className="font-['Quicksand',sans-serif] h-[1286.49px] leading-[normal] not-italic opacity-50 relative text-[400px] text-[rgba(255,134,134,0.5)] w-[2579.85px]">
              <p className="mb-0">FOR</p>
              <p className="mb-0 whitespace-pre-wrap">{`       MY`}</p>
              <p className="whitespace-pre-wrap">{`             LOVE`}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7660444378852844)+(var(--transform-inner-height)*0.6427876353263855)))] items-center justify-center left-[439px] top-[1424px] w-[calc(1px*((var(--transform-inner-height)*0.7660444378852844)+(var(--transform-inner-width)*0.6427876353263855)))]" 
          style={{ "--transform-inner-width": "2579.84375", "--transform-inner-height": "1286.46875", opacity: 0, pointerEvents: 'none' } as React.CSSProperties}
        >
          <div className="flex-none rotate-[310deg]">
            <div className="font-['Quicksand',sans-serif] h-[1286.49px] leading-[normal] not-italic opacity-50 relative text-[400px] text-[rgba(255,134,134,0.5)] w-[2579.85px]">
              <p className="mb-0">FOR</p>
              <p className="mb-0 whitespace-pre-wrap">{`       MY`}</p>
              <p className="whitespace-pre-wrap">{`             LOVE`}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7660444378852844)+(var(--transform-inner-height)*0.6427876353263855)))] items-center justify-center left-0 top-[2964px] w-[calc(1px*((var(--transform-inner-height)*0.7660444378852844)+(var(--transform-inner-width)*0.6427876353263855)))]" 
          style={{ "--transform-inner-width": "2579.84375", "--transform-inner-height": "1286.46875", opacity: 0, pointerEvents: 'none' } as React.CSSProperties}
        >
          <div className="flex-none rotate-[310deg]">
            <div className="font-['Quicksand',sans-serif] h-[1286.49px] leading-[normal] not-italic opacity-50 relative text-[400px] text-[rgba(255,134,134,0.5)] w-[2579.85px]">
              <p className="mb-0">FOR</p>
              <p className="mb-0 whitespace-pre-wrap">{`       MY`}</p>
              <p className="whitespace-pre-wrap">{`             LOVE`}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7660444378852844)+(var(--transform-inner-height)*0.6427876353263855)))] items-center justify-center left-[2353px] top-[3421px] w-[calc(1px*((var(--transform-inner-height)*0.7660444378852844)+(var(--transform-inner-width)*0.6427876353263855)))]" 
          style={{ "--transform-inner-width": "2579.84375", "--transform-inner-height": "1286.46875", opacity: 0, pointerEvents: 'none' } as React.CSSProperties}
        >
          <div className="flex-none rotate-[310deg]">
            <div className="font-['Quicksand',sans-serif] h-[1286.49px] leading-[normal] not-italic opacity-50 relative text-[400px] text-[rgba(255,134,134,0.5)] w-[2579.85px]">
              <p className="mb-0">FOR</p>
              <p className="mb-0 whitespace-pre-wrap">{`       MY`}</p>
              <p className="whitespace-pre-wrap">{`             LOVE`}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.004393106792122126)+(var(--transform-inner-height)*0.9999903440475464)))] items-center justify-center left-[1488px] top-[1092px] w-[calc(1px*((var(--transform-inner-height)*0.004393106792122126)+(var(--transform-inner-width)*0.9999903440475464)))]" 
          style={{ "--transform-inner-width": "1181.265625", "--transform-inner-height": "1198.59375" } as React.CSSProperties}
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex-none rotate-[359.748deg]">
            <LiquidGlassRegularLarge />
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute font-['Smiley_Sans:Oblique',sans-serif] italic leading-[normal] left-[2104px] text-[#c97487] text-[64px] text-center top-[1273px] translate-x-[-50%] w-[768px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="mb-0">转眼间我们已经认识一年啦！</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">现在看来真的发生了好多好多事呢</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">所以我正好做了个网站</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">来记录我们生活的点点滴滴</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">至于怎么记录？</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">那你就往下翻吧！</p>
          <p>&nbsp;</p>
        </motion.div>
        
        <motion.div 
          className="absolute font-['Smiley_Sans:Oblique',sans-serif] h-[310px] italic leading-[normal] left-[1311px] text-[#e03d62] text-[0px] top-[381px] w-[640px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="mb-0 text-[350px]">致</p>
          <p className="text-[256px]">亲爱的燕包</p>
        </motion.div>
        
        {/* 音乐播放按钮 - 在"致"字右边 */}
        <div className="absolute left-[1700px] top-[420px]">
          <BackgroundMusic 
            embedded={true} 
            musicUrl="https://files.catbox.moe/r8e593.mp3"
          />
        </div>
        
        <ArrowDown />
        
        <CalloutIcons />
        
        {/* 统计数据板块 */}
        <div className="absolute left-[1104px] top-[2400px] w-[1979px]">
          <LoveStats />
        </div>
        
        {/* 心愿墙板块 */}
        <div className="absolute left-[1104px] top-[2750px] w-[1979px]">
          <WishWall />
        </div>
        
        {/* 时间轴部分 */}
        <div className="absolute left-[1104px] top-[3800px] w-[1979px]">
          <Timeline events={timelineEvents} />
        </div>
      </div>
      </div>
      
      {/* 导航按钮 */}
      <NavigationButtons scrollContainerRef={scrollContainerRef} />
      
      <ZoomControls 
        scale={scale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleResetZoom}
      />
    </div>
  );
}

export default App;