#!/bin/bash

echo "=========================================="
echo "搜题系统 - 诊断工具"
echo "=========================================="
echo ""

# 检查 Docker 是否安装
echo "[1/5] 检查 Docker 是否安装..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装"
    echo "请访问 https://www.docker.com/products/docker-desktop 下载安装"
    exit 1
else
    echo "✅ Docker 已安装"
    docker --version
fi
echo ""

# 检查 Docker 是否运行
echo "[2/5] 检查 Docker 是否运行..."
if ! docker ps &> /dev/null; then
    echo "❌ Docker 未运行"
    echo "请启动 Docker 服务"
    exit 1
else
    echo "✅ Docker 已运行"
fi
echo ""

# 检查 Docker Compose 是否安装
echo "[3/5] 检查 Docker Compose 是否安装..."
if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  Docker Compose 可能未安装，尝试使用 docker compose..."
    if ! command -v docker compose &> /dev/null; then
        echo "❌ Docker Compose 未安装"
        echo "请运行: pip install docker-compose"
        exit 1
    else
        echo "✅ Docker Compose 已安装（新版本）"
        docker compose --version
    fi
else
    echo "✅ Docker Compose 已安装"
    docker-compose --version
fi
echo ""

# 检查端口是否被占用
echo "[4/5] 检查端口是否被占用..."

# 检查端口 80
if lsof -i :80 &> /dev/null; then
    echo "⚠️  端口 80 可能被占用"
    echo "占用端口 80 的进程:"
    lsof -i :80
else
    echo "✅ 端口 80 未被占用"
fi
echo ""

# 检查端口 8080
if lsof -i :8080 &> /dev/null; then
    echo "⚠️  端口 8080 可能被占用"
    echo "占用端口 8080 的进程:"
    lsof -i :8080
else
    echo "✅ 端口 8080 未被占用"
fi
echo ""

# 检查容器状态
echo "[5/5] 检查容器状态..."
if ! docker-compose ps &> /dev/null; then
    echo "⚠️  无法获取容器状态"
    echo "请确保在项目目录中运行此脚本"
else
    echo "✅ 容器状态:"
    docker-compose ps
fi
echo ""

echo "=========================================="
echo "诊断完成！"
echo "=========================================="
echo ""
echo "下一步:"
echo "1. 如果所有检查都通过，运行 bash start.sh 启动系统"
echo "2. 等待 15 秒"
echo "3. 打开浏览器访问 http://localhost"
echo ""
echo "如果仍有问题，请查看 TROUBLESHOOTING.md"
echo ""

