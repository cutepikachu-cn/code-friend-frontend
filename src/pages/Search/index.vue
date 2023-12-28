<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {showFailToast} from 'vant'
import 'vant/es/toast/style'

const router = useRouter()
const searchVal = ref('')
const onSearchTags = (val) => {
	tagList.value = initTagList.map(parentTag => {
		const tempChildren = [...parentTag.children]
		const tempParent = {...parentTag}
		tempParent.children = tempChildren.filter(tag => tag.text.includes(val))
		return tempParent
	})
}
const onCancel = () => {
	tagList.value = initTagList
	activeTags.value = []
	activeMainTag.value = 0
	router.back()
}

const activeTags = ref([])
const activeMainTag = ref(0)
const initTagList = [
	{
		text: '性别',
		children: [
			{text: '男', id: '男'},
			{text: '女', id: '女'},
		],
	},
	{
		text: '方向',
		children: [
			{text: 'Java', id: 'Java'},
			{text: 'C++', id: 'C++'},
			{text: 'Go', id: 'Go'},
		],
	},
	{
		text: '职业',
		children: [
			{text: '大学生', id: '大学生'},
			{text: '研究生', id: '研究生'},
			{text: '就业', id: '就业'},
		],
	},
]
const tagList = ref(initTagList)
const closeTag = (tagName) => {
	activeTags.value = activeTags.value.filter(tag => tag !== tagName)
}

const doSearch = () => {
	if (activeTags.value.length <= 0) {
		showFailToast('请添加要查找的标签')
		return
	}
	router.push({
		path: '/search/result',
		query: {
			tags: activeTags.value
		}
	})
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchVal"
        show-action
        placeholder="请输入搜索的标签"
        @search="onSearchTags"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选择标签</van-divider>
  <span :style="{margin: '10px', fontSize: '0.7rem', color: 'gray'}" v-if="activeTags.length === 0">请选择标签</span>
  <van-row>
    <van-tag type="primary" size="large" closeable @close="closeTag(tagName)" v-for="tagName in activeTags"
             :key="tagName" :style="{margin: '5px'}">
      {{ tagName }}
    </van-tag>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeTags"
      v-model:main-active-index="activeMainTag"
      :items="tagList"
  />
  <div :style="{maxWidth: '80%', margin: '10px auto'}">
    <van-button type="primary" block round @click="doSearch">查找伙伴</van-button>
  </div>
</template>

<style scoped>

</style>
