<template>
  <div>
    <div style="width:500px; margin:auto;">
      <div style="margin-top:200px">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>

        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout:"custom",
  data() {
    return {
      active: 0
    };
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  }
};
</script>

<style></style>