<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="Turtle_Management._Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="SidePannel">
    <asp:LoginView id="loginview" runat="server">
        <LoggedInTemplate>
            <div style="float: left">
                <asp:Calendar ID="main_cal" runat="server" BackColor="White" BorderColor="Black"
                    BorderStyle="Groove" CellSpacing="1" Font-Names="Verdana" Font-Size="9pt" ForeColor="Black"
                    Height="250px" NextPrevFormat="ShortMonth" Width="330px">
                    <DayHeaderStyle Font-Bold="True" Font-Size="8pt" ForeColor="#333333" Height="8pt" />
                    <DayStyle BackColor="#CCCCCC" />
                    <NextPrevStyle Font-Bold="True" Font-Size="8pt" ForeColor="White" />
                    <OtherMonthDayStyle ForeColor="#999999" />
                    <SelectedDayStyle BackColor="#333399" ForeColor="White" />
                    <TitleStyle BackColor="#333399" BorderStyle="Solid" Font-Bold="True" Font-Size="12pt"
                        ForeColor="White" Height="12pt" />
                    <TodayDayStyle BackColor="#999999" ForeColor="White" />
                </asp:Calendar>
            </div>
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