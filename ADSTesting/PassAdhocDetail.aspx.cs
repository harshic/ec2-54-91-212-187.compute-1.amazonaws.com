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
    public partial class PassAdhocDetail : System.Web.UI.Page
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
            if (!IsPostBack)
            {
                HdnTeamId.Value =  Convert.ToString(HttpContext.Current.Session["TeamId"]);
                HndUserId.Value = Convert.ToString(HttpContext.Current.Session["UserId"]);
                HdnServerDate.Value = DateTime.Now.ToString("dd/MM/yyyy");
                BindGridView(0);
            }
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
            string Id = "";
            string TeamId = HdnTeamId.Value;
            string AuditDate = HdnServerDate.Value;
            string PassAdhoc = "";
            string DmlType = "S";
            string userid = HndUserId.Value;
            string dateformat = "dd/mm/yyyy";
            string extra1 = "", extra2 = "", extra3 = "", extra4 = "", extra5 = "";

            DataSet ds = new DataSet();
            string procedureName = "SpGetAdhocForApproved";
            string[] ParameterValueArray = new string[] { Id, TeamId, AuditDate, PassAdhoc, DmlType, userid, dateformat, extra1, extra2, extra3, extra4, extra5 };

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
            gvSearch.DataSource = ds;
            gvSearch.DataBind();
        }

        protected void gvSearch_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            gvSearch.PageIndex = e.NewPageIndex;
            BindGridView(gvSearch.PageIndex);
        }
        protected void btnUpdteRec_Click(object sender, EventArgs e)
        {
            DataSet ds = new DataSet();
            for (int i = 0; i < gvSearch.Rows.Count; i++)
            {
                string Id = ((Label)gvSearch.Rows[i].FindControl("grdlbluniqid")).Text.Trim();
                string TeamId = HdnTeamId.Value;
                string AuditDate = HdnServerDate.Value;
                string PassAdhoc = ((TextBox)gvSearch.Rows[i].FindControl("grdPassAdhoc")).Text.Trim();
                string DmlType = "P";
                string userid = HndUserId.Value;
                string dateformat = "dd/mm/yyyy";
                string extra1 = "", extra2 = "", extra3 = "", extra4 = "", extra5 = "";

                string procedureName = "SpGetAdhocForApproved";
                string[] ParameterValueArray = new string[] { Id, TeamId, AuditDate, PassAdhoc, DmlType, userid, dateformat, extra1, extra2, extra3, extra4, extra5 };

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
            }
            Response.Write("<script>alert('" + ds.Tables[0].Rows[0]["MSG"].ToString() + "');</script>");
            BindGridView(0);
        }

    }
}