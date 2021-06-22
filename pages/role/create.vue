<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增角色</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
      
      <el-main>
        <el-col :span="10" class="create">
          <el-form :model="roleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名">
              <el-input v-model="roleForm.rolename"></el-input>
            </el-form-item>
            <el-form-item>
              <div style="margin: 15px 0;"></div>
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedRights" @change="handleCheckedRightsChange">
                <el-checkbox v-for="right in rights" :label="right" :key="right">{{right}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addUser">立即创建</el-button>
              <el-button @click="resetForm('roleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
const cityOptions = ["用户管理", "菜单管理", "角色管理", "权限管理"];

export default {
  
  data() {
    return {
      checkAll: false,
      checkedRights: [],
      rights: [],
      isIndeterminate: true,
      roleForm: {
        roleName: ""
      },
      rules: {
        role: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        description: [
          { required: false, message: "请输入班级名", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getOptions();
  },
  methods: {
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
    async addUser() {
      var qs = require("qs");
      console.log(this.Role);
      console.log(this.checkedRights)
      var test = this.checkedRights
      var temp = JSON.stringify(Object.values(test));
      console.log(temp)
      // temp=temp.replace(/&/g, '&')
      const { data: res } = await this.$axios.post(
        "/role/addRolePermission",
        qs.stringify({ rolename:this.roleForm.rolename,permissions: temp })
      );
      console.log(res);
      if (res.code != 200) {
        this.$message.error("添加角色失败！");
      } else {
        this.$message.success("添加角色成功！");
        this.$router.push("/role");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.create {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>