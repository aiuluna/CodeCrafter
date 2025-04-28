<template>
  <div class="test-container">
    <ar-button type="primary" @click="handleClick">测试按钮</ar-button>
    <ar-input v-model="inputValue" placeholder="请输入内容" />
    <div class="value-display">输入的内容：{{ inputValue }}</div>
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  name: "TestComponent",
  setup() {
    const inputValue = ref("")

    const handleClick = () => {
      console.log("按钮被点击了")
      console.log("当前输入值：", inputValue.value)
    }

    return {
      inputValue,
      handleClick,
    }
  },
}
</script>

<style scoped>
.test-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.value-display {
  margin-top: 10px;
  color: #666;
}
</style>
