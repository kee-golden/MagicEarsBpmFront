<template>
  <div>
    <div>111</div>
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
        ],
      };
    },
    methods: {
      tableRowClassName({ row, rowIndex }) {
        return 'warning-row';
      },
    },
    mounted() {
    },
    created() {
    },
  };
</script>

<style lang='scss'>

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
