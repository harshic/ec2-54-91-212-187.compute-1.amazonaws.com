<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ChangePassword.aspx.cs" Inherits="ADSTesting.ChangePassword" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link rel="stylesheet" href="css/bootstrap-3.3.6.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/dashboard.css" type="text/css" media="all" />
    <link href="Content/Common.css" rel="stylesheet" />
    <script src="JavaScript/jquery-1.9.1.js"></script>
    <script src="JavaScript/jquery-1.9.1.min.js"></script>
    <script src="JavaScript/CommonFunction.js"></script>
    <script src="JavaScript/ChangePassword.js"></script>
    <title>Manage Adhoc : </title>
</head>

<body onload="javascript:return OnloadClear();" onkeydown="javascript:return EnterTab(event,this.id);">
    <form runat="server">
        <ul id="tabs" class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#manage" aria-controls="manage" role="tab" data-toggle="tab">Manage Password</a></li>
            <%--<li role="presentation"><a href="#search" aria-controls="search" role="tab" data-toggle="tab">Search Adhoc</a></li>--%>
        </ul>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="manage">

                <div class="block-center">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="txtCurrentPassword" class="col-sm-4 control-label">Current Password</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtCurrentPassword" runat="server" class="form-control" placeholder="Current Password" TextMode="Password"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="txtNewPassword" class="col-sm-4 control-label">New Password</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtNewPassword" runat="server" class="form-control" placeholder="New Password" TextMode="Password"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="txtRetypeNewpassword" class="col-sm-4 control-label">Retype New Password</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtRetypeNewpassword" runat="server" class="form-control" placeholder="Retype New Password" TextMode="Password"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-4 col-sm-8">

                                <asp:Button ID="btnSave" Text="Save Changes" runat="server" class="buttoncss" />

                                <asp:Button ID="btnClear" Text="Clear" runat="server" class="buttoncss" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <input type="hidden" id="HdnServerDate" runat="server" />
        <input type="hidden" id="HndUserId" runat="server" />
    </form>
</body>
</html>

