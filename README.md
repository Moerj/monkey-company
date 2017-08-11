# monkey-pc

> 小猴说事-pc版

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

##兼容性
不兼容ie9及以下版本


## Vuex
```js
this.$store.commit({
    type: 'update', //mutaitions 操作数据类型
    data: data.data,//要保存的数据
    modules: 'modulesName' //保存到哪个模块
})
```