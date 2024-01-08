<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {userLogin} from "@/plugins/request/userAPI.ts";
import {setCurrentUserState} from "@/states/user.ts";
import 'vant/es/toast/style'
import {UserLoginParams} from "@/modules/requestParams";

const router = useRouter()

const userLoginParams = ref<UserLoginParams>({
  account: 'cute-pikachu',
  password: '12345678'
})
const onSubmit = () => {
  userLogin(userLoginParams.value).then(res => {
    if (res.code !== 0) {
      return
    }
    setCurrentUserState(res.data)
    router.replace('/home')
  })

}
</script>

<template>
  <van-form @submit="onSubmit"
            :style="{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}">
    <van-cell-group inset>
      <van-field
          v-model="userLoginParams.account"
          name="account"
          label="账户名"
          placeholder="账户名"
          :rules="[{ required: true, message: '请输入账户名'}]"
      />
      <van-field
          v-model="userLoginParams.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请输入密码'}]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>
