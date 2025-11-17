# 🖥️ 搜题系统 - 本地开发启动指南

如果你没有安装 Docker，可以按照本指南在本地启动系统。

---

## 📋 前置要求

### 必需软件

1. **Java 8+**
   - 下载: https://www.oracle.com/java/technologies/downloads/
   - 验证: `java -version`

2. **MySQL 8.0+**
   - 下载: https://dev.mysql.com/downloads/mysql/
   - 验证: `mysql --version`

3. **Node.js 18+**
   - 下载: https://nodejs.org/
   - 验证: `node --version` 和 `npm --version`

4. **Maven 3.6+**
   - 下载: https://maven.apache.org/download.cgi
   - 验证: `mvn --version`

### 可选软件

- **Python 3.7+** (用于 PaddleOCR)
- **Git** (用于版本控制)

---

## 🚀 启动步骤

### 第一步：启动 MySQL 数据库

#### Windows 用户

```bash
# 1. 打开 MySQL 命令行
mysql -u root -p

# 2. 输入密码（默认为空或你设置的密码）

# 3. 创建数据库
CREATE DATABASE search_question_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 4. 退出
exit
```

#### Mac/Linux 用户

```bash
# 1. 启动 MySQL 服务
sudo systemctl start mysql

# 或使用 Homebrew
brew services start mysql

# 2. 登录 MySQL
mysql -u root -p

# 3. 创建数据库
CREATE DATABASE search_question_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 4. 退出
exit
```

### 第二步：初始化数据库

```bash
# 进入项目目录
cd c:\学生档案资料\编程

# 导入初始化脚本
mysql -u root -p search_question_db < src/main/resources/db/init.sql

# 输入 MySQL 密码
```

### 第三步：修改后端配置

编辑 `src/main/resources/application.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/search_question_db?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=UTC
    username: root
    password: root  # 修改为你的 MySQL 密码
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
```

### 第四步：启动后端

```bash
# 进入项目目录
cd c:\学生档案资料\编程

# 编译项目
mvn clean package

# 运行后端
java -jar target/search-question-system-1.0.0.jar

# 或直接运行（不打包）
mvn spring-boot:run
```

**预期输出**：
```
Started SearchQuestionApplication in 5.123 seconds
```

**后端运行在**: http://localhost:8080

### 第五步：启动前端

打开新的命令行窗口：

```bash
# 进入前端目录
cd c:\学生档案资料\编程\frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

**预期输出**：
```
VITE v4.4.9  ready in 234 ms

➜  Local:   http://localhost:5173/
```

**前端运行在**: http://localhost:5173

### 第六步：访问应用

打开浏览器访问：

- 🌐 **前端**: http://localhost:5173
- 🔌 **后端 API**: http://localhost:8080/api

---

## 📝 配置说明

### 后端配置 (application.yml)

```yaml
spring:
  application:
    name: search-question-system
  
  datasource:
    url: jdbc:mysql://localhost:3306/search_question_db
    username: root
    password: root  # 修改为你的密码
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
  
  servlet:
    multipart:
      max-file-size: 50MB
      max-request-size: 50MB

server:
  port: 8080
  servlet:
    context-path: /api

app:
  upload:
    path: ./uploads
  ocr:
    enabled: true
```

### 前端配置 (vite.config.js)

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
```

---

## 🔧 常用命令

### 后端命令

```bash
# 编译项目
mvn clean package

# 运行项目
java -jar target/search-question-system-1.0.0.jar

# 直接运行（不打包）
mvn spring-boot:run

# 运行测试
mvn test

# 清理构建文件
mvn clean
```

### 前端命令

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

### 数据库命令

```bash
# 登录 MySQL
mysql -u root -p

# 查看数据库
SHOW DATABASES;

# 使用数据库
USE search_question_db;

# 查看表
SHOW TABLES;

# 查看表结构
DESCRIBE questions;

# 查看数据
SELECT * FROM questions;
```

---

## 🐛 常见问题

### 问题 1：MySQL 连接失败

**错误信息**：
```
java.sql.SQLException: Access denied for user 'root'@'localhost'
```

**解决方案**：
1. 检查 MySQL 是否运行
2. 检查用户名和密码是否正确
3. 修改 `application.yml` 中的密码

### 问题 2：端口被占用

**错误信息**：
```
Address already in use: bind
```

**解决方案**：

```bash
# Windows - 查找占用端口的进程
netstat -ano | findstr :8080

# 杀死进程
taskkill /PID <PID> /F

# Mac/Linux - 查找占用端口的进程
lsof -i :8080

# 杀死进程
kill -9 <PID>
```

### 问题 3：前端无法连接后端

**错误信息**：
```
CORS error: Access to XMLHttpRequest blocked by CORS policy
```

**解决方案**：
1. 确保后端已启动
2. 检查 `vite.config.js` 中的代理配置
3. 检查浏览器控制台的具体错误

### 问题 4：Maven 依赖下载失败

**错误信息**：
```
Failed to read artifact descriptor
```

**解决方案**：

```bash
# 清理本地仓库
mvn clean

# 重新下载依赖
mvn dependency:resolve

# 或修改 Maven 镜像源
# 编辑 ~/.m2/settings.xml
```

### 问题 5：Node 模块安装失败

**错误信息**：
```
npm ERR! code ERESOLVE
```

**解决方案**：

```bash
# 清理 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

---

## 📊 项目结构

```
c:\学生档案资料\编程\
├── src/                    后端源代码
│   └── main/
│       ├── java/           Java 源文件
│       └── resources/      配置文件
├── frontend/               前端源代码
│   └── src/
│       ├── views/          页面组件
│       ├── api/            API 调用
│       └── router/         路由配置
├── pom.xml                 Maven 配置
└── package.json            NPM 配置
```

---

## 🎯 开发工作流

### 1. 启动后端

```bash
cd c:\学生档案资料\编程
mvn spring-boot:run
```

### 2. 启动前端

```bash
cd c:\学生档案资料\编程\frontend
npm run dev
```

### 3. 修改代码

- 后端代码修改后会自动重新加载（需要配置 DevTools）
- 前端代码修改后会自动刷新

### 4. 测试

```bash
# 后端测试
mvn test

# 前端测试
npm run test
```

### 5. 构建

```bash
# 后端构建
mvn clean package

# 前端构建
npm run build
```

---

## 📚 推荐资源

- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [Vue 3 官方文档](https://vuejs.org/)
- [MySQL 官方文档](https://dev.mysql.com/doc/)
- [Maven 官方文档](https://maven.apache.org/guides/)
- [NPM 官方文档](https://docs.npmjs.com/)

---

## ✅ 检查清单

- [ ] Java 已安装
- [ ] MySQL 已安装并运行
- [ ] Node.js 已安装
- [ ] Maven 已安装
- [ ] 数据库已创建
- [ ] 初始化脚本已导入
- [ ] 后端配置已修改
- [ ] 后端已启动
- [ ] 前端已启动
- [ ] 可以访问 http://localhost:5173

---

**最后更新**: 2024年11月

如有问题，请查看 `TROUBLESHOOTING.md`

