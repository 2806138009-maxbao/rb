package com.searchquestion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.searchquestion"})
public class SearchQuestionApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(SearchQuestionApplication.class, args);
    }
}

