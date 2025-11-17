# 🐳 Docker 是什么？

## 简单解释

**Docker 就像一个"虚拟电脑"**，可以在你的电脑上运行多个独立的应用程序，每个应用程序都有自己的环境，互不干扰。

---

## 🎯 Docker 的核心概念

### 1. 容器（Container）

想象一个**集装箱**：
- 每个集装箱里装着一个完整的应用程序
- 集装箱内有应用程序需要的所有东西（代码、库、配置）
- 集装箱之间互不影响
- 可以随时启动、停止、删除

### 2. 镜像（Image）

想象一个**蓝图**或**模板**：
- 镜像是集装箱的模板
- 从镜像可以创建多个相同的容器
- 镜像包含了应用程序运行所需的一切

### 3. 关系

```
镜像（Image）→ 容器（Container）
蓝图          → 实际的房子
模板          → 根据模板创建的实例
```

---

## 🚀 Docker 在搜题系统中的作用

### 没有 Docker 的情况

你需要在你的电脑上安装：
```
✅ Java 8+
✅ MySQL 8.0+
✅ Node.js 18+
✅ Maven 3.6+
✅ 配置环境变量
✅ 手动启动每个服务
✅ 处理版本兼容问题
```

**问题**：
- ❌ 安装复杂
- ❌ 容易出错
- ❌ 占用系统资源
- ❌ 污染系统环境
- ❌ 在不同电脑上可能不兼容

### 使用 Docker 的情况

```
✅ 只需安装 Docker Desktop
✅ 一键启动所有服务
✅ 自动下载所有依赖
✅ 环境完全隔离
✅ 在任何电脑上都能运行
```

**优点**：
- ✅ 安装简单
- ✅ 一键启动
- ✅ 环境隔离
- ✅ 跨平台兼容
- ✅ 不污染系统

---

## 📊 Docker 架构图

```
你的电脑
├── Docker Desktop（Docker 引擎）
│   ├── 容器 1: MySQL 数据库
│   │   └── 运行在独立的环境中
│   ├── 容器 2: 后端应用（Spring Boot）
│   │   └── 运行在独立的环境中
│   ├── 容器 3: 前端应用（Vue.js）
│   │   └── 运行在独立的环境中
│   └── 容器 4: 向量数据库（Chroma）
│       └── 运行在独立的环境中
└── 你的其他应用程序（不受影响）
```

---

## 🔄 Docker 工作流程

### 第一步：构建镜像

```
Dockerfile（配置文件）
    ↓
Docker 构建
    ↓
镜像（Image）
```

例如，后端镜像包含：
- Java 8
- Spring Boot 应用
- MySQL 驱动
- 所有依赖库

### 第二步：运行容器

```
镜像（Image）
    ↓
Docker 运行
    ↓
容器（Container）- 正在运行的应用
```

### 第三步：容器通信

```
容器 1: MySQL
    ↓ (网络连接)
容器 2: 后端应用
    ↓ (网络连接)
容器 3: 前端应用
```

---

## 🎯 搜题系统中的 Docker 容器

### 容器 1: MySQL 数据库

```
用途: 存储题目、答案、用户数据
端口: 3306
镜像: mysql:8.0
```

### 容器 2: 后端应用

```
用途: 处理搜题逻辑、OCR、数据库查询
端口: 8080
镜像: 自定义 Spring Boot 镜像
```

### 容器 3: 前端应用

```
用途: 用户界面、搜题页面
端口: 80
镜像: Nginx + Vue.js
```

### 容器 4: 向量数据库

```
用途: 存储题目向量、语义搜索
端口: 8000
镜像: chroma:latest
```

---

## 💡 Docker 的优势

### 1. 一致性

```
你的电脑 → Docker 容器 → 完全相同的环境
朋友的电脑 → Docker 容器 → 完全相同的环境
服务器 → Docker 容器 → 完全相同的环境
```

### 2. 隔离性

```
容器 A（MySQL）
    ↓ 独立的文件系统
    ↓ 独立的进程
    ↓ 独立的网络
容器 B（后端应用）
    ↓ 互不影响
```

### 3. 便携性

```
Docker 镜像可以：
✅ 在 Windows 上运行
✅ 在 Mac 上运行
✅ 在 Linux 上运行
✅ 在云服务器上运行
```

### 4. 易于扩展

```
需要 2 个后端实例？
→ 从同一个镜像创建 2 个容器

需要 3 个数据库副本？
→ 从同一个镜像创建 3 个容器
```

---

## 🚀 Docker 启动流程

### 第一步：启动 Docker Desktop

```
双击 Docker Desktop 应用
    ↓
Docker 引擎启动
    ↓
准备就绪
```

### 第二步：运行 start.bat

```
start.bat 脚本
    ↓
读取 docker-compose.yml 配置
    ↓
下载所需的镜像（第一次）
    ↓
创建 4 个容器
    ↓
启动所有容器
    ↓
应用程序运行
```

### 第三步：访问应用

```
http://localhost
    ↓
请求发送到 Nginx 容器（端口 80）
    ↓
Nginx 返回前端页面
    ↓
前端与后端通信（端口 8080）
    ↓
后端查询数据库（容器内部通信）
    ↓
返回结果
```

---

## 📝 Docker Compose 是什么？

**Docker Compose** 是一个工具，用来**同时管理多个容器**。

### 没有 Docker Compose

```bash
# 需要分别启动每个容器
docker run mysql:8.0 ...
docker run spring-boot-app ...
docker run nginx ...
docker run chroma ...

# 需要手动配置网络连接
# 需要手动管理端口映射
# 需要手动处理依赖关系
```

### 使用 Docker Compose

```bash
# 一条命令启动所有容器
docker-compose up

# 自动处理：
# ✅ 网络连接
# ✅ 端口映射
# ✅ 依赖关系
# ✅ 环境变量
```

### docker-compose.yml 配置文件

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
  
  backend:
    image: search-question-backend
    ports:
      - "8080:8080"
    depends_on:
      - mysql
  
  frontend:
    image: search-question-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
  
  chroma:
    image: chroma:latest
    ports:
      - "8000:8000"
```

---

## 🎯 Docker vs 传统方式

### 传统方式

```
安装 Java → 配置环境变量 → 安装 MySQL → 启动 MySQL
    ↓
安装 Node.js → 配置 NPM → 安装依赖 → 启动前端
    ↓
安装 Maven → 下载依赖 → 编译 → 启动后端
    ↓
手动配置数据库连接
    ↓
处理版本冲突
    ↓
应用程序运行
```

**时间**: 1-2 小时
**难度**: ⭐⭐⭐ 复杂
**出错率**: 高

### Docker 方式

```
安装 Docker Desktop
    ↓
运行 start.bat
    ↓
应用程序运行
```

**时间**: 10 分钟
**难度**: ⭐ 简单
**出错率**: 低

---

## 💻 常用 Docker 命令

### 查看容器

```bash
# 查看正在运行的容器
docker ps

# 查看所有容器（包括已停止的）
docker ps -a

# 查看容器日志
docker logs 容器名
```

### 启动/停止容器

```bash
# 启动所有容器
docker-compose up

# 停止所有容器
docker-compose down

# 重启容器
docker-compose restart
```

### 进入容器

```bash
# 进入容器内部
docker exec -it 容器名 bash

# 例如，进入 MySQL 容器
docker exec -it mysql bash
```

---

## ✅ 总结

### Docker 是什么？

**Docker 是一个容器化平台**，可以：
- 📦 打包应用程序和依赖
- 🚀 一键启动应用
- 🔒 隔离不同的应用
- 🌍 在任何地方运行

### 在搜题系统中的作用

**Docker 让你**：
- ✅ 只需安装 1 个软件（Docker Desktop）
- ✅ 一键启动所有服务
- ✅ 无需手动配置
- ✅ 环境完全隔离
- ✅ 跨平台兼容

### 推荐使用 Docker

**为什么推荐 Docker？**
- 🎯 最简单的方式
- ⏱️ 最快的启动
- 🔧 最少的配置
- 🐛 最少的问题

---

## 🚀 下一步

1. **安装 Docker Desktop**
   - https://www.docker.com/products/docker-desktop

2. **启动 Docker Desktop**
   - 打开应用，等待启动

3. **运行搜题系统**
   ```bash
   start.bat
   ```

4. **访问应用**
   ```
   http://localhost
   ```

---

**Docker 让开发和部署变得简单！** 🎉

