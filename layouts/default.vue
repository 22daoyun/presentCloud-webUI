<template>
  <div>
    <Header />
    <el-container>
      <el-aside width="200px">
          <!-- <sideBar /> -->
          <div :is="sideBar"></div>
      </el-aside>
        <el-main>
          <nuxt/>
        </el-main>
        
    </el-container>
    
  </div>
</template>
<script>

import Header from "@/components/header.vue";
import sideBar1 from "@/components/sideBar.vue";
import sideBar2 from "@/components/sideBar2.vue";
import _local from '@/plugins/localStorage.js';

export default {
     data () {
     return {
       sideBar1: 'sideBar1',
       sideBar2: 'sideBar2',
       sideBar: 'sideBar1' 
     };
   },


  components: {
    Header,
    sideBar1,
    sideBar2,
  },

  mounted() {
    this.getSidebar();
  },

  methods:{
    getSidebar(){
      const iden=_local.get('identity')
     // console.log(iden);
     
      if(iden){this.sideBar = sideBar1;}
      else if(iden == false){this.sideBar = sideBar2;}

      
    }
      
    }

  }

  



</script>
<style>
* {
  margin: 0;
  padding: 0;
}
ul,
li,
ol {
  list-style: none;
}
a {
  color: #333;
  text-decoration: none;
}

em,
i {
  font-display: normal;
}

</style>

