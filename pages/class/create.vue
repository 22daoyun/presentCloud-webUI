<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>班课管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增班课</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
      
      <el-main>
        <div class="create">
          <el-card>
            <!-- 内容主体区域 -->
            <el-form label-width="120px">
              <el-form-item label="班课id">
                <el-input v-model="Classes.classesId"></el-input>
              </el-form-item>
              <el-form-item label="班课名">
                <el-input v-model="Classes.classesName"></el-input>
              </el-form-item>
              <el-form-item label="学院">
                <el-input v-model="Classes.department"></el-input>
              </el-form-item>
              <el-form-item label="学校">
                <el-input v-model="Classes.school"></el-input>
              </el-form-item>
                <el-form-item label="教师id">
                <el-input v-model="Classes.teacher_id"></el-input>
              </el-form-item>
                <el-form-item label="教师名">
                <el-input v-model="Classes.teacher_name"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
          <!-- 底部区域 -->
          <span class="button">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button>重 置</el-button>
          </span>
        </div>
        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      Classes: {}
    };
  },
  methods: {
    async submitForm() {
      const { data: res } = await this.$axios.post(
        "/app/class/createClass",
        this.Classes
      );
      console.log(res);
      if (res.code != 200) {
        this.$message.error("添加班课失败！");
      } else {
        this.$message.success("添加班课成功！");
        this.$router.push("/class");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  width: 600px;
  height: 400px;
}
.create {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button {
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>