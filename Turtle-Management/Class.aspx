<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Class.aspx.cs" Inherits="Turtle_Management.Class" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="Handler.aspx?ms=connect" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="SidePannel" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div id="ChatBase">
        <div id="Chats">
            Chat window here<br />
        </div>
    </div>
    <input id="info" />
    <input type="button" id="btnChat" value="Send" />

    <script type="text/javascript">
        var chatButton = document.getElementById("btnChat");

        document.OnPokeInReady = function () {
            PokeIn.Start(function (status) {
                if (status) {
                    //connected to chat server
                }
            });

            //when connection is closed by the server
            PokeIn.OnClose = function () {
                ChatMessageFrom({ Username: "Turtle", Message: "Disconnected from server" });
            };
        }

        //var lbl = document.getElementById("lbl")
        var info = document.getElementById("info");
        var chatWind = document.getElementById("Chats");
        var chatBase = document.getElementById("ChatBase");

        var user_name = 'testUser' + Math.random() + '';
        var user_names = [];

        Chat.SetName(user_name);

        chatButton.onclick = function () {
            
            var client_message = info.value;
            var message = new ChatMessage();
            message.Message = client_message;
            message.Username = user_name;
            Chat.Send(message);
            info.value = "";               
            
        }

        info.onkeydown = function(ev) {
        if (btnChat.disabled != "")
            return;
        var ev = ev || window.event;
        if (ev.keyCode == 13) {
            btnChat.onclick();
        }

        function ChatMessageFrom(chatMessage) {
        chatWind.innerHTML += "<strong>" + chatMessage.Username + "</strong>:: " + chatMessage.Message + "<br/>";
        chatBase.scrollTop = chatWind.clientHeight;
        }

        function UserNameList_Updated(names) {
            user_names = names;
        }

        function UsernameSet(user){
            user_name = user;
            ChatMessageFrom({Username: "Turtle Management", Message: "Hi" + user + "Welcome to class"});

        }


    }


    </script>
</asp:Content>
