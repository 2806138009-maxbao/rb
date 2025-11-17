@echo off
chcp 65001 >nul

echo ==========================================
echo 搜题系统 - 依赖检查工具
echo ==========================================
echo.
echo 正在检查你的系统是否已安装所需的软件...
echo.

set MISSING=0

REM 检查 Docker
echo [1/5] 检查 Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker 未安装
    echo    下载地址: https://www.docker.com/products/docker-desktop
    set MISSING=1
) else (
    echo ✅ Docker 已安装
    docker --version
)
echo.

REM 检查 Java
echo [2/5] 检查 Java...
java -version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Java 未安装（本地开发需要）
    echo    下载地址: https://www.oracle.com/java/technologies/downloads/
) else (
    echo ✅ Java 已安装
    java -version 2>&1 | findstr "version"
)
echo.

REM 检查 MySQL
echo [3/5] 检查 MySQL...
mysql --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  MySQL 未安装（本地开发需要）
    echo    下载地址: https://dev.mysql.com/downloads/mysql/
) else (
    echo ✅ MySQL 已安装
    mysql --version
)
echo.

REM 检查 Node.js
echo [4/5] 检查 Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Node.js 未安装（本地开发需要）
    echo    下载地址: https://nodejs.org/
) else (
    echo ✅ Node.js 已安装
    node --version
    npm --version
)
echo.

REM 检查 Maven
echo [5/5] 检查 Maven...
mvn --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Maven 未安装（本地开发需要）
    echo    下载地址: https://maven.apache.org/download.cgi
) else (
    echo ✅ Maven 已安装
    mvn --version | findstr "Apache Maven"
)
echo.

echo ==========================================
echo 检查完成！
echo ==========================================
echo.

if %MISSING%==0 (
    echo ✅ 所有必需软件已安装！
    echo.
    echo 推荐使用 Docker 方式启动:
    echo   1. 运行 start.bat
    echo   2. 等待 15 秒
    echo   3. 访问 http://localhost
) else (
    echo ⚠️  缺少必需软件
    echo.
    echo 你有两个选择:
    echo.
    echo 方式 1️⃣: 安装 Docker（推荐，最简单）
    echo   - 只需安装 Docker Desktop
    echo   - 下载: https://www.docker.com/products/docker-desktop
    echo   - 安装后运行 start.bat
    echo.
    echo 方式 2️⃣: 本地开发（需要安装多个软件）
    echo   - 安装 Java 8+
    echo   - 安装 MySQL 8.0+
    echo   - 安装 Node.js 18+
    echo   - 安装 Maven 3.6+
    echo   - 查看 INSTALLATION_GUIDE.md 获取详细步骤
)
echo.

echo 查看完整安装指南: INSTALLATION_GUIDE.md
echo.

pause

