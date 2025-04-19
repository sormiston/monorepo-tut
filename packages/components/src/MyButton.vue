<template>
  <button class="my-button" :class="buttonStyle">
    <slot />
  </button>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  type ButtonProps = {
    type?: 'primary';
  };
  const buttonProps = defineProps<ButtonProps>();
  const buttonStyle = computed(() => {
    return { [`my-button--${buttonProps.type}`]: buttonProps.type };
  });
</script>

<style lang="scss" scoped>
  .my-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  .my-button.my-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;

    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
  }
</style>
