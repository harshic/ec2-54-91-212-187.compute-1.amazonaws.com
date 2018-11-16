<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="ADSTesting.Dashboard" %>

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

    <%-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>
    <script src="https:/cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>--%>

    <script src="LineChartJs/bundle.js"></script>
    <script src="LineChartJs/Utils.js"></script>
    <style>
        canvas {
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
    </style>

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
            <div class="row" style="margin-top: 25px;" id="divRegister" runat="server">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-2">Team Name</div>
                        <div class="col-md-2">
                            <asp:DropDownList ID="drpTeamName" runat="server" CssClass="form-control" AutoPostBack="false" AppendDataBoundItems="True" DataTextField="Name" DataValueField="Id"></asp:DropDownList>
                        </div>
                        <div class="col-md-2">Employee Name</div>
                        <div class="col-md-2">
                            <asp:DropDownList ID="drpEmployeeName" runat="server" CssClass="form-control" AutoPostBack="True" AppendDataBoundItems="True" DataTextField="Name" DataValueField="EmailId" OnSelectedIndexChanged="drpEmployeeName_SelectedIndexChanged"></asp:DropDownList>
                        </div>
                        <div class="col-md-1">Date
                           </div>
                        <div class="col-md-2">
                            <asp:TextBox ID="txtdate" runat="server" class="form-control" placeholder="DD/MM/YYYY" Style="text-transform: uppercase;" OnTextChanged="txtdate_TextChanged" AutoPostBack="true" autocomplete="off"></asp:TextBox>
                            <cc1:CalendarExtender ID="txtdate_Calendar" runat="server" BehaviorID="txtdate_Calendar" Format="dd/MM/yyyy" TargetControlID="txtdate" />
                            <cc1:TextBoxWatermarkExtender ID="txtdate_Watermark" runat="server" BehaviorID="txtdate_Watermark" TargetControlID="txtdate" WatermarkCssClass="form-control watermark" WatermarkText="DD/MM/YYYY" />
                        </div>

                    </div>
                </div>
                <div class="col-md-1"></div>
            </div>

            <div class="row" style="margin-top: 15px;">



                <div class="col-md-4">
                    <div class="small-box" style="background-color: #008080; color: white">
                        <div class="inner">
                            <h3>
                                <span id="divIndividual" runat="server"></span>
                            </h3>
                            <p>Individual Productivity</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-user"></i>
                        </div>
                        <asp:LinkButton ID="btnInduvidual" runat="server" OnClick="btnInduvidual_Click" class="small-box-footer" Style="cursor: pointer">Show Details <i class="fa fa-arrow-circle-right"></i></asp:LinkButton>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="small-box" style="background-color: #008080; color: white">
                        <div class="inner">
                            <h3>
                                <span id="divTeam" runat="server"></span>
                            </h3>
                            <p>Team Productivity(Average)</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-users"></i>
                        </div>
                        <asp:LinkButton ID="btnTeam" runat="server" OnClick="btnTeam_Click" class="small-box-footer" Style="cursor: pointer">Show Details <i class="fa fa-arrow-circle-right"></i></asp:LinkButton>
                    </div>
                </div>
                <div class="col-md-4" id="divTeamAdhoc" runat="server">
                    <div class="small-box" style="background-color: #008080; color: white">
                        <div class="inner">
                            <h3>
                                <span id="divPendingAdhoc" runat="server"></span>
                            </h3>
                            <p>Team Adhoc</p>
                        </div>
                        <div class="icon">
                            <i class="fa fa-book"></i>
                        </div>
                        <asp:HyperLink ID="lnkDetail" NavigateUrl="PassAdhocDetail.aspx" runat="server" class="small-box-footer" Style="cursor: pointer">Show Details <i class="fa fa-arrow-circle-right"></i></asp:HyperLink>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <canvas id="canvas" style="width: 300px; height: 185px"></canvas>

                <script>
                    var j = "";
                    j = '<%=GetJsonData()%>';
                    var d = "";
                    d = '<%=GetJsonDaysData()%>';
                    var config = {
                        type: 'line',
                        data: {
                            labels: JSON.parse(d),
                            datasets: [{
                                label: '# of Activities',
                                backgroundColor: "Red",
                                borderColor: "Red",
                                data: JSON.parse(j),
                                fill: false,
                            }]
                        },
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                text: 'Week Wise Line Chart'
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                            },
                            hover: {
                                mode: 'nearest',
                                intersect: true
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Day'
                                    }
                                }],
                                yAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Value'
                                    }
                                }]
                            }
                        }
                    };
                    var ctx = document.getElementById('canvas').getContext('2d');
                    window.myLine = new Chart(ctx, config);
                    //window.onload = function () {
                    //    var ctx = document.getElementById('canvas').getContext('2d');
                    //    window.myLine = new Chart(ctx, config);
                    //};
                </script>
                </div>
                <div class="col-md-6">
                     <canvas id="CanvasMonthWise" style="width: 300px; height: 185px"></canvas>

                <script>
                    var x = "";
                    x = '<%=GetJsonMonthWiseData()%>';
                    var y = "";
                    y = '<%=GetJsonDaysMonthWiseData()%>';
                    var config = {
                        type: 'line',
                        data: {
                            labels: JSON.parse(x),
                            datasets: [{
                                label: '# of Activities',
                                backgroundColor: "Red",
                                borderColor: "Red",
                                data: JSON.parse(y),
                                fill: false,
                            }]
                        },
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                text: 'Month Wise Line Chart'
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                            },
                            hover: {
                                mode: 'nearest',
                                intersect: true
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Date'
                                    }
                                }],
                                yAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Value'
                                    }
                                }]
                            }
                        }
                    };
                    var ctxMonthWise = document.getElementById('CanvasMonthWise').getContext('2d');
                    window.myLine = new Chart(ctxMonthWise, config);
                </script>
                </div>
              
            </div>

            <%--<div class="row">
                <div class="col-md-6">
                    <canvas id="myChart" style="width: 300px; height: 185px"></canvas>
                    <script>
                        var ctx = document.getElementById("myChart").getContext('2d');
                        var j = "";
                        j = '<%=GetJsonData()%>';
                        var d = "";
                        d = '<%=GetJsonDaysData()%>';

                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: JSON.parse(d),
                                datasets: [{
                                    label: '# of Activities',
                                    data: JSON.parse(j),
                                    backgroundColor: [
                                        'rgba(355, 99, 132, 0.6)',
                                        'rgba(54, 162, 335, 0.6)',
                                        'rgba(255, 206, 86, 0.6)',
                                        'rgba(350, 92, 392, 0.6)',
                                        'rgba(393, 202, 55, 0.6)',
                                        'rgba(355, 259, 264, 0.6)'
                                    ],
                                    borderColor: [
                                        'rgba(255,99,132,1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        });
                    </script>
                </div>
                <div class="col-md-6">
                    <canvas id="myChart1" style="width: 300px; height: 185px"></canvas>
                    <script>
                        var ctx = document.getElementById('myChart1').getContext('2d');
                        var x = "";
                        x = '<%=GetJsonMonthWiseData()%>';
                        var y = "";
                        y = '<%=GetJsonDaysMonthWiseData()%>';
                        var chart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: JSON.parse(x),
                                datasets: [{
                                    label: "Month wise data",
                                    backgroundColor: 'rgb(70,130,180)',
                                    borderColor: 'rgb(5, 89, 132)',
                                    data: JSON.parse(y),
                                }]
                            },
                            options: {}
                        });
                    </script>
                </div>
            </div>--%>
        </div>
        <input type="hidden" id="HdnIndividualProductivity" runat="server" />
        <input type="hidden" id="HdnTeamProductivity" runat="server" />
    </form>
</body>
</html>
