package com.searchquestion.controller;

import com.searchquestion.dto.ApiResponse;
import com.searchquestion.dto.QuestionDTO;
import com.searchquestion.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/questions")
@CrossOrigin(origins = "*")
public class QuestionController {
    
    @Autowired
    private QuestionService questionService;
    
    /**
     * 创建问题
     */
    @PostMapping
    public ApiResponse<QuestionDTO> createQuestion(@RequestBody QuestionDTO questionDTO) {
        try {
            log.info("Creating question: {}", questionDTO.getTitle());
            QuestionDTO created = questionService.createQuestion(questionDTO);
            return ApiResponse.success(created);
        } catch (Exception e) {
            log.error("Error creating question", e);
            return ApiResponse.error("创建问题失败: " + e.getMessage());
        }
    }
    
    /**
     * 更新问题
     */
    @PutMapping("/{id}")
    public ApiResponse<QuestionDTO> updateQuestion(
            @PathVariable Long id,
            @RequestBody QuestionDTO questionDTO) {
        try {
            log.info("Updating question: {}", id);
            QuestionDTO updated = questionService.updateQuestion(id, questionDTO);
            return ApiResponse.success(updated);
        } catch (Exception e) {
            log.error("Error updating question", e);
            return ApiResponse.error("更新问题失败: " + e.getMessage());
        }
    }
    
    /**
     * 删除问题
     */
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteQuestion(@PathVariable Long id) {
        try {
            log.info("Deleting question: {}", id);
            questionService.deleteQuestion(id);
            return ApiResponse.success(null);
        } catch (Exception e) {
            log.error("Error deleting question", e);
            return ApiResponse.error("删除问题失败: " + e.getMessage());
        }
    }
    
    /**
     * 获取问题详情
     */
    @GetMapping("/{id}")
    public ApiResponse<QuestionDTO> getQuestion(@PathVariable Long id) {
        try {
            QuestionDTO question = questionService.getQuestion(id);
            return ApiResponse.success(question);
        } catch (Exception e) {
            log.error("Error getting question", e);
            return ApiResponse.error("获取问题失败: " + e.getMessage());
        }
    }
    
    /**
     * 获取所有问题
     */
    @GetMapping
    public ApiResponse<Page<QuestionDTO>> getAllQuestions(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        try {
            Page<QuestionDTO> questions = questionService.getAllQuestions(pageNo, pageSize);
            return ApiResponse.success(questions);
        } catch (Exception e) {
            log.error("Error getting all questions", e);
            return ApiResponse.error("获取问题列表失败: " + e.getMessage());
        }
    }
}

