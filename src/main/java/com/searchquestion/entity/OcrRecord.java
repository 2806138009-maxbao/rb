package com.searchquestion.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ocr_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OcrRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(length = 500)
    private String imagePath;
    
    @Column(columnDefinition = "LONGTEXT")
    private String recognizedText;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal confidence;
    
    @Column
    private Integer processingTime;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}

