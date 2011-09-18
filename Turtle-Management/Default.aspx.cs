using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

using System.Web.Security;

namespace Turtle_Management
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (User.Identity.IsAuthenticated)
            {
                //Calendar main_cal = loginview.FindControl("main_cal") as Calendar;
                //string key = Membership.GetUser(User.Identity.Name).ProviderUserKey.ToString();

                System.Configuration.ConnectionStringSettings conn_string = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["ApplicationServices"];
                SqlConnection connection = new SqlConnection(conn_string.ToString());
                SqlCommand cmd = new SqlCommand("SELECT [class_lookup].class_name FROM [class_lookup] JOIN [user-class] ON ([user-class].ClassId = [class_lookup].ClassId) WHERE [user-class].UserId = '" + Membership.GetUser(User.Identity.Name).ProviderUserKey.ToString() + "'", connection);

                connection.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                GridView classGrid = mainContentLoginView.FindControl("classGrid") as GridView;
                classGrid.DataSource = reader;
                classGrid.DataBind();
                
            }
            
        }

       
    }
}
