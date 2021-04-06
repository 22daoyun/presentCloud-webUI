<template>
  <div class="background">
    <div style="width:500px;height:550px; background-color:white" class="main">
      <div style="margin:auto;width:400px">
        <div class="logintitle">
          <span>到&nbsp;云</span>
        </div>
        <div>
          <h2 style="text-align: center;margin:20px auto 30px;">重置密码</h2>
        </div>

        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="账号" prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="输入手机号"
              clearable
              style="width:300px"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item label="密码" prop="phone_password">
            <el-input
              v-model="form.phone_password"
              placeholder="输入密码"
              clearable
              style="width:300px"
            ></el-input>
          </el-form-item> -->

          <el-form-item label="验证">
            <el-input
              v-model="form.verification"
              placeholder="输入验证码"
              style="width:120px"
            ></el-input>
            <el-button
              type="primary"
              v-show="form.showVerify"
              @click="getVerification"
              :disabled="form.disableVerify"
              style="width:110px"
              >获取验证码</el-button
            >
            <el-button
              type="primary"
              v-show="!form.showVerify"
              disabled
              style="width:80px"
              >已发送</el-button
            >
            <span v-show="!form.showVerify"
              >{{ form.countdown }} s后可再获取</span
            >
          </el-form-item>

          <el-form-item prop="newpassword" label="新密码">
                <el-input type="password" v-model="form.newpassword" clearable show-password
              style="width:300px"></el-input>
            </el-form-item>

            <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" v-model="form.repassword" clearable show-password
              style="width:300px"></el-input>
            </el-form-item>


          <el-form-item >
            <div style="margin:20px 0 0 50px">
              <el-button
                type="primary"
                @click="submitForm('form')"
               
                >确认</el-button>
            
              <el-button
                @click="cancel()"
                type="default"
                >取消</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
    <p>
        ©Copyright 2021 22小组lhw
    </p>
    </div>
    <particlesJS/>
  </div>
</template>
<script type="text/ecmascript-6">
import particlesJS from '@/components/ParticlesJS.vue'

export default {
  components: {
    particlesJS
    
  },
  layout:"custom",
  data () {
    var validateAccount = (rule, value, callback) => {
      this.form.disableVerify = true
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        // 手机
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('手机号格式有误，请重填'))
        } else {
          this.form.disableVerify = false
          callback()
        }
      }
    }
    return {
      form: {
        phone: '',
        newpassword: '',
        repassword:'',
        need_vercode: '',
        verification: '', // 验证码
        disableVerify: true, // 能否发送
        showVerify: true, // 显示按钮
        countdown: 0,

        agree: false
      },
      rules: {
        phone: [
          { required: true, validator: validateAccount, trigger: 'blur' }
        ],
        
        repassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // async sendMessage(phone,confirm) {
		// 		console.log("{\"code\":\""+confirm +"\"}")
		// 		console.log('phone',phone)
		// 		const Core = require('@alicloud/pop-core');

		// 		var client = new Core({
		// 			accessKeyId: 'LTAI4GEjqfdgxRrXxP1J8XMu',
		// 			accessKeySecret: '9hBLWGMkzhLPBShyndVciS8eIMPnu9',
		// 			endpoint: 'https://dysmsapi.aliyuncs.com',
		// 			apiVersion: '2017-05-25'
		// 		});

		// 		var params = {
		// 			"PhoneNumbers": phone,
		// 			"SignName": "lzh生意专家",
		// 			"TemplateCode": "SMS_205132359",
		// 			"TemplateParam": "{\"code\":\""+confirm+"\"}"
		// 		}

		// 		var requestOption = {
		// 			method: 'POST'
		// 		};

		// 		client.request('SendSms', params, requestOption).then((result) => {
		// 			console.log(JSON.stringify(result));
		// 		}, (ex) => {
		// 			console.log(ex);
		// 		})
		// 	},

    getVerification () {

      // this.form.need_vercode = ('0000' + String(parseInt(Math.random() * (10000)))).slice(-4);
			// this.sendMessage(this.form.phone,this.form.need_vercode)

      try {
            const _this = this;
            var qs = require("qs");
            
            this.$axios
              .post("/user/create", 
                qs.stringify({
                  username: this.form.phone,
                  password: this.form.phone_password,
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

      const TIME_COUNT = 60
      if (!this.timer) {
        this.form.countdown = TIME_COUNT
        this.form.showVerify = false
        this.timer = setInterval(() => {
          if (this.form.countdown > 0 && this.form.countdown <= TIME_COUNT) {
            this.form.countdown--
          } else {
            this.form.showVerify = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO：获取验证码



          if (this.form.verification == '') {
            console.log('请输入验证码')
            this.$message({
              showClose: true,
              message: '请输入验证码',
              type: 'error'
            })
            return false
          } else if (this.form.verification != this.form.need_vercode) {
            console.log('请输入正确的验证码')
            this.$message({
              showClose: true,
              message: '请输入正确的验证码',
              type: 'error'
            })
            return false
          } else if (this.form.agree !== true) {
            console.log('请阅读并同意《用户协议》')
            this.$message({
              showClose: true,
              message: '请阅读并同意《用户协议》',
              type: 'error'
            })
            return false
          }

          try {
            // const _this = this
            // this.$axios.post('/sinup', {
            //   phone: this.form.phone,
            //   phone_password: this.form.phone_password,
            //   // create_time: this.$formatDate(new Date().getTime())
            // })
            //   .then(function (response) {
            //     console.log(response)
            //     if (response.data.user_id == -1) {
            //       console.log('phone already exist')
            //       _this.$message({
            //         showClose: true,
            //         message: '该手机号已注册，请登录或更换手机号',
            //         type: 'error'
            //       })
            //     } else {
            //       // 注册成功
            //       console.log('user_id:' + response.data.user_id)

            //       let token = {
            //         'user_id': response.data.user_id,
            //         'loginTime': new Date().getTime(),
            //         'autoLogin': true
            //       }
            //       _this.$store.commit('LOGIN_IN', token)
            //       console.log(_this.$store.state.UserToken)
            //       _this.$router.push("/")
            //     }
            //   })
            //   .catch(function (error) {
            //     console.log(error)
            //   })
          } catch (e) {
            console.log(e)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    cancel(){
      this.$router.push("/login")
    }


  }
}
</script>
<style scoped>
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
  margin:8% auto;
  position: absolute;  
  top: 0; left: 0; bottom: 0; right: 0;    
  box-shadow:0px 15px 10px -15px #000;
}
.logintitle {
  color: rgb(83, 168, 255);
  font-size: 40px;
  text-align: center;
  padding-top: 30px;
}

.footer{

  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color:rgb(255, 255, 255);

}
</style>