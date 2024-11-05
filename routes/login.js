var common = require('./lib/common.js');
var mysql = require('./lib/mysql.js');
var crypto = require('crypto');

exports.login = function(req, res) {
  common.connection('customer', req, res);
}

exports.logout = function(req, res) {
  req.session.uid = '';
    req.session.status = '';
    req.session.company = '';
    req.session.store = '';
    res.render('login', {gRoot:global.gRoot});
}

exports.onLogin = function(req, res) {
  console.log('onLogin');
  var id = req.body.id;
  var password = req.body.password;
  var query = 'select * from tb_users where uid="' + id + '" and upwd="' + password+'"';
  console.log('DB :'+DATABASE+' Query: '+query);

  mysql.executeQuery(query, function(err, result) {
    if(err) {
	  res.status(500).send('onLogin');
      console.log(500);
	  return;
    }
	if(result.length == 0) {
	  res.status(200).send({code:2000});
        console.log(2000);
	  return;
	}
	req.session.uid = result[0].uid;
    req.session.status = result[0].status;
    req.session.company = result[0].company;
    req.session.store = result[0].store;
      console.log(1000);
	res.status(200).send({code:1000});
  });	  
}