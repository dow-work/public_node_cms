$(document).ready(function() {
    console.log('document.ready');
    onSearchAsync();

    $("input[name*='searchkey']").keypress(
        function(event) {
            if(event.keyCode==13){
                onSearchAsync();
                event.returnValue=false
            }
        });
    $("button[name*='btn_search']").click(function () {
        onSearchAsync();
    });

    $('table[name*=user_table]').on("click", "td", function(){
        var uid = $(this).parent('tr').attr("value");
        window.location.href = '/customer/user/edit/'+uid;
    });

});

window.onload = function() {
    console.log('window.onload');
};

/**
 * Func
 * */
function onSearchAsync(){
    var searchKey = trim(document.getElementById("searchkey").value);
    if(searchKey == null) searchKey = '';
    console.log(searchKey);
    // var data = {};
    $.ajax({
       url:'/customer/user/list/search',
       dataType:'json',
       type:'POST',
       data:{searchKey:searchKey},
        success: function (result) {
           console.log('ajax success');
            $('table[name*=user_table]').find('tbody').html('');
            $('table[name*=user_table]').find('tbody').append(
                '                <tr>\n' +
                '                  <th >Name</th>\n' +
                '                  <th >Company</th>\n' +
                '                  <th >Store</th>\n' +
                '                  <th >Level</th>\n' +
                '                  <th >Date</th>\n' +
                '                </tr>\n'
            )
            if(result.data != null || result.data.length > 0){
                var data = result.data;
                for (var i = 0; i<=data.length; i++){
                    // if(data[i] == 'undefined') continue;
                    if(data[i].ustatus == 0 || data[i].ustatus == null || data[i].ustatus == 'undefined') continue;
                    var level = '';
                    if(data[i].ustatus == 1) {
                        level = TEXT_TENPO_TITLE;
                    } else if(data[i].ustatus == 2) {
                        level = TEXT_RYOKOU_TITLE;
                    }else{
                        level = 'ADMIN';

                    }


                    $('table[name*=user_table]').find('tbody').append(
                        '                <tr style="backgroud-color:#FFFFFF;" value="'+data[i].uid+'">\n' +
                        '                  <td style="text-align: center; backgroud-color:#FFFFFF;">'+data[i].uid+'</td>\n' +
                        '                  <td style="text-align: center; backgroud-color:#FFFFFF;">'+data[i].company+'</td>\n' +
                        '                  <td style="text-align: center; backgroud-color:#FFFFFF;">'+data[i].store+'</td>\n' +
                        '                  <td style="text-align: center; backgroud-color:#FFFFFF;">'+level+'</td>\n' +
                        '                  <td style="text-align: center; backgroud-color:#FFFFFF;">'+covertFormatDate(data[i].regtime)+'</td>\n' +
                        '                </tr>\n'
                    )
                }
            }
        }
    });
}