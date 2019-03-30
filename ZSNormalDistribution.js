//各指数正态分布统计

const timeutil = require('./util/timeutil')
var http = require("http");

//上证指数
// var url = "http://pdfm.eastmoney.com/EM_UBG_PDTI_Fast/api/js?rtntype=5&id=0000011&type=k"
//中证500
// var url = "http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js?id=0009051&TYPE=k&js=fsData1553528312162_89795391((x))&rtntype=5&isCR=false&authorityType=fa&fsData1553528312162_89795391=fsData1553528312162_89795391"
//沪深300
var url = "http://pdfm2.eastmoney.com/EM_UBG_PDTI_Fast/api/js?id=0003001&TYPE=k&js=fsData1553528853947_34767154((x))&rtntype=5&isCR=false&authorityType=fa&fsData1553528853947_34767154=fsData1553528853947_34767154"

var startTime = new Date()
var queryDateString = '2016-04-01'
var queryDateStringNow = '2019-03-29'
var gap = 20
var isShowNormalDistribution = false
var isShowPersent = true

http.get(url, function (data) {
    var str = "";

    data.on("data", function (chunk) {
        str += chunk;//监听数据响应，拼接数据片段
    })
    data.on("end", function () {
        // console.log(str.toString())
        str = str.split("(")[1].split(")")[0]

        var obj = JSON.parse(str)
        var fundName = obj.name
        // var queryDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
        var queryDate = new Date(queryDateString)

        var normalDistributionData = new Map()

        var kk =
            obj.data
                .map(item => {
                    return item.split(",")
                })
                .filter(item => {
                    var date = new Date(item[0]);
                    return date > queryDate
                })
                .sort(sortPoint)

        if (isShowNormalDistribution) {
            //获得正态分布图数据
            kk.forEach(element => {
                var point = parseInt(element[2] / gap) * gap
                var count = normalDistributionData.get(point) ? normalDistributionData.get(point) + 1 : 1
                normalDistributionData.set(point, count)
            });
            normalDistributionData.forEach(function (value, key, map) {
                console.log(key + " " + value)
            })
        }

        if (isShowPersent) {
            //获取排位
            var dd =
                kk.map(item => {
                    return item[0]
                }).indexOf(queryDateStringNow) / kk.length * 100

            console.log("由 " + queryDateString + " 至今 <" + fundName + ">在历史排位:" + dd + "%")
        }
        var endTime = new Date()
        console.log("执行了:" + (endTime - startTime) / 1000 + "s")
    })
})

function sortPoint(a, b) {
    return a[2] - b[2]
}