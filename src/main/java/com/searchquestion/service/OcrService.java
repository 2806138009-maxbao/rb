package com.searchquestion.service;

import org.springframework.web.multipart.MultipartFile;

public interface OcrService {
    
    /**
     * 识别图片中的文字
     * @param file 图片文件
     * @return 识别的文字内容
     */
    String recognizeText(MultipartFile file);
    
    /**
     * 识别图片中的文字（带置信度）
     * @param file 图片文件
     * @return 包含文字和置信度的结果
     */
    OcrResult recognizeTextWithConfidence(MultipartFile file);
    
    class OcrResult {
        public String text;
        public Double confidence;
        public Long processingTime;
        
        public OcrResult(String text, Double confidence, Long processingTime) {
            this.text = text;
            this.confidence = confidence;
            this.processingTime = processingTime;
        }
    }
}

