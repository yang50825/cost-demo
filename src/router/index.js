// 该文件用于创建整个应用的路由器
import VueRouter from 'vue-router';

// 引入组件
import AdditionCost from '../views/AdditionCost.vue';
import UserCost from '../views/UserCost.vue';

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/addition',
        },
        {
            path: '/addition',
            component: AdditionCost,
        },
        {
            path: '/user',
            component: UserCost,
        },
    ],
});
