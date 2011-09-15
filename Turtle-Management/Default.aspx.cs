using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

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
            }
            
        }

       
    }
}
