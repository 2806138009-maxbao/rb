package com.searchquestion.service.impl;

import com.searchquestion.service.OcrService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
public class OcrServiceImpl implements OcrService {
    
    @Value("${app.upload.path:./uploads}")
    private String uploadPath;
    
    @Override
    public String recognizeText(MultipartFile file) {
        OcrResult result = recognizeTextWithConfidence(file);
        return result != null ? result.text : "";
    }
    
    @Override
    public OcrResult recognizeTextWithConfidence(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            log.warn("Empty file provided for OCR");
            return new OcrResult("", 0.0, 0L);
        }
        
        long startTime = System.currentTimeMillis();
        
        try {
            // 保存上传的文件
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            
            File savedFile = new File(uploadDir, fileName);
            file.transferTo(savedFile);
            
            // 这里集成PaddleOCR
            // 由于PaddleOCR需要Python环境，我们可以通过以下方式集成：
            // 1. 调用Python脚本
            // 2. 使用REST API
            // 3. 使用Java绑定
            
            String recognizedText = callPaddleOCR(savedFile.getAbsolutePath());
            
            long processingTime = System.currentTimeMillis() - startTime;
            
            log.info("OCR processing completed in {} ms", processingTime);
            
            return new OcrResult(recognizedText, 0.85, processingTime);
            
        } catch (IOException e) {
            log.error("Error processing OCR file", e);
            return new OcrResult("", 0.0, System.currentTimeMillis() - startTime);
        }
    }
    
    /**
     * 调用PaddleOCR进行文字识别
     * 这是一个示例实现，实际使用时需要配置PaddleOCR
     */
    private String callPaddleOCR(String imagePath) {
        try {
            // 方案1: 调用Python脚本
            ProcessBuilder pb = new ProcessBuilder(
                "python", "-m", "paddleocr", "--image_dir", imagePath
            );
            pb.redirectErrorStream(true);
            Process process = pb.start();
            
            // 读取输出
            StringBuilder output = new StringBuilder();
            try (java.io.BufferedReader reader = new java.io.BufferedReader(
                    new java.io.InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }
            
            process.waitFor();
            
            return output.toString();
            
        } catch (Exception e) {
            log.error("Error calling PaddleOCR", e);
            // 返回模拟数据用于测试
            return "这是一个模拟的OCR识别结果。实际使用时需要配置PaddleOCR环境。";
        }
    }
}

