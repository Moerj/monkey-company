## data-storage
通过 sessionStorage/loaclStorage 对 $data 进行数据保持


### How To Use


```js
export default {
    //单个保存
    sessionStorage: 'dataKey1',

    //多个保存
    localStorage: ['dataKey2','dataKey3'],

    //带配置
    localStorage: {
        dataKey1:{
            type: Object, //指定存储类型
            scope: 'storageKey' //指定存储作用域
        },
        'data-apple-red':{
            type: String
        }
    }
}
```

__or__

```js
export default {
    created(){
        this.$sessionStorage('dataKey', config)
        this.$localStorage('dataKey', config)
    }
}
```


### API

> dataKey

对于 this.data 中的 key

> config

参数名 | 类型    | 默认值           | 说明
-------|---------|------------------|------
type   |         |  Any             | 指定写入 Storage 的数据类型
scope  | string  |  route.fullPath  | 指定存入 Storage 后的 key 域