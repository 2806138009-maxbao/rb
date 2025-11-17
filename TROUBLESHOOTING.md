# 🔧 搜题系统 - 故障排除指南

## ❌ 问题：localhost 拒绝连接

### 🔍 原因分析

这个问题通常由以下原因引起：

1. **Docker 未安装** ❌
2. **Docker 未启动** ❌
3. **Docker Compose 未安装** ❌
4. **端口被占用** ❌
5. **服务未正确启动** ❌

---

## ✅ 解决方案

### 第一步：检查 Docker 是否安装

#### Windows 用户

```bash
# 打开命令提示符或 PowerShell，运行：
docker --version

# 如果显示版本号，说明已安装
# 如果显示 "command not found"，需要安装 Docker
```

#### Mac/Linux 用户

```bash
docker --version
```

### 第二步：安装 Docker（如果未安装）

#### Windows 用户

1. 访问 [Docker 官方网站](https://www.docker.com/products/docker-desktop)
2. 下载 **Docker Desktop for Windows**
3. 运行安装程序
4. 重启计算机
5. 打开 Docker Desktop 应用

#### Mac 用户

```bash
# 使用 Homebrew 安装
brew install docker docker-compose

# 或访问 https://www.docker.com/products/docker-desktop
```

#### Linux 用户

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# CentOS/RHEL
sudo yum install docker docker-compose

# 启动 Docker
sudo systemctl start docker
```

### 第三步：启动 Docker

#### Windows 用户

1. 打开 **Docker Desktop** 应用
2. 等待 Docker 启动（通常需要 30-60 秒）
3. 检查右下角是否显示 Docker 图标

#### Mac/Linux 用户

```bash
# 检查 Docker 是否运行
docker ps

# 如果显示容器列表，说明 Docker 已启动
# 如果显示错误，需要启动 Docker
```

### 第四步：启动搜题系统

#### 方式 1：使用启动脚本（推荐）

**Windows**
```bash
# 在项目目录中双击运行
start.bat

# 或在命令行运行
cd c:\学生档案资料\编程
start.bat
```

**Mac/Linux**
```bash
cd c:\学生档案资料\编程
bash start.sh
```

#### 方式 2：使用 Docker Compose 命令

```bash
cd c:\学生档案资料\编程

# 启动所有服务
docker-compose up -d

# 等待 10-15 秒
```

### 第五步：验证服务是否运行

```bash
# 查看运行状态
docker-compose ps

# 应该看到类似的输出：
# NAME                COMMAND             STATUS
# search-question-mysql      "docker-entrypoint..."   Up
# search-question-backend    "java -jar app.jar"      Up
# search-question-frontend   "nginx -g daemon off"    Up
# search-question-chroma     "python -m chroma..."    Up
```

### 第六步：访问应用

如果所有服务都在运行，访问：

- 🌐 **前端**: http://localhost
- 🔌 **后端 API**: http://localhost:8080/api

---

## 🐛 常见问题和解决方案

### 问题 1：Docker Desktop 无法启动

**症状**：Docker Desktop 应用打不开或一直加载

**解决方案**：
```bash
# Windows - 重启 Docker
# 1. 打开任务管理器
# 2. 找到 Docker Desktop
# 3. 结束任务
# 4. 重新打开 Docker Desktop

# Mac/Linux - 重启 Docker 服务
sudo systemctl restart docker
```

### 问题 2：端口被占用

**症状**：启动时显示 "port 80 is already in use"

**解决方案**：

```bash
# Windows - 查找占用端口 80 的进程
netstat -ano | findstr :80

# 杀死占用端口的进程
taskkill /PID <PID> /F

# Mac/Linux - 查找占用端口的进程
lsof -i :80

# 杀死进程
kill -9 <PID>
```

### 问题 3：Docker Compose 命令找不到

**症状**：运行 `docker-compose` 显示 "command not found"

**解决方案**：

```bash
# Windows - 使用 docker compose（新版本）
docker compose ps

# Mac/Linux - 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 问题 4：容器启动失败

**症状**：`docker-compose ps` 显示容器状态为 "Exited"

**解决方案**：

```bash
# 查看错误日志
docker-compose logs

# 查看特定服务的日志
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql

# 重启服务
docker-compose restart

# 完全重建
docker-compose down
docker-compose up -d
```

### 问题 5：MySQL 连接失败

**症状**：后端日志显示 "Connection refused"

**解决方案**：

```bash
# 检查 MySQL 容器是否运行
docker-compose ps mysql

# 查看 MySQL 日志
docker-compose logs mysql

# 重启 MySQL
docker-compose restart mysql

# 等待 30 秒后重试
```

### 问题 6：前端无法连接后端

**症状**：浏览器控制台显示 CORS 错误或连接超时

**解决方案**：

```bash
# 1. 检查后端是否运行
curl http://localhost:8080/api/questions

# 2. 查看后端日志
docker-compose logs backend

# 3. 检查 Nginx 配置
docker-compose logs frontend

# 4. 重启前端
docker-compose restart frontend
```

---

## 📋 完整诊断步骤

按照以下步骤逐一检查：

### 步骤 1：检查 Docker 安装

```bash
docker --version
docker-compose --version
```

**预期输出**：
```
Docker version 20.10.x, build xxxxx
Docker Compose version 2.x.x, build xxxxx
```

### 步骤 2：检查 Docker 运行状态

```bash
docker ps
```

**预期输出**：
```
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

### 步骤 3：启动系统

```bash
cd c:\学生档案资料\编程
docker-compose up -d
```

### 步骤 4：等待服务启动

```bash
# 等待 15 秒
sleep 15

# 或 Windows
timeout /t 15
```

### 步骤 5：检查服务状态

```bash
docker-compose ps
```

**预期输出**：所有容器状态应为 "Up"

### 步骤 6：测试连接

```bash
# 测试后端
curl http://localhost:8080/api/questions

# 测试前端
curl http://localhost
```

### 步骤 7：访问应用

打开浏览器访问 http://localhost

---

## 🔍 查看日志

### 查看所有日志

```bash
docker-compose logs -f
```

### 查看特定服务日志

```bash
# 后端日志
docker-compose logs -f backend

# 前端日志
docker-compose logs -f frontend

# 数据库日志
docker-compose logs -f mysql

# 向量数据库日志
docker-compose logs -f chroma
```

### 查看最后 100 行日志

```bash
docker-compose logs --tail=100
```

---

## 🆘 如果以上都不行

### 完全重置系统

```bash
# 停止所有服务
docker-compose down

# 删除所有容器和卷
docker-compose down -v

# 删除所有镜像
docker rmi $(docker images -q)

# 重新启动
docker-compose up -d
```

### 检查系统资源

```bash
# 查看 Docker 磁盘使用
docker system df

# 清理未使用的资源
docker system prune -a
```

---

## 📞 获取更多帮助

### 查看日志文件

```bash
# 导出日志到文件
docker-compose logs > logs.txt

# 查看日志文件
cat logs.txt
```

### 检查网络连接

```bash
# 测试 DNS
nslookup localhost

# 测试端口连接
telnet localhost 80
telnet localhost 8080
```

### 查看 Docker 网络

```bash
# 列出网络
docker network ls

# 检查网络详情
docker network inspect search-question-network
```

---

## ✅ 快速检查清单

- [ ] Docker 已安装
- [ ] Docker Desktop 已启动
- [ ] Docker Compose 已安装
- [ ] 项目目录正确：`c:\学生档案资料\编程`
- [ ] 运行了启动脚本或 `docker-compose up -d`
- [ ] 等待了 15 秒以上
- [ ] 所有容器状态为 "Up"
- [ ] 可以访问 http://localhost
- [ ] 可以访问 http://localhost:8080/api

---

## 🎯 预期结果

### 成功启动的标志

1. ✅ `docker-compose ps` 显示所有容器状态为 "Up"
2. ✅ 可以访问 http://localhost（显示搜题系统首页）
3. ✅ 可以访问 http://localhost:8080/api/questions（返回 JSON 数据）
4. ✅ 浏览器控制台没有错误

### 常见错误信息

| 错误信息 | 原因 | 解决方案 |
|---------|------|---------|
| "Connection refused" | 服务未启动 | 运行 `docker-compose up -d` |
| "port 80 is already in use" | 端口被占用 | 关闭占用端口的应用 |
| "Cannot connect to Docker daemon" | Docker 未启动 | 启动 Docker Desktop |
| "command not found: docker" | Docker 未安装 | 安装 Docker |

---

**最后更新**: 2024年11月  
**如果问题仍未解决，请查看日志并提供错误信息。**

