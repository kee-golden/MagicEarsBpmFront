<template>
  <div class="login-page" style="">
    <div id="particles">
      <!--<vue-particles color="#dedede"></vue-particles>-->
    </div>
    <div id="logo">
      <img src="../assets/logo.png" width="120px">
    </div>
    <p style="font-size: 12px;
    position: absolute;
    bottom: 35px;
    right: 160px;"> 魔力耳朵| 京ICP备17003643号-4<sup>[1]</sup></p>

    <el-row>
      <el-col :span="6" :offset="9">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue';

//  import VueParticles from 'vue-particles';

  import {
    changePassword,
  } from '../api/login';

//  Vue.use(VueParticles);

  export default {
    data() {
      const checkPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('New password can not be empty!'));
        }
        const emailReg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/;
        if (!emailReg.test(value)) {
          callback(new Error('The password must contain letters, numbers, special characters, at least 8 characters!'));
        }
        callback();
        return true;
      };
      const reCheckPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please repeat the new password'));
        } else if (value !== this.loginForm.newPassword) {
          callback(new Error('The password for the two time is inconsistent !'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          loginName: this.$route.params.userName,
          oldPassword: '',
          newPassword: '',
          checkPassword: '',
        },
        loginRules: {
          loginName: [
            {
              required: true,
              trigger: 'blur',
              message: 'Please input your account',
            },
          ],
          oldPassword: [
            {
              required: true,
              trigger: 'blur',
              message: 'Please input your origin password',
            },
          ],
          newPassword: [
            {
              required: true,
              trigger: 'blur',
            },
            {
              validator: checkPassword,
              trigger: 'blur,change',
            },
          ],
          checkPassword: [
            {
              required: true,
              trigger: 'blur',
            },
            {
              validator: reCheckPassword,
              trigger: 'blur,change',
            },
          ],
        },
        loading: false,
        showDialog: false,
      };
    },
    methods: {
      changePwd() {
        changePassword(this.loginForm).then((response) => {
          if (response.code === 1200) {
            this.$message(
              {
                type: 'success',
                message: 'Change password successful',
              });
          } else {
            this.$message(
              {
                type: 'error',
                message: 'Please input correct account and password ',
              });
          }
        }).then(() => {
          this.$store.dispatch('logout');
          this.$router.push({ path: '/' });
        });
      },
    },
  };
</script>

<style lang="scss"  scoped>
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
