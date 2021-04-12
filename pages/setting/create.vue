<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统参数管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增参数</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
     
      <el-main>
        <div class="create">
          <el-card>
            <!-- 内容主体区域 -->
            <el-form label-width="70px">
              <el-form-item label="参数名称">
                <el-input v-model="Param.keyName"></el-input>
              </el-form-item>

              <el-form-item label="参数值">
                <el-input v-model="Param.value"></el-input>
              </el-form-item>
              
            </el-form>
          </el-card>
          <!-- 底部区域 -->
          <span class="button">
            <el-button type="primary" @click="addParam">确 定</el-button>
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
      Param: {
        
      },
      
    };
  },
  methods: {
    async addParam() {
      const { data: res } = await this.$axios.post(
        "/param/addParam",
        this.Param
      );
      console.log(res);
      if (res.code != 200) {
        this.$message.error("添加失败！");
      } else {
        this.$message.success("添加成功！");
        this.$router.push("/setting");
      }
    }
  }
};
</script>

<style  lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  width: 600px;
  height: 180px;
}
.create {
  position: absolute;
  top: 30%;
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
