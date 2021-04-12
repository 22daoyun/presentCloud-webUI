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
            <!-- 搜索与添加区域 -->
              <el-row :gutter="20">
                <!-- <el-col :span="8">
                  <el-input placeholder="请输入内容" clearable>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-col>-->
                <el-col :span="4">
                  <el-button type="primary">
                    <nuxt-link to="/setting/create">新增参数</nuxt-link>
                  </el-button>
                </el-col>
              </el-row>
              <br />
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
                <el-button type="danger" icon="el-icon-delete" @click="deleteParm(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-dialog
            title="修改参数"
            :visible.sync="editDialogVisible"
            :v-if="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
          >
            <el-form :model="editForm" ref="editForm" label-width="70px">
              <el-form-item label="ID">
                <el-input v-model="editForm.id" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="editForm.keyName" ></el-input>
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
      // value: "",
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
      const { data: res } = await this.$axios.get("/param/getAllParam");
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
      
      console.log("修改后参数");
      console.log(this.editForm);
      const { data: res } = await this.$axios.post(
        "/param/update",
        qs.stringify({id: this.editForm.id + "",
        key: this.editForm.keyName,
        value: this.editForm.value})
      );

      if (res.code != 200) {
        this.$message.error("修改失败！");
      } else {
        this.$message.success("修改成功！");
      }
      // 关闭对话框
      this.editDialogVisible = false;
      this.getParamsList();
    },

    async deleteParm(data){
      var qs = require("qs");
      
      console.log(data);
      const { data: res } = await this.$axios.post(
        "/param/delete",
        qs.stringify({ id: data.id })
      );
      console.log(res);
      if (res.code != 200) {
          return this.$message.error("删除失败！");
        }else{
        // 刷新数据列表
        this.getParamsList();
        // 提示修改成功
        this.$message.success("删除成功！");}
    },

    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
        this.$refs.editForm.resetFields();
        this.getParamsList();
        
    }
  }
};
</script>


<style lang="less" scoped>
</style>