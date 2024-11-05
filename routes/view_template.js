USER_REGISTER ='<div class="register-box-body">\n' +
    '            <form id="onUserRegister" method="post">\n' +
    '               <div class="form-group has-feedback">\n' +
    '                     <input type="text" class="form-control" placeholder="User Email" id="email" name="input_email" value="">\n' +
    '                     <span class="glyphicon glyphicon-envelope form-control-feedback"></span>\n' +
    '               </div>\n' +
    '           <div class="form-group has-feedback">\n' +
    '                     <input type="password" class="form-control" placeholder="Password" id="password" name="input_password" value="">\n' +
    '                     <span class="glyphicon glyphicon-lock form-control-feedback"></span>\n' +
    '               </div>\n' +
    '               <div class="form-group has-feedback">\n' +
    '                    <input type="text" class="form-control" placeholder="Company" id="company">\n' +
    '                    <span class="glyphicon glyphicon-user form-control-feedback"></span>\n' +
    '               </div>\n' +
    '               <div class="form-group has-feedback">\n' +
    '                    <input type="text" class="form-control" placeholder="Store" id="store" onKeyPress="if(event.keyCode==13){onUserRegister();event.returnValue=false}">\n' +
    '                    <span class="glyphicon glyphicon-folder-close form-control-feedback"></span>\n' +
    '        </div>\n' +
    '        <div class="row" style="padding-left: 20px;padding-right: 20px;">\n' +
    '            <div class="radio col-xs-3">\n' +
    '                      <input type="radio" id="tenpoId" name="radiostatus" value="1"  checked="checked"><label name="tenpo" style="color:000000; padding-left: 0px;"></label>\n' +
    '            </div>\n' +
    '            <div class="radio col-xs-3" style="margin-top:10px;">\n' +
    '                      <input type="radio" id="ryokouId" name="radiostatus" value="2" ><label name="ryokou" style="color:000000; padding-left: 0px;"></label>\n' +
    '            </div>\n' +
    '            <input type="hidden" name="radiohidden" id="radiohidden" value="1">\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-xs-4"></div>\n' +
    '            <div class="col-xs-4">\n' +
    '                <span type="submit" class="btn btn-primary btn-block btn-lg" name="btn_user_register" ></span>\n' +
    '            </div>\n' +

    '            <div class="col-xs-4">\n' +
    '                <span class="btn btn-primary btn-block btn-lg" name="btn_user_close" ></span>\n' +
    '            </div>\n' +

    '        </div>\n' +
    '    </form>\n' +
    '</div>\n';


//--------------------------------------------------------------------------------------------------



USER_EDIT ='<div class="register-box-body" >\n' +
    '            <form id="onUserRegister" method="post">\n' +
    '               <div class="form-group has-feedback">\n' +
    '                     <input type="email" class="form-control" placeholder="Email" id="edit_email" name="input_email" value="">\n' +
    '                     <span class="glyphicon glyphicon-envelope form-control-feedback"></span>\n' +
    '               </div>\n' +
    '           <div class="form-group has-feedback">\n' +
    '                     <input type="password" class="form-control" placeholder="Password" id="edit_password" name="input_password" value="">\n' +
    '                     <span class="glyphicon glyphicon-lock form-control-feedback"></span>\n' +
    '               </div>\n' +
    '               <div class="form-group has-feedback">\n' +
    '                    <input type="text" class="form-control" placeholder="Company" id="edit_company">\n' +
    '                    <span class="glyphicon glyphicon-user form-control-feedback"></span>\n' +
    '               </div>\n' +
    '               <div class="form-group has-feedback">\n' +
    '                    <input type="text" class="form-control" placeholder="Store" id="edit_store" onKeyPress="if(event.keyCode==13){onUserUpdate();event.returnValue=false}">\n' +
    '                    <span class="glyphicon glyphicon-folder-close form-control-feedback"></span>\n' +
    '        </div>\n' +
    '        <div class="row" style="padding-left: 20px;padding-right: 20px;">\n' +
    '            <div class="radio col-xs-3">\n' +
    '                      <input type="radio" id="tenpoId" name="radiostatus" value="1"  checked="checked"><label name="tenpo" style="color:000000; padding-left: 0px;"></label>\n' +
    '            </div>\n' +
    '            <div class="radio col-xs-3" style="margin-top:10px;">\n' +
    '                      <input type="radio" id="ryokouId" name="radiostatus" value="2" ><label name="ryokou" style="color:000000; padding-left: 0px;"></label>\n' +
    '            </div>\n' +
    '            <input type="hidden" name="radiohidden" id="radiohidden" value="1">\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '            <div class="col-xs-3">' +
    '                <span type="submit" class="btn btn-danger btn-block btn-lg" name="btn_user_delete" ></span>\n' +
    '            </div>\n' +
    '            <div class="col-xs-1"></div>' +
    '            <div class="col-xs-4">\n' +
    '                <span type="submit" class="btn btn-primary btn-block btn-lg" name="btn_user_update" ></span>\n' +
    '            </div>\n' +

    '            <div class="col-xs-4" name="div_btn_user_close_edit">\n' +
    '                <span class="btn btn-primary btn-block btn-lg" name="btn_user_close_edit" ></span>\n' +
    '            </div>\n' +

    '        </div>\n' +
    '    </form>\n' +
    '</div>\n';




//--------------------------------------------------------------------------------------------------




USER_LIST = '<div class="box">\n' +
    '            <div class="box-header" style="height: 30px;">\n' +
    '              <div class="input-group input-group-sm">\n' +
    '                <input type="text" class="form-control" id="searchkey" name="searchkey">\n' +
    '                    <span class="input-group-btn">\n' +
    '                      <button type="button" class="btn btn-info btn-flat" name="btn_search">Search</button>\n' +
    '                    </span>\n' +
    '              </div>\n' +

    '            </div>\n' +
    '            <div class="box-body no-padding">\n' +
    '              <table class="table" name="user_table">\n' +
    '                <tbody>\n' +
    '               </tbody>\n' +
    '              </table>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>';






//--------------------------------------------------------------------------------------------------




DATA_REGISTER ='<div id="drop_data_xlsx">Drop a spreadsheet file here to see sheet data</div>\n' +
    '<input type="file" name="xlfile" id="xlf_data_xlsx" />\n '+
    '<pre id="out_data_xlsx"></pre>\n' +
    '<span description ="https://github.com/SheetJS/js-xlsx">license : SheetJS</span>\n';




//--------------------------------------------------------------------------------------------------





DATA_LIST = '<section class="info-box display-none"  >\n' +
    '              <div class="info-box-content div-right">\n' +
    '               <span class="btn btn-danger no-margin" data-toggle="modal" data-target="#modal-danger-all" name="all_delete_btn"></span>\n' +
    '               <span class="btn btn-danger no-margin" data-toggle="modal" data-target="#modal-danger" name="one_day_delete_btn"></span>\n' +
    '              </div>\n' +
    '           </section>\n'+
    '           <div class="box">\n' +
    '            <div class="box-header" style="height: 100px; background-color:#FFFFFF;">\n' +

    '            <form id="onDataListSearch" method="post">\n' +
    '              <div class="input-group input-group-sm">\n' +
        '              <div class="form-group input-group-sm" style="padding:5px;">\n' +
        '                <span style="margin-left: 10px;">Agency Name: <label name="agencyname"></label></span><br/>\n' +

        '                <ul name="data_list_ul">\n' +
        '                <li name="data_list_li">Date range: </li>\n' +
        '                <li name="data_list_li"><input type="text" id="regDataRange" name="daterange" value="01/01/2018 ~ 01/15/2018" /></li>\n' +

        '                <li name="data_list_li">Store: <input type="text" name="datastoresearch" id="datastorekey"/></li>\n' +

        // '                <li class="dropdown" name="data_list_li" style="display:none;">\n'+
        // '                            Status\n' +
        // '                        <select  id="paiddrop" value="">\n' +
        // '                            <option class="li_paiddrop" value="P"><span>`P`aid</span></option>\n' +
        // '                            <option class="li_paiddrop" value="U"><span>`U`npaid</span></option>\n' +
        // '                        </select>\n'+
        // '                </li>\n' +

        '                <li name="data_list_li">\n' +
        '                        <span class="btn btn-info btn-flat" name="btn_search">Search</span>\n' +
        '               </li>\n' +
        '                </ul>\n' +
        '              </div>\n' +
    '              </div>\n' +
    '            </form>\n'+

    '            </div>\n' +
    '            <div class="box-body no-padding">\n' +
    '              <table class="table tb_data_list" name="data_table">\n' +
    '                <tbody>\n' +
    '                </tbody>\n' +
    '              </table>\n' +
    '            </div>\n' +

    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n';




//--------------------------------------------------------------------------------------------------

DATA_EDIT = '';