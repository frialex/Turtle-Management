using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using PokeIn.Comet;

namespace Turtle_Management
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            CometWorker.OnClientConnected += new DefineClassObjects(CometWorker_OnClientConnected);
            CometWorker.OnReConnectionDecision += new DecisionDelegate(CometWorker_OnReConnectionDecision);
            CometSettings.ReConnectToSameInstanceTimeout = 6500;
        }

        static void CometWorker_OnReConnectionDecision(ConnectionDetails details, ref bool accepted)
        {
            //You may check the parameters from "details" object to decide accept 
            //reconnection to same client id and its objects or not
            accepted = true;
        }

        static void CometWorker_OnClientConnected(ConnectionDetails details, ref Dictionary<string, object> classList)
        {
            classList.Add("Dummy", new DataApp(details.ClientId));

        }

        void Application_End(object sender, EventArgs e)
        {
            //  Code that runs on application shutdown

        }

        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs

        }

        void Session_Start(object sender, EventArgs e)
        {
            // Code that runs when a new session is started

        }

        void Session_End(object sender, EventArgs e)
        {
            // Code that runs when a session ends. 
            // Note: The Session_End event is raised only when the sessionstate mode
            // is set to InProc in the Web.config file. If session mode is set to StateServer 
            // or SQLServer, the event is not raised.

        }

    }
}
