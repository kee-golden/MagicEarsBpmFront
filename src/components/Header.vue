<template>
  <div>
    <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ user }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'Header',
  componentName: 'Header',
  methods: {
    handleCommand(command) {
      console.log(command);
      if (command === 'logout') {
        this.logout();
      }
    },
    logout() {
      this.$store.dispatch('logout', this.loginForm).then(() => {
        this.loading = false;
        this.$router.push({ path: '/login' });
      }).catch((err) => {
        this.loading = false;
      });
    },
  },
  data() {
    return {
      user: '',
    };
  },
  created() {
    this.user = Cookies.get('realName');
  },
  beforeCreate() {
  },
};
</script>

<style lang="scss" scoped></style>
