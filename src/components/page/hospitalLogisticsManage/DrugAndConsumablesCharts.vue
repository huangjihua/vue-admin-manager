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
    // 时间处理
    import moment from 'moment';
    export default{
        data(){
            return {
                mock: true,
                radio3: 'drug',
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
                            }
                        },
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
                            }
                        }
                    ]
                },
                drug_week_top_ten: {
                    color: ["#7B68EE", "#20a0ff"],
                    title: {
                        text: '药品趋势图/周 Top10',
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
            IEcharts
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
            loadDataCharts:function(product,dateType){
                let params = LogisticData;
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
                cycle.series[0].itemStyle.normal.barBorderRadius= [10,10,0,0];
            },
            statAll:function () {
                let _this = this;

                console.log(_this.radio3);
                // 统计前初始化数据先，新增统计需要在此配置好初始化
                _this.initData(_this.radio3);
                // week统计
                _this.loadDataCharts(_this.radio3,'week');
                // 月统计
                _this.loadDataCharts(_this.radio3,'month');
                // week_top_ten 统计
                _this.loadDataCharts(_this.radio3,'week_top_ten');
                // month_top_ten 统计
                _this.loadDataCharts(_this.radio3,'month_top_ten');
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
