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
              <el-table-column label="字典名称" prop="name"></el-table-column>
              <el-table-column label="关键字" prop="eng"></el-table-column>
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
            <el-button type="success" @click="goEditPage1(eng,num)">添加数据字典明细</el-button>
            <br />
            <br />
            <el-table :data="detail" border stripe>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="所属字典" prop="dictEng"></el-table-column>
              <el-table-column label="名称" prop="itemValue"></el-table-column>
              <el-table-column label="数值" prop="itemKey"></el-table-column>
              <el-table-column label="默认值" prop="isdefault" :formatter="stateFormat"></el-table-column>
              <!-- <el-table-column label="ID" prop="id"></el-table-column> -->
              
              <el-table-column label="操作" width="250%">
                <template slot-scope="scope">
                  <!-- 编辑按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit-outline"
                    @click="goEdit(scope.row)"
                  ></el-button>
                  <!-- 删除按钮 -->
                  <el-button type="danger" icon="el-icon-delete" @click="delDatainfo(scope.row)"></el-button>

                  <el-button
                    type="primary"
                    @click="goup(scope.row)"
                  >上移</el-button>

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

                <el-form-item label="所属字典">
                  <el-input v-model="editForm.dictEng" disabled></el-input>
                </el-form-item>

                <el-form-item label="名称">
                  <el-input v-model="editForm.itemValue"></el-input>
                </el-form-item>

                <el-form-item label="数值">
                  <el-input v-model="editForm.itemKey"></el-input>
                </el-form-item>

                
                <!-- <el-form-item label="默认值">
                  <el-input v-model="editForm.isdefault" disabled></el-input>
                </el-form-item> -->
                <el-form-item label="默认值" prop="isdefault">
                  <el-radio-group v-model="editForm.isdefault" >
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
                  </el-radio-group>
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
      num:"0",
      dataName: "",
      eng: "",
      datalist: [],
      detail: [],
      editForm: {itemKey:"",isdefault:"false"},
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
      const { data: res } = await this.$axios.post("/dict/findAllDict");
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
        "/dict/findDictInfoByDictEng",
        qs.stringify({ 
              dictEng : data.eng
             })
      );
      console.log(res.data.length);
      if (res.code != 200) {
        return this.$message.error("查询字典信息失败！");
      }
      this.detail = res.data;
      this.dataName = data.name;
      this.eng = data.eng;
      this.num = res.data.length;
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
    async goup(row) {

      console.log(row);
      var qs = require("qs");
         
          const { data: res } = await this.$axios.post(
            "/dict/upward",
            qs.stringify({ 
              dictInfoId : row.id
             })
          );
          console.log(res);
          if (res.code != 200) {
            this.$message.error("上移失败！");
          } else {
            this.$message.success("上移成功！");
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
      this.editForm.dictEng = row.dictEng;
      this.editForm.isdefault = row.isdefault;
      this.editForm.itemValue = row.itemValue;
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
    goEditPage1(eng,num) {
      console.log(eng);
      console.log(num);
      this.$router.push({
        path: "/data/create", //跳转的页面
        query: {
          num: num,
          eng: eng
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>