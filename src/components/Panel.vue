<template>
  <div class="panel" :style="{background:backgroundColor}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Box',
    componentName: 'Box',
    props: {
      backgroundColor: {
        type: String,
        default: '#ffffff',
      },
    },
  };
</script>

<style scoped>
  .panel {
    background: #FFFFFF;
    box-shadow: 0 1px 4px 0 rgba(190, 190, 190, 0.50);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 10px;
  }
</style>
