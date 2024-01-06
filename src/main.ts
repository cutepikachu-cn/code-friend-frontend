import {createApp} from 'vue'
import router from '@/config/route.ts'
import pinia from '@/config/store.ts'
import App from '@/App.vue'
import {init} from "@/plugins/initState.ts";

const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')

// init()
