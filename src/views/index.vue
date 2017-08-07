<template>
    <div class="flex column" v-if="ready">
        <page-header></page-header>

        <div class="flex-1 flex">
            <sidebar class="ui-scrollbar"></sidebar>
            <router-view class="flex-1 scroll relative p20 pt30 pb5" id="main"></router-view>
        </div>
    </div>
</template>

<script>
    import pageHeader from '@/views/header'
    import sidebar from '@/views/sidebar'
    export default {
        components: {
            pageHeader,
            sidebar
        },
        data () {
            return {
                ready: false
            }
        },
        beforeCreate () {
            let loading = this.$loading({ fullscreen: true, text:'小猴说事' })

            this.$http.get('index.php?g=home&m=CompanyUser&a=common')
            .then(({data})=>{
                // console.log('公司基础数据:',data)
                loading.close()
                this.ready = true
                if (data.code===1) {
                    this.$store.commit({
                        type: 'update', //mutaitions 操作数据类型
                        data: data.data,//要保存的数据
                        modules: 'user' //保存到哪个模块
                    })
                }else{
                    this.$router.push('/login')
                }
            })
        },
    }
</script>