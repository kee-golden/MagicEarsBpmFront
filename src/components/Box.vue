<template>
  <div class="box" v-bind:class="type">
    <slot></slot>
  </div>
</template>

<script>

  export default{
    name: 'Box',
    componentName: 'Box',
    props: {
      type: {
        type: String,
        default: 'info',
      },
    },
  };

</script>

<style scoped>
  .box {
    margin: 0 24px;
    position: relative;
    border-radius: 0;
    background: rgba(255, 255, 255, 0.65);
    border-top: 3px solid #d2d6de;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  .primary {
    background-color: #005593 !important;
    border-top: 3px solid #005593;

  }

  .success {
    border-top: 3px solid #008dd2;
    background-color: #008dd2 !important;
  }

  .warning {
    background-color: #feb000 !important;
    border-top: 3px solid #feb000;

  }

  .info {
    background-color: #00a8b1 !important;
    border-top: 3px solid #00a8b1;

  }

  .danger {
    background-color: #e11a1f !important;
    border-top: 3px solid #e11a1f;

  }
</style>
