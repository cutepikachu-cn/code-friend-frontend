<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import {onMounted, ref} from "vue";
import type {SelfInfo, Team} from "@/modules/type.d.ts";
import {getCurrentUserState} from "@/states/user.ts";
import {exitTeam, listMyJoinedTeams} from "@/plugins/request/teamAPI.ts";
import TeamCard from "@/components/TeamCard.vue";
import {showSuccessToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter()

const user = ref<SelfInfo | null>(null)
const teamList = ref<Team[]>([])

const getJoinedTeamList = () => {
  listMyJoinedTeams().then(res => {
    if (res.code !== 0) {
      return
    }
    teamList.value = res.data
  })
}

onMounted(async () => {
  user.value = await getCurrentUserState()
  getJoinedTeamList()
})

const doExistTeam = (teamId) => {
  exitTeam(teamId).then(res => {
    if (res.code !== 0) {
      return
    }
    showSuccessToast(res.message)
    getJoinedTeamList()
  })
}

const toTeamInfo = (teamId) => {
  router.push(`/team/info?teamId=${teamId}`)
}
</script>

<template>
  <TopBar title="加入的队伍" :show-right="false"/>
  <TeamCard v-for="team in teamList" :cur-user="user" :team="team" :key="team.id">
    <van-button type="primary" size="small" round @click="toTeamInfo(team.id)">详情</van-button>
    <van-button type="warning" size="small" round @click="doExistTeam(team.id)">退出队伍</van-button>
  </TeamCard>
</template>

<style scoped>

</style>
