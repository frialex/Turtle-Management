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
        protected string ClassId;

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

            //TODO: Why is it users can send messages across chatrooms??? THIS SHOULD NOT BE THE CASE!!!!
            CometWorker.OnClientConnected += new DefineClassObjects(CometWorker_OnClientConnected);
        }
    }
}