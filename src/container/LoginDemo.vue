<template>


  <div class="login-page" style="">
    <div id="particles">
      <!--<vue-particles color="#dedede"></vue-particles>-->
    </div>
    <p style="font-size: 12px;
    position: absolute;
    bottom: 35px;
    right: 160px;"> 博世汽车柴油系统有限公司 | 沪ICP备10002431号-21</p>

    <div id="logo">
      <img src="../assets/bosch_logo_english.png" width="120px">
    </div>

    <el-row>
      <el-col :span="6" :offset="9">
        <div class="login-form-wrap">
          <div class="login-form-title">
            <!--<img src="../assets/icon.png" alt="" style="width: 100%">-->
            <span>RBCD</span>
            Connectivity System
          </div>
          <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
                   label-position="left"
                   label-width="0px"
                   class="card-box login-form">
            <el-form-item prop="loginName">
              <span class="svg-container"></span>
              <el-input name="loginName" type="text" v-model="loginForm.loginName" autoComplete="on"
                        placeholder="Login Name"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container"></span>
              <el-input name="password" type="password" @keyup.enter.native="login" v-model="loginForm.password"
                        autoComplete="on" placeholder="Password"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 5px">
              <!--<el-button type="danger" style="width:100%;" :loading="loading" @click.native.prevent="login">-->
              <!--Login-->
              <!--</el-button>-->
              <div class="login-button" style="width:100%;" @click="login">
                Login
              </div>
            </el-form-item>
            <p style="font-size: 12px;margin-top: 100px;text-align: right;">

              <router-link to="/ForgetPassword" style="color:#0f4167">Forget Password</router-link>

            </p>
          </el-form>
        </div>
      </el-col>
    </el-row>


    <!--<div style="    position: absolute;    width: 100%;     bottom: 0px;">-->
    <!--<footer class="footerLogin">-->
    <!--<p class="left">©-->
    <!---->
    <!--</p>-->
    <!--</footer>-->
    <!--</div>-->


  </div>

</template>

<script>
  /* eslint-disable no-lonely-if */

  import Vue from 'vue';
  import '../utils/particles';

  //  import VueParticles from 'vue-particles';

  //  Vue.use(VueParticles);


  export default {
    data() {
      return {
        loginForm: {
          loginName: '',
          password: '',
        },
        loginRules: {
          loginName: [
            {
              required: true,
              trigger: 'blur',
            },
          ],
          password: [
            {
              required: true,
              trigger: 'blur',
            },
          ],
        },
        loading: false,
        showDialog: false,
      };
    },
    methods: {
      login() {
        this.$store.dispatch('login', this.loginForm).then(() => {
          this.loading = false;
          this.$router.push({ path: '/index' });
          // this.showDialog = true;
        }).catch((err) => {
//          this.$message.error(err);
          this.loading = false;
        });
      },
    },
    mounted() {
      // 浏览器兼容性测试
      const userAgent = window.navigator.userAgent.toLowerCase();
      console.log(userAgent);
      if (userAgent.indexOf('opera') > -1 || userAgent.indexOf('opr') > -1) {
        const particlesJson = import('@/styles/particles.json');
        particlesJson.then(res => window.particlesJS.load('particles', res));
      } else if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('msie') > -1) {
        console.log('IE');
      } else if (userAgent.indexOf('edge') > -1) {
        const particlesJson = import('@/styles/particles.json');
        particlesJson.then(res => window.particlesJS.load('particles', res));
      } else if (userAgent.indexOf('firefox') > -1) {
        const particlesJson = import('@/styles/particles.json');
        particlesJson.then(res => window.particlesJS.load('particles', res));
      } else if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1) {
        console.log('Safari');
      } else if (userAgent.indexOf('chrome') > -1 && userAgent.indexOf('safari') > -1) {
        const particlesJson = import('@/styles/particles.json');
        particlesJson.then(res => window.particlesJS.load('particles', res));
      } else if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        console.log('IE>=11');
      } else {
        console.log('Unkonwn');
      }
    },
  };
</script>

<style lang="scss" scoped>
  body {
    background: #ffffff;
  }

  .login {
    &-button {
      width: 100%;
      text-align: center;
      line-height: 36px;
      background-color: #0f4167;
      color: #ffffff;
      cursor: pointer;
    }
    &-page {
      background: url("../assets/login/loginPic.jpg");
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
    &-form {
      &-title {
        color: #0f4167;
        font-size: 20px;
        span {
          color: red;
          font-size: 40px;
          font-weight: 700;
          margin-right: 10px;
        }
      }
      &-wrap {
        margin-top: 300px;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 2px;
      }
    }
  }

  .footerLogin {
    border-top: 1px solid #dedede;
    background: #fff;
    overflow: hidden;
    color: #999999;
    font-size: 11px;
    width: 960px;
    margin: 0 auto;
  }

  #particles {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(39, 43, 46, 0.5);

  }

  #logo {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
</style>
