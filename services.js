global.gRoot = '';
global.gPath = '';

// DEBUG_DEV = "DEBUG_DEV";
// DEBUG_REAL = "DEBUG_REAL";
// global.gMode = DEBUG_DEV;

global.gTitle = '127.0.0.1';
// global.gCompany = 'localhost';

var express = require('express');
var http = require('http');
var path = require('path');

var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var customer = require('./routes/customer');
var services = express();

var hostname = '127.0.0.1';

services.set('port', process.env.PORT || 8813);
services.set('views', path.join(__dirname, 'views'));
services.set('view engine', 'ejs');
services.use(bodyParser.urlencoded({ extended: false }));
services.use(bodyParser.json());
services.use(cookieParser());
services.use(session({keys: ['services_uid']}));
services.use(express.static(path.join(__dirname, 'public')));

services.get(gPath + '/', login.login);
services.get(gPath + '/logout', login.logout);
services.post(gPath + '/onLogin', login.onLogin);

services.get(gPath + '/customer', customer.customer);
services.get(gPath + '/customer/user/register', customer.customerUserRegister);
services.post(gPath + '/customer/user/onUserRegister',customer.onUserRegister);

services.get(gPath + '/customer/user/list', customer.customerUserList);
services.post(gPath + '/customer/user/list/search', customer.onUserIdSearchAsync);

services.get(gPath + '/customer/user/edit/:userid', customer.customerUserEdit);
services.post(gPath + '/customer/user/edit/onUserFindAsync', customer.onUserFindAsync);
services.post(gPath + '/customer/user/edit/onUserUpdate', customer.onUserUpdate);
services.post(gPath + '/customer/user/edit/onUserDelete', customer.onUserDelete);

services.get(gPath + '/customer/data/register', customer.customerDataReister);
services.post(gPath+ '/customer/data/register/finding', customer.onDataRegFindAysnc);
services.post(gPath+ '/customer/data/register/found', customer.onDataRegFoundDelAysnc);
services.post(gPath+ '/customer/data/register/upload', customer.onDataRegisterAysnc);

services.get(gPath + '/customer/data/list', customer.customerDataList);
services.post(gPath + '/customer/data/list/search', customer.onDateSearchAsync);
services.post(gPath + '/customer/data/list/onAllDelete', customer.onDataTruncateDB);
services.post(gPath + '/customer/data/list/onAllFinding', customer.onDataAllSelectDB);
services.post(gPath + '/customer/data/list/onOneDayDelete', customer.onDateOneDayDeleteDB);
services.post(gPath + '/customer/data/list/onOneDayFinding',customer.onDateOneDaySelectDB);
// catch 404 and forward to error handler
services.use(function(req, res, next) {
    next(createError(404));
});

// error handler
services.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

http.createServer(services).listen( services.get('port'), function(){
    console.log('Express server listening on port ' + services.get('port'));
});

module.exports = services;














