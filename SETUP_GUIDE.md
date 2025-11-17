# 搜题系统 - 完整搭建指南

## 📦 项目已完成内容

我已经为你搭建了一个完整的AI驱动搜题系统，包括：

### ✅ 后端系统 (SpringBoot)
- **数据库设计**: 完整的MySQL数据库结构（题目、选项、搜索历史、OCR记录、向量嵌入）
- **API接口**: 
  - 搜索API（关键词、语义、按学科/难度/分类）
  - OCR识别API（图片识别、识别并搜索）
  - 问题管理API（CRUD操作）
- **业务逻辑**: 搜索服务、OCR服务、问题管理服务
- **数据访问**: JPA Repository层

### ✅ 前端系统 (Vue3)
- **首页**: 功能导航、系统特性展示
- **搜索页面**: 文本搜索、多条件筛选、分页展示
- **OCR搜题页面**: 图片上传、文字识别、搜索结果
- **详情页面**: 题目详细信息展示
- **API集成**: 完整的API调用层

### ✅ 部署配置
- **Docker**: 后端和前端的Dockerfile
- **Docker Compose**: 一键启动MySQL、后端、前端、Chroma
- **Nginx配置**: 前端反向代理和API转发
- **启动脚本**: Windows和Linux启动脚本

### ✅ 文档
- **README.md**: 项目概述和快速开始
- **API_DOCUMENTATION.md**: 详细的API文档
- **SETUP_GUIDE.md**: 本文件

---

## 🚀 快速启动（3种方式）

### 方式一：Docker Compose（最简单，推荐）

```bash
# 1. 进入项目目录
cd search-question-system

# 2. 运行启动脚本
# Windows
start.bat

# Linux/Mac
bash start.sh

# 3. 等待10秒，然后访问
# 前端: http://localhost
# 后端API: http://localhost:8080/api
```

### 方式二：本地开发（需要手动配置）

#### 前置要求
- Java 8+
- MySQL 8.0+
- Node.js 18+
- Python 3.7+（用于PaddleOCR）

#### 后端启动

```bash
# 1. 创建数据库
mysql -u root -p < src/main/resources/db/init.sql

# 2. 修改配置文件 (src/main/resources/application.yml)
# 修改数据库连接信息为你的本地配置

# 3. 编译运行
mvn clean package
java -jar target/search-question-system-1.0.0.jar

# 后端运行在 http://localhost:8080
```

#### 前端启动

```bash
cd frontend

# 1. 安装依赖
npm install

# 2. 开发模式
npm run dev

# 前端运行在 http://localhost:3000
```

### 方式三：手动Docker启动

```bash
# 1. 构建后端镜像
docker build -t search-question-backend:1.0 .

# 2. 构建前端镜像
docker build -t search-question-frontend:1.0 ./frontend

# 3. 启动MySQL
docker run -d --name mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=search_question_db \
  -p 3306:3306 \
  mysql:8.0

# 4. 启动后端
docker run -d --name backend \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/search_question_db \
  -p 8080:8080 \
  search-question-backend:1.0

# 5. 启动前端
docker run -d --name frontend \
  -p 80:80 \
  search-question-frontend:1.0
```

---

## 🔧 配置说明

### 后端配置修改

编辑 `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/search_question_db
    username: root
    password: root  # 修改为你的MySQL密码
  
  jpa:
    hibernate:
      ddl-auto: update  # 自动创建表

app:
  upload:
    path: ./uploads  # 上传文件保存路径
  
  ocr:
    enabled: true
    model-path: ./models/paddleocr  # PaddleOCR模型路径
  
  vector-db:
    type: chroma
    host: localhost
    port: 8000
```

### 前端配置修改

编辑 `frontend/vite.config.js`:

```javascript
server: {
  port: 3000,  // 修改前端端口
  proxy: {
    '/api': {
      target: 'http://localhost:8080',  // 修改后端地址
      changeOrigin: true
    }
  }
}
```

---

## 📝 数据库初始化

系统已包含初始化脚本 `src/main/resources/db/init.sql`，包含：

- **questions**: 题目表（包含标题、内容、答案、解析等）
- **question_options**: 选项表（用于选择题）
- **search_history**: 搜索历史表
- **ocr_records**: OCR识别记录表
- **vector_embeddings**: 向量嵌入表

初始化脚本已包含3条示例数据。

---

## 🔌 集成PaddleOCR

### 安装PaddleOCR

```bash
# 1. 安装Python依赖
pip install paddleocr

# 2. 首次运行会自动下载模型（约200MB）
python -c "from paddleocr import PaddleOCR; ocr = PaddleOCR(use_angle_cls=True, lang='ch')"
```

### 在Java中调用

`OcrServiceImpl.java` 已实现通过Python脚本调用PaddleOCR的方式。

---

## 🔌 集成Chroma向量数据库

### 启动Chroma

```bash
# 方式1: Docker
docker run -p 8000:8000 ghcr.io/chroma-core/chroma:latest

# 方式2: Python
pip install chroma-db
chroma run --host localhost --port 8000
```

### 使用Chroma

向量搜索功能在 `SearchServiceImpl.java` 中已预留接口。

---

## 📚 项目结构详解

```
search-question-system/
│
├── src/main/java/com/searchquestion/
│   ├── controller/              # 控制器层
│   │   ├── SearchController.java      # 搜索API
│   │   ├── OcrController.java         # OCR API
│   │   └── QuestionController.java    # 问题管理API
│   │
│   ├── service/                 # 业务逻辑层
│   │   ├── SearchService.java         # 搜索服务接口
│   │   ├── OcrService.java            # OCR服务接口
│   │   ├── QuestionService.java       # 问题管理服务接口
│   │   └── impl/                      # 实现类
│   │
│   ├── entity/                  # 数据实体
│   │   ├── Question.java              # 题目实体
│   │   ├── QuestionOption.java        # 选项实体
│   │   ├── SearchHistory.java         # 搜索历史实体
│   │   ├── OcrRecord.java             # OCR记录实体
│   │   └── VectorEmbedding.java       # 向量嵌入实体
│   │
│   ├── repository/              # 数据访问层
│   │   ├── QuestionRepository.java
│   │   ├── SearchHistoryRepository.java
│   │   └── OcrRecordRepository.java
│   │
│   ├── dto/                     # 数据传输对象
│   │   ├── QuestionDTO.java
│   │   ├── SearchRequestDTO.java
│   │   ├── ApiResponse.java
│   │   └── ...
│   │
│   └── SearchQuestionApplication.java # 主应用类
│
├── frontend/
│   ├── src/
│   │   ├── views/               # 页面组件
│   │   │   ├── Home.vue              # 首页
│   │   │   ├── Search.vue            # 搜索页面
│   │   │   ├── OcrSearch.vue         # OCR搜题页面
│   │   │   └── QuestionDetail.vue    # 详情页面
│   │   │
│   │   ├── api/                 # API调用
│   │   │   └── index.js              # API集成
│   │   │
│   │   ├── router/              # 路由配置
│   │   │   └── index.js
│   │   │
│   │   ├── App.vue              # 主应用
│   │   └── main.js              # 入口文件
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   ├── nginx.conf
│   └── index.html
│
├── pom.xml                      # Maven配置
├── Dockerfile                   # 后端Docker镜像
├── docker-compose.yml           # Docker Compose配置
├── start.sh                     # Linux启动脚本
├── start.bat                    # Windows启动脚本
├── README.md                    # 项目说明
├── API_DOCUMENTATION.md         # API文档
└── SETUP_GUIDE.md              # 本文件
```

---

## 🧪 测试系统

### 1. 测试搜索功能

```bash
curl -X POST http://localhost:8080/api/search/keyword \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "高中数学",
    "pageNo": 0,
    "pageSize": 10
  }'
```

### 2. 测试OCR功能

```bash
curl -X POST http://localhost:8080/api/ocr/recognize \
  -F "file=@/path/to/image.jpg"
```

### 3. 测试问题管理

```bash
curl http://localhost:8080/api/questions/1
```

---

## 🐛 常见问题

### Q1: 启动时数据库连接失败

**解决方案**:
1. 确保MySQL已启动
2. 检查 `application.yml` 中的数据库配置
3. 确保数据库用户名和密码正确

### Q2: 前端无法连接后端

**解决方案**:
1. 确保后端已启动（http://localhost:8080）
2. 检查 `vite.config.js` 中的代理配置
3. 检查浏览器控制台的CORS错误

### Q3: OCR识别不工作

**解决方案**:
1. 确保已安装PaddleOCR
2. 检查 `application.yml` 中的OCR配置
3. 查看后端日志获取详细错误信息

### Q4: Docker启动失败

**解决方案**:
1. 确保Docker已安装并运行
2. 检查端口是否被占用
3. 运行 `docker-compose logs` 查看详细错误

---

## 📈 下一步改进方向

1. **性能优化**
   - 添加缓存层（Redis）
   - 数据库查询优化
   - 前端代码分割和懒加载

2. **功能扩展**
   - 用户认证和授权
   - 收藏和笔记功能
   - 错题本功能
   - 学习统计和分析

3. **AI增强**
   - 集成更多LLM模型
   - 自动生成题目解析
   - 个性化推荐

4. **运维**
   - 添加监控和日志
   - 性能指标收集
   - 自动化测试

---

## 📞 获取帮助

- 查看 `README.md` 了解项目概述
- 查看 `API_DOCUMENTATION.md` 了解API详情
- 查看后端日志: `docker-compose logs backend`
- 查看前端日志: 浏览器开发者工具

---

**祝你使用愉快！** 🎉

如有任何问题，欢迎提出！

