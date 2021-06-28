<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="main">
      <div class="logo">
            <h3>到云后台管理系统</h3>
      </div>

      <el-row type="flex" class="navs">
        <!-- <nuxt-link to="/">系统首页</nuxt-link>
        <nuxt-link to="/user">用户管理</nuxt-link>
        <nuxt-link to="/role">角色管理</nuxt-link>
        <nuxt-link to="/class">班课管理</nuxt-link>
        <nuxt-link to="/menu">菜单管理</nuxt-link>
        <nuxt-link to="/authority">权限管理</nuxt-link>
        <nuxt-link to="/data">数据字典</nuxt-link>
        <nuxt-link to="/setting">参数设置</nuxt-link> -->
      </el-row>

    
        <img class="img" id="logo_img" src="@/assets/logo1.png" />
      
      <el-dropdown style="margin:0 120px 0 5px">
        <span class="el-dropdown-link">
          
          
          个人中心
          
          
          
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <nuxt-link to="/info/personal">个人信息</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="logout">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </div>
</template>

<script>
// import Cookie from "js-cookie";
export default {
    data() {
    return { 
    };
  },
  methods: {
    logout() {
      window.localStorage.removeItem("sid");
      window.localStorage.removeItem("identity");
      // this.$cookies.remove("sid");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped lang="less">
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 2px 2px #eee;

  .main {
    width: 100%;
    margin: 0 auto ;
    .logo{
                color:#7d7d7d;
                float: left;
                font-size: 23px;
                margin-left: 20px;
            }
  }

  .navs {
    flex: 1;
    a {
      display: block;
      padding: 0 20px;
      height: 60px;
      box-sizing: border-box;

      &:hover {
        color: #409eff;
        border-bottom: 5px #409eff solid;
      }

      &:active {
        background: #409eff;
        color: #fff;
      }
    }
    .nuxt-link-exact-active {
      background: #409eff;
      color: #fff !important;
    }
  }
}
#logo_img {
  width: 50px;
  height: 50px;
  margin: auto;
  position: relative;
  right: 0%;
  // transform: translate(-50%, 0);
  border-radius: 100px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

