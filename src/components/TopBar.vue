<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()

const onClickLeft = () => history.back()
const onClickRight = () => router.push('/search')

const props = defineProps({
	title: {
		default: '',
		type: String
	},
	showLeft: {
		default: true,
		type: Boolean
	},
	showRight: {
		default: true,
		type: Boolean
	},
})
</script>

<template>
  <van-nav-bar
      :title="props.title"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      placeholder
      fixed
  >
    <template #left v-if="props.showLeft">
      <slot name="left">
        <van-icon name="arrow-left" size="18"/>
      </slot>
    </template>
    <template #right v-if="props.showRight">
      <slot name="right">
        <van-icon name="search" size="18"/>
      </slot>
    </template>
  </van-nav-bar>
</template>

<style scoped>

</style>
