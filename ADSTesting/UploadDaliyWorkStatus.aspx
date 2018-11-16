<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UploadDaliyWorkStatus.aspx.cs" Inherits="ADSTesting.UploadDaliyWorkStatus" %>

<%@ Register Namespace="AjaxControlToolkit" Assembly="AjaxControlToolkit" TagPrefix="cc1" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link rel="stylesheet" href="css/bootstrap-3.3.6.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/dashboard.css" type="text/css" media="all" />
    <link href="Content/Common.css" rel="stylesheet" />
    <script src="JavaScript/jquery-1.9.1.js"></script>
    <script src="JavaScript/jquery-1.9.1.min.js"></script>
    <script src="JavaScript/CommonFunction.js"></script>
    <script src="JavaScript/UploadDaliyWorkStatus.js"></script>

    <title>Import</title>
</head>
<body onload="javascript:return OnloadClear();" onkeydown="javascript:return EnterTab(event,this.id);">
    <form id="Form1" runat="server">
        <ul id="tabs" class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#manage" aria-controls="manage" role="tab" data-toggle="tab">Import Daily Status</a></li>
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="Div1">
                <div class="marginLeft20">
                    <div class="form-inline">
                        <asp:ScriptManager ID="ScriptManager1" runat="server"
                            EnablePageMethods="true">
                        </asp:ScriptManager>
                        <div class="form-group">
                            <asp:TextBox ID="txtdate" runat="server" class="form-control" placeholder="DD/MM/YYYY" Style="text-transform: uppercase;"></asp:TextBox>
                            <cc1:CalendarExtender ID="txtdate_Calendar" runat="server" BehaviorID="txtdate_Calendar" Format="dd/MM/yyyy" TargetControlID="txtdate" />
                            <cc1:TextBoxWatermarkExtender ID="txtdate_Watermark" runat="server" BehaviorID="txtdate_Watermark" TargetControlID="txtdate" WatermarkCssClass="form-control watermark" WatermarkText="DD/MM/YYYY" />
                            <asp:FileUpload ID="UploadXlsData" runat="server" class="form-control" />
                        </div>


                        <asp:Button ID="btnUploadData" Text="Upload File" runat="server" class="buttoncss" OnClick="btnUploadData_Click" />

                        <asp:Button ID="btnClear" Text="Clear" runat="server" class="buttoncss" />
                    </div>

                    <div class="form-inline" style="margin-top: 15px;">
                        <asp:Label ID="lblmessage" runat="server" ForeColor="Red"></asp:Label>
                    </div>


                    <div id="toPopup">
                        <div id="divwaitindimg" runat="server" style="margin-left: 400px; margin-top: 150px; position: relative">
                            <img src="Images/PleaseWait.gif" />
                        </div>
                    </div>
                </div>
                <div id="backgroundPopup">
                </div>
                <div id="toPopupOut">
                </div>
            </div>
        </div>
        <input type="hidden" id="HdnServerDate" runat="server" />
        <input type="hidden" id="HndUserId" runat="server" />
    </form>
</body>
</html>
