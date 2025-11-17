import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

// 搜索相关API
export const searchAPI = {
  // 关键词搜索
  searchByKeyword(keyword, subject, level, category, pageNo = 0, pageSize = 10) {
    return api.post('/search/keyword', {
      keyword,
      subject,
      level,
      category,
      pageNo,
      pageSize
    })
  },
  
  // 语义搜索
  semanticSearch(query, topK = 10) {
    return api.get('/search/semantic', {
      params: { query, topK }
    })
  },
  
  // 按学科搜索
  searchBySubject(subject, pageNo = 0, pageSize = 10) {
    return api.get('/search/subject', {
      params: { subject, pageNo, pageSize }
    })
  },
  
  // 按难度搜索
  searchByLevel(level, pageNo = 0, pageSize = 10) {
    return api.get('/search/level', {
      params: { level, pageNo, pageSize }
    })
  },
  
  // 高级搜索
  advancedSearch(keyword, subject, level, category, pageNo = 0, pageSize = 10) {
    return api.post('/search/advanced', {
      keyword,
      subject,
      level,
      category,
      pageNo,
      pageSize
    })
  }
}

// OCR相关API
export const ocrAPI = {
  // 识别图片
  recognize(file) {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/ocr/recognize', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  
  // 识别并搜索
  recognizeAndSearch(file) {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/ocr/recognize-and-search', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

// 问题相关API
export const questionAPI = {
  // 获取问题详情
  getQuestion(id) {
    return api.get(`/questions/${id}`)
  },
  
  // 获取所有问题
  getAllQuestions(pageNo = 0, pageSize = 10) {
    return api.get('/questions', {
      params: { pageNo, pageSize }
    })
  },
  
  // 创建问题
  createQuestion(data) {
    return api.post('/questions', data)
  },
  
  // 更新问题
  updateQuestion(id, data) {
    return api.put(`/questions/${id}`, data)
  },
  
  // 删除问题
  deleteQuestion(id) {
    return api.delete(`/questions/${id}`)
  }
}

export default api
