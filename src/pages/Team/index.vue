<script setup lang="ts">
import TopBar from '@/components/TopBar.vue'
import {onMounted, ref} from "vue";
import {searchTeam} from "@/plugins/request/teamAPI.ts";
import {Page, SelfInfo, Team} from "@/modules/type.d.ts";
import {SearchTeamParams} from "@/modules/requestParams.d.ts";
import TeamCard from "@/components/TeamCard.vue";
import {getCurrentUserState} from "@/states/user.ts";

const user = ref<SelfInfo>({})
onMounted(async () => {
  user.value = await getCurrentUserState()
})

const keyword = ref('');
const onSearch = (val) => {
  if (val.length === 0) {
    return
  }
  searchParams.value.current = 1
  searchParams.value.keyword = val
  teamList.value = []
  onLoad()
}

let teamPage = ref<Page<Team>>({
  records: [],
  total: 5,
  current: 1,
  size: 5,
})
const teamList = ref<Team[]>([])
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)

const searchParams = ref<SearchTeamParams>({
  current: 1,
  size: 5,
  keyword: ''
})
const onLoad = () => {
  // 异步更新数据
  searchTeam(searchParams.value).then(res => {
    if (res.code !== 0) {
      return
    }
    teamPage.value = res.data
    teamList.value.push(...teamPage.value.records)
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
  <TopBar title="队伍" :show-left="false"/>
  <form action="/">
    <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        @search="onSearch"
    />
  </form>
  <van-button type="primary" to="/team/create">创建队伍</van-button>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="teamList.length !== 0 ? '没有更多了': ''"
      @load="onLoad"
  >
    <TeamCard v-for="team in teamList" :cur-user="user" :team="team" :key="team.id"/>
  </van-list>
</template>

<style scoped>

</style>
