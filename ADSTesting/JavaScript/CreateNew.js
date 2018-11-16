var browser = navigator.appName;
var jq = jQuery.noConflict();
var dsmain = "";

$(window).load(function () {
    //alert("window load occurred!");
    jq('#GridTab').slideDown("fast");
    jq('#tabinfo').css("display", "block");
    jq("#tabimg,#tabvideo,#tabcontent,#tabPricing").css("display", "none");
    //jq("#btninfoupdate,#btnimageupdate,#btnvideoupdate,#btnupdatecontent,#btnpriceupdate").css("display", "none"); 
});


function showimagepreview(input) {
if (input.files && input.files[0]) {
var filerdr = new FileReader();
filerdr.onload = function(e) {
    $('#Img1').attr('src', e.target.result);
}
filerdr.readAsDataURL(input.files[0]);
}
}



function OnClickTab(val) {
    if (val == "Info") {
        jq('#tabinfo').css("display", "block");
        jq("#tabimg,#tabvideo,#tabcontent,#tabPricing").css("display", "none");
    }
    else if (val == "Image") {
        jq('#tabimg').css("display", "block");
        jq("#tabinfo,#tabvideo,#tabcontent,#tabPricing").css("display", "none");
    }
    else if (val == "Video") {
        jq('#tabvideo').css("display", "block");
        jq("#tabinfo,#tabimg,#tabcontent,#tabPricing").css("display", "none");
    }
    else if (val == "Content") {
        jq('#tabcontent').css("display", "block");
        jq("#tabinfo,#tabimg,#tabvideo,#tabPricing").css("display", "none");
    }
    else{
        jq('#tabPricing').css("display", "block");
        jq("#tabinfo,#tabimg,#tabvideo,#tabcontent").css("display", "none");
    }
    OnClickContentTab();
    jq('#tabAddChapter').css("display", "block");
    jq("#tabAddLecture,#tabAddAnotherChapter").css("display", "none");
}

function OnClickContentTab(val) {

    if (val == "AddChapter") {
        jq('#tabAddChapter').css("display", "block");
        jq("#tabAddLecture,#tabAddAnotherChapter").css("display", "none");
    }
    else if (val == "AddLecture") {
        jq('#tabAddLecture').css("display", "block");
        jq("#tabAddChapter,#tabAddAnotherChapter").css("display", "none");
    }
    else {
        jq('#tabAddAnotherChapter').css("display", "block");
        jq("#tabAddLecture,#tabAddChapter").css("display", "none");
    }
}
function GenerateToicId() {
    try {
        var title = jq("#txttitle").val()
        var ParameterValueArray = [title];
        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/GenerateTopicId",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                if (parseInt(res[0].TOPICID) == "0") {
                    jq('#hdntopicid').val('1')
                }
                else {
                    jq('#hdntopicid').val(res[0].TOPICID)
                }
                SaveInfoRec();
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
function SaveInfoRec() {
    try{
        var action = "INSERT";
        var id = "";
        var userid = jq('#hdnuserid').val()
        var topicid = jq('#hdntopicid').val()
        var title = jq("#txttitle").val()
        var keywoard = jq("#txtkeyword").val()
        var langurage = jq("#drpinfolanguage").val()
        var descripton = jq("#txtdes").val()
        var ParameterValueArray = [action, id, userid, topicid, title, keywoard, langurage, descripton];
        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/SaveInoRecord",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                jq("#txttitle,#txtkeyword,#drpinfolanguage,#txtdes").val('')
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

function SaveContentRec() {
    try {
        var action = "INSERT";
        var id = "";
        var userid = jq('#hdnuserid').val()
        var topicid = jq('#hdntopicid').val()
        var chapter = jq("#txtChapter").val()
        var chapterdesp = jq("#txtChapterDescription").val()
        var leacture = jq("#txtleacture").val()  
        var leacturedesp = jq("#txtlecturedes").val()
        var anotherlecture = jq("#txtanotherlacturename").val()
        var anotherlecturedesp = jq("#txtanotherlacturedes").val()
        var ParameterValueArray = [action, id, userid, topicid, chapter, chapterdesp, leacture, leacturedesp, anotherlecture, anotherlecturedesp];
        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/SaveContentRecord",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                jq("#txtChapter,#txtChapterDescription,#txtleacture,#txtlecturedes,#txtanotherlacturename,#txtanotherlacturedes").val('')
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

function SavePriceRec() {
    try {
        var action = "INSERT";
        var id = "";
        var userid = jq('#hdnuserid').val()
        var topicid = jq('#hdntopicid').val()
        var PriceType = jq("#drppricetype").val()
        var Price = jq("#txtprice").val()
        var Discount = jq("#txtdiscount").val()
        var ParameterValueArray = [action, id, userid, topicid, PriceType, Price, Discount];
        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/SavePriceRecord",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                jq("#drppricetype,#txtprice,#txtdiscount").val('')
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

function ExecuteRecord() {
    try {
        var exectitle = jq('#txttopicid').val()
        var str = exectitle.split("~");
        var topicid = str[0];
        var action = "EXECUTE";
        var id = "";
        var userid = jq('#hdnuserid').val()
        var topicid = topicid;
        var ImageUrl = "";
        var ParameterValueArray = [action, id, userid, topicid, ImageUrl];
        jq.ajax({
            type: "POST",
            url: "CreateCourseNew.aspx/EcecuteRecord",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                dsmain = jq.parseJSON(result.d)
                if (dsmain.length > 0) {
                    BindHdrData();
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

function BindHdrData() {
    jq('#hdntopicid').val(chackvalue(dsmain[0].TopicID));
    jq('#hdnuserid').val(chackvalue(dsmain[0].UserId));
    jq('#txttitle').val(chackvalue(dsmain[0].Title));
    jq('#txtkeyword').val(chackvalue(dsmain[0].Keywords));
    jq('#drpinfolanguage').val(chackvalue(dsmain[0].Language));
    jq('#txtdes').val(chackvalue(dsmain[0].Description));
    var photopath = "UploadImage" + "\\" + dsmain[0].ImageUrl;
    document.getElementById('Img1').src = photopath; 
    jq('#txtChapter').val(chackvalue(dsmain[0].ChapterTitle));
    jq('#txtChapterDescription').val(chackvalue(dsmain[0].ChapterDes));
    jq('#txtleacture').val(chackvalue(dsmain[0].LectureName));
    jq('#txtlecturedes').val(chackvalue(dsmain[0].LectureDes));
    jq('#txtanotherlacturename').val(chackvalue(dsmain[0].AnotherName));
    jq('#txtanotherlacturedes').val(chackvalue(dsmain[0].AnotherDes));
    jq('#drppricetype').val(chackvalue(dsmain[0].PriceType));
    jq('#txtprice').val(chackvalue(dsmain[0].Price));
    jq('#txtdiscount').val(chackvalue(dsmain[0].Discount));
    jq("#btninfoupdate,#btnimageupdate,#btnvideoupdate,#btnupdatecontent,#btnpriceupdate").css("display", "block");
    jq("#btninfosave,#btnimagesave,#btnsavevedio,#btnsavecontent,#btnpricesave").css("display", "none");
}

function chackvalue(value) {
    var value = value;
    if (value == "" || value == null || value == "null" || value == undefined || value == "undefined") {
        value = "";
    }
    return value;
}

//=================================================================Update Record=====================================================================================

function UpdateInfoRec() {
    try {
        var action = "UPDATE";
        var id = "";
        var userid = jq('#hdnuserid').val()
        var topicid = jq('#hdntopicid').val()
        var title = jq("#txttitle").val()
        var keywoard = jq("#txtkeyword").val()
        var langurage = jq("#drpinfolanguage").val()
        var descripton = jq("#txtdes").val()
        var ParameterValueArray = [action, id, userid, topicid, title, keywoard, langurage, descripton];
        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/SaveInoRecord",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                jq("#txttitle,#txtkeyword,#drpinfolanguage,#txtdes").val('')
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

function UpdateContentRec() {
    try {
        var action = "UPDATE";
        var id = "";
        var userid = jq('#hdnuserid').val()
        var topicid = jq('#hdntopicid').val()
        var chapter = jq("#txtChapter").val()
        var chapterdesp = jq("#txtChapterDescription").val()
        var leacture = jq("#txtleacture").val()
        var leacturedesp = jq("#txtlecturedes").val()
        var anotherlecture = jq("#txtanotherlacturename").val()
        var anotherlecturedesp = jq("#txtanotherlacturedes").val()
        var ParameterValueArray = [action, id, userid, topicid, chapter, chapterdesp, leacture, leacturedesp, anotherlecture, anotherlecturedesp];
        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/SaveContentRecord",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                jq("#txtChapter,#txtChapterDescription,#txtleacture,#txtlecturedes,#txtanotherlacturename,#txtanotherlacturedes").val('')
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

function UpdatePriceRec() {
    try {
        var action = "UPDATE";
        var id = "";
        var userid = jq('#hdnuserid').val()
        var topicid = jq('#hdntopicid').val()
        var PriceType = jq("#drppricetype").val()
        var Price = jq("#txtprice").val()
        var Discount = jq("#txtdiscount").val()
        var ParameterValueArray = [action, id, userid, topicid, PriceType, Price, Discount];
        jq.ajax({
            type: "POST",
            url: "DisCommonFunctionPage.aspx/SavePriceRecord",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ParameterValueArray: ParameterValueArray }),
            dataType: "json",
            success: function (result) {
                var res = jq.parseJSON(result.d)
                alert(res[0].MSG)
                jq("#drppricetype,#txtprice,#txtdiscount").val('')
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