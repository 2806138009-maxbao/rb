package com.searchquestion.repository;

import com.searchquestion.entity.OcrRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OcrRecordRepository extends JpaRepository<OcrRecord, Long> {
}

