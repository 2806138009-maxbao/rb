# 📦 搜题系统 - 完整安装指南

本指南将帮助你安装所有必需的软件和依赖库。

---

## 🎯 安装方式选择

### 方式 1️⃣：Docker 方式（推荐，最简单）

**只需安装 1 个软件**：Docker Desktop

✅ **优点**：
- 一键安装所有依赖
- 环境隔离，不污染系统
- 跨平台一致性
- 无需手动配置

❌ **缺点**：
- 需要下载较大的镜像（约 2GB）
- 需要一定的磁盘空间

### 方式 2️⃣：本地开发方式

**需要安装 4 个软件**：Java、MySQL、Node.js、Maven

✅ **优点**：
- 启动速度快
- 便于调试
- 资源占用少

❌ **缺点**：
- 需要手动安装多个软件
- 需要手动配置环境
- 可能遇到版本兼容问题

---

## 🚀 方式 1️⃣：Docker 安装（推荐）

### 第一步：安装 Docker Desktop

#### Windows 用户

1. **下载 Docker Desktop**
   - 访问：https://www.docker.com/products/docker-desktop
   - 点击 "Download for Windows"
   - 下载大小：约 500MB

2. **系统要求**
   - Windows 10 64-bit: Pro, Enterprise, or Education (Build 19041 or higher)
   - 或 Windows 11 64-bit
   - 启用 WSL 2（Windows Subsystem for Linux）
   - 至少 4GB RAM

3. **安装步骤**
   ```
   1. 双击下载的 Docker Desktop Installer.exe
   2. 按照安装向导操作
   3. 勾选 "Use WSL 2 instead of Hyper-V"（推荐）
   4. 点击 "Ok" 开始安装
   5. 安装完成后重启计算机
   ```

4. **启动 Docker Desktop**
   ```
   1. 打开 Docker Desktop 应用
   2. 等待 Docker 启动（约 30-60 秒）
   3. 看到右下角 Docker 图标变绿，说明启动成功
   ```

5. **验证安装**
   ```bash
   # 打开命令提示符或 PowerShell
   docker --version
   docker-compose --version
   
   # 应该看到类似输出：
   # Docker version 24.0.x, build xxxxx
   # Docker Compose version v2.x.x
   ```

#### Mac 用户

1. **下载 Docker Desktop**
   - 访问：https://www.docker.com/products/docker-desktop
   - 选择适合你的芯片：
     - Apple Silicon (M1/M2): "Download for Mac - Apple Chip"
     - Intel: "Download for Mac - Intel Chip"

2. **安装步骤**
   ```
   1. 打开下载的 Docker.dmg 文件
   2. 将 Docker 图标拖到 Applications 文件夹
   3. 打开 Applications，双击 Docker
   4. 按照提示完成安装
   ```

3. **验证安装**
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux 用户

**Ubuntu/Debian**
```bash
# 更新包索引
sudo apt-get update

# 安装依赖
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 添加 Docker 官方 GPG 密钥
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 设置仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
```

**CentOS/RHEL**
```bash
# 安装依赖
sudo yum install -y yum-utils

# 添加 Docker 仓库
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装 Docker
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 启动 Docker
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
```

### 第二步：启动搜题系统

```bash
# 进入项目目录
cd c:\学生档案资料\编程

# 运行诊断工具（可选）
diagnose.bat  # Windows
bash diagnose.sh  # Mac/Linux

# 启动系统
start.bat  # Windows
bash start.sh  # Mac/Linux

# 等待 15 秒，然后访问
# http://localhost
```

### ✅ Docker 方式完成！

如果使用 Docker 方式，**不需要安装其他任何软件**！

---

## 🛠️ 方式 2️⃣：本地开发安装

### 第一步：安装 Java 8+

#### Windows 用户

1. **下载 JDK**
   - 访问：https://www.oracle.com/java/technologies/downloads/
   - 选择 "Java 8" 或 "Java 11" 或 "Java 17"
   - 下载 Windows x64 Installer

2. **安装 JDK**
   ```
   1. 双击下载的 .exe 文件
   2. 按照安装向导操作
   3. 记住安装路径（例如：C:\Program Files\Java\jdk-11）
   ```

3. **配置环境变量**
   ```
   1. 右键"此电脑" → "属性" → "高级系统设置"
   2. 点击"环境变量"
   3. 在"系统变量"中点击"新建"：
      变量名：JAVA_HOME
      变量值：C:\Program Files\Java\jdk-11（你的安装路径）
   4. 编辑"Path"变量，添加：
      %JAVA_HOME%\bin
   5. 点击"确定"保存
   ```

4. **验证安装**
   ```bash
   # 打开新的命令提示符
   java -version
   javac -version
   
   # 应该看到类似输出：
   # java version "11.0.x"
   ```

#### Mac 用户

```bash
# 使用 Homebrew 安装
brew install openjdk@11

# 配置环境变量
echo 'export PATH="/usr/local/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 验证安装
java -version
```

#### Linux 用户

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y openjdk-11-jdk

# CentOS/RHEL
sudo yum install -y java-11-openjdk-devel

# 验证安装
java -version
```

### 第二步：安装 MySQL 8.0+

#### Windows 用户

1. **下载 MySQL**
   - 访问：https://dev.mysql.com/downloads/mysql/
   - 选择 "MySQL Installer for Windows"
   - 下载大小：约 400MB

2. **安装 MySQL**
   ```
   1. 双击下载的 .msi 文件
   2. 选择 "Developer Default" 安装类型
   3. 点击 "Next" 继续
   4. 设置 root 密码（记住这个密码！）
   5. 完成安装
   ```

3. **启动 MySQL**
   ```bash
   # 打开命令提示符
   net start MySQL80
   
   # 或在服务管理器中启动 MySQL80 服务
   ```

4. **验证安装**
   ```bash
   mysql --version
   
   # 登录 MySQL
   mysql -u root -p
   # 输入密码
   ```

#### Mac 用户

```bash
# 使用 Homebrew 安装
brew install mysql

# 启动 MySQL
brew services start mysql

# 设置 root 密码
mysql_secure_installation

# 验证安装
mysql --version
```

#### Linux 用户

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y mysql-server

# 启动 MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# 设置 root 密码
sudo mysql_secure_installation

# CentOS/RHEL
sudo yum install -y mysql-server
sudo systemctl start mysqld
sudo systemctl enable mysqld

# 验证安装
mysql --version
```

### 第三步：安装 Node.js 18+

#### Windows 用户

1. **下载 Node.js**
   - 访问：https://nodejs.org/
   - 下载 "LTS" 版本（推荐）
   - 下载大小：约 30MB

2. **安装 Node.js**
   ```
   1. 双击下载的 .msi 文件
   2. 按照安装向导操作
   3. 勾选 "Automatically install the necessary tools"
   4. 完成安装
   ```

3. **验证安装**
   ```bash
   node --version
   npm --version
   
   # 应该看到类似输出：
   # v18.x.x
   # 9.x.x
   ```

#### Mac 用户

```bash
# 使用 Homebrew 安装
brew install node

# 验证安装
node --version
npm --version
```

#### Linux 用户

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 验证安装
node --version
npm --version
```

### 第四步：安装 Maven 3.6+

#### Windows 用户

1. **下载 Maven**
   - 访问：https://maven.apache.org/download.cgi
   - 下载 "Binary zip archive"
   - 下载大小：约 9MB

2. **安装 Maven**
   ```
   1. 解压下载的 .zip 文件到 C:\Program Files\Apache\maven
   2. 配置环境变量：
      变量名：MAVEN_HOME
      变量值：C:\Program Files\Apache\maven
   3. 编辑 Path 变量，添加：
      %MAVEN_HOME%\bin
   ```

3. **验证安装**
   ```bash
   mvn --version
   
   # 应该看到类似输出：
   # Apache Maven 3.x.x
   ```

#### Mac 用户

```bash
# 使用 Homebrew 安装
brew install maven

# 验证安装
mvn --version
```

#### Linux 用户

```bash
# Ubuntu/Debian
sudo apt-get install -y maven

# CentOS/RHEL
sudo yum install -y maven

# 验证安装
mvn --version
```

### 第五步：启动搜题系统

按照 `LOCAL_DEVELOPMENT.md` 中的步骤启动系统。

---

## 📋 依赖库清单

### 后端依赖（自动安装）

Maven 会自动下载以下依赖：

- **Spring Boot 2.7.14** - Web 框架
- **Spring Data JPA** - 数据库访问
- **MySQL Connector 8.0.33** - MySQL 驱动
- **Lombok** - 简化 Java 代码
- **FastJSON 2.0.32** - JSON 处理
- **Commons IO 2.11.0** - 文件处理
- **OpenCV 4.8.0** - 图像处理
- **Apache HttpClient 4.5.14** - HTTP 客户端

### 前端依赖（自动安装）

NPM 会自动下载以下依赖：

- **Vue 3.3.4** - 前端框架
- **Axios 1.5.0** - HTTP 客户端
- **Element Plus 2.4.0** - UI 组件库
- **Vue Router 4.2.4** - 路由管理
- **Vite 4.4.9** - 构建工具

### 外部服务（Docker 自动安装）

- **MySQL 8.0** - 数据库
- **Chroma** - 向量数据库（可选）
- **PaddleOCR** - OCR 识别（可选）

---

## ✅ 安装检查清单

### Docker 方式

- [ ] Docker Desktop 已安装
- [ ] Docker Desktop 已启动
- [ ] 运行 `docker --version` 成功
- [ ] 运行 `docker-compose --version` 成功
- [ ] 运行 `diagnose.bat` 或 `bash diagnose.sh` 通过

### 本地开发方式

- [ ] Java 8+ 已安装
- [ ] 运行 `java -version` 成功
- [ ] MySQL 8.0+ 已安装
- [ ] 运行 `mysql --version` 成功
- [ ] MySQL 服务已启动
- [ ] Node.js 18+ 已安装
- [ ] 运行 `node --version` 成功
- [ ] 运行 `npm --version` 成功
- [ ] Maven 3.6+ 已安装
- [ ] 运行 `mvn --version` 成功

---

## 🔧 常见安装问题

### 问题 1：Java 安装后找不到命令

**解决方案**：
```bash
# 检查环境变量是否配置正确
echo %JAVA_HOME%  # Windows
echo $JAVA_HOME   # Mac/Linux

# 重新打开命令行窗口
```

### 问题 2：MySQL 无法启动

**解决方案**：
```bash
# Windows
net start MySQL80

# Mac
brew services start mysql

# Linux
sudo systemctl start mysql
```

### 问题 3：Maven 下载依赖失败

**解决方案**：
```bash
# 配置国内镜像源
# 编辑 ~/.m2/settings.xml，添加：
<mirrors>
  <mirror>
    <id>aliyun</id>
    <mirrorOf>central</mirrorOf>
    <url>https://maven.aliyun.com/repository/public</url>
  </mirror>
</mirrors>
```

### 问题 4：NPM 安装依赖失败

**解决方案**：
```bash
# 配置国内镜像源
npm config set registry https://registry.npmmirror.com

# 清理缓存
npm cache clean --force

# 重新安装
npm install
```

---

## 📞 获取帮助

| 问题 | 查看文档 |
|------|---------|
| Docker 安装问题 | https://docs.docker.com/get-docker/ |
| Java 安装问题 | https://www.oracle.com/java/technologies/downloads/ |
| MySQL 安装问题 | https://dev.mysql.com/doc/ |
| Node.js 安装问题 | https://nodejs.org/en/download/ |
| Maven 安装问题 | https://maven.apache.org/install.html |

---

**最后更新**: 2024年11月

**安装完成后，查看 `START_HERE.md` 开始使用！**

