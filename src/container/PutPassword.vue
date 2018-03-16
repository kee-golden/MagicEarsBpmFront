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
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div class="login-form-wrap">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="passwordForm" label-position="left"
                 label-width="0px"
                 class="card-box login-form">
          <h3 class="title">Change Password</h3>
          <el-form-item prop="newPassword">
            <span class="svg-container"></span>
            <el-input name="password" type="password" @keyup.enter.native="login" v-model="loginForm.newPassword"
                      autoComplete="on" placeholder="New Password"></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <span class="svg-container"></span>
            <el-input name="checkPassword" type="password" @keyup.enter.native="login" v-model="loginForm.checkPassword"
                      autoComplete="on" placeholder="Check Password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="changePwd">
              Submit
            </el-button>
          </el-form-item>
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
    putPassword,
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
          newPassword: '',
          checkPassword: '',
          token: this.$route.params.token,
        },
        loginRules: {
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
        this.$refs.passwordForm.validate((valid) => {
          if (valid) {
            putPassword(this.loginForm).then((response) => {
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
                    message: 'Change password unsuccessful ,Token expired,Please Retrieve password again!  ',
                  });
              }
            }).then(() => {
              this.$store.dispatch('logout');
              this.$router.push({ path: '/' });
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
