// Standard

var mysql = require('mysql');
var config = require('../../app/config/config');

exports.query = function(sql,return_type="json"){
    const con = mysql.createConnection({
        host: "localhost",
        user: config.db.user,
        password: config.db.password,
        database: config.db.db_name
    });
    return new Promise(function(resolve,reject){
        con.connect(function(err) {
            if (err){
                resolve(err);//should be reject
                throw err;
            } 
            con.query(sql, function (err, result, fields) {
                if (err){
                    resolve(err);//should be reject
                    throw err;
                }
                result = JSON.stringify(result);
                console.log('Running Query:  '+sql);
                console.log('Query Result: '+result);
                result = JSON.parse(result)
                resolve(result);
                con.end();
            });
        });
    });
}
