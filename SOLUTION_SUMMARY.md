# ⚡ localhost 拒绝连接 - 快速解决方案

## 🔴 问题

访问 http://localhost 时显示 **"拒绝连接"** 或 **"无法连接"**

---

## ✅ 解决方案（3 种方式）

### 方式 1️⃣：使用 Docker（推荐，最简单）

#### 前置要求
- ✅ 已安装 Docker Desktop
- ✅ Docker Desktop 已启动

#### 步骤

**第一步：运行诊断工具**
```bash
# Windows
diagnose.bat

# Mac/Linux
bash diagnose.sh
```

**第二步：如果诊断通过，启动系统**
```bash
# Windows
start.bat

# Mac/Linux
bash start.sh
```

**第三步：等待 15 秒，然后访问**
```
http://localhost
```

#### 如果诊断失败

**问题 1：Docker 未安装**
- 下载: https://www.docker.com/products/docker-desktop
- 安装后重启计算机

**问题 2：Docker 未运行**
- Windows: 打开 Docker Desktop 应用
- Mac/Linux: 运行 `sudo systemctl start docker`

**问题 3：端口被占用**
```bash
# Windows
netstat -ano | findstr :80
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :80
kill -9 <PID>
```

---

### 方式 2️⃣：本地开发（不需要 Docker）

#### 前置要求
- ✅ Java 8+
- ✅ MySQL 8.0+
- ✅ Node.js 18+
- ✅ Maven 3.6+

#### 步骤

**第一步：启动 MySQL**
```bash
# Windows
mysql -u root -p

# Mac/Linux
sudo systemctl start mysql
```

**第二步：创建数据库**
```sql
CREATE DATABASE search_question_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**第三步：导入初始化脚本**
```bash
mysql -u root -p search_question_db < src/main/resources/db/init.sql
```

**第四步：修改后端配置**

编辑 `src/main/resources/application.yml`，修改数据库密码：
```yaml
spring:
  datasource:
    password: root  # 改为你的 MySQL 密码
```

**第五步：启动后端**
```bash
cd c:\学生档案资料\编程
mvn spring-boot:run
```

**第六步：启动前端（新窗口）**
```bash
cd c:\学生档案资料\编程\frontend
npm install
npm run dev
```

**第七步：访问应用**
```
http://localhost:5173
```

---

### 方式 3️⃣：手动 Docker 启动

#### 步骤

**第一步：启动 MySQL**
```bash
docker run -d --name mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=search_question_db \
  -p 3306:3306 \
  mysql:8.0
```

**第二步：等待 MySQL 启动**
```bash
sleep 30
```

**第三步：导入初始化脚本**
```bash
docker exec -i mysql mysql -u root -proot search_question_db < src/main/resources/db/init.sql
```

**第四步：启动后端**
```bash
docker build -t search-question-backend:1.0 .
docker run -d --name backend \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/search_question_db \
  -p 8080:8080 \
  search-question-backend:1.0
```

**第五步：启动前端**
```bash
cd frontend
docker build -t search-question-frontend:1.0 .
docker run -d --name frontend \
  -p 80:80 \
  search-question-frontend:1.0
```

**第六步：访问应用**
```
http://localhost
```

---

## 🔍 快速诊断

### 检查 Docker 状态

```bash
# 检查 Docker 是否安装
docker --version

# 检查 Docker 是否运行
docker ps

# 检查容器状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 检查端口状态

```bash
# Windows
netstat -ano | findstr :80
netstat -ano | findstr :8080

# Mac/Linux
lsof -i :80
lsof -i :8080
```

### 测试连接

```bash
# 测试后端
curl http://localhost:8080/api/questions

# 测试前端
curl http://localhost
```

---

## 📋 常见错误和解决方案

| 错误 | 原因 | 解决方案 |
|------|------|---------|
| "Connection refused" | 服务未启动 | 运行 `start.bat` 或 `docker-compose up -d` |
| "port 80 is already in use" | 端口被占用 | 关闭占用端口的应用或修改端口 |
| "Cannot connect to Docker daemon" | Docker 未启动 | 启动 Docker Desktop |
| "command not found: docker" | Docker 未安装 | 安装 Docker Desktop |
| "MySQL connection refused" | MySQL 未启动 | 启动 MySQL 服务 |
| "CORS error" | 前端无法连接后端 | 检查后端是否运行，检查代理配置 |

---

## ✨ 预期结果

### 成功的标志

✅ 可以访问 http://localhost（显示搜题系统首页）  
✅ 可以访问 http://localhost:8080/api/questions（返回 JSON 数据）  
✅ 浏览器控制台没有错误  
✅ 可以进行搜索和上传图片  

### 检查清单

- [ ] Docker 已安装
- [ ] Docker Desktop 已启动
- [ ] 运行了启动脚本
- [ ] 等待了 15 秒以上
- [ ] 所有容器状态为 "Up"
- [ ] 可以访问 http://localhost
- [ ] 可以访问 http://localhost:8080/api

---

## 📞 获取更多帮助

| 问题 | 查看文档 |
|------|---------|
| Docker 相关问题 | TROUBLESHOOTING.md |
| 本地开发问题 | LOCAL_DEVELOPMENT.md |
| API 相关问题 | API_DOCUMENTATION.md |
| 项目结构问题 | PROJECT_STRUCTURE.md |
| 快速参考 | QUICK_REFERENCE.md |

---

## 🎯 推荐步骤

### 如果你有 Docker

1. ✅ 运行 `diagnose.bat` 或 `bash diagnose.sh`
2. ✅ 如果诊断通过，运行 `start.bat` 或 `bash start.sh`
3. ✅ 等待 15 秒
4. ✅ 访问 http://localhost

### 如果你没有 Docker

1. ✅ 安装 Java、MySQL、Node.js、Maven
2. ✅ 按照"方式 2️⃣"的步骤启动
3. ✅ 访问 http://localhost:5173

### 如果仍有问题

1. ✅ 运行诊断工具
2. ✅ 查看日志：`docker-compose logs`
3. ✅ 查看 TROUBLESHOOTING.md
4. ✅ 检查端口是否被占用

---

## 🚀 立即开始

### 最快的方式（Docker）

```bash
# 1. 诊断
diagnose.bat  # 或 bash diagnose.sh

# 2. 启动
start.bat     # 或 bash start.sh

# 3. 访问
# http://localhost
```

### 最灵活的方式（本地开发）

```bash
# 1. 启动 MySQL
mysql -u root -p

# 2. 启动后端
mvn spring-boot:run

# 3. 启动前端
cd frontend && npm run dev

# 4. 访问
# http://localhost:5173
```

---

**最后更新**: 2024年11月

**问题仍未解决？** 查看 `TROUBLESHOOTING.md` 获取详细帮助。

