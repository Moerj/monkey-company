<style lang="scss" scoped>
.header {
    width: 100%;
    box-shadow: 1px 0 3px rgba(black,.2);
    z-index: 2;
}
</style>
<template>
    <div class="header flex row-between">
        <div class="flex">
            <div class="flex row-center col-center ui-bg-gradient" style="width:150px">
                <img src="~@/icons/logo.png" style="width:30px;margin-right:5px">
                小猴说事
            </div>
            <div class="flex pl15 pt15 pb15">
                <ui-img url="http://tva3.sinaimg.cn/crop.536.63.373.373.180/8d65f675jw8f0c5pbbtg7j20u50k4jvi.jpg" size="3" class="ui-circle mr15"></ui-img>
                <div>
                    <div class="flex row-between">
                        <span class="mr20">欢迎,{{user.company_name}}</span>
                        <div>
                            <img src="~@/icons/mail.png" style="width:20px;"> 站内信(
                            <i class="f-color-orange">6</i> )
                        </div>
                    </div>
                    <div class="f-color-grey">
                        <span class="mr20">上次登录: {{user.last_login_time}} (北京市区)</span>
                        <el-button type="text" @click="logout">退出</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex mr10">
            <div class="ui-border-right pl15 pr15 flex col-center">
                <span>
                    <i class="f30 f-color-orange">{{user.favorite_num}}</i>
                    人关注
                </span>
            </div>
            <div class="pl15 pr15 flex col-center">
                <span>
                    <i class="f30 f-color-orange">{{user.coupon_comment_num}}</i>
                    条评论
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            logout(){
                this.$router.push('/login')
                this.$http.get('index.php?g=home&m=CompanyUser&a=logout')
                .then(({data})=>{
                    console.log('登出',data)
                })
            }
        },
        computed: {
            user(){
                return this.$store.state.user
            }
        },
        mounted () {
        }
    }
</script>