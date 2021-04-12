<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据字典录入</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
      
      <el-main>
        <div class="create">
          <el-card>
            
            <!-- 内容主体区域 -->
            <el-form :model="addForm" ref="addFormRef" label-width="120px">
              <el-form-item label="字典所属id" prop="class">
                <el-select v-model="addForm.class" placeholder="请选择数据字典类别">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.id"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="字典id(key)" prop="key">
                <el-input v-model="addForm.key"></el-input>
              </el-form-item> -->
              <el-form-item label="字典值(value)" prop="value">
                <el-input v-model="addForm.value"></el-input>
              </el-form-item>
              <el-form-item label="是否默认值" prop="mobile">
                <el-radio v-model="addForm.default" label="true">是</el-radio>
                <el-radio v-model="addForm.default" label="false">否</el-radio>
              </el-form-item>
            </el-form>
          </el-card>
          <!-- 底部区域 -->
          <span class="button">
            <el-button type="primary" @click="submitForm">确 定</el-button>
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
      id: "",
      options: [
        
        
      ],
      value: "",
      addForm: {
        class: "",
        key: "",
        value: "",
        default: "false"
      },
      // 添加表单的验证规则对象
      // addFormRules: {
      //   class: [{  }],
      //   key: [
      //     { message: "请输入", trigger: "blur" },
      //     {
      //       min: 1,
      //       max: 10,
      //       message: "字典名的长度在3~10个字符之间",
      //       trigger: "blur"
      //     }
      //   ],
      //   value: [
      //     {  message: "请输入", trigger: "blur" },
      //     {
      //       min: 1,
      //       max: 10,
      //       message: "字典值的长度在6~10个字符之间",
      //       trigger: "blur"
      //     }
      //   ]
      // }
    };
  },
  created() {
    this.getParams();
  },
  methods: {
    submitForm(formName) {
      
        var qs = require("qs");
         
        this.$axios.post(
            "/dict/addDictinfo",
            { 
              dictId: this.addForm.class,
              isdefault: this.addForm.default,
              
              itemKey: this.addForm.value,
             }
          ).then(res => {
                

          console.log(res);
          if (res.data.code != 200) {
            this.$message.error("添加字典失败！");
          } else {
            this.$message.success("添加字典成功！");
            this.$router.push("/data");
          }})


        
        
     
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getParams() {
      
      const routerParams = this.$route.query.key;
      // 将数据放在当前组件的数据内
       this.addForm.key = routerParams;
      
       this.addForm.value = this.$route.query.value;
       this.addForm.class = this.$route.query.dictId;
       
      // if (this.$route.query.default == 'true' ) {
      //   this.addForm.default = "1";
      // }else{
      //   this.addForm.default = "2";
      // }
      console.log(this.addForm);

      const { data: res } = await this.$axios.get("/dict/findAllDict");
      console.log(res);
      
      this.options = res.data;
      console.log(this.options);
    }
  }
};
</script>

<style  lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  width: 600px;
  height: 220px;
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