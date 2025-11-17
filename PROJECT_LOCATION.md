# 📍 搜题系统 - 项目位置说明

## 项目所在位置

```
c:\学生档案资料\编程
```

这是你的工作目录，所有项目文件都已创建在这个目录中。

---

## 📁 项目结构

```
c:\学生档案资料\编程\
│
├── 📄 START_HERE.md                    ⭐ 从这里开始
├── 📄 README.md                        项目说明
├── 📄 QUICK_REFERENCE.md               快速参考
├── 📄 API_DOCUMENTATION.md             API文档
├── 📄 SETUP_GUIDE.md                   搭建指南
├── 📄 PROJECT_STRUCTURE.md             项目结构
├── 📄 COMPLETION_REPORT.md             完成报告
├── 📄 PROJECT_LOCATION.md              本文件
│
├── 📄 pom.xml                          Maven配置
├── 📄 Dockerfile                       后端Docker镜像
├── 📄 docker-compose.yml               Docker编排
├── 📄 start.bat                        ⭐ Windows启动脚本
├── 📄 start.sh                         ⭐ Linux/Mac启动脚本
│
├── 📁 src/                             后端源代码
│   └── main/
│       ├── java/com/searchquestion/
│       │   ├── controller/             控制器
│       │   ├── service/                服务
│       │   ├── entity/                 实体
│       │   ├── repository/             数据访问
│       │   ├── dto/                    数据传输对象
│       │   └── SearchQuestionApplication.java
│       └── resources/
│           ├── application.yml         应用配置
│           └── db/init.sql             数据库初始化
│
└── 📁 frontend/                        前端源代码
    ├── 📄 package.json                 NPM配置
    ├── 📄 vite.config.js               Vite配置
    ├── 📄 index.html                   HTML入口
    ├── 📄 Dockerfile                   前端Docker镜像
    ├── 📄 nginx.conf                   Nginx配置
    └── 📁 src/
        ├── main.js                     Vue入口
        ├── App.vue                     主应用
        ├── views/                      页面组件
        ├── api/                        API调用
        └── router/                     路由配置
```

---

## 🚀 快速启动

### 方式1：使用启动脚本（推荐）

**Windows用户**
```bash
# 在文件管理器中双击运行
start.bat

# 或在命令行运行
cd c:\学生档案资料\编程
start.bat
```

**Mac/Linux用户**
```bash
cd c:\学生档案资料\编程
bash start.sh
```

### 方式2：使用Docker Compose

```bash
cd c:\学生档案资料\编程
docker-compose up -d
```

### 方式3：本地开发

**后端**
```bash
cd c:\学生档案资料\编程
mvn clean package
java -jar target/search-question-system-1.0.0.jar
```

**前端**
```bash
cd c:\学生档案资料\编程\frontend
npm install
npm run dev
```

---

## 📍 访问地址

启动后访问以下地址：

| 服务 | 地址 |
|------|------|
| 前端应用 | http://localhost |
| 后端API | http://localhost:8080/api |
| MySQL数据库 | localhost:3306 |
| Chroma向量DB | http://localhost:8000 |

---

## 📂 重要文件说明

### 启动脚本
- **start.bat** - Windows启动脚本（双击运行）
- **start.sh** - Linux/Mac启动脚本

### 配置文件
- **pom.xml** - Maven项目配置
- **docker-compose.yml** - Docker编排配置
- **src/main/resources/application.yml** - 应用配置
- **frontend/vite.config.js** - 前端构建配置

### 文档文件
- **START_HERE.md** - 快速开始指南
- **README.md** - 项目概述
- **API_DOCUMENTATION.md** - API详细文档
- **SETUP_GUIDE.md** - 完整搭建指南

### 数据库
- **src/main/resources/db/init.sql** - 数据库初始化脚本

---

## 🔧 环境要求

### 必需
- Docker & Docker Compose
- 或 Java 8+ & MySQL 8.0+ & Node.js 18+

### 可选
- Python 3.7+ (用于PaddleOCR)
- Git (用于版本控制)

---

## 📝 文件清单

### 根目录文件 (42个)

**文档** (7个)
- START_HERE.md
- README.md
- QUICK_REFERENCE.md
- API_DOCUMENTATION.md
- SETUP_GUIDE.md
- PROJECT_STRUCTURE.md
- COMPLETION_REPORT.md

**配置** (4个)
- pom.xml
- Dockerfile
- docker-compose.yml
- PROJECT_LOCATION.md

**脚本** (2个)
- start.bat
- start.sh

**源代码** (29个)
- src/ 目录下的Java文件
- frontend/ 目录下的Vue文件

---

## 🎯 下一步

### 1️⃣ 立即启动
```bash
# Windows
start.bat

# Mac/Linux
bash start.sh
```

### 2️⃣ 打开浏览器
访问 http://localhost

### 3️⃣ 开始使用
- 尝试文本搜索
- 尝试图片搜题
- 查看题目详情

### 4️⃣ 深入了解
- 阅读 START_HERE.md
- 阅读 SETUP_GUIDE.md
- 查看 API_DOCUMENTATION.md

---

## 💡 常用命令

### 启动/停止
```bash
# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 重启服务
docker-compose restart
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

### 查看状态
```bash
# 查看运行状态
docker-compose ps

# 查看容器详情
docker ps -a
```

---

## 🔐 默认凭证

| 服务 | 用户名 | 密码 |
|------|--------|------|
| MySQL | root | root |
| 应用 | - | - |

---

## 📞 获取帮助

1. **快速开始**: 查看 START_HERE.md
2. **快速参考**: 查看 QUICK_REFERENCE.md
3. **详细文档**: 查看 SETUP_GUIDE.md
4. **API文档**: 查看 API_DOCUMENTATION.md
5. **查看日志**: 运行 `docker-compose logs`

---

## ✅ 项目状态

- ✅ 所有文件已创建
- ✅ 所有代码已完成
- ✅ 所有文档已编写
- ✅ 可直接启动使用

---

**项目位置**: `c:\学生档案资料\编程`  
**项目状态**: 生产就绪 ✅  
**最后更新**: 2024年11月

