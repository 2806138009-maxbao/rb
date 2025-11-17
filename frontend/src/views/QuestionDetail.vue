<template>
  <div class="question-detail-container">
    <el-button @click="goBack" type="text">← 返回</el-button>
    
    <el-card v-if="question" class="detail-card">
      <template #header>
        <div class="card-header">
          <h2>{{ question.title }}</h2>
          <el-tag :type="getLevelType(question.level)">{{ question.level }}</el-tag>
        </div>
      </template>
      
      <div class="detail-content">
        <div class="info-section">
          <p><strong>学科：</strong>{{ question.subject }}</p>
          <p><strong>分类：</strong>{{ question.category }}</p>
          <p><strong>题型：</strong>{{ question.questionType }}</p>
          <p><strong>来源：</strong>{{ question.source }}</p>
        </div>
        
        <div class="question-section">
          <h3>题目</h3>
          <div class="content-box">
            {{ question.content }}
          </div>
        </div>
        
        <div v-if="question.options && question.options.length > 0" class="options-section">
          <h3>选项</h3>
          <div v-for="option in question.options" :key="option.id" class="option-item">
            <span class="option-key">{{ option.optionKey }}.</span>
            <span class="option-value">{{ option.optionValue }}</span>
            <el-tag v-if="option.isCorrect" type="success" size="small">正确答案</el-tag>
          </div>
        </div>
        
        <div v-if="question.answer" class="answer-section">
          <h3>答案</h3>
          <div class="content-box">
            {{ question.answer }}
          </div>
        </div>
        
        <div v-if="question.explanation" class="explanation-section">
          <h3>解析</h3>
          <div class="content-box">
            {{ question.explanation }}
          </div>
        </div>
        
        <div class="meta-section">
          <p><small>创建时间：{{ formatDate(question.createdAt) }}</small></p>
          <p><small>更新时间：{{ formatDate(question.updatedAt) }}</small></p>
        </div>
      </div>
    </el-card>
    
    <el-empty v-else description="加载中..." />
  </div>
</template>

<script>
import { questionAPI } from '../api/index'

export default {
  name: 'QuestionDetail',
  data() {
    return {
      question: null
    }
  },
  mounted() {
    this.loadQuestion()
  },
  methods: {
    async loadQuestion() {
      const id = this.$route.params.id
      
      try {
        const response = await questionAPI.getQuestion(id)
        
        if (response.data.code === 200) {
          this.question = response.data.data
        } else {
          this.$message.error(response.data.message)
        }
      } catch (error) {
        this.$message.error('加载题目失败: ' + error.message)
      }
    },
    
    goBack() {
      this.$router.back()
    },
    
    getLevelType(level) {
      const typeMap = {
        '简单': 'success',
        '中等': 'warning',
        '困难': 'danger'
      }
      return typeMap[level] || 'info'
    },
    
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleString('zh-CN')
    }
  }
}
</script>

<style scoped>
.question-detail-container {
  max-width: 1000px;
  margin: 0 auto;
}

.detail-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  flex: 1;
  font-size: 20px;
}

.detail-content {
  line-height: 1.8;
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.info-section p {
  margin: 0;
  color: #606266;
}

.question-section,
.options-section,
.answer-section,
.explanation-section {
  margin-bottom: 30px;
}

.question-section h3,
.options-section h3,
.answer-section h3,
.explanation-section h3 {
  font-size: 16px;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
}

.content-box {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  border-left: 4px solid #667eea;
  color: #606266;
  white-space: pre-wrap;
  word-break: break-word;
}

.option-item {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.option-key {
  font-weight: bold;
  color: #667eea;
  min-width: 30px;
}

.option-value {
  flex: 1;
  color: #606266;
}

.meta-section {
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #ebeef5;
  color: #909399;
}

.meta-section p {
  margin: 5px 0;
}
</style>

