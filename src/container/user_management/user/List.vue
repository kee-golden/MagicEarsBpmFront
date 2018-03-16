<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        <el-button type="text" @click="add" style="float: right;" icon="plus">
          添加
        </el-button>
      </el-breadcrumb>
    </div>
    <!--<panel style="margin: 20px 30px">-->
      <!--<div style="padding: 9px 6px">-->
        <!--<el-row>-->
          <!--<el-col :span="24">-->
            <!--<el-table :data="tableData" stripe v-loading.body="loading" style="width: 100%">-->
              <!--<el-table-column type="index" label="No." :resizable="false" width="80">-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="loginName" :resizable="false" :label="$t('message.LoginName')" min-width="100">-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="email" :resizable="false" :label="$t('message.Email')" min-width="100">-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="roleList" :resizable="false" :label="$t('message.Role')" min-width="100">-->
                <!--<template scope="scope">-->
                  <!--<span v-for="role in scope.row.roleList" :key="role.id">-->
                    <!--{{role.name}}&nbsp;&nbsp;-->
                  <!--</span>-->
                <!--</template>-->
              <!--</el-table-column>-->

              <!--<el-table-column prop="createAt" :resizable="false" :label="$t('message.Created_Date')" min-width="150">-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="organizationList" :resizable="false" :label="$t('message.OEM')" min-width="300">-->
                <!--<template scope="scope">-->
                  <!--<span v-for="organization in scope.row.organizationList" :key="organization.id">-->
                    <!--{{organization.name}}&nbsp;&nbsp;-->
                  <!--</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column min-width="250" :resizable="false" :label="$t('message.Operate')">-->
                <!--<template scope="scope">-->
                  <!--<el-popover ref="popover" placement="right">-->
                    <!--<h1>{{ wechat }}</h1>-->
                  <!--</el-popover>-->
                  <!--<el-button type="text" icon="edit" @click="role(scope.row.id)">{{$t('button.Roles')}}</el-button>-->
                  <!--<el-button type="text" icon="edit" @click="organization(scope.row.id)">-->
                    <!--{{$t('button.Organizations')}}-->
                  <!--</el-button>-->
                  <!--<el-button type="text" icon="edit" v-if="scope.row.roleList !== null && scope.row.roleList.length === 1 && scope.row.roleList[0].name === 'Fleet Manager'" @click="fleet(scope.row.id, scope.row.organizationList)">-->
                    <!--{{$t('message.Fleet')}}-->
                  <!--</el-button>-->
                  <!--<el-button type="text" icon="edit" @click="edit(scope.row.id)">{{ $t("button.Edit") }}</el-button>-->
                  <!--<el-button type="text" icon="edit" @click="showUserKey(scope.row)" v-popover:popover>-->
                    <!--{{$t('button.Show_User_Key')}}-->
                  <!--</el-button>-->
                  <!--<el-button type="text" icon="delete" @click="del(scope.row.id)">{{ $t("button.Delete") }}-->
                  <!--</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
            <!--</el-table>-->
            <!--<div class="bosch-pagination-box">-->
              <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[20, 50, 100, 200]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalAmount">-->
              <!--</el-pagination>-->
            <!--</div>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->
    <!--</panel>-->

    <!--<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="tiny" @close="onDialogClose">-->
      <!--<el-form :model="form" :rules="formRules" ref="userForm">-->
        <!--<el-form-item :label="$t('message.Name')" :label-width="formLabelWidth" prop="loginName">-->
          <!--<el-input v-model="form.loginName" auto-complete="off" :disabled="!!form.id"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.Email')" :label-width="formLabelWidth" prop="email">-->
          <!--<el-input v-model="form.email" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.Real_Name')" :label-width="formLabelWidth" prop="realName">-->
          <!--<el-input v-model="form.realName" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('message.Mobile')" :label-width="formLabelWidth" prop="phone">-->
          <!--<el-input v-model="form.phone" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">{{$t('button.Cancel')}}</el-button>-->
        <!--<el-button type="success" @click="save">{{$t('button.Confirm')}}</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <!--<el-dialog :title="$t('message.Role')" :visible.sync="roleDialogVisible" size="tiny">-->
      <!--<el-checkbox-group v-model="form.roles">-->
        <!--<el-checkbox :label="role.id" :key="role.id" v-for="role in roles">{{ role.name }}</el-checkbox>-->
      <!--</el-checkbox-group>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="roleDialogVisible = false">{{$t('button.Cancel')}}</el-button>-->
        <!--<el-button type="success" @click="saveUserRole">{{$t('button.Confirm')}}</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <!--<el-dialog :title="$t('button.Organizations')" :visible.sync="organizationDialogVisible" size="tiny">-->
      <!--<template>-->
        <!--<el-table ref="multipleTable" :data="organizations" border tooltip-effect="dark" style="width: 100%">-->
          <!--<el-table-column prop="name" :label="$t('input.Choose')">-->
            <!--<template scope="scope">-->
              <!--<el-checkbox-group v-model="form.organizations">-->
                <!--<el-checkbox :label="scope.row.id"> {{scope.row.id}}-->
                <!--</el-checkbox>-->
              <!--</el-checkbox-group>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="name" :label="$t('message.Organization_Name')" show-overflow-tooltip>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="name" :label="$t('message.isAdmin')">-->
            <!--<template scope="scope">-->
              <!--<el-checkbox-group v-model="form.adminOrganizations">-->
                <!--<el-checkbox :label="scope.row.id" :disabled="!form.organizations.includes(scope.row.id)"> &nbsp;-->
                <!--</el-checkbox>-->
              <!--</el-checkbox-group>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      <!--</template>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="organizationDialogVisible = false">{{$t('button.Cancel')}}</el-button>-->
        <!--<el-button type="success" @click="saveUserOrganization">{{$t('button.Confirm')}}</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <!--<el-dialog :title="$t('message.Fleet')" :visible.sync="fleetDialogVisible" size="tiny">-->
      <!--<template>-->
        <!--<el-table ref="multipleTable" :data="fleets" border tooltip-effect="dark" style="width: 100%">-->
          <!--<el-table-column prop="name" :label="$t('input.Choose')">-->
            <!--<template scope="scope">-->
              <!--<el-checkbox-group v-model="form.fleets">-->
                <!--<el-checkbox :label="scope.row.id"> {{scope.row.id}}-->
                <!--</el-checkbox>-->
              <!--</el-checkbox-group>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="name" :label="$t('message.Fleet_Name')" show-overflow-tooltip>-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="name" :label="$t('message.isAdmin')">-->
            <!--<template scope="scope">-->
              <!--<el-checkbox-group v-model="form.adminFleets">-->
                <!--<el-checkbox :label="scope.row.id" :disabled="!form.fleets.includes(scope.row.id)"> &nbsp;-->
                <!--</el-checkbox>-->
              <!--</el-checkbox-group>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      <!--</template>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="fleetDialogVisible = false">{{$t('button.Cancel')}}</el-button>-->
        <!--<el-button type="success" @click="saveUserFleet">{{$t('button.Confirm')}}</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import imgPath from '@/assets/white.png';
import { Box, BoxContent, BoxTitle, PrivilegeWrap, Panel } from '@/components/index';

// import {
//  getUser,
//  userList,
//  deleteUser,
//  showUserQR,
//  saveUser,
//  updateUser,
//  userRoles,
//  userOrganizations,
//  updateOrganizations,
//  userFleets,
//  updateFleets,
// } from '@/api/user';
// import { roleList } from '@/api/role';
// import { getAllOrganizations } from '@/api/organization';
// import { getFleetList } from '@/api/fleet';

export default {
  components: {
    Box,
    BoxTitle,
    BoxContent,
    PrivilegeWrap,
    Panel,
    //      VueQArt,
  },
  methods: {
//    onDialogClose() {
//      this.$refs.userForm.resetFields();
//    },
//    edit(id) {
//      getUser(id).then((response) => {
//        this.form.id = response.data.user.id;
//        this.form.loginName = response.data.user.loginName;
//        this.form.realName = response.data.user.realName;
//        this.form.email = response.data.user.email;
//        this.form.phone = response.data.user.phone;
//        this.dialogVisible = true;
//        if (Cookies.get('locate') === 'zh') {
//          this.dialogTitle = '编辑用户';
//        } else {
//          this.dialogTitle = 'Edit User';
//        }
//      });
//    },
//    add() {
//      this.form.id = '';
//      this.form.loginName = '';
//      this.form.realName = '';
//      this.form.email = '';
//      this.form.phone = '';
//      this.dialogVisible = true;
//      if (Cookies.get('locate') === 'zh') {
//        this.dialogTitle = '添加用户';
//      } else {
//        this.dialogTitle = 'Add User';
//      }
//    },
//    role(id) {
//      this.form.id = id;
//      roleList().then((response) => {
//        this.roles = response.data.roleList;
//      }).then(() => {
//        userRoles(id).then((response) => {
//          this.form.roles = [];
//          response.data.roles.forEach(val => this.form.roles.push(val.id));
//        });
//      }).then(() => {
//        this.roleDialogVisible = true;
//      });
//    },
//    saveUserRole() {
//      updateUser({
//        id: this.form.id,
//        roles: this.form.roles,
//      }).then(() => {
//        this.roleDialogVisible = false;
//        this.getList();
//        this.$message(
//          {
//            type: 'success',
//            message: 'Save successfully',
//          });
//      });
//    },
//    organization(id) {
//      this.form.id = id;
//      getAllOrganizations().then((response) => {
//        this.organizations = response.data.organizations;
//      }).then(() => {
//        userOrganizations(id).then((response) => {
//          this.form.organizations = [];
//          this.form.adminOrganizations = [];
//          response.data.userOrganizations.forEach((val) => {
//            this.form.organizations.push(val.organization.id);
//          });
//          response.data.userOrganizations.filter(val => val.isAdmin === 1).forEach((val) => {
//            this.form.adminOrganizations.push(val.organization.id);
//          });
//        });
//      }).then(() => {
//        this.organizationDialogVisible = true;
//      });
//    },
//    fleet(id, organizationList) {
//      this.form.id = id;
//      console.log(id);
//      const organizationId = organizationList[0].id;
//      getFleetList(organizationId).then((response) => {
//        this.fleets = response.data.fleetList;
//        console.log(this.fleets);
//      }).then(() => {
//        userFleets(id).then((response) => {
//          this.form.fleets = [];
//          this.form.adminFleets = [];
//          response.data.userFleets.forEach((val) => {
//            this.form.fleets.push(val.fleet.id);
//          });
//          response.data.userFleets.filter(val => val.isAdmin === 1).forEach((val) => {
//            this.form.adminFleets.push(val.fleet.id);
//          });
//          console.log(response.data.userFleets);
//        });
//      }).then(() => {
//        this.fleetDialogVisible = true;
//      });
//    },
//    saveUserOrganization() {
//      const checkedOrganizations = this.form.organizations;
//      const adminOrganizations = this.form.adminOrganizations;
//      updateOrganizations({
//        id: this.form.id,
//        organizations: checkedOrganizations,
//        adminOrganizations: adminOrganizations.filter(x => checkedOrganizations.includes(x)),
//      }).then(() => {
//        this.organizationDialogVisible = false;
//        this.getList();
//        this.$message(
//          {
//            type: 'success',
//            message: 'Save successfully',
//          });
//      });
//    },
//    saveUserFleet() {
//      const checkedFleets = this.form.fleets;
//      const adminFleets = this.form.adminFleets;
//      updateFleets({
//        id: this.form.id,
//        fleets: checkedFleets,
//        adminFleets: adminFleets.filter(x => checkedFleets.includes(x)),
//      }).then(() => {
//        this.fleetDialogVisible = false;
//        this.getList();
//        this.$message(
//          {
//            type: 'success',
//            message: 'Save successfully',
//          });
//      });
//    },
//    del(id) {
//      let message = '';
//      let tips = '';
//      let confirm = '';
//      let cancel = '';
//      if (Cookies.get('locate') === 'zh') {
//        message = '这个操作将永久删除该用户，您想继续吗？';
//        tips = '提示';
//        confirm = '确认';
//        cancel = '取消';
//      } else {
//        message = 'This action will permanently delete the user. Do you want to continue?';
//        tips = 'Tips';
//        confirm = 'Confirm';
//        cancel = 'Cancel';
//      }
//      this.$confirm(message, tips, {
//        confirmButtonText: confirm,
//        cancelButtonText: cancel,
//        type: 'warning',
//      }).then(() => {
//        deleteUser(id).then((response) => {
//          if (response.code === 1200) {
//            this.$message(
//              {
//                type: 'success',
//                message: 'Delete successfully',
//              });
//          }
//        }).then(() => {
//          this.getList();
//        }).catch(() => {
//          this.$message.error('Delete failed');
//        });
//      });
//    },
//    handleSizeChange(val) {
//      this.listQuery.size = val;
//      this.getList();
//    },
//    handleCurrentChange(val) {
//      this.listQuery.page = val;
//      this.getList();
//    },
//    getList() {
//      this.loading = true;
//      userList(this.listQuery).then((response) => {
//        const data = response.data;
//        this.tableData = data.userList;
//        console.log(this.tableData);
//        this.listQuery.totalAmount = data.totalAmount;
//        this.loading = false;
//      });
//    },
//    save() {
//      this.$refs.userForm.validate((valid) => {
//        if (valid) {
//          if (!this.form.id) {
//            saveUser(this.form).then((response) => {
//              const data = response.data;
//              this.$message(
//                {
//                  type: 'success',
//                  message: 'Save successfully',
//                });
//              this.dialogVisible = false;
//              this.getList();
//            });
//          } else {
//            updateUser(this.form).then((response) => {
//              const data = response.data;
//              this.$message(
//                {
//                  type: 'success',
//                  message: 'Save successfully',
//                });
//              this.dialogVisible = false;
//              this.getList();
//            });
//          }
//          return true;
//          // eslint-disable-next-line no-else-return
//        } else {
//          this.$message(
//            {
//              type: 'error',
//              message: 'Please enter the correct value!',
//            });
//          return false;
//        }
//      });
//    },
//    showUserKey(row) {
//      this.wechat = row.wechat;
//    },
  },
  created() {
//    this.getList();
  },
  data() {
//    const checkLoginName = (rule, value, callback) => {
//      if (!value) {
//        return callback(new Error('用户账号不能为空！'));
//      }
//      userList({ loginNameEq: value }).then((response) => {
//        if (response.data.userList.length === 0) {
//          return callback();
//        }
//        const filter = response.data.userList.filter(org => org.id === this.form.id);
//        if (filter.length === 1) {
//          return callback();
//        }
//        return callback(new Error('User accounts cannot be repeated.'));
//      });
//      return true;
//    };

//    const checkEmail = (rule, value, callback) => {
//      if (!value) {
//        return callback(new Error('用户邮箱不能为空！'));
//      }
//      userList({ emailEq: value }).then((response) => {
//        if (response.data.userList.length === 0) {
//          return callback();
//        }
//        const filter = response.data.userList.filter(org => org.id === this.form.id);
//        if (filter.length === 1) {
//          return callback();
//        }
//        return callback(new Error('User email cannot be repeated.'));
//      });
//      return true;
//    };
//
//    const checkPhone = (rule, value, callback) => {
//      if (!value) {
//        callback(new Error('Mobile phone number cannot be empty.'));
//      }
//      const phoneReg = /^1[3|4|5|8][0-9]\d{4,8}$/;
//      if (!phoneReg.test(value)) {
//        callback(new Error('The phone number is not in the correct format'));
//      }
//      callback();
//      return true;
//    };
    return {
//      wechat: '',
//      roles: [],
//      organizations: [],
//      fleets: [],
//      dialogTitle: '',
//      defaultProps: {
//        children: 'children',
//        label: 'label',
//      },
//      options: [
//        {
//          value: 0,
//          label: '女',
//        },
//        {
//          value: 1,
//          label: '男',
//        },
//      ],
//      dialogVisible: false,
//      roleDialogVisible: false,
//      organizationDialogVisible: false,
//      fleetDialogVisible: false,
//      loading: true,
//      tableData: [],
//      formLabelWidth: '120px',
//      form: {
//        id: '',
//        loginName: '',
//        password: '',
//        email: '',
//        realName: '',
//        phone: '',
//        roles: [],
//        organizations: [],
//        adminOrganizations: [],
//        fleets: [],
//        adminFleets: [],
//      },
//      formRules: {
//        loginName: [
//          {
//            required: true,
//            message: 'Please enter your account number',
//            trigger: 'blur',
//          },
//          {
//            validator: checkLoginName,
//            trigger: 'blur,change',
//          },
//          {
//            min: 4,
//            message: 'At least four characters',
//            trigger: 'blur',
//          },
//        ],
//        password: [
//          {
//            required: true,
//            message: 'Please enter your password',
//            trigger: 'blur',
//          },
//          {
//            min: 4,
//            message: 'At least four characters',
//            trigger: 'blur',
//          },
//        ],
//        email: [
//          {
//            required: true,
//            type: 'email',
//            message: 'Please enter the correct email address',
//            trigger: 'blur,change',
//          },
//          {
//            validator: checkEmail,
//            trigger: 'blur,change',
//          },
//        ],
//        realName: [
//          {
//            required: true,
//            message: 'Please enter real name',
//            trigger: 'blur,change',
//          },
//        ],
//        phone: [
//          {
//            validator: checkPhone,
//            required: true,
//            trigger: 'blur,change',
//          },
//        ],
//      },
//      listQuery: {
//        totalAmount: 0,
//        page: 1,
//        size: 20,
//      },
    };
  },

};
</script>

<style lang="scss">
.breadcrumb {
  padding: 15px 30px;
  background: #222222;
  .el-breadcrumb__item {
    line-height: 22px;
  }
  .el-breadcrumb__item__inner {
    color: #a4a4a4;
  }
  .el-button {
    padding: 0;
    line-height: 22px;
    color: #ffffff;
  }
}

.tabs {
  padding: 0;
  margin: 0;
  .el-tabs--border-card {
    border: 0;
  }
  .el-tabs__nav-wrap {
    background-color: #222222;
  }
  .el-tabs__nav {
    margin-left: 30px;
    .el-tabs__item {
      margin-right: 15px;
      background-color: #373737;
      color: #ffffff;
      &.is-active {
        color: #040404;
      }
    }
  }
  .el-tabs__content {
    background: #f8f8f8;
    padding: 0;
  }
}
</style>

