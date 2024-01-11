<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {onMounted, ref} from 'vue'
import TopBar from '@/components/TopBar.vue'
import {showSuccessToast} from "vant";
import 'vant/es/toast/style'
import {setCurrentUserState} from "@/states/user.js";
import {updateUser} from "@/plugins/request/userAPI.js";
import {UpdateUserParams} from "@/modules/requestParams.js";

const route = useRoute()
const router = useRouter()

const editUser = ref({
  ...route.query
})

const tag = ref<string>("")
onMounted(() => {
  editUser.value.currentValue = editUser.value.currentValue?.split(',')
})
const addTag = () => {
  if (tag.value.length === 0) {
    return
  }
  if (editUser.value.currentValue?.find(tagName => tagName === tag.value)) {
    return
  }
  editUser.value.currentValue?.push(tag.value.toLowerCase())
  tag.value = ''
}
const removeTag = (value) => {
  editUser.value.currentValue = editUser.value.currentValue?.filter(tagName => tagName !== value)
}

const onSubmit = async () => {
  const params: UpdateUserParams = {
    [editUser.value.editKey]: editUser.value.currentValue
  }
  updateUser(params).then(res => {
    if (res.code !== 0) {
      return
    }
    setCurrentUserState(res.data)
    showSuccessToast(res.message)
    router.back()
  }).catch(err => {
    console.log(err)
  })
}
</script>

<template>
  <TopBar :show-right="false"/>
  <van-form @submit="onSubmit" v-if="editUser.editKey === 'tags'">
    <van-field
        v-model="tag"
        center
        label="标签名"
        placeholder="请输入标签名"
        :formatter="val => val.substring(0, 10)"
        format-trigger="onChange"
    >
      <template #button>
        <van-button size="small" type="primary" @click="addTag">添加标签</van-button>
      </template>
    </van-field>
    <van-row>
      <van-tag type="primary" size="large"
               closeable
               @close="removeTag(tagName)"
               v-for="tagName in editUser.currentValue"
               :key="tagName" :style="{margin: '5px'}">
        {{ tagName }}
      </van-tag>
    </van-row>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交修改
      </van-button>
    </div>
  </van-form>
  <van-form @submit="onSubmit" v-else>
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        center
        clearable
        :placeholder="`请输入${editUser.editName}`"
        :rules="[{required: true, message: '不可为空'}]"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交修改
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>
