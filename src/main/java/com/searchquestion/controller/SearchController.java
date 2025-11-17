package com.searchquestion.controller;

import com.searchquestion.dto.ApiResponse;
import com.searchquestion.dto.QuestionDTO;
import com.searchquestion.dto.SearchRequestDTO;
import com.searchquestion.service.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "*")
public class SearchController {
    
    @Autowired
    private SearchService searchService;
    
    /**
     * 关键词搜索
     */
    @PostMapping("/keyword")
    public ApiResponse<Page<QuestionDTO>> searchByKeyword(@RequestBody SearchRequestDTO request) {
        try {
            log.info("Searching by keyword: {}", request.getKeyword());
            Page<QuestionDTO> results = searchService.searchByKeyword(request);
            return ApiResponse.success(results);
        } catch (Exception e) {
            log.error("Error searching by keyword", e);
            return ApiResponse.error("搜索失败: " + e.getMessage());
        }
    }
    
    /**
     * 语义搜索
     */
    @GetMapping("/semantic")
    public ApiResponse<List<QuestionDTO>> semanticSearch(
            @RequestParam String query,
            @RequestParam(defaultValue = "10") int topK) {
        try {
            log.info("Performing semantic search for query: {}", query);
            List<QuestionDTO> results = searchService.semanticSearch(query, topK);
            return ApiResponse.success(results);
        } catch (Exception e) {
            log.error("Error in semantic search", e);
            return ApiResponse.error("语义搜索失败: " + e.getMessage());
        }
    }
    
    /**
     * 按学科搜索
     */
    @GetMapping("/subject")
    public ApiResponse<Page<QuestionDTO>> searchBySubject(
            @RequestParam String subject,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        try {
            Page<QuestionDTO> results = searchService.searchBySubject(subject, pageNo, pageSize);
            return ApiResponse.success(results);
        } catch (Exception e) {
            log.error("Error searching by subject", e);
            return ApiResponse.error("按学科搜索失败: " + e.getMessage());
        }
    }
    
    /**
     * 按难度搜索
     */
    @GetMapping("/level")
    public ApiResponse<Page<QuestionDTO>> searchByLevel(
            @RequestParam String level,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        try {
            Page<QuestionDTO> results = searchService.searchByLevel(level, pageNo, pageSize);
            return ApiResponse.success(results);
        } catch (Exception e) {
            log.error("Error searching by level", e);
            return ApiResponse.error("按难度搜索失败: " + e.getMessage());
        }
    }
    
    /**
     * 高级搜索
     */
    @PostMapping("/advanced")
    public ApiResponse<Page<QuestionDTO>> advancedSearch(@RequestBody SearchRequestDTO request) {
        try {
            Page<QuestionDTO> results = searchService.advancedSearch(
                request.getKeyword(),
                request.getSubject(),
                request.getLevel(),
                request.getCategory(),
                request.getPageNo() != null ? request.getPageNo() : 0,
                request.getPageSize() != null ? request.getPageSize() : 10
            );
            return ApiResponse.success(results);
        } catch (Exception e) {
            log.error("Error in advanced search", e);
            return ApiResponse.error("高级搜索失败: " + e.getMessage());
        }
    }
}

