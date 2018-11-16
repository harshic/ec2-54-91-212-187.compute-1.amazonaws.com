var browser = navigator.appName;
var jq = jQuery.noConflict();

function OnloadClear() {
    try {
        jq("#txtEntryDate,#txtAdhoc,#txtRemarks").val('');
        jq("#txtEntryDate").val(jq("#HdnServerDate").val());
        jq("#txtEntryDate").attr('disabled', true);
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}
function SaveRec() {
    try {
        if (jq("#txtEntryDate").val() == "") {
            alert('Please Fill Entry Date.!!');
            jq("#txtEntryDate").focus();
            return false;
        }
        if (jq("#txtAdhoc").val() == "") {
            alert('Please Fill Adhoc.!!');
            jq("#txtAdhoc").focus();
            return false;
        }

        var Id = "";
        var UserId = jq("#HndUserId").val()
        var Adhoc = jq("#txtAdhoc").val()
        var EntryDate = jq("#txtEntryDate").val()
        var pdateformat = "dd/mm/yyyy";
        var Remarks = jq("#txtRemarks").val()
        var DmlType = "I";
        var extra1 = "", extra2 = "", extra3 = "", extra4 = "", extra5 = "";
        var extra6 = "", extra7 = "", extra8 = "", extra9 = "", extra10 = "";

        var ParameterValueArray = [Id, UserId, Adhoc, EntryDate, pdateformat, Remarks, DmlType,
                                   extra1, extra2, extra3, extra4, extra5, extra6, extra7, extra8, extra9, extra10];

        jq.ajax({
            type: "POST",
            url: "ManageAdhoc.aspx/SaveUpdateRec",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                OnloadClear();
            },
            error: function (result) {
                alert(result.status + ' ' + result.statusText);
                return false;
            }
        });
    }
    catch (ex) {
        alert(ex);
        return false;
    }
    return false;
}

