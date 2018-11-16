var browser = navigator.appName;
var jq = jQuery.noConflict();


$(document).ready(function () {
    BindGridRowEvents();
    BindTabShownEvents();
});

function OnloadClear() {
    try {
        jq("#txtTeamId,#txtTeamName,#txtTeamNickName").val('');
        jq("#txtTeamId").attr('disabled', true);
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}
function SaveUpdateDeleteRec(Flag) {
    try {
        var DmlType = "";
        if (Flag == "D") {
            DmlType = "D";
        }
        else {
            DmlType = "I";
        }
        if (jq("#txtTeamName").val() == "") {
            alert('Please Fill Team Name.!!');
            jq("#txtTeamName").focus();
            return false;
        }
        var Id = jq("#txtTeamId").val()
        var Name = jq("#txtTeamName").val()
        var NickName = jq("#txtTeamNickName").val()
        var UserId = jq("#HndUserId").val();
        var Dateformat = "dd/mm/yyyy";
        var Extra1 = "", Extra2 = "", Extra3 = "", Extra4 = "", Extra5 = "";


        var ParameterValueArray = [Id, Name, NickName, DmlType, UserId, Dateformat, Extra1, Extra2, Extra3, Extra4, Extra5];

        jq.ajax({
            type: "POST",
            url: "ManageTeam.aspx/SaveUpdateRec",
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

function FillNickName() {
    try {
        jq('#txtTeamNickName').val(jq('#txtTeamName').val());
        return false;
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}

function ResetSearch() {
    jq("#txtSearchTeamName,#txtSearchTeamNickName").val('');
    BindGridRowEvents();
}

function BindGridRowEvents() {
    $(document).on({
        click: function () {
            var row = $(this).closest("tr");

            jq('#txtTeamId').val(FindNBSP($("td", row).eq(0).html()));
            jq('#txtTeamName').val(FindNBSP($("td", row).eq(1).html()));
            jq('#txtTeamNickName').val(FindNBSP($("td", row).eq(2).html()));
            jq("#btnDelete").attr('disabled', false);

            $('.nav-tabs a[href="#manage"]').tab('show');
        }
    }, '.row-gv td');

    $(document).on({
        click: function () {
            var row = $(this).closest("tr");

            jq('#txtTeamId').val(FindNBSP($("td", row).eq(0).html()));
            jq('#txtTeamName').val(FindNBSP($("td", row).eq(1).html()));
            jq('#txtTeamNickName').val(FindNBSP$("td", row).eq(2).html());
            jq("#btnDelete").attr('disabled', false);

            $('.nav-tabs a[href="#manage"]').tab('show');
        }
    }, '.alternateRow-gv td');

    $(document).on({
        mouseenter: function () {
            $(this).addClass('row-hover');
        },
        mouseleave: function () {
            $(this).removeClass('row-hover');
        }
    }, '.row-gv');

    $(document).on({
        mouseenter: function () {
            $(this).addClass('row-hover');
        },
        mouseleave: function () {
            $(this).removeClass('row-hover');
        }
    }, '.alternateRow-gv');
}

function BindTabShownEvents() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        if (target == '#search') {
            BindGridRowEvents();
            $('#btnSearch').click()
        }
    });
}