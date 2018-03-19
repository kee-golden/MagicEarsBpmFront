<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        <el-button type="text" style="float: right;" @click="edit()" icon="plus">
          添加
        </el-button>
      </el-breadcrumb>
    </div>
    <panel style="margin: 20px 30px">
      <div style="padding: 9px 6px">
        <el-row>
          <el-col :span="24">
            <el-table :data="tableData" border stripe v-loading.body="loading" st yle="width: 100%">
              <el-table-column prop="name" :resizable="false" label="角色名称" min-width="150">
              </el-table-column>
              <el-table-column prop="description" :resizable="false" label="权限" min-width="300">
              </el-table-column>
              <el-table-column label="操作" :resizable="false" min-width="200">
                <template slot-scope="scope">
                  <el-button type="text" @click="privilege(scope.row.id)" icon="edit">权限
                  </el-button>
                  <el-button type="text" @click="menu(scope.row.id)" icon="edit">菜单</el-button>
                  <el-button type="text" @click="edit(scope.row.id)" icon="edit">编辑</el-button>
                  <el-button type="text" @click="del(scope.row.id)" icon="delete">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="bosch-pagination-box">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page="listQuery.page" :page-sizes="[20, 50, 100, 200]"
                             :page-size="listQuery.size"
                             layout="total, sizes, prev, pager, next, jumper" :total="listQuery.totalAmount">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </panel>

    <el-dialog :title="form.id !== '' ?  '编辑角色' : '添加角色'" :visible.sync="dialogVisible" size="tiny">
      <el-form :model="form" :rules="formRules" ref="roleForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="description">
          <el-input type="textarea" v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限" :visible.sync="privilegeDialogVisible" size="small">
      <el-tree
        :check-strictly="true"
        :data="privileges"
        :default-expand-all="true"
        ref="privilegeTreeNode"
        show-checkbox
        node-key="id"
        :props="defaultTreeProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="privilegeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="savePrivileges">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="菜单" :visible.sync="menuDialogVisible" size="small">
      <el-tree
        :check-strictly="true"
        :data="menus"
        :default-expand-all="true"
        ref="menuTreeNode"
        show-checkbox
        node-key="id"
        :props="defaultTreeProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveMenus">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { getRole, roleList, deleteRole, saveRole, updateRole, getPrivileges, getMenus } from '@/api/role';
  import { privilegeList } from '@/api/privilege';
  import { menuList } from '@/api/menu';
  import Box from '@/components/Box';
  import BoxTitle from '@/components/BoxTitle';
  import BoxContent from '@/components/BoxContent';
  import Panel from '@/components/Panel';

  export default {
    components: {
      Box,
      BoxTitle,
      BoxContent,
      Panel,
    },
    methods: {
      privilege(id) {
        this.form.id = id;
        const $refs = this.$refs;
        privilegeList().then((response) => {
          this.privilegeDialogVisible = true;
          this.privileges = response.data.privilegeList;
        }).then(() => {
          getPrivileges(id).then((response) => {
            const privileges = response.data.privileges;
            $refs.privilegeTreeNode.setCheckedNodes(privileges);
          });
        });
      },
      menu(id) {
        this.form.id = id;
        const $refs = this.$refs;
        menuList().then((response) => {
          this.menuDialogVisible = true;
          this.menus = response.data.menuList;
        }).then(() => {
          getMenus(id).then((response) => {
            const menus = response.data.menus;
            $refs.menuTreeNode.setCheckedNodes(menus);
          });
        });
      },
      edit(id) {
        if (id) {
          getRole(id).then((response) => {
            this.form.id = response.data.role.id;
            this.form.name = response.data.role.name;
            this.form.code = response.data.role.code;
            this.form.description = response.data.role.description;
            this.dialogVisible = true;
          });
        } else {
          this.form.id = '';
          this.form.name = '';
          this.form.code = '';
          this.form.description = '';
          this.dialogVisible = true;
        }
      },
      del(id) {
        this.$confirm('这个操作将永久删除该角色，您想继续吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteRole(id)
            .then(() => {
              this.$message(
                {
                  type: 'success',
                  message: '删除成功',
                });
            })
            .then(() => {
              this.getList();
            })
            .catch(() => {
              this.$message.error('删除失败');
            });
        });
      },
      handleSizeChange(val) {
        this.listQuery.size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      getList() {
        this.loading = true;
        roleList(this.listQuery).then((response) => {
          const data = response.data;
          this.tableData = data.roleList;
          this.listQuery.totalAmount = data.totalAmount;
          this.loading = false;
        });
      },
      savePrivileges() {
        const checkedKeys = this.$refs.privilegeTreeNode.getCheckedKeys();
        updateRole({
          id: this.form.id,
          privilege: checkedKeys,
        }).then(() => {
          this.privilegeDialogVisible = false;
        });
      },
      saveMenus() {
        const checkedKeys = this.$refs.menuTreeNode.getCheckedKeys();
        updateRole({
          id: this.form.id,
          menu: checkedKeys,
        }).then(() => {
          this.menuDialogVisible = false;
        });
      },
      save() {
        this.$refs.roleForm.validate((valid) => {
          if (valid) {
            if (!this.form.id) {
              saveRole(this.form).then((response) => {
                const data = response.data;
                this.$message(
                  {
                    type: 'success',
                    message: '保存成功',
                  });
                this.dialogVisible = false;
                this.getList();
              });
            } else {
              updateRole(this.form).then((response) => {
                const data = response.data;
                this.$message(
                  {
                    type: 'success',
                    message: '编辑成功',
                  });
                this.dialogVisible = false;
                this.getList();
              });
            }
            return true;
// eslint-disable-next-line no-else-return
          } else {
            this.$message(
              {
                type: 'error',
                message: '请输入值',
              });
            return false;
          }
        });
      },
    },
    created() {
      this.getList();
    },
    data() {
      const checkEmail = (rule, value, callback) => {
        if (!value) {
          callback(new Error('Email cannot be empty'));
        }
        const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if (!emailReg.test(value)) {
          callback(new Error('The Email format is incorrect'));
        }
        callback();
        return true;
      };
      return {
        roles: [],
        options: [
          {
            value: 0,
            label: '女',
          },
          {
            value: 1,
            label: '男',
          },
        ],
        dialogVisible: false,
        privilegeDialogVisible: false,
        menuDialogVisible: false,
        loading: true,
        tableData: [],
        formLabelWidth: '120px',
        form: {
          id: '',
          loginName: '',
          password: '',
          sex: '',
          email: '',
          realName: '',
          phone: '',
          privilege: [],
          menu: [],
        },
        privileges: [],
        menus: [],
        formRules: {
          loginName: [
            {
              required: true,
              message: 'Please enter login name',
              trigger: 'blur',
            },
            {
              min: 4,
              message: 'At least four characters',
              trigger: 'blur',
            },
          ],
          password: [
            {
              required: false,
              message: 'Please enter password',
              trigger: 'blur',
            },
            {
              min: 4,
              message: 'At least four characters',
              trigger: 'blur',
            },
          ],
          email: [
            {
              validator: checkEmail,
              trigger: 'change',
            },
          ],
          realName: [
            {
              required: true,
              message: 'Please enter real name',
              trigger: 'change',
            },
          ],
          phone: [
            {
              required: true,
              message: 'Please enter mobile ',
              trigger: 'change',
            },
          ],
        },
        listQuery: {
          totalAmount: 0,
          page: 1,
          size: 20,
        },
        defaultTreeProps: {
          children: 'children',
          label: 'name',
        },
      };
    }
    ,

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
      color: #A4A4A4;
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
      background: #F8F8F8;
      padding: 0;
    }
  }

</style>

