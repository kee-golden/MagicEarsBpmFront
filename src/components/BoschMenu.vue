<template>
  <div>
    <ul class="menu">
      <li class="menu-item" style="margin-left: 250px;">
        <span style=" display: inline-block;position: absolute; top: 13px;left: 30px;">
          <img src="../assets/RBCD-logo.png" style="height: 36px;cursor: pointer" alt="">
        </span>
      </li>
      <li class="menu-item">
        <div @click="handleItemClick('/index')" class="menu-item-title">
         首页
        </div>
      </li>

      <li v-for="menu in menus" :key="menu.id" class="menu-item" @mouseenter="onMouseEnter(menu.id)" @mouseleave="onMouseLeave" :class="{display:menuItemIndex===menu.id}">
        <div @click="handleItemClick(menu.action)" :key="menu.id" v-if="!menu.children" class="menu-item-title">
          {{ menu.name }}
        </div>
        <div v-if="menu.children" class="menu-item-title">
          {{ menu.name }}
        </div>
        <ul v-if="menu.children">
          <li v-for="child in menu.children">
            <div class="second-title" @click="handleItemClick(child.action)" v-if="!child.children">
              {{ child.name }}
            </div>
            <div class="simple-title second-title" v-if="child.children">{{ child.name }}</div>
            <section v-if="child.children">
              <div v-if="!grandson.target" @click="handleItemClick(grandson.action)" v-for="grandson in child.children" :key="grandson.id">
                {{ grandson.name }}
              </div>
              <a v-else :href="grandson.action" target="_blank" style="display: block">{{ grandson.name }}
              </a>
            </section>
          </li>
        </ul>
      </li>
    </ul>
    <div class="user-card" style=" position: absolute; top: 0;right: 150px;">
      <div class="user-card-title">
        <i class="el-icon-setting"></i>
      </div>
      <div class="user-card-detail">
        <div class="user-card-login-name">{{user.loginName}}</div>
        <div class="user-card-setting">
          <!--<div>-->
            <!--<el-button type="text" size="mini" @click="changeLocate(zh)">中文/English</el-button>-->
          <!--</div>-->
          <div>
            <el-button type="text" size="mini" @click="baseInfoDialogVisible = true">用户信息
            </el-button>
          </div>
          <div>
            <el-button type="text" size="mini" @click="passwordDialogVisible = true">修改密码
            </el-button>
          </div>
          <div>
            <el-button type="text" size="mini" @click="logout()">退出</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="user-card" style=" position: absolute; top: 0;right: 200px;">
      <div class="user-card-title">
        <i class="el-icon-message"></i>
      </div>
      <div class="user-card-detail" style="text-align: center">
        <a id="mailto" href="mailto:Yanfang.ZHANG3@cn.bosch.com">Bosch</a>
      </div>
    </div>
    <div style=" position: absolute; top: 15px;right: 15px;">
      <img src="../assets/bosch_logo.svg" alt="">
    </div>
    <el-dialog :title="$t('dialog.Change_Password')" :visible.sync="passwordDialogVisible" size="tiny" :modal="false" @close="onDialogClose('passwordForm')">
      <div>
        <el-form autoComplete="on" :model="passwordForm" :rules="loginRules" ref="passwordForm" label-position="left" label-width="0px" class="card-box login-form">
          <el-form-item prop="oldPassword">
            <span class="svg-container"></span>
            <el-input name="password" type="password" @keyup.enter.native="login" v-model="passwordForm.oldPassword" autoComplete="on" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item prop="newPassword">
            <span class="svg-container"></span>
            <el-input name="password" type="password" @keyup.enter.native="login" v-model="passwordForm.newPassword" autoComplete="on" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <span class="svg-container"></span>
            <el-input name="checkPassword" type="password" @keyup.enter.native="login" v-model="passwordForm.checkPassword" autoComplete="on" placeholder="再次输入新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%;" @click.native.prevent="changePwd">
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="用户信息修改" :visible.sync="baseInfoDialogVisible" size="tiny" :modal="false" @close="onDialogClose('userForm')">
      <el-form :model="form" :rules="formRules" ref="userForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真是姓名" prop="realName">
          <el-input v-model="form.realName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="baseInfoDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMyBaseInfo">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { userMenus, saveUserSelf } from '../api/user';
import { changeMyPassword } from '../api/login';

export default {
  name: 'BoschMenu',
  componentName: 'BoschMenu',
  methods: {
    onDialogClose(form) {
      this.$refs[form].resetFields();
    },
    onMouseEnter(index) {
      this.menuItemIndex = index;
    },
    onMouseLeave() {
      this.menuItemIndex = null;
    },
    handleItemClick(index) {
      this.menuItemIndex = null;
      try {
        this.$router.push(index);
      } catch (e) {
        console.error(e);
      }
    },
    saveMyBaseInfo() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          saveUserSelf(this.form).then((response) => {
            const data = response.data;
            this.$message(
              {
                type: 'success',
                message: 'Save successfully',
              });
            this.baseInfoDialogVisible = false;
            Cookies.set('email', this.form.email);
            Cookies.set('realName', this.form.realName);
            Cookies.set('phone', this.form.phone);
          });
        }
      });
    },
    selected(index, indexPath) {
      this.$store.dispatch('setCurrentRouter', index);
    },
    getMenus() {
      userMenus().then((response) => {
        this.menus = response.data.menus;
      });
    },
    changePwd() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          changeMyPassword(this.passwordForm).then((response) => {
            if (response.code === 1200) {
              this.$message(
                {
                  type: 'success',
                  message: '修改成功',
                });
            } else {
              this.$message(
                {
                  type: 'error',
                  message: '请输入当前的登录名和密码 ！',
                });
            }
          }).then(() => {
            this.$store.dispatch('logout');
            this.$router.push({ path: '/' });
          });
        }
      });
    },
    setInfo() {
      this.dialogInfoVisible = true;
    },
    logout() {
      this.$confirm('确定退出登录？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!',
        });
        this.$store.dispatch('logout');
        this.$router.push('/');
      });
    },
    handleClose() {
    },
  },
  data() {
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Password can not be empty !'));
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
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('The password for the two time is inconsistent !'));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Telephone Number can not be empty !'));
      }
      const phoneReg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if (!phoneReg.test(value)) {
        callback(new Error('Wrong Telephone Number !'));
      }
      callback();
      return true;
    };
    return {
      loading: true,
      menuItemIndex: null,
      number: 1,
      passwordForm: {
        loginName: '',
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
      },
      loginRules: {
        loginName: [
          {
            required: true,
            trigger: 'blur',
            message: 'Please input your login name !',
          },
        ],
        oldPassword: [
          {
            required: true,
            trigger: 'blur',
            message: 'Please input your current password ',
          },
        ],
        newPassword: [
          {
            required: true,
            trigger: 'blur',
            message: 'Please input the new  password',

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
      form: {
        email: '',
        realName: '',
        phone: '',
      },
      formRules: {
        email: [
          {
            required: true,
            type: 'email',
            message: 'Please enter correct email',
            trigger: 'blur,change',
          },
        ],
        realName: [
          {
            required: true,
            message: 'Please enter real name',
            trigger: 'blur,change',
          },
        ],
        phone: [
          {
            validator: checkPhone,
            required: true,
            trigger: 'blur,change',
          },
        ],
      },
      currentRoute: '',
      passwordDialogVisible: false,
      baseInfoDialogVisible: false,
      dialogInfoVisible: false,
      menus: [],
      organizations: [],
      user: {
        loginName: '',
        realName: '',
        email: '',
      },
      formLabelWidth: 120,
    };
  },
  created() {
    this.getMenus();
    this.user.loginName = Cookies.get('loginName');
    this.user.realName = Cookies.get('realName');
    this.user.email = Cookies.get('email');
    this.form.email = Cookies.get('email');
    this.form.realName = Cookies.get('realName');
    this.form.phone = Cookies.get('phone');
  },
  beforeCreate() {
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  line-height: 40px;
  color: #999;
  font-size: 14px;
  &:hover {
    .user-card-detail {
      display: block;
    }
  }
  &-title {
    line-height: 72px;
    height: 72px;
    font-size: 15px;
    text-align: center;
  }
  &-detail {
    display: none;
    position: absolute;
    width: 250px;
    border-radius: 0 0 4px 4px;
    top: 100%;
    left: -115px;
    z-index: 1000;
    float: left;
    min-width: 160px;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: rgba(39, 43, 46, 0.9);
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
  }
  &-login-name {
    padding: 0 5px;
    text-align: center;
    line-height: 40px;
  }
  &-email {
    padding: 0 5px;
    text-align: center;
    line-height: 40px;
  }
  &-setting {
    background-color: rgba(39, 43, 46, 0.9);
    text-align: center;
    line-height: 40px;
    & > button {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}

.el-button {
  &:hover {
    color: #0388c5;
  }
}

.menu {
  z-index: 999;
  background-color: #222222;
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  border-bottom: 2px solid #2f2f2f;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  ul {
    list-style-type: none;
  }
  & > li:hover {
    & > div {
      color: #0388c5;
      background-color: #2d2d2d;
      border-bottom: solid 5px #008ece;
      height: 72px;
    }
  }
  .simple-title {
    cursor: default;
    &:hover {
      color: #ffffff;
    }
  }
  div {
    color: #ffffff;
    line-height: 72px;
    text-align: left;
    &:hover {
      color: #333;
    }
    &.menu-item-title-index {
      color: #0c7aab;
      cursor: none;
    }
  }
  &-item {
    /*width: 150px;*/
    display: inline-block;
    > ul {
      display: none;
    }
    > .carousel-wrap {
      display: none;
    }
    &.display {
      ul {
        display: flex;
        justify-content: center;
      }
      .carousel-wrap {
        height: 470px;
        display: flex;
        justify-content: center;
        border-bottom: 0;
        background-color: rgba(39, 43, 46, 0.9);
        .el-carousel {
          width: 100%;
        }
      }
    }
    &-title {
      cursor: pointer;
      padding-left: 20px;
      padding-right: 20px;
    }
    & > ul,
    .carousel-wrap {
      .el-carousel__item {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        div,
        a {
          color: #ffffff;
          line-height: 36px;
          &:hover {
            color: #0c7aab;
          }
        }
        .organization-name {
          cursor: pointer;
          margin: 5px 0 5px 0;
          font-weight: 700;
        }
        section {
          max-width: 340px;
          text-align: left;
          span {
            display: inline-block;
            margin: 5px 10px;
            &:hover {
              color: #0c7aab;
            }
          }
        }
      }
      color: #ffffff;
      margin-top: 0;
      border-radius: 0 0 4px 4px;
      z-index: 999;
      position: absolute;
      border-bottom: 0;
      background-color: rgba(39, 43, 46, 0.9);
      left: 0;
      right: 0;
      display: none;
      padding: 5px 0;
      font-size: 14px;
      text-align: left;
      list-style: none;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      div,
      a {
        color: #ffffff;
        line-height: 36px;
        &:hover {
          color: #0c7aab;
        }
      }
    }
    & > ul > li {
      cursor: pointer;
      z-index: 9999;
      margin: 0 20px;
      & > section {
        max-width: 340px;
        text-align: left;
        span {
          display: inline-block;
          margin: 5px 10px;
          &:hover {
            color: #0c7aab;
          }
        }
      }
      & > :first-child {
        margin: 5px 0 5px 0;
        font-weight: 700;
      }
      & > div,
      a {
        /*margin: 0 20px;*/
      }
    }
    /*&:hover {*/
    /*& > ul {*/
    /*display: flex;*/
    /*justify-content: center;*/
    /*}*/
    /*}*/
  }
}
</style>
