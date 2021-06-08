<template>
  <div>
    <div class="head">欢迎光临到云后台管理系统</div>
    <!-- <el-row type="flex" class="navs">
        <nuxt-link to="/">系统首页</nuxt-link>
        <nuxt-link to="/user">用户管理</nuxt-link>
        <nuxt-link to="/role">角色管理</nuxt-link>
        <nuxt-link to="/class">班课管理</nuxt-link>
        <nuxt-link to="/menu">菜单管理</nuxt-link>
        <nuxt-link to="/authority">权限管理</nuxt-link>
        <nuxt-link to="/data">数据字典</nuxt-link>
        <nuxt-link to="/setting">参数设置</nuxt-link>
      </el-row> -->
    <el-card >
      <el-calendar ></el-calendar>
      
    </el-card>
  </div>
</template>




<style scoped lang="less">
.navs {
    
    flex: 1;
    a {
      display: block;
      padding: 20px 20px;
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
.time {
  font-size: 13px;
  color: #999;
}
.head {
  font-size: 20px;
  color: #409eff;
  margin-bottom: 20px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  height: 240px;
}
</style>

<script>
export default {
  data() {
    return {
      value: new Date()
    };
  }
};
</script>