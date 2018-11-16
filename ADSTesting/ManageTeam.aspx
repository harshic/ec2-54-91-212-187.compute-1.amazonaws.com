<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageTeam.aspx.cs" Inherits="ADSTesting.ManageTeam" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link rel="stylesheet" href="css/bootstrap-3.3.6.min.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/dashboard.css" type="text/css" media="all" />
    <link href="Content/Common.css" rel="stylesheet" />
    <script src="JavaScript/jquery-1.9.1.js"></script>
    <script src="JavaScript/jquery-1.9.1.min.js"></script>
    <script src="JavaScript/CommonFunction.js"></script>
    <script src="JavaScript/ManageTeam.js"></script>
    <script src="JavaScript/jquery-1.12.4.min.js"></script>
    <script src="JavaScript/bootstrap-3.3.6.min.js"></script>
    <script src="JavaScript/custom-dashboard.js" type="text/javascript"></script>
    <title>Manage Adhoc : </title>
</head>

<body onload="javascript:return OnloadClear();" onkeydown="javascript:return EnterTab(event,this.id);">
    <form runat="server">
        <ul id="tabs" class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#manage" aria-controls="manage" role="tab" data-toggle="tab">Manage Team</a></li>
            <li role="presentation"><a href="#search" aria-controls="search" role="tab" data-toggle="tab">Search Team</a></li>
        </ul>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="manage">

                <div class="block-center">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <label for="txtTeamId" class="col-sm-4 control-label">Team Id</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtTeamId" runat="server" class="form-control" placeholder="Team Id" Style="text-transform: uppercase;"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="txtTeamName" class="col-sm-4 control-label">Team Name</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtTeamName" runat="server" class="form-control" placeholder="Team Name" Style="text-transform: uppercase;"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="txtTeamNickName" class="col-sm-4 control-label">Team Nick Name</label>
                            <div class="col-sm-8">
                                <asp:TextBox ID="txtTeamNickName" runat="server" class="form-control" placeholder="Team Nick Name" Style="text-transform: uppercase;" accept="decimal"></asp:TextBox>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <div class="col-sm-offset-4 col-sm-8">

                                <asp:Button ID="btnSave" Text="Save" runat="server" class="buttoncss" />

                                <asp:Button ID="btnClear" Text="Clear" runat="server" class="buttoncss" />

                                <asp:Button ID="btnDelete" Text="Delate" runat="server" class="buttoncss" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="search">

                <div class="block-center">

                    <div class="form-inline">
                        <div class="form-group">
                            <asp:TextBox ID="txtSearchTeamName" runat="server" class="form-control" placeholder="Team name" Style="text-transform: uppercase;"></asp:TextBox>
                        </div>
                        <div class="form-group">
                            <asp:TextBox ID="txtSearchTeamNickName" runat="server" CssClass="form-control" placeholder="Team Nick name" Style="text-transform: uppercase;"></asp:TextBox>
                        </div>
                        <asp:Button ID="btnReset" class="buttoncssAlignText" runat="server" Text="Reset" OnClick="btnReset_Click" />
                        <asp:Button ID="btnSearch" class="buttoncssAlignText" runat="server" Text="Search" OnClick="btnSearch_Click" />
                    </div>
                    <hr>
                    <div>
                        <asp:ScriptManager ID="ScriptManagerSearch" runat="server">
                        </asp:ScriptManager>

                        <asp:UpdatePanel ID="UpdatePanelSearch" runat="server" UpdateMode="Conditional">
                            <ContentTemplate>
                                <asp:GridView ID="gvSearch" runat="server" AutoGenerateColumns="false"
                                    Width="100%"
                                    AllowPaging="true"
                                    AllowSorting="true"
                                    OnSorting="gvSearch_Sorting"
                                    OnPageIndexChanging="gvSearch_PageIndexChanging"
                                    PagerStyle-CssClass="pagination-gv"
                                    HeaderStyle-CssClass="header-gv"
                                    RowStyle-CssClass="row-gv"
                                    AlternatingRowStyle-CssClass="alternateRow-gv"
                                    CssClass="gv">
                                    <Columns>
                                        <asp:BoundField DataField="Id" HeaderText="Team Code" SortExpression="Id" ItemStyle-HorizontalAlign="right" />
                                        <asp:BoundField DataField="Name" HeaderText="Team Name" SortExpression="Name" />
                                        <asp:BoundField DataField="NickName" HeaderText="Team Nick Name" SortExpression="NickName" />
                                    </Columns>
                                    <HeaderStyle ForeColor="White" HorizontalAlign="Center" />
                                    <PagerStyle HorizontalAlign="Center" />
                                    <PagerSettings Mode="NumericFirstLast" PageButtonCount="5" FirstPageText="First" LastPageText="Last" />
                                </asp:GridView>
                            </ContentTemplate>
                            <Triggers>
                                <asp:AsyncPostBackTrigger ControlID="btnSearch" />
                                <asp:AsyncPostBackTrigger ControlID="btnReset" />
                            </Triggers>
                        </asp:UpdatePanel>
                    </div>

                </div>

            </div>
        </div>

        <input type="hidden" id="HdnServerDate" runat="server" />
        <input type="hidden" id="HndUserId" runat="server" />
    </form>
</body>
</html>
