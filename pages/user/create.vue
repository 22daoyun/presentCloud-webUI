<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增用户</el-breadcrumb-item>
   </el-breadcrumb>
    <el-container>
    
      <el-main>
        <div class="create">
          <el-card>
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="mobile">
                <el-input v-model="addForm.mobile"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
          <!-- 底部区域 -->
          <span class="button">
            <el-button type="primary" @click="addUser">确 定</el-button>
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
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (regMobile.test(value)) {
        return cb();
      }

      cb(new Error("请输入合法的手机号"));
    };
    return {
      addForm: {
        username: "",
        mobile: "",
        password: "123456"
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "用户名的长度在6~15个字符之间",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        var qs = require("qs");
        const { data: res } = await this.$axios.post(
          "/user/create",
          qs.stringify(this.addForm)
         // this.addForm
        );
        console.log(res);
        if (res.code != 200) {
          this.$message.error("添加用户失败！");
        } else {
          this.$message.success("添加用户成功！");
          this.$router.push("/user");
        }
      });
    }
  }
};
</script>

<style  lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  width: 600px;
  height: 240px;
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
