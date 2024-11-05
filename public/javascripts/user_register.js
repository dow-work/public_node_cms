$(document).ready(function() {
    console.log('document.ready');
    $("span[name*='btn_user_close']").text(CLOSE_BTN);
    $("span[name*='btn_user_close']").click(function () {
        window.location.href = "/customer";
    });

    $("span[name*='btn_user_register']").text(REGISTER_BTN);
    $("span[name*='btn_user_register']").click(function(){
        onUserRegister();
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
function onUserRegister(){
    console.log('onUserRegister');
    var id = trim(document.getElementById("email").value);
    var password = trim(document.getElementById("password").value);
    var company = trim(document.getElementById("company").value);
    var store = trim(document.getElementById("store").value);
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
    //     window.location.replace("/customer/user/register");
    //     return;
    // }

        var data = {id:id, password:password, company:company, store:store, status:status};
        console.log("data");
        deferred = $.post("/customer/user/onUserRegister", data);
        deferred.success(function(result) {
            if(result.code == 1000) {
                console.log("S1000");
                window.location.href = "/customer";
            } else {
                console.log(" E500");
                alert(NETWORK_FAIL_MSG);
                window.location.replace("/customer/user/register");
            }
        });
        deferred.error(function(error) {
            console.log(" Error");
            console.log(error);
        });
}

function onTenpo() {
    document.getElementById("tenpoId").checked = true;
    document.getElementById("ryokouId").checked = false;
    $("input:hidden[name*='radiohidden']").val(1);
    // alert($("input:hidden[name*='radiohidden']").val());
}

function onRyokou() {
    document.getElementById("ryokouId").checked = true;
    document.getElementById("tenpoId").checked = false;
    $("input:hidden[name*='radiohidden']").val(2);
    // alert($("input:hidden[name*='radiohidden']").val());
}