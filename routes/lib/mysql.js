require('./CONFIG.js');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: USER,
    password: PASS,
    database: DATABASE,
    insecureAuth : true,
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

// `tb_users`
// CREATE TABLE IF NOT EXISTS `tb_users` (
//     `seq` int(11) NOT NULL AUTO_INCREMENT,
//     `uid` varchar(100) NOT NULL COMMENT 'userId:email',
//     `upwd` varchar(50) NOT NULL COMMENT 'password',
//     `store` varchar(255) NOT NULL COMMENT 'Area',
//     `company` varchar(255) NOT NULL COMMENT 'Company',
//     `status` int(2) NOT NULL COMMENT 'User Level',
//     `regtime` int(11) NOT NULL COMMENT 'Register',
//     PRIMARY KEY (`seq`),
//     FULLTEXT INDEX ngram_idx(`store`) WITH PARSER ngram
// ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='user information'

/**
 * err:connection.release();
 * err:connect pool 돌려주지 않아도 됨
 * mysql "~2.15.0"
 * port / PID check command
 * sudo lsof -i :3306 
 * sudo kill -9 [PID]
  * */
exports.executeQuery = function(query, callback) {
    //Connect Test
    // connection.connect((err) => {
    //     console.log('connection.query test!!:');
    //     if (err) {
    //       console.error('connection faild err:', err);
    //       callback(err, null);
    //       return;
    //     }
    //     console.log('connection success!!.');
    // })
    //--Connect Test

    connection.query(query, function(err, result, fields) {
        console.log('connection.query result:'+result);
        console.log('connection.query DB :'+DATABASE+' query:'+query);

        if(err) {
            console.log(' connection.query error MSG [ '+err.toString()+ " ]");
            callback(err, null);
            return;
        }
        console.log('connection.query success');
        callback(null, result);
    });
};

