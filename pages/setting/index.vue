<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统参数管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看参数</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
      
      <el-main>
        <div>
          <!-- 卡片视图区域 -->
          <el-card>
            <!-- 用户列表区域 -->
            <!-- datalist是数据源头 -->
            <el-table :data="paramsList" border stripe>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="ID" prop="id"></el-table-column>
              <el-table-column label="名称(key)" prop="keyName"></el-table-column>
              <el-table-column label="值(value)" prop="value"></el-table-column>
              <el-table-column label="操作" width="150%">
                <template slot-scope="scope">
                  <!-- 修改按钮 -->
                  <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-dialog
            title="修改参数"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
          >
            <el-form :model="editForm" ref="editFormRef" label-width="70px">
              <el-form-item label="ID">
                <el-input v-model="editForm.id" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="editForm.keyName" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="经验值">
                <el-input v-model="editForm.value"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editParaInfo">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      value: "",
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      paramsList: [],
      editForm: {}
    };
  },
  created() {
    this.getParamsList();
  },
  methods: {
    //获取参数表
    async getParamsList() {
      const { data: res } = await this.$axios.get("/param/getallParam");
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("获取参数列表失败！");
      }
      this.paramsList = res.data;
    },
    showEditDialog(data) {
      console.log(data);
      this.editForm = data;
      this.editDialogVisible = true;
    },
    async editParaInfo() {
      var qs = require("qs");
      let postForm = {
        id: this.editForm.id + "",
        key: this.editForm.keyName,
        value: this.editForm.value
      };
      console.log("修改后参数")
      console.log(postForm);
      const { data: res } = await this.$axios.post(
        "/param/update",
        qs.stringify(postForm)
      );
      // 关闭对话框
      this.editDialogVisible = false;
      this.getParamsList();
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    }
  }
};
</script>


<style lang="less" scoped>
</style>