<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ADSTesting.Default" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Dash Board</title>

    <link rel="stylesheet" href="css/dashboard.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/media_dashboard.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/scroll.css" type="text/css" media="all" />
    <link rel="stylesheet" href="css/bootstrap-3.3.6.min.css" type="text/css" media="all" />
    <link href="../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <script src="JavaScript/jquery-1.12.4.min.js"></script>
    <script src="JavaScript/bootstrap-3.3.6.min.js"></script>
    <script src="JavaScript/custom-dashboard.js" type="text/javascript"></script>

    <script>
        $(document).ready(function () {
            document.getElementById('iframeContainer').contentWindow.location.href = "Dashboard.aspx";
            $('#user-toggle-menu').click(function () {
                $('.dashboard-top-right ul').slideToggle();
            });
            $('#iframeContainer').load(function () {
                var docHeight = $(document).height();
                $(this).css("height", (docHeight - 50) + "px");
            });
        });
        function resizeIframe() {
            //obj.style.height = 0;
            //obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
            //alert('hit');
        }
        function newwin(pageUrl, isPopUp) {
            if (isPopUp == "True") {
                window.open(pageUrl);
            }
            else {
                if (pageUrl == "Default.aspx") {
                    location.reload("Default.aspx");
                }
                else {
                    document.getElementById('iframeContainer').contentWindow.location.href = pageUrl;
                    var docHeight = $(document).height();
                    $('#iframeContainer').css("height", (docHeight - 50) + "px");
                }
            }
            return false;
        }

        var CurrentTime = new Date();
        var MonthArray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
        var ServerDate = new Date(CurrentTime)
        function padlength(what) {
            var output = (what.toString().length == 1) ? "0" + what : what
            return output
        }
        function DissplayCurrentTime() {

            ServerDate.setSeconds(ServerDate.getSeconds() + 1)
            var UserName = document.getElementById('hdnusername').value;
            var CurrentDate = MonthArray[ServerDate.getMonth()] + " " + padlength(ServerDate.getDate()) + ", " + ServerDate.getFullYear()
            var CurrentNowTime = padlength(ServerDate.getHours()) + ":" + padlength(ServerDate.getMinutes()) + ":" + padlength(ServerDate.getSeconds())
            document.getElementById("SpnCurrentTime").innerHTML = UserName + "&nbsp;" + " : " + CurrentDate + " " + CurrentNowTime
        }
        function Clock() {
            setInterval("DissplayCurrentTime()", 1000);
        }
    </script>

</head>
<body>
    <div class="dashboard">
        <div class="dashboard-inner">
            <div id="header-dashboard" class="dashboard-top-menu">
                <div class="dashboard-top-toggle">
                    <div class="top-toggle">
                        <button class="top-toggle-btn" id="hide-menu"><i class="fa fa-bars"></i></button>
                        <button class="top-toggle-btn" id="show-menu"><i class="fa fa-bars"></i></button>
                    </div>
                </div>
                <div class="dashboard-logo text-center">
                    <a href="#">
                        <%--<img src="Images/clientlogo.jpg"></a>--%>
                </div>

                <div class="dashboard-top-right text-center">
                    <h3 class="project-name">
                        <asp:Label ID="lblProjectName" runat="server" Style="color: white;" />
                    </h3>

                    <div class="text-right user-toggle">
                        <button class="top-toggle-btn" id="user-toggle-menu">Menu</button>
                    </div>
                    <ul>
                        <li class="user-status">
                            <span class="user-drop-panel">
                                <span class="user-name" id="SpnCurrentTime">
                                    <%--<asp:Label ID="lblUserName" runat="server" />--%></span>

                                <i>
                                    <img src="Images/drop-select.png"></i>
                            </span>

                            <ul>
                                <%--<li><a href="#">Profile</a></li>--%>
                                <li><a id="btnLogout" runat="server" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
            <div rel='scrollcontent5' class="dashboard-left-panel">
                <div class="light-green">
                    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-default">
                            <div style="margin-top: 20px; margin-left: 10px;">
                                <span style="color: white"><i class="glyphicon glyphicon-dashboard"></i><a style="color: white" onclick='newwin("Default.aspx", "1")'>Dash Board</a></span>

                            </div>



                            <ul class="collapsible-tree">
                                <li class="main-parent has-child">
                                    <a>Self Services</a>
                                    <ul>
                                        <li class="has-child">
                                            <a onclick='newwin("ManageAdhoc.aspx", "1")'>Manage Adhoc</a>
                                        </li>
                                        <li class="has-child">
                                            <a onclick='newwin("ChangePassword.aspx", "1")'>Change Password</a>
                                        </li>
                                    </ul>
                                </li>
                                <% if (HdnUserType.Value == "Admin")
                                   {%>
                                <li class="main-parent has-child">
                                    <a>Admin Section</a>
                                    <ul>
                                        <li class="has-child">
                                            <a onclick='newwin("UploadDaliyWorkStatus.aspx", "1")'>Upload Employee Daily Status</a>
                                        </li>
                                        <li class="has-child">
                                            <a onclick='newwin("ManageTeam.aspx", "1")'>Manage Team</a>
                                        </li>
                                    </ul>
                                </li>
                                <% } %>

                               
                                        <li class="has-child">
                                            <a onclick='newwin("ManageUsefulLink.aspx", "1")'>Helpful Links</a>
                                        </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-right-panel" rel='scrollcontent6'>
                <div class="dashbord-content">
                    <div class="row">

                        <div class="col-sm-12">
                            <div>
                                <iframe id="iframeContainer" runat="server" frameborder="0" scrolling="yes" style="width: 100%; height: 100%;"></iframe>
                            </div>
                            <!-- white Block -->
                        </div>

                    </div>



                </div>
            </div>
            <!-- Dashboard Right -->
            <hr>
            <footer id="footer-dashboard">
                <div class="row">
                    <div class="col-xxs col-xs-5 col-sm-4">
                        <p class="footer-content" style="color: white;"><b>Copyright &copy; 2018 All rights reserved.    </b></p>
                    </div>
                    <div class="col-xxs col-xs-7 col-sm-8 text-right" style="color: white;">
                        <ul>
                            <li><b> </b></li>
                            <li><a href="#">
                                <img src="Images/power1.jpeg" style="height: 25px; width: 100%;">
                            </a></li>
                        </ul>
                    </div>
                </div>

            </footer>


        </div>
    </div>
    <input type="hidden" id="hdnusername" runat="server" />
    <input type="hidden" id="HdnUserType" runat="server" />
    <script type="text/javascript">Clock();</script>
</body>
</html>
