<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Distance_Learning.aspx.cs" Inherits="Turtle_Management.Distance_Learning" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="SidePannel" runat="server">
<asp:LoginView ID="LoginViewBlackboard" runat="server">
        <LoggedInTemplate>
            <div style="display: inline-block; float: right">
                <asp:GridView ID="BlackboardGrid" runat="server" CellPadding="4" ForeColor="#333333" GridLines="None"
                    AutoGenerateColumns="False" CssClass="classGridView">
                    <AlternatingRowStyle BackColor="White" ForeColor="#284775" />
                    <Columns>
                        <asp:HyperLinkField DataNavigateUrlFields="ClassId" 
                            DataNavigateUrlFormatString="BlackBoard.aspx?classid={0}" DataTextField="class_name" 
                            HeaderText="Blackboard Rooms" />
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


<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
     <asp:LoginView ID="mainContentLoginView" runat="server">
        <LoggedInTemplate>
            <div style="display: inline-block; float: right">
                <asp:GridView ID="classGrid" runat="server" CellPadding="4" ForeColor="#333333" GridLines="None"
                    AutoGenerateColumns="False" CssClass="classGridView">
                    <AlternatingRowStyle BackColor="White" ForeColor="#284775" />
                    <Columns>
                        <asp:HyperLinkField DataNavigateUrlFields="ClassId" 
                            DataNavigateUrlFormatString="Class.aspx?classid={0}" DataTextField="class_name" 
                            HeaderText="Chat Rooms" />
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
