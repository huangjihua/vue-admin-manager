<template>
    <section class="toolbar">
        <el-row :gutter="20">
            <div class="block">
                <span class="demonstration">日期:</span>
                <el-date-picker
                v-model="dateValue"
                type="date"
                align="right"
                :picker-options="pickerOptions2"
                placeholder="选择日前"
                v-on:change="statAll"
            >
            </el-date-picker>
                <span class="demonstration">科室:</span>
                <el-select v-model="technicalValue" v-on:change="statAll">
                    <el-option
                        v-for="item in technicalOffices"
                        :key ="item.value"
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
                        <IEcharts :option="firstLeftChart"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="firstRightChart"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <div class="block">
                <span class="demonstration">选择时间类型:</span>
                <el-select v-model="dateTypeValue" v-on:change="statSendAll">
                    <el-option
                        v-for="item in dateType"
                        :key ="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                    </el-option>
                </el-select>
            </div>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="14" :lg="14">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="twoLeftChart"></IEcharts>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="twoRightChart"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="14" :lg="14">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="thirdLeftChart"></IEcharts>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="10" :lg="10">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="thirdRightChart"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import {aggregate} from 'api/aggregate';
    import {OfficeType,equipmentType,products,GetRandomNum} from 'utils/logistic';
    import coreLogisticModel from 'static/requestList/swissdata/coreLogisticModel.json';
    // 时间处理
    import moment from 'moment';
    export default {
        data: function () {
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
                dateValue: '',
                dateType:[
                    {
                        value:1,
                        label:'周'
                    },
                    {
                        value:2,
                        label:'月'
                    },
                    {
                        value:3,
                        label:'年'
                    }

                ],
                dateTypeValue:'',
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
                technicalValue: '1002',
                firstLeftChart: {
                    color: ["#FF4500", "#20a0ff","#2E8B57","#FFFF00","#ADFF2F","#FFA500","#FFE4B5","#8B4513","#FFF5EE","#696969","#00CED1","#FF4500"],
                    title: {
                        text: '进数统计',
                        subtext: '全院核心物流数据'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        type: 'plain',
                        orient: 'vertical',
                        right: 0,
                        top: 60,
                        bottom: 20,
                        data:[]
                    },
                    toolbox: {
                        show: false,
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
                        boundaryGap: true,
                        data: [],
                        axisLabel: {
                            formatter: '{value}/h'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: []
                },
                firstRightChart: {
                    color: ["#FFE4B5","#8B4513","#FFF5EE","#696969","#00CED1","#FF4500","#FF4500", "#20a0ff","#2E8B57","#FFFF00","#ADFF2F","#FFA500"],
                    title: {
                        text: '出数统计',
                        subtext: '全院核心物流数据'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        type: 'plain',
                        orient: 'vertical',
                        right: 0,
                        top: 60,
                        bottom: 20,
                        data:[]
                    },
                    toolbox: {
                        show: false,
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
                        boundaryGap: true,
                        data: [],
                        axisLabel: {
                            formatter: '{value}/h'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: []
                },
                twoLeftChart: {
                    color: ['#003366', '#006699', '#4cabce', '#e5323e',"#ADFF2F","#FFA500"],
                    title: {
                        text: '有效发送排行',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        type: 'plain',
//                        orient: 'vertical',
                        top:30,
                        right:10,
                        data: []
                    },
                    toolbox: {
                        show: false,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: {
                        type: 'category',
                        axisTick: {show: true},
                        data:[],
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: []
                },
                twoRightChart: {
                    color: ["#13CE66", "#20a0ff"],
                    title: {
                        text: '设备/人工',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        type:'plain',
                        orient: 'vertical',
                        right:0,
                        data: ['设备','人工']
                    },
                    toolbox: {
                        show: false,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: {
                        type: 'category',
                        axisTick: {show: false},
                        data: [],
                     },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: []
                },
                thirdLeftChart: {
                    color: ["#FFE4B5","#8B4513","#FFF5EE","#696969","#00CED1","#FF4500"],
                    title: {
                        text: '有效接收排行',
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
                        type: 'plain',
//                        orient: 'vertical',
                        top:30,
                        right:30,
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
                thirdRightChart: {
                    color: ["#2E8B57","#FFFF00"],
                    title: {
                        text: '设备/人工',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        type:'plain',
                        orient: 'vertical',
                        right:0,
                        data: ['设备','人工']
                    },
                    toolbox: {
                        show: false,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: {
                        type: 'category',
                        axisTick: {show: false},
                        data: [],
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: []
                },
                random:0, /*最大数量*/
                randomTotal:0 /*total最大数量*/
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
                _this.dateValue = _this.dateValue===''? moment().format('YYYY-MM-DD'): _this.dateValue;
                _this.technicalValue =  _this.technicalValue===''?'1001': _this.technicalValue;
                _this.dateTypeValue  =   _this.dateTypeValue===''?1: _this.dateTypeValue;

                _this.firstLeftChart.legend.data=[];
                _this.firstLeftChart.xAxis.data=[];
                _this.firstLeftChart.series=[];
                for(let i=0;i<12;i++){
                    _this.firstLeftChart.series.push( {
                        name:'',
                        type:'line',
                        symbol:'none',  //这句就是去掉点的
                        smooth:true,  //这句就是让曲线变平滑的
                        data:[]
                    });
                    _this.firstRightChart.series.push( {
                        name:'',
                        type:'line',
                        symbol:'none',  //这句就是去掉点的
                        smooth:true,  //这句就是让曲线变平滑的
                        data:[]
                    });
                }
            },
            firstLeftChartLoad:function () {
                let params = coreLogisticModel;
//                debugger;
                if (this.mock) {
                    params = Object.assign({'statFunc': 'coreLogisticModel', 'type':this.dateValue,'other': this.technicalValue}, params);
                }
                let cycle= this.firstLeftChart;
                let  cycleRight = this.firstRightChart;

                aggregate(params).then(data => {
                    cycle.legend.data=[];
                    cycle.xAxis.data=[];
                    cycleRight.legend.data=[];
                    cycleRight.xAxis.data=[];
                    let j =0;
                    for( let i=0;i<data.length ;i++) {
//                        cycle.legend.data.push(data[i].label + (i%2===0?"/进":"/出"));
//                        cycle.series[i].name = data[i].label + (i%2===0?"/进":"/出");
                        if(i%2===0){
                            cycle.legend.data.push(data[i].label);
                            cycle.series[i].name = data[i].label;
                            j=i;
                        }else{
                            cycleRight.legend.data.push(data[i].label);
                            cycleRight.series[j].name = data[i].label;
                        }



                        for (let key in data[i].list) {
                            if (i === 0) {
                                cycle.xAxis.data.push(data[i].list[key]._id.date);
                                cycleRight.xAxis.data.push(data[i].list[key]._id.date);
                            }
                            if(i%2===0){
                                cycle.series[i].data.push(data[i].list[key].intNum);
                            }else{
                                cycleRight.series[j].data.push(data[i].list[key].outNum);
                            }
                        }
                    }
                });
            },
            firstRightChartLoad:function(){
                let self = this;
                /* 设备和工人*/
                self.firstRightChart.xAxis.data=[];
                self.firstRightChart.series =[];

                for(let i=0;i<self.firstRightChart.legend.data.length;i++){
                    let arr =[];
                    for(let j=0; j<24;j++){
                        if(i===0)  self.firstRightChart.xAxis.data.push(j);
                        arr.push( i%2===0?GetRandomNum(0,1000):GetRandomNum(-1000,0));
                    }
                    self.firstRightChart.series.push( {
                        name:self.firstRightChart.legend.data[i],
                        type:'line',
                        symbol:'none',  //这句就是去掉点的
                        smooth:true,  //这句就是让曲线变平滑的
                        data:arr
                    });
                }
            },
            twoLeftChartLoad:function () {
                let self = this;
                self.twoLeftChart.legend.data=[];
                self.twoLeftChart.xAxis.data = [];
                self.twoLeftChart.series=[];

                for(let key in OfficeType){
                    self.twoLeftChart.xAxis.data.push(OfficeType[key].label);
                }

                for(let key in products){
                    self.twoLeftChart.legend.data.push(products[key].label);
                    let arr = [];
                    for(let i=0;i< self.twoLeftChart.xAxis.data.length;i++){
                        arr.push(GetRandomNum(0,self.random));
                    }
                    self.twoLeftChart.series.push({
                        name: products[key].label ,
                        type: 'bar',
                        barGap: 0,
                        data: arr,
                        itemStyle:{
                            normal:{
                                barBorderRadius:[10,10,0,0]
                            }
                        }
                    });
                }

            },
            twoRightChartLoad:function () {
                let self = this;
                self.twoRightChart.legend.data=['设备','人工'];
                self.twoRightChart.xAxis.data = [];
                self.twoRightChart.series=[];
                for(let key in OfficeType){
                    self.twoRightChart.xAxis.data.push(OfficeType[key].label);
                    self.twoRightChart.series.push({
                            name: '',
                            type: 'bar',
                            barGap: 0,
                            data: [],
                            itemStyle:{
                                normal:{
                                    barBorderRadius:[10,10,0,0]
                                }
                            }
                        });
                }
                for(let k=0;k< self.twoRightChart.series.length;k++){
                    for(let i=0;i< self.twoRightChart.legend.data.length;i++){
                        self.twoRightChart.series[i].name=self.twoRightChart.legend.data[i];
                        self.twoRightChart.series[i].data.push(GetRandomNum(0,self.randomTotal));
                    }
                }
            },
            thirdLeftChartLoad:function () {
                let self = this;
                self.thirdLeftChart.legend.data=[];
                self.thirdLeftChart.xAxis.data = [];
                self.thirdLeftChart.series=[];

                for(let key in OfficeType){
                    self.thirdLeftChart.xAxis.data.push(OfficeType[key].label);
                }

                for(let key in products){
                    self.thirdLeftChart.legend.data.push(products[key].label);
                    let arr = [];
                    for(let i=0;i< self.thirdLeftChart.xAxis.data.length;i++){
                        arr.push(GetRandomNum(0,self.random));
                    }
                    self.thirdLeftChart.series.push({
                        name: products[key].label ,
                        type: 'bar',
                        barGap: 0,
                        data: arr,
                        itemStyle:{
                            normal:{
                                barBorderRadius:[10,10,0,0]
                            }
                        }
                    });
                }

            },
            thirdRightChartLoad:function () {
                let self = this;
                self.thirdRightChart.legend.data=['设备','人工'];
                self.thirdRightChart.xAxis.data = [];
                self.thirdRightChart.series=[];
                for(let key in OfficeType){
                    self.thirdRightChart.xAxis.data.push(OfficeType[key].label);
                    self.thirdRightChart.series.push({
                        name: '',
                        type: 'bar',
                        barGap: 0,
                        data: [],
                        itemStyle:{
                            normal:{
                                barBorderRadius:[10,10,0,0]
                            }
                        }
                    });
                }
                for(let k=0;k< self.thirdRightChart.series.length;k++){
                    for(let i=0;i< self.thirdRightChart.legend.data.length;i++){
                        self.thirdRightChart.series[i].name=self.thirdRightChart.legend.data[i];
                        self.thirdRightChart.series[i].data.push(GetRandomNum(0,self.randomTotal));
                    }
                }
            },
            statAll: function () {
                let _this = this;
                // 统计前初始化数据先，新增统计需要在此配置好初始化
                _this.initData();
                _this.firstLeftChartLoad();
//                _this.firstRightChartLoad();
            },
            statSendAll:function(){
                let _this = this;
                switch(_this.dateTypeValue){
                    case 1:
                        _this.random =500;
                        _this.randomTotal= 1000;
                        break;
                    case 2:
                        _this.random =1000;
                        _this.randomTotal= 2000;
                        break;
                    case 3:
                        _this.random =2000;
                        _this.randomTotal= 4000;
                        break;

                }
                _this.twoLeftChartLoad();
                _this.twoRightChartLoad();

                _this.thirdLeftChartLoad();
                _this.thirdRightChartLoad();
            }
        },
        mounted: function () {
            this.statAll();
            this.statSendAll();
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
        width: 100%;
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
