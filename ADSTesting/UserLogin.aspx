<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserLogin.aspx.cs" Inherits="ADSTesting.UserLogin" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link href="Content/bootstrap.css" rel="stylesheet" />
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/Login.css" rel="stylesheet" />
    <link href="Content/Common.css" rel="stylesheet" />
    <script src="JavaScript/jquery-1.9.1.js"></script>
    <script src="JavaScript/jquery-1.9.1.min.js"></script>
    <script src="JavaScript/CommonFunction.js"></script>
    <script src="JavaScript/Login.js"></script>
    <style type="text/css">
        body {
            margin-left: 0px;
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
            background-image: url(./Images/LoginBackground.jpg);
            background-repeat: no-repeat;
            background-position: top;
            background-size: auto;
            background-color: #058ad9;
        }
    </style>
    <title>Login : </title>
</head>
<body onkeydown="javascript:return EnterTab(event,this.id);">
    <form id="form1" runat="server">
        <div class="container">
            <div class="row" style="margin-top: 35px;" id="divLogin" runat="server">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="panel" id="panel" style="z-index: -1; background-color: skyblue; color: white; border-color: white;">
                        <div class="row">
                            <div style="margin-top: 5px;"></div>
                            <div style="margin-top: 5px;">
                                <img src="Images/AlexaImage.jpg" alt="Login" style="width: 100%;" />
                            </div>
                        </div>
                        <div style="text-align: center; color: black; font: bold; margin-top: 10px;"><span style="text-align: center">Login</span></div>
                        <div class="row">

                            <div style="margin-top: 5px;">
                                <span class=""><i class="glyphicon glyphicon-user"></i>User</span>
                                <asp:TextBox ID="txtuser_name" runat="server" CssClass="form-control" placeholder="Enter User Id"></asp:TextBox>
                            </div>
                            <div style="margin-top: 5px;">
                                <span class=""><i class="glyphicon glyphicon-lock"></i>Password</span>
                                <asp:TextBox ID="txt_password" runat="server" TextMode="Password" CssClass="form-control" placeholder="Password" onkeyup="FocusToLoginButton(event);"></asp:TextBox>
                            </div>
                            <div style="margin-top: 5px;">
                                <div class="col-md-8">
                                    <input type="checkbox" id="ChkRember">
                                    <span class="" style="color: black">Remember Me</span>
                                </div>
                                <div class="col-md-4"><a href="#" class="card-link" style="color: black">Forgot Password?</a></div>
                            </div>

                            <div style="margin-top: 5px;">
                                <div class="col-md-3">
                                    <div style="width: 100%; margin-top: 5px;">
                                        <input type="button" id="btnlogin" value="Login" class="btn btn-success" onclick="javascript: return Login();" />
                                    </div>
                                </div>

                                <div class="col-md-5"></div>
                                <div class="col-md-4">
                                    <div id="button" style="width: 100%; border-radius: 4px; margin-top: 5px;">

                                        <input type="button" id="btncreatenewaccount" value="Create Account" class="btn btn-info" onclick="javascript: return OpenRegisterTab();" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-3"></div>
                </div>
                <div class="col-md-3"></div>
            </div>


            <div class="row" style="margin-top: 35px;" id="divRegister" runat="server">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="panel" id="panel" style="z-index: -1; background-color: skyblue; color: white; border-color: white;">
                        <div class="row">
                            <div style="margin-top: 5px;"></div>
                            <div style="margin-top: 5px;">
                                <img src="Images/AlexaImage.jpg" alt="Login" style="width: 100%;" />
                            </div>
                        </div>
                        <div style="text-align: center; color: black; font: bold; margin-top: 10px;"><span style="text-align: center">Create New User</span></div>
                        <div class="row">

                            <div style="margin-top: 5px;">
                                <span class=""><i class="glyphicon glyphicon-user"></i>User Name</span>
                                <asp:TextBox ID="txtregisterusername" runat="server" CssClass="form-control" placeholder="Enter User Name" MaxLength="100"></asp:TextBox>
                            </div>
                            <div style="margin-top: 5px;">
                                <span class=""><i class="glyphicon glyphicon-user"></i>Login Id (Email Id)</span>
                                <asp:TextBox ID="txtregisterloginid" runat="server" CssClass="form-control" placeholder="Enter User Id" MaxLength="100" onblur="javascript: return EmailValidate(this.value);"></asp:TextBox>
                            </div>
                            <div style="margin-top: 5px;">
                                <span class=""><i class="glyphicon glyphicon-lock"></i>Password</span>
                                <asp:TextBox ID="txtregisterpwd" runat="server" TextMode="Password" CssClass="form-control" placeholder="Password" MaxLength="100"></asp:TextBox>
                            </div>
                            <div style="margin-top: 5px;">
                                <span class=""><i class="glyphicon glyphicon-user"></i>Team Name</span>
                                <asp:DropDownList ID="drpregisterteamname" runat="server" CssClass="form-control" AutoPostBack="false" AppendDataBoundItems="True" DataTextField="Name" DataValueField="Id"></asp:DropDownList>
                            </div>
                            <div style="margin-top: 5px;">
                                
                                    <input type="checkbox" id="ChkIsManager">
                                    <span class="" style="color: black">I Am A Manager</span>
                                
                            </div>
                            <div style="margin-top: 5px;">
                                <div class="col-md-3">
                                    <div style="width: 100%; margin-top: 5px;">
                                        <input type="button" id="btnRegister" value="Create User" class="btn btn-success" onclick="javascript: return RegiterUser();" />
                                    </div>
                                </div>

                                <div class="col-md-5"></div>
                                <div class="col-md-4">
                                    <div style="width: 100%; border-radius: 4px; margin-top: 5px;">
                                        <input type="button" id="btnreturntologin" value="Login in instead" class="btn btn-info" onclick="javascript: return OpenLoginTab();" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-3"></div>
                </div>
                <div class="col-md-3"></div>
            </div>
        </div>
    </form>
</body>
</html>
