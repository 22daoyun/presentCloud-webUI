<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据层级展示</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
    
      <el-main>
        <el-card>
          <template>
            <el-table :data="tableData">
              <!-- 一级嵌套 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-table :data="scope.row.children" :show-header="false">
                    <!-- 二级嵌套 -->
                    <el-table-column type="expand">
                      <template slot-scope="scope">
                        <el-table :data="scope.row.children" :show-header="false">
                          <!-- 三级嵌套 -->
                          <el-table-column type="expand">
                            <template slot-scope="scope">
                              <el-table :data="scope.row.children" :show-header="false">
                                <el-table-column prop="name"></el-table-column>
                                <el-table-column label="操作" align="right">
                                  <template slot-scope="scope">
                                    <el-button size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                                    <el-button size="mini" type="danger">删除</el-button>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </template>
                          </el-table-column>
                          <el-table-column prop="name"></el-table-column>
                          <el-table-column label="操作" align="right">
                            <template slot-scope="scope">
                              <el-button size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                              <el-button size="mini" type="danger">删除</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name"></el-table-column>
                    <el-table-column label="操作" align="right">
                      <template slot-scope="scope">
                        <el-button size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="delData">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column label="数据 ID" prop="id"></el-table-column>
              <el-table-column label="数据名称" prop="name"></el-table-column>
              <el-table-column label="描述" prop="desc"></el-table-column>
              <el-table-column label="操作" align="right">
                <template slot-scope="scope">
                  <el-button size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="delData">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-card>
        <!-- 修改用户的对话框 -->
        <el-dialog
          title="修改菜单"
          :visible.sync="editDialogVisible"
          width="30%"
          @close="editDialogClosed"
        >
          <el-form :model="editForm" ref="editFormRef" label-width="70px">
            <el-form-item label="ID">
              <el-input v-model="editForm.id" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="名称">
              <el-input v-model="editForm.name" ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editDataInfo">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>


<script>

let id = 1000;
export default {
  methods: {
    async showEditDialog(data) {
      this.editForm = data;
      console.log(this.editForm);
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    editDataInfo(){
      this.tableData[0].children[0].name="福建大学"
      this.editDialogVisible = false;
    },
    delData(){
      this.tableData[0].children.splice(0,1)
      console.log("delete")
    }
  },
  
  data() {
    return {
      editForm: {},
      editDialogVisible: false,
      tableData: [
        {
          id: "1",
          name: "学校/学院/专业",
          desc: "描述学生所属学校/学院/专业信息",
          children: [
            {
              id: "11",
              name: "福州大学",
              children: [
                {
                  id: "111",
                  name: "数学与计算机学院",
                  children: [
                    { id: "1111", name: "计算机技术" },
                    { id: "1112", name: "软件工程" },
                    { id: "1113", name: "应用数学" }
                  ]
                },
                { id: "112", name: "机械工程学院" },
                { id: "113", name: "土木工程学院" }
              ]
            },
            { id: "12", name: "厦门大学" },
            { id: "13", name: "福建师范大学" }
          ]
        },
        {
          id: "2",
          name: "省/市/县",
          desc: "描述学生所属省/市/县信息",
          children: [
            {
              id: "21",
              name: "福建",
              children: [
                {
                  id: "211",
                  name: "福州",
                  children: [
                    { id: "2111", name: "鼓楼区" },
                    { id: "2112", name: "晋安区" },
                    { id: "2113", name: "台江区" }
                  ]
                },
                { id: "212", name: "厦门" },
                { id: "213", name: "泉州" }
              ]
            },
            { id: "22", name: "浙江" },
            { id: "23", name: "广东" }
          ]
        }
      ]
    };
  }
};
</script>

<style>
</style>