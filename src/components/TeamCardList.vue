<script setup lang="ts">
import {Page, Team} from "@/modules/type";
import {ref} from "vue";
import {SearchPageParams} from "@/modules/requestParams";
import {searchTeam} from "@/plugins/request/teamAPI.ts";

let teamPage = ref<Page<Team>>({
  records: [],
  total: 5,
  current: 1,
  size: 5,
})
const teamList = ref<Team[]>([])
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)

const searchParams = ref<SearchPageParams>({
  current: 1,
  size: 5
})
const onLoad = () => {
  // 异步更新数据
  searchTeam(searchParams.value).then(res => {
    teamPage.value = res
    teamList.value.push(...res.records)
    // 加载状态结束
    loading.value = false
    // 数据是否全部加载完成
    if (teamPage.value.current >= Math.ceil(teamPage.value.total / teamPage.value.size)) {
      finished.value = true
    } else {
      searchParams.value.current++
    }
  }).catch(err => {
    console.log(err)
  })
}
</script>

<template>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="teamList.length !== 0 ? '没有更多了': ''"
      @load="onLoad"
  >
    <van-card
        v-for="team in teamList"
        :key="team.id"
        :desc="team.description ? team.description : '无介绍'"
        :title="team.name ? team.name : '匿名用户'"
    >
      <template #thumb>
        <van-image src="@/assets/default_team_img.jpg" round/>
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
        <van-button type="primary" size="small" round>加入队伍</van-button>
      </template>
    </van-card>
  </van-list>
</template>

<style scoped>

</style>
