<template>
  <div>
    <el-container>
      <el-main>
        <el-col :span="10" class="create">
          <el-form
            :model="editForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="editForm.sex" label="1">男</el-radio>
              <el-radio v-model="editForm.sex" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="ID" prop="id">
              <el-input v-model="editForm.id"></el-input>
            </el-form-item>
            <el-form-item label="学校/院系">
              <div class="block">
                <el-cascader
                  expand-trigger="hover"
                  :options="options"
                  v-model="editForm.school"
                  @change="handleChange"
                ></el-cascader>
              </div>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editForm: {
        name: "",
        id: "",
        sex: "1",
        school: []
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        id: [{ required: true, message: "请输入ID", trigger: "blur" }]
      },
      options: [
        {
          value: "fzu",
          label: "福州大学",
          children: [
            {
              value: "shuji",
              label: "数学与计算机学院"
            },
            {
              value: "tumu",
              label: "土木工程学院"
            }
          ]
        },
        {
          value: "xmu",
          label: "厦门大学",
          children: [
            {
              value: "shuji",
              label: "数学与计算机学院"
            },
            {
              value: "tumu",
              label: "土木工程学院"
            }
          ]
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.create {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>