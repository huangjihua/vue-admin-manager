/**
 * Created by huangjihua on 17/9/26.
 */

const DrugArray=["维C银翘片", "小柴胡颗粒", "抗病毒口服液", "维生素C泡腾片", "克感利咽口服液", "玉屏风散",
    "藿香正气丸", "复方愈创木酚磺酸钾口服液", "橘红痰咳煎膏", "橘红梨膏", "盐酸小檗碱片", "诺氟沙星胶囊", "思密达", "山莨菪碱片",
    "藿香正气丸", "保济丸", "多潘立酮片", "双料喉风散", "众生丸", "地喹氯胺口含片", "头孢拉定胶囊", "诺氟沙星胶囊",
    "红霉素", "阿奇霉素", "甲硝唑片", "氯雷他定片", "通窍救心油", "氨茶碱片", "双料喉风散", "云南白药胶囊",
    "利福平眼药水", "氧氟沙星滴眼液", "四环素", "红霉素", "金霉素眼膏", "思然眼药水", "四环素", "红霉素软膏",
    "百多邦", "地塞米松软膏", "跌打万花油", "创可贴", "麝香镇痛膏"];
/**
 * 随机生成药
 * @param forNum  循环次数 {number}
 * @param min 随机数最小值 {number}
 * @param max 随机数最大值 {number}
 * @returns {object}
 */
export function formatDrug(forNum,min,max){
    debugger;
    let Drugs = {"result" : []};
    let drugNameIndex ='';
    for(var i=0; i<forNum; i++){
        let flag = true;
        drugNameIndex =  GetRandomNum(0,DrugArray.length-1);
        for(let index in Drugs.result){
             if(index === drugNameIndex){
                 flag=false;
                 break;
             }
        }
        if(flag){
            Drugs.result.push({
                "_id" : {
                    "axisName" :DrugArray[drugNameIndex]
                },
                "num" : GetRandomNum(min,max)
            });
        }

    }
    return Drugs;
}

/*
 * 随机数生成
 * @param Min {number}
 * @param Max {number}
 * @returns {number}
 */
export function  GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}
