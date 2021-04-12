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
              <el-col :span="4">
                <el-button type="primary">
                  <nuxt-link to="/data/createData">新增字典</nuxt-link>
                </el-button>
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
                  <el-button type="danger" icon="el-icon-delete" @click="delData(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <!-- 展示详情的对话框 -->
          <el-dialog
            :title="dataName"
            :visible.sync="showDialogVisible"
            width="50%"
            @close="showDialogClosed"
          >
            <el-button type="success" @click="goEditPage1(dataid)">添加数据字典项</el-button>
            <br />
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
                    @click="goEdit(scope.row)"
                  ></el-button>
                  <!-- 删除按钮 -->
                  <el-button type="danger" icon="el-icon-delete" @click="delDatainfo(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>


          </el-dialog>

          <el-dialog
              title="修改字典信息"
              :visible.sync="editDialogVisible"
              width="30%"
              @close="editDialogClosed"
            >
              <el-form :model="editForm" ref="editFormRef" label-width="70px">
                <el-form-item label="ID">
                  <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                
                <el-form-item label="所属id">
                  <el-input v-model="editForm.dictId" disabled></el-input>
                </el-form-item>
                <el-form-item label="默认值">
                  <el-input v-model="editForm.isdefault" disabled></el-input>
                </el-form-item>
                <el-form-item label="值">
                  <el-input v-model="editForm.itemKey"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDictinfo">确 定</el-button>
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
      showDialogVisible: false,
      
      dataName: "",
      dataid: "",
      datalist: [],
      detail: [],
      editForm: {itemKey:""},
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
      this.dataName = data.name;
      this.dataid = data.id;
        console.log(this.dataName);
        console.log(this.dataid);
      this.showDialogVisible = true;
    },

    async delData(data) {
      var qs = require("qs");
      
      console.log(data);
      const { data: res } = await this.$axios.post(
        "/dict/deleteDict",
        qs.stringify({ dictId: data.id })
      );
      console.log(res);
      if (res.code != 200) {
          return this.$message.error("删除失败！");
        }else{
        // 刷新数据列表
        this.getDataList();
        // 提示修改成功
        this.$message.success("删除成功！");}
    },

    async delDatainfo(row) {
      var qs = require("qs");
         
          const { data: res } = await this.$axios.post(
            "/dict/deleteDictInfo",
            qs.stringify({ 
              dictInfoId : row.id
             })
          );
          console.log(res);
          if (res.code != 200) {
            this.$message.error("删除失败！");
          } else {
            this.$message.success("删除成功！");
            this.showDialogVisible = false;
          }

    },

    // // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      // this.$refs.editFormRef.resetFields();
    },
    showDialogClosed() {
      // this.$refs.editFormRef.resetFields();
    },
   
    async editDictinfo() {
      var qs = require("qs");
      console.log(this.editForm);
      const { data: res } = await this.$axios.post(
        "/dict/updateDictInfo",
        this.editForm
      );
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("更新失败！");
      }
      this.editDialogVisible = false;
      this.getDataList();
      this.$message.success("更新成功！");
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

    goEdit(row) {
      this.editForm.id = row.id;
      this.editForm.itemKey = row.itemKey;
      this.editForm.dictId = row.dictId;
      this.editForm.isdefault = row.isdefault;

      this.showDialogVisible = false;
      this.editDialogVisible = true;

      // console.log(row);
      // this.$router.push({
      //   path: "/data/create", //跳转的页面
      //   query: {
      //     key: row.id,
      //     value: row.itemKey,
      //     default: row.isdefault,
      //     dictId: row.dictId
      //   }
      // });
    },
    goEditPage1(dataid) {
      console.log(dataid);
      this.$router.push({
        path: "/data/create", //跳转的页面
        query: {
          
          dictId: dataid
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>