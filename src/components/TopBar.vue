<script setup lang="ts">
import {useRouter} from 'vue-router'
import {ref} from "vue";

const router = useRouter()

const onClickLeft = () => history.back()
const onClickRight = () => router.push('/user/search')

const props = defineProps({
  showLeft: {
    default: true,
    type: Boolean
  },
  showRight: {
    default: true,
    type: Boolean
  },
})

const title = ref<string>('')
router.beforeEach((to, _) => {
  document.title = to.meta.title ? to.meta.title as string : '码友匹配'
 title.value = to.meta.title ? to.meta.title as string : ''
})
</script>

<template>
  <van-nav-bar
      :title="title"
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
