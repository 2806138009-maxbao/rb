# 🎉 搜题系统 - 从这里开始

欢迎使用 AI 驱动的智能搜题系统！这是一个完整的、生产就绪的搜题平台。

---

## ⚡ 5 分钟快速开始

### 第一步：启动系统

**Windows 用户**

```bash
双击运行 start.bat
```

**Mac/Linux 用户**

```bash
bash start.sh
```

### 第二步：等待启动完成

系统会自动启动：

- ✅ MySQL 数据库
- ✅ 后端 API 服务
- ✅ 前端 Web 应用
- ✅ Chroma 向量数据库

### 第三步：访问应用

打开浏览器访问：

- **前端应用**: http://localhost
- **后端 API**: http://localhost:8080/api

---

## 🎯 主要功能

### 1️⃣ 文本搜索

- 输入关键词搜索题目
- 按学科、难度、分类筛选
- 查看详细答案和解析

### 2️⃣ 图片搜题

- 拖拽上传题目图片
- 自动识别文字（OCR）
- 搜索相关题目

### 3️⃣ 题目详情

- 完整的题目信息
- 答案和详细解析
- 选项展示

---

## 📚 文档导航

| 文档                     | 用途         | 何时阅读     |
| ------------------------ | ------------ | ------------ |
| **README.md**            | 项目概述     | 了解项目     |
| **QUICK_REFERENCE.md**   | 快速参考     | 需要快速查询 |
| **API_DOCUMENTATION.md** | API 详细文档 | 开发集成     |
| **SETUP_GUIDE.md**       | 完整搭建指南 | 本地开发     |
| **PROJECT_STRUCTURE.md** | 项目结构     | 代码开发     |
| **COMPLETION_REPORT.md** | 完成报告     | 了解项目状态 |

---

## 🔧 常见操作

### 查看系统状态

```bash
docker-compose ps
```

### 查看日志

```bash
# 查看所有日志
docker-compose logs -f

# 查看后端日志
docker-compose logs -f backend

# 查看前端日志
docker-compose logs -f frontend
```

### 停止系统

```bash
docker-compose down
```

### 重启系统

```bash
docker-compose restart
```

---

## 🚀 使用示例

### 搜索题目

1. 打开 http://localhost
2. 点击"文本搜索"
3. 输入关键词（如"高中数学"）
4. 选择学科和难度
5. 点击搜索

### 图片搜题

1. 打开 http://localhost
2. 点击"图片搜题"
3. 拖拽或上传题目图片
4. 点击"开始识别"
5. 查看识别结果和相关题目

### 查看题目详情

1. 在搜索结果中点击题目
2. 查看完整的题目信息
3. 查看答案和解析

---

## 💡 开发者指南

### 本地开发启动

#### 后端

```bash
# 1. 确保MySQL已启动
# 2. 修改 src/main/resources/application.yml
# 3. 运行
mvn clean package
java -jar target/search-question-system-1.0.0.jar
```

#### 前端

```bash
cd frontend
npm install
npm run dev
```

### 添加新功能

1. **后端**: 修改 `src/main/java/com/searchquestion/`
2. **前端**: 修改 `frontend/src/`
3. **数据库**: 修改 `src/main/resources/db/init.sql`

详见 `SETUP_GUIDE.md`

---

## 🐛 遇到问题？

### 问题 1: 无法启动

```bash
# 检查Docker是否运行
docker --version

# 检查端口是否被占用
# Windows: netstat -ano | findstr :80
# Mac/Linux: lsof -i :80
```

### 问题 2: 前端无法连接后端

```bash
# 检查后端是否运行
curl http://localhost:8080/api/questions

# 检查浏览器控制台错误
# F12 打开开发者工具
```

### 问题 3: 数据库连接失败

```bash
# 检查MySQL是否运行
docker-compose ps

# 查看MySQL日志
docker-compose logs mysql
```

更多问题见 `SETUP_GUIDE.md` 的常见问题部分

---

## 📊 系统架构

```
┌─────────────────────────────────────────┐
│         前端 (Vue3 + Element Plus)      │
│  http://localhost                       │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼────────┐
        │  Nginx反向代理   │
        └────────┬────────┘
                 │
    ┌────────────▼────────────┐
    │  后端API (SpringBoot)    │
    │  http://localhost:8080   │
    └────────────┬─────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼──┐  ┌─────▼──┐  ┌──────▼──┐
│MySQL │  │PaddleOCR│  │ Chroma  │
│数据库 │  │ OCR识别 │  │向量搜索 │
└──────┘  └────────┘  └─────────┘
```

---

## 📦 项目包含

- ✅ 完整的后端 API
- ✅ 响应式前端界面
- ✅ MySQL 数据库
- ✅ OCR 识别功能
- ✅ 向量搜索预留
- ✅ Docker 部署配置
- ✅ 完整的文档
- ✅ 示例数据

---

## 🎓 学习资源

### 推荐阅读

- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [Vue 3 官方文档](https://vuejs.org/)
- [Docker 官方文档](https://docs.docker.com/)
- [PaddleOCR 使用指南](https://github.com/PaddlePaddle/PaddleOCR)

### 相关项目

- [yf-exam-lite](https://github.com/yf-team/yf-exam-lite) - 开源考试系统
- [xzs-mysql](https://github.com/mindskip/xzs-mysql) - 学之思考试系统

---

## 🔐 默认凭证

| 服务  | 地址             | 用户名 | 密码 |
| ----- | ---------------- | ------ | ---- |
| MySQL | localhost:3306   | root   | root |
| 应用  | http://localhost | -      | -    |

---

## 📞 获取帮助

1. **查看文档**: 阅读相关的 `.md` 文件
2. **查看日志**: 运行 `docker-compose logs`
3. **查看 API**: 访问 `API_DOCUMENTATION.md`
4. **快速参考**: 查看 `QUICK_REFERENCE.md`

---

## ✨ 下一步

### 立即体验

```bash
# 启动系统
bash start.sh  # 或 start.bat

# 打开浏览器
# http://localhost
```

### 深入了解

- 阅读 `README.md` 了解项目
- 阅读 `SETUP_GUIDE.md` 了解部署
- 阅读 `API_DOCUMENTATION.md` 了解 API

### 开始开发

- 查看 `PROJECT_STRUCTURE.md` 了解代码结构
- 修改代码并重新构建
- 提交你的改进

---

## 🎉 开始使用

**现在就启动系统吧！**

```bash
# Windows
start.bat

# Mac/Linux
bash start.sh
```

然后访问 http://localhost

---

**祝你使用愉快！** 🚀

有任何问题，欢迎查看文档或提出反馈。
