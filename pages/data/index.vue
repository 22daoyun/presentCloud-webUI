<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看字典</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
    
      <el-main>
        <div>
          <!-- 卡片视图区域 -->
          <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input placeholder="请输入内容" v-model="searchName" clearable @clear="getDataList">
                  <el-button slot="append" icon="el-icon-search" @click="getDataList"></el-button>
                </el-input>
              </el-col>
            </el-row>
            <br />
            <!-- 用户列表区域 -->
            <!-- datalist是数据源头 -->
            <el-table :data="datalist" border stripe>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="字典名" prop="name"></el-table-column>
              <el-table-column label="ID" prop="id"></el-table-column>
              <el-table-column label="操作" width="150%">
                <template slot-scope="scope">
                  <!-- 详情按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-more-outline"
                    @click="showEditDialog(scope.row)"
                  ></el-button>
                  <!-- 删除按钮 -->
                  <el-button type="danger" icon="el-icon-delete"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <!-- 展示详情的对话框 -->
          <el-dialog
            :title="dataName"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
          >
            <el-button type="success" @click="goEditPage">添加数据字典项</el-button>
            <br />
            <el-table :data="detail" border stripe>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="值(value)" prop="itemKey"></el-table-column>
              <el-table-column label="默认值" prop="isdefault" :formatter="stateFormat"></el-table-column>
              <el-table-column label="ID" prop="id"></el-table-column>
              <el-table-column label="所属字典ID" prop="dictId"></el-table-column>
              <el-table-column label="操作" width="150%">
                <template slot-scope="scope">
                  <!-- 编辑按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit-outline"
                    @click="goEditPage(scope.row)"
                  ></el-button>
                  <!-- 删除按钮 -->
                  <el-button type="danger" icon="el-icon-delete"></el-button>
                </template>
              </el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editUserInfo">确 定</el-button>
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
      searchName: "",
      editDialogVisible: false,
      value: "",
      dataName: "",
      datalist: [],
      detail: []
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    stateFormat(row, column) {
      if (row.isdefault == true) {
        return "是";
      } else {
        return "否";
      }
    },
    async getDataList() {
      console.log("loading data list");
      const { data: res } = await this.$axios.get("/dict/findAllDict");
      // const { data: res } = await this.$axios.get("/user/findAllUsersGoPage");
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("获取数据字典列表失败！");
      }
      this.datalist = res.data;
      console.log(this.datalist);
    },
    async showEditDialog(data) {
      console.log(data);
      var qs = require("qs");
      const { data: res } = await this.$axios.post(
        "/dict/findByDictForDictInfo",
        data
      );
      console.log(res.data);
      if (res.code != 200) {
        return this.$message.error("查询字典信息失败！");
      }
      this.detail = res.data;
      this.dataName=data.name
      this.editDialogVisible = true;
    },
    // // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      // this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo() {
      // this.$refs.editFormRef.validate(async valid => {
      //   if (!valid) return;
      //   // 发起修改用户信息的数据请求
      //   const { data: res } = await this.$http.put(
      //     "users/" + this.editForm.id,
      //     {
      //       email: this.editForm.email,
      //       mobile: this.editForm.mobile
      //     }
      //   );
      //   if (res.meta.status !== 200) {
      //     return this.$message.error("更新用户信息失败！");
      //   }
      //   // 关闭对话框
      //   this.editDialogVisible = false;
      //   // 刷新数据列表
      //   this.getUserList();
      //   // 提示修改成功
      //   this.$message.success("更新用户信息成功！");
      // });
    },
    // getDataList() {
    //   console.log(this.datalist);
    //   this.datalist = [
    //     {
    //       dataName: "学历",
    //       dataDes: "描述"
    //     }
    //   ];
    // },
    goEditPage(row, dataName) {
      console.log(row.key, dataName);
      this.$router.push({
        path: "/data/create", //跳转的页面
        query: {
          key: row.key,
          value: row.value,
          default: row.default,
          name: dataName
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>