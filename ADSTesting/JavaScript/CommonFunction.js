var jq = jQuery.noConflict();
jq(document).on('focus', ':input', function () {
    jq(this).attr('autocomplete', 'off');   
}).on('paste', ':input', function () {
    if (this.accept == "numeric" || this.accept == "decimal") {
        return false;
    }
}).on('drop', ':input', function () {
    if (this.accept == "numeric" || this.accept == "decimal") {
        return false;
    }
}).on('keypress', ':input', function (e) {
    if (this.accept == "numeric") {
        var keyCode = e.which ? e.which : e.keyCode
        var specialKeys = new Array();
        specialKeys.push(8); //Backspace
        specialKeys.push(46);//Delete
        if ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (this.accept == "decimal") {
        var keyCode = e.which ? e.which : e.keyCode
        var specialKeys = new Array();
        specialKeys.push(8); //Backspace
        specialKeys.push(46);//Delete
        if (e.char == ".") {
            if ((this.value) && (this.value.indexOf('.') >= 0))
                return false;
            else
                return true;
        }
        if (keyCode != 8 && keyCode != 46 && keyCode != 37 && keyCode != 39) {
            if (this.value.indexOf('.') >= 0) {
                var str = this.value.split('.');
                if (str[1].length > 1) {
                    return false;
                }
            }
        }
        if ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1) {
            return true;
        }
        else {
            return false;
        }
    }
    // Aks 

    else if (this.accept == "YesNo") {
        var keyCode = e.which ? e.which : e.keyCode
        var specialKeys = new Array();
        specialKeys.push(8); //Backspace
        specialKeys.push(46);//Delete
        if (keyCode == 8) {
            var currentid = this.id;
            this.value = "";
        }
        if (keyCode == 89 || keyCode == 121 || keyCode == 78 || keyCode == 110) {
            return true;
        }
        else {
            return false;
        }
    }
}).on('blur', ':input', function (e) {
    if (this.accept == "date") {
        var txtVal = this.value;
        if (txtVal == '')
            return false;
        if (CheckDate(txtVal) == false) {
            alert('The date format should be : dd/mm/yyyy');
            this.value = "";
            jq('#' + this.id).focus();
            setTimeout(function () {
                jq('#' + this.id).focus();
            }, 1);
            return false;
        }
    }
});
function fndnull(val) {
    if (val == null || val == "null" || val == undefined || val == "undefined")
        val = ""
    return val
}
function blank_space(val) {
    if (val == "" || val == null || val == undefined || val == "null" || val == "undefined") {
        val = "&nbsp";
    }
    return val
}
function blank_to_zero(val) {
    if (val == "" || val == null || val == undefined || val == "null" || val == "undefined") {
        val = 0
    }
    return val
}
function Exit() {
    if (confirm("Do You want to skip the page?")) {
        window.close();
        return false;
    }
    return false;
}
function CheckDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;

    var rxDatePattern = /^(\d{2,2})(\/|)(\d{2,2})(\/|)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern);

    if (dtArray == null)
        return false;

    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}
function CheckDateForGrid(id) {
    var currVal = document.getElementById(id).value;
    if (currVal == '')
        return false;

    var rxDatePattern = /^(\d{2,2})(\/|)(\d{2,2})(\/|)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern);

    if (dtArray == null) {
        alert('The date format should be : dd/mm/yyyy');
        jq('#' + id).val('')
        jq('#' + id).focus();
        return false;
    }
    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12) {
        alert('The date format should be : dd/mm/yyyy');
        jq('#' + id).val('')
        jq('#' + id).focus();
        return false;
    }
    else if (dtDay < 1 || dtDay > 31) {
        alert('The date format should be : dd/mm/yyyy');
        jq('#' + id).val('')
        jq('#' + id).focus();
        return false;
    }
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) {
        alert('The date format should be : dd/mm/yyyy');
        jq('#' + id).val('')
        jq('#' + id).focus();
        return false;
    }
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap)) {
            alert('The date format should be : dd/mm/yyyy');
            jq('#' + id).val('')
            jq('#' + id).focus();
            return false;
        }
    }
    return true;
}
function offset(activeid, divid, listboxid) {
    jq('#' + listboxid).empty();
    document.getElementById(divid).style.top = jq("#" + activeid).position().top + 18 + "px";
    document.getElementById(divid).style.left = jq("#" + activeid).position().left + "px";
    jq('#' + divid).show("slow");
    document.getElementById(listboxid).focus();
}
function OffSetForGrid(activeid, divid, listboxid, griddivid) {
    jq('#' + listboxid).empty();
    document.getElementById(divid).style.top = jq("#" + activeid).position().top + 18 + "px";
    document.getElementById(divid).style.left = jq("#" + activeid).position().left + "px";
    jq('#' + divid).show("slow");
    document.getElementById(listboxid).focus();
}
function check_mendetory(id) {
    var label_text = jq('#' + id).text();
    return label_text;
}

(function ($) {
    $.fn.check_mendetory_star = function () {
        if (this.text().indexOf('*') >= 0)
            return true;
        else
        return false;
    };
    $.fn.get_lable_text = function () {
        return this.text().split('*', 1);
    };
}(jQuery));

function OnClickExit() {
    if (confirm('Do you want skip the page')) {
        window.close();
        return false;
    }
    return false;
}

function ConvertJsonDate(dt) {
    var newdt = CHKDATE(eval(dt.replace(/\/Date\((\d+)\)\//gi, "new Date($1)")));
    return newdt;
}



function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}
function EnterTab(evt, id) {
    var evt = (evt) ? evt : ((event) ? event : null);
    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
    if ((evt.keyCode == 13) && (node.className != "btextlist") && ((node.type == "text") || (node.type == "select-one") || (node.type == "radio") || (node.type == "checkbox"))) {
        getNextElement(node).focus();
        return false;
    }
}
function getNextElement(field) {
    var form = field.form;
    for (var e = 0; e < form.elements.length; e++) {
        if (field == form.elements[e]) {
            break;
        }
    }
    e++;
    while (form.elements[e % form.elements.length].type == undefined || form.elements[e % form.elements.length].type == "hidden" || form.elements[e % form.elements.length].disabled == true || form.elements[e % form.elements.length].id == "BtnTransporterDetail" || form.elements[e % form.elements.length].id.split('_')[0] == "btnshowstock" || form.elements[e % form.elements.length].type == "fieldset") {
        e++;
    }
    return form.elements[e % form.elements.length]; 
}
function compare_date(pfromdate, ptodate) {
    var pfrdt = document.getElementById(pfromdate).value
    var stodate = pfrdt.split("/");
    var dd = stodate[0];
    var mm = stodate[1];
    var yy = stodate[2];

    var ptodt = document.getElementById(ptodate).value
    var stfrdate = ptodt.split("/");
    var day = stfrdate[0];
    var month = stfrdate[1];
    var year = stfrdate[2];

    if ((year < yy) || ((dd > day && mm >= month) && year <= yy) || ((dd < day && mm > month) && year <= yy)) {
        alert("Invalid Date Range!\n'To Date should be  greater than From Date!")
        document.getElementById(ptodate).value = "";
        document.getElementById(ptodate).focus();
        return false;
    }
    else {
        return true;
    }
}

//---------------------------------------------------------------Permission function----------------------------------------------------------

function CkeckStatus(FlagStatus) {
    if (FlagStatus == 0 || FlagStatus == 8) {
     jq("#btnNew,#btnQuery,#btnDelete,#btnSave,#btnExecute,#btnCancel,#btnModify,#btnfirst,#btnnext,#btnprevious,#btnlast,#btnExit").attr('disabled', true);
    }
    if (FlagStatus == 1 || FlagStatus == 9) {
        jq("#btnNew,#btnSave,#btnCancel,#btnExit").attr('disabled', false);
        jq("#btnQuery,#btnDelete,#btnExecute,#btnModify,#btnfirst,#btnnext,#btnprevious,#btnlast").attr('disabled', true);
    }
    if (FlagStatus == 2 || FlagStatus == 10) {
        jq("#btnQuery,#btnSave,#btnExecute,#btnCancel,#btnExit").attr('disabled', false);
        jq("#btnNew,#btnDelete,#btnModify,#btnfirst,#btnnext,#btnprevious,#btnlast").attr('disabled', true);
    }

    if (FlagStatus == 3 || FlagStatus == 11) {
        jq("#btnDelete,#btnSave,#btnCancel,#btnExit").attr('disabled', false);
        jq("#btnNew,#btnQuery,#btnExecute,#btnModify,#btnfirst,#btnnext,#btnprevious,#btnlast").attr('disabled', true);
    }

    if (FlagStatus == 4 || FlagStatus == 12) {
        jq("#btnNew,#btnQuery,#btnCancel,#btnModify,#btnExit").attr('disabled', false);
        jq("#btnDelete,#btnSave,#btnExecute,#btnfirst,#btnnext,#btnprevious,#btnlast").attr('disabled', true);
    }
    if (FlagStatus == 5 || FlagStatus == 13) {
        jq("#btnSave,#btnModify").attr('disabled', true);
        jq("#btnNew,#btnQuery,#btnDelete,#btnExecute,#btnCancel,#btnfirst,#btnnext,#btnprevious,#btnlast,#btnExit").attr('disabled', false);
    }
    if (FlagStatus == 6 || FlagStatus == 14) {
        jq("#btnNew,#btnSave,#btnModify").attr('disabled', true);
        jq("#btnQuery,#btnDelete,#btnExecute,#btnCancel,#btnfirst,#btnnext,#btnprevious,#btnlast,#btnExit").attr('disabled', false);
    }
    if (FlagStatus == 7 || FlagStatus == 15) {
        jq("#btnSave,#btnExecute,#btnfirst,#btnnext,#btnprevious,#btnlast").attr('disabled', true);
        jq("#btnNew,#btnQuery,#btnDelete,#btnCancel,#btnModify,#btnExit").attr('disabled', false);
    }
}

function chackvalue(value) {
    var value = value;
    if (value == "" || value == null || value == "null" || value == undefined || value == "undefined") {
        value = "";
    }
    return value;
}

//*****************************************************************Function for Only Numeric Value****************************************
function OnlynumKey(evt, id) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 46) {
        if ((document.getElementById(id).value) && (document.getElementById(id).value.indexOf('.') >= 0))
            return true;
        else
            return false;
    }
    if (charCode != 8 && charCode != 46) {
        if (id.indexOf(id) == 0) {
            if (document.getElementById(id).value.indexOf('.') >= 0) {
                var str = document.getElementById(id).value.split('.');
                if (str[1].length > 1) {
                    return false;
                }
            }
        }
    }
    if ((charCode == 31 || charCode == 45) || (charCode == 8) || (charCode >= 48 && charCode <= 57))
        return true;
    else
        return false;
}

//-----------------------------------------------------------------------Number After 2 Digit Decimal Point--------------------------------------------
function isnumKey(evt, id) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 46) {
        if ((document.getElementById(id).value) && (document.getElementById(id).value.indexOf('.') >= 0))
            return false;
        else
            return true;
    }
    if (charCode != 8 && charCode != 46) {
        if (id.indexOf(id) == 0) {
            if (document.getElementById(id).value.indexOf('.') >= 0) {
                var str = document.getElementById(id).value.split('.');
                if (str[1].length > 1) {
                    return false;
                }
            }
        }
    }
    if ((charCode == 31 || charCode == 45) || (charCode == 8) || (charCode >= 48 && charCode <= 57))
        return true;
    else
        return false;
}

//-----------------------------------------------------------------------Number After 3 Digit Decimal Point--------------------------------------------
function isnumKey1(evt, id) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 46) {
        if ((document.getElementById(id).value) && (document.getElementById(id).value.indexOf('.') >= 0))
            return false;
        else
            return true;
    }
    if (charCode != 8 && charCode != 46) {
        if (id.indexOf(id) == 0) {
            if (document.getElementById(id).value.indexOf('.') >= 0) {
                var str = document.getElementById(id).value.split('.');
                if (str[1].length > 2) {
                    return false;
                }
            }
        }
    }
    if ((charCode == 31 || charCode == 45) || (charCode == 8) || (charCode >= 48 && charCode <= 57))
        return true;
    else
        return false;
}


//--------------------------------------------------------------Compare Sys Date --------------------------------------------------------------------------

function CheckSysDate(t1, t2, txt_id) { //Date is not less then current date
        var one_day = 1000 * 60 * 60 * 24;
        var x = t1.split("/");
        var y = t2.split("/");
        var date1 = new Date(x[2], (x[1] - 1), x[0]);
        var date2 = new Date(y[2], (y[1] - 1), y[0])
        var month1 = x[1] - 1;
        var month2 = y[1] - 1;
        _Diff = Math.ceil((date2.getTime() - date1.getTime()) / (one_day));
        if (_Diff < "0" && _Diff != "NaN" && t2 != "") {
            alert('Please Enter Valid Date');
            document.getElementById(txt_id).value = "";
            document.getElementById(txt_id).focus()
            return false;
        }
    return true;
}

function DiffDateManual(t1, t2, txt_id) {
    var txtid = txt_id;
    var dateenter = t2;
    var dateformat = document.getElementById('hdndateformat').value;
    //---------------------------------------------------------Used For Manual Date----------------------------------------------------------------
    if (document.getElementById(txtid).value != "") {
        var dateInitial = "20";
        if (dateenter.indexOf('/') < 0) {
            flagret = "F"
            var date12 = "";
            if (dateformat == "mm/dd/yyyy") {
                if (dateenter.length >= "8")
                    date12 = dateenter.substring(0, 2) + "/" + dateenter.substring(2, 4) + "/" + dateenter.substring(4, 8);
                else if (dateenter.length >= "6")
                    date12 = dateenter.substring(0, 2) + "/" + dateenter.substring(2, 4) + "/" + dateInitial + dateenter.substring(4, 6);
                else
                    date12 = document.getElementById(txtid).value;
            }
            if (dateformat == "yyyy/mm/dd") {
                if (dateenter.length >= "8")
                    date12 = dateenter.substring(0, 4) + "/" + dateenter.substring(4, 6) + "/" + dateenter.substring(6, 8);
                else if (dateenter.length >= "6")
                    date12 = dateInitial + dateenter.substring(0, 2) + "/" + dateenter.substring(2, 4) + "/" + dateenter.substring(4, 6);
                else
                    date12 = document.getElementById(txtid).value;
            }
            if (dateformat == "dd/mm/yyyy") {
                if (dateenter.length >= "8")
                    date12 = dateenter.substring(0, 2) + "/" + dateenter.substring(2, 4) + "/" + dateenter.substring(4, 8);
                else if (dateenter.length >= "6")
                    date12 = dateenter.substring(0, 2) + "/" + dateenter.substring(2, 4) + "/" + dateInitial + dateenter.substring(4, 6);
                else
                    date12 = document.getElementById(txtid).value;
            }
            document.getElementById(txtid).value = date12;
        }

        if (dateformat == "mm/dd/yyyy") {
            validformat = /^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
        }
        if (dateformat == "yyyy/mm/dd") {
            validformat = /^\d{4}\/\d{2}\/\d{2}$/ //Basic check for format validity
        }
        if (dateformat == "dd/mm/yyyy") {
            validformat = /^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
        }
        if (document.getElementById(txtid).value != "") {
            if (!validformat.test(document.getElementById(txtid).value)) {
                alert(" Please Fill The Date In " + dateformat + " Format");
                document.getElementById(txtid).value = "";
                document.getElementById(txtid).focus();
                return false;
            }
        }

        var txt1 = document.getElementById(txtid).value.split("/");
        if (dateformat == "dd/mm/yyyy") {
            dateSelected = parseInt(txt1[0], 10);
            monthSelected = parseInt(txt1[1], 10) - 1;
            yearSelected = parseInt(txt1[2], 10);
        }
        else if (dateformat == "mm/dd/yyyy") {
            dateSelected = parseInt(txt1[1], 10);
            monthSelected = parseInt(txt1[0], 10) - 1;
            yearSelected = parseInt(txt1[2], 10);
        }
        else if (dateformat == "yyyy/mm/dd") {
            dateSelected = parseInt(txt1[2], 10);
            monthSelected = parseInt(txt1[1], 10) - 1;
            yearSelected = parseInt(txt1[0], 10);
        }
        var dayc = daysInMonth_cl(monthSelected, yearSelected);
        if (dateSelected > dayc) {
            alert("InValid Date");
            document.getElementById(txtid).value = "";
            return false;
        }
        if (monthSelected > 12) {
            alert("InValid Date");
            document.getElementById(txtid).value = "";
            return false;
        }
        var one_day = 1000 * 60 * 60 * 24;
        var x = t1.split("/");
        var y = document.getElementById(txtid).value.split("/");
        var date1 = new Date(x[2], (x[1] - 1), x[0]);
        var date2 = new Date(y[2], (y[1] - 1), y[0])
        var month1 = x[1] - 1;
        var month2 = y[1] - 1;
        _Diff = Math.ceil((date2.getTime() - date1.getTime()) / (one_day));
        if (_Diff < "0" && _Diff != "NaN" && t2 != "") {
            alert('Please Enter Valid Date');
            document.getElementById(txt_id).value = "";
            document.getElementById(txt_id).focus()
            return false;
        }
        return true;
    }
}

function daysInMonth_cl(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function FillManualDate(txtid, dateenter, dateformat) {
    if (document.getElementById(txtid).value != "") {
        var dateInitial = "20";
        if (dateenter.indexOf('/') < 0) {
            flagret = "F"
            var date12 = "";

            if (dateformat == "mm/dd/yyyy") {
                if (dateenter.length >= "8")
                    date12 = dateenter.substring(0, 2) + "/" + dateenter.substring(2, 4) + "/" + dateenter.substring(4, 8);
                else if (dateenter.length >= "6")
                    date12 = dateenter.substring(0, 2) + "/" + dateenter.substring(2, 4) + "/" + dateInitial + dateenter.substring(4, 6);
                else
                    date12 = document.getElementById(txtid).value;
            }
            if (dateformat == "yyyy/mm/dd") {
                if (dateenter.length >= "8")
                    date12 = dateenter.substring(0, 4) + "/" + dateenter.substring(4, 6) + "/" + dateenter.substring(6, 8);
                else if (dateenter.length >= "6")
                    date12 = dateInitial + dateenter.substring(0, 2) + "/" + dateenter.substring(2, 4) + "/" + dateenter.substring(4, 6);
                else
                    date12 = document.getElementById(txtid).value;
            }
            if (dateformat == "dd/mm/yyyy") {
                if (dateenter.length >= "8")
                    date12 = dateenter.substring(0, 2) + "/" + dateenter.substring(2, 4) + "/" + dateenter.substring(4, 8);
                else if (dateenter.length >= "6")
                    date12 = dateenter.substring(0, 2) + "/" + dateenter.substring(2, 4) + "/" + dateInitial + dateenter.substring(4, 6);
                else
                    date12 = document.getElementById(txtid).value;
            }
            document.getElementById(txtid).value = date12;
        }

        if (dateformat == "mm/dd/yyyy") {
            validformat = /^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
        }
        if (dateformat == "yyyy/mm/dd") {
            validformat = /^\d{4}\/\d{2}\/\d{2}$/ //Basic check for format validity
        }
        if (dateformat == "dd/mm/yyyy") {
            validformat = /^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
        }
        if (document.getElementById(txtid).value != "") {
            if (!validformat.test(document.getElementById(txtid).value)) {
                alert(" Please Fill The Date In " + dateformat + " Format");
                document.getElementById(txtid).value = "";
                document.getElementById(txtid).focus();
                return false;
            }
        }

        var txt1 = document.getElementById(txtid).value.split("/");
        if (dateformat == "dd/mm/yyyy") {
            dateSelected = parseInt(txt1[0], 10);
            //monthSelected = parseInt(txt1[1], 10) - 1;
            monthSelected = parseInt(txt1[1], 10);
            yearSelected = parseInt(txt1[2], 10);
        }
        else if (dateformat == "mm/dd/yyyy") {
            dateSelected = parseInt(txt1[1], 10);
            //monthSelected = parseInt(txt1[0], 10) - 1;
            monthSelected = parseInt(txt1[0], 10);
            yearSelected = parseInt(txt1[2], 10);
        }
        else if (dateformat == "yyyy/mm/dd") {
            dateSelected = parseInt(txt1[2], 10);
            //monthSelected = parseInt(txt1[1], 10) - 1;
            monthSelected = parseInt(txt1[1], 10);
            yearSelected = parseInt(txt1[0], 10);
        }
        var dayc = daysInMonth_cl(monthSelected, yearSelected);
        if (dateSelected > dayc) {
            alert("InValid Date");
            document.getElementById(txtid).value = "";
            return false;
        }
        if (monthSelected > 12) {
            alert("InValid Date");
            document.getElementById(txtid).value = "";
            return false;
        }
    }
}
function OnClickLast() {
    next = total_records - 1;
    jq("#btnprevious,#btnfirst").attr('disabled', false);
    jq("#btnnext,#btnlast").attr('disabled', true);
    jq('#btnprevious').focus();
    BindHDRData();
    return false;
}
function OnClickFirst() {
    next = 0;
    jq("#btnnext,#btnlast").attr('disabled', false);
    jq("#btnprevious,#btnfirst").attr('disabled', true);
    jq('#btnnext').focus();
    BindHDRData();
    return false;
}

//----------------------------------------------------Find Next, Previous Record-------------------------------------------------------------------

function FindNextRecord() {
    next = parseInt(next) + 1;
    jq("#btnprevious").attr('disabled', false);
    if (next == total_records - 1) {
        jq("#btnnext").attr('disabled', true);
        jq('#btnprevious').focus();
    }
    BindHDRData();
    return false;
}
function FindPreviousRecord() {
    next = parseInt(next) - 1;
    jq("#btnnext").attr('disabled', false);
    if (next == 0) {
        jq("#btnprevious").attr('disabled', true);
        jq('#btnnext').focus();
    }
    BindHDRData();
    return false;
}




function TimeValidate(input) {
    var validformat = /^\d{2}\:\d{2}\:\d{2}$/ //Basic check for format validity
    if (!validformat.test(input.value)) {
        alert('Value should be in "00:00:00" format');
        return false;
    }
    else {
        var val = input.value;
        val = val.split(':');
        var val1 = val[0];
        var val2 = parseInt(val[1]);
        var val3 = parseInt(val[2]);
        val1 = parseInt(val1);
        if (val1 <= 23 && val2 <= 59 && val3 <= 59) {

        }
        else if (val1 > 24 || val2 > 59 || val3 > 59) {
            alert('The hour should be upto 24, minute and second value should be upto 60');
            $(input.id).value = "";
            $(input.id).focus();
            return false;
        }
        else {
            return true;
        }

    }
}
var mob = /^[1-9]{1}[0-9]{9}$/;
function MobileValidate(input) {
    if (jq(input).val() != "") {
        if (mob.test($.trim(jq(input).val())) == false) {
            alert("Please enter valid mobile number.!!");
            jq(input).val("");
            //jq(input).focus();
            return false;
        }
    }
}
var eml = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
function EmailValidate(input) {
    if (jq(input).val() != "") {
        if (eml.test($.trim(jq(input).val())) == false) {
            alert("Please enter valid email address.!!");
            jq(input).val("");
            //jq(input).focus();
            return false;
        }
    }
}

var dtCh= "/";
var minYear=2015;
var maxYear=2100;

function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}

function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}
function isDateMMDDYYYY(dtStr) {
    var daysInMonth = DaysArray(12)
    var pos1 = dtStr.indexOf(dtCh)
    var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
    var strMonth = dtStr.substring(0, pos1)
    var strDay = dtStr.substring(pos1 + 1, pos2)
    var strYear = dtStr.substring(pos2 + 1)
    strYr = strYear
    if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
    if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
    for (var i = 1; i <= 3; i++) {
        if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
    }
    month = parseInt(strMonth)
    day = parseInt(strDay)
    year = parseInt(strYr)
    if (pos1 == -1 || pos2 == -1) {
        alert("The date format should be : mm/dd/yyyy")
        return false
    }
    if (strMonth.length < 1 || month < 1 || month > 12) {
        alert("Please enter a valid month")
        return false
    }
    if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
        alert("Please enter a valid day")
        return false
    }
    if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
        alert("Please enter a valid 4 digit year between " + minYear + " and " + maxYear)
        return false
    }
    if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
        alert("Please enter a valid date")
        return false
    }
    return true
}
function isDateDDMMYYYY(dtStr) {
    if (dtStr != undefined)
        {
	        var daysInMonth = DaysArray(12)
	        var pos1=dtStr.indexOf(dtCh)
	        var pos2=dtStr.indexOf(dtCh,pos1+1)
	        var strDay=dtStr.substring(0,pos1)
	        var strMonth=dtStr.substring(pos1+1,pos2)
	        var strYear=dtStr.substring(pos2+1)
	        strYr=strYear
	        if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	        if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	        for (var i = 1; i <= 3; i++) {
		        if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	        }
	        month=parseInt(strMonth)
	        day=parseInt(strDay)
	        year=parseInt(strYr)
	        if (pos1==-1 || pos2==-1){
		        alert("The date format should be : dd/mm/yyyy")
		        return false
	        }
	        if (strMonth.length<1 || month<1 || month>12){
		        alert("Please enter a valid month")
		        return false
	        }
	        if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		        alert("Please enter a valid day")
		        return false
	        }
	        if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		        alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
		        return false
	        }
	        if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		        alert("Please enter a valid date")
		        return false
	        }
        }
return true
}

function CHKDATE(userdate,id,ctrl){
    var dt = ctrl
    if (ctrl.value == "")
        return false;
    var dtformat = document.getElementById("hdndateformat").value;
    if (dtformat == "dd/mm/yyyy") {
        if (isDateDDMMYYYY(dt.value) == false) {
            ctrl.value = "";
            ctrl.focus()
            return false
        }
    }
    else
        if (dtformat == "mm/dd/yyyy") {
            if (isDateMMDDYYYY(dt.value) == false) {
                ctrl.value = "";
                ctrl.focus()
                return false
            }
        }
    return true
}

function CheckDate(userdate) {
    var mycondate = ""
    if (userdate == null || userdate == "") {
        mycondate = ""
        userdate = "";
        return mycondate
    }
    var dateformate = document.getElementById('hdndateformat').value;
    if (document.getElementById('hdndateformat').value == "dd/mm/yyyy") {
        var spmonth = "'" + userdate + "'";
        var pp = spmonth.split(" ");
        var mon = pp[1];
        var myDate = new Date(userdate);
        var date = myDate.getDate();

        if (date == 1 || date == 2 || date == 3 || date == 4 || date == 5 || date == 6 || date == 7 || date == 8 || date == 9)
            date = "0" + date;
        var month = myDate.getMonth() + 1;
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9)
            month = "0" + month;
        var year = myDate.getFullYear();
        mycondate = date + "/" + month + "/" + year;
        return mycondate;
    }
    else if (document.getElementById('hdndateformat').value == "mm/dd/yyyy") {
        var spmonth = "'" + userdate + "'";
        var pp = spmonth.split(" ");
        var mon = pp[1];
        var myDate = new Date(userdate);
        var date = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        mycondate = month + "/" + date + "/" + year;
        return mycondate;
    }
    else if (document.getElementById('hdndateformat').value == "yyyy/mm/dd") {
        var spmonth = "'" + userdate + "'";
        var pp = spmonth.split(" ");
        var mon = pp[1];
        var myDate = new Date(userdate);
        var date = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        mycondate = year + "/" + month + "/" + date;
        return mycondate;
    }
}

function FindNBSP(val) {
    var retVal = "";
    val = val.replace("&amp;", "").replace("amp;", "");
    if (val == "&nbsp;" || val == "&NBSP;" || val == "nbsp;" || val == "NBSP;" || val == "nbsp" || val == "NBSP")
        retVal = "";
    else
        retVal = val;

    return retVal;
}
function GetProgramLanguage(compcode, unitcode, channelcode, extra1, extra2) {
    try {
        var ParameterValueArray = [compcode, unitcode, channelcode, extra1, extra2];
        jq.ajax({
            type: "POST",
            url: "CommonPage.aspx/GetProgramLanguage",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                jq("#txtlanguagename").val(res[0].LangName.toUpperCase());
                jq("#hdnlanguagecode").val(res[0].LangCode.toUpperCase());
            },
            error: function (result) {
                alert(result.status + ' ' + result.statusText);
            }
        });
    }
        catch (ex) {
            alert(ex);
        }
}
function FindGeographicalData(compCode, cityCode) {
    try {        
        var ParameterValueArray = [compCode, cityCode,"","","","",""];
        jq.ajax({
            type: "POST",
            url: "CommonPage.aspx/GetGeographicalData",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                value = res[0].CountryName + "*" + res[0].CountryCode + "~" + res[0].ZoneName + "*" + res[0].ZoneCode + "~" + res[0].RegionName + "*" + res[0].RegionCode + "~" + res[0].StateName + "*" + res[0].StatCode + "~" + res[0].DistrictName + "*" + res[0].DistCode + "~" + res[0].CityName + "*" + res[0].CityCode;
                jq("#txtcountry").val(res[0].CountryName.toUpperCase()) ;
                jq("#hdncountrycode").val(res[0].CountryCode.toUpperCase());
                jq("#txtzone").val(res[0].ZoneName.toUpperCase());
                jq("#hdnzonecode").val(res[0].ZoneCode.toUpperCase());
                jq("#txtregion").val(res[0].RegionName.toUpperCase());
                jq("#hdnregioncode").val(res[0].RegionCode.toUpperCase());
                jq("#txtstate").val(res[0].StateName.toUpperCase());
                jq("#hdnstatecode").val(res[0].StatCode.toUpperCase());
                jq("#txtdistrict").val(res[0].DistrictName.toUpperCase());
                jq("#hdndistcode").val(res[0].DistCode.toUpperCase());
            },
            error: function (result) {
                alert(result.status + ' ' + result.statusText);
            }
        });
        }   
        catch (ex) {
            alert(ex);
        }
}
function ValidateEmail(ctrl) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var email = ctrl.value;
    if (email != "") {
        if (!expr.test(email)) {
            alert("Please enter valid entry!")
            ctrl.value = "";
            ctrl.focus();
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
    }
    

function OnlyTime(ctrl) {
    var regexp = new RegExp(/^([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/)
    var inputValue = ctrl.value;
    if (inputValue != "") {
        try{
            if (!regexp.test(inputValue) && Parse.Int(inputValue.split(":")[0])<=24 ) {
                alert("Please enter valid time in 'hh:mm:ss' format.")
                ctrl.value = "";
                ctrl.focus();
                return false;
            }
            else {
                return true;
            }
            }
        catch(ex)
        {
            alert("Please enter valid time in 'hh:mm:ss' format.");
            ctrl.value = "";
            ctrl.focus();
            return false
        }
    }
    else {
        return true;
    }
}

function SecondToTime(timeinsec) {
    var sec_num = parseInt(timeinsec, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}
function getSeconds(time) {
    var ts = time.split(':');
    return Date.UTC(1970, 0, 1, ts[0], ts[1], ts[2]) / 1000;
}
function timeSummation(time1,time2) {
    t1 = time1.split(':');
    t2 = time2.split(':');
    var x1 = parseInt(t1[0]) * 60 * 60 + parseInt(t1[1]) * 60 + parseInt(t1[2]);
    var x2 = parseInt(t2[0]) * 60 * 60 + parseInt(t2[1]) * 60 + parseInt(t2[2]);
    var s = x1 + x2;
    var m = Math.floor(s / 60); s = s % 60;
    var h = Math.floor(m / 60); m = m % 60;
    var d = Math.floor(h / 24); h = h % 24;
    if (h < 10) { h = "0" + h; }
    if (m < 10) { m = "0" + m; }
    if (s < 10) { s = "0" + s; }
    var result = h + ':' + m + ':' + s;
    return result;
}

//------------------  Num Key with Semicolon
function OnlynumKeyWithSemi(evt, id) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 46) {
        if ((document.getElementById(id).value) && (document.getElementById(id).value.indexOf('.') >= 0))
            return true;
        else
            return false;
    }
    if (charCode != 8 && charCode != 46) {
        if (id.indexOf(id) == 0) {
            if (document.getElementById(id).value.indexOf('.') >= 0) {
                var str = document.getElementById(id).value.split('.');
                if (str[1].length > 1) {
                    return false;
                }
            }
        }
    }
    if ((charCode == 31 || charCode == 45) || (charCode == 8) || (charCode == 58) || (charCode >= 48 && charCode <= 57))
        return true;
    else
        return false;
}

function showLoader() {
    $("#progressBar").fadeIn();
    $("#progressBarBg").addClass('disableBackground');
}

function hideLoader() {
    $("#progressBar").fadeOut();
    $("#progressBarBg").removeClass('disableBackground');
}

function ConvertDate(userdate) {
    var mycondate = ""
    if (userdate == null || userdate == "") {
        mycondate = ""
        userdate = "";
        return mycondate
    }
    var dateformate = document.getElementById('hdndateformat').value;
    if (document.getElementById('hdndateformat').value == "dd/mm/yyyy") {
        var spmonth = "'" + userdate + "'";
        var pp = spmonth.split(" ");
        var mon = pp[1];
        var myDate = new Date(userdate);
        var date = myDate.getDate();

        if (date == 1 || date == 2 || date == 3 || date == 4 || date == 5 || date == 6 || date == 7 || date == 8 || date == 9)
            date = "0" + date;
        var month = myDate.getMonth() + 1;
        if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9)
            month = "0" + month;
        var year = myDate.getFullYear();
        mycondate = date + "/" + month + "/" + year;
        return mycondate;
    }
    else if (document.getElementById('hdndateformat').value == "mm/dd/yyyy") {
        var spmonth = "'" + userdate + "'";
        var pp = spmonth.split(" ");
        var mon = pp[1];
        var myDate = new Date(userdate);
        var date = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        mycondate = month + "/" + date + "/" + year;
        return mycondate;
    }
    else if (document.getElementById('hdndateformat').value == "yyyy/mm/dd") {
        var spmonth = "'" + userdate + "'";
        var pp = spmonth.split(" ");
        var mon = pp[1];
        var myDate = new Date(userdate);
        var date = myDate.getDate();
        var month = myDate.getMonth() + 1;
        var year = myDate.getFullYear();
        mycondate = year + "/" + month + "/" + date;
        return mycondate;
    }
}

function CheckCheckedBox(val) {
    try{
        if (val == "" || val == null || val == undefined || val == "null" || val == "undefined") {
            val = "N"
        }
        return val
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}


function CheckPersentage(id, persentval) {
    try {
        if (parseFloat(persentval).toFixed(2) > 100) {
            alert('Dis. cannot be greater than 100.!!');
            jq("#" + id).val('')
            jq("#" + id).focus();
            return false;
        }
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}