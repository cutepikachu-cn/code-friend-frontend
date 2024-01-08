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

const routes = [
    {path: '', redirect: '/home'},
    {path: '/login', component: Login},
    {
        path: '/',
        component: BasicLayout,
        children: [
            {path: 'home', component: Home},
            {path: 'team', component: Team},
            {path: 'user', component: User},
        ]
    },
    {path: '/search', component: Search},
    {path: '/search/result', component: SearchResult},
    {path: '/user/info', component: UserInfo},
    {path: '/user/edit', component: UserEdit},
    {path: '/user/team/manage', component: ManageTeams},
    {path: '/user/team/join', component: JoinedTeams},
    {path: '/team/create', component: CreateTeam},
    {path: '/team/edit', component: TeamEdit}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
