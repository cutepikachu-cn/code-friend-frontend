<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import {UserRegisterParams} from "@/modules/requestParams.d.ts";
import {ref} from "vue";
import {userRegister} from "@/plugins/request/userAPI.ts";
import {showSuccessToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter()

const userRegisterParams = ref<UserRegisterParams>({})
const rules = {
  account: [
    {required: true, message: '请输入账户名'},
    {pattern: /^[\w-]{4,16}$/, message: '账户必须为4~16位字母、数字、下划线或减号组合'}
  ],
  password: [
    {required: true, message: '请输入密码'},
    {pattern: /^[\w-]{8,20}$/, message: '密码必须为8~20位字母、数字、下划线或减号组合'}
  ],
  checkPassword: [
    {
      message: '确认密码与密码必须一致',
      validator: value => value === userRegisterParams.value.password
    }
  ]
}

const onSubmit = () => {
  userRegister(userRegisterParams.value).then(res => {
    if (res.code !== 0) {
      return
    }
    showSuccessToast(res.message)
    router.replace('/')
  })
}
</script>

<template>
  <TopBar :show-right="false"/>
  <van-form @submit="onSubmit">
    <van-cell-group inset class="van-hairline--bottom">
      <van-field
          v-model="userRegisterParams.account"
          name="account"
          label="账户名"
          placeholder="账户名"
          :rules="rules.account"
      />
      <van-field
          v-model="userRegisterParams.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="rules.password"
      />
      <van-field
          v-model="userRegisterParams.checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="确认密码"
          :rules="rules.checkPassword"
      />
    </van-cell-group>
    <div :style="{margin: '16px'}">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>
