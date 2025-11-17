# 搜题系统 - 项目文件清单

## 📁 完整项目结构

```
search-question-system/
│
├── 📄 pom.xml                          # Maven项目配置
├── 📄 Dockerfile                       # 后端Docker镜像
├── 📄 docker-compose.yml               # Docker Compose编排
├── 📄 start.sh                         # Linux启动脚本
├── 📄 start.bat                        # Windows启动脚本
│
├── 📄 README.md                        # 项目说明文档
├── 📄 API_DOCUMENTATION.md             # API详细文档
├── 📄 SETUP_GUIDE.md                   # 搭建指南
├── 📄 PROJECT_STRUCTURE.md             # 本文件
│
├── 📁 src/
│   ├── 📁 main/
│   │   ├── 📁 java/com/searchquestion/
│   │   │   ├── 📄 SearchQuestionApplication.java    # 主应用类
│   │   │   │
│   │   │   ├── 📁 controller/                       # 控制器层
│   │   │   │   ├── 📄 SearchController.java         # 搜索API
│   │   │   │   ├── 📄 OcrController.java            # OCR API
│   │   │   │   └── 📄 QuestionController.java       # 问题管理API
│   │   │   │
│   │   │   ├── 📁 service/                          # 业务逻辑层
│   │   │   │   ├── 📄 SearchService.java            # 搜索服务接口
│   │   │   │   ├── 📄 OcrService.java               # OCR服务接口
│   │   │   │   ├── 📄 QuestionService.java          # 问题管理服务接口
│   │   │   │   └── 📁 impl/                         # 实现类
│   │   │   │       ├── 📄 SearchServiceImpl.java
│   │   │   │       ├── 📄 OcrServiceImpl.java
│   │   │   │       └── 📄 QuestionServiceImpl.java
│   │   │   │
│   │   │   ├── 📁 entity/                           # 数据实体
│   │   │   │   ├── 📄 Question.java                 # 题目实体
│   │   │   │   ├── 📄 QuestionOption.java           # 选项实体
│   │   │   │   ├── 📄 SearchHistory.java            # 搜索历史实体
│   │   │   │   ├── 📄 OcrRecord.java                # OCR记录实体
│   │   │   │   └── 📄 VectorEmbedding.java          # 向量嵌入实体
│   │   │   │
│   │   │   ├── 📁 repository/                       # 数据访问层
│   │   │   │   ├── 📄 QuestionRepository.java
│   │   │   │   ├── 📄 SearchHistoryRepository.java
│   │   │   │   └── 📄 OcrRecordRepository.java
│   │   │   │
│   │   │   └── 📁 dto/                              # 数据传输对象
│   │   │       ├── 📄 QuestionDTO.java
│   │   │       ├── 📄 QuestionOptionDTO.java
│   │   │       ├── 📄 SearchRequestDTO.java
│   │   │       └── 📄 ApiResponse.java
│   │   │
│   │   └── 📁 resources/
│   │       ├── 📄 application.yml                   # 应用配置
│   │       └── 📁 db/
│   │           └── 📄 init.sql                      # 数据库初始化脚本
│   │
│   └── 📁 test/                                     # 测试代码（待完善）
│
└── 📁 frontend/
    ├── 📄 package.json                              # NPM配置
    ├── 📄 vite.config.js                            # Vite配置
    ├── 📄 index.html                                # HTML入口
    ├── 📄 Dockerfile                                # 前端Docker镜像
    ├── 📄 nginx.conf                                # Nginx配置
    │
    └── 📁 src/
        ├── 📄 main.js                               # Vue应用入口
        ├── 📄 App.vue                               # 主应用组件
        │
        ├── 📁 views/                                # 页面组件
        │   ├── 📄 Home.vue                          # 首页
        │   ├── 📄 Search.vue                        # 文本搜索页面
        │   ├── 📄 OcrSearch.vue                     # OCR搜题页面
        │   └── 📄 QuestionDetail.vue                # 题目详情页面
        │
        ├── 📁 api/                                  # API调用
        │   └── 📄 index.js                          # API集成
        │
        └── 📁 router/                               # 路由配置
            └── 📄 index.js                          # 路由定义
```

---

## 📊 文件统计

### 后端文件
- **Java源文件**: 15个
  - 控制器: 3个
  - 服务接口: 3个
  - 服务实现: 3个
  - 实体类: 5个
  - Repository: 3个
  - DTO: 4个
  - 主应用: 1个

- **配置文件**: 2个
  - application.yml
  - init.sql

### 前端文件
- **Vue组件**: 5个
  - App.vue
  - Home.vue
  - Search.vue
  - OcrSearch.vue
  - QuestionDetail.vue

- **JavaScript文件**: 2个
  - main.js
  - router/index.js
  - api/index.js

- **配置文件**: 3个
  - package.json
  - vite.config.js
  - index.html

### 部署文件
- **Docker**: 3个
  - Dockerfile (后端)
  - frontend/Dockerfile
  - docker-compose.yml

- **脚本**: 2个
  - start.sh
  - start.bat

- **Nginx**: 1个
  - frontend/nginx.conf

### 文档文件
- **README.md**: 项目概述
- **API_DOCUMENTATION.md**: API文档
- **SETUP_GUIDE.md**: 搭建指南
- **PROJECT_STRUCTURE.md**: 本文件

---

## 🔑 关键文件说明

### 后端关键文件

| 文件 | 说明 |
|------|------|
| `pom.xml` | Maven依赖配置，包含SpringBoot、MySQL、Lombok等 |
| `SearchQuestionApplication.java` | Spring Boot应用启动类 |
| `SearchController.java` | 搜索API端点 |
| `OcrController.java` | OCR识别API端点 |
| `QuestionController.java` | 问题管理API端点 |
| `SearchServiceImpl.java` | 搜索业务逻辑实现 |
| `OcrServiceImpl.java` | OCR识别业务逻辑实现 |
| `QuestionServiceImpl.java` | 问题管理业务逻辑实现 |
| `Question.java` | 题目数据实体 |
| `QuestionRepository.java` | 题目数据访问接口 |
| `application.yml` | 应用配置（数据库、OCR、向量DB等） |
| `init.sql` | 数据库初始化脚本 |

### 前端关键文件

| 文件 | 说明 |
|------|------|
| `package.json` | NPM依赖配置 |
| `vite.config.js` | Vite构建配置 |
| `main.js` | Vue应用入口 |
| `App.vue` | 主应用组件 |
| `Home.vue` | 首页组件 |
| `Search.vue` | 文本搜索页面 |
| `OcrSearch.vue` | OCR搜题页面 |
| `QuestionDetail.vue` | 题目详情页面 |
| `api/index.js` | API调用集成 |
| `router/index.js` | 路由配置 |

### 部署关键文件

| 文件 | 说明 |
|------|------|
| `Dockerfile` | 后端Docker镜像定义 |
| `frontend/Dockerfile` | 前端Docker镜像定义 |
| `docker-compose.yml` | 完整系统编排配置 |
| `start.sh` | Linux一键启动脚本 |
| `start.bat` | Windows一键启动脚本 |
| `frontend/nginx.conf` | Nginx反向代理配置 |

---

## 🔄 数据流向

```
用户请求
    ↓
前端 (Vue3)
    ↓
API调用 (axios)
    ↓
后端 (SpringBoot)
    ├─ SearchController
    ├─ OcrController
    └─ QuestionController
    ↓
业务逻辑层 (Service)
    ├─ SearchService
    ├─ OcrService
    └─ QuestionService
    ↓
数据访问层 (Repository)
    ├─ QuestionRepository
    ├─ SearchHistoryRepository
    └─ OcrRecordRepository
    ↓
数据库 (MySQL)
    ├─ questions
    ├─ question_options
    ├─ search_history
    ├─ ocr_records
    └─ vector_embeddings
    ↓
外部服务
    ├─ PaddleOCR (图片识别)
    └─ Chroma (向量搜索)
```

---

## 🚀 启动流程

```
1. Docker Compose启动
   ├─ MySQL数据库
   ├─ 后端API服务
   ├─ 前端Web服务
   └─ Chroma向量数据库

2. 初始化
   ├─ 数据库初始化 (init.sql)
   ├─ 表创建和索引
   └─ 示例数据导入

3. 服务就绪
   ├─ 前端: http://localhost
   ├─ 后端: http://localhost:8080/api
   ├─ 数据库: localhost:3306
   └─ Chroma: http://localhost:8000
```

---

## 📦 依赖清单

### 后端依赖 (Maven)
- Spring Boot 2.7.14
- Spring Data JPA
- MySQL Connector 8.0.33
- Lombok
- FastJSON 2.0.32
- Apache Commons IO 2.11.0
- OpenCV 4.8.0
- Apache HttpClient 4.5.14

### 前端依赖 (NPM)
- Vue 3.3.4
- Axios 1.5.0
- Element Plus 2.4.0
- Vue Router 4.2.4
- Vite 4.4.9

### 系统依赖
- Java 8+
- MySQL 8.0+
- Node.js 18+
- Python 3.7+ (用于PaddleOCR)
- Docker & Docker Compose

---

## ✅ 已实现功能

- [x] 数据库设计和初始化
- [x] 后端API开发（搜索、OCR、问题管理）
- [x] 前端页面开发（首页、搜索、OCR、详情）
- [x] OCR服务集成（PaddleOCR调用）
- [x] 向量搜索预留（Chroma集成）
- [x] Docker部署配置
- [x] 完整文档编写
- [x] 启动脚本编写

---

## 🔮 待实现功能

- [ ] 单元测试编写
- [ ] 集成测试编写
- [ ] 性能优化
- [ ] 缓存层集成 (Redis)
- [ ] 用户认证系统
- [ ] 收藏和笔记功能
- [ ] 错题本功能
- [ ] 学习统计分析
- [ ] 更多LLM模型集成
- [ ] 自动生成题目解析

---

**项目创建时间**: 2024年11月
**最后更新**: 2024年11月

