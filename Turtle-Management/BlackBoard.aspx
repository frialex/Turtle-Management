<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="BlackBoard.aspx.cs" Inherits="Turtle_Management.BlackBoard" %>

    <asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link type="text/css" href="css/cupertino/jquery-ui-1.8.16.custom.css" rel="stylesheet" />	
		<link type="text/css" href="css/blackboard/layout.css" rel="stylesheet" />
		
		<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.8.16.custom.min.js"></script>
		<script type="text/javascript" src="js/blackboard.js"></script>
		<script type="text/javascript" src="js/utility.js"></script>
		<script type="text/javascript" src="Models/BlackboardCanvas.js"></script>
		<script type="text/javascript" src="js/underscore.js"></script>
		<script type="text/javascript" src="Controller/AppController.js"></script>
		<script type="text/javascript" src="Models/ColorChooser.js"></script>
		<script type="text/javascript" src="Models/Toolbox.js"></script>
		<script type="text/javascript" src="Models/ImageIcon.js"></script>
		<script type="text/javascript" src="Models/ToolItem.js"></script>
		<script type="text/javascript" src="Controller/ToolBoxController.js"></script>
		<script type="text/javascript" src="CanvasDrawReasoner/IRender.js"></script>
		<script type="text/javascript" src="CanvasDrawReasoner/FreeRectangleDrawer.js"></script>
		<script type="text/javascript" src="CanvasDrawReasoner/FreePointDrawer.js"></script>

        <script src="Handler.aspx?ms=connect" type="text/javascript"></script>

        <script type="text/javascript">
            document.OnPokeInReady = function () {
                PokeIn.Start(function (status) {
                    if (status) {
                        
                    }
                });
            }
        </script>
		
        <title>Blackboard</title>
    </asp:Content>


 <asp:Content ID="Content2" ContentPlaceHolderID="SidePannel" runat="server">
		<div class="Container">
            <div id = 'left-div'>
                <canvas class = "Blackboard" id = "blackboard-canvas" >

                </canvas>
            </div>                  
            <div id='right-div'>
                <div id = 'tools-div'>
                    <ul>
                        <li><a href='#colorOption-accordion'>Color Options</a></li>
                        <li><a href='#toolbar-option'>Tool Bar</a></li>
                    </ul>
                    <div id='colorOption-accordion'>
					
						<h3><a href="#">RGB-Slider</a></h3>
						<div style="background-color: inherit;">
                    		<span style="margin: 5px;">Red&nbsp;&nbsp;&nbsp;&nbsp;</span>   
                    		<input class = 'slider-value-display' id = 'red-amount' type= "text" maxlength="3" value="0" size="1" disabled="true"/>		
                    		<div id="red-color-slider"></div>
							
							<span style="margin: 5px;">Green&nbsp;</span> 
							<input class = 'slider-value-display' id = 'green-amount' type='text' maxlength="3" value ="0"  size="1" disabled="true"/>			
							<div id ="green-color-slider"></div>
							
							<span style="margin: 5px;">Blue&nbsp;&nbsp;&nbsp;</span>	 
							<input class = 'slider-value-display' id ='blue-amount' type='text' maxlength="3" value ="0"  size="1" disabled="true"/>		
							<div id ="blue-color-slider"></div>
							
							<div class="swatch" id = 'swatch1'></div>
                        </div>
                        
                        <h3><a href="#">Color-Spectrum</a></h3>
                        <div>
                        	<canvas id = 'color-spectrum-canvas'></canvas>
                        	<div class = 'swatch' id = 'swatch2'></div>
                        </div>
                        
                    </div>
                    
                    <div id='toolbar-option'>
						<div id = 'toolbar-div'>
							<!-- Gets populated with toolbar, see ToolBoxController-->
						</div>
						<div id = 'toolbar-option-view' summary="icons-sub-options">
							<!-- Gets populated with sub-options for each toolbar item -->
						</div>
                    </div>
                    
                </div>
            </div>

            <br style="clear:both;"/>
        </div>  
        
        
	    <script type = "text/javascript">
	        $(document).ready(function () {
	            setupApp();
	        })
	    </script>
    
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server" >

</asp:Content>
    

