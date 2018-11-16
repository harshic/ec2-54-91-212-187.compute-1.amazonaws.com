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
    public partial class ManageAdhoc : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session["UserId"] == null || string.IsNullOrWhiteSpace(Convert.ToString(HttpContext.Current.Session["UserId"])))
            {
                string logingPageUrl = ConfigurationManager.AppSettings["logingPageUrl"];
                Response.Write("<script type=text/javascript> window.parent.location.href ='UserLogin.aspx' </script>");
            }
            HdnServerDate.Value = DateTime.Now.ToString("dd/MM/yyyy");
            HndUserId.Value = Convert.ToString(HttpContext.Current.Session["UserId"]);
            btnSave.Attributes.Add("onclick", "javascript:return SaveRec();");
            btnClear.Attributes.Add("onclick", "javascript:return OnloadClear();");
        }
        [System.Web.Services.WebMethod]
        public static string SaveUpdateRec(string[] ParameterValueArray)
        {
            DataSet ds = new DataSet();
            string procedureName = "SpInsertEmpAdhoc";
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
    }
}