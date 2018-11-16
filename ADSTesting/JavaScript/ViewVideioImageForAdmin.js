var browser = navigator.appName;
var jq = jQuery.noConflict();
var dsmain = "";
var count = 0;

$(window).load(function () {
    FetchAdminVideoImage();
    return false;
});

function FetchAdminVideoImage() {
    var topicid = "";
    var userid = "";

}

function FetchAdminVideoImage() {
    try {
        var action = "EXECUTE";
        var userid = jq('#hdnuserid').val()
        var topicid = jq('#hdntoicid').val()
        var ParameterValueArray = [action, userid, topicid];
        jq.ajax({
            type: "POST",
            url: "ViewVideioImageForAdmin.aspx/EcecuteRecord",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                dsmain = jq.parseJSON(result.d)
                if (dsmain.length > 0) {
                    var photopath = "UploadImage" + "\\" + dsmain[0].ImageUrl;
                    document.getElementById('thinkimg').src = photopath;
                    return false;
                }
                else {
                    alert('There is no data !');
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