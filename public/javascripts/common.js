/**
 * Func List
 * Kang Sung JIn
 * */

// Number
var regexNum = /[^0-9]+$/;

//2. 한글만
var regexHan = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;

//3. 이메일
var regexEmail = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;

//4. 전화번호
var regexPhone = /^\d{2,3}-\d{3,4}-\d{4}$/;

/**
 * 특정 정규직.
 * */
function checkRegx(type, value) {
    var regex = '';
    switch (type) {
        case 'phone':
            regex = regexPhone;
            break;
        case 'hangle':
            regex = regexHan;
            break;
        case 'email' :
            regex = regexEmail;
            break;
        default:
            regex = regexNum;
            break;
    }

    //test()에서 false는 성공, true면 "다시입력해주세요~!"라는 문구로 대응할수 있다.
    if (!regex.test(value)) {
        return true;
    } else {
        return false;
    }
    return false;
}

/**
 * string to integer And (,) remove
 * indexOf -1(음수:같지않다) 0,1,2,3,4,5 (양수:같다)
 * */
function parserStrToInt(value) {
    // console.log("parserStrToInt : [" + value+"]");
    var ngStr = ["(", ")"];

    if (value == null) return 0;
    if (value !== 'undefined') {
        // console.log("(-1,0,1) = ["+value.indexOf(ngStr[0])+"]   ["+value.indexOf(ngStr[1])+"]");
        if (value.indexOf(ngStr[0]) >= 0 && value.indexOf(ngStr[1]) >= 0) {
            // console.log("(N:::::::::::::::::::) = ["+value+"]");
            var temp = value.replace("(", "");
            temp = temp.replace(")", "");
            temp = temp.replace(",", "");
            temp = parseInt(-temp);
            // console.log("(temp:::::::::::::::::::) = ["+temp+"]");
            return temp;
        } else {
            // console.log("replace( : [" + value.replace(",", "")+"]");
            return parseInt(value.replace(/,/g, ""));
        }

    } else {
        return 0;
    }
}

/**
 * string to integer.
 * */
function parserDate(value) {
    if (value !== 'undefined') {
        var p = value.split("/");
        return p[2] + "-" + p[0] + "-" + p[1];
    }
}

function emptyChangeValue(value) {
    if (value === 'undefined') {
        return '';
    } else {
        if (value == null || value.length == 0) return '';
        else return value;
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function trim(x) {
    if (x == null || x.length == 0) return;
    return x.replace(/^\s+|\s+$/gm, "");
}

function length0Check(text) {
    if(text == undefined) return true;

    if (text.length == 0) {
        return true;
    } else {
        return false;
    }
}

function emailCheck(text) {
    var reg_special = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg_special.test(text)) {
        return true;
    } else {
        return false;
    }
    return false;
}

//숫자에 콤마(,)삽입
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sideMenuCheck(tree, menu) {
    $("#tree1").removeClass("active");
    $("#" + tree).addClass("active");

    $("#customer_menu").removeClass("active");
    $("#" + menu).addClass("active");
}

/**
 * string >> Date('YYYY-mm-dd').toString Change
 * */
function covertFormatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function onBackPress(herf) {
    window.location.herf = herf;
}


function mysql_Query(_type, _table, _where, _option) {
    var result = '';
    var strTypeArray = ['select', 'insert', 'update', 'delete'];

    if (strTypeArray[0] == _type.toLowerCase()) {
        result = strTypeArray[0].toUpperCase() + ' ' + _table + ' ';
    } else if (strTypeArray[1] == _type.toLowerCase()) {
        result = strTypeArray[0].toUpperCase() + ' INTO ' + _table + ' ';
    } else if (strTypeArray[2] == _type.toLowerCase()) {
        result = strTypeArray[0].toUpperCase() + ' ' + _table + ' ';
    } else if (strTypeArray[3] == _type.toLowerCase()) {
        result = strTypeArray[0].toUpperCase() + ' ' + _table + ' ';
    }
}








