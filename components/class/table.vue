<!-- 应调用接口通过班课表获得数据，编辑和删除应该通过接口进行数据库数据更新，点击查看后，调用接口传递班课id查询课程表，获得该班课所有学生账号，然后再通过账号查询用户表获得信息，具体见show组件 -->
<!-- 编辑时学校、学院应用选择器，具体数据调用接口获得学校信息表 -->
<template>
  <div>
    <!-- 添加权限按钮区域 -->
    <el-row>
      <el-col>
        <el-button type="primary">
          <nuxt-link to="/class/show">新增班课</nuxt-link>
        </el-button>
      </el-col>
    </el-row>
    <br>
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="class_id" label="班课号" width="150"></el-table-column>
      <el-table-column prop="class_name" label="班级名" width="100"></el-table-column>
      <el-table-column prop="school" label="学校" width="100"></el-table-column>
      <el-table-column prop="college" label="学院" width="100"></el-table-column>
      <el-table-column prop="name" label="教师名" width="80"></el-table-column>
      <el-table-column prop="id" label="教师账号" width="150"></el-table-column>
      <el-table-column prop="description" label="班级描述" width="220"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <nuxt-link to="/class/show">
            <el-button size="mini" @click="show(scope.$index, scope.row)">查看</el-button>
          </nuxt-link>
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
        <el-form-item label="班课号" prop="class_id">
          <el-input v-model="editForm.class_id" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="班级名" prop="class_name">
          <el-input v-model="editForm.class_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="editForm.school" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="editForm.college" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教师名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="教师账号" prop="id">
          <el-input v-model="editForm.id" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="班级描述" prop="description">
          <el-input v-model="editForm.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('editForm')">取消</el-button>
        <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editForm: {
        class_id: "",
        class_name: "",
        school: "",
        college: "",
        name: "",
        id: "",
        description: "",
        index: 0
      },
      //定义属性
      class_id: undefined,
      class_name: undefined,
      school: undefined,
      college: undefined,
      name: undefined,
      id: undefined,
      description: undefined,
      //默认dialog弹窗不打开（true打开，false为不打开）
      editFormVisible: false,
      //模拟表格数据
      tableData: [
        {
          class_id: "536788",
          class_name: "软件工程",
          school: "福州大学",
          college: "数计学院",
          name: "王明1",
          id: "170023043",
          description: "进行软件工程授课"
        },
        {
          class_id: "536788",
          class_name: "软件工程",
          school: "福州大学",
          college: "数计学院",
          name: "王明",
          id: "170023045",
          description: "进行软件工程授课"
        },
        {
          class_id: "536788",
          class_name: "软件工程",
          school: "福州大学",
          college: "数计学院",
          name: "王明",
          id: "170023045",
          description: "进行软件工程授课"
        },
        {
          class_id: "536788",
          class_name: "软件工程",
          school: "福州大学",
          college: "数计学院",
          name: "王明",
          id: "170023045",
          description: "进行软件工程授课"
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
    show(index, row) {},
    handleCancel(formName) {
      this.editFormVisible = false;
    },
    //更新
    handleUpdate(forName) {
      //dialog页面数据写入到tableData页面上
      //this.$set(tableName,talbeIndex,data)
      this.$set(this.tableData, this.editForm.index, {
        class_id: this.editForm.class_id,
        name: this.editForm.name,
        id: this.editForm.id,
        class_name: this.editForm.class_name,
        school: this.editForm.school,
        college: this.editForm.college,
        description: this.editForm.description
      });
      this.editFormVisible = false;
    }
  }
};
</script>

<style>
</style>