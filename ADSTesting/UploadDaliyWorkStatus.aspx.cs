using System;
using System.Data;
using System.IO;
using System.Data.OleDb;
using System.Configuration;
using System.Data.SqlClient;
using System.Xml.Linq;
using System.Web;
using System.Web.UI; 

namespace ADSTesting
{
    public partial class UploadDaliyWorkStatus : System.Web.UI.Page
    {
        System.Data.DataSet DtSet = default(System.Data.DataSet);
        protected void Page_Load(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session["UserId"] == null || string.IsNullOrWhiteSpace(Convert.ToString(HttpContext.Current.Session["UserId"])))
            {
                string logingPageUrl = ConfigurationManager.AppSettings["logingPageUrl"];
                Response.Write("<script type=text/javascript> window.parent.location.href ='UserLogin.aspx' </script>");
            }
            HdnServerDate.Value = DateTime.Now.ToString("dd/MM/yyyy");
            HndUserId.Value = Convert.ToString(HttpContext.Current.Session["UserId"]);
            btnClear.Attributes.Add("onclick", "javascript:return OnloadClear();");
            btnUploadData.Attributes.Add("onclick", "javascript:return ViewWaitngImage();");
        }
        private void InsertExcelRecords(string FilePath)
        {
            lblmessage.Text = "";
            DataSet dsmain = new DataSet();
            string fileUniqName = Server.MapPath("~/_EmployeeData/" + Guid.NewGuid().ToString() + ".xls");
            if (Path.GetExtension(UploadXlsData.PostedFile.FileName) == ".xls")
            {
                UploadXlsData.SaveAs(fileUniqName);

                System.Data.OleDb.OleDbConnection MyConnection = default(System.Data.OleDb.OleDbConnection);
                System.Data.OleDb.OleDbDataAdapter MyCommand = default(System.Data.OleDb.OleDbDataAdapter);

                MyConnection = new System.Data.OleDb.OleDbConnection("provider=Microsoft.ACE.OLEDB.12.0; Data Source = " + fileUniqName + "; Extended Properties = Excel 8.0;");
                MyCommand = new System.Data.OleDb.OleDbDataAdapter("select * from [Sheet1$]", MyConnection);
                MyCommand.TableMappings.Add("Table", "TestTable");
                MyConnection.Open();
                DtSet = new System.Data.DataSet();
                MyCommand.Fill(DtSet);

                ADSTesting.Classes.Sql.CommonClass obj = new ADSTesting.Classes.Sql.CommonClass();
                dsmain = obj.SaveEmployeeDailyWorkStatus(GetEmployeeDailyWorkStatusXML());
                MyConnection.Close();
                lblmessage.Text = dsmain.Tables[0].Rows[0]["MSG"].ToString();
                Response.Write("<script>alert('" + dsmain.Tables[0].Rows[0]["MSG"].ToString() + "');</script>");
                this.Controls.Add(new LiteralControl("<script type='text/javascript'>SaveDailyStatusOnJs();</script>"));
            }
            else
            {
                lblmessage.Text = "Please Upload Only Excel(.xls) File";
            }
        }
        protected void btnUploadData_Click(object sender, EventArgs e)
        {
            if (UploadXlsData.PostedFile.FileName == "")
            {
                Response.Write("<script>alert('Please Select Excel(.xls) File');</script>");
                return;
            }
            else
            {
                string CurrentFilePath = Path.GetFullPath(UploadXlsData.PostedFile.FileName);
                InsertExcelRecords(CurrentFilePath);
            }
        }
        private XDocument GetEmployeeDailyWorkStatusXML()
        {
            var dataElement = new object[DtSet.Tables[0].Rows.Count];
            var j = 0;
            for (int i = 0; i < DtSet.Tables[0].Rows.Count; i++)
            {
                string PointId = DtSet.Tables[0].Rows[i]["Key"].ToString();
                string StatusCode = "";
                string StatusName = DtSet.Tables[0].Rows[i]["Status"].ToString();
                string ApplicationCode = "";
                string ApplicationName = DtSet.Tables[0].Rows[i]["ApplicationName"].ToString();
                string ResultMatches = DtSet.Tables[0].Rows[i]["ResultMatches"].ToString();
                string TesterEmailID = DtSet.Tables[0].Rows[i]["TesterEmailID"].ToString();
                string Activities = DtSet.Tables[0].Rows[i]["Activities"].ToString();
                string FinalResult = "";
                string AuditDate = DtSet.Tables[0].Rows[i]["AuditDate"].ToString();
                AuditDate = AuditDate.Split(' ')[0];
                AuditDate = AuditDate.Split('/')[1] + "/" + AuditDate.Split('/')[0] + "/" + AuditDate.Split('/')[2];
                string Resubmission = DtSet.Tables[0].Rows[i]["Resubmission"].ToString();
                string Auditor = DtSet.Tables[0].Rows[i]["Auditor"].ToString();
                string ApplicationID = DtSet.Tables[0].Rows[i]["ApplicationID"].ToString();
                string VersionNumber = "";
                if (DtSet.Tables[0].Rows[i]["Target"].ToString() == "" || DtSet.Tables[0].Rows[i]["Target"].ToString() == null)
                {
                    VersionNumber = "0";
                }
                else
                {
                    VersionNumber = DtSet.Tables[0].Rows[i]["VersionNumber"].ToString();
                }
                string AdditionalInformation = DtSet.Tables[0].Rows[i]["AdditionalInformation"].ToString();
                string ManagersID = "";
                string ManagersName = DtSet.Tables[0].Rows[i]["Managers"].ToString();
                string UpdatedDate = txtdate.Text;
                string StepstoReproduce = DtSet.Tables[0].Rows[i]["StepstoReproduce"].ToString();
                string Comments = DtSet.Tables[0].Rows[i]["Comments"].ToString();
                string EntryDate = "";
                string UserId = "ADMIN";
                string AHT = "";
                if (DtSet.Tables[0].Rows[i]["AHT"].ToString() == "" || DtSet.Tables[0].Rows[i]["AHT"].ToString() == null)
                {
                    AHT = "0";
                }
                else
                {
                    AHT = DtSet.Tables[0].Rows[i]["AHT"].ToString();
                }
                string Target = "";
                if (DtSet.Tables[0].Rows[i]["Target"].ToString() == "" || DtSet.Tables[0].Rows[i]["Target"].ToString() == null)
                {
                    Target = "0";
                }
                else
                {
                    Target = DtSet.Tables[0].Rows[i]["Target"].ToString();
                }

                dataElement.SetValue(new XElement("Record", new XAttribute("PointId", PointId), new XAttribute("StatusCode", StatusCode),
                new XAttribute("StatusName", StatusName), new XAttribute("ApplicationCode", ApplicationCode), new XAttribute("ApplicationName", ApplicationName),
                new XAttribute("ResultMatches", ResultMatches), new XAttribute("TesterEmailID", TesterEmailID), new XAttribute("Activities", Activities),
                new XAttribute("FinalResult", FinalResult), new XAttribute("AuditDate", AuditDate), new XAttribute("Resubmission", Resubmission),
                new XAttribute("Auditor", Auditor), new XAttribute("ApplicationID", ApplicationID), new XAttribute("VersionNumber", VersionNumber),
                new XAttribute("AdditionalInformation", AdditionalInformation), new XAttribute("ManagersID", ManagersID), new XAttribute("ManagersName", ManagersName),
                new XAttribute("UpdatedDate", UpdatedDate), new XAttribute("StepstoReproduce", StepstoReproduce), new XAttribute("Comments", Comments),
                new XAttribute("EntryDate", EntryDate), new XAttribute("UserId", UserId), new XAttribute("AHT", AHT), new XAttribute("Target", Target)),
                    j++);
            }
            return new XDocument(new XElement("EmployeeWkStatus", dataElement));
        }
    }
}