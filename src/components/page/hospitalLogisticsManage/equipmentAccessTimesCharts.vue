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
                        v-on:change="setAll"
                    >
                    </el-date-picker>
                    <span class="demonstration">科室:</span>
                    <el-select v-model="technicalValue" v-on:change="setAll">
                        <el-option
                            v-for="item in technicalOffices"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <span class="demonstration">载体</span>
                    <el-select v-model="equipmentValue" v-on:change="setAll">
                        <el-option
                            v-for="item in equipmentType"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-row>
            <p/>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-card class="box-card">
                        <div class="echarts">
                            <IEcharts :option="chart" @click="onClickChart1"></IEcharts>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-dialog title="进／出列表明细" :visible.sync="dialogTableVisible">
                <span class="demonstration">进明细:</span>
                <el-table
                    :data="tableData3"
                    height="200"
                    border
                    style="width: 100%" v-on:cell-mouse-enter="rowHove">
                    <el-table-column
                        prop="id"
                        label="编号"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作员"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="equipmentName"
                        label="传输载体">
                        <template  scope="scope">
                            <el-popover trigger="hover" placement="right">
                                <div class="equipment">
                                    <img v-bind:src="scope.row.pic" alt="">
                                </div>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag  size="medium">{{scope.row.equipmentName}}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="内容物">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="时间"
                        width="180">
                    </el-table-column>

                </el-table>
                <span class="demonstration">出明细:</span>
                <el-table
                    :data="tableData4"
                    height="200"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="编号"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作员"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="equipmentName"
                        label="传输载体">
                        <template  scope="scope">
                            <el-popover trigger="hover" placement="right">
                                <div class="equipment">
                                    <img v-bind:src="scope.row.pic" alt="" />
                                </div>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag  size="medium">{{scope.row.equipmentName}}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="内容物">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="时间"
                        width="180">
                    </el-table-column>
                </el-table>
            </el-dialog>
            <img src="../../../assets/go1.jpeg" alt="">
        </section>
    </section>

</template>
<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import {aggregate} from 'api/aggregate';
    import technicalOfficesModel from 'static/requestList/swissdata/drugAndconsumablesModel.json';
    import {OfficeType,equipmentType,products,operator,GetRandomNum} from 'utils/logistic';
    equipmentType.unshift({ label:"All",value:0});
    // 时间处理
    import moment from 'moment';
    import ElDialog from "../../../../node_modules/element-ui/packages/dialog/src/component.vue";
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
                technicalOffices: OfficeType,
                equipmentValue:0,
                equipmentType:equipmentType,
                dateValue:null,
                technicalValue: '1002',
                chart:{
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
                        axisLabel: {
                            interval:0,
                            rotate:30
                        },
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
                            smooth:true,
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
                            smooth:true,
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
                },
                dialogTableVisible:false,
                tableData3:[],
                tableData4:[]
            }
        },
        components : {
            ElDialog,
            IEcharts
        },
        methods:{
            initData:function(){
                this.dateValue =!this.dateValue?moment(new Date().toLocaleDateString(),'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm'):moment(this.dateValue,'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
                this.technicalValue = this.technicalValue===''?'1001':this.technicalValue;
                this.equipmentValue =this.equipmentValue===''?0:this.equipmentValue;
                this.chart.xAxis.data=[];
                this.chart.series[0].data=[];
                this.chart.series[1].data=[];
            },
            technicalOfficesChart:function () {
                let params = technicalOfficesModel;
                //                debugger;
                if (this.mock) {
                    params = Object.assign({'statFunc': 'technicalOfficesModel', 'type':this.dateValue,'other': this.technicalValue,'equipmentType':this.equipmentValue}, params);
                }
                let cycle= this.chart;
                aggregate(params).then(data => {
                    console.log('llll')
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
            },
            onClickChart1:function (event, instance, echarts) {
                console.log(event);
                //点击正数LINE
                if(arguments[0].componentSubType==='line' && event.seriesIndex===0){
                    this.tableData3=[];
                    let count =arguments[0].value;
                    console.log(count);
                    let time ='';
                    //进
                    for(let i=0;i<count;i++){
                        time =moment(arguments[0].name).subtract(-GetRandomNum(0,59),'second').format('YYYY-MM-DD H:mm:ss');
                        this.tableData3.push( {
                            id:i+1,
                            name:operator[GetRandomNum(0,operator.length-1)].name,
                            equipmentName: equipmentType[GetRandomNum(0,2)].label,
                            content:'进／'+['A','B','C','D','E'][GetRandomNum(0,4)],
                            date: time,
                            pic: "../assets/go"+GetRandomNum(1,2)+".jpeg"
                        });
                    }
                    //出
                    let currentTimeIndex =this.chart.xAxis.data.indexOf(arguments[0].name,0);
                    let outCount =Math.abs(this.chart.series[1].data[currentTimeIndex]);
                    //                    console.log(this.chart.xAxis.data);
                    //                    console.log(currentTimeIndex);
                    //                    console.log(count+'---'+outCount);
                    //                    console.log(this.chart.series[1].data);
                    for(let i=0;i<outCount;i++){
                        time =moment(arguments[0].name).subtract(-GetRandomNum(0,59),'second').format('YYYY-MM-DD H:mm:ss');
                        this.tableData4.push( {
                            id:i+1,
                            name:operator[GetRandomNum(0,operator.length-1)].name,
                            equipmentName: equipmentType[GetRandomNum(0,2)].label,
                            content:'出／'+['A','B','C','D','E'][GetRandomNum(0,4)],
                            date: time,
                            pic: "../../../assets/go"+GetRandomNum(1,2)+".jpeg"
                        });
                    }
                    this.dialogTableVisible =true;
                }else{
                    this.tableData4=[];
                    let outCount =Math.abs(arguments[0].value);
                    console.log(outCount);
                    let time ='';
                    //出
                    for(let i=0;i<outCount;i++){
                        time =moment(arguments[0].name).subtract(-GetRandomNum(0,59),'second').format('YYYY-MM-DD H:mm:ss');
                        this.tableData4.push( {
                            id:i+1,
                            name:operator[GetRandomNum(0,operator.length-1)].name,
                            equipmentName: equipmentType[GetRandomNum(0,2)].label,
                            content:'进／'+['A','B','C','D','E'][GetRandomNum(0,4)],
                            date: time,
                            pic: "../../../assets/go"+GetRandomNum(1,2)+".jpeg"
                        });
                    }
                    //进
                    let currentTimeIndex =this.chart.xAxis.data.indexOf(arguments[0].name,0);
                    let intCount =Math.abs(this.chart.series[0].data[currentTimeIndex]);
                    //                    console.log(this.chart.xAxis.data);
                    //                    console.log(currentTimeIndex);
                    //                    console.log(count+'---'+intCount);
                    //                    console.log(this.chart.series[1].data);
                    for(let i=0;i<intCount;i++){
                        time =moment(arguments[0].name).subtract(-GetRandomNum(0,59),'second').format('YYYY-MM-DD H:mm:ss');
                        this.tableData3.push( {
                            id:i+1,
                            name:operator[GetRandomNum(0,operator.length-1)].name,
                            equipmentName: equipmentType[GetRandomNum(0,2)].label,
                            content:'出／'+['A','B','C','D','E'][GetRandomNum(0,4)],
                            date: time,
                            pic: "../../../assets/go"+GetRandomNum(1,2)+".jpeg"
                        });
                    }
                    this.dialogTableVisible =true;
                }
            },
            rowHove:function(event){
                console.log(event);
            },
            setAll:function () {
                this.initData();
                this.technicalOfficesChart();
            }
        },
        mounted:function () {
            this.setAll();
            //            this.technicalOfficesChart();
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
    .equipment{
        img{
            width: 100px;
            height: 50px;
        }
    }
</style>
