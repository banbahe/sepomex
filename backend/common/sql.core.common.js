const sql = require('mssql');
const config = require('../config/webconfig');
module.exports = {
   ExecuteQuery: function (query, objectName, res) {
      console.log(objectName);
      sql.connect(config).then(pool => {
         return pool.request().query(query);
      }).then(result => {
         sql.close();
         //res.json({ `${objectName}`: result.recordset });
      }).catch(err => {
         sql.close();
         return 'err.message';
      });
   }
}