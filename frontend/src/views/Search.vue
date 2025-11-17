<template>
  <div class="search-container">
    <el-card class="search-card">
      <template #header>
        <div class="card-header">
          <span>搜索题目</span>
        </div>
      </template>
      
      <el-form :model="searchForm" label-width="100px">
        <el-form-item label="关键词">
          <el-input 
            v-model="searchForm.keyword" 
            placeholder="输入题目关键词"
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        
        <el-form-item label="学科">
          <el-select v-model="searchForm.subject" placeholder="选择学科" clearable>
            <el-option label="数学" value="数学" />
            <el-option label="英语" value="英语" />
            <el-option label="物理" value="物理" />
            <el-option label="化学" value="化学" />
            <el-option label="生物" value="生物" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="难度">
          <el-select v-model="searchForm.level" placeholder="选择难度" clearable>
            <el-option label="简单" value="简单" />
            <el-option label="中等" value="中等" />
            <el-option label="困难" value="困难" />
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSearch" :loading="loading">
            搜索
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <div class="results-container" v-if="results.length > 0">
      <h3>搜索结果 (共 {{ total }} 条)</h3>
      
      <el-card v-for="question in results" :key="question.id" class="result-card">
        <div class="question-header">
          <h4>{{ question.title }}</h4>
          <el-tag :type="getLevelType(question.level)">{{ question.level }}</el-tag>
        </div>
        
        <div class="question-content">
          <p><strong>题目：</strong>{{ question.content }}</p>
          <p v-if="question.answer"><strong>答案：</strong>{{ question.answer }}</p>
          <p v-if="question.explanation"><strong>解析：</strong>{{ question.explanation }}</p>
        </div>
        
        <div class="question-footer">
          <span class="subject-tag">{{ question.subject }}</span>
          <el-button type="text" @click="viewDetail(question.id)">查看详情</el-button>
        </div>
      </el-card>
      
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @change="handlePageChange"
      />
    </div>
    
    <el-empty v-else-if="searched" description="未找到相关题目" />
  </div>
</template>

<script>
import { searchAPI } from '../api/index'

export default {
  name: 'Search',
  data() {
    return {
      searchForm: {
        keyword: '',
        subject: '',
        level: '',
        category: ''
      },
      results: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      searched: false
    }
  },
  methods: {
    async handleSearch() {
      if (!this.searchForm.keyword) {
        this.$message.warning('请输入搜索关键词')
        return
      }
      
      this.loading = true
      this.searched = true
      
      try {
        const response = await searchAPI.searchByKeyword(
          this.searchForm.keyword,
          this.searchForm.subject,
          this.searchForm.level,
          this.searchForm.category,
          this.currentPage - 1,
          this.pageSize
        )
        
        if (response.data.code === 200) {
          this.results = response.data.data.content || []
          this.total = response.data.data.totalElements || 0
        } else {
          this.$message.error(response.data.message)
        }
      } catch (error) {
        this.$message.error('搜索失败: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    
    handlePageChange() {
      this.handleSearch()
    },
    
    resetForm() {
      this.searchForm = {
        keyword: '',
        subject: '',
        level: '',
        category: ''
      }
      this.results = []
      this.searched = false
    },
    
    getLevelType(level) {
      const typeMap = {
        '简单': 'success',
        '中等': 'warning',
        '困难': 'danger'
      }
      return typeMap[level] || 'info'
    },
    
    viewDetail(id) {
      this.$router.push(`/question/${id}`)
    }
  }
}
</script>

<style scoped>
.search-container {
  max-width: 1000px;
  margin: 0 auto;
}

.search-card {
  margin-bottom: 30px;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.results-container {
  margin-top: 30px;
}

.results-container h3 {
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

.question-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #ebeef5;
}

.subject-tag {
  color: #909399;
  font-size: 12px;
}
</style>

