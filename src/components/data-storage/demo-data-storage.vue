<template>
    <ui-main title="data-storage">
    
        <form style="width:195px;">

            <h4>sessionStorge</h4>
            <el-input v-model="boyFriend.height" placeholder="你男友的身高" class="m-b-15"></el-input>
            <el-input v-model="boyFriend.socialStatus" placeholder="你男友的身价"></el-input>
    
            <div class="ui hidden divider"></div>
    
            <el-input v-model="girlFriend.age" placeholder="你女友的年龄" class="m-b-15"></el-input>
            <el-select v-model="girlFriend.firstBoold" placeholder="处?">
                <el-option value="yes">是</el-option>
                <el-option value="no">否</el-option>
            </el-select>

            <div class="ui hidden divider"></div>

            <h4>localStorge</h4>
            <el-input v-model="yourName" placeholder="你的名字"></el-input>

            <div class="ui section divider"></div>
    
            <el-button type="info" @click="clear">忘掉一切 重新做人</el-button>
        </form>
    
        <ui-load-md file="data-storage.md"></ui-load-md>
    </ui-main>
</template>
<script>
export default {
    data() {
        return {
            boyFriend: {
                height: '',
                socialStatus: ''
            },
            girlFriend: {
                age: '',
                firstBoold: ''
            },
            yourName:''
        }
    },

    // ------------ data-storage ------------
    localStorage: 'yourName', //单个键值
    // localStorage: ['yourName', 'more key'], //多个键值用数组
    sessionStorage: {
        girlFriend:{}, //无配置项
        boyFriend: {
            type: Object,//可选, 默认 Any
            scope: 'boyFriend' //指定存入 Storage 后的 key 域
        }
    },
    // --------------------------------------

    methods: {
        clearData(data) {
            for (let key in data) {
                data[key] = ''
            }
        },
        clear() {
            this.yourName = ''
            this.clearData(this.boyFriend)
            this.clearData(this.girlFriend)
            this.$nextTick(() => {
                sessionStorage.clear()
                localStorage.clear()
            })
        }
    },
}
</script>
