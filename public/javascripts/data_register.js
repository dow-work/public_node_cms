var X = XLSX;
var XW = {
    /* worker message */
    msg: 'xlsx',
    /* worker scripts */
    worker: './libraries/js-xlsx/xlsxworker.js'
};
var SheetNum = 0;
var sheetArray = new Array();

/*엑셀(실데이터)에서 필수 값들의 위치값 23,24는 TOUR NUMBER로 웹서비스에서만 존재*/
var nLocate = [1,2,3,4,5,19,23,24];//01234____5[19=spCost],6[20=total],7[23=itcno],8[24=code]
var TG_ARRAY = [14,16];
var TA_ARRAY = [13,17];
var TC_ARRAY = [15,18];
var VALUE_START_NUM = 5;
var global_wb;

var keyDate = '';

var EventCallBack = function(){

    this.onNextSelect =  function onNextSelect(keyObj, regDate, result){
        console.log("onNextSelect");
    };

    this.onNextDelete =  function onNextDelete(keyObj, regDate, result){
        console.log("onNextDelete");
        aysncDataFound(keyObj, regDate, new EventCallBack());
    };

    this.onNextInsert = function onNextInsert(keyObj, regDate, result){
        console.log("onNextInster");
        jsonParserValue(keyObj, regDate);
    };

}

function jsonParserKey(jsonData) {
    console.log("array Size["+sheetArray.length);

    for(var i=0; i<sheetArray.length; i++) {
        var nameKeyObj = JSON.parse(jsonData);
        if (nameKeyObj[sheetArray[i]] !== 'undefined') {
            console.log("Name :["+sheetArray[i]+"]");

            var keyObj = nameKeyObj[sheetArray[i]];
            keyDate = 'undefined';
            if(keyObj != null && keyObj.length > 0) {

                /**
                 * Sheet 단위 loading...
                 * Sheet 1: 1일치 쓸때만 사용 우선  주석처리
                 * */
                if (keyDate == 'undefined') {
                    /*Date Succ*/
                    var objDate = keyObj[1];
                    keyDate = objDate[objDate.length - 1]
                    console.log(":::::::  DATE  ::::::: [" + keyDate + "]");
                    /*Date Succ*/

                    /**
                     * 2
                    * */
                    aysncDataFinding(keyObj, parserDate(keyDate), new EventCallBack());
                }
            }
        }
    }
    finish();
}

function finish(){
    setTimeout(function(){
        $('.wrap-loading').addClass('display-none');
        alert(UPLOAD_COMPLATE_MSG);
        setTimeout(function(){
            parent.location.replace("/customer/data/register");
        }, 500);
    }, 2000);
}

function jsonParserValue(keyObj, parentDate){
    for (var j = VALUE_START_NUM; j < keyObj.length; j++) {
        if (keyObj[j] != null && keyObj[j].length > 0) {
            if (checkRegx('', keyObj[j][0])) {
                /*TODO Query Location*/

                // console.log("DATA::::::: regDate ::::::: [" + keyObj[j][nLocate[0]] + "]");
                // console.log("DATA:::: regCompany ::::::: [" + keyObj[j][nLocate[1]] + "]");
                // console.log("DATA:::::regPeople  ::::::: [" + keyObj[j][nLocate[2]] + "]");
                // console.log("DATA:::::regITCName ::::::: [" + keyObj[j][nLocate[3]] + "]");
                // console.log("DATA:::::::regSales ::::::: [" + parserStrToInt(keyObj[j][nLocate[4]]) + "]");
                // var taCom = (parserStrToInt(keyObj[j][TA_ARRAY[0]]) + parserStrToInt(keyObj[j][TA_ARRAY[1]]));
                // var tgCom = (parserStrToInt(keyObj[j][TG_ARRAY[0]]) + parserStrToInt(keyObj[j][TG_ARRAY[1]]));
                // var tcCom = (parserStrToInt(keyObj[j][TC_ARRAY[0]]) + parserStrToInt(keyObj[j][TC_ARRAY[1]]));
                //
                // console.log("DATA::::::: taCom   ::::::: [" + taCom + "]");
                // console.log("DATA::::::: tgCom   ::::::: [" + tgCom + "]");
                // console.log("DATA::::::: tcCom   ::::::: [" + tcCom + "]");
                // console.log("DATA:::: regSPCost  ::::::: [" + parserStrToInt(keyObj[j][nLocate[5]]) + "]");
                //
                // var totalCom = taCom + tgCom + tcCom;
                // console.log("DATA::::::: Total ::::::: [" + totalCom + "]");
                // console.log("DATA:::etc_bus==itcNo ::::: [실데이터 정보없음]");
                //
                // console.log("========================user.id");
                // console.log("========================user.store");
                aysncDataRegister(keyObj, j, parentDate);
                // console.log("========================");
                // console.log("========================");
                //add
                //user.id
                //user.store
                //code == tourNum  :: 실데이터는 없다.
                //etc_bus==itcNo :: 실데이터는 없다.

                /*TODO Query Location*/
            }
        }else{
            continue;
        }
    }
}


$(document).ready(function() {
    console.log('document.ready');
});

window.onload = function() {
    console.log('window.onload');
    var process_wb = (function() {
        var OUT = document.getElementById('out_data_xlsx');

        var to_json = function to_json(workbook) {
            var result = {};
            sheetArray = new Array();
            workbook.SheetNames.forEach(function(sheetName) {
                // var sheetNameTmp = trim(sheetName);
                var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
                sheetArray.push(sheetName);
                if(roa.length) {
                    result[sheetName] = roa;
                }
            });
            return JSON.stringify(result, 2, 2);
        };

        return function process_wb(wb) {
            global_wb = wb;
            var output = "";
            console.log("wb::"+wb);

            /*TODO-필수 code*/
            output = to_json(wb);
            // if(OUT.innerText === undefined) OUT.textContent = output;
            // else OUT.innerText = output;
            /*TODO-필수 code*/

            console.log("Count :"+SheetNum);
            if(sheetArray != null && sheetArray.length > 0){
                $('.wrap-loading').removeClass('display-none');
                setTimeout(function () {
                    jsonParserKey(output);
                }, 1500);

            }
            if(typeof console !== 'undefined') console.log("output", new Date());
        };
    })();

    var do_file = (function() {
        var rABS = typeof FileReader !== "undefined" && (FileReader.prototype||{}).readAsBinaryString;
        var domrabs = document.getElementsByName("userabs")[0];
        if(!rABS) domrabs.disabled = !(domrabs.checked = false);

        var use_worker = typeof Worker !== 'undefined';
        var domwork = document.getElementsByName("useworker")[0];
        if(!use_worker) domwork.disabled = !(domwork.checked = false);

        var xw = function xw(data, cb) {
            var worker = new Worker(XW.worker);
            worker.onmessage = function(e) {
                switch(e.data.t) {
                    case 'ready': break;
                    case 'e': console.error(e.data.d); break;
                    case XW.msg: cb(JSON.parse(e.data.d)); break;
                }
            };
            worker.postMessage({d:data,b:rABS?'binary':'array'});
        };

        return function do_file(files) {
            rABS = false;
            use_worker = false;
            var f = files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
                var data = e.target.result;
                if(!rABS) data = new Uint8Array(data);
                process_wb(X.read(data, {type: 'array'}));
            };
            if(rABS) reader.readAsBinaryString(f);
            else reader.readAsArrayBuffer(f);
        };
    })();

    (function() {
        console.log('drop');
        var drop = document.getElementById('drop_data_xlsx');
        if(!drop.addEventListener) return;

        function handleDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            do_file(e.dataTransfer.files);
        }

        function handleDragover(e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        }

        console.log('drop addEvent');
        drop.addEventListener('dragenter', handleDragover, false);
        drop.addEventListener('dragover', handleDragover, false);
        drop.addEventListener('drop', handleDrop, false);
    })();

    (function() {
        console.log('xlf');
        var xlf = document.getElementById('xlf_data_xlsx');
        if(!xlf.addEventListener) return;

        function handleFile(e) { do_file(e.target.files); }
        xlf.addEventListener('change', handleFile, false);
    })();

};

/**
 * Func
 * */
var updateDateCnt = 0;
function aysncDataRegister(keyObj,j, parentDate){
    updateDateCnt++;

    var rtaCom = (parserStrToInt(keyObj[j][TA_ARRAY[0]])) + (parserStrToInt(keyObj[j][TA_ARRAY[1]]));
    var rtgCom = (parserStrToInt(keyObj[j][TG_ARRAY[0]])) + (parserStrToInt(keyObj[j][TG_ARRAY[1]]));
    var rtcCom = (parserStrToInt(keyObj[j][TC_ARRAY[0]])) + (parserStrToInt(keyObj[j][TC_ARRAY[1]]));
    var totalCom = (rtaCom) + (rtgCom) + (rtcCom);

    // if(updateDateCnt == 105){
    //     console.log("DATA:::: CNT ::::::: ["+updateDateCnt+"]");
    //     console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //     console.log("DATA:::: regDate ::::::: [" + parserDate(keyObj[j][nLocate[0]]) + "]");
    //     console.log("DATA:::: parentDate ::::::: [" +parentDate + "]");
    //     console.log("DATA:::: regCompany ::::::: [" + keyObj[j][nLocate[1]] + "]");
    //     console.log("DATA:::::regPeople  ::::::: [" + keyObj[j][nLocate[2]] + "]");
    //     console.log("DATA:::::regITCName ::::::: [" + keyObj[j][nLocate[3]] + "]");
    //     console.log("DATA:::::::regSales ::::::: [" + parserStrToInt(keyObj[j][nLocate[4]]) + "]");
    //     console.log("=====================================================");
    //     console.log("DATA::::::: taCom   ::::::: [" + (parserStrToInt(keyObj[j][TA_ARRAY[0]])) + "]");
    //     console.log("DATA::::::: tgCom   ::::::: [" + (parserStrToInt(keyObj[j][TG_ARRAY[0]])) + "]");
    //     console.log("DATA::::::: tcCom   ::::::: [" + (parserStrToInt(keyObj[j][TC_ARRAY[0]])) + "]");
    //     console.log("=====================================================");
    //     console.log("DATA::::::: taCom   ::::::: [" + (parserStrToInt(keyObj[j][TA_ARRAY[1]])) + "]");
    //     console.log("DATA::::::: tgCom   ::::::: [" + (parserStrToInt(keyObj[j][TG_ARRAY[1]])) + "]");
    //     console.log("DATA::::::: tcCom   ::::::: [" + (parserStrToInt(keyObj[j][TC_ARRAY[1]])) + "]");
    //     console.log("=====================================================");
    //     console.log("DATA::::::: taCom   ::::::: [" + rtaCom + "]");
    //     console.log("DATA::::::: tgCom   ::::::: [" + rtgCom + "]");
    //     console.log("DATA::::::: tcCom   ::::::: [" + rtcCom + "]");
    //     console.log("DATA:::: regSPCost  ::::::: [" + parserStrToInt(keyObj[j][nLocate[5]]) + "]");
    //     console.log("#########################################################");
    //     console.log("DATA::::::: Total ::::::: [" + totalCom + "]");
    //     console.log("#########################################################");
    //     // console.log("DATA:::etc_bus==itcNo ::::: [실데이터 정보없음]");
    //     // console.log("========================user.id");
    //     // console.log("========================user.store");
    // }
    console.log('aysncDataRegister');

    /*
        parserDate(keyObj[j][nLocate[0]]),
        trim(keyObj[j][nLocate[1]]),            //company
        trim(keyObj[j][nLocate[2]]),            //people
        trim(keyObj[j][nLocate[3]]),            //itcName
        parserStrToInt(keyObj[j][nLocate[4]]),  //sales
        taCom, tgCom, tcCom,                    //ta,tg,tc
        parserStrToInt(keyObj[j][nLocate[5]]),  //spCost
        totalCom,
        trim(keyObj[j][nLocate[6]]),
        trim(keyObj[j][nLocate[7]])
    */

    var update = parentDate;
    var company = trim(keyObj[j][nLocate[1]]);
    var people = trim(keyObj[j][nLocate[2]]);
    var itcName = trim(keyObj[j][nLocate[3]]);
    var salse = parserStrToInt(keyObj[j][nLocate[4]]);

    var taCom = rtaCom;
    var tgCom = rtgCom;
    var tcCom = rtcCom;

    var total = totalCom;
    var spCost = parserStrToInt(keyObj[j][nLocate[5]]);

    var code = trim(keyObj[j][nLocate[6]]);
    var itcNo = trim(keyObj[j][nLocate[7]]);

    $.ajax({
        url:'/customer/data/register/upload',
        dataType:'json',
        type:'POST',
        data:{regDate:update,regCompany:company,regPeople:people, regItcName:itcName, regSales:salse,
              regTaCom:taCom,regTgCom:tgCom,regTcCom:tcCom,
              regSpCost:spCost,regTotal:total, regItcNo:itcNo, regCode:code},
        success: function (result) {
            console.log('U ajax success');
            if(result.data != null){
                console.log('data success');
            }
        },error:function(e){
            console.log(e.message);
        }
    });
}

function aysncDataFinding(keyObj, regDate, callback){
    console.log('aysncDataFinding');
    var update = regDate;
    $.ajax({
        url:'/customer/data/register/finding',
        dataType:'json',
        type:'POST',
        data:{regDate:update},
        success: function (result) {
            console.log('S ajax success');
            if(result.data != null ){
                var res;
                if(result.code == 2000){ // length == 0
                    console.log('data NotFound! S succ');
                    res = {flag:true};
                    callback.onNextInsert(keyObj, regDate, res);
                }else{ // length > 0
                    console.log('data Found!! S succ');
                    res = {flag:true};
                    callback.onNextDelete(keyObj, regDate, res);

                }
            }
        }
        ,error:function(e){
        }
    });
}

function aysncDataFound(keyObj, regDate, callback){
    console.log('aysncDataFound');
    var update = regDate;
    $.ajax({
        url:'/customer/data/register/found',
        dataType:'json',
        type:'POST',
        data:{regDate:update},
        success: function (result) {
            console.log('D ajax success');
            var res;
            if(result.code == 2000){ // length == 0
                console.log('data NotFound! D succ');
                res = {flag:true};
                callback.onNextInsert(keyObj, regDate, res);
            }else{ // length > 0
                console.log('data Found!! D succ');
                res = {flag:true};
                callback.onNextInsert(keyObj, regDate, res);
            }
        }
        ,error:function(e){
        }
    });
}
