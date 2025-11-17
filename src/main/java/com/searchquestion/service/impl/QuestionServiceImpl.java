package com.searchquestion.service.impl;

import com.searchquestion.dto.QuestionDTO;
import com.searchquestion.dto.QuestionOptionDTO;
import com.searchquestion.entity.Question;
import com.searchquestion.entity.QuestionOption;
import com.searchquestion.repository.QuestionRepository;
import com.searchquestion.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class QuestionServiceImpl implements QuestionService {
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Override
    @Transactional
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Question question = Question.builder()
            .title(questionDTO.getTitle())
            .content(questionDTO.getContent())
            .category(questionDTO.getCategory())
            .subject(questionDTO.getSubject())
            .level(questionDTO.getLevel())
            .answer(questionDTO.getAnswer())
            .explanation(questionDTO.getExplanation())
            .questionType(questionDTO.getQuestionType())
            .source(questionDTO.getSource())
            .isDeleted(0)
            .build();
        
        Question saved = questionRepository.save(question);
        
        // 保存选项
        if (questionDTO.getOptions() != null && !questionDTO.getOptions().isEmpty()) {
            List<QuestionOption> options = questionDTO.getOptions().stream()
                .map(opt -> QuestionOption.builder()
                    .question(saved)
                    .optionKey(opt.getOptionKey())
                    .optionValue(opt.getOptionValue())
                    .isCorrect(opt.getIsCorrect())
                    .build())
                .collect(Collectors.toList());
            saved.setOptions(options);
        }
        
        return convertToDTO(saved);
    }
    
    @Override
    @Transactional
    public QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO) {
        Question question = questionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Question not found"));
        
        question.setTitle(questionDTO.getTitle());
        question.setContent(questionDTO.getContent());
        question.setCategory(questionDTO.getCategory());
        question.setSubject(questionDTO.getSubject());
        question.setLevel(questionDTO.getLevel());
        question.setAnswer(questionDTO.getAnswer());
        question.setExplanation(questionDTO.getExplanation());
        question.setQuestionType(questionDTO.getQuestionType());
        question.setSource(questionDTO.getSource());
        
        Question updated = questionRepository.save(question);
        return convertToDTO(updated);
    }
    
    @Override
    @Transactional
    public void deleteQuestion(Long id) {
        Question question = questionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Question not found"));
        question.setIsDeleted(1);
        questionRepository.save(question);
    }
    
    @Override
    public QuestionDTO getQuestion(Long id) {
        Question question = questionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Question not found"));
        return convertToDTO(question);
    }
    
    @Override
    public Page<QuestionDTO> getAllQuestions(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return questionRepository.findAll(pageable).map(this::convertToDTO);
    }
    
    @Override
    public void importQuestions(String filePath) {
        log.info("Importing questions from file: {}", filePath);
        // TODO: 实现从CSV/Excel导入
    }
    
    @Override
    public String exportQuestions() {
        log.info("Exporting all questions");
        // TODO: 实现导出为CSV/Excel
        return "export_file.csv";
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

