<template>
    <section class="toolbar">
        <section class="content">
            <el-row :gutter="20">
                    <el-radio-group v-model="radio3" fill="rgba(255,0,30,0.75)"  v-on:change="statAll" >
                        <el-radio-button label="drug">药品</el-radio-button>
                        <el-radio-button label="consumable">耗材</el-radio-button>
                    </el-radio-group>
                </el-row>
            <p/>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="drug_week" ></IEcharts>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <p/>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="drug_month"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <p/>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="drug_week_top_ten" @click="onClickCount"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="drug_month_top_ten" @click="onClickAmount"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </section>
        <el-dialog :title="title" :visible.sync="dialogLineVisible">
            <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </el-dialog>
    </section>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import ElDialog from "../../../../node_modules/element-ui/packages/dialog/src/component.vue";
    import VeLine from 'v-charts/lib/line';
    import {aggregate} from 'api/aggregate';
    import {GetRandomNum,getDayNum,randomDivide} from 'utils/logistic';
    import LogisticData from 'static/requestList/swissdata/logisticsStatistics.json';
    // 时间处理
    import moment from 'moment';
    export default{
        data(){
            return {
                mock: true,
                radio3: 'drug',
                days:getDayNum(),
                title:'',
                dialogLineVisible:false,
                drug_week: {
                    title: {
                        text: '药品趋势图/周',
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    legend: {
                        data: []
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval:0,
                            rotate:40
                        },
                        data:[]
                    },
                    yAxis: {
                        type: 'value',
                        data: []
                    },
                    series: [
                        {
                            name: "数量",
                            type: "bar",
                            data: [],
                            markLine:{
                                data: [
                                    {type: 'average', name: '平均值'}
                                ],
                                lineStyle:{
                                    normal:{
                                        color:"red",
                                        opacity:0.5
                                    }
                                }
                            },
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[10, 10, 0, 0]
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outside',
                                    formatter: '{c}万元'
                                }
                            }
                        }
                    ]
                },
                drug_month: {
                    title: {
                        text: '药品趋势图/月',
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    legend: {
                        data: []
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval:0,
                            rotate:40
                        },
                        data:[]
                    },
                    yAxis: {
                        type: 'value',
                        data: []
                    },
                    series: [
                        {
                            name: "数量",
                            type: "bar",
                            data: [],
                            markLine:{
                                data: [
                                    {type: 'average', name: '平均值'}
                                ],
                                lineStyle:{
                                    normal:{
                                        color:"red",
                                        opacity:0.5
                                    }
                                }
                            },
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[10, 10, 10, 10]
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outside',
                                    formatter: '{c}万元'
                                }
                            }
                        }
                    ]
                },
                drug_week_top_ten: {
                    color: ["#7B68EE", "#20a0ff"],
                    title: {
                        text: '药品趋势图/月 Top10',
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    legend: {
                        data: []
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval:0,
                            rotate:40
                        },
                        data:[]
                    },
                    yAxis: {
                        type: 'value',
                        name:'数量/盒',
                        data: []
                    },
                    series: [
                        {
                            name: "数量",
                            type: "bar",
                            data: [],
                            markLine:{
                                data: [
                                    {type: 'average', name: '平均值'}
                                ],
                                lineStyle:{
                                    normal:{
                                        color:"red",
                                        opacity:0.5
                                    }
                                }
                            },
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[10, 10, 10, 10]
                                }
                            }
                        }
                    ]
                },
                drug_month_top_ten: {
                    title: {
                        text: '药品趋势图/月 Top10',
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    legend: {
                        data: []
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            interval:0,
                            rotate:40
                        },
                        data:[]
                    },
                    yAxis: {
                        type: 'value',
                        name:'金额/万元',
                        data: []
                    },
                    series: [
                        {
                            name: "金额",
                            type: "bar",
                            data: [],
                            markLine:{
                                data: [
                                    {type: 'average', name: '平均值'}
                                ],
                                lineStyle:{
                                    normal:{
                                        color:"red",
                                        opacity:0.5
                                    }
                                }
                            },
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[10, 10, 10, 10]
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: 'outside',
                                    formatter: '{c}万元',
//                                    interval:0,
                                    rotate:45
                                }
                            }
                        }
                    ]
                },
                temps:[]
            }
        },
        filters: {
            // 格式化数字
            numFormat(num)
            {
                let result = '';
                num = (num || 0).toString();
                while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                }
                if (num) {
                    result = num + result;
                }
                return result;
            }
        },
        components : {
            IEcharts,
            ElDialog,
            VeLine
        },
        methods:{
            initData:function(){
                let _this = this;
                _this.drug_week.xAxis.data = [];
                _this.drug_week.series[0].data = [];


                _this.drug_month.xAxis.data = [];
                _this.drug_month.series[0].data = [];


                _this.drug_week_top_ten.xAxis.data = [];
                _this.drug_week_top_ten.series[0].data = [];


                _this.drug_month_top_ten.xAxis.data = [];
                _this.drug_month_top_ten.series[0].data = [];

            },
            loadDataWeekAndMonth:function(product,dateType){
                 let count =6,rand = 1, unit ="";
                let cycle= null;
                let productName = product==='drug'?"药品":"耗材";
                switch(dateType){
                    case "week":
                        cycle = this.drug_week;
                        count=6; rand=1;unit="周";
                        break;
                    case "month":
                        cycle = this.drug_month;
                        count=13; rand=4;unit="月";
                        break;
                }
                    cycle.legend.data = ['金额'];
                    cycle.xAxis.name="时间";
                    cycle.yAxis.name ="金额/万元";
                    for(let i = 1; i < count; i++){
                        cycle.series[0].name = '金额';
                        cycle.xAxis.data.push(i + unit);
                        cycle.series[0].data.push(GetRandomNum(1, 20)*rand);
                    }
                    cycle.title.text=productName+unit+"销售额";
                    cycle.series[0].itemStyle.normal.barBorderRadius= [10,10,0,0];

            },
            loadDataCharts:function(product,dateType){
                let params = LogisticData;
                let productName = product==='drug'?"药品":"耗材";
                if (this.mock) {
                    params = Object.assign({'statFunc': 'loadDataCharts', 'type': dateType,'other':product}, params);
                }
                let cycle= null;
                switch(dateType){
                    case "week":
                        cycle= this.drug_week;
                        break;
                    case "month":
                        cycle= this.drug_month;
                        break;
                    case "week_top_ten":
                        cycle= this.drug_week_top_ten;
                        break;
                    case "month_top_ten":
                        cycle= this.drug_month_top_ten;
                        break;
                }

                if(dateType==="week_top_ten"){
                    aggregate(params).then(data => { for(let key in data){
                            let value = data[key].num;
                            let avg = data[key].avg;
                            let name = data[key]._id.axisName;
                            // 取不到的，则直接展示渠道编码
                            cycle.legend.data=['数量'];
                            cycle.series[0].name = cycle.legend.data[0];
                            cycle.xAxis.data.push(name);
                            cycle.series[0].data.push(value);
                            this.temps.push(value*GetRandomNum(10,100)/10000)
                        }
                    });
                }
                if(dateType==="month_top_ten"){
                    cycle.series[0].name = this.drug_week_top_ten.legend.data[0];
                    cycle.xAxis.data=this.drug_week_top_ten.xAxis.data;

                    cycle.series[0].data= this.temps;
                }
                cycle.title.text=productName+ "趋势图/月 Top10";
                cycle.series[0].itemStyle.normal.barBorderRadius= [10,10,0,0];
            },
            onClickCount:function (event, instance, echarts) {
                let that = this;
                if(arguments[0].componentSubType === 'bar'){
                    that.title= event.name+' 每日销售数量';
                    this.dialogLineVisible =true;
                    let count  =event.data;
                    let arrs =  randomDivide(count,that.days);
                    let data=[];
                    for(let i=0;i<that.days;i++){
                        data.push({ '日期': i+1,'数量':arrs[i]});
                    }
                    that.chartData = {
                        columns: ['日期', '数量'],
                        rows:  data
                    };
                }
            },
            onClickAmount:function (event, instance, echarts) {
                let that = this;
                if(arguments[0].componentSubType === 'bar'){
                    that.title=event.name+ '每日销售售额';
                    this.dialogLineVisible =true;
                    let count  =event.data*10000;
                    let arrs =  randomDivide(count,that.days);
                    let data=[];
                    for(let i=0;i<that.days;i++){
                        data.push({ '日期': i+1,'金额/元':arrs[i]});
                    }
                    that.chartData = {
                        columns: ['日期', '金额/元'],
                        rows:  data
                    };
                }
            },
            statAll:function () {
                let _this = this;
                console.log(_this.radio3);
                // 统计前初始化数据先，新增统计需要在此配置好初始化
                _this.initData(_this.radio3);
                // week统计
                _this.loadDataWeekAndMonth(_this.radio3,'week');
                // 月统计
                _this.loadDataWeekAndMonth(_this.radio3,'month');
                // week_top_ten 统计
                _this.loadDataCharts(_this.radio3,'week_top_ten');
                // month_top_ten 统计
                _this.loadDataCharts(_this.radio3,'month_top_ten');
            }
        },
        created: function () {
            this.chartData = {
                columns: ['日期', '数量'],
                rows: [
                    { '日期': '1月1日','数量': 100 },
                    { '日期': '1月2日', '数量':22},
                    { '日期': '1月3日','数量':44},
                    { '日期': '1月4日', '数量':43 },
                    { '日期': '1月5日', '数量':55 },
                    { '日期': '1月6日', '数量':88 }
                ]
            };
            this.chartSettings = {
//                axisSite: { right: ['占比'] },
//                yAxisType: ['KMB', 'percent'],
//                yAxisName: ['数量', '比率']
            }
        },
        mounted: function () {
            console.log(this.radio3);
            this.statAll();
        }
    }
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    .echarts {
        float: left;
        width: 100%;
        height: 400px;
    }
    span.el-radio-button__inner:hover{
        color: rgba(255,0,30,0.75);
    }
</style>
