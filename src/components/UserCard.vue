<script setup lang="ts">
import {User} from "@/modules/type";

withDefaults(defineProps<{
  userList: User[]
}>(), {
  userList: []
})
</script>

<template>
  <van-card
      v-for="user in userList"
      :key="user.id"
      :desc="user.profile ? user.profile : '无介绍'"
      :title="user.nickname ? user.nickname : '匿名用户'"
  >
    <template #thumb>
      <van-image :src="user.avatarUrl" round/>
    </template>
    <template #tags>
      <van-tag :style="{margin: '5px'}" size="medium" plain type="primary" v-for="tag in user.tags?.slice(0, 4)">
        {{ tag }}
      </van-tag>
      {{user.tags.length > 4 ? "..." : ""}}
    </template>
    <template #footer>
      <van-button type="primary" size="small" round>联系伙伴</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>
