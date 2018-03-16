<template>
  <div class="config-content">
    <div class="config-title">
      <slot class="config-title-name" name="name-first"></slot>
      <slot class="config-title-value" name="value-first"></slot>
    </div>
    <div class="config-title">
      <slot class="config-title-name" name="name-second"></slot>
      <slot class="config-title-value" name="value-second"></slot>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'ConfigCard',
    componentName: 'ConfigCard',
  };

</script>

<style scoped lang="scss">
  .config-content {
    margin: 0 0 0 15px;
    .config-title {
      display: block;
      padding: 15px 20px;
      margin: 0 0 14px 0;
      background: #f5f5f7;
    }
  }
</style>
