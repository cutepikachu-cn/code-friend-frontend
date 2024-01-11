<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import {onMounted, ref} from "vue";
import {getCurrentUserState, setCurrentUserState} from "@/states/user.ts";
import type {SelfInfo} from "@/modules/type.d.ts";
import {userLogout} from "@/plugins/request/userAPI.ts";
import {showSuccessToast} from "vant";
import {useRouter} from "vue-router";

const user = ref<SelfInfo | null>(null)
onMounted(async () => {
  user.value = await getCurrentUserState()
})

const showPopover = ref(false);

const actions = [
  {
    text: '退出登录',
    icon: 'revoke'
  }
]

const router = useRouter()

const selectAction = (action, index) => {
  switch (index) {
    case 0:
      userLogout().then(res => {
        if(res.code !== 0) {
          return
        }
        showSuccessToast(res.message)
        setCurrentUserState(null)
        router.replace('/')
      })
  }
}
</script>

<template>
  <TopBar :show-left="false">
    <template #right>
      <van-popover v-model:show="showPopover"
                   placement="bottom-end"
                   :actions="actions"
                   @select="selectAction">
        <template #reference>
          <van-icon name="ellipsis" size="18"/>
        </template>
      </van-popover>
    </template>
  </TopBar>
  <van-cell title="个人信息" is-link to="/user/info"/>
  <van-cell title="管理的队伍" is-link to="/user/team/manage"/>
  <van-cell title="加入的队伍" is-link to="/user/team/join"/>
</template>

<style scoped>

</style>
