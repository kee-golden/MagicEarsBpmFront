<template>
  <div class="login-page" style="">
    <div id="particles">
      <!--<vue-particles color="#dedede"></vue-particles>-->
    </div>
    <p style="font-size: 12px;
    position: absolute;
    bottom: 35px;
    right: 160px;">  魔力耳朵| 京ICP备17003643号-4<sup>[1]</sup></p>

    <div id="logo">
      <img src="../assets/logo.png" width="120px">
    </div>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div class="login-form-wrap">
          <el-form autoComplete="on" :model="forgetPasswordForm" :rules="loginRules" ref="forgetPasswordForm"
                   label-position="left"
                   label-width="0px"
                   class="card-box login-form">
            <h3 class="title">Can't access your account?</h3>
            <el-form-item prop="loginName">
              <span class="svg-container"></span>
              <el-input name="email" type="text" v-model="forgetPasswordForm.loginName"
                        placeholder="Please enter your Username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" style="width:100%;" @click.native.prevent="resetPassword"
                         :disabled="forgetPasswordForm.disabled">
                Submit
              </el-button>
            </el-form-item>
            <div  style="font-size: 12px;margin-top: 100px;text-align: right;">
              <router-link to="/">Cancel</router-link>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import Vue from 'vue';
//  import VueParticles from 'vue-particles';
  import {
    resetPassword,
  } from '../api/login';

//  Vue.use(VueParticles);
  export default {
    data() {
      return {
        forgetPasswordForm: {
          loginName: '',
          disabled: false,
          loading: false,
        },
        loginRules: {
          loginName: [
            {
              required: true,
            },
          ],
        },
        showDialog: false,
      };
    },
    methods: {
      resetPassword() {
        this.forgetPasswordForm.disabled = true;
        this.forgetPasswordForm.loading = true;
        resetPassword(this.forgetPasswordForm).then((response) => {
          if (response.code === 1200) {
            this.forgetPasswordForm.disabled = false;
            this.forgetPasswordForm.loading = false;
            this.$message(
              {
                type: 'success',
                message: 'A reset password link has been sent to you via email.\n' +
                'You can follow that link and select a new password.\n' +
                'If the email does not arrive, please contact your  administrators.',
              });
          } else {
            this.forgetPasswordForm.disabled = false;
            this.forgetPasswordForm.loading = false;
            this.$message(
              {
                type: 'error',
                message: 'Please input correct account',
              });
          }
        });
      },
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
