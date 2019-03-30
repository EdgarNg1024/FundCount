var mysql = require('mysql');
var client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'fundcound'
});

client.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });


// client.query('SELECT * from websites', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
//   client.end();

// });


var userAddSql = "INSERT INTO funddata(id,keynum,fundname,py,fundtype) VALUES ?";
var userAddSql_Params = [
  ['0', '000001', '华夏成长', 'HXCZ', '混合型'],
  ['0', '000001', '华夏成长', 'HXCZ', '混合型'],
  ['0', '000001', '华夏成长', 'HXCZ', '混合型']
];
//增 add
client.query(userAddSql, [userAddSql_Params], function (err, result) {
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
