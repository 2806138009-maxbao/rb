package com.searchquestion.service;

import com.searchquestion.dto.QuestionDTO;
import org.springframework.data.domain.Page;

public interface QuestionService {
    
    /**
     * 创建问题
     */
    QuestionDTO createQuestion(QuestionDTO questionDTO);
    
    /**
     * 更新问题
     */
    QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO);
    
    /**
     * 删除问题
     */
    void deleteQuestion(Long id);
    
    /**
     * 获取问题详情
     */
    QuestionDTO getQuestion(Long id);
    
    /**
     * 获取所有问题
     */
    Page<QuestionDTO> getAllQuestions(int pageNo, int pageSize);
    
    /**
     * 批量导入问题
     */
    void importQuestions(String filePath);
    
    /**
     * 批量导出问题
     */
    String exportQuestions();
}

