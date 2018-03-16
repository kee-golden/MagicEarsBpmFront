<template>
  <div class="login-page" style="">
    <div id="particles">
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


  </div>

</template>

<script>

  import Vue from 'vue';


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
        }).catch((err) => {
          this.loading = false;
        });
      },
    },
    mounted() {
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
