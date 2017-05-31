// 加载File System读写模块  
let fs = require('fs');
let putSql_Params = [];
let data = fs.readFileSync("data/fundData.txt", "utf-8");
let obj = JSON.parse(data);
for (let item in obj) {
    let objItem = obj[item];
    let putSql = ['0',objItem[0],objItem[2],objItem[1],objItem[3]];
    putSql_Params.push(putSql);
}
// console.log(putSql_Params);

var mysql = require('mysql');
var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'fundcound'
});

client.connect();

var userAddSql = "INSERT INTO funddata(id,keynum,fundname,py,fundtype) VALUES ?";
//增 add
client.query(userAddSql, [putSql_Params], function (err, result) {
  if (err) {
    console.log('[INSERT ERROR] - ', err.message);
    return;
  }
  console.log('-------INSERT----------');
  //console.log('INSERT ID:',result.insertId);       
  console.log('INSERT ID:', result);
  console.log('#######################');
});
client.end();
