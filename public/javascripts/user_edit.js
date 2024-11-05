

$(document).ready(function() {
    console.log('document.ready');
    onUserFindinghAsync();

    // $("button[name*='btn_user_close_edit']").text(CLOSE_BTN);
    $("span[name*='btn_user_close_edit']").text(CLOSE_BTN);
    $("span[name*='btn_user_close_edit']").click(function () {
        console.log('close');
        onBackPress();;
    });

    $("span[name*='btn_user_update']").text(EDIT_BTN);
    $("span[name*='btn_user_update']").click(function(){
        onUserUpdate();
    });

    $("span[name*='btn_user_delete']").text(DELETE_BTN);
    $("span[name*='btn_user_delete']").click(function(){
        if(confirm(WANT_DELETE_USER_MSG)) {
            onUserDelete();
        }else{
            return;
        }
    });


    $("input[name='radiostatus']:radio").change(function () {
        //라디오 버튼 값을 가져온다.
        var status = this.value;
        if(status == 1){
            onTenpo();
        }else if(status == 2){
            onRyokou();
        }
    });

    $("label[name*='tenpo']").text(TEXT_TENPO_TITLE);
    $("label[name*='tenpo']").click(function () {
        onTenpo();
    });

    $("label[name*='ryokou']").text(TEXT_RYOKOU_TITLE);
    $("label[name*='ryokou']").click(function () {
        onRyokou();
    });

});

window.onload = function() {
    console.log('window.onload');




};

/**
 * Func
 * */

var viewParam = '';
function onUserFindinghAsync(){
    viewParam = document.getElementById("page_param").value;
    var userid = viewParam;
    // alert(userid)
    $.ajax({
        url:'/customer/user/edit/onUserFindAsync',
        dataType:'json',
        type:'POST',
        data:{userId:userid},
        success: function (result) {
            console.log('ajax success');
            if(result.data != null ){
                var data = result.data[0];
                document.getElementById("edit_email").value = data.uid;
                document.getElementById("edit_password").value = data.upwd;
                document.getElementById("edit_company").value = data.company;
                document.getElementById("edit_store").value = data.store;
                console.log(data.status);
                if(data.status == 1){
                    onTenpo();
                }else if(data.status == 2){
                    onRyokou();
                }
                return;
            }
        }
    });
}

function onUserDelete(){
    alert('delete');
    viewParam = document.getElementById("page_param").value;
    console.log('onUserUpdate');
    if(length0Check(viewParam)) {
        console.log(" Check");
        alert(NETWORK_FAIL_MSG);
        parent.location.reload();
        return;
    }

    var data = {previd:viewParam};
    console.log("data");

    deferred = $.post("/customer/user/edit/onUserDelete", data);
    deferred.success(function(result) {
        if(result.code == 1000) {
            console.log("S1000");
            parent.location.replace("/customer/user/list");
        } else {
            console.log(" E500");
            alert(NETWORK_FAIL_MSG);
            parent.location.replace("/customer/user/list");
        }
    });

    deferred.error(function(error) {
        console.log(" Error");
        console.log(error);
    });

}

function onUserUpdate(){
    console.log('onUserUpdate');
    var id = trim(document.getElementById("edit_email").value);
    var password = trim(document.getElementById("edit_password").value);
    var company = trim(document.getElementById("edit_company").value);
    var store = trim(document.getElementById("edit_store").value);
    var status = trim($("input:hidden[name*='radiohidden']").val());

    if(id == null || id == '' || id === undefined){
        alert(EMAIL_NULL_FAIL_MSG);
        return;
    }
    else{
        if(!emailCheck(id)){
            alert(EMAIL_FAILSE_FAIL_MSG);
            return;
        }
    }

    if(password == null || password == '' || password === undefined){
        alert(PASS_NULL_FAIL_MSG);
        return;
    }

    if(status==1){
        if(store == null || store == '' || store === undefined){
            alert(STORE_NULL_FAIL_MSG);
            return;
        }
    }else if(status == 2){
        if(company == null || company == '' || company === undefined){
            alert(COMPANY_NULL_FAIL_MSG);
            return;
        }
    }

    if(company === undefined) company ="";
    if(store === undefined) store = "";

    // if(length0Check(id) || length0Check(password) || length0Check(company) || length0Check(store) ) {
    //     console.log(" Check");
    //     alert(NETWORK_FAIL_MSG);
    //     parent.location.reload();
    //     return;
    // }

    var data = {previd:viewParam, id:id, password:password, company:company, store:store, status:status};
    console.log("data");
    deferred = $.post("/customer/user/edit/onUserUpdate", data);
    deferred.success(function(result) {
        if(result.code == 1000) {
            console.log("S1000");
            parent.location.replace("/customer/user/list");
        } else {
            console.log(" E500");
            alert(NETWORK_FAIL_MSG);
            parent.location.replace("/customer/user/list");
        }
    });
    deferred.error(function(error) {
        console.log(" Error");
        console.log(error);
    });

}

function onBackPress(){
    window.location.replace('/customer');
}

function onTenpo() {

    document.getElementById("tenpoId").checked = true;
    document.getElementById("ryokouId").checked = false;
    $("input:hidden[name*='radiohidden']").val(1);

    console.log('onTenpo');
    // alert($("input:hidden[name*='radiohidden']").val());
}

function onRyokou() {
    console.log('onRyokou');
    document.getElementById("ryokouId").checked = true;
    document.getElementById("tenpoId").checked = false;
    $("input:hidden[name*='radiohidden']").val(2);

    // alert($("input:hidden[name*='radiohidden']").val());
}