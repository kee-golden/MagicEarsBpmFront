<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        <el-button type="text" style="float: right;" @click="add" icon="plus">添加</el-button>
      </el-breadcrumb>
    </div>
    <panel style="margin: 20px 30px">
      <div style="padding: 9px 6px">
        <el-row>
          <el-col :span="24">
            <el-table :data="tableData" ref="parentTable" height="350" stripe v-loading.body="loading"
                      style="width: 100%"
                      highlight-current-row @current-change="handlePrivilegeChange">
              <el-table-column prop="name" :resizable="false" label="权限名称" width="200">
              </el-table-column>
              <el-table-column prop="code" :resizable="false" label="编码" min-width="100">
              </el-table-column>
              <el-table-column prop="action" :resizable="false" label="链接" min-width="100">
                <template slot-scope="scope">
                  <HttpMethodTag :type="scope.row.type"></HttpMethodTag>
                  {{scope.row.action}}
                </template>
              </el-table-column>
              <el-table-column label="操作" :resizable="false">
                <template slot-scope="scope">
                  <el-button type="text" @click="add(scope.row.id)" icon="edit">添加子权限
                  </el-button>
                  <el-button type="text" @click="edit(scope.row.id)" icon="edit">编辑</el-button>
                  <el-button type="text" @click="del(scope.row.id)" icon="delete">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-table :data="childrenData" height="350" stripe v-loading.body="loading" style="width: 100%">
              <el-table-column prop="name" label="子权限名称" width="200">
              </el-table-column>
              <el-table-column prop="code" label="编码" min-width="100">
              </el-table-column>
              <el-table-column prop="action" label="链接" min-width="100">
                <template slot-scope="scope">
                  <HttpMethodTag :type="scope.row.type"></HttpMethodTag>
                  {{scope.row.action}}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row.id)" icon="edit">编辑</el-button>
                  <el-button type="text" @click="del(scope.row.id)" icon="delete">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </panel>

    <el-dialog :title="form.id !== '' ?  '权限修改' : '权限添加'" :visible.sync="dialogVisible" size="tiny">
      <el-form :model="form" :rules="formRules" ref="privilegeForm">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="方法" :label-width="formLabelWidth">
          <el-select style="width: 100%" v-model="form.type" placeholder="Please Choose">
            <el-option
              v-for="item in typeOptions"
              :label="item.label"
              :key="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth" prop="action">
          <el-input v-model="form.action" auto-complete="off"></el-input>
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
  import { getPrivilege, privilegeList, deletePrivilege, savePrivilege, updatePrivilege } from '@/api/privilege';
  import { Box, BoxContent, BoxTitle, HttpMethodTag, Panel } from '@/components/index';

  export default {
    components: {
      Box,
      BoxTitle,
      BoxContent,
      HttpMethodTag,
      Panel,
    },
    methods: {
      edit(id) {
        getPrivilege(id).then((response) => {
          this.form.id = response.data.privilege.id;
          if (response.data.privilege.parent) {
            this.form.parentId = response.data.privilege.parent.id;
          }
          this.form.name = response.data.privilege.name;
          this.form.action = response.data.privilege.action;
          this.form.code = response.data.privilege.code;
          this.form.icon = response.data.privilege.icon;
          this.form.type = response.data.privilege.type;
          this.dialogVisible = true;
        });
      },
      resetFrom() {
        this.form.id = '';
        this.form.name = '';
        this.form.action = '';
        this.form.code = '';
        this.form.icon = '';
        this.form.type = 1;
        this.form.parentId = '';
      },
      add(id) {
        this.resetFrom();
        if (id) {
          this.form.parentId = id;
        }
        this.dialogVisible = true;
      },
      del(id) {
        this.$confirm('这个操作将永久删除该权限，您想继续吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deletePrivilege(id)
            .then(() => {
              this.$message(
                {
                  type: 'success',
                  message: '刪除成功',
                });
            })
            .then(() => {
              this.getList();
            })
            .catch(() => {
              this.$message.error('刪除失敗');
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
      handlePrivilegeChange(row) {
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
        privilegeList(this.listQuery).then((response) => {
          const data = response.data;
          this.tableData = data.privilegeList;
          this.listQuery.totalAmount = data.totalAmount;
          this.loading = false;
          // filter 是否有含有符合 id=this.parentId的数据
          const filter = this.tableData.filter(obj => obj.id === this.parentId);
          this.setCurrent(filter[0]);
        });
      },
      save() {
        this.$refs.privilegeForm.validate((valid) => {
          if (valid) {
            if (!this.form.id) {
              savePrivilege(this.form).then((response) => {
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
              updatePrivilege(this.form).then((response) => {
                const data = response.data;
                this.$message(
                  {
                    type: 'success',
                    message: '保存成功',
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
                message: '请输入正确的值',
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
        typeOptions: [
          {
            value: 1,
            label: 'GET',
          }, {
            value: 2,
            label: 'POST',
          }, {
            value: 3,
            label: 'PUT',
          }, {
            value: 4,
            label: 'PATCH',
          }, {
            value: 5,
            label: 'DELETE',
          },
        ],
        form: {
          id: '',
          name: '',
          icon: '',
          code: '',
          type: 1,
          action: '',
          parentId: '',
        },
        formRules: {
          name: [
            {
              required: true,
              message: '请输入名称',
              trigger: 'blur ',
            },
            {
              min: 2,
              message: '至少 2 个字符',
              trigger: 'blur',
            },
          ],
          code: [
            {
              required: true,
              message: '请输入编码',
              trigger: 'blur',
            },
            {
              min: 2,
              message: '至少 2 个字符',
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
          const privilege = this.tableData.filter(obj => obj.id === this.parentId);
          if (privilege[0]) {
            return privilege[0].children;
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

</style>

