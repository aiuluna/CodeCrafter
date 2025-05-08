<template>
  <div class="error-container">
    <div class="error-card">
      <div class="error-icon">❌</div>
      <h3 class="error-title">渲染错误</h3>
      <div class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  errorMessage: {
    type: String,
    default: "发生未知错误",
  },
})
</script>

<style>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: #f8f8f8;
}

.error-card {
  max-width: 600px;
  width: 100%;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.error-title {
  font-size: 22px;
  color: #e74c3c;
  margin-bottom: 15px;
}

.error-message {
  color: #555;
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
  text-align: left;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-top: 15px;
  overflow-x: auto;
}
</style>
