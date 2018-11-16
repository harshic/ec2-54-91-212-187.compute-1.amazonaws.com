var browser = navigator.appName;
var jq = jQuery.noConflict();
var dsmain = "";
var count = 0;

function OnloadClear() {
    jq("#txtstatecode").attr('disabled', true);
    jq("#txtcountryname,#txtstatename,#txtstatealies").attr('disabled', false);
    jq("#txtcountryname,#txtstatename,#txtstatealies,#txtstatecode").val('')
    jq("#view").empty();
    jq("#view").hide();
}

function ModifyEnable() {
    jq("#txtstatecode").attr('disabled', true);
    jq("#txtcountryname,#txtstatename,#txtstatealies").attr('disabled', false);
}

function GenerateCode() {
    try {
        if (jq("#txtstatecode").val() != "") {
            SaveRec();
            return false;
        }
        else {
            var tablename = "STATE";
            var compcode = jq("#hdncompcode").val()
            var ParameterValueArray = [tablename, compcode];
            jq.ajax({
                type: "POST",
                url: "CountryMaster.aspx/GenerateUniqueCode",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
                dataType: "json",
                success: function (result) {
                    var res = jq.parseJSON(result.d)
                    if (parseInt(res[0].STATECODE) == "0") {
                        jq('#txtstatecode').val('1')
                    }
                    else {
                        jq('#txtstatecode').val(res[0].STATECODE)
                    }
                    SaveRec();
                },
                error: function (result) {
                    alert(result.status + ' ' + result.statusText);
                }
            });
        }      
    }
    catch (ex) {
        alert(ex);
        return false;
    }
    return false;
}

function SaveRec() {
    try {
        var Action = "INSERT";
        var CompCode = jq("#hdncompcode").val()
        var CountryCode = jq("#txtcountryname").val().split("~")[1]
        var StateCode = jq("#txtstatecode").val()
        var StateName = jq("#txtstatename").val().toUpperCase();
        var StateAlias = jq("#txtstatealies").val().toUpperCase();
        var UserId = jq("#hdnuserid").val()
        var ParameterValueArray = [Action, CompCode, CountryCode, StateCode, StateName, StateAlias, UserId];
        jq.ajax({
            type: "POST",
            url: "StateMaster.aspx/SaveViewRec",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                OnloadClear();   
            },
            error: function (result) {
                alert(result.status + ' ' + result.statusText);
            }
        });
    }
    catch (ex) {
        alert(ex);
        return false;
    }
    return false;
}

function ViewRec() {
    try {

        var Action = "EXECUTE";
        var CompCode = jq("#hdncompcode").val()
        var CountryCode = jq("#txtcountryname").val().split("~")[1]
        var StateCode = jq("#txtstatecode").val()
        var StateName = jq("#txtstatename").val().toUpperCase();
        var StateAlias = jq("#txtstatealies").val().toUpperCase();
        var UserId = jq("#hdnuserid").val()
        var ParameterValueArray = [Action, CompCode, CountryCode, StateCode, StateName, StateAlias, UserId];
        jq.ajax({
            type: "POST",
            url: "StateMaster.aspx/SaveViewRec",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                dsmain = jq.parseJSON(result.d)
                jq('#txtcountryname').val(dsmain[0].COUNTRY_CODE);
                jq('#txtstatecode').val(dsmain[0].STATE_CODE);
                jq('#txtstatename').val(dsmain[0].STATE_NAME);
                jq('#txtstatealies').val(dsmain[0].STATE_ALIAS);
                jq("#txtcountryname,#txtstatecode,#txtstatename,#txtstatealies").attr('disabled', true);
                BindDetailGrid();
                return false;
            },
            error: function (result) {
                alert(result.status + ' ' + result.statusText);
            }
        });
    }
    catch (ex) {
        alert(ex);
        return false;
    }
    return false; 
}

function DeleteRec() {
    try {
        var action = "DELETE";
        var compcode = "1";
        var countrycode = jq("#txtcountrycode").val().toUpperCase();
        var countryname = jq("#txtcountryname").val().toUpperCase();
        var countryalis = jq("#txtcountryalies").val().toUpperCase();
        // var userid = jq('#hdnuserid').val()
        var userid = "admin@dss.com"

        var ParameterValueArray = [action, compcode, countrycode, countryname, countryalis, userid];
        jq.ajax({
            type: "POST",
            url: "CountryMaster.aspx/SaveViewRec",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                OnloadClear();
            },
            error: function (result) {
                alert(result.status + ' ' + result.statusText);
            }
        });
    }
    catch (ex) {
        alert(ex);
        return false;
    }
    return false;
}


function CreateGridHeader() {
    var GridStr = "";
    GridStr += "<table  id='mytable' style='overflow:auto;width: 100%;font-size: 12px;background: #a0bfeb;border: #ccc 1px solid; border-radius: 3px;border-collapse: collapse;border-spacing: 0;box-shadow: 0 1px 2px #d1d1d1;' cellpadding='1' cellspacing='1' >";
    GridStr += "<thead><tr >"
    GridStr += "<th style='width:5%;' class='GridHader'>S.No</th>"
    GridStr += "<th style='width:25%;' class='GridHader'>Country Name</th>";
    GridStr += "<th style='width:20%;' class='GridHader'>State Code</th>";
    GridStr += "<th style='width:25%;' class='GridHader'>State Name</th>";
    GridStr += "<th style='width:25%;' class='GridHader'>State Alias</th>";
    GridStr += "</tr>";
    GridStr += "</thead>";
    return GridStr;
}

function BindDetailGrid() {
    jq("#view").empty();
    var GridStr = "";
    if (dsmain.length > 0) {
        GridStr += CreateGridHeader();
        for (count = 0; count < dsmain.length; count++) {

            GridStr += "<tr>"
            GridStr += "<td><input type = 'text' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:center;width:99%;height:25px; text-transform: uppercase;'   id=txtsno_" + count + " value=' " + parseInt(count + 1) + " ' disabled></td>";
            GridStr += "<td><input type = 'text' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:right;width:99%;height:25px; text-transform: uppercase;'  id=txtcountrycode_" + count + " value = '" + dsmain[count].COUNTRY_CODE + "' disabled></td>";
            GridStr += "<td><input type = 'text' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:center;width:99%;height:25px; text-transform: uppercase;' id=txtstatecode_" + count + " value = '" + dsmain[count].STATE_CODE + "' disabled></td>";
            GridStr += "<td><input type = 'text' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:center;width:99%;height:25px; text-transform: uppercase; color:blue;'  id=txtstatename_" + count + " value = '" + dsmain[count].STATE_NAME + "' onclick=\"ViewHeaderData(this.id);\"></td>";
            GridStr += "<td><input type = 'text' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:center;width:99%;height:25px; text-transform: uppercase;' id=txtstatealis_" + count + " value = '" + dsmain[count].STATE_ALIAS + "' disabled></td>";
            GridStr += "</tr>";
        }
    }
    else {
        GridStr += CreateGridHeader();
        jq("#savebtn").hide();
    }
    GridStr += "</table>"
    jq('#view').append(GridStr);
    jq('#view').fadeIn("slow");
    jq("#view").attr('disabled', false);
}

function ViewHeaderData(id) {
    id = id.split('_')[1];
    jq('#txtcountryname').val(jq("#txtcountrycode_" + id).val());
    jq('#txtstatecode').val(jq("#txtstatecode_" + id).val());
    jq('#txtstatename').val(jq("#txtstatename_" + id).val());
    jq('#txtstatealies').val(jq("#txtstatealis_" + id).val());
    return false;
}
