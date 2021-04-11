<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增权限</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
   
      <el-main>
        <el-col :span="10" class="create">
          <el-form
            :model="Permission"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="权限名" prop="authName">
              <el-select v-model="Permission.name" multiple filterable placeholder="请选择权限名称">
                <el-option v-for="item in optionsAuth" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属类型" prop="module">
              <el-select v-model="Permission.type" filterable allow-create placeholder="请选择或输入所属类型">
                <el-option v-for="item in optionsType" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="createAuth">添加</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
 
  data() {
    return {
      optionsType: [],
      optionsAuth: [],
      Permission: {},
      rules: {
        authName: [
          { required: true, message: "请输入角色名", trigger: "blur" }
        ],
        module: [
          { required: true, message: "请选择所属模块", trigger: "blur" }
        ],
        function: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个权限",
            trigger: "change"
          }
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
      const { data: res1 } = await this.$axios.get("/permission/getTypes");
      this.optionsType = res1.data;
      console.log(res1.data);
      const { data: res2 } = await this.$axios.get("/permission/getNames");
      this.optionsAuth = res2.data;
      console.log(res2.data);
    },
    //创建权限
    async createAuth() {
      console.log(this.Permission);
      var qs = require("qs");
      let auth = {};
      auth.type = this.Permission.type;
      auth.names = this.Permission.name;
      console.log(auth);
      var test = this.Permission.name;
      var temp = JSON.stringify(Object.values(test));
      //var test=this.Permission.name;
      console.log(Object.keys(test));
      console.log(Object.values(test));
      console.log(temp);
      console.log(qs.stringify({ type: this.Permission.type, names: temp }));
      const { data: res } = await this.$axios.post(
        "/permission/addPermissions",
        qs.stringify({ type: this.Permission.type, names: temp })
        //{ type: auth.type, names: test }
      );
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("创建权限信息失败！");
      }
      this.editDialogVisible = false;
      this.$router.push("/authority");
      this.$message.success("创建权限信息成功！");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.create {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>