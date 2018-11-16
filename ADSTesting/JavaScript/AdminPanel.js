var browser = navigator.appName;
var jq = jQuery.noConflict();
var dsmain = "";
var count = 0;

$(window).load(function () {
    FetchAdminAprovedData();
    return false;
});

function CreateGridHeader() {
    var GridStr = "";
    GridStr += "<table  id='mytable' style='overflow:auto;width: 100%;font-size: 12px;background: #a0bfeb;border: #ccc 1px solid; border-radius: 3px;border-collapse: collapse;border-spacing: 0;box-shadow: 0 1px 2px #d1d1d1;' cellpadding='1' cellspacing='1' >";
    GridStr += "<thead><tr >"
    GridStr += "<th style='width:2%;' class='GridHader'>S.No</th>"
    GridStr += "<th style='width:5%;' class='GridHader'>ID</th>";
    GridStr += "<th style='width:15%;' class='GridHader'>Title</th>";
    GridStr += "<th style='width:14%;' class='GridHader'>User</th>";
    GridStr += "<th style='width:14%;' class='GridHader'>Post Date</th>";
    GridStr += "<th style='width:14%;' class='GridHader'>Visits</th>";
    GridStr += "<th style='width:14%;' class='GridHader'>Rating</th>";
    GridStr += "<th style='width:7%;' class='GridHader'>Status</th>";
    GridStr += "<th style='width:15%;' class='GridHader'>Pass/Reject <br/> <input type='checkbox' id='CheckAllBoxPass' onclick='javascript:return CheckAllBoxPassFun();'  /></th>";
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
            GridStr += "<td><input type = 'text' class='class_srno' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:center;width:99%;height:25px; text-transform: uppercase;'   id=txtsno_" + count + " value=' " + parseInt(count + 1) + " ' disabled></td>";
            GridStr += "<td><input type = 'text' class='class_disabled' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:left;width:99%;height:25px; text-transform: uppercase;'  id=txttopicid_" + count + " value = '" + dsmain[count].TopicID + "' disabled></td>";
            GridStr += "<td><input type = 'text' class='class_disabled' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:left;width:99%;height:25px; text-transform: uppercase;'  id=txttitle_" + count + " value = '" + dsmain[count].Title + "' disabled></td>";
            GridStr += "<td><input type = 'text' class='class_disabled' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:left;width:99%;height:25px; text-transform: uppercase;' id=txtuser_" + count + " value = '" + dsmain[count].UserId + "' disabled></td>";
            GridStr += "<td><input type = 'text' class='class_disabled' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:left;width:99%;height:25px; text-transform: uppercase;' id=txtpostdate_" + count + " value = '" + dsmain[count].Date + "' disabled></td>";
            GridStr += "<td><input type = 'text' class='class_disabled' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:left;width:99%;height:25px; text-transform: uppercase;' id=txtvisit_" + count + " value = ' ' disabled></td>";
            GridStr += "<td><input type = 'text' class='class_disabled' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:left;width:99%;height:25px; text-transform: uppercase;'  id=txtrating_" + count + " value = ' ' disabled></td>";
            GridStr += "<td>&nbsp;<img style='width:30px; height:20px;' src=\"Images/edit.jpg\" id=viewrec_" + count + " onclick=\"ViewRecord(this.id);\" >&nbsp;&nbsp;<img style='width:30px; height:20px;height:25px;' src=\"Images/delete.png\" id=deleterec_" + count + " onclick=\"DeleteRowWiseData(this.id);\" ></td>";
            GridStr += "<td><input type = 'checkbox' class='class_enabled' style='font-size:small;font-family:Trebuchet MS;color:black;cursor:pointer;vertical-align:top; padding-right:2px; text-align:left;width:99%;height:15px; text-transform: uppercase;'  id=txtcheck_" + count + " ></td>";
            GridStr += "</tr>";
        }
    }
    else {
        GridStr += CreateGridHeader();
        jq("#savebtn").hide();
    }
    GridStr += "</table>"
    jq('#view').append(GridStr);
    jq('#view').slideDown("slow");
    jq("#view").attr('disabled', false);
}

function FetchAdminAprovedData() {
    var Action = "EXECUTE";
    var UserID = "";
    var TopicI = "";
    var ParameterValueArray = [Action, UserID, TopicI];
    jq.ajax({
        type: "POST",
        url: "DisCommonFunctionPage.aspx/FetchAdminAprData",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
        dataType: "json",
        success: function (result) {
            dsmain = jq.parseJSON(result.d)
            
                BindDetailGrid();
                return false;
            
           
        },
        error: function (result) {
            alert(result.status + ' ' + result.statusText);
        }
    });
}

function PassRecord() {
    try {
        for (var i = 0; i < count; i++) {
            if (jq("#txtcheck_" + i).is(':checked')) {
                var action = "UPDATEPASS";
                var topicid = jq("#txttopicid_" + i).val()
                var userid = jq("#txtuser_" + i).val()
                var ParameterValueArray = [action, userid, topicid];
                jq.ajax({
                    type: "POST",
                    url: "DisCommonFunctionPage.aspx/FetchAdminAprData",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
                    dataType: "json",
                    success: function (result) {
                        var res = jq.parseJSON(result.d)
                        alert(res[0].MSG)
                    },
                    error: function (result) {
                        alert(result.status + ' ' + result.statusText);
                    }
                });
            }
        }
    }
    catch (ex) {
        alert(ex);
        return false;
    }
    return false;
}

function RejectRecord() {
    try {
        for (var i = 0; i < count; i++) {
            if (jq("#txtcheck_" + i).is(':checked')) {
                var action = "UPDATEREJECT";
                var topicid = jq("#txttopicid_" + i).val()
                var userid = jq("#txtuser_" + i).val()
                var ParameterValueArray = [action, userid, topicid];
                jq.ajax({
                    type: "POST",
                    url: "DisCommonFunctionPage.aspx/FetchAdminAprData",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
                    dataType: "json",
                    success: function (result) {
                        var res = jq.parseJSON(result.d)
                        alert(res[0].MSG)
                    },
                    error: function (result) {
                        alert(result.status + ' ' + result.statusText);
                    }
                });
            }
        }
    }
    catch (ex) {
        alert(ex);
        return false;
    }
    return false;
}

function DeleteRowWiseData(id) {
    try {
        id = id.split('_')[1];
        var action = "DELETE";
        var topicid = jq("#txttopicid_" + id).val()
        var userid = jq("#txtuser_" + id).val()
        var ParameterValueArray = [action, userid, topicid];
               jq.ajax({
                    type: "POST",
                    url: "DisCommonFunctionPage.aspx/FetchAdminAprData",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
                    dataType: "json",
                    success: function (result) {
                        var res = jq.parseJSON(result.d)
                        alert(res[0].MSG)
                        FetchAdminAprovedData();
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

function CheckAllBoxPassFun() {
    if (document.getElementById('CheckAllBoxPass').checked == true) {
        for (var i = 0; i < count; i++) {
            document.getElementById('txtcheck_' + i).checked = true;
        }
    }
    else {
        for (var i = 0; i < count; i++) {
            document.getElementById('txtcheck_' + i).checked = false;
        }
    }
}

function ViewRecord(id) {
    id = id.split('_')[1];
    var topicid = jq("#txttopicid_" + id).val()
    var userid = jq("#txtuser_" + id).val()
    var result = window.open("ViewVideioImageForAdmin.aspx?&topicid=" + topicid + "&userid=" + userid, 'menubar=no,resizable=yes,scrollbars=yes,location=yes,toolbar=yes');
    return false;
}