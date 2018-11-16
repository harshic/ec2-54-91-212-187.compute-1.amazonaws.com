var browser = navigator.appName;
var jq = jQuery.noConflict();


window.onload = function () {
    jq("#divLogin").show();
    jq("#divRegister").hide();
    return false;
}

function FocusToLoginButton(e) {
    var keyCode = e.which ? e.which : e.keyCode
    if (keyCode == 13) {
        jq("#btnlogin").focus();
        return false;
    }
}

function Login() {
    try {
        if (jq("#txtuser_name").val() == "") {
            alert('Please Fill User Id');
            jq("#txtuser_name").focus();
            return false;
        }
        if (jq("#txt_password").val() == "") {
            alert('Please Fill Passward');
            jq("#txtuser_name").focus();
            return false;
        }
        var ParameterValueArray = [];
        ParameterValueArray.push(jq("#txtuser_name").val().toUpperCase());
        ParameterValueArray.push(jq("#txt_password").val().toUpperCase());
        ParameterValueArray.push(''); ParameterValueArray.push('');
        ParameterValueArray.push('L'); ParameterValueArray.push('');
        ParameterValueArray.push(''); ParameterValueArray.push('');
        ParameterValueArray.push(''); ParameterValueArray.push('');
        
         jq.ajax({
            type: "POST",
            url: "UserLogin.aspx/AdminLogin",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            success: function (result) {
                var res = jq.parseJSON(result.d)
                if (res.length > 0) {
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


function GetSessonData(ds) {
    var ParameterValueArray = [];
    ParameterValueArray.push(jq("#txtuser_name").val().toUpperCase());
    ParameterValueArray.push('');
    ParameterValueArray.push('');
    ParameterValueArray.push('');
    ParameterValueArray.push('');
    ParameterValueArray.push('');

    /*var res = UserLogin.GetUserPref(ParameterValueArray);
    if (res.error != null) {
        alert(res.error.description);
        return false;
    }
    else {
        SendSessonData(res.value)
    }*/
     jq.ajax({
        type: "POST",
        url: "UserLogin.aspx/GetUserPref",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
        success: function (result) {
            var res = jq.parseJSON(result.d)
            if (res.length > 0) {
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
    return false;
}

function SendSessonData(ds) {
    try{
        var UserName = ds[0].Name;
        var UserId = ds[0].EmailId;
        var TeamId = ds[0].TeamId;
        var Dateformat = "dd/mm/yyyy";
        var IsManager = ds[0].IsManager;
        var IsAdmin = ds[0].IsAdmin;
    
        jq.ajax({
            type: "POST",
            url: "UserLogin.aspx/GetSessonValue",
            contentType: "application/json; charset=utf-8",
            data: "{'UserName':'" + UserName + "', 'UserId':'" + UserId + "', 'TeamId':'" + TeamId + "', 'Dateformat':'" + Dateformat + "', 'IsManager':'" + IsManager + "', 'IsAdmin':'" + IsAdmin + "' }",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                window.location.href = "Default.aspx"
            },
            error: function (result) {
                alert('There was some problem in login');
                return false;
            }
        });
        return false;
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}


function OpenRegisterTab() {
    try {
        jq("#divRegister").show();
        jq("#divLogin").hide();
        return false;
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}

function OpenLoginTab() {
    try {
        jq("#divLogin").show();
        jq("#divRegister").hide();
        return false;
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}

function RegiterUser() {
    try {
        var IsManager = 0;
        if (jq('#ChkIsManager').is(":checked")) {
            IsManager = 1;
        }
        else{
            IsManager = 0;
        }
        if (jq("#txtregisterusername").val() == "") {
            alert('Please Fill User Name');
            jq("#txtregisterusername").focus();
            return false;
        }
        if (jq("#txtregisterloginid").val() == "") {
            alert('Please Fill Login Id');
            jq("#txtregisterloginid").focus();
            return false;
        }
        if (jq("#txtregisterpwd").val() == "") {
            alert('Please Fill Login Password');
            jq("#txtregisterpwd").focus();
            return false;
        }
        if (jq("#drpregisterteamname").val() == "") {
            alert('Please Fill Team Name');
            jq("#drpregisterteamname").focus();
            return false;
        }

        var ParameterValueArray = [];
        ParameterValueArray.push(jq("#txtregisterloginid").val());
        ParameterValueArray.push(jq("#txtregisterpwd").val());
        ParameterValueArray.push(jq("#txtregisterusername").val());
        ParameterValueArray.push(jq("#drpregisterteamname").val());
        ParameterValueArray.push('I'); ParameterValueArray.push(IsManager);
        ParameterValueArray.push(''); ParameterValueArray.push('');
        ParameterValueArray.push(''); ParameterValueArray.push('');

        jq.ajax({
            type: "POST",
            url: "UserLogin.aspx/AdminLogin",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            success: function (result) {
                var res = jq.parseJSON(result.d)
                if (res.length > 0) {
                    alert(res[0].MSG);
                    jq("#txtregisterusername,#txtregisterloginid,#txtregisterpwd").val('');
                    jq("#drpregisterteamname").val('-1');
                    $("#ChkIsManager").prop("checked", false);
                    return false;
                }
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