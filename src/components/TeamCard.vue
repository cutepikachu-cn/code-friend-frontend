<script setup lang="ts">
import {SelfInfo, Team, User} from "@/modules/type.d.ts";
import {JoinTeamParams} from "@/modules/requestParams.d.ts";
import {ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {joinTeam} from "@/plugins/request/teamAPI.ts";


const props = defineProps<{
  team: Team,
  curUser: SelfInfo
}>()

const showConfirmDialog = ref<boolean>(false)
const password = ref<string>('')
const params = ref<JoinTeamParams>({})

const showConfirm = (teamId) => {
  params.value.teamId = teamId
  showConfirmDialog.value = true
}

const doJoinTeam = () => {
  if (props.team.status === 2) {
    if (!password.value || password.value.length === 0) {
      showFailToast("加入失败\n请输入密码")
      return
    }
  }
  params.value.password = password.value
  joinTeam(params.value).then(res => {
    if (res.code !== 0) {
      return
    }
    showSuccessToast(res.message)
    props.team.members?.push(props.curUser)
  })
}

const isInTeam = (userId: number, team: Team) => {
  if (team.userId === userId) {
    return true
  }
  return team.members?.find((member: User) => member.id === userId)
}

</script>

<template>
  <van-card :title="team.name">
    <template #desc>
      <div class="van-ellipsis">
        {{ team.description ? team.description : '无介绍' }}
      </div>
    </template>
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
        <van-button v-if="!isInTeam(curUser.id, team)" type="primary" size="small" round @click="showConfirm(team.id)">
          加入队伍
        </van-button>
        <van-button v-else type="primary" size="small" round>已加入</van-button>
      </slot>
    </template>
  </van-card>
  <van-dialog v-model:show="showConfirmDialog"
              show-cancel-button
              @confirm="doJoinTeam"
              :title="team.status === 2 ? '请输入密码' : '请确认'"
  >
    <van-field
        v-if="team.status === 2"
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },
        {pattern: /^[\w-]{8,20}$/, message: '密码为8~20位字母、数字、下划线或减号组合'}]"
    />
    <p v-else :style="{textAlign: 'center'}">请确认是否加入队伍</p>
  </van-dialog>
</template>

<style scoped>

</style>
