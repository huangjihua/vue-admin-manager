<template>
    <section class="toolbar">
        <section class="content">
            <el-row :gutter="20">
                    <el-radio-group v-model="radio3" fill="rgba(255,0,30,0.75)" >
                        <el-radio-button label="drug">药品</el-radio-button>
                        <el-radio-button label="consumable">耗材</el-radio-button>
                    </el-radio-group>
                </el-row>
            <p/>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="drug_week"></IEcharts>
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
                            <IEcharts :option="drug_week_top_ten"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="drug_month_top_ten"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </section>
    </section>






</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import {aggregate} from 'api/aggregate';
    import LogisticData from 'static/requestList/swissdata/logisticsStatistics.json';

    export default{
        data(){
            return {
                mock: true,
                radio3: 'drug',
                drug_week: {
                    color: ["#13CE66", "#20a0ff"],
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
                            }
                        }
                    ]
                },
                drug_month: {
                    color: ["#13CE66", "#20a0ff"],
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
                            }
                        }
                    ]
                },
                drug_week_top_ten: {
                    color: ["#13CE66", "#20a0ff"],
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
                            }
                        }
                    ]
                },
                drug_month_top_ten: {
                    color: ["#13CE66", "#20a0ff"],
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
                        axisLabel:{interval:0},
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
                            }
                        },
                        {
                            name: 'GDP占比',
                            type: 'pie',
                            center: ['75%', '35%'],
                            radius: '28%',
                            z: 100
                        }
                    ]
                }
            }
        },
        components : {
            IEcharts
        },
        methods:{
            initData:function(type){
                switch(type){
                    case 'drug':
                        break;
                    case 'consumable':
                        break;
                }

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
            loadDataCharts:function(type,dateType){
                let params = LogisticData;
                if (this.mock) {
                    params = Object.assign({'statFunc': 'loadDataCharts', 'type': dateType}, params);
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
                aggregate(params).then(data => {
                      for(let key in data){
                        let value = data[key].num;
                        let avg = data[key].avg;
                        let name = data[key]._id.axisName;
                        // 取不到的，则直接展示渠道编码
                        cycle.legend.data=['数量'];
                        cycle.series[0].name = cycle.legend.data[0];
                        cycle.xAxis.data.push(name);
                        cycle.series[0].data.push(value);
                      }
               });
            },
            statAll:function () {
                let _this = this;
                // 统计前初始化数据先，新增统计需要在此配置好初始化
                _this.initData('drug');
                // week统计
                _this.loadDataCharts('drug','week');
                // 月统计
                _this.loadDataCharts('drug','month');
                // week_top_ten 统计
                _this.loadDataCharts('drug','week_top_ten');
                // month_top_ten 统计
                _this.loadDataCharts('drug','month_top_ten');
            }
        },
        mounted: function () {
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
