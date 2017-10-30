/**
 * Created by huangjihua on 17/9/26.
 */
// 时间处理
import moment from 'moment';
const DrugArray=["维C银翘片", "小柴胡颗粒", "抗病毒口服液", "维生素C泡腾片", "克感利咽口服液", "玉屏风散",
    "藿香正气丸", "复方愈创木酚磺酸钾口服液", "橘红痰咳煎膏", "橘红梨膏", "盐酸小檗碱片", "诺氟沙星胶囊", "思密达", "山莨菪碱片",
    "藿香正气丸", "保济丸", "多潘立酮片", "双料喉风散", "众生丸", "地喹氯胺口含片", "头孢拉定胶囊", "诺氟沙星胶囊",
    "红霉素", "阿奇霉素", "甲硝唑片", "氯雷他定片", "通窍救心油", "氨茶碱片", "双料喉风散", "云南白药胶囊",
    "利福平眼药水", "氧氟沙星滴眼液", "四环素", "红霉素", "金霉素眼膏", "思然眼药水", "四环素", "红霉素软膏",
    "百多邦", "地塞米松软膏", "跌打万花油", "创可贴", "麝香镇痛膏"];
const consumable = ["产包","导尿管","手术包","中心静脉导管包","血液透析导管包","穿刺包","换药包","口腔护理包","胃管包",
    "灌肠包","急救包","引流包","呼吸道管包","导管系列","肛管","鼻饲管","创可贴","生物敷料","婴儿护脐敷料","外科手术胶带","透气胶带",
    "输液胶贴","留置针胶贴","医用纱布","弹性绷带","腹带、压力袜","石膏绷带","骨科高分子喝茶矫形绷带","注射针","输液器","输液配件","胰岛素注射器"
];
export const OfficeType =[
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
    }, {
        value: '1006',
        label: '心内科'
    }]; //科室
export const equipmentType=[{ label:"PTS",value:1},{label:"ETV",value:2},{label:"AVG",value:3},{label:"人工",value:4}];//设备类型
export const operator=[
    {id:1000,name:'hank',sex:1},
    {id:1001,name:'lila',sex:0},
    {id:1002,name:'lemon',sex:1},
    {id:1003,name:'nana',sex:0},
    {id:1004,name:'nimo',sex:0},
    {id:1005,name:'张菲',sex:1},
    {id:1006,name:'王娜',sex:0},
    {id:1007,name:'吴萍',sex:0}]; /*操作人员*/
const product = [
    {label:'PIVAS',id:'p1',list:[]},  {label:'PIVAS',id:'p1',list:[]},
    {label:'药房',id:'p2',list:[]}, {label:'药房',id:'p2',list:[]},
    {label:'检验',id:'p3',list:[]},{label:'检验',id:'p3',list:[]},
    {label:'CSSD',id:'p4',list:[]}, {label:'CSSD',id:'p4',list:[]},
    {label:'衣服',id:'p5',list:[]}, {label:'衣服',id:'p5',list:[]},
    {label:'厨房',id:'p6',list:[]}, {label:'厨房',id:'p6',list:[]}
];
export const products =  [
    {label:'PIVAS',id:'p1'},
    {label:'药房',id:'p2'},
    {label:'检验',id:'p3'},
    {label:'CSSD',id:'p4'},
    {label:'衣服',id:'p5'},
    {label:'厨房',id:'p6'}
];

/**
 * 随机生成药
 * @param forNum  循环次数 {number
 * @param min 随机数最小值 {number}
 * @param max 随机数最大值 {number}
 * @param sortType 排序类型,不传参表示不排序 desc|asc {string}
 * @returns {object}
 */
export function formatDrug(arrName,forNum,min,max,sortType){
    // debugger;
    let product  = arrName==='consumable'?consumable:DrugArray;
    let Drugs = {"result" : []};
    let drugNameIndex ='';
    for(let i=0; i<forNum; i++){
        let flag = true;
        drugNameIndex =  GetRandomNum(0,product.length-1);
        for(let index in Drugs.result){
             if(index === drugNameIndex){
                 flag=false;
                 break;
             }
        }
        if(flag){
            Drugs.result.push({
                "_id" : {
                    "axisName" :product[drugNameIndex]
                },
                "num" : GetRandomNum(min,max)
            });
        }

    }
     switch (sortType){
         case 'desc':
             Drugs.result.sort(descSort);
             break;
         case 'asc':
             Drugs.result.sort(ascSort);
             break;
     }
    return Drugs;
}

/**
 * 生成设备进出数据
 * @param date {date} 日期
 * @param technicalValue {string} 科室
 * @param min 随机数最小值 {number}
 * @param max 随机数最大值 {number
 */
export function equipentAccessData(date,technicalValue,min,max) {
    // debugger;

    let eData = {"result": []};
    // debugger;
    // console.log('date:'+date);

    let advanceTime = moment(date,'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
    console.log(advanceTime);
    for (let i = 0; i < 24; i++) {
        let  index=  GetRandomNum(0, equipmentType.length-1);
        advanceTime = moment(advanceTime).subtract(-1, 'hour').format('YYYY-MM-DD HH:mm');
        eData.result.push({
            _id: {
                axisName: equipmentType[index].label,
                type: equipmentType[index].value, /* pts etv avg at*/
                date: advanceTime,
                technicalValue:technicalValue
            },
            intNum: GetRandomNum(min, max),
            outNum: GetRandomNum(-max, -min)
        });
     // console.log('a:'+advanceTime);
    }
    return eData;
}


/**
 * 全院核心物流统计
 * @param date {date} 日期
 * @param technicalValue {string} 科室
 * @param min 随机数最小值 {number}
 * @param max 随机数最大值 {number
 */
export function coreLogisticData(date,technicalValue,min,max) {
    // debugger;

    let eData = {"result": []};
    console.log('result');
    for(let key in product){
        eData.result.push(product[key]);
        eData.result[key].list=[];
        for (let i = 0; i <24; i++) {
            let  index=  GetRandomNum(0, equipmentType.length-1);
            eData.result[key].list.push({
                _id: {
                    axisName: equipmentType[index].label,
                    equipmentType:equipmentType[index].value,
                    type: technicalValue, /* equipmentType[index].value,*/ /* pts etv avg at*/
                    date: i
                },
                intNum: GetRandomNum(min, max),
                outNum: GetRandomNum(-max, 0)
            });
            // console.log(i);
        }
    }


    // Array.from(eData,function (x) {
    //     console.log(x);
    // })
    return eData;
}


/*
 * 随机数生成
 * @param Min {number}
 * @param Max {number}
 * @returns {number}
 */
export function  GetRandomNum(Min,Max)
{
    let Range = Max - Min;
    let Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

/**
 * 倒序
 * @param a
 * @param b
 * @returns {number}
 */
export function descSort(a,b) {
    return a.num-b.num;
}

/**
 * 升序
 * @param a
 * @param b
 * @returns {number}
 */
export  function ascSort(a,b) {
    return b.num-a.num;
}

/**
 * 生成日期数据
 * @param gapType {string} 时间间隔类型
 * @param gapNum  间隔数
 */
export function generateDate(gapType,gapNum) {
    //前30分钟
    //moment().subtract(30, 'minutes').format('YYYY-MM-DD hh:mm:ss')
    switch(gapType){
        case "year":

            break;
        case "month":

            break;
        case "second":

            break;
    }
}
