var browser = navigator.appName;
var jq = jQuery.noConflict();

function SumbitData() {

}

function ClosePage() {
    if (confirm("Do You Want To Close This Page")) {
        window.close();
        return false;
    }
    return false;
}
function SaveRecord() {
    try {
            var ParameterValueArray = [];
            ParameterValueArray.push(jq("#txtusername").val().toUpperCase());
            ParameterValueArray.push(jq("#txtuseremail").val());
            ParameterValueArray.push(jq("#txtuserdob").val());
            ParameterValueArray.push(jq("#txtuserrepwd").val().toUpperCase());
            ParameterValueArray.push(jq("#txtuserphone").val());
            ParameterValueArray.push('');
            ParameterValueArray.push('U');
            ParameterValueArray.push('I');
            ParameterValueArray.push('');
            ParameterValueArray.push('');
            ParameterValueArray.push('');
            ParameterValueArray.push('');
            ParameterValueArray.push('');
            ParameterValueArray.push('');
            ParameterValueArray.push('');
            ParameterValueArray.push('');
            ParameterValueArray.push('');
            ParameterValueArray.push('');
            jq.ajax({
                type: "POST",
                url: "DisCommonFunctionPage.aspx/SaveExecdata",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
                success: function (result) {
                    var res = jq.parseJSON(result.d)
                    alert(res[0].MSG)
                    jq("#txtusername,#txtuseremail,#txtuserdob,#txtuserrepwd,#txtuserphone,#txtuserpwd").val('')
                    //jq('#loginModal').hide();
                    $('#loginModal').modal('hide');
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

function Login() {
    try {
        var ParameterValueArray = [];
        ParameterValueArray.push('');
        ParameterValueArray.push(jq("#txtuserloginemail").val());
        ParameterValueArray.push('');
        ParameterValueArray.push(jq("#txtuserloginpwd").val().toUpperCase());
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('U');
        ParameterValueArray.push('L');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        
        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/SaveExecdata",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            success: function (result) {
                var res = jq.parseJSON(result.d)
                if (res.length > 0) {
                    //BindPrdTypeCallBack(jq.parseJSON(result.d));
                    SendSessonData(res)
                    return false;
                }
                else {
                    alert('Check User Name Or Password !!');
                    return false;
                }
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

function SendSessonData(ds) {
    var name = ds[0].LOGIN_NAME
    var email_id = ds[0].EMAIL_ID
    jq.ajax({
        type: "POST",
        url: "DisCommonFunctionPage.aspx/GetSessonValue",
        contentType: "application/json; charset=utf-8",
        data: "{'name':'" + name + "', 'email_id':'" + email_id + "' }",
        success: function (result) {
            var res = jq.parseJSON(result.d)
            window.location.href = "UserDashboard.aspx"
            $('#myModal').modal('hide');              
        },
        error: function (result) {
            alert('Oh no :(');
        }
    });
    return false;
}

//RegisterPubuser

function RegisterPubuser() {
    try {
        var ParameterValueArray = [];
        ParameterValueArray.push(jq("#pubname").val().toUpperCase());
        ParameterValueArray.push(jq("#pubemail").val());
        ParameterValueArray.push('');
        ParameterValueArray.push(jq("#pubpassword").val().toUpperCase());
        ParameterValueArray.push('');
        ParameterValueArray.push(jq("#pubteach").val());
        ParameterValueArray.push('P');
        ParameterValueArray.push('I');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/SaveExecdata",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
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

//==================================================================ADMIN LOGIN FUNCTION=============================================================================

function AdminLogin() {
    try {
        var ParameterValueArray = [];
        ParameterValueArray.push('');
        ParameterValueArray.push(jq("#adminemail").val());
        ParameterValueArray.push('');
        ParameterValueArray.push(jq("#adminpassword").val().toUpperCase());
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('A');
        ParameterValueArray.push('L');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');

        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/SaveExecdata",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            success: function (result) {
                var res = jq.parseJSON(result.d)
                if (res.length > 0) {
                    //SendSessonData(res)
                    window.location.href = "AdminPanel.aspx"
                    return false;
                }
                else {
                    alert('Check User Name Or Password !!');
                    return false;
                }
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

//=======================================================================Function for Save Info Record ==============================================================

function SaveInfoRecord() {
    
    try {
        var ParameterValueArray = [];
        ParameterValueArray.push('INSERT');
        ParameterValueArray.push('1');
        ParameterValueArray.push(jq('#hdnuserid').val());
        ParameterValueArray.push(jq('#hdntopicid').val());
        ParameterValueArray.push(jq("#txtinfotitle").val().toUpperCase());
        ParameterValueArray.push(jq("#txtinfokeyword").val().toUpperCase());
        ParameterValueArray.push(jq("#drpinfolanguage").val());
        ParameterValueArray.push(jq("#txtinfodesp").val().toUpperCase());
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
       
        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/SaveInoRecord",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                jq("#txtinfotitle,#txtinfokeyword,#drpinfolanguage,#txtinfodesp").val('')
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

