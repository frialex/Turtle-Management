using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PokeIn;
using PokeIn.Comet;
using System.Threading;

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

        static DataApp()
        {
            new Thread(delegate()
            {
               while (true)
               {
                   //string jsonmethod = json.method("updatetime", datetime.now.ticks);
                   //cometworker.groups.send("timechannel", jsonmethod);
                   Thread.Sleep(1);
               }
            }).Start();
        }

        public DataApp(string clientId)
        {
            _clientId = clientId;
        }

        public void Dispose()
        {

        }
        
        //TODO: Remove this?
        public void sendPoints(DataMessage points)
        {
            string json = JSON.Method("DataPointRecv", points);
            CometWorker.SendToAll(json);
        }

        public void SubscribeToTimeChannel()
        {
            CometWorker.Groups.PinClientID(_clientId, "TimeChannel");
        }

        public void startline(DataMessage points)
        {
            //string json = json.method("start_line", point);
            string json = JSON.Method("startline", points);
            //CometWorker.SendToAll(json);
            CometWorker.Groups.Send("TimeChannel", json);

        }

        public void resumeline(DataMessage points)
        {
            string json = JSON.Method("resumeline", points);
            //CometWorker.SendToAll(json);
            CometWorker.Groups.Send("TimeChannel", json);
        }

    }
}