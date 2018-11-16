using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ADSTesting
{
    public partial class Dashboard : System.Web.UI.Page
    {
        DataSet dsmain = new DataSet();
        public static string TransType = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session["UserId"] == null || string.IsNullOrWhiteSpace(Convert.ToString(HttpContext.Current.Session["UserId"])))
            {
                string logingPageUrl = ConfigurationManager.AppSettings["logingPageUrl"];
                Response.Write("<script type=text/javascript> window.parent.location.href ='UserLogin.aspx' </script>");
            }
            if (!IsPostBack)
            {
                TransType = "";
                BindEmployeeName();
                BindTeamName();
                drpEmployeeName.SelectedValue = Convert.ToString(HttpContext.Current.Session["UserId"]);
                drpTeamName.SelectedValue = Convert.ToString(HttpContext.Current.Session["TeamId"]);
                txtdate.Text = DateTime.Now.ToString("dd/MM/yyyy");
                if (Convert.ToString(HttpContext.Current.Session["IsManager"]) == "False")
                {
                    drpEmployeeName.Enabled = false;
                    drpTeamName.Enabled = false;
                    divTeamAdhoc.Visible = false;
                }
                else
                {
                    drpEmployeeName.Enabled = true;
                    drpTeamName.Enabled = false;
                    divTeamAdhoc.Visible = true;
                }
                EmployeeDashboard();
            }
        }

        private void EmployeeDashboard()
        {
            string ProcedureName = "GetEmployeeDashboardData";

            string TesterEmailID = drpEmployeeName.SelectedValue;
            string AuditDate = txtdate.Text;
            string userid = drpEmployeeName.SelectedValue;
            string dateformat = "dd/mm/yyyy";
            string extra1 = "", extra2 = "", extra3 = "", extra4 = "", extra5 = "";
            string extra6 = "", extra7 = "", extra8 = "", extra9 = "", extra10 = "";

            string[] ParameterValueArray = new string[] { };
            ParameterValueArray = new string[] { TesterEmailID, AuditDate, userid, dateformat, extra1, extra2, extra3, extra4, extra5, extra6, extra7, extra8, extra9, extra10 };
            if (ConfigurationManager.AppSettings["ConnectionType"].ToString() == "Orcl")
            {
                ADSTesting.Classes.Oracle.CommonClass obj = new ADSTesting.Classes.Oracle.CommonClass();
                dsmain = obj.DynamicBindProcedure(ProcedureName, ParameterValueArray);
            }
            else
            {
                ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
                dsmain = obj.DynamicBindProcedure(ProcedureName, ParameterValueArray);
            }
            if (dsmain.Tables[0].Rows.Count == 0)
            {
                HdnIndividualProductivity.Value = "0" + "%";
                divIndividual.InnerHtml = "0" + "%";
            }
            else
            {
                HdnIndividualProductivity.Value = dsmain.Tables[0].Rows[0]["IndividualProductivity"].ToString() + "%";
                divIndividual.InnerHtml = dsmain.Tables[0].Rows[0]["IndividualProductivity"].ToString() + "%";
            }
            if (dsmain.Tables[1].Rows.Count == 0)
            {
                HdnTeamProductivity.Value = "0" + "%";
                divTeam.InnerHtml = "0" + "%";
            }
            else
            {
                HdnTeamProductivity.Value = dsmain.Tables[1].Rows[0]["TeamProductivity"].ToString() + "%";
                divTeam.InnerHtml = dsmain.Tables[1].Rows[0]["TeamProductivity"].ToString() + "%";
            }
            if (dsmain.Tables[2].Rows.Count == 0)
            {
                divPendingAdhoc.InnerHtml = "0";
            }
            else
            {
                divPendingAdhoc.InnerHtml = dsmain.Tables[2].Rows[0]["PendingforPassing"].ToString();
            }
        }
        private void BindEmployeeName()
        {
            drpEmployeeName.Items.Clear();
            drpEmployeeName.Items.Add(new System.Web.UI.WebControls.ListItem("-- Select Employee Name --", ""));
            string ProcedureName = "SpGetEmployeeName";
            string[] ParameterValueArray = new string[] { };
            ParameterValueArray = new string[] { Convert.ToString(HttpContext.Current.Session["UserId"]), "", "", "", "", "" };
            if (ConfigurationManager.AppSettings["ConnectionType"].ToString() == "Orcl")
            {
                ADSTesting.Classes.Oracle.CommonClass obj = new ADSTesting.Classes.Oracle.CommonClass();
                drpEmployeeName.DataSource = obj.DynamicBindProcedure(ProcedureName, ParameterValueArray);
                drpEmployeeName.DataBind();
            }
            else
            {
                ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
                drpEmployeeName.DataSource = obj.DynamicBindProcedure(ProcedureName, ParameterValueArray);
                drpEmployeeName.DataBind();
            }
        }
        private void BindTeamName()
        {
            drpTeamName.Items.Clear();
            drpTeamName.Items.Add(new System.Web.UI.WebControls.ListItem("-- Select Team Name --", ""));
            string ProcedureName = "SpGetTeamName";
            string[] ParameterValueArray = new string[] { };
            ParameterValueArray = new string[] { "", "", "", "", "", "" };
            if (ConfigurationManager.AppSettings["ConnectionType"].ToString() == "Orcl")
            {
                ADSTesting.Classes.Oracle.CommonClass obj = new ADSTesting.Classes.Oracle.CommonClass();
                drpTeamName.DataSource = obj.DynamicBindProcedure(ProcedureName, ParameterValueArray);
                drpTeamName.DataBind();
            }
            else
            {
                ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
                drpTeamName.DataSource = obj.DynamicBindProcedure(ProcedureName, ParameterValueArray);
                drpTeamName.DataBind();
            }
        }
        protected void txtdate_TextChanged(object sender, EventArgs e)
        {
            if (txtdate.Text.Length > 0)
            {
                EmployeeDashboard();
                /*GetJsonData();
                GetJsonDaysData();
                GetJsonMonthWiseData();
                GetJsonDaysMonthWiseData();*/


            }
        }

        public string GetJsonData()
        {
            System.Data.DataSet dsmain;
            string Action = "";
            if(TransType == "")
                Action = "GraphWeekWise";
            else
                Action = "GraphTeamWeekWise";

            string UserId = drpEmployeeName.SelectedValue;
            string Dataformat = "dd/mm/yyyy";
            string Extra1 = "", Extra2 = "", Extra3 = "", Extra4 = "", Extra5 = "";
            dsmain = null;
            string[] parameterValueArray = new string[] { Action, UserId, Dataformat, Extra1, Extra2, Extra3, Extra4, Extra5 };
            string procedureName = "SpDashBoardGrap";
            ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
            dsmain = obj.DynamicBindProcedure(procedureName, parameterValueArray);
            DataTableReader rd = dsmain.Tables[0].CreateDataReader();
            StringBuilder JSON = new StringBuilder();
            string prefix = "";
            int c = 1;
            JSON.Append("[");
            while (rd.Read() && c <= 7)
            {
                JSON.Append(prefix);
                JSON.Append(Convert.ToInt32(rd[0]));
                prefix = ",";
                c++;
            }
            JSON.Append("]");
            return JSON.ToString();
        }
        public string GetJsonDaysData()
        {
            System.Data.DataSet dsmain;
            string Action = "";
            if (TransType == "")
                Action = "GraphWeekWise";
            else
                Action = "GraphTeamWeekWise";
            string UserId = drpEmployeeName.SelectedValue;
            string Dataformat = "dd/mm/yyyy";
            string Extra1 = "", Extra2 = "", Extra3 = "", Extra4 = "", Extra5 = "";
            dsmain = null;
            string[] parameterValueArray = new string[] { Action, UserId, Dataformat, Extra1, Extra2, Extra3, Extra4, Extra5 };
            string procedureName = "SpDashBoardGrap";
            ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
            dsmain = obj.DynamicBindProcedure(procedureName, parameterValueArray);
            DataTableReader rd = dsmain.Tables[0].CreateDataReader();

            StringBuilder JSON = new StringBuilder();
            string prefix = "";
            int c = 1;
            string DayTextString = "";
            JSON.Append("[");
            while (rd.Read() && c <= 7)
            {
                DayTextString = rd[1].ToString();
                JSON.Append(prefix);
                JSON.Append("\"" + DayTextString + "\"");
                prefix = " ,";
                c++;
            }
            JSON.Append("]");
            return JSON.ToString();
        }
        public string GetJsonMonthWiseData()
        {
            System.Data.DataSet dsmain;
            string Action = "";
            if (TransType == "")
                Action = "GraphMonthWise";
            else
                Action = "GraphTeamMonthWise";
            string UserId = drpEmployeeName.SelectedValue;
            string Dataformat = "dd/mm/yyyy";
            string Extra1 = "", Extra2 = "", Extra3 = "", Extra4 = "", Extra5 = "";
            dsmain = null;
            string[] parameterValueArray = new string[] { Action, UserId, Dataformat, Extra1, Extra2, Extra3, Extra4, Extra5 };
            string procedureName = "SpDashBoardGrap";
            ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
            dsmain = obj.DynamicBindProcedure(procedureName, parameterValueArray);
            DataTableReader rd = dsmain.Tables[0].CreateDataReader();
            StringBuilder JSON = new StringBuilder();
            string prefix = "";
            int c = 1;
            JSON.Append("[");
            while (rd.Read())
            {
                JSON.Append(prefix);
                JSON.Append(Convert.ToInt32(rd[0]));
                prefix = ",";
                c++;
            }
            JSON.Append("]");
            return JSON.ToString();
        }
        public string GetJsonDaysMonthWiseData()
        {
            System.Data.DataSet dsmain;
            string Action = "";
            if (TransType == "")
                Action = "GraphMonthWise";
            else
                Action = "GraphTeamMonthWise";
            string UserId = drpEmployeeName.SelectedValue;
            string Dataformat = "dd/mm/yyyy";
            string Extra1 = "", Extra2 = "", Extra3 = "", Extra4 = "", Extra5 = "";
            dsmain = null;
            string[] parameterValueArray = new string[] { Action, UserId, Dataformat, Extra1, Extra2, Extra3, Extra4, Extra5 };
            string procedureName = "SpDashBoardGrap";
            ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
            dsmain = obj.DynamicBindProcedure(procedureName, parameterValueArray);
            DataTableReader rd = dsmain.Tables[0].CreateDataReader();

            StringBuilder JSON = new StringBuilder();
            string prefix = "";
            int c = 1;
            string DayTextString = "";
            JSON.Append("[");
            while (rd.Read())
            {
                DayTextString = rd[1].ToString();
                JSON.Append(prefix);
                JSON.Append("\"" + DayTextString + "\"");
                prefix = " ,";
                c++;
            }
            JSON.Append("]");
            return JSON.ToString();
        }

        protected void btnInduvidual_Click(object sender, EventArgs e)
        {
            TransType = "";
            GetJsonData();
            GetJsonDaysData();
            GetJsonMonthWiseData();
            GetJsonDaysMonthWiseData();
        }
        protected void btnTeam_Click(object sender, EventArgs e)
        {
            TransType = "Team";
            GetJsonData();
            GetJsonDaysData();
            GetJsonMonthWiseData();
            GetJsonDaysMonthWiseData();
        }
        protected void drpEmployeeName_SelectedIndexChanged(object sender, EventArgs e)
        {
            TransType = "";
            EmployeeDashboard();
            GetJsonData();
            GetJsonDaysData();
            GetJsonMonthWiseData();
            GetJsonDaysMonthWiseData();
        }
    }
}

