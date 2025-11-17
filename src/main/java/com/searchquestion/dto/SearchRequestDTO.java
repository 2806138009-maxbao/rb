package com.searchquestion.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchRequestDTO {
    
    private String keyword;
    private String subject;
    private String level;
    private String category;
    private Integer pageNo;
    private Integer pageSize;
    private String searchType;
}

