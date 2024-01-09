<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import {onMounted, ref} from "vue";
import type {SelfInfo, Team} from "@/modules/type.d.ts";
import {getCurrentUserState} from "@/states/user.ts";
import {listMyManageTeams} from "@/plugins/request/teamAPI.ts";
import TeamCard from "@/components/TeamCard.vue";
import {useRouter} from "vue-router";

const user = ref<SelfInfo | null>(null)
const teamList = ref<Team[]>([])
const router = useRouter()

onMounted(async () => {
  user.value = await getCurrentUserState()
  listMyManageTeams().then(res => {
    if (res.code !== 0) {
      return
    }
    teamList.value = res.data
  })
})

const toManage = (teamId) => {
  router.push(`/team/info?teamId=${teamId}`)
}
</script>

<template>
  <TopBar title="管理队伍" :show-right="false"/>
  <TeamCard v-for="team in teamList" :cur-user="user" :team="team" :key="team.id">
    <van-button type="primary" size="small" round @click="toManage(team.id)">管理</van-button>
  </TeamCard>
</template>

<style scoped>

</style>
