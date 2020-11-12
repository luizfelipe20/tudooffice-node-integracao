function kenex_db() {
    try {
        var path = require('path');
        process.env['PATH'] = path.join(__dirname, '/instantclient') + ';' + process.env['PATH'];
 
        var database = require('knex')({
            client: 'oracledb',
            connection: {
                host: '172.31.252.98:1521',
                user: 'TUDOOFFICE',
                password: 'TUDOOFFICEPROD1801',
                database: 'TUOF5129'
            }
        });

        database
            .select()
            .table("pcproduct")
            .then((resp) => {
                console.log(resp);
            })
            .catch((err) => {
                console.log(err);
            });

    } catch (err) {
        console.log(err);
    }
}

//kenex_db();

function orable() {
    try {
        var path = require('path');
        process.env['PATH'] = path.join(__dirname, '/instantclient') + ';' + process.env['PATH'];
        const oracledb = require('oracledb');
        oracledb.getConnection(
            {
                user: "TUDOOFFICE",
                password: "TUDOOFFICEPROD1801",
                connectString: "172.31.252.98:1521/TUOF5129"
            },
            function (err, connection) {
                if (err) {
                    console.log(err);
                } else
                    connection.execute("select * from pcproduct",
                        function (err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(result.rows);
                            }
                        });
            }
        );
    } catch (err) {
        console.log(err);
    }

}
orable();