<template>
  <el-tag :type="btnTag" class="http-method-tag">{{methodTag}}</el-tag>
</template>

<script>

  export default{
    name: 'HttpMethodTag',
    componentName: 'HttpMethodTag',
    props: {
      type: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        btnType: ['', 'primary', 'info', 'success', 'warning', 'danger'],
        httpMethod: ['', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      };
    },
    computed: {
      btnTag() {
        return this.btnType[this.type];
      },
      methodTag() {
        return this.httpMethod[this.type];
      },
    },
  };

</script>

<style>
  .http-method-tag {
    min-width: 80px;
    text-align: center;
  }
</style>
