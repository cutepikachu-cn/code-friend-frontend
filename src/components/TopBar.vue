<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {onMounted, ref} from "vue";

const router = useRouter()
const route = useRoute()

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
onMounted(() => {
  title.value = route.meta.title as string
  document.title = route.meta.title as string
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
