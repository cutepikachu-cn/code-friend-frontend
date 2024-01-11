import {createRouter, createWebHistory} from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import Login from '@/pages/Login/index.vue'
import Home from '@/pages/Home/index.vue'
import Team from '@/pages/Team/index.vue'
import User from '@/pages/User/index.vue'
import Search from '@/pages/Search/index.vue'
import SearchResult from '@/pages/Search/SearchResult.vue'
import UserEdit from '@/pages/User/UserEdit.vue'
import CreateTeam from '@/pages/Team/CreateTeam.vue'
import TeamEdit from '@/pages/Team/TeamEdit.vue'
import UserInfo from "@/pages/User/UserInfo.vue";
import ManageTeams from "@/pages/User/ManageTeams.vue";
import JoinedTeams from "@/pages/User/JoinedTeams.vue";
import TeamInfo from "@/pages/Team/TeamInfo.vue";
import Register from '@/pages/Register/index.vue'

const routes = [
    {path: '', redirect: '/home'},
    {path: '/user/login', meta: {title: '用户登录'}, component: Login},
    {path: '/user/register', meta: {title: '用户注册'}, component: Register},
    {
        path: '/',
        component: BasicLayout,
        children: [
            {path: 'home', meta: {title: '伙伴匹配'}, component: Home},
            {path: 'team', meta: {title: '队伍'}, component: Team},
            {path: 'user', meta: {title: '用户'}, component: User},
        ]
    },
    {path: '/user/search', meta: {title: '搜索用户'}, component: Search},
    {path: '/user/search/result', meta: {title: '搜索结果'}, component: SearchResult},
    {path: '/user/info', meta: {title: '个人信息'}, component: UserInfo},
    {path: '/user/edit', meta: {title: '编辑信息'}, component: UserEdit},
    {path: '/user/team/manage', meta: {title: '管理的队伍'}, component: ManageTeams},
    {path: '/user/team/join', meta: {title: '加入的队伍'}, component: JoinedTeams},
    {path: '/team/create', meta: {title: '创建队伍'}, component: CreateTeam},
    {path: '/team/edit', meta: {title: '编辑队伍信息'}, component: TeamEdit},
    {path: '/team/info', meta: {title: '队伍信息'}, component: TeamInfo}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
