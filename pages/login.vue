
<template>

  <div class="background">
    <div style="width:500px; margin:auto;" class="main">
      <el-tabs
        v-model="activeName"
        type="border-card"
        stretch
        @tab-click="handleClick"
        style="margin-top:150px"
      >
        <el-tab-pane label="账号密码登录" name="first">
          <div class="logintitle">
            <span>到&nbsp;云</span>
          </div>

          <el-form ref="formPsd" :model="formPsd" :rules="Psdrules" label-width="80px">

            <el-form-item label="账号" prop="account">
              <el-autocomplete
                v-model="formPsd.account"
                :fetch-suggestions="querySearch"
                placeholder="输入手机/邮箱"
                @select="handleSelect"
                style="width:300px"
              ></el-autocomplete>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                v-model="formPsd.password"
                placeholder="输入密码"
                clearable
                show-password
                style="width:300px"
              ></el-input>
            </el-form-item>

            <el-form-item type="flex">
              <el-col :span="10">
                <el-checkbox
                  v-model="formPsd.autoLogin"
                  label="30天自动登陆"
                  name="autoLogin"
                ></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-link
                  href="/changePassword"
                  :underline="false"
                  style="float:right"
                  >忘记密码</el-link
                >
              </el-col>
            </el-form-item>

            <el-form-item >
              <div>
                 <el-button
                  type="primary"
                  @click="submitForm1('formPsd')"
                  style="width:300px"
                  >登录</el-button>
              </div>
              <div>
                <el-link
                 href="/sinup"
                  :underline="false"
                  style="margin:20px 0 0 110px"
                  >注册新账号</el-link
                >
              </div>
            </el-form-item>
          </el-form>
         
              
           

        </el-tab-pane>

        <el-tab-pane label="短信验证登录" name="second">
          <div class="logintitle">
            <span>到&nbsp;云</span>
          </div>

         <el-form ref="formPhone" :model="formPhone" :rules="Phonerules" label-width="80px">
          <el-form-item label="手机" prop="phone">
            <el-input
              v-model="formPhone.phone"
              placeholder="输入手机号"
              clearable
              style="width:300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="验证">
            <el-input
              v-model="formPhone.verification"
              placeholder="输入验证码"
              style="width:120px;"
            ></el-input>
            <el-button
              type="primary"
              v-show="formPhone.showVerify"
              @click="getVerification"
              :disabled="formPhone.disableVerify"
              style="width:120px"
              >获取验证码</el-button
            >
            <el-button
              type="primary"
              v-show="!formPhone.showVerify"
              disabled
              style="width:100px"
              >已发送</el-button
            >
            <span v-show="!formPhone.showVerify"
              >{{ formPhone.countdown }} s后可再获取</span
            >
          </el-form-item>

          <el-form-item type="flex">
              <el-col :span="10">
                <el-checkbox
                  v-model="formPsd.autoLogin"
                  label="30天自动登陆"
                  name="autoLogin"
                ></el-checkbox>
              </el-col>
              <el-col :span="10">
                <el-link
                  href="/changePassword"
                  :underline="false"
                  style="float:right"
                  >忘记密码</el-link
                >
              </el-col>
            </el-form-item>

            <el-form-item>
              <div>
                <el-button
                  type="primary"
                  @click="submitForm2('formPhone')"
                  style="width:300px"
                  >登录</el-button
                >
              </div>
              <div>
                <el-link
                 href="/sinup"
                  :underline="false"
                  style="margin:20px 0 0px 110px"
                  >注册新账号</el-link
                >
              </div>
            </el-form-item>

          </el-form>
        </el-tab-pane>

      </el-tabs>
      
    </div>
    <div class="footer">
    <p>
        ©Copyright 2021 22小组lhw
    </p>
    </div>
  
  <particlesJS/>
</div>
</template>

<script>

import particlesJS from '@/components/ParticlesJS.vue'
export default {
  components: {
    particlesJS
  },
  
  layout:"custom",
  data () {
    var validateAccount = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入手机号/邮箱'))
      } else if (value.indexOf('@') != -1) {
        // 邮箱
        // this.formPsd.way = 'email'
        var reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        if (!reg.test(value)) {
          callback(new Error('手机号/邮箱格式有误，请重填!'))
        } else {
          callback()
        }
      } else {
        // 手机
        // this.formPsd.way = 'phone'
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('手机号/邮箱格式有误，请重填'))
        } else {
          callback()
        }
      }
    }
    var validatePhone = (rule, value, callback) => {
      this.formPhone.disableVerify = true
      if (value == '') {
        callback(new Error('请输入手机号'))
      } else {
        // 手机
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('手机号格式有误，请重填'))
        } else {
          this.formPhone.disableVerify = false
          
          callback()
        }
      }
    }
    return {
      activeName: 'first',
      // TODO:保存到localStorage
      accountHistory: [],
      formPsd: {

        account: "15659197520",
        password: "123456",
        autoLogin: false

      },
      Psdrules: {
        account: [{ validator: validateAccount, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ]
      },

      formPhone: {
        phone: '',
        verification: '', // 验证码
        disableVerify: true, // 能否发送
        showVerify: true, // 显示按钮
        countdown: 0,
        agree: false
      },
      Phonerules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ]

      }

    }
  },
  methods: {
    getVerification () {
       this.formPhone.verification = '1234'

      const TIME_COUNT = 60
      if (!this.timer) {
        this.formPhone.countdown = TIME_COUNT
        this.formPhone.showVerify = false
        this.timer = setInterval(() => {
          if (this.formPhone.countdown > 0 && this.formPhone.countdown <= TIME_COUNT) {
            this.formPhone.countdown--
          } else {
            this.formPhone.showVerify = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // 切换登录tab
    handleClick (tab, event) {
      console.log(tab, event)
    },

    // 登录账号历史搜索
    querySearch (queryString, cb) {
      var accountHistory = this.accountHistory
      var results = queryString
        ? accountHistory.filter(this.createFilter(queryString))
        : accountHistory
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return account => {
        return (
          account.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    // 选择历史账号后触发
    handleSelect (item) {
      console.log(item)
    },

    submitForm1 (formName) {

      this.$refs[formName].validate(valid => {
        if (valid) {
          try {
            const _this = this;
            var qs = require("qs");
            
            this.$axios
              .post("/login", 
                qs.stringify({
                  account: this.formPsd.account,
                  password: this.formPsd.password,
                })
              )
              .then(res => {
                console.log(res);
                if (res.code !== 0) {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                    });
                  } else {
                    this.$message({
                      message: "登陆成功",
                      type: "success"
                    });

                    // window.localStorage.setItem("sid", res.token,60*60*24*10);
                    _local.set("sid", res.token,60*60*24*10*1000);
                    // this.$cookies.set("sid", res.token, "60s");
                    // console.log(this.$cookies.get("sid"));
                    this.$router.push("/");
               
                  }
              })
              .catch(e => {
                console.log(e);
              });
          } catch (e) {
            console.log(e);
          }

          // alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },


    submitForm2 (formName){
     this.$refs[formName].validate(valid => {
        if (valid) {

          if(this.formPhone.verification == ''){
              console.log('请输入验证码');
              this.$message({
                showClose: true,
                message: '请输入验证码',
                type: 'error'
              });
              return false;
            }
            // else if(this.formPhone.verification != '1234'){
            //   console.log('请输入正确的验证码');
            //   this.$message({
            //     showClose: true,
            //     message: '请输入正确的验证码',
            //     type: 'error'
            //   });
            //   return false;
            // }

            try {
            const _this = this;
            this.$axios
              .post(this.$serverUrl + "/api/login", {
                
                phone: this.formPhone.phone,
                verification: this.formPhone.verification
              })
              .then(function(response) {
                console.log(response);
                if (response.data.user_id == -1) {
                  console.log("account error");
                  _this.$message({
                    showClose: true,
                    message: "账号不存在",
                    type: "error"
                  });
                } else if (response.data.user_id == -2) {
                  console.log("verfication error");
                  _this.$message({
                    showClose: true,
                    message: "验证码错误",
                    type: "error"
                  });
                } else {
                  // 登录成功
                  console.log("user_id:" + response.data.user_id);

                  let token = {
                    user_id: response.data.user_id,
                    loginTime: new Date().getTime(),
                    autoLogin: _this.form.autoLogin
                  };
                  _this.$store.commit("LOGIN_IN", token);
                  console.log(_this.$store.state.UserToken);

                  _this.$router.replace("/"); // 不会留下 history 记录
                  //_this.$router.push('/');   // 向 history 栈添加一个新的记录
                  //this.$router.go(-1);   // 后退一步记录，等同于 history.back()
                  //this.$router.go(1);   // 在浏览器记录中前进一步，等同于 history.forward()
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          } catch (e) {
            console.log(e);
          }


        }else {
          console.log("error submit!!");
          return false;
        }
     })
     },


  
     // 初始化页面完成后,再对dom节点进行相关操作
    mounted () {}
}

}

</script>

<style scoped>
/* .wrap {
    height: 100vh;
    background-image: url("~@/assets/login/background.jpg");
    background-size: 100% 100%;
    overflow: hidden;
    z-index: -2;
    position: relative;
  } */

.background {
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/login/background.jpg"); 
  background-size: 100% 100%; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
  position: absolute; /* 不可缺少 */
  z-index: 1;
  background-repeat: no-repeat;
  overflow: hidden;
}

.main {
  position: absolute;  
  top: 0; left: 0; bottom: 0; right: 0;  
}

.logintitle {
  color: rgb(83, 168, 255);
  font-size: 40px;
  text-align: center;
  margin: 20px;
}
.footer{

  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color:rgb(255, 255, 255);

}

</style>