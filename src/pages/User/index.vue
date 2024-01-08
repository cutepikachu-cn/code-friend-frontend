<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
</script>

<template>
  <TopBar title="用户" :show-right="false"/>
  <van-cell title="个人信息" is-link to="/user/info"/>
  <van-cell title="管理的队伍" is-link to="/user/info"/>
  <van-cell title="加入的队伍" is-link to="/user/info"/>
</template>

<style scoped>

</style>
