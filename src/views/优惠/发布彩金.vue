<template>
    <div>
        <el-form label-width="100px" class="ui-form">
            <el-form-item label="彩金名称" prop="name">
                <el-input type="text" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="彩金类型" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio-button :label="1">白菜</el-radio-button>
                    <el-radio-button :label="2">固定存送</el-radio-button>
                    <el-radio-button :label="3">比例存送</el-radio-button>
                </el-radio-group>
            </el-form-item>
    
            <div v-if="form.type==1">
                <el-form-item label="金额" prop="amount">
                    <el-input type="number" v-model="form.amount" min="0"></el-input>
                </el-form-item>
            </div>
    
            <div v-if="form.type==2">
                <el-form-item label="存款金额">
                    <el-input type="number"></el-input>
                </el-form-item>
                <el-form-item label="赠送金额">
                    <el-input type="number"></el-input>
                </el-form-item>
            </div>
    
            <div v-if="form.type==3">
                <el-form-item label="存送比例">
                    <el-input type="number" placeholder="输入百分比">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="最低存款">
                    <el-input type="number" placeholder="输入金额">
                    </el-input>
                </el-form-item>
                <el-form-item label="最高赠送">
                    <el-input type="number" placeholder="输入金额">
                    </el-input>
                </el-form-item>
            </div>
    
            <el-form-item label="流水要求" prop="multiple">
                <el-select placeholder="请选择" v-model="form.multiple">
                </el-select>
            </el-form-item>
            <el-form-item label="提款限制">
                <el-select placeholder="请选择" v-model="test">
                </el-select>
            </el-form-item>
            <el-form-item label="优惠数量" prop="num">
                <el-input-number :min="1" :max="10" v-model="form.num"></el-input-number>
            </el-form-item>
            <el-form-item label="每日总限量" prop="day_num">
                <el-input type="number" v-model="form.day_num" min="0"></el-input>
            </el-form-item>
            <el-form-item label="会员日限量" prop="user_day_num">
                <el-input type="number" v-model="form.user_day_num" min="0"></el-input>
            </el-form-item>
    
            <el-form-item label="领取网址" prop="url">
                <el-input v-model="form.url">
                    <template slot="prepend">Http://</template>
                </el-input>
            </el-form-item>
            <el-form-item label="领取方式">
                <el-select placeholder="请选择" v-model="test">
                </el-select>
            </el-form-item>
            <el-form-item label="领取要求" prop="coupon_request">
                <el-select placeholder="可选多项" v-model="form.coupon_request" multiple>
                    <el-option v-for="item in testOpt" :key="item.value" :label="item.value" :value="item.value"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动规则">
                <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="代码选择" prop="code_type">
                <el-radio v-model="form.code_type" :label="1">生成代码</el-radio>
                <el-radio v-model="form.code_type" :label="2">导入代码</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="large" @click="submit">发布彩金</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            test: '',
            testOpt: [
                {
                    value: '选项1'
                },
                {
                    value: '选项2'
                },
                {
                    value: '选项3'
                }
            ],
            test2: '',

            form: {
                amount:'',//金额
                code_type: 1,//生成代码方式	number	1生成 2导入 默认1
                coupon_request:'',	//领取要求	string	多个的话，用|分割
                day_num:'',	//日限量		
                max:'',	//最高赠送		
                multiple:'',	//流水倍数		
                name:'',	//菠菜名称		
                num:'',	//优惠数量		
                type: 1,	//类型		
                url:'',	//地址 string	
                user_day_num:'' //会员日限量
            }
        }
    },
    methods: {
        submit(){
            this.$http.post('index.php?g=home&m=CompanyUser&a=create_coupon',this.form)
            .then(({data})=>{
                console.log(data)
                data.msg && this.$message(data.msg)
            })
        }
    }
}
</script>