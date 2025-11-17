# 搜题系统 - AI驱动的智能搜题平台

一个基于SpringBoot + Vue3 + PaddleOCR + Chroma的完整搜题系统，支持文本搜索、图片识别、语义搜索等功能。

## 🌟 主要特性

- **文本搜索**: 支持关键词搜索、按学科/难度/分类搜索
- **图片识别**: 集成PaddleOCR进行图片文字识别
- **语义搜索**: 使用向量数据库实现智能语义搜索
- **详细解析**: 每道题目都有答案和详细解析
- **响应式设计**: 支持PC、平板、手机等多种设备
- **Docker部署**: 一键启动完整系统

## 📋 系统架构

```
┌─────────────────────────────────────────────────────┐
│                   前端 (Vue3)                        │
│  (Web界面、图片上传、搜索、结果展示)                 │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────▼────────┐
        │  后端API (SpringBoot)  │
        │  (业务逻辑、数据处理)   │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼──┐  ┌─────▼──┐  ┌──────▼──┐
│MySQL │  │PaddleOCR│  │ Chroma  │
│数据库 │  │ OCR识别 │  │向量搜索 │
└──────┘  └────────┘  └─────────┘
```

## 🚀 快速开始

### 方式一：Docker Compose（推荐）

```bash
# 克隆项目
git clone <repository-url>
cd search-question-system

# 启动所有服务
docker-compose up -d

# 访问应用
# 前端: http://localhost
# 后端API: http://localhost:8080/api
# 数据库: localhost:3306
```

### 方式二：本地开发

#### 后端启动

```bash
# 1. 安装MySQL 8.0+
# 2. 创建数据库
mysql -u root -p < src/main/resources/db/init.sql

# 3. 修改配置文件
# 编辑 src/main/resources/application.yml
# 修改数据库连接信息

# 4. 编译运行
mvn clean package
java -jar target/search-question-system-1.0.0.jar
```

#### 前端启动

```bash
cd frontend

# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
```

## 📚 API文档

### 搜索API

#### 关键词搜索
```
POST /api/search/keyword
Content-Type: application/json

{
  "keyword": "高中数学",
  "subject": "数学",
  "level": "简单",
  "category": "代数",
  "pageNo": 0,
  "pageSize": 10
}
```

#### 语义搜索
```
GET /api/search/semantic?query=求解方程&topK=10
```

### OCR API

#### 识别图片
```
POST /api/ocr/recognize
Content-Type: multipart/form-data

file: <image-file>
```

### 问题管理API

#### 获取问题详情
```
GET /api/questions/{id}
```

#### 创建问题
```
POST /api/questions
Content-Type: application/json

{
  "title": "题目标题",
  "content": "题目内容",
  "subject": "数学",
  "level": "简单",
  "answer": "答案",
  "explanation": "解析"
}
```

## 🔧 配置说明

### 后端配置 (application.yml)

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/search_question_db
    username: root
    password: root

app:
  upload:
    path: ./uploads
  ocr:
    enabled: true
    model-path: ./models/paddleocr
  vector-db:
    type: chroma
    host: localhost
    port: 8000
```

### 前端配置 (vite.config.js)

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080'
    }
  }
}
```

## 📦 项目结构

```
search-question-system/
├── src/
│   ├── main/
│   │   ├── java/com/searchquestion/
│   │   │   ├── controller/      # 控制器
│   │   │   ├── service/         # 业务逻辑
│   │   │   ├── entity/          # 数据实体
│   │   │   ├── repository/      # 数据访问
│   │   │   └── dto/             # 数据传输对象
│   │   └── resources/
│   │       ├── application.yml  # 应用配置
│   │       └── db/init.sql      # 数据库初始化
│   └── test/                    # 测试代码
├── frontend/
│   ├── src/
│   │   ├── views/               # 页面组件
│   │   ├── api/                 # API调用
│   │   ├── router/              # 路由配置
│   │   └── App.vue              # 主应用
│   ├── package.json
│   └── vite.config.js
├── pom.xml                      # Maven配置
├── Dockerfile                   # 后端Docker镜像
├── docker-compose.yml           # Docker Compose配置
└── README.md
```

## 🔌 集成PaddleOCR

### 安装Python环境

```bash
# 安装Python 3.7+
pip install paddleocr

# 下载模型（首次运行会自动下载）
python -c "from paddleocr import PaddleOCR; ocr = PaddleOCR(use_angle_cls=True, lang='ch')"
```

### Java调用PaddleOCR

在 `OcrServiceImpl.java` 中已实现通过Python脚本调用PaddleOCR的方式。

## 🔌 集成Chroma向量数据库

### 启动Chroma

```bash
# 使用Docker
docker run -p 8000:8000 ghcr.io/chroma-core/chroma:latest

# 或使用Python
pip install chroma-db
chroma run --host localhost --port 8000
```

### 使用Chroma

```python
import chromadb

client = chromadb.HttpClient(host="localhost", port=8000)
collection = client.get_or_create_collection(name="questions")

# 添加向量
collection.add(
    ids=["1", "2"],
    documents=["题目1", "题目2"],
    embeddings=[[1.1, 2.3], [4.5, 6.9]]
)

# 搜索
results = collection.query(
    query_embeddings=[[1.1, 2.3]],
    n_results=10
)
```

## 📝 数据库设计

### 主要表结构

- **questions**: 题目表
- **question_options**: 选项表
- **search_history**: 搜索历史表
- **ocr_records**: OCR识别记录表
- **vector_embeddings**: 向量嵌入表

详见 `src/main/resources/db/init.sql`

## 🧪 测试

```bash
# 后端单元测试
mvn test

# 前端单元测试
cd frontend
npm run test
```

## 📄 许可证

MIT License

## 👥 贡献

欢迎提交Issue和Pull Request！

## 📞 联系方式

如有问题，请提交Issue或联系开发者。

---

**最后更新**: 2024年11月
