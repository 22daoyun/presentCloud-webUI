<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增字典</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
     
      <el-main>
        <div class="create">
          <el-card>
            <!-- 内容主体区域 -->
            <el-form label-width="70px">
              <el-form-item label="字典名称">
                <el-input v-model="Data.name"></el-input>
              </el-form-item>

              <el-form-item label="关键字">
                <el-input v-model="Data.eng"></el-input>
              </el-form-item>
              
            </el-form>
          </el-card>
          <!-- 底部区域 -->
          <span class="button">
            <el-button type="primary" @click="addData">确 定</el-button>
            <el-button>重 置</el-button>
          </span>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  
  data() {
    
    return {
      Data: {
        
      },
      
    };
  },
  methods: {
    async addData() {
      if(this.Data.eng==null){

        this.$message.error("关键字必填");
        return;
      }
      const { data: res } = await this.$axios.post(
        "/dict/addDict",
        this.Data
      );
      console.log(res);
      if (res.code != 200) {
        this.$message.error("添加失败！");
      } else {
        this.$message.success("添加成功！");
        this.$router.push("/data");
      }
    }
  }
};
</script>

<style  lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  width: 600px;
  height: 150px;
}
.create {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button {
  position: absolute;
  top: 150%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
