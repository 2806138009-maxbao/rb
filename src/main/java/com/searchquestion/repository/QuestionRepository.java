package com.searchquestion.repository;

import com.searchquestion.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    @Query("SELECT q FROM Question q WHERE q.isDeleted = 0 AND " +
           "(LOWER(q.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(q.content) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Question> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT q FROM Question q WHERE q.isDeleted = 0 AND q.subject = :subject")
    Page<Question> findBySubject(@Param("subject") String subject, Pageable pageable);
    
    @Query("SELECT q FROM Question q WHERE q.isDeleted = 0 AND q.level = :level")
    Page<Question> findByLevel(@Param("level") String level, Pageable pageable);
    
    @Query("SELECT q FROM Question q WHERE q.isDeleted = 0 AND q.category = :category")
    Page<Question> findByCategory(@Param("category") String category, Pageable pageable);
    
    @Query("SELECT q FROM Question q WHERE q.isDeleted = 0 AND " +
           "q.subject = :subject AND q.level = :level")
    Page<Question> findBySubjectAndLevel(@Param("subject") String subject, 
                                         @Param("level") String level, Pageable pageable);
    
    @Query("SELECT q FROM Question q WHERE q.isDeleted = 0 AND " +
           "(LOWER(q.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(q.content) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "q.subject = :subject")
    Page<Question> searchByKeywordAndSubject(@Param("keyword") String keyword, 
                                             @Param("subject") String subject, Pageable pageable);
    
    List<Question> findByIdIn(List<Long> ids);
}

