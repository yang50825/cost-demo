<template>
    <div class="addition_cost">
        <div class="wrapper main">
            <el-tabs type="border-card">
                <el-tab-pane label="首页">
                    <CostIndex></CostIndex>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import CostIndex from './Second/CostIndex';
export default {
    components: {
        CostIndex,
    },
};
</script>

<style lang="less" scoped>
.addition_cost {
    .main {
        float: right;
    }
}
</style>
