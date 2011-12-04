using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;


using System.Web.Configuration;
using System.Web.UI.HtmlControls;
using System.Data;
using System.Web.Security;
namespace Turtle_Management
{
    public partial class Distance_Learning : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (User.Identity.IsAuthenticated)
            {
                System.Configuration.ConnectionStringSettings conn_string = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["ApplicationServices"];
                SqlConnection connection = new SqlConnection(conn_string.ToString());
                SqlCommand cmd = new SqlCommand("SELECT [class_lookup].class_name, [class_lookup].ClassId FROM [class_lookup] JOIN [user-class] ON ([user-class].ClassId = [class_lookup].ClassId) WHERE [user-class].UserId = '" + Membership.GetUser(User.Identity.Name).ProviderUserKey.ToString() + "'", connection);

                connection.Open();
                SqlDataReader reader1 = cmd.ExecuteReader();
                //SqlDataReader reader2 = cmd.ExecuteReader();

                GridView classGrid = mainContentLoginView.FindControl("classGrid") as GridView;
                GridView BlackboardGrid = LoginViewBlackboard.FindControl("BlackboardGrid") as GridView;


                classGrid.DataSource = reader1;
                classGrid.DataBind();

                reader1.Close();

                reader1 = cmd.ExecuteReader();

                BlackboardGrid.DataSource = reader1;
                BlackboardGrid.DataBind();
            }
        }
    }
}