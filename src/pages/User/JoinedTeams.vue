<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import {onMounted, ref} from "vue";
import type {SelfInfo, Team} from "@/modules/type.d.ts";
import {getCurrentUserState} from "@/states/user.ts";
import {listMyJoinedTeams} from "@/plugins/request/teamAPI.ts";
import TeamCard from "@/components/TeamCard.vue";

const user = ref<SelfInfo | null>(null)
const teamList = ref<Team[]>([])

onMounted(async () => {
  user.value = await getCurrentUserState()
  listMyJoinedTeams().then(res => {
    if (res.code !== 0) {
      return
    }
    teamList.value = res.data
  })
})
</script>

<template>
  <TopBar title="加入的队伍" :show-right="false"/>
  <TeamCard v-for="team in teamList" :team="team" :key="team.id">
     <van-button type="primary" size="small" round @click="">查看队伍信息</van-button>
  </TeamCard>
</template>

<style scoped>

</style>
