using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using PokeIn.Comet;

namespace Turtle_Management
{
    public partial class BlackBoard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            CometWorker.OnClientConnected +=new DefineClassObjects(CometWorker_OnClientConnected);
        }

        static void CometWorker_OnClientConnected(ConnectionDetails details, ref Dictionary<string, object> classList)
        {
            classList.Add("Draw", new DataApp(details.ClientId));
        }
    }
}