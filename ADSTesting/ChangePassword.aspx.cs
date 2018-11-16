using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ADSTesting
{
    public partial class ChangePassword : System.Web.UI.Page
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
            btnSave.Attributes.Add("onclick", "javascript:return SaveChanges();");
            btnClear.Attributes.Add("onclick", "javascript:return OnloadClear();");
        }
    }
}