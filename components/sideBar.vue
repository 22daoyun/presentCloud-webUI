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


      <el-submenu index="class">
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>班课管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/class">查看班课</el-menu-item>
                <el-menu-item index="/class/create">新增班课</el-menu-item>
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

      <el-submenu index="data">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span>数据字典管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/data">查看字典</el-menu-item>
          <el-menu-item index="/data/create">数据字典录入</el-menu-item>
          <el-menu-item index="/data/show">数据层级展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="setting">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统参数管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/setting">查看参数</el-menu-item>

          
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="authority">
        <template slot="title">
          <i class="el-icon-lock"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/authority">查看权限</el-menu-item>
          <el-menu-item index="/authority/create">新增权限</el-menu-item>
          
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