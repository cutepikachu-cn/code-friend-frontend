<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {SelfInfo, Team, User} from "@/modules/type.d.ts";
import {dismissTeam, getTeam} from "@/plugins/request/teamAPI.ts";
import {showSuccessToast} from "vant";
import {getCurrentUserState} from "@/states/user.ts";

const route = useRoute()
const router = useRouter()

const user = ref<SelfInfo>({})
const teamId: number = Number(route.query.teamId)
const team = ref<Team>({})

onMounted(async () => {
  user.value = await getCurrentUserState()
  getTeam(teamId).then(res => {
    if (res.code !== 0) {
      return
    }
    team.value = res.data
    caption.value = team.value.members[team.value.members?.findIndex(member => member.id === team.value.userId)]
    team.value.members?.sort(member => member.id !== team.value.userId ? 1 : -1)
  })
})
const caption = ref<User>({})

const doDismissTeam = () => {
  dismissTeam(team.value.id).then(res => {
    if (res.code !== 0) {
      return
    }
    showSuccessToast(res.message)
    router.back()
  })
}
</script>

<template>
  <TopBar :show-right="false" title="队伍详情"/>
  <van-cell-group title="队伍信息" inset>
    <template #title>
      <div
          :style="{display: 'flex', justifyContent: 'space-between'}"
          class="van-haptics-feedback">
        队伍信息
        <div @click="router.push(`/team/edit?teamId=${team.id}`)" v-if="team.userId === user.id">
          编辑
          <van-icon name="arrow"/>
        </div>
      </div>
    </template>
    <van-cell title="队伍名称" :value="team.name"/>
    <van-cell title="队伍描述" :value="team.description"/>
    <van-cell title="最大人数" :value="team.maxNumber"/>
    <van-cell title="过期时间" :value="new Date(team.expireTime).toLocaleString()"/>
    <van-cell title="创建时间" :value="new Date(team.createTime).toLocaleString()"/>
    <van-cell title="队长" :value="caption.nickname"/>
    <van-cell title="状态">
      <van-tag size="large" type="success" v-if="team.status === 0">公开</van-tag>
      <van-tag size="large" type="primary" v-else-if="team.status === 1">私密</van-tag>
      <van-tag size="large" type="danger" v-else-if="team.status === 2">加密</van-tag>
      <van-tag size="large" type="danger" v-else>其它</van-tag>
    </van-cell>
    <van-cell title="标签">
      <van-tag :style="{marginLeft: '5px'}" size="large" type="primary" v-for="tag in team.tags">
        {{ tag }}
      </van-tag>
    </van-cell>
  </van-cell-group>

  <van-cell-group title="队伍成员">
    <van-cell v-for="member in team.members">
      <template #icon>
        <van-image :src="member.avatarUrl" width="2rem" height="2rem" round/>
      </template>
      <template #title>
        {{member.nickname}}
      </template>
      <template #label>
        {{member.profile?.slice(0, 20)}}
        <span v-if="member.profile?.length > 30">...</span>
      </template>
      <template #value>
        <van-tag size="large" color="orange" v-if="team.userId === member.id">队长</van-tag>
        <van-tag size="large" type="success" v-else>队员</van-tag>
      </template>
    </van-cell>

    <van-cell-group title="操作" :style="{padding: '10px'}" v-if="team.userId === user.id">
      <van-button type="danger" size="medium" block round @click="doDismissTeam">解散队伍</van-button>
    </van-cell-group>
  </van-cell-group>
</template>

<style scoped>

</style>
