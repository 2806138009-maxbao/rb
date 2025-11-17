<template>
  <div class="ocr-search-container">
    <el-card class="upload-card">
      <template #header>
        <div class="card-header">
          <span>图片搜题</span>
        </div>
      </template>
      
      <div class="upload-area">
        <el-upload
          drag
          action="#"
          :auto-upload="false"
          @change="handleFileSelect"
          accept="image/*"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖拽图片到此或<em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              支持 JPG、PNG、GIF 等图片格式
            </div>
          </template>
        </el-upload>
      </div>
      
      <div v-if="selectedFile" class="file-info">
        <p>已选择文件: {{ selectedFile.name }}</p>
        <el-button type="primary" @click="handleOcrRecognize" :loading="ocrLoading">
          开始识别
        </el-button>
      </div>
    </el-card>
    
    <div v-if="recognizedText" class="result-section">
      <el-card class="recognized-text-card">
        <template #header>
          <div class="card-header">
            <span>识别结果</span>
          </div>
        </template>
        
        <div class="recognized-text">
          <p>{{ recognizedText }}</p>
        </div>
        
        <div class="action-buttons">
          <el-button type="primary" @click="searchByRecognizedText">
            搜索相关题目
          </el-button>
          <el-button @click="copyText">复制文本</el-button>
        </div>
      </el-card>
    </div>
    
    <div v-if="searchResults.length > 0" class="search-results">
      <h3>相关题目</h3>
      
      <el-card v-for="question in searchResults" :key="question.id" class="result-card">
        <div class="question-header">
          <h4>{{ question.title }}</h4>
          <el-tag :type="getLevelType(question.level)">{{ question.level }}</el-tag>
        </div>
        
        <div class="question-content">
          <p><strong>题目：</strong>{{ question.content }}</p>
          <p v-if="question.answer"><strong>答案：</strong>{{ question.answer }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ocrAPI, searchAPI } from '../api/index'
import { UploadFilled } from '@element-plus/icons-vue'

export default {
  name: 'OcrSearch',
  components: {
    UploadFilled
  },
  data() {
    return {
      selectedFile: null,
      recognizedText: '',
      searchResults: [],
      ocrLoading: false
    }
  },
  methods: {
    handleFileSelect(file) {
      this.selectedFile = file.raw
    },
    
    async handleOcrRecognize() {
      if (!this.selectedFile) {
        this.$message.warning('请先选择图片')
        return
      }
      
      this.ocrLoading = true
      
      try {
        const response = await ocrAPI.recognize(this.selectedFile)
        
        if (response.data.code === 200) {
          this.recognizedText = response.data.data.text
          this.$message.success('识别成功')
        } else {
          this.$message.error(response.data.message)
        }
      } catch (error) {
        this.$message.error('识别失败: ' + error.message)
      } finally {
        this.ocrLoading = false
      }
    },
    
    async searchByRecognizedText() {
      if (!this.recognizedText) {
        this.$message.warning('没有识别文本')
        return
      }
      
      try {
        const response = await searchAPI.semanticSearch(this.recognizedText, 10)
        
        if (response.data.code === 200) {
          this.searchResults = response.data.data || []
          if (this.searchResults.length === 0) {
            this.$message.info('未找到相关题目')
          }
        } else {
          this.$message.error(response.data.message)
        }
      } catch (error) {
        this.$message.error('搜索失败: ' + error.message)
      }
    },
    
    copyText() {
      navigator.clipboard.writeText(this.recognizedText)
      this.$message.success('已复制到剪贴板')
    },
    
    getLevelType(level) {
      const typeMap = {
        '简单': 'success',
        '中等': 'warning',
        '困难': 'danger'
      }
      return typeMap[level] || 'info'
    }
  }
}
</script>

<style scoped>
.ocr-search-container {
  max-width: 1000px;
  margin: 0 auto;
}

.upload-card {
  margin-bottom: 30px;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.upload-area {
  margin-bottom: 20px;
}

.file-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.file-info p {
  margin: 0 0 10px 0;
  color: #606266;
}

.result-section {
  margin-bottom: 30px;
}

.recognized-text-card {
  margin-bottom: 20px;
}

.recognized-text {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  line-height: 1.6;
  max-height: 300px;
  overflow-y: auto;
}

.recognized-text p {
  margin: 0;
  color: #606266;
}

.action-buttons {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.search-results {
  margin-top: 30px;
}

.search-results h3 {
  margin-bottom: 20px;
  font-size: 18px;
}

.result-card {
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.question-header h4 {
  margin: 0;
  flex: 1;
  font-size: 16px;
}

.question-content {
  margin-bottom: 15px;
  line-height: 1.6;
}

.question-content p {
  margin: 8px 0;
  color: #606266;
}
</style>

