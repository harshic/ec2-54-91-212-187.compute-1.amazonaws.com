var browser = navigator.appName;
var jq = jQuery.noConflict();

function OnloadClear() {
    try {
        jq("#txtdate,#UploadXlsData").val('');
        jq("#lblmessage").text('');
        jq("#txtdate").val(jq("#HdnServerDate").val());
        jq("#divwaitindimg").hide();
    }
    catch (ex) {
        alert(ex);
        return false;
    }
}

function ViewWaitngImage() {
    jq("#toPopup").fadeIn(0500);
    jq("#backgroundPopup").css("opacity", "0.7");
    jq("#backgroundPopup").fadeIn(0001);
    jq('#divwaitindimg').show();
}

function SaveDailyStatusOnJs() {
    jq('#divwaitindimg').hide("slow");
    jq("#toPopup").fadeOut("normal");
    jq("#backgroundPopup").fadeOut("normal");
    OnloadClear();
    return false;
}