<template>
    <div>
        <el-form label-width="100px" class="ui-form">
            <el-form-item label="彩金名称">
                <el-input type="text"></el-input>
            </el-form-item>
            <el-form-item label="彩金类型">
                <el-radio-group v-model="form.couponType">
                    <el-radio-button :label="1">白菜</el-radio-button>
                    <el-radio-button :label="2">固定存送</el-radio-button>
                    <el-radio-button :label="3">比例存送</el-radio-button>
                </el-radio-group>
            </el-form-item>
    
            <div v-if="form.couponType==1">
                <el-form-item label="金额">
                    <el-input type="number"></el-input>
                </el-form-item>
            </div>
    
            <div v-if="form.couponType==2">
                <el-form-item label="存款金额">
                    <el-input type="number"></el-input>
                </el-form-item>
                <el-form-item label="赠送金额">
                    <el-input type="number"></el-input>
                </el-form-item>
            </div>
    
            <div v-if="form.couponType==3">
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
    
            <el-form-item label="流水要求">
                <el-select placeholder="请选择" v-model="test">
                </el-select>
            </el-form-item>
            <el-form-item label="提款限制">
                <el-select placeholder="请选择" v-model="test">
                </el-select>
            </el-form-item>
            <el-form-item label="优惠数量">
                <el-input-number :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="每日总限量">
                <el-input type="number"></el-input>
            </el-form-item>
            <el-form-item label="会员日限量">
                <el-input type="number"></el-input>
            </el-form-item>
    
            <el-form-item label="领取网址">
                <el-input>
                    <template slot="prepend">Http://</template>
                </el-input>
            </el-form-item>
            <el-form-item label="领取方式">
                <el-select placeholder="请选择" v-model="test">
                </el-select>
            </el-form-item>
            <el-form-item label="领取要求">
                <el-select placeholder="可选多项" v-model="test2" multiple>
                    <el-option v-for="item in testOpt" :key="item.value" :label="item.value" :value="item.value"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动规则">
                <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="代码选择">
                <el-radio v-model="form.codeType" :label="1">生成代码</el-radio>
                <el-radio v-model="form.codeType" :label="2">导入代码</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="large">发布彩金</el-button>
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
                couponType: 1,
                codeType: 1
            }
        }
    }
}
</script>