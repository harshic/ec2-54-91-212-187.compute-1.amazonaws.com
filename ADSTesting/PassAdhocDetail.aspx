<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PassAdhocDetail.aspx.cs" Inherits="ADSTesting.PassAdhocDetail" %>

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
        <div style="margin-top: 15px;">
            <div class="block-center">
                <div class="form-inline">
                    <div class="form-group">
                        <asp:TextBox ID="txtEmailId" runat="server" CssClass="form-control" placeholder="Email Id"></asp:TextBox>
                    </div>
                    <asp:Button ID="btnReset" class="buttoncssAlignText" runat="server" Text="Reset" OnClick="btnReset_Click" />
                    <asp:Button ID="btnSearch" class="buttoncssAlignText" runat="server" Text="Search" OnClick="btnSearch_Click" />
                    <asp:Button ID="btnUpdteRec" class="buttoncssAlignText" runat="server" Text="Update Record" OnClick="btnUpdteRec_Click" />
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
                                OnPageIndexChanging="gvSearch_PageIndexChanging"
                                PagerStyle-CssClass="pagination-gv"
                                HeaderStyle-CssClass="header-gv"
                                RowStyle-CssClass="row-gv"
                                AlternatingRowStyle-CssClass="alternateRow-gv"
                                CssClass="gv">
                                <Columns>
                                    <asp:BoundField DataField="UserName" HeaderText="Employee Name" SortExpression="UserName" />
                                    <asp:BoundField DataField="EmailId" HeaderText="Email Id" SortExpression="EmailId" />
                                    <asp:BoundField DataField="Adhoc" HeaderText="Adhoc" SortExpression="Adhoc" ItemStyle-HorizontalAlign="right" />
                                    <asp:BoundField DataField="Remarks" HeaderText="Reason for Exception" SortExpression="Remarks" ItemStyle-HorizontalAlign="right" />
                                    
                                    <asp:TemplateField HeaderText="Pass Adhoc" Visible="true" ControlStyle-ForeColor="Black">
                                        <ItemTemplate>
                                            <asp:TextBox ID="grdPassAdhoc" runat="server" Width="100%" Text='<%# Server.HtmlEncode(DataBinder.Eval (Container.DataItem, "PassAdhoc").ToString()) %>'></asp:TextBox>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                     <asp:TemplateField HeaderText="Id" Visible="false">
                                    <ItemTemplate>
                                        <asp:Label ID="grdlbluniqid" runat="server" Width="100%" Text='<%# Server.HtmlEncode(DataBinder.Eval (Container.DataItem, "ID").ToString()) %>'></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
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


        <input type="hidden" id="HdnServerDate" runat="server" />
        <input type="hidden" id="HndUserId" runat="server" />
        <input type="hidden" id="HdnTeamId" runat="server" />
    </form>
</body>
</html>

