<template>
<div class="sideBar">
<el-row class="s">
  
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router>
      
      <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
       
      

      <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>班课管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/class">查看班课</el-menu-item>
                <el-menu-item index="/class/create">新增班课</el-menu-item>
              </el-menu-item-group>
      </el-submenu>
        

      <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user">查看用户</el-menu-item>
          <el-menu-item index="/user/create">新增用户</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="role">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>角色管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/role">查看角色</el-menu-item>
          <el-menu-item index="/role/create">新增角色</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


    </el-menu>
  
</el-row>
<div class="footer">
    <p>
        ©Copyright 2021 22小组
    </p>
    </div>
</div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
.footer{

  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  color:rgb(141, 139, 139);

}
</style>