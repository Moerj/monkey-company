<template>
    <div class="flex column h-100">
        <page-header></page-header>

        <div class="flex-1 flex">
            <sidebar></sidebar>
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
        }
    }
</script>