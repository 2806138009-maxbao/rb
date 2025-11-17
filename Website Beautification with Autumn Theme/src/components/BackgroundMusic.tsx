import { motion, AnimatePresence } from "motion/react";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BackgroundMusicProps {
  // 音乐文件URL - 用户需要替换为实际的音乐文件
  musicUrl?: string;
  autoPlay?: boolean;
  // 是否嵌入模式（在玻璃卡片内）
  embedded?: boolean;
  // 歌曲信息
  songName?: string;
  artist?: string;
}

export function BackgroundMusic({ 
  musicUrl = "YOUR_MUSIC_FILE_URL_HERE", 
  autoPlay = false,
  embedded = false,
  songName = "如约而至",
  artist = "许嵩"
}: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 初始化音频
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (autoPlay) {
        // 自动播放需要用户交互，这里尝试播放
        audioRef.current.play().catch(() => {
          // 如果自动播放失败，不做任何事
          setIsPlaying(false);
        });
      }
    }
  }, [autoPlay, volume]);

  // 播放/暂停切换
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('播放失败:', error);
          setHasError(true);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 静音切换
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // 音量调节
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  // 更新当前时间和总时长
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  // 如果是嵌入模式，返回简洁版本
  if (embedded) {
    return (
      <>
        {/* 音频元素 */}
        <audio
          ref={audioRef}
          src={musicUrl}
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* 嵌入版本 - 简洁的音乐按钮 */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={togglePlay}
            className="relative w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-2xl flex items-center justify-center group overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* 背景光晕效果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* 播放/暂停图标 */}
            {isPlaying ? (
              <Pause size={32} className="relative z-10" />
            ) : (
              <Play size={32} className="relative z-10 ml-1" />
            )}
            
            {/* 播放指示器 */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 border-4 border-white/50 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.button>

          {/* 箭头提示 */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 1,
            }}
          >
            <motion.svg
              width="60"
              height="40"
              viewBox="0 0 60 40"
              className="text-pink-400"
              animate={{
                x: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                d="M 10 20 Q 25 10, 40 20 Q 25 30, 10 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 38 15 L 48 20 L 38 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            <motion.p
              className="font-['Smiley_Sans:Oblique',sans-serif] italic text-pink-400 text-[24px] whitespace-nowrap"
              animate={{
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              点我播放音乐哦~
            </motion.p>
          </motion.div>
        </div>
      </>
    );
  }

  // 原来的固定版本
  return (
    <>
      {/* 音频元素 */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* 固定在右下角的音乐控制按钮 */}
      <div className="fixed bottom-8 right-8 z-[9999]">
        <div className="flex flex-col items-end gap-4">
          {/* 展开的控制面板 */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                className="bg-white/90 backdrop-blur-xl rounded-[24px] shadow-2xl p-6 border border-pink-200/50"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {/* 歌曲信息 */}
                <div className="mb-4">
                  <p className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#e03d62] text-[20px] mb-1">
                    {songName}
                  </p>
                  <p className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#c97487] text-[16px]">
                    {artist}
                  </p>
                </div>

                {/* 播放控制 */}
                <div className="flex items-center gap-3 mb-4">
                  <motion.button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                  </motion.button>

                  <motion.button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </motion.button>
                </div>

                {/* 音量控制 */}
                <div className="flex items-center gap-2">
                  <VolumeX size={16} className="text-pink-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-32 h-2 bg-pink-200 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:h-4
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-gradient-to-br
                      [&::-webkit-slider-thumb]:from-pink-400
                      [&::-webkit-slider-thumb]:to-rose-500
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:shadow-lg
                      [&::-moz-range-thumb]:w-4
                      [&::-moz-range-thumb]:h-4
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-gradient-to-br
                      [&::-moz-range-thumb]:from-pink-400
                      [&::-moz-range-thumb]:to-rose-500
                      [&::-moz-range-thumb]:border-0
                      [&::-moz-range-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:shadow-lg"
                  />
                  <Volume2 size={16} className="text-pink-600" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 主控制按钮 */}
          <motion.button
            onClick={() => setShowControls(!showControls)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-2xl flex items-center justify-center group overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* 背景光晕效果 */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* 音乐图标 */}
            <Music size={28} className="relative z-10" />
            
            {/* 播放指示器 */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 border-4 border-white/50 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.button>
        </div>
      </div>
    </>
  );
}