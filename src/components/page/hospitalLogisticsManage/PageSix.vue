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
                    <span class="demonstration">时间段:</span>
                    <el-date-picker
                        v-model="value6"
                        type="daterange"
                        placeholder="选择日期范围"  v-on:change="statAll">
                    </el-date-picker>
                </div>
            </el-row>
            <p/>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="chart" v-on:click="onChartClick"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
                <!--<el-col :xs="24" :sm="24" :md="10" :lg="10">-->
                    <!--<el-card class="box-card">-->
                        <!--<div class="echarts">-->
                            <!--<IEcharts :option="chart2"></IEcharts>-->
                        <!--</div>-->
                    <!--</el-card>-->
                <!--</el-col>-->
            </el-row>
            <p/>
            <el-row :gutter="20" >
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-card class="box-card">
                        <div class="echarts" >
                             <IEcharts :option="chart3" @click="onChart3Click" v-bind:class="[isShow?'':'fn-hide']"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <p/>
            <el-dialog title="科员操作明细" :visible.sync="dialogTableVisible">
                <el-table
                    :data="tableData3"
                    height="250"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="员工"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="officeName1"
                        label="科室A">
                    </el-table-column>
                    <el-table-column
                        prop="officeName2"
                        label="科室B">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                    </el-table-column>
                </el-table>
            </el-dialog>
        </section>
    </section>
</template>
<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import {aggregate} from 'api/aggregate';
    import {OfficeType,equipmentType,products,operator,GetRandomNum} from 'utils/logistic';
    // 时间处理
    import moment from 'moment';
    import ElDialog from "../../../../node_modules/element-ui/packages/dialog/src/component.vue";
    export default{
        data() {
            return {
                mock: true,
                isShow:true,
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
                value6:'',
                chart:{
                    title: {
                        text: '物流使用次数统计'
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
                        name:'次数'
                    },
                    series: []
                },
                 chart2:{
                    title: {
                        text: '平均值'
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
                        name:'次数'
                    },
                    series: []
                },
                chart3:{
                    title: {
                        text:'科员操作次数图'
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
                        name: '科员',
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
                        name:'次数'
                    },
                    series: []
                },
                dialogTableVisible: false,
                dialogTableVisible2:false,
                tableData3:[
                    {
                        id:1000,
                        name: '王小虎',
                        officeName1: '科室',
                        officeName2: '科室',
                        date: '2016-05-03'
                    }]
            }
        
        },
        components : {
            ElDialog,
            IEcharts
        },
        methods:{
            initData:function(){
                this.technicalValue = this.technicalValue===''?'1001':this.technicalValue;
                
            },
            chart1:function () {
                let self =this;
                self.chart.xAxis.data=[];
                self.chart.series =[];
                self.chart.legend.data=['人工'];
                let xAixs=[];
                if(this.value6){
                    let days = (moment(this.value6[1])-moment(this.value6[0]))/86400000 ; //间隔天数
                    for(let i=0;i<=days;i++){
                        xAixs.push(moment(this.value6[0],'YYYY-MM-DD').add(i,'days').format('YYYY-MM-DD'));
                    }
                    console.log(xAixs);
                }else{
                    //default
                    for(let i=6;i>=0;i--){
                        xAixs.push(moment().add(-i,'days').format('YYYY-MM-DD'));
                    }
                }
                self.chart.xAxis.data = xAixs;
                let _data=[];
                for(let key in  self.chart.xAxis.data){
                    _data.push(GetRandomNum(0,500));
                }
                self.chart.series.push({
                    name:'人工',
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
                        barMaxWidth: '20',
                        normal:{
                            barBorderRadius:[10,10, 0, 0]
                        },
//                            barCategoryGap:'2%'
                    }
                });
                
//                self.chart.on('click',function(params){
//                    console.log(params);
//                });
                
                //right
//                self.chart2.xAxis.data = xAixs;
    
                this.operatorChart(_data[0]);
            },
            operatorChart:function (num) {
                let self =this;
                self.chart3.xAxis.data=[];
                self.chart3.series =[];
                let personNum = GetRandomNum(1,operator.length); /*人数*/
                //没人随机分摊物流数
                let count=[];
                let temp =num;
                for(let i=0;i<personNum;i++){
                    temp = GetRandomNum(1,temp/2); /* 默认第一个取一半，防止最后一个是<0的数*/
                    self.chart3.xAxis.data.push(operator[i].name);
                    if(i=== (personNum-1)){
                        //保证count数组的和===num
                        let total=count.reduce((result,item,index,count) =>{return result+item;});
                        console.log(num+'--'+ total);
                        if(num>=total){
                            count.push(num-total);
                        }else{
                            count.push(0);
                        }
                    }else{
                        count.push(temp);
                    }
                }
                
                self.chart3.series.push({
                    name: '人工',
                    type:'bar',
                    smooth:true,
                    data:count,
                    stack: '数量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            align:'center'
                        }
                    },
                    itemStyle: {
                        barMaxWidth: '20',
                        normal: {
                            barBorderRadius: [10, 10, 0, 0]
                        }
                    }
                });
            },
           
            statAll:function () {
                this.initData();
                this.chart1();
            },
            onChartClick:function(event, instance, echarts) {
//                console.log(arguments);
                if(arguments[0].componentSubType==='bar'){
                    this.isShow = true;
                    console.log(arguments[0].value);
                    this.operatorChart(arguments[0].value);
                }
               
            },
            onChart3Click:function (event, instance, echarts) {
                if(arguments[0].componentSubType==='bar'){
                    
                    this.tableData3=[];
                    let count =arguments[0].value;
                   
                    let ky =operator.find((n)=>{
                         if(n.name===arguments[0].name){
                             return n;
                         }
                    });
                    let time =moment(-GetRandomNum(0,5),'days').format('YYYY-MM-DD H:SS');
                    for(let i=0;i<count;i++){
                        this.tableData3.push( {
                            id:ky.id,
                            name:arguments[0].name,
                            officeName1: OfficeType[GetRandomNum(0,2)].label,
                            officeName2: OfficeType[GetRandomNum(3,5)].label,
                            date: time
                        });
                    }
                    this.dialogTableVisible =true;
                }
            }
    
        },
        
        mounted:function () {
            this.statAll();
          
         
        }
    }
</script>
<style scoped>
    .echarts {
        float: left;
        width: 100%;
        height: 400px;
    }
    .fn-hide{
        display: none;
    }
</style>
