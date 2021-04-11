<!-- 点击查看后，调用接口传递班课id查询课程表，获得该班课所有学生账号，然后再通过账号查询用户表获得信息,编辑和删除应该调用接口进行数据库的更新 -->
<template>
  <el-card>
    <div>
      <el-table :data="tableData" height="500" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="account" label="账号" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80"></el-table-column>
        <el-table-column prop="role" label="角色" width="100"></el-table-column>
        <el-table-column prop="school" label="学校" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="编辑数据"
        :visible.sync="editFormVisible"
        :close-on-click-modal="false"
        class="edit-form"
      >
        <el-form :model="editForm" label-width="80px" ref="editForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input v-model="editForm.account" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="editForm.sex" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-input v-model="editForm.role" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="学校" prop="school">
            <el-input v-model="editForm.school" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel('editForm')">取消</el-button>
          <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      editForm: {
        name: "",
        account: "",
        sex: "",
        role: "",
        school: "",
        index: 0
      },
      //定义属性
      name: undefined,
      account: undefined,
      sex: undefined,
      role: undefined,
      school: undefined,
      //默认dialog弹窗不打开（true打开，false为不打开）
      editFormVisible: false,
      //模拟表格数据
      tableData: [
        {
          name: "王小虎",
          account: "1903270001",
          sex: "男",
          role: "学生",
          school: "福州大学"
        },
        {
          name: "王小虎",
          account: "1903270001",
          sex: "男",
          role: "学生",
          school: "福州大学"
        },
        {
          name: "王小虎",
          account: "1903270001",
          sex: "男",
          role: "学生",
          school: "福州大学"
        },
        {
          name: "王小虎",
          account: "1903270001",
          sex: "男",
          role: "学生",
          school: "福州大学"
        },
        {
          name: "王小虎",
          account: "1903270001",
          sex: "男",
          role: "学生",
          school: "福州大学"
        },
        {
          name: "王小虎",
          account: "1903270001",
          sex: "男",
          role: "学生",
          school: "福州大学"
        },
        {
          name: "王小虎",
          account: "1903270001",
          sex: "男",
          role: "学生",
          school: "福州大学"
        },
        {
          name: "王小虎",
          account: "1903270001",
          sex: "男",
          role: "学生",
          school: "福州大学"
        },
        {
          name: "王小虎",
          account: "1903270001",
          sex: "男",
          role: "学生",
          school: "福州大学"
        }
      ]
    };
  },
  methods: {
    handleEdit: function(index, row) {
      this.editFormVisible = true; //dialog对话窗口打开
      this.editForm = Object.assign({}, row); //将数据传入dialog页面
      this.editForm.index = index; //传递当前index
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    handleCancel(formName) {
      this.editFormVisible = false;
    },
    //更新
    handleUpdate(forName) {
      //dialog页面数据写入到tableData页面上
      //this.$set(tableName,talbeIndex,data)
      this.$set(this.tableData, this.editForm.index, {
        name: this.editForm.name,
        account: this.editForm.account,
        sex: this.editForm.sex,
        role: this.editForm.role,
        school: this.editForm.school
      });
      this.editFormVisible = false;
    }
  }
};
</script>

<style>
</style>