# 搜题系统 - 快速参考卡片

## 🚀 一键启动

```bash
# Windows
start.bat

# Linux/Mac
bash start.sh
```

## 📍 访问地址

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端应用 | http://localhost | Web界面 |
| 后端API | http://localhost:8080/api | REST API |
| 数据库 | localhost:3306 | MySQL |
| 向量DB | http://localhost:8000 | Chroma |

## 🔐 默认凭证

| 服务 | 用户名 | 密码 |
|------|--------|------|
| MySQL | root | root |
| 应用 | - | - |

## 📚 常用API

### 搜索
```bash
# 关键词搜索
POST /api/search/keyword
{
  "keyword": "高中数学",
  "pageNo": 0,
  "pageSize": 10
}

# 语义搜索
GET /api/search/semantic?query=求解方程&topK=10
```

### OCR
```bash
# 识别图片
POST /api/ocr/recognize
file: <image>

# 识别并搜索
POST /api/ocr/recognize-and-search
file: <image>
```

### 问题管理
```bash
# 获取详情
GET /api/questions/{id}

# 创建问题
POST /api/questions
{
  "title": "题目",
  "content": "内容",
  "subject": "数学"
}

# 更新问题
PUT /api/questions/{id}

# 删除问题
DELETE /api/questions/{id}
```

## 🐳 Docker命令

```bash
# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 查看日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend

# 重启服务
docker-compose restart

# 查看运行状态
docker-compose ps
```

## 📝 配置文件位置

| 配置 | 文件 |
|------|------|
| 后端配置 | `src/main/resources/application.yml` |
| 前端配置 | `frontend/vite.config.js` |
| Nginx配置 | `frontend/nginx.conf` |
| 数据库初始化 | `src/main/resources/db/init.sql` |

## 🔧 本地开发启动

### 后端
```bash
# 编译
mvn clean package

# 运行
java -jar target/search-question-system-1.0.0.jar
```

### 前端
```bash
cd frontend

# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
```

## 📊 数据库表

| 表名 | 说明 |
|------|------|
| questions | 题目表 |
| question_options | 选项表 |
| search_history | 搜索历史 |
| ocr_records | OCR记录 |
| vector_embeddings | 向量嵌入 |

## 🔍 常见问题排查

### 后端无法启动
```bash
# 检查MySQL是否运行
docker-compose ps

# 查看后端日志
docker-compose logs backend

# 检查端口占用
lsof -i :8080  # Mac/Linux
netstat -ano | findstr :8080  # Windows
```

### 前端无法连接后端
```bash
# 检查后端是否运行
curl http://localhost:8080/api/questions

# 检查代理配置
# 编辑 frontend/vite.config.js
```

### OCR不工作
```bash
# 检查PaddleOCR是否安装
python -c "from paddleocr import PaddleOCR"

# 查看后端日志
docker-compose logs backend | grep -i ocr
```

## 📦 项目文件

| 文件 | 说明 |
|------|------|
| README.md | 项目说明 |
| API_DOCUMENTATION.md | API文档 |
| SETUP_GUIDE.md | 搭建指南 |
| PROJECT_STRUCTURE.md | 项目结构 |
| QUICK_REFERENCE.md | 本文件 |

## 🎯 功能清单

- [x] 文本搜索
- [x] 图片识别 (OCR)
- [x] 语义搜索 (预留)
- [x] 问题管理
- [x] 响应式设计
- [x] Docker部署
- [ ] 用户认证
- [ ] 收藏功能
- [ ] 错题本
- [ ] 学习统计

## 💡 开发提示

### 添加新的搜索条件
1. 修改 `SearchRequestDTO.java` 添加字段
2. 修改 `QuestionRepository.java` 添加查询方法
3. 修改 `SearchServiceImpl.java` 实现逻辑
4. 修改前端 `Search.vue` 添加UI

### 添加新的API端点
1. 在 `*Controller.java` 中添加方法
2. 在 `*Service.java` 中实现业务逻辑
3. 在 `*Repository.java` 中添加数据访问
4. 在前端 `api/index.js` 中添加调用

### 修改数据库结构
1. 修改 `init.sql` 脚本
2. 修改对应的 `Entity.java` 类
3. 修改 `Repository.java` 查询方法
4. 修改 `DTO.java` 数据传输对象

## 🔗 相关链接

- [Spring Boot文档](https://spring.io/projects/spring-boot)
- [Vue 3文档](https://vuejs.org/)
- [Element Plus文档](https://element-plus.org/)
- [PaddleOCR文档](https://github.com/PaddlePaddle/PaddleOCR)
- [Chroma文档](https://docs.trychroma.com/)

## 📞 获取帮助

1. 查看相关文档
2. 检查日志输出
3. 查看GitHub Issues
4. 提交问题报告

---

**快速参考卡片** | 最后更新: 2024年11月

