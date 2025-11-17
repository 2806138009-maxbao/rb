-- Create Database
CREATE DATABASE IF NOT EXISTS search_question_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE search_question_db;

-- Questions Table (题目表)
CREATE TABLE IF NOT EXISTS questions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL COMMENT '题目标题',
    content LONGTEXT NOT NULL COMMENT '题目内容',
    category VARCHAR(100) COMMENT '题目分类',
    subject VARCHAR(100) COMMENT '学科',
    level VARCHAR(50) COMMENT '难度等级',
    answer LONGTEXT COMMENT '答案',
    explanation LONGTEXT COMMENT '解析',
    question_type VARCHAR(50) COMMENT '题型',
    source VARCHAR(200) COMMENT '来源',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    is_deleted TINYINT DEFAULT 0,
    INDEX idx_category (category),
    INDEX idx_subject (subject),
    INDEX idx_level (level),
    FULLTEXT INDEX ft_content (content, answer)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Question Options Table (选项表)
CREATE TABLE IF NOT EXISTS question_options (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    question_id BIGINT NOT NULL,
    option_key VARCHAR(10) COMMENT '选项键 A/B/C/D',
    option_value LONGTEXT COMMENT '选项值',
    is_correct TINYINT DEFAULT 0 COMMENT '是否正确答案',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    INDEX idx_question_id (question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Search History Table (搜索历史表)
CREATE TABLE IF NOT EXISTS search_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    search_text VARCHAR(500),
    search_type VARCHAR(50) COMMENT 'text/image',
    result_count INT,
    response_time INT COMMENT '响应时间(ms)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_ip VARCHAR(50),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- OCR Records Table (OCR识别记录表)
CREATE TABLE IF NOT EXISTS ocr_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    image_path VARCHAR(500),
    recognized_text LONGTEXT,
    confidence DECIMAL(5,2),
    processing_time INT COMMENT '处理时间(ms)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vector Embeddings Table (向量嵌入表)
CREATE TABLE IF NOT EXISTS vector_embeddings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    question_id BIGINT NOT NULL,
    embedding_vector LONGBLOB COMMENT '向量数据',
    embedding_model VARCHAR(100) COMMENT '使用的模型',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    UNIQUE INDEX uk_question_model (question_id, embedding_model)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Sample Data
INSERT INTO questions (title, content, category, subject, level, answer, explanation, question_type, source) VALUES
('高中数学题1', '求解方程 x^2 - 5x + 6 = 0', '高中数学', '数学', '简单', 'x=2 或 x=3', '使用因式分解：(x-2)(x-3)=0', '单选题', '高中数学教材'),
('高中英语题1', 'The weather is very _____ today.', '高中英语', '英语', '简单', 'nice', '形容词修饰名词weather', '单选题', '高中英语教材'),
('大学物理题1', '一个物体从高度h自由落下，求落地时的速度', '大学物理', '物理', '中等', 'v = √(2gh)', '使用能量守恒定律', '计算题', '大学物理教材');

-- Create Indexes for Performance
CREATE INDEX idx_questions_subject_level ON questions(subject, level);
CREATE INDEX idx_questions_created_at ON questions(created_at);

