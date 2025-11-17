# 搜题系统 API 文档

## 基础信息

- **基础URL**: `http://localhost:8080/api`
- **请求格式**: JSON
- **响应格式**: JSON
- **字符编码**: UTF-8

## 响应格式

所有API响应都遵循以下格式：

```json
{
  "code": 200,
  "message": "Success",
  "data": {},
  "timestamp": 1699000000000
}
```

### 状态码说明

- `200`: 请求成功
- `400`: 请求参数错误
- `404`: 资源不存在
- `500`: 服务器错误

---

## 搜索API

### 1. 关键词搜索

**请求**
```
POST /search/keyword
Content-Type: application/json

{
  "keyword": "高中数学",
  "subject": "数学",
  "level": "简单",
  "category": "代数",
  "pageNo": 0,
  "pageSize": 10
}
```

**参数说明**
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| keyword | String | 是 | 搜索关键词 |
| subject | String | 否 | 学科 |
| level | String | 否 | 难度等级 |
| category | String | 否 | 分类 |
| pageNo | Integer | 否 | 页码（从0开始） |
| pageSize | Integer | 否 | 每页数量 |

**响应示例**
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "content": [
      {
        "id": 1,
        "title": "高中数学题1",
        "content": "求解方程 x^2 - 5x + 6 = 0",
        "subject": "数学",
        "level": "简单",
        "answer": "x=2 或 x=3",
        "explanation": "使用因式分解：(x-2)(x-3)=0",
        "questionType": "单选题",
        "source": "高中数学教材"
      }
    ],
    "totalElements": 100,
    "totalPages": 10
  }
}
```

### 2. 语义搜索

**请求**
```
GET /search/semantic?query=求解方程&topK=10
```

**参数说明**
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| query | String | 是 | 搜索查询 |
| topK | Integer | 否 | 返回结果数量（默认10） |

**响应示例**
```json
{
  "code": 200,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "title": "高中数学题1",
      "content": "求解方程 x^2 - 5x + 6 = 0",
      "similarity": 0.95
    }
  ]
}
```

### 3. 按学科搜索

**请求**
```
GET /search/subject?subject=数学&pageNo=0&pageSize=10
```

### 4. 按难度搜索

**请求**
```
GET /search/level?level=简单&pageNo=0&pageSize=10
```

### 5. 高级搜索

**请求**
```
POST /search/advanced
Content-Type: application/json

{
  "keyword": "方程",
  "subject": "数学",
  "level": "简单",
  "category": "代数",
  "pageNo": 0,
  "pageSize": 10
}
```

---

## OCR API

### 1. 识别图片

**请求**
```
POST /ocr/recognize
Content-Type: multipart/form-data

file: <image-file>
```

**响应示例**
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "text": "识别的文字内容",
    "confidence": 0.95,
    "processingTime": 1234
  }
}
```

### 2. 识别并搜索

**请求**
```
POST /ocr/recognize-and-search
Content-Type: multipart/form-data

file: <image-file>
```

**响应示例**
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "recognizedText": "识别的文字",
    "searchResults": [
      {
        "id": 1,
        "title": "相关题目",
        "content": "题目内容"
      }
    ]
  }
}
```

---

## 问题管理API

### 1. 获取问题详情

**请求**
```
GET /questions/{id}
```

**响应示例**
```json
{
  "code": 200,
  "message": "Success",
  "data": {
    "id": 1,
    "title": "高中数学题1",
    "content": "求解方程 x^2 - 5x + 6 = 0",
    "subject": "数学",
    "level": "简单",
    "answer": "x=2 或 x=3",
    "explanation": "使用因式分解",
    "options": [
      {
        "id": 1,
        "optionKey": "A",
        "optionValue": "x=2 或 x=3",
        "isCorrect": 1
      }
    ]
  }
}
```

### 2. 获取所有问题

**请求**
```
GET /questions?pageNo=0&pageSize=10
```

### 3. 创建问题

**请求**
```
POST /questions
Content-Type: application/json

{
  "title": "新题目",
  "content": "题目内容",
  "subject": "数学",
  "level": "简单",
  "answer": "答案",
  "explanation": "解析",
  "questionType": "单选题",
  "options": [
    {
      "optionKey": "A",
      "optionValue": "选项A",
      "isCorrect": 1
    }
  ]
}
```

### 4. 更新问题

**请求**
```
PUT /questions/{id}
Content-Type: application/json

{
  "title": "更新的题目",
  "content": "更新的内容",
  ...
}
```

### 5. 删除问题

**请求**
```
DELETE /questions/{id}
```

---

## 错误处理

### 常见错误响应

**参数错误**
```json
{
  "code": 400,
  "message": "请输入搜索关键词",
  "timestamp": 1699000000000
}
```

**资源不存在**
```json
{
  "code": 404,
  "message": "Question not found",
  "timestamp": 1699000000000
}
```

**服务器错误**
```json
{
  "code": 500,
  "message": "搜索失败: 内部服务器错误",
  "timestamp": 1699000000000
}
```

---

## 使用示例

### JavaScript/Axios

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

// 搜索
const response = await api.post('/search/keyword', {
  keyword: '高中数学',
  pageNo: 0,
  pageSize: 10
})

console.log(response.data)
```

### Python/Requests

```python
import requests

url = 'http://localhost:8080/api/search/keyword'
data = {
    'keyword': '高中数学',
    'pageNo': 0,
    'pageSize': 10
}

response = requests.post(url, json=data)
print(response.json())
```

### cURL

```bash
curl -X POST http://localhost:8080/api/search/keyword \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "高中数学",
    "pageNo": 0,
    "pageSize": 10
  }'
```

---

## 限制说明

- 单次请求超时时间: 10秒
- 最大上传文件大小: 50MB
- 单页最大返回数量: 100条
- API调用频率: 无限制（生产环境建议添加限流）

---

**最后更新**: 2024年11月

