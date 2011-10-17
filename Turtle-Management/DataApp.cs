using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PokeIn;
using PokeIn.Comet;

namespace Turtle_Management
{
    [Serializable]
    public class DataMessage
    {
        public int X, Y;

        public DataMessage()
        {
            X = 0;
            Y = 0;   
        }

        public DataMessage(int x, int y)
        {
            X = x;
            Y = y;
        }
    }

    public class DataApp : IDisposable
    {
        string _clientId;

        public DataApp(string clientId)
        {
            _clientId = clientId;
        }

        public void Dispose()
        {

        }
        
        public void sendPoints(string x, string y)
        {
            string json = JSON.Method("DataPointRecv", x.ToString() + ":" + y.ToString());
            CometWorker.SendToAll(json);
        }

    }
}