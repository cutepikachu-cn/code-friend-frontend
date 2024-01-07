<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import TeamCardList from "@/components/TeamCardList.vue";
import {ref} from "vue";
import {showToast} from "vant";

const value = ref('');
const onSearch = (val) => showToast(val);
</script>

<template>
  <TopBar title="队伍" :show-left="false"/>
  <form action="/">
    <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch"
    />
  </form>
  <van-button type="primary" to="/team/create">创建队伍</van-button>
  <TeamCardList/>
</template>

<style scoped>

</style>
