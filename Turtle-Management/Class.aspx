<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Class.aspx.cs" Inherits="Turtle_Management.Class" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="Handler.aspx?ms=connect" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="SidePannel" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div id="ChatBase" style="width: 400px;
        height: 400px; overflow-y: scroll; overflow-x: hidden; border: solid 1px #006699;">
        <div id="Chats" class="white" style="margin: 0px; padding: 5px; width: 380px;">
            Welcome to: CLASS NAME <br />
        </div>
    </div>
    <input id="info" style="position: relative; border: solid 1px #006699;" type="text" />
    <input type="button" id="btnChat" value="Send" style="position: relative;
       cursor: pointer;" />

 <script>

     var btnChat = document.getElementById("btnChat");

     document.OnPokeInReady = function () {
         PokeIn.Start(function (status) {
             if (status) {
                 btnChat.disabled = "";
             }
         });

         //PokeIn Connection Closed By Server 
         PokeIn.OnClose = function () {
             ChatMessageFrom({ Username: "SERVER", Message: "Your Connection Closed!" });
         };

         /*
         To Test functionality the event below, 
         comment out the assignment : PokeIn.Comet.CometSettings.MultiWindowsForSameSession = true;
         inside Page_Load function and open this chat window in same browser ( different tabs )
         */
         PokeIn.SessionCloneDetected = function () {
             ChatMessageFrom({ Username: "SERVER", Message: "Session Clone Detected" });
         };
     }

     var lbl = document.getElementById("lbl");
     var info = document.getElementById("info");
     var chatWind = document.getElementById("Chats");
     var chatBase = document.getElementById("ChatBase");

     var user_name = "<%= turtle_user_name %>";
     var user_names = [];

     if (user_name != "") {
         Chat.SetName(user_name);
     }

     btnChat.onclick = function () {
         if (user_name == "") {
             user_name = info.value;
             if (user_name.replace(/ /g, "").length == 0) {
                 alert('You should enter the user name');
                 return;
             }
             Chat.SetName(user_name);
             btnChat.disabled = "disabled";
             user_name = "";
         }
         else {
             var mess = info.value;
             if (mess.replace(/ /g, "").length == 0) {
                 alert('You should enter some text to send');
                 return;
             }

             //PokeIn automaticly defines server side ChatMessage class into the client side
             //Because one of the main class functions has a ChatMessage type parameter
             var message = new ChatMessage();
             message.Message = mess;
             message.Username = user_name;
             Chat.Send(message);
             info.value = "";
         }
     }

     info.onkeydown = function (ev) {
         if (btnChat.disabled != "")
             return;
         var ev = ev || window.event;
         if (ev.keyCode == 13) {
             btnChat.onclick();
         }
     }


     function ChatMessageFrom(chatMessage) {
         chatWind.innerHTML += "<strong>" + chatMessage.Username + "</strong>:: " + chatMessage.Message + "<br/>";
         chatBase.scrollTop = chatWind.clientHeight;
     }

     function UserNameList_Updated(names) {
         user_names = names;
     }

     function UsernameSet(user) {
         user_name = user;
         btnChat.value = "Send";
         info.value = "";
         lbl.innerHTML = "Message ::";
         ChatMessageFrom({ Username: "SERVER", Message: "Hi " + user + "!<br/>Welcome to Our Server!" });
         btnChat.disabled = "";
     } 

</script>
</asp:Content>
