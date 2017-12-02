var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_walkertu',
  password        : '7142',
  database        : 'cs290_walkertu'
});

module.exports.pool = pool;