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
    public partial class ManageTeam : System.Web.UI.Page
    {
        public static int _pageSize = 10;
        public static int _recordCount = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session["UserId"] == null || string.IsNullOrWhiteSpace(Convert.ToString(HttpContext.Current.Session["UserId"])))
            {
                string logingPageUrl = ConfigurationManager.AppSettings["logingPageUrl"];
                Response.Write("<script type=text/javascript> window.parent.location.href ='UserLogin.aspx' </script>");
            }
            HdnServerDate.Value = DateTime.Now.ToString("dd/MM/yyyy");
            HndUserId.Value = Convert.ToString(HttpContext.Current.Session["UserId"]);
            btnSave.Attributes.Add("onclick", "javascript:return SaveUpdateDeleteRec('I');");
            btnClear.Attributes.Add("onclick", "javascript:return OnloadClear();");
            btnDelete.Attributes.Add("onclick", "javascript:return SaveUpdateDeleteRec('D');");
            txtTeamName.Attributes.Add("onblur", "javascript:return FillNickName();");
            ViewState["SortDirection"] = "ASC";
            ViewState["SortExpression"] = "Name";
            gvSearch.PageSize = _pageSize;
        }
        [System.Web.Services.WebMethod]
        public static string SaveUpdateRec(string[] ParameterValueArray)
        {
            DataSet ds = new DataSet();
            string procedureName = "SpTeamManage";
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
        protected void btnSearch_Click(object sender, EventArgs e)
        {
            gvSearch.PageIndex = 0;
            BindGridView(0);
        }

        protected void btnReset_Click(object sender, EventArgs e)
        {
            gvSearch.PageIndex = 0;
            BindGridView(0);
        }

        private void BindGridView(Int32 currentPage)
        {
            ObjectDataSource ods = new ObjectDataSource();
            ods.TypeName = "ADSTesting.ManageTeam";
            ods.SelectMethod = "SearchTeam";
            ods.SelectCountMethod = "SearchTeamCount";
            ods.EnablePaging = true;

            ods.SelectParameters.Add("name", DbType.String, txtSearchTeamName.Text.Trim());
            ods.SelectParameters.Add("nick", DbType.String, txtSearchTeamNickName.Text.Trim());
            ods.SelectParameters.Add("startRowIndex", DbType.Int32, gvSearch.PageIndex.ToString());
            ods.SelectParameters.Add("maximumRows", DbType.Int32, gvSearch.PageSize.ToString());
            ods.SelectParameters.Add("sortExpression", DbType.String, String.Format("{0} {1}",
            ViewState["SortExpression"], ViewState["SortDirection"]));

            gvSearch.DataSource = ods;
            gvSearch.DataBind();
        }
        public static DataTable SearchTeam(String name, String nick, Int32 startRowIndex, Int32 maximumRows, string sortExpression)
        {
            DataSet ds = new DataSet();
            string procedureName = "SpSearchTeam";
            string[] ParameterValueArray = new string[] { nick, name, startRowIndex.ToString(), maximumRows.ToString(), sortExpression };

            if (ConfigurationManager.AppSettings["ConnectionType"].ToString() == "orcl")
            {
                ADSTesting.Classes.Oracle.CommonClass obj = new ADSTesting.Classes.Oracle.CommonClass();
                ds = obj.DynamicBindProcedure(procedureName, ParameterValueArray);
            }
            else
            {
                ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
                ds = obj.DynamicBindProcedure(procedureName, ParameterValueArray);
            }

            if (ds != null && ds.Tables.Count > 1)
            {
                _recordCount = Convert.ToInt16(ds.Tables[1].Rows[0][0]);
                return ds.Tables[0];
            }

            return new DataTable();
        }

        public static int SearchTeamCount(String name, String nick, Int32 startRowIndex, Int32 maximumRows, string sortExpression)
        {
            return _recordCount;
        }

        protected void gvSearch_Sorting(object sender, GridViewSortEventArgs e)
        {
            if (ViewState["SortDirection"] == null)
                ViewState["SortDirection"] = "ASC";
            else
                ViewState["SortDirection"] =
                   Convert.ToString(ViewState["SortDirection"]) == "ASC" ? "DESC" : "ASC";

            ViewState["SortExpression"] = e.SortExpression;

            BindGridView(gvSearch.PageIndex);
        }

        protected void gvSearch_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            gvSearch.PageIndex = e.NewPageIndex;
            BindGridView(gvSearch.PageIndex);
        }
    }
}