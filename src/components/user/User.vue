<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- element ui 栅格系统 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <!-- 搜索与添加区域 -->
            <el-input placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button slot="append" type="primary">添加用户</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 表格区域 -->
    <el-table :data="userList" style="width: 100%" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="className" label="年级" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="id" label="学号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{scope.row.status}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详情" placement="top">
            <el-button type="info" icon="el-icon-message"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="失效" placement="top">
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageIndex"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>


<script>
export default {
  // 当前组件的私有数据
  data() {
    return {
      // 获取用户列表参数对象
      queryInfo: {
        queryString: "",
        pageIndex: 0, //当前页码
        pageSize: 0
      },
      userList: [],
      total: 0,
    };
  },
  //
  created() {
    this.getUserList();
  },
  // 事件处理函数
  methods: {
    async getUserList() {
      const { data: resp } = await this.$http.get("/getUserList", {
        params: this.queryInfo,
      });
      console.log(resp);
      if (resp.code != 200) return this.$message.error("查询用户列表异常");
      //
      this.userList = resp.users;
      this.total = resp.total;
    },
    handleSizeChange(newPageSize) {
      console.log(newPageSize);
      this.queryInfo.pageSize = newPageSize;
      this.getUserList();
    },
    handleCurrentChange(newPageIndex) {
      console.log(newPageIndex);
      this.queryInfo.pageIndex = newPageIndex;
      this.getUserList();
    },
  },
};
</script>


<style lang="less" scoped>
</style>