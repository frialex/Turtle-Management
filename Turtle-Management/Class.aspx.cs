using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using PokeIn.Comet;
using System.Data.SqlClient;

namespace Turtle_Management
{
    public partial class Class : System.Web.UI.Page
    {
        protected string turtle_user_name;
        protected string ClassId;
        protected string className;

        static void _class()
        {
            //CometWorker.OnClientConnected += new DefineClassObjects(CometWorker_OnClientConnected);
            var test = "does it break here?";
        }

        static void CometWorker_OnClientConnected(ConnectionDetails details, ref Dictionary<string, object> classList)
        {
            classList.Add("Chat", new ChatApp(details.ClientId) );
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            turtle_user_name = User.Identity.Name.ToString();
            ClassId = Request.QueryString["classid"];

            CometWorker.OnClientConnected += new DefineClassObjects(CometWorker_OnClientConnected);

            System.Configuration.ConnectionStringSettings conn_string = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["ApplicationServices"];
            SqlConnection connection = new SqlConnection(conn_string.ToString());
            SqlCommand cmd = new SqlCommand("SELECT [class_lookup].class_name FROM [class_lookup] where ClassId=" + ClassId, connection);

            connection.Open();
           
            className = (string)cmd.ExecuteScalar();

            connection.Close();
        }
    }
}