<style lang="scss" scoped>
    @import '~@/scss/public.scss';
    #app{
        height: 100%;
        overflow: hidden;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADxCAIAAACF5UrHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowRjZCNjQzRTNGNDlFNzExQURFM0E2Mjk5OURERDZEQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4Nzk1NjRGQTY4NDAxMUU3QTg3RUQwQjlGNDBFQjAwMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4Nzk1NjRGOTY4NDAxMUU3QTg3RUQwQjlGNDBFQjAwMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI5MkZEQzIxMTY1Q0U3MTFBMzFBOURCMDQzQkYxRTAxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBGNkI2NDNFM0Y0OUU3MTFBREUzQTYyOTk5RERENkRCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3kCIZwAAABlJREFUeNpikJFWYGJgYBjFo3gUD00MEGAA0qoCOLBmNsQAAAAASUVORK5CYII=);
        background-repeat: repeat-x;
    }
    .main-router{
        width: 1280px;
        height: 100%;
        background-color: #fff;
        margin: 0 auto;
        @include box-shadow;
    }
</style>
<template>
    <div id="app">
        <router-view class="main-router scrollbar-global"></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    mounted(){
        let ie8 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8."
        let ie9 = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9." 
        let ie10 = navigator.userAgent.indexOf('MSIE 10.0')>0
        if (ie10 || ie9 || ie8) {
            this.$notify({
                title: '您的ie浏览器版本太低',
                message: '无法正常浏览本网站！请升级更换最新的现代浏览器如：Chrome（谷歌）浏览器以获得最佳体验。',
                type: 'warning',
                duration: 0
            });
        }
    },
}
</script>

