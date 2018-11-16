var browser = navigator.appName;
var jq = jQuery.noConflict();
var dsmain = "";
var count = 0;

$(document).ready(function ()
{
    BindGridRowEvents();
    BindTabShownEvents();
});

window.onload = function ()
{
    OnloadClear();
    return false;
}

function OnloadClear()
{
    jq("#btndelete").attr('disabled', true);
    jq("#btnsave,#btnclear").attr('disabled', false);
    jq("#txtcountrycode").attr('disabled', true);
    jq("#txtcountryname,#txtnickname").attr('disabled', false);
    jq("#txtcountrycode,#txtcountryname,#txtnickname").val('')
    action = "INSERT"
    jq("#txtcountryname").focus();
    return false;
}

function GenerateCountryCode()
{
    try
    {
        if (jq("#txtcountrycode").val() != "")
        {
            SaveRec();
            return false;
        }
        else
        {
            var tablename = "COUNTRY";
            var compcode = jq("#hdncompcode").val()
            var ParameterValueArray = [tablename, compcode];
            jq.ajax({
                type: "POST",
                url: "CommonPage.aspx/GenerateUniqueCode",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
                dataType: "json",
                success: function (result)
                {
                    var res = jq.parseJSON(result.d)
                    if (parseInt(res[0].COUNTRYCODE) == "0")
                    {
                        jq('#txtcountrycode').val('1')
                    }
                    else
                    {
                        jq('#txtcountrycode').val(res[0].COUNTRYCODE)
                    }
                    SaveRec();
                },
                error: function (result)
                {
                    alert(result.status + ' ' + result.statusText);
                }
            });
        }
    }
    catch (ex)
    {
        alert(ex);
        return false;
    }
    return false;
}

function SaveRec()
{
    try
    {
        var countrycode = jq("#txtcountrycode").val().toUpperCase();
        var countryname = jq("#txtcountryname").val().toUpperCase();
        var nickname = jq("#txtnickname").val().toUpperCase();

        if (!countryname.match(/\S/))
        {
            alert('Country Name is required');
            return;
        }
        if (!nickname.match(/\S/))
        {
            alert('Nick Name is required');
            return;
        }

        var action = "INSERT";
        var compcode = jq("#hdncompcode").val()        
        var status = 1;
        var userid = jq("#hdnuserid").val()
        var dateformate = jq("#hdndateformat").val()
        var extra1 = "", extra2 = "", extra3 = "", extra4 = "", extra5 = "";
        var ParameterValueArray = [action, compcode, countrycode, countryname, nickname, userid, dateformate, extra1, extra2, extra3, extra4, extra5];
        jq.ajax({
            type: "POST",
            url: "CountryMaster.aspx/SaveViewRec",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result)
            {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                OnloadClear();
            },
            error: function (result)
            {
                alert(result.status + ' ' + result.statusText);
            }
        });
    }
    catch (ex)
    {
        alert(ex);
        return false;
    }
    return false;
}

function DeleteRec()
{
    if (confirm("Do you want to delete this record."))
    {
        try
        {
            var action = "DELETE";
            var compcode = jq("#hdncompcode").val()
            var countrycode = jq("#txtcountrycode").val().toUpperCase();
            var countryname = jq("#txtcountryname").val().toUpperCase();
            var nickname = jq("#txtnickname").val().toUpperCase();
            var status = 0;
            var userid = jq("#hdnuserid").val()
            var dateformate = jq("#hdndateformat").val()
            var extra1 = "", extra2 = "", extra3 = "", extra4 = "", extra5 = "";
            var ParameterValueArray = [action, compcode, countrycode, countryname, nickname, status, userid, dateformate, extra1, extra2, extra3, extra4, extra5];
            jq.ajax({
                type: "POST",
                url: "CountryMaster.aspx/SaveViewRec",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
                dataType: "json",
                success: function (result)
                {
                    var res = jq.parseJSON(result.d)
                    alert(res[0].MSG)
                    OnloadClear();
                },
                error: function (result)
                {
                    alert(result.status + ' ' + result.statusText);
                }
            });
        }
        catch (ex)
        {
            alert(ex);
            return false;
        }
        return false;
    }
    else
    {
        return false;
    }
}

function ResetSearch()
{
    jq("#txtSearchCountryName,#txtSearchNickName").val('');
    BindGridRowEvents();
}

function BindGridRowEvents()
{
    $(document).on({
        click: function ()
        {
            var row = $(this).closest("tr");

                jq('#txtcountrycode').val($("td", row).eq(0).html());
                jq('#txtcountryname').val($("td", row).eq(1).html());
                jq('#txtnickname').val($("td", row).eq(2).html());
                jq("#btndelete").attr('disabled', false);

                $('.nav-tabs a[href="#manage"]').tab('show');
        }
    }, '.row-gv td');

    $(document).on({
        click: function ()
        {
            var row = $(this).closest("tr");

            jq('#txtcountrycode').val($("td", row).eq(0).html());
            jq('#txtcountryname').val($("td", row).eq(1).html());
            jq('#txtnickname').val($("td", row).eq(2).html());
            jq("#btndelete").attr('disabled', false);

            $('.nav-tabs a[href="#manage"]').tab('show');
        }
    }, '.alternateRow-gv td');

    $(document).on({
        mouseenter: function ()
        {
            $(this).addClass('row-hover');
        },
        mouseleave: function ()
        {
            $(this).removeClass('row-hover');
        }
    }, '.row-gv');

    $(document).on({
        mouseenter: function ()
        {
            $(this).addClass('row-hover');
        },
        mouseleave: function ()
        {
            $(this).removeClass('row-hover');
        }
    }, '.alternateRow-gv');
}

function BindTabShownEvents()
{
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e)
    {
        var target = $(e.target).attr("href") // activated tab
        if (target == '#search')
        {
            BindGridRowEvents();
            $('#btnSearch').click()
        }
    });
}

function FillNickName() {
    try{
        jq('#txtnickname').val(jq('#txtcountryname').val());
        return false;
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}