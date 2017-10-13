<template>
    <section class="toolbar">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="16" :lg="16">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="cycle_everyday"></IEcharts>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
                <el-card class="box-card">
                    <div class="echarts-pie">
                        <IEcharts :option="pie_day"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="16" :lg="16">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="cycle_month"></IEcharts>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
                <el-card class="box-card">
                    <div class="echarts-pie">
                        <IEcharts :option="pie_month"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="16" :lg="16">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="cycle_year"></IEcharts>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8">
                <el-card class="box-card">
                    <div class="echarts-pie">
                        <IEcharts :option="pie_year"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import {aggregate} from 'api/aggregate';
    import LogisticData from 'static/requestList/swissdata/logisticsStatistics.json';
    // 时间处理
    import moment from 'moment';
    export default {
        data: function () {
            return {
                mock: true,
                cycle_everyday: {
                    color: ["#13CE66", "#20a0ff"],
                    title: {
                        text: '每日院内物流数',
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
                            name: "次数",
                            type: "bar",
                            data: [],
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[]
                                }
                            }
                            
                        },
                        {
                            name: "日平均数",
                            type: "bar",
                            data: [],
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[]
                                }
                            }
                        }
                    ]
                },
                cycle_month: {
                    color: ["#13CE66", "#20a0ff"],
                    title: {
                        text: '每月院内物流数',
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
                        //                        orient: 'vertical',
                        //                        left: 'center',
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
                            name: "次数",
                            type: "bar",
                            data: [],
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[]
                                }
                            }
                        },
                        {
                            name: "日平均数",
                            type: "bar",
                            data: [],
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[]
                                }
                            }
                        }
                    ]
                },
                cycle_year: {
                    color: ["#13CE66", "#20a0ff"],
                    title: {
                        text: '年度院内物流数',
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
                        //                        orient: 'vertical',
                        //                        left: 'center',
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
                            name: "次数",
                            type: "bar",
                            data: [],
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[]
                                }
                            }
                        },
                        {
                            name: "日平均数",
                            type: "bar",
                            data: [],
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[]
                                }
                            }
                        }
                    ]
                },
                pie_day: {
                    color: ["#13CE66", "#20a0ff"],
                    title: {
                        text: '每日 设备/人工占比',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['设备','人工']
                    },
                    series: [
                        {
                            name: '设备/人工占比',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                {value:120, name:'设备'},
                                {value:50, name:'人工'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
                pie_month: {
                    color: ["#13CE66", "#20a0ff"],
                    title: {
                        text: '月 设备/人工占比',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['设备','人工']
                    },
                    series: [
                        {
                            name: '设备/人工占比',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                {value:120, name:'设备'},
                                {value:50, name:'人工'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
                pie_year: {
                    color: ["#13CE66", "#20a0ff"],
                    title: {
                        text: '年度 设备/人工占比',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['设备','人工']
                    },
                    series: [
                        {
                            name: '设备/人工占比',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                {value:120, name:'设备'},
                                {value:50, name:'人工'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            };
        },
        components: {
            IEcharts
        },
        filters: {
            // 格式化数字
            numFormat(num)
            {
                var num = (num || 0).toString(), result = '';
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
        methods: {
          initData: function () {
              let _this = this;
              _this.cycle_everyday.xAxis.data = [];
              _this.cycle_everyday.series[0].data = [];
              _this.cycle_everyday.series[1].data = [];
              _this.cycle_month.xAxis.data = [];
              _this.cycle_month.series[0].data = [];
              _this.cycle_month.series[1].data = [];
              _this.cycle_year.xAxis.data = [];
              _this.cycle_year.series[0].data = [];
              _this.cycle_year.series[1].data = [];
             //日饼图 设备总数/人工
             _this.pie_day.legend.data = [];
             _this.pie_day.series[0].data = [];
             _this.pie_month.legend.data = [];
             _this.pie_month.series[0].data = [];
             _this.pie_year.legend.data = [];
             _this.pie_year.series[0].data = [];
          },
          /*院内物流数 (日/月/年)
          * type:string day/month/year
          * */
          logisticNum:function(type){
              let params = LogisticData;

              if (this.mock) {
                  params = Object.assign({'statFunc': 'logisticNum', 'type': type}, params);
              }
              let cycle= null; // zhuzh
              let pie= null;
              switch(type){
                  case "day":
                      cycle= this.cycle_everyday;
                      pie = this.pie_day;
                      break;
                  case "month":
                      cycle= this.cycle_month;
                      pie = this.pie_month;
                      break;
                  case "year":
                      cycle= this.cycle_year;
                      pie = this.pie_year;
                      break;
              }

              let total =0; //设备总数
              let peopleNum =0; //人数
               aggregate(params).then(data => {
                   for (let i = 0; i< data.length; i++) {
                      let value = data[i].num;
                      let avg = data[i].avg;
                      let name = data[i]._id.axisName;
                      total +=value;
                      // 取不到的，则直接展示渠道编码

                       cycle.legend.data=['数量','平均数'];
                       cycle.series[0].name = cycle.legend.data[0];
                       cycle.series[1].name = cycle.legend.data[1];
                       cycle.xAxis.data.push(name);
                       cycle.series[0].data.push(value);
                       cycle.series[1].data.push(avg);
                  }
                   
                   cycle.series[0].itemStyle.normal.barBorderRadius=[10,10,0,0];
                   cycle.series[1].itemStyle.normal.barBorderRadius=[10,10,0,0];
                    //日占比图数据
                  pie.legend.data = ['设备','人工'];
                  pie.series[0].data=[{value:total,name:'设备'},{value:cycle.series[0].data[3],name:'人工'}];
               });
            },
          statAll: function () {
                let _this = this;
                // 统计前初始化数据先，新增统计需要在此配置好初始化
                _this.initData();
                // 日统计
                _this.logisticNum('day');
                // 月统计
                _this.logisticNum('month');
                // 年统计
               _this.logisticNum('year');
               //  统计和总数占比

            }
      },
        mounted: function () {
            this.statAll();
        }
    };
</script>

<style scoped>
    .echarts {
        float: left;
        width: 100%;
        height: 400px;
    }
    .echarts-pie{
        float: left;
        width: 300px;
        height: 200px;
    }
    .c-charts {
        height: 400px;
        width: 100%;
    }
    .mix-echarts {
        width: 100%;
        height: 500px;
    }
</style>
