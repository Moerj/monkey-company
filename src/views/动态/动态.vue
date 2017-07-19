<template>
    <div>
        <el-form>
            <el-input v-model="search.keyword" placeholder="关键词" class="ui-input"></el-input>
            <el-select v-model="search.couponName" placeholder="请选择">
                <el-option v-for="item in couponNameOpt" :key="item.id" :value="item.name">
                </el-option>
            </el-select>
            <el-select v-model="search.status" placeholder="状态">
                <el-option value="1" label="通过">
                </el-option>
                <el-option value="0" label="不通过">
                </el-option>
            </el-select>
            <el-date-picker v-model="search.timeRange" type="datetimerange" placeholder="选择时间范围">
            </el-date-picker>
        </el-form>

        <el-button icon="edit" type="primary" class="mb20 mt20">发布新文章</el-button>

        <list-item v-for="(item,index) in 6" :key="'list-item'+index"></list-item>
        <div class="text-center mt15">
            <el-pagination
            @size-change=""
            @current-change=""
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import listItem from '@/views/动态/list-item'
export default {
    components: {
        listItem
    },
    data() {
        return {
            search: {
                keyword: '',
                couponName: '',
                status: '',
                timeRange: [],
                endTime: ''
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

            currentPage:1
        }
    }
}
</script>   