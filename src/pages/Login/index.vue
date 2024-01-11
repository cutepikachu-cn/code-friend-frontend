<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {userLogin} from "@/plugins/request/userAPI.ts";
import {setCurrentUserState} from "@/states/user.ts";
import 'vant/es/toast/style'
import {UserLoginParams} from "@/modules/requestParams";
import TopBar from "@/components/TopBar.vue";

const router = useRouter()
const route = useRoute()

const userLoginParams = ref<UserLoginParams>({
  account: 'cute-pikachu',
  password: '12345678'
})
const onSubmit = () => {
  userLogin(userLoginParams.value).then(res => {
    if (res.code !== 0) {
      return
    }
    if (route.query.redirectURL) {
      window.location.href = route.query.redirectURL as string
    } else {
      router.replace('/')
    }
    setCurrentUserState(res.data)

  })

}
</script>

<template>
  <TopBar :show-left="false" :show-right="false"/>
  <van-form @submit="onSubmit">
    <van-cell-group inset class="van-hairline--bottom">
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
    <div :style="{margin: '16px', textAlign: 'right'}">
      <RouterLink to="/user/register"
                  :style="{fontSize: 'var(--van-font-size-md)', color: 'var(--van-blue)'}">
        没有账户？去注册
        <van-icon name="arrow"/>
      </RouterLink>
    </div>
    <div :style="{margin: '16px'}">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>
