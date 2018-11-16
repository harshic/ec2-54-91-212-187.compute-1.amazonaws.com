<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TestPage.aspx.cs" Inherits="ADSTesting.TestPage" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">

    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <script src="Scripts/jquery-1.9.1.js"></script>
    <script src="Scripts/jquery-1.9.1.min.js"></script>
    <script src="JavaScript/jquery.freezeheader.js"></script>
    <script src="Scripts/CountryMaster.js"></script>
    <script src="JavaScript/CommonFunction.js"></script>
    <script src="Scripts/jquery-1.12.4.min.js"></script>
    <script src="Scripts/bootstrap-3.3.6.min.js"></script>

    <link rel="stylesheet" href="css/bootstrap-3.3.6.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/dashboard.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/media_dashboard.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/scroll.css" type="text/css" media="all" />

    <link href="../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <script src="JavaScript/custom-dashboard.js" type="text/javascript"></script>

    <title>Country Master</title>
</head>
<body onload="javascript:return OnloadClear();" onkeydown="javascript:return EnterTab(event,this.id);">
    <form runat="server">
        <ul id="tabs" class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#manage" aria-controls="manage" role="tab" data-toggle="tab">Manage Country</a></li>
            <li role="presentation"><a href="#search" aria-controls="search" role="tab" data-toggle="tab">Search Country</a></li>
        </ul>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="manage">

                <div class="block-center">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="txtcountrycode" class="col-sm-4 control-label">Country Code</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtcountrycode" runat="server" class="form-control" placeholder="Country Code" Style="text-transform: uppercase;"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="txtcountryname" class="col-sm-4 control-label">Country Name</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtcountryname" runat="server" class="form-control" placeholder="Country Name" Style="text-transform: uppercase;"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="txtnickname" class="col-sm-4 control-label">Nick Name</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtnickname" runat="server" class="form-control" placeholder="Nick Name" Style="text-transform: uppercase;"></asp:TextBox>
                            </div>
                        </div>                        
                        <div class="form-group">
                            <div class="col-sm-offset-4 col-sm-8">

                                <asp:Button ID="btnsave" Text="Save" runat="server" class="buttoncss" />

                                <asp:Button ID="btnclear" Text="Clear" runat="server" class="buttoncss" />

                                <asp:Button ID="btndelete" Text="Delete" runat="server" class="buttoncss" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <input type="hidden" id="hdncompcode" runat="server" />
        <input type="hidden" id="hdnuserid" runat="server" />
        <input type="hidden" id="hdnusername" runat="server" />
        <input type="hidden" id="hdndateformat" runat="server" />
    </form>
</body>
</html>