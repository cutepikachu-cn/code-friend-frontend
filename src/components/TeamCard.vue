<script setup lang="ts">
import {SelfInfo, Team} from "@/modules/type.d.ts";
import {JoinTeamParams} from "@/modules/requestParams.d.ts";
import {joinTeam} from "@/plugins/request/teamAPI.ts";
import {onMounted, ref} from "vue";
import {getCurrentUserState} from "@/states/user.ts";


defineProps<{
  team: Team
}>()

const user = ref<SelfInfo>({})

onMounted(async () => {
  user.value = await getCurrentUserState()
})

const doJoinTeam = (teamId) => {
  const params: JoinTeamParams = {
    teamId
  }
  joinTeam(params)
}


</script>

<template>
  <van-card
      :desc="team.description ? team.description : '无介绍'"
      :title="team.name ? team.name : '匿名用户'"
  >
    <template #thumb>
      <van-image src="/default_team_img.jpg" round/>
    </template>
    <template #tags>
      <van-tag :style="{margin: '5px'}" size="medium" plain type="danger" v-for="tag in team.tags">
        {{ tag }}
      </van-tag>
    </template>
    <template #price>
      队伍人数：{{ team.members?.length }}/ {{ team.maxNumber }}
    </template>
    <template #bottom>
      <br/>
      过期时间：{{ new Date(team.expireTime).toLocaleString() }}
    </template>
    <template #footer>
      <slot name="default">
        <van-button v-if="team.userId !== user.id" type="primary" size="small" round @click="doJoinTeam(team.id)">
          加入队伍
        </van-button>
        <van-button v-else type="primary" size="small" round>已加入</van-button>
      </slot>
    </template>
  </van-card>
</template>

<style scoped>

</style>
