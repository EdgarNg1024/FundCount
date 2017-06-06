var request = require('request');
var mysql = require('mysql');


var client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'fundcound'
});

console.log(new Date().getTime());
client.connect();

selectFundData();


/////////////////////////////方法区域//////////////////////////////////
function insertFundRank(fundNum, dt) {

    let url = 'http://fund.eastmoney.com/data/FundPicData.aspx?bzdm=' + fundNum + '&n=5&dt=' + dt + '&rt=threemonth&vname=percentRank_PicData';
    console.log(url);

    let sqlParams = [];
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body.split('=')[1].split('"')[1].split('|')
                .map(function (item) {
                    let param = item.split('_');
                    param.unshift('0', fundNum, dt);
                    sqlParams.push(param);
                });
            console.log(sqlParams);
            if (sqlParams.length <= 1) {
                // client.end();
                return;
            }
            var userAddSql = "INSERT INTO fundrank(id,fundnum,dt,funddate,fundrank) VALUES ?";
            //增 add
            client.query(userAddSql, [sqlParams], function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                }
                console.log('-------INSERT----------');
                //console.log('INSERT ID:',result.insertId);       
                console.log('INSERT ID:', result);
                console.log('#######################');
                console.log(new Date().getTime());
            });
            // client.end();
        }
    });

}


function selectFundData() {
    let url = 'select keynum from funddata;';
    client.query(url, function (err, result) {
        if (err) {
            throw err;
        }
        result.forEach(function (element) {
            console.log(element.keynum);
            insertFundRank(element.keynum, 'sixmonth');
        });
        // client.end();
    });

}