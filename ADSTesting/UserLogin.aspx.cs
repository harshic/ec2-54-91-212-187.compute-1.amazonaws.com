using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ADSTesting
{
    public partial class UserLogin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BindTeamName();
            }
        }
        [System.Web.Services.WebMethod]
        public static string AdminLogin(string[] ParameterValueArray)
        {
            DataSet ds = new DataSet();
            if (ConfigurationManager.AppSettings["ConnectionType"].ToString() == "Orcl")
            {
                string procedureName = "SpUserLogin";
                ADSTesting.Classes.Oracle.CommonClass obj = new ADSTesting.Classes.Oracle.CommonClass();
                ds = obj.DynamicBindProcedure(procedureName, ParameterValueArray);
            }
            else
            {
                string procedureName = "SpUserLogin";
                ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
                ds = obj.DynamicBindProcedure(procedureName, ParameterValueArray);
            }
            DataTable dt = new DataTable();
            dt = ds.Tables[0];
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            System.Collections.Generic.Dictionary<string, object> row = null;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName.Trim(), dr[col]);
                }
                rows.Add(row);
            }
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            return serializer.Serialize(rows);
        }
        [System.Web.Services.WebMethod]
        public static string GetUserPref(string[] ParameterValueArray)
        {
            DataSet ds = new DataSet();
            string procedureName = "Get_User_Pref";
            if (ConfigurationManager.AppSettings["ConnectionType"].ToString() == "Orcl")
            {
                ADSTesting.Classes.Oracle.CommonClass obj = new ADSTesting.Classes.Oracle.CommonClass();
                ds = obj.DynamicBindProcedure(procedureName, ParameterValueArray);
            }
            else
            {
                ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
                ds = obj.DynamicBindProcedure(procedureName, ParameterValueArray);
            }

            DataTable dt = new DataTable();
            dt = ds.Tables[0];
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            System.Collections.Generic.Dictionary<string, object> row = null;
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName.Trim(), dr[col]);
                }
                rows.Add(row);
            }
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            return serializer.Serialize(rows);
        }
        //----------------------Session Value----------------------------------------------------------------

        [System.Web.Services.WebMethod]
        public static string GetSessonValue(string UserName, string UserId, string TeamId, string Dateformat, string IsManager, string IsAdmin)
        {
            HttpContext.Current.Session["UserName"] = UserName;
            HttpContext.Current.Session["UserId"] = UserId;
            HttpContext.Current.Session["TeamId"] = TeamId;
            HttpContext.Current.Session["Dateformat"] = Dateformat;
            HttpContext.Current.Session["IsManager"] = Convert.ToBoolean(IsManager);
            HttpContext.Current.Session["IsAdmin"] = Convert.ToBoolean(IsAdmin);
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            return serializer.Serialize("TRUE");
        }

        private void BindTeamName()
        {
            drpregisterteamname.Items.Clear();
            drpregisterteamname.Items.Add(new System.Web.UI.WebControls.ListItem("-- Select Team Name --", ""));
            string ProcedureName = "SpGetTeamName";
            string[] ParameterValueArray = new string[] { };
            ParameterValueArray = new string[] { "", "", "", "", "", "" };
            if (ConfigurationManager.AppSettings["ConnectionType"].ToString() == "Orcl")
            {
                ADSTesting.Classes.Oracle.CommonClass obj = new ADSTesting.Classes.Oracle.CommonClass();
                drpregisterteamname.DataSource = obj.DynamicBindProcedure(ProcedureName, ParameterValueArray);
                drpregisterteamname.DataBind();
            }
            else
            {
                ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
                drpregisterteamname.DataSource = obj.DynamicBindProcedure(ProcedureName, ParameterValueArray);
                drpregisterteamname.DataBind();
            }
        }

    }
}