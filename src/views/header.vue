<style lang="scss" scoped>
.header {
    width: 100%;
    box-shadow: 1px 0 3px rgba(black,.2);
    z-index: 2;
    overflow: hidden;
}
.fold{
    position: absolute;
    bottom:0;
    left: 50%;
    transform: translate3d(-50%,100%,0);
    width: 80px;
    z-index: 2;
    background-color: rgb(246, 244, 238);
}
</style>
<template>
    <div class="relative">
        <div class="header flex row-between" :style="{ height: isFold?'0px':'' }">
            <div class="flex">
                <div class="flex row-center col-center ui-bg-gradient" style="width:150px">
                    <img src="~@/icons/logo.png" style="width:30px;margin-right:5px">
                    小猴说事
                </div>
                <div class="flex pl15 pt15 pb15">
                    <ui-img :url="user.avatar" size="3" class="ui-circle mr15"></ui-img>
                    <div>
                        <div class="flex row-between">
                            <span class="mr20">欢迎,{{user.company_name}}</span>
                            <div>
                                <img src="~@/icons/mail.png" style="width:20px;"> 站内信(
                                <i class="f-color-orange">6</i> )
                            </div>
                        </div>
                        <div class="f-color-grey">
                            <span class="mr20">上次登录: {{user.last_login_time}} <span v-if="user.last_login_area">(user.last_login_area)</span></span>
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
        <!--fold  -->
        <div class="fold">
            <el-button type="text" v-if="isFold" @click="isFold=false" class="p0 w-100">
                <i class="el-icon-arrow-down" ></i>
            </el-button>
            <el-button type="text" v-else @click="isFold=true" class="p0 w-100">
                <i class="el-icon-arrow-up" ></i>
            </el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isFold: false,
            }
        },
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
            },
        },
    }
</script>