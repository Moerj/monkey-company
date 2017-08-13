<style lang="scss" scoped>
    @import '~@/scss/public.scss';
    .card{
        width:280px;
        margin-right: 25px;
        margin-bottom: 25px;
        .show-details{
            background: $ui-color-orange;
            opacity: 0;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .3s;
            .el-button{
                background: transparent;
                color: white;
                border-color: white;
            }
        }
        &:hover{
            .show-details{
                opacity: .7;
            }
        }
    }
    .hover-color{
        &:hover{
            background-color: rgba(orange,.06);
        }
    }

    .progress-width{
        width: 200px;
    }
</style>
<template>
    <div>
        <!-- 2级节点  -->
        <div v-for="list in node2" v-if="list.children" class="mb15 pt5">
            <div class="flex-1 flex row-between col-center p15 pl0" :class="{'hover-color':list.children,'cursor-pointer':list.children}" @click="toggleNode(list)">
                <div class="flex col-center">
                    <img :src="list.pic" height="50" class="mr15">
                    <div class="flex">
                        <span class="f16 mr15">{{list.name}}</span>
                        <!-- 折叠时,显示总体数据  -->
                        <transition name="slide-row">
                            <div v-if="list.isFold || !list.children" class="flex col-center">
                                <el-progress :percentage="getProgress(list.score)" :show-text="false" status="success" class="progress-width mr15"></el-progress> 
                                {{list.score_txt}}
                            </div>
                        </transition>
                    </div>
                </div>

                <!-- 折叠箭头 -->
                <div v-if="list.children" class="f20 f-color-orange">
                    <transition name="fade" mode="out-in">
                        <i v-if="list.isFold" class="el-icon-arrow-down" key="fold"></i>
                        <i v-if="!list.isFold" class="el-icon-arrow-up" key="unfold"></i>
                    </transition>
                </div>
            </div>

            <!--list  -->
            <transition-group name="slide-row"> 
                <!-- 展开式详细卡片数据  -->
                <div v-if="!list.isFold" key="unfold" class="flex flex-wrap pb15">
                    <el-card v-for="card in list.children" :key="card.id" @click.native="showDetails(list,card)"  class="card relative cursor-pointer">
                        <ui-title class="f12 block">
                            <div class="flex row-between col-center">
                                <span>{{card.name}}</span>
                                <span class="f10">高于同行 <i class="f-color-orange">{{parseFloat(card.score_percent*100).toFixed(2)}}%</i></span>
                            </div>
                        </ui-title>
                        <div class="flex row-between col-center">
                            <el-progress :percentage="getProgress(card.score)" :show-text="false" status="success" class="flex-1 mr15"></el-progress>
                            {{card.score_txt}}
                        </div>
                        <div class="show-details">
                            <el-button>查看详情</el-button>
                        </div>
                    </el-card>
                </div>
            </transition-group>  
        </div>

        <div v-for="list in node2" class="mb15 pt5 inline-block" v-if="!list.children">
            <el-card :key="list.id" @click.native="showDetails(node2,list)"  class="card relative cursor-pointer">
                <ui-title class="f12 block">
                    <div class="flex row-between col-center">
                        <span>{{list.name}}</span>
                        <span class="f10">高于同行 <i class="f-color-orange">{{parseFloat(list.score_percent*100).toFixed(2)}}%</i></span>
                    </div>
                </ui-title>
                <div class="flex row-between col-center">
                    <el-progress :percentage="getProgress(list.score)" :show-text="false" status="success" class="flex-1 mr15"></el-progress>
                    {{list.score_txt}}
                </div>
                <div class="show-details">
                    <el-button>查看详情</el-button>
                </div>
            </el-card>
        </div>

        <!-- 弹出层详情  -->
        <el-dialog v-if="dialogData" :title="dialogData.list.name" :visible.sync="dialogVisible">
            <div class="flex">
                <!--logo  -->
                <img :src="dialogData.list.pic || dialogData.card.pic" height="50" class="mr25">
                
                <div class="flex row-between col-center">
                    <span class="mr20">{{dialogData.card.name}}</span>
                    <div class="flex row-between col-center" style="width:200px">
                         <el-progress :percentage="getProgress(dialogData.card.score)" :show-text="false" class="flex-1 mr15"></el-progress> 
                        {{dialogData.card.score_txt}}
                    </div>
                </div>
            </div>
            <div class="pt25 pb25" v-html="dialogData.card.desc"></div>
            <div v-if="dialogData.card.pic" class="flex row-between">
                  <ui-img v-for="(img,i) in dialogData.card.imgs" :key="i" :url="img.url" style="width:48%;height:200px"></ui-img> 
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: ['nodeId'],
        data () {
            return {
                node1:{},
                node2:[],
                dialogVisible:false,
                dialogData:null
            }
        },
        methods: {
            showDetails(list,card){
                this.dialogVisible=true
                this.dialogData = {
                    list,
                    card
                }
                console.log('dialogData:', this.dialogData);
            },
            getProgress(v){
                if (v) {
                    let r = parseInt(v)*20
                    if (r>100) {
                        r = 100
                    }
                    return r
                }
                return 0
            },
            toggleNode(list){
                if (list.children) {
                    list.isFold = !list.isFold
                }
            }
        },
        mounted () {
            this.$http.get('index.php?g=home&m=PaperRecord&a=first_node_detail', {
                params: {
                    node_id: this.nodeId,
                    company_id: this.$store.state.common.company_id
                }
            })
            .then(({ data }) => {
                console.log('一级节点评测详情', data)
                if (data.code===1) {
                    this.node1 = data.data
                    let node2Data = data.data.children
                    if (node2Data) {
                        for (let i = 0; i < node2Data.length; i++) {
                            this.$set(node2Data[i],'isFold', false)
                        }
                    }
                    this.node2 = node2Data
                }
            })
        },
    }
</script>