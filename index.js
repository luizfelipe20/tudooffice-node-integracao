/*
const express = require("express");
const app = express();
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())
*/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3333;


app.post('/orders', (req, res) => {
  try {
    var path = require('path');
    process.env['PATH'] = path.join(__dirname, '/instantclient') + ';' + process.env['PATH'];
    const oracledb = require('oracledb');
    const { query } = req.body;

    oracledb.getConnection(
        {
          user          : "TUDOOFFICE",
          password      : "TUDOOFFICEPROD1801",
          connectString : "(DESCRIPTION = ( ADDRESS = ( PROTOCOL = TCP )( HOST = 172.31.252.98 )( PORT = 1521 ))( CONNECT_DATA = (SID = TUOF5129)))"
        },
        function(err, connection) {
          if (err){
            return res.status(400).send({ error: err });
          }

          const result = connection.execute("SELECT * FROM pcpedi");
          console.log(result.rows);
          
          return res.status(200).send({ data: result.rows });
          
          /*connection.execute(,
            function(err, result) {
              if (err){
                return res.status(400).send({ error: err });
              }else{
                return res.status(200).send({ data: result });
              }
          });*/
        }
    );
  } catch (err) {
    return res.status(400).send({ error: err });
  }
  
});


app.get("/list_products/", async (req, res, next) => {
  try {
    var path = require('path');
    process.env['PATH'] = path.join(__dirname, '/instantclient') + ';' + process.env['PATH'];
    const oracledb = require('oracledb');

    oracledb.getConnection(
        {
          user          : "TUDOOFFICE",
          password      : "TUDOOFFICEPROD1801",
          connectString : "(DESCRIPTION = ( ADDRESS = ( PROTOCOL = TCP )( HOST = 172.31.252.98 )( PORT = 1521 ))( CONNECT_DATA = (SID = TUOF5129)))"
        },
        function(err, connection) {
            connection.execute("SELECT pcprodut.codprod, pcprodut.descricao1, pcregiao.numregiao, pcregiao.regiao, pctabpr.ptabela, pcprodut.codepto codepto, pcdepto.descricao depto, pcprodut.codsec, pcsecao.descricao secao FROM pcprodut pcprodut INNER JOIN pctabpr ON (pcprodut.codprod = pctabpr.codprod) INNER JOIN pcregiao ON (pcregiao.numregiao = pctabpr.numregiao) INNER JOIN pcdepto ON (pcprodut.codepto = pcdepto.codepto) INNER JOIN pcsecao ON (pcprodut.codsec = pcsecao.codsec) WHERE   pctabpr.ptabela > '0' ORDER BY pcprodut.descricao",
            function(err, result) {
              if (err){
                return res.status(400).send({ error: err });
              }else{
                let resp = []
                let colunms = [];
                for (elem of result.metaData) {
                  colunms.push(elem.name)
                }
                
                for (items of result.rows) {
                  let data = {}
                  let count = 0;

                  for (item of items) {
                    let key = colunms[count];
                    let value = item
                    data[key] = value
                    count = count + 1;
                  }
                  
                  resp.push(data);
                }

                return res.status(200).send({ data: resp });
              }
            });
        }
    );
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});


app.listen(port, () => console.log("server running on port:" + port));
