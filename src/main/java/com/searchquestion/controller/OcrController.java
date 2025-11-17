package com.searchquestion.controller;

import com.searchquestion.dto.ApiResponse;
import com.searchquestion.service.OcrService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/ocr")
@CrossOrigin(origins = "*")
public class OcrController {
    
    @Autowired
    private OcrService ocrService;
    
    /**
     * 识别图片中的文字
     */
    @PostMapping("/recognize")
    public ApiResponse<Map<String, Object>> recognizeText(@RequestParam("file") MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                return ApiResponse.error(400, "请上传图片文件");
            }
            
            log.info("Processing OCR for file: {}", file.getOriginalFilename());
            
            OcrService.OcrResult result = ocrService.recognizeTextWithConfidence(file);
            
            Map<String, Object> response = new HashMap<>();
            response.put("text", result.text);
            response.put("confidence", result.confidence);
            response.put("processingTime", result.processingTime);
            
            return ApiResponse.success(response);
            
        } catch (Exception e) {
            log.error("Error in OCR recognition", e);
            return ApiResponse.error("OCR识别失败: " + e.getMessage());
        }
    }
    
    /**
     * 识别图片并搜索相关题目
     */
    @PostMapping("/recognize-and-search")
    public ApiResponse<Map<String, Object>> recognizeAndSearch(
            @RequestParam("file") MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                return ApiResponse.error(400, "请上传图片文件");
            }
            
            log.info("Processing OCR and search for file: {}", file.getOriginalFilename());
            
            // 识别文字
            String recognizedText = ocrService.recognizeText(file);
            
            // TODO: 使用识别的文字进行搜索
            
            Map<String, Object> response = new HashMap<>();
            response.put("recognizedText", recognizedText);
            response.put("searchResults", null);
            
            return ApiResponse.success(response);
            
        } catch (Exception e) {
            log.error("Error in OCR recognition and search", e);
            return ApiResponse.error("OCR识别和搜索失败: " + e.getMessage());
        }
    }
}

