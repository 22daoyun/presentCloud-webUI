<template>
  <div>
    <Header />
    <el-container>
      <el-aside width="200px">
          <sideBar />
      </el-aside>
        <el-main>
          <nuxt/>
        </el-main>
        
    </el-container>
    
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import sideBar from "@/components/sideBar.vue"
export default {
  components: {
    Header,
    sideBar
  }
};
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

