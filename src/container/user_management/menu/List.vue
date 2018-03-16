<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
        <el-button type="text" style="float: right;" @click="add" icon="plus">
          添加
        </el-button>
      </el-breadcrumb>
    </div>
    <panel style="margin: 20px 30px">
      <div style="padding: 9px 6px">
        <el-row>
          <el-col :span="24">
            <el-table :data="tableData" ref="parentTable" v-loading.body="loading" style="width: 100%"
                      @current-change="handleMenuChange" :row-class-name="tableRowClassName">
              <el-table-column prop="level" :resizable="false" label="等级" width="120">
              </el-table-column>
              <el-table-column prop="icon" :resizable="false" label="图标" width="100">
                <template scope="scope">
                  <i :class="scope.row.icon"></i>
                </template>
              </el-table-column>
              <el-table-column prop="name" :resizable="false" label="菜单名称" width="200">
              </el-table-column>
              <el-table-column prop="code" :resizable="false" label="编码" min-width="100">
              </el-table-column>
              <el-table-column prop="action" :resizable="false" label="链接" min-width="100">
              </el-table-column>
              <el-table-column label="操作" :resizable="false">
                <template scope="scope">
                  <el-button type="text" @click="add(scope.row.id)" icon="edit">添加子菜单
                  </el-button>
                  <el-button type="text" @click="edit(scope.row.id)" icon="edit"> 编辑</el-button>
                  <el-button type="text" @click="del(scope.row.id)" icon="delete">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </panel>

    <el-dialog :title="form.id !== '' ? '编辑菜单' : '添加菜单'" :visible.sync="dialogVisible" size="tiny">
      <el-form :model="form" :rules="formRules" ref="menuForm">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth" prop="icon">
          <el-input v-model="form.icon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth" prop="action">
          <el-input v-model="form.action" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="目的" :label-width="formLabelWidth" prop="target">
          <el-input v-model="form.target" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { getMenu, menuList, deleteMenu, saveMenu, updateMenu } from '@/api/menu';
  import { Box, BoxContent, BoxTitle, Panel } from '@/components/index';

  export default {
    components: {
      Box,
      BoxTitle,
      BoxContent,
      Panel,
    },
    methods: {
      tableRowClassName(row, index) {
        debugger;
        if (row.row.level === 1) {
          return 'level1';
        } else if (row.row.level === 2) {
          return 'level2';
        }
        return '';
      },
      edit(id) {
        getMenu(id).then((response) => {
          this.form.id = response.data.menu.id;
          if (response.data.menu.parent) {
            this.form.parentId = response.data.menu.parent.id;
          }
          this.form.name = response.data.menu.name;
          this.form.action = response.data.menu.action;
          this.form.code = response.data.menu.code;
          this.form.icon = response.data.menu.icon;
          this.form.target = response.data.menu.target;
          this.form.type = response.data.menu.type;
          this.dialogVisible = true;
        });
      },
      resetFrom() {
        this.form.id = '';
        this.form.name = '';
        this.form.action = '';
        this.form.code = '';
        this.form.target = '';
        this.form.icon = '';
        this.form.type = 1;
        this.form.parentId = '';
      },
      add(id) {
        const re = /^[0-9]+.?[0-9]*$/;
        let dTitle = '';
        if (Cookies.get('locate') === 'zh') {
          dTitle = '添加菜单';
        } else {
          dTitle = 'Add menu';
        }
        this.resetFrom();
        if (re.test(id)) {
          this.form.parentId = id;
        }
        this.dialogVisible = true;
      },
      del(id) {
        this.$confirm('这个操作将永久删除此菜单，您想继续吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteMenu(id)
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
      handleMenuChange(row) {
        if (row) {
          this.$refs.parentTable.setCurrentRow(row);
          this.parentId = row.id;
        }
      },
      setCurrent(row) {
        this.$refs.parentTable.setCurrentRow(row);
      },
      getList() {
        this.loading = true;
        this.tableData = [];
        menuList(this.listQuery).then((response) => {
          const data = response.data;
          if (data.menuList) {
            data.menuList.forEach((x) => {
              x.level = 1;
              this.tableData.push(x);
              if (x.children) {
                x.children.forEach((y) => {
                  y.level = 2;
                  this.tableData.push(y);
                  if (y.children) {
                    y.children.forEach((z) => {
                      z.level = 3;
                      this.tableData.push(z);
                    });
                  }
                });
              }
            });
          }
          this.listQuery.totalAmount = data.totalAmount;
          this.loading = false;
          const filter = this.tableData.filter(obj => obj.id === this.parentId);
          this.setCurrent(filter[0]);
        });
      },
      save() {
        this.$refs.menuForm.validate((valid) => {
          if (valid) {
            if (!this.form.id) {
              saveMenu(this.form).then((response) => {
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
              updateMenu(this.form).then((response) => {
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
      return {
        dialogVisible: false,
        loading: true,
        tableData: [],
        formLabelWidth: '120px',
        parentId: '',
        form: {
          id: '',
          name: '',
          icon: '',
          code: '',
          type: '',
          action: '',
          parentId: '',
        },
        formRules: {
          name: [
            {
              required: true,
              message: 'Please enter name',
              trigger: 'blur ',
            },
            {
              min: 2,
              message: 'At least two characters',
              trigger: 'blur',
            },
          ],
          code: [
            {
              required: true,
              message: 'Please enter code',
              trigger: 'blur',
            },
            {
              min: 2,
              message: 'At least two characters',
              trigger: 'blur',
            },
          ],
        },
        listQuery: {
          totalAmount: 0,
          page: 1,
          size: 20,
        },
      };
    },
    computed: {
      childrenData() {
        if (this.parentId) {
          const menu = this.tableData.filter(obj => obj.id === this.parentId);
          if (menu[0]) {
            return menu[0].children;
          }
        }
        return [];
      },
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

  .el-table .level2 {
    background: oldlace;
  }

  .el-table .level1 {
    background: #f0f9eb;
  }

</style>

