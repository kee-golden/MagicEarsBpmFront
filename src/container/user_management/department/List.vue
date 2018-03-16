<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>部门列表</el-breadcrumb-item>
        <el-button type="text" style="float: right;" @click="add" icon="plus">
          添加
        </el-button>
      </el-breadcrumb>
    </div>
    <panel style="margin: 20px 30px">
      <div style="padding: 9px 6px">
        <el-row>
          <el-col :span="24">
            <el-table :data="tableData" stripe v-loading.body="loading" style="width: 100%">
              <el-table-column prop="name" label="部门名称" width="200"
                               :resizable="false"></el-table-column>
              <el-table-column prop="code" label="部门编码" width="200"
                               :resizable="false"></el-table-column>
              <el-table-column prop="description" label="部门描述" min-width="250"
                               :resizable="false">
              </el-table-column>
              <el-table-column prop="createAt" label="创建时间" width="200"
                               :resizable="false"></el-table-column>
              <el-table-column label="操作" :resizable="false">
                <template scope="scope">
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
    <el-dialog :title="form.id !=='' ? '编辑部门' : '添加部门'" :visible.sync="dialogVisible" size="tiny">
      <el-form :model="form" :rules="formRules" ref="departmentForm">
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门描述" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="4"
              v-model="form.description">
            </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :disabled="form.disabled" @click="save">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import { departmentList, saveDepartment, getDepartment, updateDepartment, deleteDepartment } from '@/api/department';
  import { Box, BoxContent, BoxTitle, Panel } from '@/components/index';

  export default {
    components: {
      Box,
      BoxTitle,
      BoxContent,
      Panel,
    },
    methods: {
      edit(id) {
        this.dialogVisible = true;
        this.form.disabled = false;
        getDepartment(id).then((response) => {
          this.form = {
            id: response.data.department.id,
            name: response.data.department.name,
            code: response.data.department.code,
            description: response.data.department.description,
          };
        });
      },
      del(id) {
        const message = '这个操作将永久删除该组织，您想继续吗？';
        const tips = '提示';
        const confirm = '确认';
        const cancel = '取消';
        this.$confirm(message, tips, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'warning',
        }).then(() => {
          deleteDepartment(id)
            .then((response) => {
              const code = response.code;
              if (code === 2000) {
                this.$message(
                  {
                    type: 'success',
                    message: '部门下存在员工，无法删除!',
                  });
              } else {
                this.$message(
                  {
                    type: 'success',
                    message: '删除成功',
                  });
              }
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
        departmentList(this.listQuery).then((response) => {
          const data = response.data;
          this.tableData = data.departmentList;
          this.listQuery.totalAmount = data.totalAmount;
          this.loading = false;
        });
      },
      add() {
        this.form.name = '';
        this.form.id = '';
        this.form.code = '';
        this.form.description = '';
        this.dialogVisible = true;
        this.form.disabled = false;
      },
      save() {
        this.$refs.departmentForm.validate((valid) => {
          if (valid) {
            this.form.disabled = true;
            if (!this.form.id) {
              saveDepartment(this.form).then((response) => {
                this.$message(
                  {
                    type: 'success',
                    message: '保存成功！',
                  });
                this.dialogVisible = false;
                this.getList();
              });
            } else {
              updateDepartment(this.form).then((response) => {
                const data = response.data;
                this.$message(
                  {
                    type: 'success',
                    message: '编辑成功！',
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
                message: 'Please Input valid Value！',
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
        formLabelWidth: '200px',
        form: {
          id: '',
          name: '',
          code: '',
          description: '',
          disabled: false,
        },
        formRules: {
          name: [
            {
              required: true,
              message: '部门名称不能为空！',
            },
          ],
          code: [
            {
              required: true,
              message: '部门编码不能为空！',
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

