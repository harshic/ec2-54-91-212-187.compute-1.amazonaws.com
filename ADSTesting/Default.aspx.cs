using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ADSTesting
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session["UserId"] == null || string.IsNullOrWhiteSpace(Convert.ToString(HttpContext.Current.Session["UserId"])))
            {
                Response.Redirect("UserLogin.aspx");
            }

            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetNoStore();

            HttpContext.Current.Session.Timeout = 20;
            string userid = Convert.ToString(HttpContext.Current.Session["UserId"]);
            string UserName = Convert.ToString(HttpContext.Current.Session["UserName"]);
            hdnusername.Value = UserName;
            if (Convert.ToString(HttpContext.Current.Session["IsAdmin"]) == "False")
            {
                HdnUserType.Value = "User";
            }
            else
            {
                HdnUserType.Value = "Admin";
            }
        }
        [WebMethod]
        public static string Logout()
        {
            HttpContext.Current.Session["UserId"] = null;
            return "UserLogin.aspx";
        }
    }

}