<template>
  <div id="app" class="app-container">
    <el-container>
      <el-header class="app-header">
        <div class="header-content">
          <h1>🔍 搜题系统</h1>
          <p>AI驱动的智能搜题平台</p>
        </div>
      </el-header>
      
      <el-main class="app-main">
        <router-view></router-view>
      </el-main>
      
      <el-footer class="app-footer">
        <p>&copy; 2024 Search Question System. All rights reserved.</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-content h1 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}

.header-content p {
  margin: 5px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
}

.app-main {
  flex: 1;
  padding: 20px;
}

.app-footer {
  background-color: #f5f7fa;
  color: #606266;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #ebeef5;
}

.app-footer p {
  margin: 0;
}
</style>

