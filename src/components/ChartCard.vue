<template>

  <div class="chart-container">
    <transition name="fade">
      <div :class="{show:true,active:showAll}" style="background: #ffffff">
        <slot name="chart">
        </slot>
      </div>
    </transition>
    <el-button class="btn-more" type="text" @click="showAll = !showAll">{{word}}</el-button>
  </div>
</template>

<script>
  /* eslint-disable no-else-return */


  export default{
    name: 'ChartCard',
    componentName: 'ChartCard',
    data() {
      return {
        showAll: true,
      };
    },
    computed: {
      word() {
        if (this.showAll === false) {
          return 'Expand All';
        } else {
          return 'Pack Up';
        }
      },
    },
  };

</script>

<style lang="scss" scoped>
  .chart-container {
    width: 100%;
    background-color: #dcdcdc;
    position: relative;
  }

  .show {
    max-height: 340px;
    overflow: hidden;
    -webkit-transition: max-height 1s;
    transition: max-height 1s;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .show.active {
    height: auto;
    max-height: 8000px;
  }

  .btn-more {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }


</style>
