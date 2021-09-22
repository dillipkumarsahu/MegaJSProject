// exit
function exit()
{
	var exit_btn = document.getElementById("exit");
	exit_btn.onclick = function(){
		history.back();
	}
}

exit();

// menu hover coding
function menu_hover()
{
	var app_name = document.getElementById("app-box");
	var li = app_name.getElementsByTagName("LI");
	var i;
	for(i=0;i<li.length;i++)
	{
		li[i].onmouseover = function(){
			this.style.webkitTransform = "rotate(360deg)";
			this.style.mozTransform = "rotate(360deg)";
			this.style.transform = "rotate(360deg)";
			this.style.webkitTransition = "1s";
			this.style.mozTransition = "1s";
			this.style.transition = "1s";
		}

		li[i].onmouseout = function(){
			this.style.webkitTransform = "rotate(0deg)";
			this.style.mozTransform = "rotate(0deg)";
			this.style.transform = "rotate(0deg)";
			this.style.webkitTransition = "1s";
			this.style.mozTransition = "1s";
			this.style.transition = "1s";
		}
	}
}

menu_hover();

//update default ledger
function default_ledger(){
	var cash = localStorage.getItem("cash_ledger");
	var profit_loss = localStorage.getItem("profit_loss_ledger");
	if (cash == null && profit_loss == null) 
	{
		var cash_ledger = {ledger_name:"cash",group:"cash in hand",balance:"",mode:""};
		var cash_store = JSON.stringify(cash_ledger);
		localStorage.setItem("cash_ledger",cash_store);

		var profit_loss_ledger =  {ledger_name:"Profit & Loss A/c",group:"Profit & Loss A/c",balance:"",mode:""};
		var profit_loss_store = JSON.stringify(profit_loss_ledger);
		localStorage.setItem("profit_loss_ledger",profit_loss_store);
	}
}
default_ledger();

// unit of measure
function unit_of_measure()
{
	document.getElementById("unit-of-measure").onclick=function()
	{
		var frame = document.getElementById("frame");
		frame.style.display = "block";
		frame.src = "accounts_only.html#unit-of-measure";
		var close_btn = document.getElementById("close-uom");
		close_btn.style.display = "block";
		close_btn.onclick=function(){
			this.style.display = "none";
			frame.style.display = "none";
			window.location = location.href;
		}
		frame.onload = function(){
			var target = this.contentWindow.document.getElementById("unit-of-measure");
			target.style.position = "absolute";
			target.style.top = "0";
			target.style.left = "0";
			target.onclick();

	var select_unit = frame.contentWindow.document.getElementById("show-uom");
	select_unit.style.display = "block";
	frame.contentWindow.document.getElementById("select-measure-unit").style.display = "block";
			var i;
			for (var i = 0; i < localStorage.length; i++) {
				var all_keys = localStorage.key(i);
				if (all_keys.match("unit_of_measure")) 
				{
					var units = localStorage.getItem(all_keys);
					var extract_unit = JSON.parse(units);
					var option = document.createElement("OPTION");
					option.append(document.createTextNode(extract_unit.symbol));
					select_unit.append(option);
				}
			}
			select_unit.onchange=function(){
				var selected_value = this.value;
				var get_units = localStorage.getItem("unit_of_measure_"+selected_value);
				var units_extract = JSON.parse(get_units);
				var symbol = frame.contentWindow.document.getElementById("unit-symbol");
				var formal = frame.contentWindow.document.getElementById("unit-formal-name");
				symbol.value = units_extract.symbol;
	    		formal.value = units_extract.formal_name;
	    		var delete_unit_btn = document.getElementById("delete-units-btn");
	    		delete_unit_btn.style.display = "block";
	    		delete_unit_btn.style.fontWeight = "bold";
	    		delete_unit_btn.onclick=function(){
	    			var check = window.confirm("Are you sure to delete ?")
	    			if (check == true) 
	    			{
	    			localStorage.removeItem("unit_of_measure_"+select_unit.value);
	    			window.location = location.href;
	    			}
	    		}
			}

		}
	}
}
unit_of_measure();