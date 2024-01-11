<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import {onMounted, ref} from "vue";
import {getCurrentUserState} from "@/states/user.ts";
import type {SelfInfo} from "@/modules/type.d.ts";

const user = ref<SelfInfo | null>(null)
onMounted(async () => {
  user.value = await getCurrentUserState()
})
</script>

<template>
  <TopBar :show-right="false" :show-left="false"/>
  <van-cell title="个人信息" is-link to="/user/info"/>
  <van-cell title="管理的队伍" is-link to="/user/team/manage"/>
  <van-cell title="加入的队伍" is-link to="/user/team/join"/>
</template>

<style scoped>

</style>
