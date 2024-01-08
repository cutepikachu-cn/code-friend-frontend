<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import {ref} from "vue";
import {Page, User} from "@/modules/type";
import {searchUsers} from "@/plugins/request/userAPI.ts";
import UserCardList from "@/components/UserCard.vue";
import {SearchUserParams} from "@/modules/requestParams";

let userPage = ref<Page<User>>({
  records: [],
  total: 5,
  current: 1,
  size: 5,
})
const userList = ref<User[]>([])
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)

const searchUserParams = ref<SearchUserParams>({
  current: 1,
  size: 5
})
const onLoad = () => {
  // 异步更新数据
  searchUsers(searchUserParams.value).then(res => {
    if (res.code !== 0) {
      return
    }
    userPage.value = res.data
    userList.value.push(...userPage.value.records)
    // 加载状态结束
    loading.value = false
    // 数据是否全部加载完成
    if (userPage.value.current >= Math.ceil(userPage.value.total / userPage.value.size)) {
      finished.value = true
    } else {
      searchUserParams.value.current++
    }
  }).catch(err => {
    console.log(err)
  })
}
</script>

<template>
  <TopBar title="伙伴匹配" :show-left="false"/>
  <van-empty v-if="userList.length === 0" description="查找结果为空"/>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="userList.length !== 0 ? '没有更多了': ''"
      @load="onLoad"
  >
    <UserCardList :user-list="userList"/>
  </van-list>
</template>

<style scoped>

</style>
