
//user profile related coding
//{
//show company address
function sale_cmp_address(){
	var address = document.getElementById("sales-address");
	var cmp_data = localStorage.getItem("company");
	var extract = JSON.parse(cmp_data);
	address.innerHTML = "Venue : "+extract.address+"<br>Phone : "+extract.phone;
}
sale_cmp_address();
//show company logo
function sale_cmp_logo(){
	var logo = localStorage.getItem("company-logo");
	var img = document.getElementById("sales-cmp-logo");
	img.src = logo;
}
sale_cmp_logo();
//show company name
function show_sale_cmp_name(){
	var name_box = document.getElementById("sales-cmp-name");
	var cmp_details = localStorage.getItem("company");
	var cmp_extract = JSON.parse(cmp_details);
	name_box.innerHTML = cmp_extract.cmp_name;
}
show_sale_cmp_name();
//}
//voucher no coding
function sale_voucher_no(){
	var voucher_no = document.getElementById("s-voucher-no");
	var i,large_no = 0;
	for (var i = localStorage.length - 1; i >= 0; i--) {
		var all_keys = localStorage.key(i);
		if (all_keys.match("sales_voucher")) 
		{
			var num = Number(all_keys.replace("sales_voucher_",""));
			if (num > large_no) 
			{
				large_no = num;
			}
		}
	}
	voucher_no.innerHTML = large_no+1;
}
sale_voucher_no();
///sales Date update coding
function sales_date(){
	var date = document.getElementById("sales-date");
	var d = new Date();
	var c_date = d.getDate();
	var c_month = d.getMonth()+1;
	var c_year = d.getFullYear();
	date.innerHTML = "<span id='sales-date-store'>"+c_date+" / "+c_month+" / "+c_year+"</span>";
	var change_date = document.getElementById("sales-date-store");
	change_date.style.cursor = "pointer";
	change_date.title = "click to change date";
	change_date.style.fontWeight = "bold";
	change_date.style.fontFamily = "calibri";
	change_date.onclick=function(){
		this.innerHTML = "";
		var input = document.createElement("INPUT");
		input.type = "date";
		date.append(input);
		input.onblur = function(){
			this.remove();
			var update_date = new Date(this.value);
			var final_date = [update_date.getDate(),update_date.getMonth(),update_date.getFullYear()];
			change_date.innerHTML = final_date[0]+" / "+Number(final_date[1]+1)+" / "+final_date[2];
		}
		input.onchange = function(){
			this.remove();
			var update_date = new Date(this.value);
			var final_date = [update_date.getDate(),update_date.getMonth(),update_date.getFullYear()];
			change_date.innerHTML = final_date[0]+" / "+Number(final_date[1]+1)+" / "+final_date[2];
		}
	}
}
sales_date();

//display sales account ledger name
function display_sales_ac(){
	var i,j;
	var input = document.getElementById("enter-saccount");
	input.onclick=function(){
			var hint = document.getElementById("ledger-sales-name-hint");
			if (hint.innerHTML == "") 
			{
				for (i = localStorage.length - 1; i >= 0; i--) 
				{
					var all_keys = localStorage.key(i);
					if (all_keys.match("ledger_no")) 
					{
						var key_data = localStorage.getItem(all_keys);
						var main_data = JSON.parse(key_data);
						if (main_data.group.match("Sales account")) 
						{
							//remind to change
							hint.style.display = "block";
							hint.innerHTML += "<p class='hint-hover'>"+main_data.ledger_name+"</p>";

							var hint_click = document.getElementsByClassName("hint-hover");
							for (j = hint_click.length - 1; j >= 0; j--) {
								hint_click[j].onclick=function(){
									input.focus();
									input.value = this.innerHTML;
									hint.style.display = "none";
								}
							}
						}
					}
				}
			}
	}
input.click();
input.focus();
//enter on purchase account
input.onkeyup=function(event){
	if (event.keyCode == 13) 
	{
		if (input.value != "") 
		{
			var hint_click = document.getElementsByClassName("hint-hover");
			for(i=0;i<hint_click.length;i++)
			{
				if (input.value == hint_click[i].innerHTML) 
				{
					sales_add_item();
					document.getElementById("ledger-sales-name-hint").style.display = "none";
					document.getElementById("add-sales-item-btn").disabled = false; 
				}
			}
		}
	}
}
}
display_sales_ac();
//arrow up and arrow down on purchase account
function arrow_down(){
	var p = document.getElementsByClassName("hint-hover");
	var i;
	var search_box = document.getElementById("enter-saccount");
	search_box.onkeydown=function(event){
		if (event.keyCode == 40) {
			if (sessionStorage.getItem("count") == null) 
			{
				p[0].style.backgroundColor = "white";
				p[0].style.color = "black";
				p[0].style.fontSize = "22px";
				this.value = p[0].innerHTML;
				sessionStorage.setItem("count",0);
			}
			else{
				for (var i = p.length - 1; i >= 0; i--) {
					p[i].style.backgroundColor = "inherit";
					p[i].style.color = "white";
					p[i].style.fontSize = "";
				}
				var current = Number(sessionStorage.getItem("count"))+1;
				sessionStorage.setItem("count",current);
				if (p[current] != undefined) 
				{
					p[current].style.backgroundColor = "white";
					p[current].style.color = "black";
					p[current].style.fontSize = "22px";
					this.value = p[current].innerHTML;
				}
				else{
					sessionStorage.removeItem("count");
					p[0].style.backgroundColor = "white";
					p[0].style.color = "black";
					p[0].style.fontSize = "22px";
					this.value = p[0].innerHTML;
				}
			}
		}
		else if (event.keyCode == 13) {
				document.getElementById("ledger-sales-name-hint").style.display = "none";
				sessionStorage.removeItem("count");
				document.getElementById("add-item-btn").disabled = false;
			}
	}


	search_box.onkeyup=function(event){
		if (event.keyCode == 38) {
			if (sessionStorage.getItem("count") == null) 
			{	
				p[p.length-1].style.backgroundColor = "white";
				p[p.length-1].style.color = "black";
				p[p.length-1].style.fontSize = "22px";
				this.value = p[p.length-1].innerHTML;
				sessionStorage.setItem("count",p.length-1);
			}
			else{
				for (var i = p.length - 1; i >= 0; i--) {
					p[i].style.backgroundColor = "inherit";
					p[i].style.color = "white";
					p[i].style.fontSize = "";
				}
				var current = Number(sessionStorage.getItem("count"))-1;
				sessionStorage.setItem("count",current);
				if (p[current] != undefined) 
				{
					p[current].style.backgroundColor = "white";
					p[current].style.color = "black";
					p[current].style.fontSize = "22px";
					this.value = p[current].innerHTML;
				}
				else{
					sessionStorage.removeItem("count");
					p[p.length-1].style.backgroundColor = "white";
					p[p.length-1].style.color = "black";
					p[p.length-1].style.fontSize = "22px";
					this.value = p[p.length-1].innerHTML;
				}
			}
		}
		else if (event.keyCode == 13) {
			document.getElementById("ledger-sales-name-hint").style.display = "none";
			sessionStorage.removeItem("count");
			document.getElementById("add-sales-item-btn").disabled = false;
		}
	}
} 
arrow_down();

//add item coding
function sales_add_item(){
		var table = document.getElementById("sales-item-table");
		var tr = document.createElement("TR");
		tr.style.height = "35px";
		table.append(tr);
		var td_item = document.createElement("TD");
		td_item.style.textAlign = "center";
		var td_qty = document.createElement("TD");
		td_qty.style.textAlign = "center";
		var td_rate = document.createElement("TD");
		td_rate.style.textAlign = "center";
		var td_per = document.createElement("TD");
		td_per.style.textAlign = "center";
		var td_amount = document.createElement("TD");
		td_amount.style.textAlign = "center";
		var td_delete = document.createElement("TD");
		td_delete.style.textAlign = "center";
		tr.append(td_item);
		tr.append(td_qty);
		tr.append(td_rate);
		tr.append(td_per);
		tr.append(td_amount);
		tr.append(td_delete);
		var input_item = document.createElement("INPUT");
		input_item.type = "text";
		input_item.id = "sitem";
		input_item.className = "sitem";
		input_item.placeholder = "Item";
		var input_qty = document.createElement("INPUT");
		input_qty.type = "number";
		input_qty.id = "sqty";
		input_qty.className = "sqty";
		input_qty.placeholder = "ex- 1";
		input_qty.disabled = true;
		var input_rate = document.createElement("INPUT");
		input_rate.type = "number";
		input_rate.id = "srate";
		input_rate.className = "srate";
		input_rate.placeholder = "00.00";
		input_rate.disabled = true;
		var input_per = document.createElement("SELECT");
		input_per.id = "sper";
		input_per.className = "sper";
			var option = document.createElement("OPTION");
			option.append(document.createTextNode("unit ?"));
			input_per.append(option);
		var input_amount = document.createElement("INPUT");
		input_amount.type = "number";
		input_amount.id = "samount";
		input_amount.className = "samount";
		input_amount.placeholder = "00.00";
		input_amount.disabled = true;
		var input_delete = document.createElement("I");
		input_delete.className = "fa fa-trash";
		input_delete.id = "sdelete";
		td_item.append(input_item);
		td_qty.append(input_qty);
		td_rate.append(input_rate);
		td_per.append(input_per);
		td_amount.append(input_amount);
		td_delete.append(input_delete);

		//input option in select element
		var i;
		for (var i = 0; i < localStorage.length; i++) {
			var all_keys = localStorage.key(i);
			if (all_keys.indexOf("unit_of_measure") != -1) 
			{
				var unit_name = localStorage.getItem(all_keys);
				var unit_extract = JSON.parse(unit_name);
				var option = document.createElement("OPTION");
				option.append(document.createTextNode(unit_extract.symbol));
				input_per.append(option);
			}
		}
		//delete tr coding 
		input_delete.onclick=function(){
			var delete_tr = this.parentElement.parentElement;
			delete_tr.remove();
			calculate_sales_tax();
			sales_total_amount();
			sales_subtotal();
			calculate_sales_balance_dues();
		}

		//enabling input field
		input_item.oninput=function(){
			input_qty.disabled = false;
		} 
		input_qty.oninput = function(){
			input_rate.disabled = false;
			input_amount.value = (input_qty.value*input_rate.value).toFixed(2);
			sales_subtotal();
			calculate_sales_tax();
			sales_total_amount();
		}
		input_rate.oninput = function(){
			input_amount.value = (input_qty.value*input_rate.value).toFixed(2);			
			sales_subtotal();
			calculate_sales_tax();
			sales_total_amount();
		}
	//on enter in item --- coding
	input_item.onkeyup=function(event){
		if (event.keyCode == 13) 
		{
			input_qty.focus();
		}
	}
	input_qty.onkeyup=function(event){
		if (event.keyCode == 13) 
		{
			if (this.value == "") 
				{
					alert("You have to fill this field");
				}
			else{
				input_rate.focus();
			}
		}
	}
	input_rate.onkeydown=function(event){
			var key = String.fromCharCode(event.keyCode);
			var per_value = input_per.getElementsByTagName("OPTION");
			for (i=0;i < per_value.length;i++) {
				if(per_value[i].value.toUpperCase().match(key.toUpperCase()))
				{
					input_per.value = per_value[i].value;
				}
			}
		if (event.keyCode == 13) 
		{
			if (this.value == "") 
				{
					alert("You have to fill this field");
				}
			else{
				input_per.focus();
			}
		}
	}
	input_per.onchange=function(){
			if(input_item.value != "")
			{
				if (this.value == "unit ?") 
				{
					alert("choose item's unit");
				}
				else{
					document.getElementById("add-sales-item-btn").click();
					var item = document.getElementsByClassName("sitem");
					var length_item = item.length;
					item[item.length-1].focus();
						}
			}
			else{
				alert("No item choosen");
			}
	}
	//active input item
	var item = document.getElementsByClassName("sitem");
	var length_item = item.length;
	item[item.length-1].focus();
}

//call add item 
function call_add_btn(){
	var btn = document.getElementById("add-sales-item-btn");
	btn.onclick=function(){
			 sales_add_item();
			 //show_stocks();
	}
	window.onkeyup=function(event)
	{
		if (event.altKey && event.keyCode == 65) 
	    {
	      if (document.getElementById("enter-saccount").value != "") 
	      {
	        sales_add_item();
	      }
	    }
	}
}
call_add_btn();

// show stocks
function show_stocks()
{
	var item_input = document.getElementsByClassName("sitem");
	var i,j,k,l,sort_item,show_item = [];
	for (var i = 0; i < item_input.length; i++) 
	{
		item_input[i].oninput=function()
		{
			var stock_hint = document.createElement("DIV");
			stock_hint.id = "stock-hint";
			this.parentElement.style.position = "relative";
			this.parentElement.append(stock_hint);
			document.getElementById("stock-hint").innerHTML = "";
			for (j = 0; j < localStorage.length; j++) 
			{
				var all_keys = localStorage.key(j);
				if (all_keys.match("purchase_voucher") != null) 
				{
					var items = localStorage.getItem(all_keys);
					var items_ext = JSON.parse(items); 
					for (k = 0; k < items_ext.store_item.length; k++) 
					{
						if (items_ext.store_item[k].toUpperCase().indexOf(this.value.toUpperCase()) != -1) 
						{
							for (l = 0; l < items_ext.store_item[k].length; l++) 
							{
								if (items_ext.store_item[k] != sort_item) 
								{
									show_item[l] = items_ext.store_item[k];
									sort_item = items_ext.store_item[k];
								}
							}
						}
					}
				}
			}
			for (k = 0; k < show_item.length; k++) 
			{
				var p = document.createElement("P");
				p.append(document.createTextNode(show_item[k]));
				stock_hint.append(p);
			}
		}	
	}
}
//sales input
function sales_input(){
	var c_name = document.getElementById("customer-name");
	var c_no = document.getElementById("customer-no");
	var c_add = document.getElementById("customer-address");
	var sales_input = document.getElementById("enter-saccount");
	var p = document.getElementsByClassName("hint-hover");
	var add_btn = document.getElementById("add-sales-item-btn");
	var i;
	sales_input.onkeyup=function(event){
		for (var i = 0; i < p.length; i++) 
		{
			if (p[i].innerHTML.toUpperCase().indexOf(this.value.toUpperCase()) != -1) 
			{
				p[i].style.display = "block";
			}
			else{
				p[i].style.display = "none";
			}
		}
		if (event.keyCode == 13) 
		{
			document.getElementById("ac-sales-message").innerHTML = "Sales ac is not found press (ctrl+r) to re-enter or write the correct"; 
			for (i = 0; i < p.length; i++) 
			{
					if (this.value.toUpperCase() == p[i].innerHTML.toUpperCase()) 
					{
						document.getElementById("ac-sales-message").innerHTML = "";
						document.getElementById("ledger-sales-name-hint").style.display = "none";
						c_name.disabled = false;
						c_no.disabled = false;
						c_add.disabled = false;
						add_btn.disabled = false;
						c_name.focus();
						c_name.onkeyup=function(event)
						{
							if (event.keyCode == 13) 
							{
								c_no.focus();
							}
						}
						c_no.onkeyup=function(event)
						{
							if (event.keyCode == 13) 
							{
								c_add.focus();
							}
						}
						return false;
					}
			}
		}
	}
}
sales_input();

//calculate subtotal of sales voucher
function sales_subtotal(){
		var amount_input = document.getElementsByClassName("samount");
		var add_store = 0;
		for(i=0;i<amount_input.length;i++)
		{
			add_store += Number(amount_input[i].value);
		}
		document.getElementById("sales-subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='sales-subtotal-store'>"+add_store.toFixed(2)+"</span>";
			calculate_sales_tax();
			sales_total_amount();
			calculate_sales_balance_dues();
}


//sales tax setup coding 
function sales_tax_setup(){
	var form = document.getElementById("sales-tax-form");
	var tax_name = document.getElementById("sales-tax-name");
	var tax = document.getElementById("sales-tax");
	form.onsubmit=function(){
		if (tax_name.value.match("tax")) 
		{
			if (tax.value.match("%")) 
			{
				var length_tax = tax.value.length;
				if(tax.value.charAt(length_tax-1) == "%")
				{
					var regexp = /[a-z!=@#+$_^&*({;:"'|\][?/<,.>})-]/i;
					var check = tax.value.match(regexp);
					if(check == null)
							{
								var name_of_tax = tax_name.value;
								var tax_qty = tax.value;
								var tax_details = {name_of_tax:name_of_tax,tax_qty:tax_qty};
								var tax_string = JSON.stringify(tax_details);
								localStorage.setItem("stax_"+name_of_tax,tax_string);
								if (localStorage.getItem("stax_"+name_of_tax) != null) 
								{
									var notice = document.getElementById("sales-tax-notice");
									notice.innerHTML = "Success";
									notice.style.color = "red";
									document.getElementById("sales-display-tax-name").innerHTML = "";
									sales_show_tax();
									sales_total_amount();
									calculate_sales_tax();
									setTimeout(function(){
										notice.innerHTML = "Tax setup";
										notice.style.color = "black";
										document.getElementById("sales-tax-form").reset();
									},2000);
									return false;
								}
							}

					else{
						tax.value = "only num and % allowed";
						tax.style.color = "red";
						tax.style.border = "2px solid red"
						tax.className = "animated infinite pulse";
						tax.onclick=function(){
								this.value = "";
								this.style.color = "";
								this.style.border = "";
								this.className = "";
							}
					return false;
						}
				}
				else{
					tax.value = "% symbol add in the last";
					tax.style.color = "red";
					tax.style.border = "2px solid red"
					tax.className = "animated infinite pulse";
					tax.onclick=function(){
						this.value = "";
						this.style.color = "";
						this.style.border = "";
						this.className = "";
					}
					return false;
				}
			}
			else{
				tax.value = "Must add % symbol";
				tax.style.color = "red";
				tax.style.border = "2px solid red"
				tax.className = "animated infinite pulse";
				tax.onclick=function(){
					this.value = "";
					this.style.color = "";
					this.style.border = "";
					this.className = "";
				}
				return false;
			}
		}
		else{
			tax_name.value = "Must add 'tax' word";
			tax_name.style.color = "red";
			tax_name.style.border = "2px solid red"
			tax_name.className = "animated infinite pulse";
			tax_name.onclick=function(){
				this.value = "";
				this.style.color = "";
				this.style.border = "";
				this.className = "";
			}
			return false;
		}
	}
}
sales_tax_setup();

//show sales tax coding
function sales_show_tax(){
	var i;
	for(i=0;i<localStorage.length;i++)
	{
		var all_keys = localStorage.key(i);
		if (all_keys.match("stax_")) 
		{
			var tax_data = localStorage.getItem(all_keys);
			var extract = JSON.parse(tax_data);
			document.getElementById("sales-display-tax-name").innerHTML += "<span class='sales-tax-store' style='cursor:pointer'>"+extract.name_of_tax+"</span>-<span class='sales-percentage-store'>"+extract.tax_qty+"</span> : <br>";
		}
	}
}
sales_show_tax();

//calculate sales tax
function calculate_sales_tax(){
	var subtotal = Number(document.getElementById("sales-subtotal-store").innerHTML);
	var tax = document.getElementsByClassName("sales-percentage-store");
	document.getElementById("sales-display-tax").innerHTML = "";
	var i;
	for(i=0;i<tax.length;i++)
	{
		var num = (tax[i].innerHTML.replace("%",""));
		var cal = (subtotal*num)/100;
		document.getElementById("sales-display-tax").innerHTML += "<i class='fa fa-rupee'></i> "+"<span class='cal-sales-tax-store'>"+cal.toFixed(2)+"</span><br>";
	}
}

//calculate sales total coding 
function sales_total_amount(){
	var subtotal_amount = Number(document.getElementById("sales-subtotal-store").innerHTML);
	if (document.getElementById("sales-display-tax").innerHTML != "") 
	{
			var taxs = document.getElementsByClassName("cal-sales-tax-store");
			var i;
			for(i=0;i<taxs.length;i++)
			{
				subtotal_amount += Number(taxs[i].innerHTML);
				document.getElementById("sales-total").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='sales-total-store'>"+subtotal_amount.toFixed(2)+"</span>";
				document.getElementById("sales-balance-dues").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='sales-dues-store'>"+subtotal_amount.toFixed(2)+"</span>";
				
			}
	}
	else{
		document.getElementById("sales-total").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='sales-total-store'>"+subtotal_amount.toFixed(2)+"</span>";
		document.getElementById("sales-balance-dues").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='sales-dues-store'>"+subtotal_amount.toFixed(2)+"</span>";
		calculate_sales_balance_dues();
	}
	calculate_sales_balance_dues();
}
//calculate balance dues and input 
function calculate_sales_balance_dues(){
	var total = Number(document.getElementById("sales-total-store").innerHTML);
	var dues = document.getElementById("sales-balance-dues");
	var paid = document.getElementById("sales-paid");
	paid.oninput=function(){
		dues.innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='sales-dues-store'>"+(total-Number(this.value)).toFixed(2)+"</span>";
		document.getElementById("sales-hide").style.display = "block";
	}
}


//store sales voucher data
function store_sales_data(){
	var i,store_item = [],store_qty = [],store_rate = [],store_per = [],store_amount = [],store_tax = [];
	var voucher_no = document.getElementById("s-voucher-no").innerHTML;
	var voucher_date = document.getElementById("sales-date-store").innerHTML;
	var ac_name = document.getElementById("enter-saccount").value;

	var item_input = document.getElementsByClassName("sitem");
	for(i=0;i<item_input.length;i++)
	{
		store_item[i] = item_input[i].value;
	}
	var qty_input = document.getElementsByClassName("sqty");
	for(i=0;i<qty_input.length;i++)
	{
		store_qty[i] = qty_input[i].value;
	}
	var rate_input = document.getElementsByClassName("srate");
	for(i=0;i<rate_input.length;i++)
	{
		store_rate[i] = rate_input[i].value;
	}
	var per_input = document.getElementsByClassName("sper");
	for(i=0;i<per_input.length;i++)
	{
		store_per[i] = per_input[i].value; 
	}
	var amount_input = document.getElementsByClassName("samount");
	for(i=0;i<amount_input.length;i++)
	{
		store_amount[i] = amount_input[i].value; 
	}

	var customer_name = document.getElementById("customer-name").value;
	var customer_no = document.getElementById("customer-no").value;
	var customer_address = document.getElementById("customer-address").value;

	var voucher_subtotal = document.getElementById("sales-subtotal-store").innerHTML;
	var voucher_tax = document.getElementsByClassName("cal-sales-tax-store");
	for(i=0;i<voucher_tax.length;i++)
	{
		store_tax[i] = voucher_tax[i].innerHTML; 
	}
	var voucher_total = document.getElementById("sales-total-store").innerHTML;
	var voucher_paid = document.getElementById("sales-paid").value;
	var voucher_dues = document.getElementById("sales-dues-store").innerHTML;

	var sales_details = {
		voucher_no:voucher_no,
		voucher_date:voucher_date,
		ac_name:ac_name,
		store_item:store_item,
		store_qty:store_qty,
		store_rate:store_rate,
		store_per:store_per,
		store_amount:store_amount,
		customer_name:customer_name,
		customer_no:customer_no,
		customer_address:customer_address,
		voucher_subtotal:voucher_subtotal,
		store_tax:store_tax,
		voucher_total:voucher_total,
		voucher_paid:voucher_paid,
		voucher_dues:voucher_dues,
	}
	var sales_obj = JSON.stringify(sales_details);
	localStorage.setItem("sales_voucher_"+voucher_no,sales_obj);
	if (localStorage.getItem("sales_voucher_"+voucher_no)) 
	{
		document.getElementById("sales-store-data").innerHTML = "Success";
		setTimeout(function(){
			window.location = location.href;
		},1000);
	}
	else{
		var check = window.confirm("Your voucher data is not saved do you want to refill it ?")
		if (check == true) 
		{
			window.location = location.href;
		}
	}
}

//call save function
function sales_store_now(){
	document.getElementById("sales-store-data").onclick=function()
	{
		store_sales_data();
	}
}
sales_store_now();


//search sales voucher coding
function search_sales_voucher(){
	var search_box = document.getElementById("search-sales-voucher");
	search_box.onkeyup=function(event){
		if (event.keyCode == 13) 
		{
			if(this.value != "")
			{
				if (localStorage.getItem("sales_voucher_"+search_box.value) != null) 
				{
					document.getElementById("ledger-sales-name-hint").style.display = "none";
					document.getElementById("ac-sales-message").style.display = "none";
					var voucher_data = localStorage.getItem("sales_voucher_"+search_box.value);
					var extract = JSON.parse(voucher_data);
					document.getElementById("s-voucher-no").innerHTML = extract.voucher_no;
					document.getElementById("sales-date-store").innerHTML = extract.voucher_date;
					document.getElementById("enter-saccount").value = extract.ac_name;
					var i;
					for(i=0;i<extract.store_item.length;i++)
					{
						sales_add_item();
					}
					var item_input = document.getElementsByClassName("sitem");
					var qty_input = document.getElementsByClassName("sqty");
					var rate_input = document.getElementsByClassName("srate");
					var per_input = document.getElementsByClassName("sper");
					var amount_input = document.getElementsByClassName("samount");
					for(i=0;i<item_input.length;i++)
					{
						item_input[i].value = extract.store_item[i];
						qty_input[i].value = extract.store_qty[i];
						qty_input[i].disabled = false;
						rate_input[i].value = extract.store_rate[i];
						rate_input[i].disabled = false;
						per_input[i].value = extract.store_per[i]; 
						amount_input[i].value =extract.store_amount[i];
					}
					document.getElementById("customer-name").disabled = false;
					document.getElementById("customer-no").disabled = false;
					document.getElementById("customer-address").disabled = false;
					document.getElementById("customer-name").value = extract.customer_name;
					document.getElementById("customer-no").value = extract.customer_no;
					document.getElementById("customer-address").value = extract.customer_address;
					document.getElementById("sales-subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='sales-subtotal-store'>"+extract.voucher_subtotal+"</span>";
					document.getElementById("sales-total").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='sales-total-store'>"+extract.voucher_total+"</span>";
					document.getElementById("sales-paid").value = extract.voucher_paid;
					document.getElementById("sales-balance-dues").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='sales-dues-store'>"+extract.voucher_dues+"</span>";
					var tax_amount = document.getElementById("sales-display-tax");
					tax_amount.innerHTML = "";
					for (var i = 0; i < extract.store_tax.length; i++) {
						var taxs = document.createElement("P");
						taxs.append(document.createTextNode(extract.store_tax[i]));
						taxs.className="fa fa-rupee";
						tax_amount.append(taxs);
					}
				}
				else{
					alert("No voucher found on this voucher no");
				} 
			}
			else{
				this.placeholder = "Voucher no. is not entered yet";
				setTimeout(function(){
					window.location = location.href;
				},900);
			}
		}
		document.getElementById("sales-store-data").style.display = "block";
		document.getElementById("add-sales-item-btn").disabled = false;
	}
}
search_sales_voucher();


//delete sales voucher
function delete_sales_voucher(){
	document.getElementById("delete-sales-voucher").onclick=function(){
		if (localStorage.getItem("sales_voucher_"+document.getElementById("s-voucher-no").innerHTML) != null) 
		{
			var check = window.confirm("Are sure to delete this voucher ?");
			if (check == true) 
			{
				localStorage.removeItem("sales_voucher_"+document.getElementById("s-voucher-no").innerHTML);
				window.location = location.href;
			}
		}
		else{
			alert("No voucher available in this voucher number");
		}
	}
}
delete_sales_voucher();
