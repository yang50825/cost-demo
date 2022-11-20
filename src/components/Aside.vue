<template>
    <div class="aside_box">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#001529"
            text-color="#fff"
            active-text-color="#ffd04b"
            321
            :unique-opened="true"
        >
            <el-submenu v-for="(obj, index) in list" :key="index" :index="obj.index">
                <template slot="title" class="submenu">
                    <i v-if="obj.icon != ''" :class="obj.icon"></i>
                    <span>{{ obj.title }}</span>
                </template>
                <el-menu-item-group v-for="(item, index) in obj.children" :key="index">
                    <el-menu-item :index="item.index">{{ obj.title }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'Aside',
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    props: {
        list: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="less" scoped>
.aside_box {
    min-height: 900px;
    background-color: #001324;
    .el-menu-vertical-demo {
        .el-submenu {
            .el-submenu__title {
                padding-left: 40px !important;
            }
            .el-menu-item-group {
                .el-menu-item {
                    min-width: 185px !important;
                }
                & .el-menu-item:hover {
                    background-color: #0099ff !important;
                }
            }
        }
    }
}
</style>
