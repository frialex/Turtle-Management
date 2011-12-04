<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="Turtle_Management._Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">

</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="SidePannel">
    <asp:LoginView id="loginview" runat="server">
        <LoggedInTemplate>
            <p>
                <big>Calendar</big>
            </p>
            <asp:Calendar ID="main_cal" runat="server" OnDayRender="main_cal_DayRender" 
                Visible="True">
                <OtherMonthDayStyle ForeColor="LightGray"></OtherMonthDayStyle>
            </asp:Calendar>
            <div ID="AddTaskPane" style="position: fixed; top: 10px; right: 10px; visibility: hidden;
                width: 200px; height: 100px;">
                <asp:TextBox ID="TextBox1" runat="server" onclick="onClick" 
                    TextMode="SingleLine" />
                <asp:TextBox ID="TextBox2" runat="server" CssClass="TextBox2" />
                <asp:Button ID="Btn_AddTask" runat="server" OnClick="onClick" Text="Add Task" />
            </div>
            <div ID="edit_box" style="position: fixed; top: 10px; right: 10px; visibility: hidden;
                width: 300px; height: 300px">
                <asp:TextBox ID="TextBox3" runat="server" Height="300" onclick="onClick" 
                    TextMode="MultiLine" Width="300" placeholder="Add Information Here..." />
                <asp:TextBox ID="TextBox4" runat="server" CssClass="TextBox4" />
                <%--date --%>
                <asp:TextBox ID="TextBox5" runat="server" CssClass="TextBox5" />
                <%-- id --%>
                <asp:Button ID="Button1" runat="server" OnClick="onClick_edit" Text="Edit" />
                <asp:Button ID="Button2" runat="server" OnClick="onClick_remove" 
                    Text="Remove" />
                <asp:Button ID="Button3" runat="server" Text="Completed" />
            </div>
            <asp:Label ID="anchor" runat="server" onclick="onClick"></asp:Label>
            <div>
                <style type="text/css">
                    #AddTaskPane
                    {
                        visibility: visible;
                        background-color: Yellow;
                    }
                    
                    #edit_box
                    {
                        visibility: visible;
                        background-color: Blue;
                    }
                    
                    .TextBox2
                    {
                        visibility: hidden;
                    }
                    
                    .TextBox4
                    {
                        visibility: hidden;
                    }
                    
                    .TextBox5
                    {
                        visibility: hidden;
                    }
                </style>
                <script type="text/javascript">

                    function ShowAddTaskPane(e, selectedDate) {
                        var ev = e || window.event;

                        document.getElementById("AddTaskPane").style.visibility = 'visible';

                        document.getElementById("edit_box").style.visibility = 'hidden';

                        document.getElementById("AddTaskPane").style.top = ev.clientY;

                        document.getElementById("AddTaskPane").style.left = ev.clientX;

                        var temp = document.getElementById("SidePannel_loginview_TextBox2");

                        document.getElementById("SidePannel_loginview_TextBox2").value = selectedDate;

                    }

                    function refresh() {
                        window.location.reload();
                    }

                    function clear() {

                        //window.clear();
                        //document.body.innerHTML = " ";
                        if (document.getElementbyId != document.getElementById("AddTaskPane")) { }
                        else if (document.getElementbyId != document.getElementById("edit_box")) { }
                        else { document.body.innerHTML = "localhost:1947/Calendar.aspx"; }

                    }


                    function ShowEditBox(e, selectedDate, id, update_text) {

                        var ev = e || window.event;

                        document.getElementById("edit_box").style.visibility = 'visible';

                        document.getElementById("AddTaskPane").style.visibility = 'hidden';

                        document.getElementById("edit_box").style.top = ev.clientY;

                        document.getElementById("SidePannel_loginview_TextBox4").value = selectedDate;

                        document.getElementById("SidePannel_loginview_TextBox5").value = id;

                        document.getElementById("SidePannel_loginview_TextBox3").value = update_text;

                        if (update_text == "Add Information Here...") {
                            clearTextBox("SidePannel_loginview_TextBox3");
                        }

                    }

                    //function completed(
                    function clearTextBox(textBoxID) {
                        document.getElementById(textBoxID).value = "";
                    }

                </script>
        </LoggedInTemplate>
        <AnonymousTemplate>
            <h1>Please Log in..</h1>
        </AnonymousTemplate>
   </asp:LoginView>
</asp:Content>

<asp:Content ID="MainContent" runat="server" ContentPlaceHolderID="MainContent" >
    <asp:LoginView ID="mainContentLoginView" runat="server">
        <LoggedInTemplate>
            
        </LoggedInTemplate>
        <AnonymousTemplate>
        </AnonymousTemplate>
    </asp:LoginView>
</asp:Content>