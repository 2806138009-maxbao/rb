import { motion } from 'motion/react';
import { useState } from 'react';
import Masonry from 'react-responsive-masonry';

interface Photo {
  src: string;
  caption: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  return (
    <div className="w-full">
      {/* 标题 */}
      <motion.h2
        className="font-['Smiley_Sans:Oblique',sans-serif] italic text-[#e03d62] text-[80px] text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        我们的回忆相册
      </motion.h2>

      {/* Masonry 照片墙 */}
      <Masonry columnsCount={3} gutter="24px">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* 图片 */}
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-auto object-cover"
            />
            
            {/* 悬停遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="font-['Smiley_Sans',sans-serif] text-white text-lg">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </Masonry>
    </div>
  );
}
