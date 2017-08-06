<template>
    <div class="mb15 ui-form">
        <el-input v-if="username" v-model="search.user_name" placeholder="用户名" class="ui-input"></el-input>
        <el-input v-model="search.keyword" placeholder="关键词" class="ui-input"></el-input>
        <el-select v-model="search.status" placeholder="状态">
            <el-option value="1" label="正常">
            </el-option>
            <el-option value="2" label="待审核">
            </el-option>
            <el-option value="3" label="新建">
            </el-option>
            <el-option value="4" label="审核驳回">
            </el-option>
        </el-select>
        <el-date-picker v-model="search.timeRange" type="datetimerange" placeholder="选择时间范围" @change="timeDataChange">
        </el-date-picker>
        <el-button type="primary" @click="submit" :disabled="disableSubmit">查询</el-button>
    </div>
</template>

<script>
export default {
    props: {
        onSearch: {
            type: Function
        },
        username:{
            type:Boolean
        }
    },
    data() {
        return {
            search: {
                user_name:'',
                keyword: '',
                status: '',
                timeRange: [],
                begin_date:'',
                end_date:''
            },
        }
    },
    methods: {
        submit() {
            this.onSearch && this.onSearch(this.search)
        },
        timeDataChange(v){
            let data = v.split(' - ')
            this.search.begin_date = data[0]
            this.search.end_date = data[1]
        }
    },
    computed: {
        disableSubmit() {//查询按钮状态控制
            let data = this.search
            if (data.user_name) {
                return false
            }
            if (data.keyword) {
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
    },
}
</script>