<template>
    <div class="flex column">
        <page-header></page-header>

        <div class="flex-1 flex">
            <sidebar class="ui-scrollbar"></sidebar>
            <router-view class="flex-1 p20 scroll-y"></router-view>
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
                fullscreenLoading: true
            }
        },
        beforeCreate () {
            let loading = this.$loading({ fullscreen: true, text:'小猴说事' })

            this.$http.get('index.php?g=home&m=CompanyUser&a=common')
            .then(({data})=>{
                console.log('公司基础数据:',data)
                loading.close()
                if (data.code!==1) {
                    this.$router.push('/login')
                }
            })
        }
    }
</script>