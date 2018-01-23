
const sql = require('mssql');
const webconfig = require('../config/webconfig');
var fs = require('fs')
module.exports = {
  ListCompanies: function (req, res, next) {
    // req.send(400,'bad request');
    sql.connect(webconfig).then(x => {
      return x.request().query('SELECT Id ,Cliente ,Detalle,Images  FROM SEPOMEX_Cliente');
    }).then(x => {
      sql.close();
      res.json(x.recordset);
    }).catch(err => {
      sql.close();      
      console.dir(err);
    });
  },
  CompanyPerId: function (req, res, next) { },
  ReportPerId: function (req, res, next) {
    sql.connect(webconfig).then(x => {
      return x.request().query(`select CONCAT(NombreArchivo,'|',CodigoBarrasPieza) as rowdata from SEPOMEX_Conciliacion where IdCliente = ${req.params.id}`);
    }).then(y => {
      // filename 
      sql.close();
      const getdate = new Date();
      const fileName = `${getdate.getFullYear()}${getdate.getMonth() + 1}${getdate.getDate()}${req.params.id}.txt`;
      const filePath = `${__dirname}\\`;
      let txt = '';
      for (let index = 0; index < y.recordset.length; index++) {
        txt = txt + y.recordset[1].rowdata + "\n";
      }

      fs.writeFile(filePath + fileName, txt, (err) => {
        if (err) {
          throw err;
        } else {
          res.download(filePath + fileName, fileName, (err) => {
            if (err) {
              console.dir(err);
            }
          });
        }
      });
    }).catch(c => {
      sql.close();
      console.dir(c);
    });
  }

}