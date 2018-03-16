<template>
  <div>
    <el-container>
      <el-header><Header /></el-header>
      <el-container>
        <el-aside width="200px"><Menu /></el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <footer class="footer"></footer>
  </div>

</template>

<script>
  import Cookies from 'js-cookie';

  import Menu from '../../components/Menu';
  import Header from '../../components/Header';
  import AppMain from '../layout/AppMain';

  export default {
    components: {
      Header,
      Menu,
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
  .el-container {
    height: 960px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .footer {
    background: url(../../assets/supergraphic_top.jpg) no-repeat center top;
    background-size: 3000px auto;
    padding-top: 12px;
    position: fixed;
    bottom: 0px;
    width: 100%;
  }

</style>
