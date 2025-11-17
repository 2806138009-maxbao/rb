package com.searchquestion.service;

import com.searchquestion.dto.QuestionDTO;
import com.searchquestion.dto.SearchRequestDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SearchService {
    
    /**
     * 文本搜索
     */
    Page<QuestionDTO> searchByKeyword(SearchRequestDTO request);
    
    /**
     * 语义搜索（使用向量数据库）
     */
    List<QuestionDTO> semanticSearch(String query, int topK);
    
    /**
     * 按学科搜索
     */
    Page<QuestionDTO> searchBySubject(String subject, int pageNo, int pageSize);
    
    /**
     * 按难度搜索
     */
    Page<QuestionDTO> searchByLevel(String level, int pageNo, int pageSize);
    
    /**
     * 按分类搜索
     */
    Page<QuestionDTO> searchByCategory(String category, int pageNo, int pageSize);
    
    /**
     * 高级搜索
     */
    Page<QuestionDTO> advancedSearch(String keyword, String subject, String level, 
                                     String category, int pageNo, int pageSize);
}

