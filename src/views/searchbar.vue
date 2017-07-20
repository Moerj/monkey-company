<template>
    <div class="mb15 ui-form">
        <el-input v-model="search.keyword" placeholder="关键词" class="ui-input"></el-input>
        <el-select v-model="search.couponName" placeholder="请选择">
            <el-option v-for="item in couponNameOpt" :key="item.id" :value="item.name">
            </el-option>
        </el-select>
        <el-select v-model="search.status" placeholder="状态">
            <el-option value="1" label="已发布">
            </el-option>
            <el-option value="-1" label="已失效">
            </el-option>
            <el-option value="0" label="待审核">
            </el-option>
        </el-select>
        <el-date-picker v-model="search.timeRange" type="datetimerange" placeholder="选择时间范围">
        </el-date-picker>
        <el-button type="primary" @click="submit" :disabled="disableSubmit">查询</el-button>
    </div>
</template>

<script>
export default {
    props: {
        onSearch: {
            type: Function
        }
    },
    data() {
        return {
            search: {
                keyword: '',
                couponName: '',
                status: '',
                timeRange: [],
            },
            couponNameOpt: [
                {
                    name: '优惠券a',
                    id: '1'
                },
                {
                    name: '优惠券b',
                    id: '2'
                }
            ],
        }
    },
    methods: {
        submit() {
            this.onSearch && this.onSearch(this.search)
        }
    },
    computed: {
        disableSubmit() {
            let data = this.search
            if (data.keyword) {
                return false
            }
            if (data.couponName) {
                return false
            }
            if (data.status) {
                return false
            }
            if (data.timeRange.length && data.timeRange[0]) {
                return false
            }
            return true
        }
    }

}
</script>