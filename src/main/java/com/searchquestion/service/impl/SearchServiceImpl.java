package com.searchquestion.service.impl;

import com.searchquestion.dto.QuestionDTO;
import com.searchquestion.dto.QuestionOptionDTO;
import com.searchquestion.dto.SearchRequestDTO;
import com.searchquestion.entity.Question;
import com.searchquestion.repository.QuestionRepository;
import com.searchquestion.service.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SearchServiceImpl implements SearchService {
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Override
    public Page<QuestionDTO> searchByKeyword(SearchRequestDTO request) {
        int pageNo = request.getPageNo() != null ? request.getPageNo() : 0;
        int pageSize = request.getPageSize() != null ? request.getPageSize() : 10;
        
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        
        Page<Question> questions;
        
        if (request.getSubject() != null && !request.getSubject().isEmpty()) {
            questions = questionRepository.searchByKeywordAndSubject(
                request.getKeyword(), request.getSubject(), pageable);
        } else {
            questions = questionRepository.searchByKeyword(request.getKeyword(), pageable);
        }
        
        return questions.map(this::convertToDTO);
    }
    
    @Override
    public List<QuestionDTO> semanticSearch(String query, int topK) {
        // 这里集成向量数据库搜索
        // 使用Chroma或Qdrant进行语义搜索
        log.info("Performing semantic search for query: {}", query);
        
        // 临时实现：返回关键词搜索结果
        Pageable pageable = PageRequest.of(0, topK);
        Page<Question> questions = questionRepository.searchByKeyword(query, pageable);
        
        return questions.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public Page<QuestionDTO> searchBySubject(String subject, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Question> questions = questionRepository.findBySubject(subject, pageable);
        return questions.map(this::convertToDTO);
    }
    
    @Override
    public Page<QuestionDTO> searchByLevel(String level, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Question> questions = questionRepository.findByLevel(level, pageable);
        return questions.map(this::convertToDTO);
    }
    
    @Override
    public Page<QuestionDTO> searchByCategory(String category, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Question> questions = questionRepository.findByCategory(category, pageable);
        return questions.map(this::convertToDTO);
    }
    
    @Override
    public Page<QuestionDTO> advancedSearch(String keyword, String subject, String level,
                                           String category, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        
        // 这里可以实现更复杂的搜索逻辑
        Page<Question> questions = questionRepository.searchByKeywordAndSubject(
            keyword, subject, pageable);
        
        return questions.map(this::convertToDTO);
    }
    
    private QuestionDTO convertToDTO(Question question) {
        List<QuestionOptionDTO> options = question.getOptions() != null ?
            question.getOptions().stream()
                .map(opt -> QuestionOptionDTO.builder()
                    .id(opt.getId())
                    .optionKey(opt.getOptionKey())
                    .optionValue(opt.getOptionValue())
                    .isCorrect(opt.getIsCorrect())
                    .build())
                .collect(Collectors.toList()) : null;
        
        return QuestionDTO.builder()
            .id(question.getId())
            .title(question.getTitle())
            .content(question.getContent())
            .category(question.getCategory())
            .subject(question.getSubject())
            .level(question.getLevel())
            .answer(question.getAnswer())
            .explanation(question.getExplanation())
            .questionType(question.getQuestionType())
            .source(question.getSource())
            .createdAt(question.getCreatedAt())
            .updatedAt(question.getUpdatedAt())
            .options(options)
            .build();
    }
}

