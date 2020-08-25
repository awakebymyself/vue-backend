<template>
  <el-container class="home-container">
    <!-- 头区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>电商后台管理系统</span>
      </div>

      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <div class="toggle-button" @click="toggleColl">|||</div>

        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ' '" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id" @click="saveClickState('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-setting"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边区域 -->
      <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  // 数据挂载
  data() {
    return {
      menuList: [],
      activePath: ''
    };
  },

  created() {
    // 创建生命周期函数， 获取菜单权限
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    logOut() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    async getMenuList() {
      // 结构出data， 赋值给resp
      const { data: resp } = await this.$http.get("/user/getMenu");
      console.log(resp);
      var errorMsg = resp.data.message;
      if (resp.code != 200) return this.$message.error("获取失败");
      this.menuList = resp.data;
    },
    // 点击按钮切换折叠展开
    toggleColl() {
        

    },
    saveClickState(activePath) {
      window.sessionStorage.setItem('activePath', activePath);
      this.activePath = activePath;
    }
  },
};
</script>


<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.home-container {
  height: 100%;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}

</style>