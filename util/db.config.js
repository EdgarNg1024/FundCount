const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 20, //连接池连接数
  host: 'localhost', //数据库地址，这里用的是本地
  database: 'edgar', //数据库名称
  user: 'root',  // username
  password: 'asdf1234' // password
})
//返回一个Promise链接
const connectHandle = () => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if(err) {
      console.error('链接错误：' + err.stack + '\n' + '链接ID：' + connection.threadId)
      reject(err)
    } else {
      resolve(connection)
    }
  })
})



module.exports = connectHandle