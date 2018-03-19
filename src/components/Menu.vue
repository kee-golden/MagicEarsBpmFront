<template>
  <div>
    <el-menu
      default-active="1"
      :router="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      :key="menu.id"
      @close="handleClose" v-for="menu in menus">
      <el-submenu :index="'' + menu.id">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item-group :key="child.id" v-for="child in menu.children">
          <template slot="title">{{ child.name }}</template>
          <div v-for="grandson in child.children">
            <el-menu-item :index="'' + grandson.id" :key="grandson.id" :route="grandson.action">{{ grandson.name }}</el-menu-item>
          </div>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { userMenus } from '../api/user';
import { changeMyPassword } from '../api/login';

export default {
  name: 'Menu',
  componentName: 'Menu',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getMenus() {
      userMenus().then((response) => {
        const menus = response.data.menus;
        const defaultActive = [];
        menus.forEach((menu) => {
          defaultActive.push('' + menu.id);
        });
        this.menus = menus;
      });
    },
  },
  data() {
    return {
      menus: [],
      defaultActive: [],
    };
  },
  created() {
    this.getMenus();
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
