<template>
    <div class="cost_index">
        <div class="box_1">
            <div>
                <span>费用名称</span>
                <el-input
                    v-model="cost.costName"
                    placeholder="请输入"
                    style="width: 200px"
                ></el-input>
            </div>
            <div>
                <span>选择币别</span>
                <el-select v-model="cost.costCurrency" placeholder="全部">
                    <el-option
                        v-for="(val, index) in currencyList"
                        :key="index"
                        :label="val"
                        :value="val"
                    ></el-option>
                </el-select>
            </div>
            <div>
                <span>结余状态</span>
                <el-select v-model="cost.costStatus" placeholder="全部">
                    <el-option
                        v-for="(val, index) in statusList"
                        :key="index"
                        :label="val == 1 ? '已结余' : '未结余'"
                        :value="val"
                    ></el-option>
                </el-select>
            </div>
            <div>
                <el-button @click="queryCostList">查询</el-button>
            </div>
        </div>
        <div class="main">
            <div class="box_1">
                <div class="sp">
                    <el-button type="success" @click="dialogFormVisible = true">添加</el-button>
                </div>
            </div>

            <el-dialog title="填写费用单" :visible.sync="dialogFormVisible">
                <el-form :model="costForm" ref="costAddForm">
                    <el-form-item label="费用名称" prop="costName" :label-width="formLabelWidth">
                        <el-input v-model="costForm.costName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="金额" prop="costSum" :label-width="formLabelWidth">
                        <el-input v-model="costForm.costSum" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="选择币别"
                        prop="costCurrency"
                        :label-width="formLabelWidth"
                    >
                        <el-select v-model="costForm.costCurrency" placeholder="请选择">
                            <el-option
                                v-for="(val, index) in currencyList"
                                :key="index"
                                :label="val"
                                :value="val"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="汇率" prop="costRate" :label-width="formLabelWidth">
                        <el-input v-model="costForm.costRate" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="转人民币金额"
                        prop="costMoney"
                        :label-width="formLabelWidth"
                    >
                        <el-input v-model="sumMoney" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="costStatus" :label-width="formLabelWidth">
                        <el-select v-model="costForm.costStatus" placeholder="请选择">
                            <el-option
                                v-for="(val, index) in statusList"
                                :key="index"
                                :label="val == 1 ? '已结余' : '未结余'"
                                :value="val"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述" prop="costDesc" :label-width="formLabelWidth">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="请输入内容"
                            v-model="costForm.costDesc"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="resetForm('costAddForm')">取 消</el-button>
                    <el-button type="primary" @click="addCost">确 定</el-button>
                </div>
            </el-dialog>

            <el-table :data="list" border style="width: 100%">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column prop="costName" label="费用名称"></el-table-column>
                <el-table-column prop="costSum" label="金额"></el-table-column>
                <el-table-column prop="costCurrency" label="币别"></el-table-column>
                <el-table-column prop="costRate" label="汇率">
                    <template slot-scope="scope">1: {{ scope.row.costRate }}</template>
                </el-table-column>
                <el-table-column prop="costMoney" label="转人民币金额"></el-table-column>
                <el-table-column prop="costStatus" label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.costStatus === 1 ? '已结余' : '未结余' }}
                    </template>
                </el-table-column>
                <el-table-column prop="costDesc" label="备注"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="warning"
                            size="mini"
                            @click="queryCostById(scope.row.costId)"
                        >
                            编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="deleteCost(scope.row.costId)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CostIndex',
    computed: {
        sumMoney() {
            this.costForm.costMoney = this.costForm.costSum * this.costForm.costRate;
            return this.costForm.costMoney;
        },
    },
    data() {
        return {
            costForm: {
                costId: '',
                costName: '',
                costSum: 0,
                costCurrency: '',
                costRate: 0,
                costMoney: 0,
                costStatus: 0,
                costDesc: '',
            },
            formLabelWidth: '120px',
            dialogFormVisible: false,
            list: [],
            cost: {
                costName: '',
                costCurrency: '',
                costStatus: '',
            },
            currencyList: ['RMB', 'USD', 'EUR'],
            statusList: [0, 1],
        };
    },
    methods: {
        queryCostById(id) {
            this.$axios({
                url: '/api/cost/queryCostById',
                params: {
                    id,
                },
            }).then(res => {
                // console.log(res);
                this.costForm = res.data.data;
                this.dialogFormVisible = true;
            });
        },
        addCost() {
            let url = '';
            if (this.costForm.costId === '') {
                // id为空进行新增操作
                url = '/api/cost/addCost';
            } else {
                // id不为空进行修改操作
                url = '/api/cost/updateCostById';
            }
            this.$axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                url: url,
                method: 'post',
                data: {
                    ...this.costForm,
                },
            }).then(() => {
                this.resetForm('costAddForm');
                this.queryCostList();
            });
        },
        resetForm(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        deleteCost(costId) {
            console.log(costId);
            this.$axios({
                url: '/api/cost/deleteCostById',
                params: {
                    costId,
                },
            }).then(() => {
                this.queryCostList;
            });
        },
        queryCostList() {
            console.log({ ...this.cost });
            let cost = JSON.stringify(this.cost);
            this.$axios({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'POST',
                url: '/api/cost/queryCostList',
                data: {
                    ...this.cost,
                },
            }).then(res => {
                if (res.data.code === 200) {
                    this.list = res.data.data;
                }
            });
        },
    },
    created() {
        this.queryCostList();
    },
};
</script>

<style lang="less" scoped>
.cost_index {
    .box_1 {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        height: 45px;
        background: inherit;
        background-color: rgba(244, 249, 250, 1);
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(204, 204, 204, 1);
        border-radius: 0px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        font-size: 14px;
        div {
            margin-right: 15px;
            span {
                margin: 0 20px;
            }
        }
    }
    .main {
        margin-top: 10px;
    }
}
</style>
