package com.searchquestion.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionOptionDTO {
    
    private Long id;
    private String optionKey;
    private String optionValue;
    private Integer isCorrect;
}

