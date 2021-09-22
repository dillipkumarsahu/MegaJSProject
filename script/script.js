var open = document.getElementById("open_box");
open.onclick = function(){
	var box = document.getElementById("form_box");
	box.setAttribute("class","pull");
}
var close = document.getElementById("close_box");
close.onclick = function(){
	var box = document.getElementById("form_box");
	box.setAttribute("class","push");
}



