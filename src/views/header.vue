<style lang="scss" scoped>
.header {
    padding: 25px 15px;
    width: 100%;
}
</style>
<template>
    <div class="header flex row-between ui-border-bottom">
        <div class="flex">
            <ui-img url="http://tva3.sinaimg.cn/crop.536.63.373.373.180/8d65f675jw8f0c5pbbtg7j20u50k4jvi.jpg" size="3" class="ui-circle"></ui-img>
            <div>
                <div>
                    <span class="mr20">欢迎,Moer</span>
                    <div>
                        <img src="~@/icons/mail.png" style="width:20px;"> 站内信(
                        <i class="f-color-orange">6</i> )
                    </div>
                </div>
                <div>
                    <span class="mr20">上次登录: 2017-31-11(北京市区)</span>
                    <el-button type="text">退出</el-button>
                </div>
            </div>
        </div>
        <div class="flex">
            <div class="ui-border-right">
                <span>
                    <i class="f30 f-color-orange">980</i>
                    人关注
                </span>
            </div>
            <div>
                <span>
                    <i class="f30 f-color-orange">980</i>
                    条评论
                </span>
            </div>
        </div>
    </div>
</template>