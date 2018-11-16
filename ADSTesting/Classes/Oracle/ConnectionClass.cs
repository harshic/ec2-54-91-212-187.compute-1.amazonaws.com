using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OracleClient;
using System.Linq;
using System.Web;

namespace ADSTesting.Classes.Oracle
{
    public class ConnectionClass
    {
        protected static string strConnectionString;

        public ConnectionClass()
        {
            strConnectionString = ConfigurationManager.AppSettings["Orclconnectionstring"];
        }
        public OracleConnection GetConnection()
        {
            OracleConnection objOracleConnection = new OracleConnection(strConnectionString);
            return objOracleConnection;
        }
        public void OpenConnection(ref OracleConnection objConnection)
        {
            if (objConnection.State == ConnectionState.Closed)
                objConnection.Open();

        }
        public void CloseConnection(ref OracleConnection objConnection)
        {
            if (objConnection.State == ConnectionState.Open)
                objConnection.Close();
            objConnection.Dispose();
        }
        public OracleCommand GetCommand(string strOracleStmt, ref OracleConnection objConnection)
        {
            return (new OracleCommand(strOracleStmt, objConnection));
        }
        public void CloseDataReader(ref OracleDataReader objDataReader)
        {
            if (objDataReader != null)
                if (!objDataReader.IsClosed)
                    objDataReader.Close();
        }
        public OracleDataAdapter GetDataAdapter(string strOracleStmt, ref OracleConnection objConnection)
        {
            return (new OracleDataAdapter(strOracleStmt, objConnection));
        }
    }
}