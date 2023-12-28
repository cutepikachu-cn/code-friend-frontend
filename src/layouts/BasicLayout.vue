<script setup lang="ts">
import {ref} from 'vue'

const active = ref('home')
</script>

<template>
  <RouterView/>
  <van-tabbar v-model="active" placeholder route>
    <van-tabbar-item icon="home-o" name="home" to="/home">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="user-o" name="user" to="/user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>
