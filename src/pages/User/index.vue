<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import {useRouter} from 'vue-router'
import {onMounted, ref} from "vue";
import type {SelfInfo} from "@/modules/type";
import {getCurrentUserState, setCurrentUserState} from "@/states/user.ts";
import {getCurrentUser} from "@/plugins/request/userAPI.ts";

const router = useRouter()
const toEdit = (editKey: string, editName: string, currentValue: any) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}

const user = ref<SelfInfo | null>(null)

onMounted(async () => {
  user.value = getCurrentUserState()
  if (!user.value) {
    user.value = await getCurrentUser()
    if (!user.value) {
      await router.replace('/login')
    }
    setCurrentUserState(user.value)
  }
})

</script>

<template>
  <TopBar title="用户" :show-left="false" :show-right="false"/>
  <van-cell title="账户名" :value="user?.account"/>
  <van-cell title="昵称" :value="user?.nickname" is-link @click="toEdit('nickname', '昵称', user?.nickname)"/>
  <van-cell title="头像" is-link @click="toEdit('avatarUrl', '头像', user?.avatarUrl)">
    <van-image
        round
        width="2rem"
        height="2rem"
        :src="user?.avatarUrl"
    />
  </van-cell>
  <van-cell title="年龄" :value="user?.age" is-link @click="toEdit('age', '年龄', user?.age)"/>
  <van-cell title="性别" :value="user?.gender ? '男' : '女'" is-link @click="toEdit('gender', '性别', user?.gender)"/>
  <van-cell title="电话" :value="user?.phone" is-link @click="toEdit('phone', '电话', user?.phone)"/>
  <van-cell title="邮箱" :value="user?.email" is-link @click="toEdit('email', '邮箱', user?.email)"/>
  <van-cell title="注册时间" :value="user?.createTime?.toLocaleString()"/>
  <van-cell title="角色" :value="user?.role"/>
  <van-cell title="标签" is-link @click="toEdit('tags', '标签', user?.tags)">
    <van-tag type="primary" size="large" v-for="tagName in user?.tags"
             :key="tagName" :style="{margin: '1px'}">
      {{ tagName }}
    </van-tag>
  </van-cell>
</template>

<style scoped>

</style>
