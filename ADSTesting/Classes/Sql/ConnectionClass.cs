using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ADSTesting.Classes.Sql
{
    public class ConnectionClass
    {
        protected static string StrConnectionString;
        public ConnectionClass()
        {
            StrConnectionString = ConfigurationManager.AppSettings["SqlConnectionString"];
        }
        public SqlConnection GetConnection()
        {
            SqlConnection objSqlConnection = new SqlConnection(StrConnectionString);

            return objSqlConnection;
        }
        public void CloseConnection(ref SqlConnection objConnection)
        {
            if (objConnection.State == ConnectionState.Open)
                objConnection.Close();
        }
        public SqlCommand GetCommand(string strSQLStmt, ref SqlConnection objConnection)
        {
            return (new SqlCommand(strSQLStmt, objConnection));
        }
        public void CloseDataReader(ref SqlDataReader objDataReader)
        {
            if (objDataReader != null)
                if (!objDataReader.IsClosed)
                    objDataReader.Close();
        }
        public SqlDataAdapter GetDataAdapter(string strSQLStmt, ref SqlConnection objConnection)
        {
            return (new SqlDataAdapter(strSQLStmt, objConnection));
        }
    }
}