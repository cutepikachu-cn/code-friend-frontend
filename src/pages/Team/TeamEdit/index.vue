<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import {onMounted, ref} from 'vue'
import {UpdateTeamParams} from "@/modules/requestParams";
import {useRoute} from "vue-router";
import {getTeam, updateTeam} from "@/plugins/request/teamAPI.ts";
import {showSuccessToast} from "vant";

const route = useRoute()

const teamId = Number(route.query?.teamId)
// 初始队伍信息
const initialTeamInfo = ref<UpdateTeamParams>({})

onMounted(async () => {
  getTeam(teamId).then(res => {
    const {members, createTime, ...teamInfo} = res.data
    teamInfo.expireTime = new Date(teamInfo.expireTime)
    form.value = {...teamInfo}
    expireTime_date.value = form.value.expireTime?.toLocaleDateString()
    expireTime_time.value = form.value.expireTime?.toLocaleTimeString()
  })
})

// 表单
const form = ref<UpdateTeamParams>({})
const expireTime_date = ref(form.value.expireTime?.toLocaleDateString())
const expireTime_time = ref(form.value.expireTime?.toLocaleTimeString())

// 验证规则
const rules = {
  name: [
    {required: true, message: '队伍名称不能为空'},
    {
      message: "队伍名称长度必须为5~20个字符",
      validator: value => value.length >= 5 && value.length <= 20
    }
  ],
  description: [
    {
      message: '队伍描述最大长度512个字符',
      validator: value => value.length <= 512
    },
  ],
  maxNumber: [
    {
      message: '队伍人数必须为2~10人',
      validator: value => value >= 2 && value <= 10
    },
  ],
  expireTime: [
    {
      message: '队伍过期时间必须晚于当前时间',
      validator: () => form.value.expireTime > new Date(),
      trigger: 'onSubmit'
    }
  ],
  password: [
    {
      message: '私密队伍需要设置密码（8~20位字母、数字、下划线或减号组合）',
      validator: value => {
        if (form.value.status !== 2) {
          return true
        }
        return value.length !== 0 && /^[\w-]{8,20}$/.test(value);
      }
    }
  ]
}

// 组队有效时间设置
const showDatePicker = ref(false)
const showTimePicker = ref(false)
const onConfirmExpireTime_date = ({selectedValues: values}) => {
  values.forEach((value, index) => {
    values[index] = Number(value)
  })
  form.value.expireTime?.setFullYear(values[0])
  form.value.expireTime?.setMonth(values[1] - 1, values[2])

  expireTime_date.value = form.value.expireTime?.toLocaleDateString()

  showDatePicker.value = false
}
const onConfirmExpireTime_time = ({selectedValues: values}) => {
  values.forEach((value, index) => {
    values[index] = Number(value)
  })
  form.value.expireTime?.setHours(...values)

  expireTime_time.value = form.value.expireTime?.toLocaleTimeString()

  showTimePicker.value = false
}

// 队伍标签
const tag = ref('')
const addTag = () => {
  if (tag.value.length === 0) {
    return
  }
  if (form.value.tags?.find(tagName => tagName === tag.value)) {
    return
  }
  form.value.tags?.push(tag.value.toLowerCase())
  tag.value = ''
}
const removeTag = (value) => {
  form.value.tags = form.value.tags?.filter(tagName => tagName !== value)
}

const onSubmit = () => {
  updateTeam(form.value).then(res => {
    if (res.code !== 0) {
      return
    }
    showSuccessToast(res.message)
  })
};
</script>

<template>
  <TopBar title="修改队伍信息" :show-right="false"/>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="form.name"
          name="name"
          label="队伍名称"
          placeholder="请输入队伍名称"
          :rules="rules.name"
      />
      <van-field
          v-model="form.description"
          name="name"
          label="队伍描述"
          placeholder="请输入队伍描述"
          type="textarea"
          :rules="rules.description"
      />
      <van-field name="maxNumber" label="队伍人数">
        <template #input>
          <van-stepper v-model="form.maxNumber"
                       min="2"
                       max="10"/>
        </template>
      </van-field>
      <van-cell-group title="组队有效时间" inset>
        <van-field
            v-model="expireTime_date"
            is-link
            name="expireTime_date"
            label="日期"
            placeholder="点击选择日期"
            @click="showDatePicker = true"
        />
        <van-popup v-model:show="showDatePicker" position="bottom">
          <van-date-picker
              @confirm="onConfirmExpireTime_date"
              @cancel="showDatePicker = false"
              :min-date="new Date()"/>
        </van-popup>
        <van-field
            v-model="expireTime_time"
            is-link
            name="expireTime_time"
            label="时间"
            placeholder="点击选择时间"
            @click="showTimePicker = true"
            :rules="rules.expireTime"
        />
        <van-popup v-model:show="showTimePicker" position="bottom">
          <van-time-picker
              @confirm="onConfirmExpireTime_time"
              @cancel="showTimePicker = false"/>
        </van-popup>
      </van-cell-group>
      <van-field name="status" label="队伍状态">
        <template #input>
          <van-radio-group v-model="form.status" direction="horizontal">
            <van-radio :name="0">公开</van-radio>
            <van-radio :name="1">私密</van-radio>
            <van-radio :name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-show="form.status === 2"
          v-model="form.password"
          type="password"
          name="队伍密码"
          label="队伍密码"
          placeholder="请输入队伍密码"
          :rules="rules.password"
      />
      <van-cell-group title="队伍标签" inset>
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
                   v-for="tagName in form.tags"
                   :key="tagName" :style="{margin: '5px'}">
            {{ tagName }}
          </van-tag>
        </van-row>
      </van-cell-group>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交修改
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>
