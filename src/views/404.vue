<template>
    <div class="vh-100 flex column column-col-center col-row-center">
        <iframe src="./static/404.html" width="100%" height="100%" frameborder="0"></iframe>
        <div style="position: absolute; bottom:15%; left:50%;">
            <el-button @click="$router.push('/')">返回首页</el-button>
        </div>
    </div>
</template>
