var browser = navigator.appName;
var jq = jQuery.noConflict();


function OnloadClear() {
    try {
        jq("#txtCurrentPassword,#txtNewPassword,#txtRetypeNewpassword").val('');
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}

function SaveChanges() {
    try {
        if (jq("#txtCurrentPassword").val() == "") {
            alert('Please Fill Current Password.!!');
            jq("#txtCurrentPassword").focus();
            return false;
        }
        if (jq("#txtNewPassword").val() == "") {
            alert('Please Fill New Password');
            jq("#txtNewPassword").focus();
            return false;
        }
        if (jq("#txtRetypeNewpassword").val() == "") {
            alert('Please Retype New Password');
            jq("#txtRetypeNewpassword").focus();
            return false;
        }
        if (jq("#txtNewPassword").val() != jq("#txtRetypeNewpassword").val()) {
            alert('Password do not match');
            jq("#txtRetypeNewpassword").val('');
            jq("#txtRetypeNewpassword").focus();
            return false;
        }
        var ParameterValueArray = [];
        ParameterValueArray.push(jq("#HndUserId").val().toUpperCase());
        ParameterValueArray.push(jq("#txtCurrentPassword").val());
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('U');
        ParameterValueArray.push(jq("#txtRetypeNewpassword").val());
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');
        ParameterValueArray.push('');

        jq.ajax({
            type: "POST",
            url: "UserLogin.aspx/AdminLogin",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            success: function (result) {
                var res = jq.parseJSON(result.d)
                if (res[0].MSG == "Your Password Change Successfully.!!") {
                    alert(res[0].MSG);
                    UserLogOut();
                }
                else {
                    alert(res[0].MSG);
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

function UserLogOut() {
    try {
        jq.ajax({
            type: "POST",
            url: "Default.aspx/Logout",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                window.parent.location.href = data.d;
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
}


