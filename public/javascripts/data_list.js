var dataCompany = '';
var dataStorekey ='';
var dataPaid = '';
var dataDateStart = '';
var dataDateEnd = '';

$(document).ready(function() {
    // if(document.getElementById("store_param").value == 2)  onSearchAsync("");
    onSearchAsync("");

    /*
    * Delete Btns
    * */
    if ($("#status_param").val() == 0) {
        $(".info-box").removeClass('display-none');
    } else {
        $(".info-box").addClass('display-none');
    }

    /*
    * Delete Btns Names
    * */
    $("span[name*=all_delete_btn]").text(DB_TRUNCATE_BTN);
    $("span[name*=one_day_delete_btn]").text(ONE_DATE_DB_DELETE_BTN);

    /*
    * ONE DAY DELETE
    * */
    $("#modal_action_btn").on('click', function () {
        var modalDateOne = $("#modalDateId").val();
        var modalStore = $("#modalStoreId").val();

        // alert(modalDateOne+"______"+modalStore.length);
        // alert(document.getElementById("modalDateId").value+"_____x_____"+document.getElementById("modalStoreId").value.length);
        if (length0Check(modalDateOne) || length0Check(modalStore)) {
            alert(ONE_DAY_DELETE_VALUE_KEY_NULL);
            return;
        }

        var sendData = {startDateOne: modalDateOne, storeOne: modalStore};
        //ajax query
        $.ajax({
            url: '/customer/data/list/onOneDayFinding',
            dataType: 'json',
            type: 'POST',
            data: sendData != "" ? sendData : {emptyKey: ''},

            success: function (result) {
                if (result.data != null) {
                    var data = result.data;
                    if (data.length == 0) return;
                    console.log("cnt"+data.cnt);
                    if (data[0].cnt > 0) {
                        $.ajax({
                            url: '/customer/data/list/onOneDayDelete',
                            dataType: 'json',
                            type: 'POST',
                            data: sendData != "" ? sendData : {emptyKey: ''},
                            success: function (result) {
                                if (result.code == 1000) {
                                    alert(DELETE_UNIT_MSG_SUCC);
                                    parent.location.replace('/customer/data/list');
                                } else {
                                    notRows();;
                                }
                            },
                            error: function (error) {
                                console.log(error.message);
                            }
                        });
                    } else {
                        notRows();;
                    }
                }else{
                    notRows();;
                }
            },
            error: function (error) {
                console.log(error.message);
            }
        });
    });

    /*
    * ALL DELETE
    * */
    $("#all_modal_action_btn").on('click', function () {
        //ajax query
        $.ajax({
            url: '/customer/data/list/onAllFinding',
            dataType: 'json',
            type: 'POST',
            success: function (result) {
                if (result.data != null) {
                    var data = result.data;
                    if (data.length == 0) return;
                    if (data[0].cnt > 0) {
                        $.ajax({
                            url: '/customer/data/list/onAllDelete',
                            dataType: 'json',
                            type: 'POST',
                            success: function (result) {
                                if (result.code == 1000) {
                                    alert(DELETE_UNIT_MSG_SUCC);
                                    parent.location.replace('/customer/data/list');
                                } else {
                                    notRows();
                                }
                            },
                            error: function (error) {
                                console.log(error.message);
                            }

                        });
                    } else {
                        notRows();
                    }
                }
            }
        });
    });

    $('label[name*="agencyname"]').text(document.getElementById("paid_param").value);

    $('#paiddrop').click(function () {
        this.value = this.options[this.selectedIndex.value];
    });

    $('span[name*="btn_search"]').click(function () {

            dataStorekey = document.getElementById("datastorekey").value;
            // dataPaid 기능부족.
            // dataPaid =          document.getElementById("paiddrop").value;
            dataDateStart = document.getElementById("regDataRange").value.split(" - ")[0];
            dataDateEnd = document.getElementById("regDataRange").value.split(" - ")[1];

            // alert(dataCompany +"|"+dataStorekey +"|"+dataPaid +"|"+dataDateStart +"|"+dataDateEnd);
            if (dataDateStart != null && dataDateEnd != null) { //, dataPaid:dataPaid
                var data = {
                    dataStorekey: dataStorekey
                    , dataDateStart: dataDateStart, dataDateEnd: dataDateEnd
                };
                onSearchAsync(data);
            }
        });

    });

    window.onload = function () {
        console.log('window.onload');
        $('input[name="daterange"]').daterangepicker({
            autoApply: true,
            locale: {
                format: 'YYYY-MM-DD'
            },
            minYear: 2000,
            autoUpdateInput: true,
            showDropdowns: true,
            startDate: moment().subtract(1, 'months'),
            endDate: moment()
        });

        $('#modalDateId').daterangepicker({
            autoApply: true,
            locale: {
                format: 'YYYY-MM-DD'
            },
            singleDatePicker: true,
            showDropdowns: true,
            minYear: 2000,
            startDate: moment()
        });
    };

    /**
     * Func
     * */

    /**
     * 필]] 최신순
     * user.store == 1(점포)면 필]] 검색어 DateRange 정보가 있어야만 보여준다.
     * user.store == 2(회사)면 필]] 검생어 없어도 보여준다.
     * */
    var ttSales = 0, ttTa = 0, ttTg = 0, ttTc = 0, ttTotal = 0, ttSPCost = 0, ttPeople = 0;
    var sumSales = 0, sumTa = 0, sumTg = 0, sumTc = 0, sumTotal = 0, sumSPCost = 0, sumPeople = 0;
    var prevDate = 0;
    var prevStore = '';

    function onSearchAsync(data) {
        console.log(data);
        sumSales = 0, sumTa = 0, sumTg = 0, sumTc = 0, sumTotal = 0, sumSPCost = 0, sumPeople = 0;
        ttSales = 0, ttTa = 0, ttTg = 0, ttTc = 0, ttTotal = 0, ttSPCost = 0, ttPeople = 0;
        $.ajax({
            url: '/customer/data/list/search',
            dataType: 'json',
            type: 'POST',
            data: data != "" ? data : {searchKey: ''},
            success: function (result) {
                console.log('ajax success');
                $('table[name*=data_table]').find('tbody').html('');
                $('table[name*=data_table]').find('tbody').append(
                    '                <tr>\n' +
                    '                  <th >Store</th>\n' +
                    '                  <th >Date</th>\n' +
                    '                  <th >Company</th>\n' +
                    '                  <th >ITC No</th>\n' +
                    '                  <th >ITC Name</th>\n' +
                    '                  <th >Sales</th>\n' +
                    '                  <th >TACom</th>\n' +
                    '                  <th >ST</th>\n' +
                    '                  <th >TGCom</th>\n' +
                    '                  <th >ST</th>\n' +
                    '                  <th >TCCom</th>\n' +
                    '                  <th >ST</th>\n' +
                    '                  <th >Total</th>\n' +
                    '                  <th >SP Cost</th>\n' +
                    '                  <th >ST</th>\n' +
                    '                  <th >Tour Code</th>\n' +
                    '                  <th >People</th>\n' +
                    '                  <th >Etc</th>\n' +
                    '                </tr>\n'
                )
                if (result.data != null) {
                    var data = result.data;
                    if (data.length == 0) return;


                    console.log("DATA LENTH[" + data.length + "]");
                    for (var i = 0; i <= data.length; i++) {
                        if (prevDate == 0) prevDate = covertFormatDate(data[i].regDate);
                        if (prevStore == '') prevStore = data[i].userStore;
                        // console.log("PREV Data["+prevDate+"]");
                        // console.log("true:? ["+prevDate != covertFormatDate(data[i].regDate)+"]");

                        if (prevDate != covertFormatDate(data[i].regDate)) {
                            prevDate = covertFormatDate(data[i].regDate);
                            /** if: true --Sub Total*/
                            listSubTotal();
                        } else {
                            if (prevStore != data[i].userStore) {
                                prevStore = data[i].userStore;
                                listSubTotal();
                            }
                        }

                        if (prevStore != data[i].userStore) {
                            prevStore = data[i].userStore;
                            listSubTotal();
                        }

                        // console.log("FOR > I ["+i+"]");
                        // if(data.length != (data.length+1)) {
                        sumSales += data[i].sales;
                        sumTa += data[i].taCom;
                        sumTg += data[i].tgCom;
                        sumTc += data[i].tcCom;
                        sumTotal += data[i].total;
                        sumSPCost += data[i].spCost;
                        sumPeople += data[i].people;

                        ttSales += data[i].sales;
                        ttTa += data[i].taCom;
                        ttTg += data[i].tgCom;
                        ttTc += data[i].tcCom;
                        ttTotal += data[i].total;
                        ttSPCost += data[i].spCost;
                        ttPeople += data[i].people;
                        // }
                        // console.log((i + 1) + "SUM :::::::::" + sumSales + "," + sumTa + "," + sumTg + "," + sumTc + "," + sumTotal + "," + sumSPCost + "," + sumPeople);
                        // console.log((i + 1) + "TAL :::::::::" + ttSales + "," + ttTa + "," + ttTg + "," + ttTc + "," + ttTotal + "," + ttSPCost + "," + ttPeople);
                        /** real Data*/
                        $('table[name*=data_table]').find('tbody').append(
                            '                <tr style="backgroud-color:#FFFFFF;" value="' + data[i].idx + '">\n' +
                            '                  <td style="text-align: center;">' + data[i].userStore + '</td>\n' +
                            '                  <td style="text-align: center;">' + covertFormatDate(data[i].regDate) + '</td>\n' +
                            '                  <td style="text-align: center;">' + emptyChangeValue(data[i].company) + '</td>\n' +
                            '                  <td style="text-align: center;">' + emptyChangeValue(data[i].itcNo) + '</td>\n' +
                            '                  <td style="text-align: center;">' + emptyChangeValue(data[i].itcName) + '</td>\n' +
                            '                  <td style="text-align: center;">' + data[i].sales + '</td>\n' +

                            '                  <td style="text-align: center;">' + data[i].taCom + '</td>\n' +
                            '                  <td style="text-align: center;">' + data[i].taSt + '</td>\n' +
                            '                  <td style="text-align: center;">' + data[i].tgCom + '</td>\n' +
                            '                  <td style="text-align: center;">' + data[i].tgSt + '</td>\n' +
                            '                  <td style="text-align: center;">' + data[i].tcCom + '</td>\n' +

                            '                  <td style="text-align: center;">' + data[i].tcSt + '</td>\n' +
                            '                  <td style="text-align: center;">' + data[i].total + '</td>\n' +
                            '                  <td style="text-align: center;">' + data[i].spCost + '</td>\n' +
                            '                  <td style="text-align: center;">' + data[i].spSt + '</td>\n' +
                            '                  <td style="text-align: center;">' + emptyChangeValue(data[i].code) + '</td>\n' +

                            '                  <td style="text-align: center;">' + data[i].people + '</td>\n' +
                            '                  <td style="text-align: center;">' + emptyChangeValue(data[i].etc) + '</td>\n' +
                            '                </tr>\n'
                        )


                        /** if: true Sub+Sub=Total  backgroud-color:#00c0ef;*/
                        if (i == (data.length - 1)) {
                            listTotal();
                        }
                        // console.log("FOR > I ["+i+"]");
                    }
                }
            }
        });
    }

    function listSubTotal() {
        // console.log(sumSales + "," + sumTa + "," +sumTg + "," +sumTc + ","+ sumTotal + "," + sumSPCost + "," + sumPeople);
        if ((sumSales + sumTa + sumTg + sumTc + sumTotal + sumSPCost + sumPeople) != 0) {
            $('table[name*=data_table]').find('tbody').append(
                '                <tr class="tb_data_sub_total">\n' +
                '                  <td style="text-align: center;">&nbsp;&nbsp;</td>\n' +
                '                  <td style="text-align: center;">&nbsp;&nbsp;</td>\n' +
                '                  <td style="text-align: center;">&nbsp;&nbsp;</td>\n' +
                '                  <td style="text-align: center;">&nbsp;&nbsp;</td>\n' +
                '                  <td style="text-align: center;"> -- Sub Total --</td>\n' +
                '                  <td style="text-align: center;">' + numberWithCommas(emptyChangeValue(sumSales)) + '</td>\n' +

                '                  <td style="text-align: center;">' + numberWithCommas(emptyChangeValue(sumTa)) + '</td>\n' +
                '                  <td style="text-align: center;">&nbsp;&nbsp;</td>\n' +
                '                  <td style="text-align: center;">' + numberWithCommas(emptyChangeValue(sumTg)) + '</td>\n' +
                '                  <td style="text-align: center;">&nbsp;&nbsp;</td>\n' +
                '                  <td style="text-align: center;">' + numberWithCommas(emptyChangeValue(sumTc)) + '</td>\n' +

                '                  <td style="text-align: center;">&nbsp;&nbsp;</td>\n' +
                '                  <td style="text-align: center;">' + numberWithCommas(emptyChangeValue(sumTotal)) + '</td>\n' +
                '                  <td style="text-align: center;">' + numberWithCommas(emptyChangeValue(sumSPCost)) + '</td>\n' +
                '                  <td style="text-align: center;">&nbsp;&nbsp;</td>\n' +
                '                  <td style="text-align: center;">&nbsp;&nbsp;</td>\n' +

                '                  <td style="text-align: center;">' + numberWithCommas(emptyChangeValue(sumPeople)) + '</td>\n' +
                '                  <td style="text-align: center;">&nbsp;&nbsp;</td>\n' +
                '                </tr>\n'
            );
            sumSales = 0, sumTa = 0, sumTg = 0, sumTc = 0, sumTotal = 0, sumSPCost = 0, sumPeople = 0;
        }
    }

    function listTotal() {
        // console.log(ttSales + "," + ttTa + "," +ttTg + "," +ttTc + ","+ ttTotal + "," + ttSPCost + "," + ttPeople);
        listSubTotal();

        $('table[name*=data_table]').find('tbody').append(
            '                <tr class="tb_data_total" >\n' +

            '                  <td style="text-align: center; " colspan="5">TOTAL(Yen)</td>\n' +
            '                  <td style="text-align: center; ">' + numberWithCommas(emptyChangeValue(ttSales)) + '</td>\n' +

            '                  <td style="text-align: center; ">' + numberWithCommas(emptyChangeValue(ttTa)) + '</td>\n' +
            '                  <td style="text-align: center; ">&nbsp;&nbsp;</td>\n' +
            '                  <td style="text-align: center; ">' + numberWithCommas(emptyChangeValue(ttTg)) + '</td>\n' +
            '                  <td style="text-align: center; ">&nbsp;&nbsp;</td>\n' +
            '                  <td style="text-align: center; ">' + numberWithCommas(emptyChangeValue(ttTc)) + '</td>\n' +

            '                  <td style="text-align: center; ">&nbsp;&nbsp;</td>\n' +
            '                  <td style="text-align: center; ">' + numberWithCommas(emptyChangeValue(ttTotal)) + '</td>\n' +
            '                  <td style="text-align: center; ">' + numberWithCommas(emptyChangeValue(ttSPCost)) + '</td>\n' +
            '                  <td style="text-align: center; ">&nbsp;&nbsp;</td>\n' +
            '                  <td style="text-align: center; ">&nbsp;&nbsp;</td>\n' +

            '                  <td style="text-align: center; ">' + numberWithCommas(emptyChangeValue(ttPeople)) + '</td>\n' +
            '                  <td style="text-align: center; ">&nbsp;&nbsp;</td>\n' +
            '                </tr>\n'
        );
        ttSales = 0, ttTa = 0, ttTg = 0, ttTc = 0, ttTotal = 0, ttSPCost = 0, ttPeople = 0;
    }

    function notRows(){
        alert(DELETE_UNIT_MSG_NOT);
    }


