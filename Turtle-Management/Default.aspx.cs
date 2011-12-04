using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;


using System.Web.Configuration;
using System.Web.UI.HtmlControls;
using System.Data;
using System.Web.Security;

namespace Turtle_Management
{
    public partial class _Default : System.Web.UI.Page
    {
        DataTable table = new DataTable();
        TextBox TextBox1, TextBox2, TextBox3, TextBox4, TextBox5;
        Button Button1, Button2, Button3, Btn_AddTask;

        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (User.Identity.IsAuthenticated)
            {
                Calendar main_cal = loginview.FindControl("main_cal") as Calendar;
                TextBox1 = loginview.FindControl("TextBox1") as TextBox;
                TextBox2 = loginview.FindControl("TextBox2") as TextBox;
                TextBox3 = loginview.FindControl("TextBox3") as TextBox;
                TextBox4 = loginview.FindControl("TextBox4") as TextBox;
                TextBox5 = loginview.FindControl("TextBox5") as TextBox;

                Button1 = loginview.FindControl("Button1") as Button;
                Button2 = loginview.FindControl("Button2") as Button;
                Button3 = loginview.FindControl("Button3") as Button;
                Btn_AddTask = loginview.FindControl("Btn_AddTask") as Button;
                //string key = Membership.GetUser(User.Identity.Name).ProviderUserKey.ToString();






                //--jose
                main_cal.Height = 700;
                main_cal.Width = 700;
                main_cal.ShowGridLines = true;
                main_cal.OtherMonthDayStyle.ForeColor = System.Drawing.ColorTranslator.FromHtml("#FF0000");
                Btn_AddTask.Click += new EventHandler(this.onClick);
                TextBox1.Attributes["onclick"] = "clearTextBox(this.id)";
                //TextBox3.Attributes["onclick"] = "clearTextBox(this.id)";
                Button1.Click += new EventHandler(this.onClick_edit);
                Button2.Click += new EventHandler(this.onClick_remove);


                //if (!IsPostBack)
                //{
                //    InitializeComponent();

                //}                
            }
            
        }



        public void main_cal_DayRender(object sender, DayRenderEventArgs e)
        {

            if (table != null)
            {
                System.Configuration.ConnectionStringSettings conn_string = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["ApplicationServices"];
                SqlConnection connection1 = new SqlConnection(conn_string.ToString());
                string query;
                query = "SELECT * FROM Calandar_Data";

                SqlCommand command = new SqlCommand(query, connection1);
                SqlDataAdapter ad = new SqlDataAdapter(query, connection1);

                connection1.Open();

                SqlDataReader reader = command.ExecuteReader();

                LiteralControl child = new LiteralControl();
                child.Text = e.Day.Date.ToShortDateString();
                e.Cell.Controls.Add(child);

                //html anchor ( pop up)

                HtmlAnchor a = new HtmlAnchor();
                a.Title = "Add Event";
                a.InnerHtml = "<BR/>ADD EVENT<BR/>";
                string m = "ShowAddTaskPane(event,'" + e.Day.Date.ToShortDateString() + "')";
                a.HRef = "#";
                a.ID = e.Day.Date.ToShortDateString();
                a.Attributes.Add("onClick", m);
                e.Cell.Controls.Add(a);
                LiteralControl space = new LiteralControl();
                space.Text = " <BR/> ";
                e.Cell.Controls.Add(space);

                while (reader.Read())
                {

                    var temp = reader[0];
                    string temp2 = DateTime.Parse(reader[0].ToString()).ToShortDateString();
                    string temp1 = e.Day.Date.ToShortDateString();

                    if (temp2 == e.Day.Date.ToShortDateString())
                    {
                        HtmlAnchor lb1 = new HtmlAnchor();
                        string check = reader[1].ToString();
                        lb1.InnerHtml = check;
                        lb1.Title = "" + check + "";
                        var id = reader[2].ToString();

                        
                        string n = "ShowEditBox(event,'" + e.Day.Date.ToShortDateString() + "','" + id + "','" + reader[3].ToString() + "')";
                        lb1.HRef = "#";
                        lb1.Attributes.Add("onClick", n);
                        e.Cell.Controls.Add(lb1);
                        LiteralControl space1 = new LiteralControl();
                        space1.Text = "<BR/>";
                        e.Cell.Controls.Add(space1);

                        e.Cell.Wrap = true;
                    }

                }


            }



            if (e.Day.IsOtherMonth)   // if not day of that specific month, then you cant edit dates
            {
                e.Cell.Controls.Clear();
            }

        }

        protected void onClick(Object sender, EventArgs e)
        {
            Button clicked = (Button)sender;
            clicked.Enabled = false;
            string query1;
            System.Configuration.ConnectionStringSettings conn_string = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["ApplicationServices"];
            SqlConnection connection1 = new SqlConnection(conn_string.ToString());
            query1 = "INSERT INTO [Calandar_Data] (Date,Data) VALUES('" + TextBox2.Text + "','" + TextBox1.Text + "')";
            var tempo = (TextBox2.Text).ToString();
            SqlCommand command1 = new SqlCommand(query1, connection1);
            //SqlDataAdapter ad1 = new SqlDataAdapter(command1);
            connection1.Open();
            command1.ExecuteNonQuery();
            //This assumes the the user actually entered a date and data for when they clicked add event
            // open reader and iterate through the updated database 
            Response.Redirect(Request.RawUrl);
        }

        protected void onClick_edit(object sender, EventArgs e)
        {

            // insert query that will insert "detailed information" for a specific "data value" in the databse
            System.Configuration.ConnectionStringSettings conn_string = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["ApplicationServices"];
            SqlConnection connection1 = new SqlConnection(conn_string.ToString());
            string edit_query = "UPDATE [Calandar_Data] SET Edit = '" + TextBox3.Text + "' WHERE ID = '" + TextBox5.Text + "'";
            SqlCommand edit_command = new SqlCommand(edit_query, connection1);
            connection1.Open();
            edit_command.ExecuteNonQuery();

        }

        protected void onClick_remove(object sender, EventArgs e)
        {
            // remove
            Button clicked1 = (Button)sender;
            clicked1.Enabled = false;
            string delete_query = "DELETE FROM [Calandar_Data] WHERE Date='" + TextBox4.Text + "' AND ID ='" + TextBox5.Text + "'";
            System.Configuration.ConnectionStringSettings conn_string = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["ApplicationServices"];
            SqlConnection connection1 = new SqlConnection(conn_string.ToString());
            SqlCommand delete_command = new SqlCommand(delete_query, connection1);
            connection1.Open();
            delete_command.ExecuteNonQuery();
            Response.Redirect(Request.RawUrl);
        }
       
    }
}
