<template>
  <div>
    <div class="head"></div>
    <!-- <el-row type="flex" class="navs">
        <nuxt-link to="/">系统首页</nuxt-link>
        <nuxt-link to="/user">用户管理</nuxt-link>
        <nuxt-link to="/role">角色管理</nuxt-link>
        <nuxt-link to="/class">班课管理</nuxt-link>
        <nuxt-link to="/menu">菜单管理</nuxt-link>
        <nuxt-link to="/authority">权限管理</nuxt-link>
        <nuxt-link to="/data">数据字典</nuxt-link>
        <nuxt-link to="/setting">参数设置</nuxt-link>
      </el-row> -->
    <!-- <el-card >
      <el-button type="primary" @click="gettoken">存入数据库</el-button>
      
    </el-card> -->
  </div>
</template>

<script>
const axios = require('axios');
import _local from '@/plugins/localStorage'
export default{
    
    data(){
        return {
            Code:''
            }

    },

    created(){
       
        this.getcode();
    },

    methods: {
      async getcode(){
         //判断是否否找到code=
        if(window.location.href.indexOf("code=") == -1){
      
        }else{
          var  str=window.location.href.substr(window.location.href.indexOf("code=")+5);
          console.log(str); 
          this.Code=str.substr();
          console.log(this.Code);
          this.$message.success("登录成功！");

          var qs = require("qs");
          this.$axios.post('/oauthWeb',
             qs.stringify({
                    clientId: '5e524482043ff89d4819',
                    clientSecret: '03079e71925c7a017160a1ef9c4928244ee4f7d1',
                    code: this.Code,
                    identityType: 0,
                   
                    })
                         
            ).then(res => {
            console.log(res);
            if (res.data.code != 200) {
                this.$message.error("失败！");
            } else {
                this.$message.success("存入数据库成功！");
                 _local.set("sid", this.Code,60*60*24*10*1000);
                this.$router.push("/");
            }})
        


         // 
        }
        // return Code;

      },
      

       gettoken() {
          var qs = require("qs");
          this.$axios.post('/oauthWeb',
             qs.stringify({
                    clientId: '5e524482043ff89d4819',
                    clientSecret: '03079e71925c7a017160a1ef9c4928244ee4f7d1',
                    code: this.Code})
                         
            ).then(res => {
            console.log(res);
            if (res.data.code != 200) {
                this.$message.error("失败！");
            } else {
                this.$message.success("成功！");
                
            }})
        
      }



    }

  
}

</script>


<style scoped lang="less">
.navs {
    
    flex: 1;
    a {
      display: block;
      padding: 20px 20px;
      height: 60px;
      box-sizing: border-box;

      &:hover {
        color: #409eff;
        border-bottom: 5px #409eff solid;
      }

      &:active {
        background: #409eff;
        color: #fff;
      }
    }
    .nuxt-link-exact-active {
      background: #409eff;
      color: #fff !important;
    }
  }
.time {
  font-size: 13px;
  color: #999;
}
.head {
  font-size: 20px;
  color: #409eff;
  margin-bottom: 20px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  height: 240px;
}
</style>

