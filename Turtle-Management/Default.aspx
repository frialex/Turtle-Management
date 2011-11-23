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
            <asp:Calendar ID="main_cal" runat="server" OnDayRender="main_cal_DayRender" Visible="True"
                OnSelectionChanged="main_cal_SelectionChanged">
                <OtherMonthDayStyle ForeColor="LightGray"></OtherMonthDayStyle>
            </asp:Calendar>
            <form id="form" method="post" action="Calendar.aspx">
            <div id="AddTaskPane" style="position: fixed; top: 10px; right: 10px; visibility: hidden;
                width: 200px; height: 100px;">
                <asp:TextBox ID="TextBox1" runat="server" TextMode="SingleLine" onclick="onClick" />
                <asp:TextBox ID="TextBox2" runat="server" CssClass="TextBox2" />
                <asp:Button ID="Btn_AddTask" runat="server" Text="Add Task" OnClick="onClick" />
            </div>
            <div id="edit_box" style="position: fixed; top: 10px; right: 10px; visibility: hidden;
                width: 300px; height: 300px">
                <asp:TextBox ID="TextBox3" runat="server" TextMode="MultiLine" Height="300" Width="300"
                    onclick="onClick" />
                <asp:TextBox ID="TextBox4" runat="server" CssClass="TextBox4" />
                <%--date --%>
                <asp:TextBox ID="TextBox5" runat="server" CssClass="TextBox5" />
                <%-- id --%>
                <asp:Button ID="Button1" runat="server" Text="Edit" OnClick="onClick_edit" />
                <asp:Button ID="Button2" runat="server" Text="Remove" OnClick="onClick_remove" />
                <asp:Button ID="Button3" runat="server" Text="Completed" />
            </div>
            </form>
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

                        var temp = document.getElementById("MainContent_TextBox2");

                        document.getElementById("MainContent_TextBox2").value = selectedDate;

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


                    function ShowEditBox(e, selectedDate, id) {

                        var ev = e || window.event;

                        document.getElementById("edit_box").style.visibility = 'visible';

                        document.getElementById("AddTaskPane").style.visibility = 'hidden';

                        document.getElementById("edit_box").style.top = ev.clientY;

                        document.getElementById("MainContent_TextBox4").value = selectedDate;

                        document.getElementById("MainContent_TextBox5").value = id;

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
            <div style="display: inline-block; float: right">
                <asp:GridView ID="classGrid" runat="server" CellPadding="4" ForeColor="#333333" GridLines="None"
                    AutoGenerateColumns="False" CssClass="classGridView">
                    <AlternatingRowStyle BackColor="White" ForeColor="#284775" />
                    <Columns>
                        <asp:HyperLinkField DataNavigateUrlFields="ClassId" 
                            DataNavigateUrlFormatString="Class.aspx?classid={0}" DataTextField="class_name" 
                            HeaderText="Enrolled Classes" />
                    </Columns>
                    <EditRowStyle BackColor="#999999" />
                    <FooterStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
                    <HeaderStyle BackColor="#5D7B9D" Font-Bold="True" ForeColor="White" />
                    <PagerStyle BackColor="#284775" ForeColor="White" HorizontalAlign="Center" />
                    <RowStyle BackColor="#F7F6F3" ForeColor="#333333" />
                    <SelectedRowStyle BackColor="#E2DED6" Font-Bold="True" ForeColor="#333333" />
                    <SortedAscendingCellStyle BackColor="#E9E7E2" />
                    <SortedAscendingHeaderStyle BackColor="#506C8C" />
                    <SortedDescendingCellStyle BackColor="#FFFDF8" />
                    <SortedDescendingHeaderStyle BackColor="#6F8DAE" />
                </asp:GridView>
            </div>
        </LoggedInTemplate>
        <AnonymousTemplate>
        </AnonymousTemplate>
    </asp:LoginView>
</asp:Content>