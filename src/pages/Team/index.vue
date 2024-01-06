<script setup lang="ts">

import TopBar from '../../components/TopBar.vue'
</script>

<template>
  <TopBar title="队伍" :show-left="false"/>
  <van-button type="primary" to="/team/create">创建队伍</van-button>
</template>

<style scoped>

</style>
