<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {ref} from 'vue'
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
  <TopBar :title="`编辑${editUser.editName}`" :show-right="false"/>
  <van-form @submit="onSubmit">
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
