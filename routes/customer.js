
require('./lib/lang_jp');
var common = require('./lib/common.js');
var mysql = require('./lib/mysql.js');

exports.customer = function(req, res) {
  common.connection('customer', req, res);
}

exports.customerUserRegister = function(req, res) {
    common.connection('user_register', req, res);
}

exports.customerUserEdit = function(req, res) {
    common.connection('user_edit', req, res);
}

exports.customerUserList = function(req, res) {
    common.connection('user_list', req, res);
}

exports.customerDataReister = function(req, res) {
    common.connection('data_register', req, res);
}

exports.customerDataList = function(req, res) {
    common.connection('data_list', req, res);
}

function mysql_Query(type, table, where, option){

}

/** User Register UI SQL*/
exports.onUserRegister = function(req, res) {
    console.log('onUserRegister');
    var id = req.body.id;
    var pwd = req.body.password;
    var company = req.body.company;
    var store = req.body.store;
    var status = req.body.status;
    var query = 'INSERT INTO '+DB_TB_USER+' (`uid`, `upwd`, `store`, `company`, `status`, `regtime`) ' +
        'VALUES ( "' + id + '", "' + pwd + '", "' + store + '", "' + company + '", "' + status + '", DATE_FORMAT(now(), "%Y-%m-%d"))'
    console.log('DB :'+DATABASE+' onUserRegister: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onUserRegister');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onUserRegister 1000');
        res.status(200).send({code:1000});
    });
}

/** User List UI SQL*/
//ALTER TABLE `tb_users` ADD FULLTEXT(company,store)
exports.onUserIdSearchAsync = function (req, res) {
    console.log('Exports onUserIdSearchAsync');
    var searchKey = req.body.searchKey;
    var query = '';
    if(searchKey == null || searchKey == 'undefined' || searchKey.length == 0){
        query = 'SELECT uid, company, store, status as ustatus, regtime  FROM '+DB_TB_USER;
    }else{
        query = 'SELECT uid, company, store, status as ustatus, regtime FROM '+DB_TB_USER+
            'WHERE MATCH(uid) AGAINST("'+searchKey+'*" IN BOOLEAN MODE)';
    }

    console.log('DB :'+DATABASE+' onUserIdSearchAsync: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onUserIdSearchAsync');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onUserIdSearchAsync 1000');
        res.status(200).send({code:1000, data:result});
    });
}

/** User Edit UI SQL*/
exports.onUserUpdate = function (req, res) {
    console.log('Exports onUserSearchAsync');
    var previd = req.body.previd;
    var id = req.body.id;
    var pwd = req.body.password;
    var company = req.body.company;
    var store = req.body.store;
    var status = req.body.status;
    var query = 'UPDATE '+DB_TB_USER+' SET ' +
        'uid = "'+id+'", ' +
        'upwd = "'+pwd+'", ' +
        'store = "'+store+'", ' +
        'company = "'+company+'", ' +
        'status = "'+status+'", ' +
        'regtime = DATE_FORMAT(now(), "%Y-%m-%d")  ' +
        ' WHERE uid = "'+previd+'"';

    console.log('DB :'+DATABASE+' onUserSearchAsync: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onUserSearchAsync');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onUserSearchAsync 1000');
        res.status(200).send({code:1000});
    });
}

/** User Edit UI Finding.. SQL*/
exports.onUserFindAsync = function (req, res) {
    console.log('Exports onUserFind');
    var id = req.body.userId;
    var query = 'SELECT uid, upwd, company, store, status FROM '+DB_TB_USER+' WHERE uid = "'+id+'" Limit 1';

    console.log('DB :'+DATABASE+' onUserFind: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onUserFind');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onUserFind 1000');
        res.status(200).send({code:1000, data:result});
    });
}

/** User Edit UI Delete SQL*/
exports.onUserDelete = function (req, res) {
    console.log('Exports onUserDelete');
    var id = req.body.previd;
    var query = 'DELETE FROM '+DB_TB_USER+' WHERE uid = "'+id+'"';

    console.log('DB :'+DATABASE+' onUserDelete: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onUserDelete');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onUserDelete 1000');
        res.status(200).send({code:1000});
    });
}

/** User Edit UI Delete SQL*/
exports.onDataList = function (req, res) {
    console.log('Exports onUserDelete');

    var company = '';
    var storekey = '';
    var statusPaid = '';
    var dateStrat = '';
    var dateEnd = '';

    var query = 'SELECT * ' +
        'FROM '+DB_TB_USER+
        ' WHERE company = "'+company+'" store ="'+storekey+'" status="'+statusPaid+'"' +
        ' date_range="'+dateStrat+'" AND date_range="'+dateEnd+'" ';

    console.log('DB :'+DATABASE+' onUserDelete: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onUserDelete');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onUserDelete 1000');
        res.status(200).send({code:1000});
    });
}

/**
* ##先1）Data 格納する前, 当日　Dataがあるのか確認する func
 * params : 登録したuserId・現文書日
 * unit   : 1.userId 現在文書日がDBにあるとTRUE
 * 　　　　 2.なければ FALSE
* */
exports.onDataRegFindAysnc = function (req, res){
    console.log('Exports onDataRegFindAysnc');
    var update = req.body.regDate;
    var query = 'SELECT COUNT(*) as cnt ' +
        'FROM '+DB_TB_DATAS+
        ' WHERE userId = "'+req.session.uid+'" AND regDate = DATE_FORMAT("' + update + '", "%Y-%m-%d")';
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onDataRegisterCheck');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }

        // console.log('onUserDelete 1000');
        res.status(200).send({code:1000, data:result});
    });
}

/**
 * ##先2）Data 格納する前, 当日 Dataあると削除する func
 * params : 登録したuserId・現文書日
 * unit   : 1.全部削除TRUR
 * 　　　　 2.なければ FALSE
 * */
exports.onDataRegFoundDelAysnc = function (req, res){
    console.log('Exports onDataRegFindedDel');
    var update = req.body.regDate;
    var query = 'DELETE FROM '+DB_TB_DATAS+
        ' WHERE userId = "'+req.session.uid+'" AND regDate =  DATE_FORMAT("' + update + '", "%Y-%m-%d")';
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onDataRegisterCheck');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onUserDelete 1000');
        res.status(200).send({code:1000});
    });
}

/**
 * 엑셀 데이터 업로드
* */
exports.onDataRegisterAysnc = function (req, res) {
    console.log('Exports onDataRegisterAysnc');
    var userId = req.session.uid;
    var userStore = req.session.store;


    var update = req.body.regDate;
    var company = req.body.regCompany;
    var people = req.body.regPeople;
    var itcName = req.body.regItcName;
    var sales = req.body.regSales;

    var taCom = req.body.regTaCom;
    var tgCom = req.body.regTgCom;
    var tcCom = req.body.regTcCom;
    var spCost = req.body.regSpCost;

    var total = req.body.regTotal;
    var spCost = req.body.regSpCost;

    var itcNo = req.body.regItcNo;
    var tourNo = req.body.regCode;

    var query = 'INSERT INTO '+DB_TB_DATAS+
        '(`userId`, `userStore`, `userDate`, `company`, `regDate`,' +
        ' `people`, `itcName`, `sales`,' +
        ' `taCom`, `tgCom`, `tcCom`, `spCost`, `total`, `itcNo`, `code`) VALUES (' +
        ' "' + userId + '", "' + userStore + '", DATE_FORMAT(now(), "%Y-%m-%d"), "' + company + '", DATE_FORMAT("' + update + '", "%Y-%m-%d"), ' +
        ' "' + people + '", "' + itcName + '", "' + sales + '", ' +
        ' "' + taCom + '", "' + tgCom + '", "' + tcCom + '", "' + spCost + '", "' + total+ '" , "' + itcNo + '", "' + tourNo+ '" '+
        ')';

    console.log('DB :'+DATABASE+' onDataRegisterAysnc: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onDataRegisterAysnc');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onUserRegister 1000');
        res.status(200).send({code:1000});
    });

}


/**
* 소스가 많이 지저분하다.
 * 다 필요한 key들이므로 유지보수 및 수정 할때 유의하길......
* */
exports.onDateSearchAsync = function (req, res) {
    console.log('Exports onDateSearchAsync');
    var query = '';
    var where = ' WHERE '
    var order = ' ORDER BY regDate DESC';
    var searchKey = 0;
    /** SearchKey가 있으면, 검색어가 없이 들어온것.*/
    console.log(req.body.searchKey);
    if(req.body.searchKey == ''){
        searchKey = 0;
        if(req.session.status == 1){
            where += ' userStore="'+req.session.store+'" ';
        }
        else if(req.session.status == 2){
            where += ' company="'+req.session.company+'" ';
        }
        else{
            where = '';
        }
    }else{ //Search 영역
        var whereStore = '';
        console.log(req.session.status);
        if(req.session.status != 0){
            whereStore = ' AND MATCH(userStore) AGAINST("'+req.body.dataStorekey+'*"  IN BOOLEAN MODE) AND ';
            where += ' regDate BETWEEN "'+req.body.dataDateStart+'" AND "'+req.body.dataDateEnd+'" '+ (req.body.dataStorekey != "" ? whereStore : " AND " );
            if(req.session.status == 1){
                where += ' userStore="'+req.session.store+'" ';
            }
            else if(req.session.status == 2){
                where += ' company="'+req.session.company+'" ';
            }
        }
        else {
            whereStore = ' AND MATCH(userStore) AGAINST("'+req.body.dataStorekey+'*" IN BOOLEAN MODE)  ';
            where += ' regDate BETWEEN "'+req.body.dataDateStart+'" AND "'+req.body.dataDateEnd+'" '+ (req.body.dataStorekey != "" ? whereStore : "  " );
        }
    }
    //
    // if(req.session.status == 1){
    //     where += ' userStore="'+req.session.store+'" ';
    // }
    // else if(req.session.status == 2){
    //     where += ' company="'+req.session.company+'" ';
    // }

    /*
    * KEY : idx,userId, userStore, userDate, company, regDate,' +
            ' people, itcNo,itcName, sales,' +
            ' taCom, taSt, tgCom, tgSt, tcCom, tcSt, spCost, spSt, total
    * */
    if(searchKey == 0){
        query = 'SELECT * FROM '+ DB_TB_DATAS + where + order;
    }else{
        where += ''; // Search Key ADDs
        query = 'SELECT * FROM '+ DB_TB_DATAS + where + order;
            // 'WHERE MATCH(store) AGAINST("'+searchKey+'" IN NATURAL LANGUAGE MODE)';
    }

    console.log(' onDateSearchAsync: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onUserIdSearchAsync');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onUserIdSearchAsync 1000');
        res.status(200).send({code:1000, data:result});
    });
}

/**
 * Truncate Table
* */
exports.onDataTruncateDB = function (req, res) {
    console.log('Exports onDataTruncateDB');

    var query = 'TRUNCATE TABLE '+DB_TB_DATAS;

    console.log('DB :'+DATABASE+' onDataTruncateDB: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onDataTruncateDB');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onDataTruncateDB 1000');
        res.status(200).send({code:1000});
    });
}

/**
 * OneDay Delete
 * */
exports.onDataAllSelectDB = function (req, res) {
    console.log('Exports onDataAllSelectDB');
    var query = 'SELECT COUNT(*) as cnt FROM '+ DB_TB_DATAS ;

    console.log('DB :'+DATABASE+' onDataAllSelectDB: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onDataAllSelectDB');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onDataAllSelectDB 1000');
        res.status(200).send({code:1000, data:result});
    });
}

/**
 * OneDay Delete
* */
exports.onDateOneDayDeleteDB = function (req, res) {
    console.log('Exports onDateOndeDayDeleteDB');
    if(req.body.emptyKey == '') return;
    var startDateOne = req.body.startDateOne;
    var storeOne = req.body.storeOne;
    var query = 'DELETE FROM '+ DB_TB_DATAS +' WHERE userStore = "'+storeOne+'" AND  regDate = DATE_FORMAT("' + startDateOne + '", "%Y-%m-%d")';

    console.log('DB :'+DATABASE+' onDateOneDayDeleteDB: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onDateOndeDayDeleteDB');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onDateOneDayDeleteDB 1000');
        res.status(200).send({code:1000});
    });
}

/**
 * OneDay Delete
 * */
exports.onDateOneDaySelectDB = function (req, res) {
    console.log('Exports onDateOneDaySelectDB');
    var startDateOne = req.body.startDateOne;
    var storeOne = req.body.storeOne;
    var query = 'SELECT COUNT(*) as cnt FROM '+ DB_TB_DATAS +' WHERE userStore = "' +storeOne +'" AND regDate = DATE_FORMAT("' + startDateOne + '", "%Y-%m-%d")';

    console.log('DB :'+DATABASE+' onDateOneDaySelectDB: '+query);
    mysql.executeQuery(query, function(err, result) {
        if(err) {
            res.status(500).send('onDateOneDaySelectDB');
            return;
        }
        if(result.length == 0) {
            res.status(200).send({code:2000});
            return;
        }
        console.log('onDateOneDaySelectDB 1000');
        res.status(200).send({code:1000, data:result});
    });
}
