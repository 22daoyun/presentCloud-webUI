<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看角色</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
     
      <el-main>
        <div>
          <!-- 卡片视图 -->
          <el-card>
            <!-- 添加角色按钮区域 -->
            <el-row>
              <el-col>
                <el-button type="primary"  @click="toAdd()">
                  添加角色
                </el-button>
              </el-col>
            </el-row>
            <br />
            <!-- 角色列表区域 -->
            <el-table :data="rolelist" border stripe>
              <!-- 索引列 -->
              <el-table-column label="#" type="index"></el-table-column>
              <el-table-column label="角色名称" prop="roleName"></el-table-column>
              <el-table-column label="角色id" prop="roleId"></el-table-column>
              <el-table-column label="角色创建人" prop="creator"></el-table-column>
              <el-table-column label="创建时间" :formatter="dateFormat" prop="creationdate"></el-table-column>
              <el-table-column label="角色修改人" prop="modifier"></el-table-column>
              <el-table-column label="修改时间" :formatter="dateFormat" prop="modificationdate"></el-table-column>
              <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    @click="showEditDialog(scope.row)"
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="delRole(scope.row)"
                  >删除</el-button>
                  <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-setting"
                    @click="showRightDialog(scope.row)"
                  >权限</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <!-- 分配权限的对话框 -->
          <el-dialog
            title="权限"
            :visible.sync="RightDialogVisible"
            width="50%"
            @close="RightDialogClosed"
          >
            当前权限
            <el-table :data="rightslist">
              <el-table-column prop="name" label="权限名"></el-table-column>
              <el-table-column prop="permissionId" label="权限ID"></el-table-column>
              <el-table-column prop="type" label="权限类型"></el-table-column>
            </el-table>
            <!-- 分配权限 -->
            分配权限
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedRights" @change="handleCheckedRightsChange">
              <el-checkbox v-for="right in rights" :label="right" :key="right">{{right}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
              <el-button @click="RightDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="setRights">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 修改用户的对话框 -->
          <el-dialog
            title="修改角色"
            :visible.sync="editDialogVisible"
            width="30%"
            @close="editDialogClosed"
          >
            <el-form :model="editForm" ref="editFormRef" label-width="70px">
              <el-form-item label="ID">
                <el-input v-model="editForm.roleId" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="角色名">
                <el-input v-model="editForm.roleName"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editRoleInfo">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import moment from "moment";
export default {
  
  data() {
    return {
      postForm: {},
      // 所有角色列表数据
      rolelist: [],
      // 控制分配权限对话框的显示与隐藏
      RightDialogVisible: false,
      // 所有权限的数据
      rightslist: [],
      //当前分配的角色
      Role: {},
      checkAll: false,
      checkedRights: [],
      rights: [],
      isIndeterminate: true,
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: {}
    };
  },
  created() {
    this.getRolesList();
    this.getOptions();
  },
  methods: {
    //时间格式化
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    toAdd(){
      this.$router.push("/role/create");
    },
    // 获取所有角色的列表
    async getRolesList() {
      const { data: res } = await this.$axios.get("/role/findAllRoles");
      // const { data: res } = await this.$axios.get("/user/findAllUsersGoPage");
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("获取角色列表失败！");
      }
      this.rolelist = res.data;
    },
    //删除角色
    async delRole(data) {
      var qs = require("qs");
      this.postForm.rolename = data.roleName;
      console.log(this.postForm);
      const { data: res } = await this.$axios.post(
        "/role/delete",
        qs.stringify({ rolename: this.postForm.rolename })
      );
      console.log(res);
    },
    // 展示分配权限的对话框
    async showRightDialog(object) {
      console.log(object);
      this.Role = object;
      // 获取所有权限的数据
      var qs = require("qs");
      this.postForm.rolename = object.roleName + "";
      const { data: res } = await this.$axios.post(
        "/role/findRolePermission",
        qs.stringify({ rolename: this.postForm.rolename })
      );

      console.log("当前角色权限");
      console.log(res.data);
      if (res.code != 200) {
        return this.$message.error("获取权限数据失败！");
      }
      this.rightslist = res.data.permissions;
      console.log(this.rightslist);
      this.RightDialogVisible = true;
    },
    // 监听分配权限对话框的关闭事件
    RightDialogClosed() {
      this.defKeys = [];
    },
    // 获取权限列表
    async getOptions() {
      // const { data: res } = await this.$axios.get("/permission/getNames");
      const { data: res } = await this.$axios.get("/permission/getTypes");
      this.rights = res.data;
      console.log(res.data);
    },
    handleCheckAllChange(val) {
      this.checkedRights = val ? this.rights : [];
      this.isIndeterminate = false;
    },
    handleCheckedRightsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.rights.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.rights.length;
    },
    async setRights() {
      var qs = require("qs");
      console.log(this.Role);
      console.log(this.checkedRights);
      var test = this.checkedRights;
      var temp = JSON.stringify(Object.values(test));
      console.log(temp);
      // temp=temp.replace(/&/g, '&')
      const { data: res } = await this.$axios.post(
        "/role/updateRolePermission",
        qs.stringify({
          roleId: this.Role.roleId,
          rolename: this.Role.roleName,
          permissions: temp
        })
      );
      if (res.code != 200) {
        this.$message.error("设置权限失败！");
      } else {
        this.$message.success("设置权限成功！");
      }
      this.RightDialogVisible = false;
    },
    async showEditDialog(data) {
      this.editForm = data;
      console.log(this.editForm);
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    async editRoleInfo() {
      // 发起修改用户信息的数据请求
      var qs = require("qs");
      console.log(this.editForm);
      let Role = this.editForm;
      console.log("参数");
      console.log(Role);
      const { data: res } = await this.$axios.post(
        "/role/update",
        qs.stringify({
          id: this.editForm.roleId,
          rolename: this.editForm.roleName
        })
      );
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("更新失败！");
      }
      // 关闭对话框
      this.editDialogVisible = false;
      // 提示修改成功
      this.$message.success("更新成功！");
    },
    async delRole(data) {
      this.editForm=data;
      var qs = require("qs");
      console.log(this.editForm);
      const { data: res } = await this.$axios.post(
        "/role/delete",
        qs.stringify({rolename:this.editForm.roleName})
      );
       if (res.code != 200) {
          return this.$message.error("删除失败！");
        }
        // 刷新数据列表
        this.getRolesList();
        // 提示修改成功
        this.$message.success("删除成功！");
    }
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>