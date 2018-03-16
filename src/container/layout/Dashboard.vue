<template>
  <div>
    <div class="app-wrapper">
      <div class="sidebar-wrapper">
        <BoschMenu class="sidebar-container"/>
      </div>
      <div class="main-container">
        <router-view></router-view>
      </div>
      <footer class="bosch-footer"></footer>
    </div>
  </div>

</template>

<script>
  import Cookies from 'js-cookie';

  import BoschMenu from '../../components/BoschMenu';
  import AppMain from '../layout/AppMain';

  export default {
    components: {
      BoschMenu,
      AppMain,
    },
    data() {
      return {
        activeIndex: '1',
        user: {},
      };
    },
    computed: {},
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
    created() {
      this.user = this.$store.state.user.baseInfo;
    },
  };
</script>

<style lang="scss">
  @import "../../styles/mixin.scss";

  .bosch-footer {
    background: url(../../assets/bosch_supergraphic_top.jpg) no-repeat center top;
    background-size: 3000px auto;
    padding-top: 12px;
    position: fixed;
    bottom: 0px;
    width: 100%;
  }

  .el-menu--horizontal .el-menu-item {
    float: left;
    height: 40px;
    line-height: 40px;
    margin: 0;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    border-bottom: 5px solid transparent;
  }

  /*.sidebar-wrapper {*/
  /*width: 265px;*/
  /*position: fixed;*/
  /*top: 70px;*/
  /*bottom: 0;*/
  /*left: 0;*/
  /*border-right: 1px solid #d2d6de;*/
  /*z-index: 2;*/
  /*overflow-x: hidden;*/
  /*transition: all .28s ease-out;*/
  /*}*/

  /*.sidebar-container {*/
  /*transition: all .28s ease-out;*/
  /*height: 100%;*/

  /*}*/

  /*.main-container {*/
  /*margin-left: 265px;*/
  /*padding-top: 65px;*/
  /*transition: all .28s ease-out;*/
  /*!*background-color: #ecf0f5;*!*/
  /*border-left: 1px solid #d2d6de;*/
  /*min-height: 800px;*/
  /*}*/

  .toggle-btn {
    text-align: center;
    height: 44px;
    line-height: 44px;
    background-color: #ffffff;
    transition: all .28s ease-out;
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar {
      .sidebar-wrapper {
        transform: translate(-225px, 0);
        .sidebar-container {
          transform: translate(220px, 0);
        }
        /*&:hover {*/
        /*transform: translate(0, 0);*/
        /*.sidebar-container {*/
        /*transform: translate(0, 0);*/
        /*}*/
        /*.toggle-btn {*/
        /*transform: translate(0, 0);*/
        /*}*/
        /*}*/
      }
      .toggle-btn {
        transform: translate(114px, 0);
        /*background: url(../../static/img/sidebar-nav-seperator.8cab114.png) bottom center no-repeat;*/
      }

    }
    .sidebar-wrapper {
      width: 100%;
      height: 72px;
      position: fixed;
      top: 0;
      border-right: 1px solid #d2d6de;
      /*top: 71px;*/
      /*bottom: 0;*/
      left: 0;
      z-index: 1001;
      /*overflow-x: hidden;*/
      transition: all .28s ease-out;
      @include scrollBar;

    }
    .sidebar-container {
      transition: all .28s ease-out;
    }
    .main-container {
      min-height: calc(100% - 71px);
      margin-top: 72px;
      transition: all .28s ease-out;
      /*margin-left: 265px;*/
    }
  }

</style>
