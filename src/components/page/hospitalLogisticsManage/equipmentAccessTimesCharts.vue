<template>
    <section class="toolbar">
        <section class="content">
            <el-row :gutter="20">
                <div class="block">
                    <span class="demonstration">日期:</span>
                    <el-date-picker
                        v-model="dateValue"
                        type="date"
                        align="right"
                        :picker-options="pickerOptions2"
                        placeholder="选择日前"
                        v-on:change=" "
                        >
                    </el-date-picker>
                    <span class="demonstration">科室:</span>
                    <el-select v-model="technicalValue" v-on:change=" ">
                        <el-option
                            v-for="item in technicalOffices"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </div>
            </el-row>
            <p/>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="chart"></IEcharts>
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
    import technicalOfficesModel from 'static/requestList/swissdata/drugAndconsumablesModel.json';
//    import technicalOfficesModel from 'static/requestList/swissdata/logisticsStatistics.json';
    // 时间处理
    import moment from 'moment';
    export default{
        data() {
            return {
                mock: true,
                pickerOptions2: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                                const date = moment().subtract(1, 'days').format('YYYY-MM-DD 0:0:0');
                                picker.$emit('pick', date);
                            }
                        }, {
                            text: '7天前',
                            onClick(picker) {
                                const date = moment().subtract(7, 'days').format('YYYY-MM-DD 0:0:0');
                                picker.$emit('pick', date);
                            }
                        }, {
                        text: '30天前',
                        onClick(picker) {
                            const date = moment().subtract(30, 'days').format('YYYY-MM-DD 0:0:0');
                            picker.$emit('pick', date);
                        }
                    }]
                },
                technicalOffices: [
                    {
                        value: '1001',
                        label: '内科'
                    }, {
                        value: '1002',
                        label: '骨内科',
                        disabled: true
                    }, {
                        value: '1003',
                        label: '骨外科'
                    }, {
                        value: '1004',
                        label: '内分泌科'
                    }, {
                        value: '1005',
                        label: '胸内科'
                }],
                dateValue: '',
                technicalValue: '1002',
                chart:{
                    color: ["#FF4500", "#20a0ff"],
                    title: {
                        text: '设备进出次数统计',
                        subtext: '实时数据'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['次数/进','次数/出']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [
                        {
                            name:'次数/进',
                            type:'line',
                            data:[],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            },
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[10, 10, 0, 0]
                                }
                            }
                        },
                        {
                            name:'次数/出',
                            type:'line',
                            data:[],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            },
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[0, 0, 10, 10]
                                }
                            }
                        }
                    ]
                }
            };
        },
        components : {
            IEcharts
        },
        methods:{
            initData:function(){
                this.dateValue =this.dateValue===''? moment().format('YYYY-MM-DD'):this.dateValue;
                this.technicalValue = this.technicalValue===''?'1001':this.technicalValue;
                this.chart.xAxis.data=[];
                this.chart.series[0].data=[];
                this.chart.series[1].data=[];
                console.log(moment().format('LT'));
                console.log(moment().format('LTS'));
            },
            technicalOfficesChart:function () {
                let params = technicalOfficesModel;
//                debugger;
                if (this.mock) {
                    params = Object.assign({'statFunc': 'technicalOfficesModel', 'type':this.dateValue,'other': this.technicalValue}, params);
                }
                let cycle= this.chart;
                aggregate(params).then(data => {
                    for(let key in data){
                        let intNum = data[key].intNum;
                        let avg = data[key].avg;
                        let name = data[key]._id.axisName;
                        let date = data[key]._id.date;
                        // 取不到的，则直接展示渠道编码
                       
                        cycle.xAxis.data.push(date);
                        cycle.series[0].data.push(intNum);
                        cycle.series[1].data.push(data[key].outNum);
                    }
                });
                console.log("001===>>>  ",moment('2017-09-28').format('YYYY-MM-DD HH:mm:ss'));                        //当前时间
                console.log("002===>>>  ",moment().add(-1,'year').format('YYYY-MM-DD HH:mm:ss'));         //当前时间  前一年
                console.log("003===>>>  ",moment().add(-1,'month').format('YYYY-MM-DD HH:mm:ss'));        //当前时间  前一月
                console.log("004===>>>  ",moment().add(-1,'week').format('YYYY-MM-DD HH:mm:ss'));         //当前时间  前一周
                console.log("005===>>>  ",moment().add(-1,'days').format('YYYY-MM-DD HH:mm:ss'));         //当前时间  前一天
                console.log("006===>>>  ",moment().add(-1,'hour').format('YYYY-MM-DD HH:mm:ss'));         //当前时间  前一小时
                console.log("007===>>>  ",moment().add(-1,'minute').format('YYYY-MM-DD HH:mm:ss'));       //当前时间  前一分钟
                console.log("008===>>>  ",moment().add(-1,'second').format('YYYY-MM-DD HH:mm:ss'));       //当前时间  前一秒
                console.log("009===>>>  ",moment().utc().format("YYYY-MM-DD HH:mm:ss"));
                
            },
            setAll:function () {
                this.initData();
                this.technicalOfficesChart();
            }
        },
        mounted:function () {
            this.setAll();
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
</style>
