<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ManageUsefulLink.aspx.cs" Inherits="ADSTesting.ManageUsefulLink" %>

<%@ Register Namespace="AjaxControlToolkit" Assembly="AjaxControlToolkit" TagPrefix="cc1" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <link rel="stylesheet" href="css/bootstrap-3.3.6.min.css" type="text/css" media="all" />
    <link href="../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <script src="JavaScript/jquery-1.12.4.min.js"></script>
    <script src="JavaScript/bootstrap-3.3.6.min.js"></script>
    <script src="JavaScript/custom-dashboard.js" type="text/javascript"></script>
    <link href="css/AdminLTE.css" rel="stylesheet" />
    <link href="css/AdminLTE.min.css" rel="stylesheet" />

    <style type="text/css">
        body {
            margin-left: 0px;
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
            background-image: url(./Images/back6.jpeg);
            background-repeat: no-repeat;
            background-position: top;
            background-size: auto;
            background-color: skyblue;
        }
    </style>
</head>

<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManagerSearch" runat="server">
        </asp:ScriptManager>
        <div style="margin: 15px;">

       <%-- start of links --%>
            <div class="row" style="margin-top: 15px;">
                <div class="col-sm-4">
                    <div class="small-box bg-red">
                        <div class="inner">
                            <h2>Leave Tracker</h2>
                        </div>
                        <div class="icon" style="font-size: 75px;">
                            <i class="fa fa-globe"></i>
                        </div>
                        <asp:HyperLink ID="HyperLink3" NavigateUrl="https://mytimeoff.corp.amazon.com/time_off" runat="server" class="small-box-footer" Style="cursor: pointer; color: white" Target="_blank">www.mytimeoff.corp.amazon.com<i class="fa fa-arrow-circle-right"></i></asp:HyperLink>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="small-box bg-green">
                        <div class="inner">
                            <h2>Holiday List</h2>
                        </div>
                        <div class="icon" style="font-size: 75px;">
                            <i class="fa fa-globe"></i>
                        </div>
                        <asp:HyperLink ID="HyperLink4" NavigateUrl="https://inside.amazon.com/en/Employment/INDPolicies/LOA-IND/Pages/Mandatory-and-Optional-Holidays-List.aspx#amz_section01" runat="server" class="small-box-footer" Style="cursor: pointer; color: white" Target="_blank">www.inside.amazon.com/Mandatory-and-Optional-Holidays<i class="fa fa-arrow-circle-right"></i></asp:HyperLink>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="small-box bg-yellow">
                        <div class="inner">
                            <h2>Inside Amazon</h2>
                        </div>
                        <div class="icon" style="font-size: 75px;">
                            <i class="fa fa-globe"></i>
                        </div>
                        <asp:HyperLink ID="HyperLink5" NavigateUrl="https://inside.amazon.com/en/Pages/default.aspx" runat="server" class="small-box-footer" Style="cursor: pointer; color: white" Target="_blank">www.inside.amazon.com<i class="fa fa-arrow-circle-right"></i></asp:HyperLink>
                    </div>
                </div>
            </div>

           <div class="row" style="margin-top: 15px;">
                <div class="col-sm-4">
                    <div class="small-box bg-green">
                        <div class="inner">
                            <h2>AllSec</h2>
                        </div>
                        <div class="icon" style="font-size: 75px;">
                            <i class="fa fa-globe"></i>
                        </div>
                        <asp:HyperLink ID="HyperLink1" NavigateUrl="https://www.allsechro.com/amazonlogin/Common/web_signon.aspx#!" runat="server" class="small-box-footer" Style="cursor: pointer; color: white" Target="_blank">www.allsechro.com/amazonlogin<i class="fa fa-arrow-circle-right"></i></asp:HyperLink>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="small-box bg-yellow">
                        <div class="inner">
                            <h2>K360</h2>
                        </div>
                        <div class="icon" style="font-size: 75px;">
                            <i class="fa fa-globe"></i>
                        </div>
                        <asp:HyperLink ID="HyperLink2" NavigateUrl="https://knet.amazon.com/" runat="server" class="small-box-footer" Style="cursor: pointer; color: white" Target="_blank">www.k360.amazon.com<i class="fa fa-arrow-circle-right"></i></asp:HyperLink>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="small-box bg-red">
                        <div class="inner">
                            <h2>Accolades</h2>
                        </div>
                        <div class="icon" style="font-size: 75px;">
                            <i class="fa fa-globe"></i>
                        </div>
                        <asp:HyperLink ID="HyperLink6" NavigateUrl="https://accolades.corp.amazon.com/" runat="server" class="small-box-footer" Style="cursor: pointer; color: white" Target="_blank">https://accolades.corp.amazon.com/<i class="fa fa-arrow-circle-right"></i></asp:HyperLink>
                    </div>
                </div>
            </div>

          <%--  <div class="row" style="margin-top: 15px;">
                <div class="col-sm-4">
                    <div class="small-box bg-yellow">
                        <div class="inner">
                            <h2>Test 1</h2>
                        </div>
                        <div class="icon" style="font-size: 75px;">
                            <i class="fa fa-globe"></i>
                        </div>
                        <asp:HyperLink ID="HyperLink7" NavigateUrl="https://www.facebook.com/" runat="server" class="small-box-footer" Style="cursor: pointer; color: white" Target="_blank">Show Details <i class="fa fa-arrow-circle-right"></i></asp:HyperLink>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="small-box bg-red">
                        <div class="inner">
                            <h2>Test 2</h2>
                        </div>
                        <div class="icon" style="font-size: 75px;">
                            <i class="fa fa-globe"></i>
                        </div>
                        <asp:HyperLink ID="HyperLink8" NavigateUrl="https://www.facebook.com/" runat="server" class="small-box-footer" Style="cursor: pointer; color: white" Target="_blank">Show Details <i class="fa fa-arrow-circle-right"></i></asp:HyperLink>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="small-box bg-green">
                        <div class="inner">
                            <h2>Test 3</h2>
                        </div>
                        <div class="icon" style="font-size: 75px;">
                            <i class="fa fa-globe"></i>
                        </div>
                        <asp:HyperLink ID="HyperLink9" NavigateUrl="https://www.facebook.com/" runat="server" class="small-box-footer" Style="cursor: pointer; color: white" Target="_blank">Show Details <i class="fa fa-arrow-circle-right"></i></asp:HyperLink>
                    </div>
                </div>
            </div>  --%>

            <%-- End of links --%>
        </div>
        <input type="hidden" id="HdnIndividualProductivity" runat="server" />
        <input type="hidden" id="HdnTeamProductivity" runat="server" />
    </form>
</body>
</html>
