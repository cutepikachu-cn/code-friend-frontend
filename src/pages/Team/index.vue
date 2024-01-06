<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import TeamCardList from "@/components/TeamCardList.vue";

</script>

<template>
  <TopBar title="队伍" :show-left="false"/>
  <van-button type="primary" to="/team/create">创建队伍</van-button>
  <TeamCardList/>
</template>

<style scoped>

</style>
