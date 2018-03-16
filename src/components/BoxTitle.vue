<template>
  <div class="box-title" >
    <div class="box-title-name">
      <slot name="name"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>

  export default{
    name: 'BoxTitle',
    componentName: 'BoxTitle',
  }
  ;

</script>

<style lang="scss" scoped>
  .box-title {
    position: relative;
    border-radius: 0;
    min-height: 36px;
    line-height: 36px;
    padding: 5px;
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    border: 1px solid #dfe6ec;
    border-bottom: none;
    &-name {
      display: inline-block;
      margin-left: 10px;
      margin-right: 20px;
    }
  }


</style>
