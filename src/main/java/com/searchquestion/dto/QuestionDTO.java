package com.searchquestion.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionDTO {
    
    private Long id;
    private String title;
    private String content;
    private String category;
    private String subject;
    private String level;
    private String answer;
    private String explanation;
    private String questionType;
    private String source;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<QuestionOptionDTO> options;
    private Double similarity;
}

