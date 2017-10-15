<template>
    <section class="toolbar">
        <section class="content">
            <el-row :gutter="20">
                <div class="block">
                    <span class="demonstration">科室:</span>
                    <el-select v-model="technicalValue" v-on:change="statAll">
                        <el-option
                            v-for="item in technicalOffices"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <span class="demonstration">时间类型:</span>
                    <el-radio-group v-model="radio3" fill="rgba(255,0,30,0.75)"  v-on:change="statAll" >
                        <el-radio-button label="days">日</el-radio-button>
                        <el-radio-button label="week">周</el-radio-button>
                        <el-radio-button label="month">月</el-radio-button>
                    </el-radio-group>
                </div>
            </el-row>
            <p/>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="14" :lg="14">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="chart"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="24" :md="10" :lg="10">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="chart2"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <p/>
            <el-row :gutter="20">

                    <div class="block">
                        <span class="demonstration">增加对比科室:</span>
                        <el-select v-model="technicalValue2" multiple placeholder="请选择" v-on:change="chart3_4" >
                            <el-option
                                v-for="item in technicalOffices"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="demonstration">时间类型:</span>
                        <el-radio-group v-model="radio4" fill="rgba(255,0,30,0.75)"  v-on:change="chart3_4" >
                            <el-radio-button label="days">日</el-radio-button>
                            <el-radio-button label="week">周</el-radio-button>
                            <el-radio-button label="month">月</el-radio-button>
                        </el-radio-group>
                    </div>

            </el-row>
            <p/>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="14" :lg="14">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="chart3"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="24" :md="10" :lg="10">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="chart4"></IEcharts>
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
    import {OfficeType,equipmentType,products,GetRandomNum} from 'utils/logistic';
    // 时间处理
    import moment from 'moment';
    export default{
        data() {
            return {
                mock: true,
                radio3: 'days',
                radio4: 'days',
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
                technicalValue2:['1001'],
                chart:{
                    title: {
                        text: '多种选择物流方案'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        type: 'plain',
                        top:30,
                        right:10,
                        data:[]
                    },
                    toolbox: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    calculable: true,
                    grid: {
                        left:10,
                        containLabel: true
                    },
                    barMaxWidth:30,
                    xAxis: {
                        type: 'category',
                        name: '时间',
                        boundaryGap: true,/* 不从0刻度开始*/
                        data: [],
                        axisTick: {
                            show: true,
                            alignWithLabel: false,
                            interval: 'auto',
                            inside: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name:'数量'
                    },
                    series: []
                },
                chart2:{
                    title: {
                        text: '设备／人工图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        type: 'plain',
                        top:30,
                        right:10,
                        data:[]
                    },
                    toolbox: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    calculable: true,
                    grid: {
                        left:10,
                        containLabel: true
                    },
                    barMaxWidth:30,
                    xAxis: {
                        type: 'category',
                        name: '时间',
                        boundaryGap: true,/* 不从0刻度开始*/
                        data: [],
                        axisTick: {
                            show: true,
                            alignWithLabel: false,
                            interval: 'auto',
                            inside: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name:'数量'
                    },
                    series: []
                },
                chart3:{
                    title: {
                        text: '科室物流数对比'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        type: 'plain',
                        top:30,
                        right:10,
                        data:[]
                    },
                    toolbox: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    calculable: true,
                    grid: {
                        left:10,
                        containLabel: true
                    },
                    barMaxWidth:30,
                    xAxis: {
                        type: 'category',
                        name: '科室',
                        boundaryGap: true,/* 不从0刻度开始*/
                        data: [],
                        axisTick: {
                            show: true,
                            alignWithLabel: false,
                            interval: 'auto',
                            inside: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name:'数量'
                    },
                    series: []
                },
                chart4:{
                    title: {
                        text: '设备／人工图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        type: 'plain',
                        top:30,
                        right:10,
                        data:[]
                    },
                    toolbox: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    calculable: true,
                    grid: {
                        left:10,
                        containLabel: true
                    },
                    barMaxWidth:30,
                    xAxis: {
                        type: 'category',
                        name: '科室',
                        boundaryGap: true,/* 不从0刻度开始*/
                        data: [],
                        axisTick: {
                            show: true,
                            alignWithLabel: false,
                            interval: 'auto',
                            inside: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name:'数量'
                    },
                    series: []
                }
            };
        },
        components : {
            IEcharts
        },
        methods:{
            initData:function(){
                this.technicalValue = this.technicalValue===''?'1001':this.technicalValue;
                console.log(this.technicalValue2);
            },
            chart1_2:function () {
                let self =this;
                self.chart.xAxis.data=[];
                self.chart.series =[];
                let _data;
                for(let key in equipmentType){
                    self.chart.legend.data.push(equipmentType[key].label);
                    _data=[];
                    for(let i=7;i>0;i--){
                        let  num = GetRandomNum(0,self.radio3==='days'?200:self.radio3==='week'?500:1000);
                        if(key==='0')self.chart.xAxis.data.push(moment().add(-i, self.radio3).format('YYYY-MM-DD'));
                        _data.push(num);
                    }
                   
                    self.chart.series.push({
                        name:equipmentType[key].label,
                        type:'bar',
                        smooth:true,
                        data:_data,
                        stack: '数量',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                align:'center'
                            }
                        },
                        itemStyle:{
                            barMaxWidth: '20',
                            normal:{
                                barBorderRadius:[key==="3"?10:0, key==="3"?10:0, 0, 0]
                            },
//                            barCategoryGap:'2%'
                        }
                    },)
                }
//              //chart2
                self.chart2.legend.data=['设备','人工'];
                self.chart2.xAxis.data = self.chart.xAxis.data;
                self.chart2.series =[];
                let array=[[]];
                for(let a  in self.chart.series){
                    for(let b in self.chart.series[a].data){
                        if(a==='0') array[b]=[];
                        array[b].push(self.chart.series[a].data[b]);
                    }
                }
                console.log(array);
                let temp=0, first =[],second=[],temp2=0;
                //设备／人工横向总数
                for(let a in array){
                    for(let b in array[a]){
                        if(b<3){
                          temp+=array[a][b];
                        }else{
                          temp2= array[a][b];
                        }
                    }
                    first.push(temp);
                    second.push(temp2);
                }
                for(let key in self.chart2.legend.data){
                    self.chart2.series.push({
                        name:self.chart2.legend.data[key],
                        type:'bar',
                        smooth:true,
                        data:key==='0'?first:second,
                        stack: '数量',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                align:'center'
                            }
                        },
                        itemStyle:{
                            barMaxWidth: '20',
                            normal:{
                                barBorderRadius:[key==="3"?10:0, key==="3"?10:0, 0, 0]
                            },
//                            barCategoryGap:'2%'
                        }
                    })
                }
   
            },
            chart3_4:function () {
                let self =this;
                self.chart3.xAxis.data=[];
                self.chart4.xAxis.data=[];
                self.chart3.series =[];
                self.chart4.series =[];
                self.chart4.legend.data=['设备','人工'];
                let _data;
                for(let key in equipmentType){
                    self.chart3.legend.data.push(equipmentType[key].label);
                    _data=[];
                   console.log(self.technicalValue2);
                    for(let index in OfficeType){
                        for(let i=0;i<self.technicalValue2.length;i++){
                            if(OfficeType[index].value===self.technicalValue2[i]){
                                let  num = GetRandomNum(0,self.radio4==='days'?200:self.radio3==='week'?500:1000);
                                if(key==='0'){
                                    self.chart3.xAxis.data.push(OfficeType[index].label);
                                    self.chart4.xAxis.data.push(OfficeType[index].label);
                                }
                                _data.push(num);
                              
                            }
                        }
                       
                    }
                    self.chart3.series.push({
                        name:equipmentType[key].label,
                        type:'bar',
                        smooth:true,
                        data:_data,
                        stack: '数量',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                align:'center'
                            }
                        },
                        itemStyle:{
                            barMaxWidth: '20',
                            normal:{
                                barBorderRadius:[key==="3"?10:0, key==="3"?10:0, 0, 0]
                            },
//                            barCategoryGap:'2%'
                        }
                    },)
                }
    
                //chart2
                let array=[[]];
                for(let a  in self.chart3.series){
                    for(let b in self.chart3.series[a].data){
                        if(a==='0') array[b]=[];
                        array[b].push(self.chart3.series[a].data[b]);
                    }
                }
                console.log(array);
                let temp=0, first =[],second=[],temp2=0;
                //设备／人工横向总数
                for(let a in array){
                    for(let b in array[a]){
                        if(b<3){
                            temp+=array[a][b];
                        }else{
                            temp2= array[a][b];
                        }
                    }
                    first.push(temp);
                    second.push(temp2);
                }
                for(let key in self.chart4.legend.data){
                    self.chart4.series.push({
                        name:self.chart4.legend.data[key],
                        type:'bar',
                        smooth:true,
                        data:key==='0'?first:second,
                        stack: '数量',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                align:'center'
                            }
                        },
                        itemStyle:{
                            barMaxWidth: '20',
                            normal:{
                                barBorderRadius:[key==="3"?10:0, key==="3"?10:0, 0, 0]
                            },
//                            barCategoryGap:'2%'
                        }
                    })
                }
            },
            statAll:function () {
                this.initData();
                this.chart1_2();
            }
        },
        mounted:function () {
            this.statAll();
            
            this.chart3_4();
        }
    }
</script>
<style scoped>
    .echarts {
        float: left;
        width: 100%;
        height: 400px;
    }
</style>
