<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="BlackBoard.aspx.cs" Inherits="Turtle_Management.BlackBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    	<script type="text/javascript" src="Scripts/jquery-1.4.1.min.js"></script>
		<script type="text/javascript" src="Scripts/jquery-1.4.1.js"></script>
		
    <script>
        window.onload = init;

        var isMouseDown = false;
        function drawArc(context, x, y) {
            context.arc(x, y, 50, 0, 2 * Math.PI, true);
            context.lineWidth = 5;
            context.strokeStyle = "black"; // line color
            context.stroke();
            context.closePath();
        }
        function onMouseDown(e) {
            isMouseDown = true;
            var canvas = document.getElementById("blackboard-canvas");
            var context = canvas.getContext("2d");
            var pos = getMousePosition(e);
            var x = pos.x, y = pos.y;
            context.fillRect(x - 25, y - 25, 50, 50);
            //context.strokeRect(x-25,y-25,50,50);
            //drawArc(context,x,y);
            return;
            if (!window.started) {
                context.beginPath();
                context.moveTo(x, y);
                window.started = true;
            } else {
                context.lineTo(x, y);
                context.stroke();
            }

        }
        function onMouseUp(e) {
            isMouseDown = false;
            var canvas = document.getElementById("blackboard-canvas");
            var context = canvas.getContext("2d");
            var pos = getMousePosition(e);
            window.started = false;
        }
        function init() {
            var canvas = document.getElementById("blackboard-canvas");
            canvas.addEventListener("mousedown", onMouseDown, false);
            canvas.addEventListener('mouseup', onMouseUp, false);
            canvas.addEventListener('mousemove', onMouseMove, false);
            showColorPicker();
        }
        function onMouseMove(e) {
            if (!isMouseDown) return;
            else onMouseDown(e);
        }
        function getMousePosition(e) {
            var x, y;
            if (e.offsetX) {
                x = e.offsetX;
                y = e.offsetY;
            }
            else if (e.layerX) {
                x = e.layerX;
                y = e.layerY;
            }
            return { x: x,
                y: y
            };
        }
        function clearBoard() {
            var canvas = document.getElementById("blackboard-canvas");
            canvas.width = canvas.width;
        }
        function showColorPicker() {
            var ctx = document.getElementById('color-picker').getContext('2d');
            for (var i = 0; i < 30; i++) {
                for (var j = 0; j < 30; j++) {
                    ctx.fillStyle = 'rgb(' +
				            ((i / 30 * 255) | 0) + ',' +
				            ((j / 30 * 255) | 0) + ',50)';
                    ctx.fillRect(i * 10, j * 10, 10, 10);
                }
            }
            $('#color-picker').click(function (e) {
                var data = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
                var rgb = 'rgb(' + [].slice.call(data, 0, 3).join() + ")";
                var ctx2 = document.getElementById('blackboard-canvas').getContext('2d');
                ctx2.strokeStyle = rgb;

            });

        }
        </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="SidePannel" runat="server">
    <canvas class = "Blackboard drawCursor"
				id = "blackboard-canvas" 
				width="400"
				height="400"></canvas>	
		
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server" >
    <canvas class ='colorSpectrum' id='color-picker' width="400" height="400"></canvas>
	<button name = "clearButton" onclick="clearBoard();">clear board</button> 	
</asp:Content>
