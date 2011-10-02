using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using PokeIn.Comet;

namespace Turtle_Management
{
    public partial class Class : System.Web.UI.Page
    {
        protected string turtle_user_name;

        //static void _Class()
        //{
        //    CometWorker.OnClientConnected += new DefineClassObjects(CometWorker_OnClientConnected);
        //}

        static void CometWorker_OnClientConnected(ConnectionDetails details, ref Dictionary<string, object> classList)
        {
            classList.Add("Chat", new ChatApp(details.ClientId) );
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            turtle_user_name = User.Identity.Name.ToString();
            string ClassId = Request.QueryString["classid"];

            CometWorker.OnClientConnected += new DefineClassObjects(CometWorker_OnClientConnected);
        }
    }
}