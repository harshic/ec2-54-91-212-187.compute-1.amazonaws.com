<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageAdhoc.aspx.cs" Inherits="ADSTesting.ManageAdhoc" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link rel="stylesheet" href="css/bootstrap-3.3.6.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/dashboard.css" type="text/css" media="all" />
    <link href="Content/Common.css" rel="stylesheet" />
    <script src="JavaScript/jquery-1.9.1.js"></script>
    <script src="JavaScript/jquery-1.9.1.min.js"></script>
    <script src="JavaScript/CommonFunction.js"></script>
    <script src="JavaScript/ManageAdhoc.js"></script>
    <title>Manage Adhoc : </title>

    
  
     
</head>


<body onload="javascript:return OnloadClear();" onkeydown="javascript:return EnterTab(event,this.id);">
    <form runat="server">
        <ul id="tabs" class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#manage" aria-controls="manage" role="tab" data-toggle="tab">Manage Adhoc</a></li>
            <%--<li role="presentation"><a href="#search" aria-controls="search" role="tab" data-toggle="tab">Search Adhoc</a></li>--%>
        </ul>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="manage">

                <div class="block-center">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="txtEntryDate" class="col-sm-4 control-label">Date</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtEntryDate" runat="server" class="form-control" placeholder="Date" Style="text-transform: uppercase;"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="txtAdhoc" class="col-sm-4 control-label">Adhoc(minutes)</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtAdhoc" runat="server" class="form-control" placeholder="Adhoc" Style="text-transform: uppercase;" accept="decimal"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="txtRemarks" class="col-sm-4 control-label">Reason for Exception</label>
                            <div class="col-sm-8">
                                 <asp:DropDownList ID="txtRemarks" runat="server" CssClass="form-control" AppendDataBoundItems="True" AutoPostBack="false">
                                      <asp:ListItem Value="Team Meeting">Team Meeting</asp:ListItem>
                                     <asp:ListItem Value="1 On 1 With Manager">1 On 1 With Manager</asp:ListItem>
                                     <asp:ListItem Value="RNR">RNR</asp:ListItem>
                                     <asp:ListItem Value="Others">Others</asp:ListItem>
                                        </asp:DropDownList>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-4 col-sm-8">

                                <asp:Button ID="btnSave" Text="Save" runat="server" class="buttoncss" />

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
