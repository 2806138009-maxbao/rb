@echo off
chcp 65001 >nul

echo ==========================================
echo 搜题系统 - 启动脚本
echo ==========================================

REM 检查Docker是否安装
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker未安装，请先安装Docker
    pause
    exit /b 1
)

REM 检查Docker Compose是否安装
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose未安装，请先安装Docker Compose
    pause
    exit /b 1
)

echo.
echo 📦 启动所有服务...
echo.

REM 启动所有服务
docker-compose up -d

REM 等待服务启动
echo.
echo ⏳ 等待服务启动...
timeout /t 10 /nobreak

REM 检查服务状态
echo.
echo ✅ 服务启动完成！
echo.
echo ==========================================
echo 访问地址：
echo ==========================================
echo 🌐 前端应用: http://localhost
echo 🔌 后端API: http://localhost:8080/api
echo 🗄️  数据库: localhost:3306
echo    用户名: root
echo    密码: root
echo 📊 Chroma向量数据库: http://localhost:8000
echo.
echo ==========================================
echo 常用命令：
echo ==========================================
echo 查看日志: docker-compose logs -f
echo 停止服务: docker-compose down
echo 重启服务: docker-compose restart
echo ==========================================

pause

