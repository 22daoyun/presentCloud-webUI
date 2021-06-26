<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看权限</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
      
      <el-main>
        <!-- 卡片视图 -->
        <el-card>
          <!-- 添加权限按钮区域 -->
          <el-row>
            <el-col>
              <el-button type="primary"  @click="toAdd()">
                添加权限
              </el-button>
            </el-col>
          </el-row>
          <br />
          <el-table :data="rightsList" border stripe>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="权限名称" prop="name"></el-table-column>
            <el-table-column label="权限ID" prop="permissionId"></el-table-column>
            <el-table-column label="权限类型" prop="type"></el-table-column>
            <el-table-column label="操作" width="150%">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
                <!-- 删除按钮 -->
                <el-button type="danger" icon="el-icon-delete" @click="deleteAuth(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <!-- 修改用户的对话框 -->
        <el-dialog
          title="修改权限"
          :visible.sync="editDialogVisible"
          width="50%"
          @close="editDialogClosed"
        >
          <el-form :model="editForm" ref="editFormRef" label-width="70px">
            <el-form-item label="权限ID">
              <el-input v-model="editForm.permissionId" disabled></el-input>
            </el-form-item>
            <el-form-item label="权限名">
              <el-input v-model="editForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="权限类型">
              <el-input v-model="editForm.type"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editAuthInfo">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import moment from "moment";
export default {
  
  data() {
    return {
      // 权限列表
      rightsList: [],
      editForm: {},
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false
    };
  },
  created() {
    // 获取所有的权限
    this.getRightsList();
  },
  methods: {
    // 获取权限列表
    async getRightsList() {
      const { data: res } = await this.$axios.get(
        "/permission/findAllPermission"
      );
      if (res.code != 200) {
        return this.$message.error("获取菜单列表失败！");
      }
      this.rightsList = res.data;
      console.log(res.data);
    },
    // 展示编辑用户的对话框
    async showEditDialog(data) {
      console.log(data);
      this.editForm = data;
      console.log(this.editForm);
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    toAdd(){
      this.$router.push("/setting/create");
    },
    async editAuthInfo() {
      console.log(this.editForm);
      var qs = require("qs");
      let postForm = {};
      postForm.id = this.editForm.permissionId;
      postForm.authName = this.editForm.name;
      postForm.module = this.editForm.type;
      const { data: res } = await this.$axios.post(
        "/permission/edit",
        qs.stringify(postForm)
      );
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("更新权限信息失败！");
      }
      this.editDialogVisible = false;
      this.getRightsList();
      this.$message.success("更新权限信息成功！");
    },
    async deleteAuth(object) {
      console.log(object);
      var qs = require("qs");
      const { data: res } = await this.$axios.post(
        "/permission/delete",
        object
      );
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("删除权限信息失败！");
      }
      this.editDialogVisible = false;
      this.getRightsList();
      this.$message.success("删除权限信息成功！");
    }
  }
};
</script>

<style lang="less" scoped>
</style>