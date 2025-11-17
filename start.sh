#!/bin/bash

# 搜题系统启动脚本

echo "=========================================="
echo "搜题系统 - 启动脚本"
echo "=========================================="

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，请先安装Docker"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

echo ""
echo "📦 启动所有服务..."
echo ""

# 启动所有服务
docker-compose up -d

# 等待服务启动
echo ""
echo "⏳ 等待服务启动..."
sleep 10

# 检查服务状态
echo ""
echo "✅ 服务启动完成！"
echo ""
echo "=========================================="
echo "访问地址："
echo "=========================================="
echo "🌐 前端应用: http://localhost"
echo "🔌 后端API: http://localhost:8080/api"
echo "🗄️  数据库: localhost:3306"
echo "   用户名: root"
echo "   密码: root"
echo "📊 Chroma向量数据库: http://localhost:8000"
echo ""
echo "=========================================="
echo "常用命令："
echo "=========================================="
echo "查看日志: docker-compose logs -f"
echo "停止服务: docker-compose down"
echo "重启服务: docker-compose restart"
echo "=========================================="

