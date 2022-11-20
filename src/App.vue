<template>
    <div id="app">
        <div class="left">
            <Aside :list="asideList"></Aside>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Aside from './components/Aside';
export default {
    name: 'App',
    data() {
        return {
            asideList: [
                {
                    title: '客户对账管理',
                    path: '',
                    index: '1',
                    children: [
                        {
                            title: '附加费用录入',
                            path: '/addition',
                            index: '1-1',
                        },
                        {
                            title: '客户运费核对',
                            path: '/user',
                            index: '1-2',
                        },
                    ],
                },
                {
                    title: '内部对账管理',
                    path: '',
                    index: '2',
                    children: [
                        {
                            title: '内部费用录入',
                            path: '/user',
                            index: '2-1',
                        },
                        {
                            title: '内部运费核对',
                            path: '/user',
                            index: '2-2',
                        },
                    ],
                },
            ],
        };
    },
    components: {
        Aside,
    },
};
</script>

<style lang="less">
#app {
    display: flex;
    justify-content: space-between;
    .left {
        width: 188px;
    }
    .right {
        flex: 1;
    }
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.wrapper {
    width: 1252px;
}

li {
    list-style: none;
}

a {
    color: #333;
    text-decoration: none;
}

body {
    background-color: #fff;
}
</style>
