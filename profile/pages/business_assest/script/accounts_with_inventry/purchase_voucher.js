//display purchase account ledger name
function display_purchase_ac(){
	var i,j;
	var input = document.getElementById("search-paccount");
	input.onclick=function(){
			var hint = document.getElementById("ledger-name-hint");
			if (hint.innerHTML == "") 
			{
				for (var i = localStorage.length - 1; i >= 0; i--) 
				{
					var all_keys = localStorage.key(i);
					if (all_keys.match("ledger_no")) 
					{
						var key_data = localStorage.getItem(all_keys);
						var main_data = JSON.parse(key_data);
						if (main_data.group.match("Purchase account")) 
						{
							
							hint.style.display = "block";
							hint.innerHTML += "<p class='hint-click'>"+main_data.ledger_name+"</p>";

							var hint_click = document.getElementsByClassName("hint-click");
							for (var j = hint_click.length - 1; j >= 0; j--) {
								hint_click[j].onclick=function(){
									input.focus();
									input.value = this.innerHTML;
									document.getElementById("add-item-btn").disabled = false;
									hint.style.display = "none";
								}
							}



						}
					}
				}
			}
		input.oninput=function(){
			var hint_click = document.getElementsByClassName("hint-click");
			for(i=0;i<hint_click.length;i++)
			{
				if (hint_click[i].innerHTML.toUpperCase().match(input.value.toUpperCase()) != null) 
				{
					hint_click[i].style.display = "block";
				}
				else{
					hint_click[i].style.display = "none";
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
			var hint_click = document.getElementsByClassName("hint-click");
			for(i=0;i<hint_click.length;i++)
			{
				if (input.value == hint_click[i].innerHTML) 
				{
					add_item();
					move_to_supplier();
					document.getElementById("ledger-name-hint").style.display = "none";
					document.getElementById("search-message").innerHTML = "";
					document.getElementById("add-item-btn").disabled = false; 
				}
			}
		}
		else{

			document.getElementById("search-message").innerHTML = " < < This field is compulsoury";
			setTimeout(function(){
				document.getElementById("search-message").innerHTML = " After fill press Enter (It is compulsoury)";
			},2000)
		}
	}
}
}
display_purchase_ac();


//add item coding
function add_item(){
		var table = document.getElementById("item-table");
		var tr = document.createElement("TR");
		tr.style.height = "35px";
		table.append(tr);
		var td_item = document.createElement("TD");
		td_item.style.textAlign = "center";
		var td_qty = document.createElement("TD");
		td_qty.style.textAlign = "center";
		var td_rate = document.createElement("TD");
		td_rate.style.textAlign = "center";
		var td_sp = document.createElement("TD");
		td_sp.style.textAlign = "center";
		var td_per = document.createElement("TD");
		td_per.style.textAlign = "center";
		var td_amount = document.createElement("TD");
		td_amount.style.textAlign = "center";
		var td_delete = document.createElement("TD");
		td_delete.style.textAlign = "center";
		tr.append(td_item);
		tr.append(td_qty);
		tr.append(td_rate);
		tr.append(td_sp);
		tr.append(td_per);
		tr.append(td_amount);
		tr.append(td_delete);
		var input_item = document.createElement("INPUT");
		input_item.type = "text";
		input_item.id = "item-input";
		input_item.className = "item-input";
		input_item.placeholder = "Item";
		var input_qty = document.createElement("INPUT");
		input_qty.type = "number";
		input_qty.id = "qty-input";
		input_qty.className = "qty-input";
		input_qty.placeholder = "ex- 1";
		input_qty.disabled = true;
		var input_rate = document.createElement("INPUT");
		input_rate.type = "number";
		input_rate.id = "rate-input";
		input_rate.className = "rate-input";
		input_rate.placeholder = "00.00";
		input_rate.disabled = true;
		var input_sp = document.createElement("INPUT");
		input_sp.type = "number";
		input_sp.id = "sp-input";
		input_sp.className = "sp-input";
		input_sp.placeholder = "00.00";
		input_sp.disabled = true;
		var input_per = document.createElement("SELECT");
		input_per.id = "per-input";
		input_per.className = "per-input";
			var option = document.createElement("OPTION");
			option.append(document.createTextNode("unit ?"));
			input_per.append(option);
		var input_amount = document.createElement("INPUT");
		input_amount.type = "number";
		input_amount.id = "amount-input";
		input_amount.className = "amount-input";
		input_amount.placeholder = "00.00";
		input_amount.disabled = true;
		var input_delete = document.createElement("I");
		input_delete.className = "fa fa-trash";
		input_delete.id = "delete-input";
		td_item.append(input_item);
		td_qty.append(input_qty);
		td_rate.append(input_rate);
		td_sp.append(input_sp);
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
			subtotal();
			calculate_tax();
			total_amount();
			calculate_balance_dues();

		}

		//enabling input field
		input_item.oninput=function(){
			input_qty.disabled = false;
		} 
function oninput_coding(){
		input_qty.oninput = function(){
			input_rate.disabled = false;
			//amount coding
			input_amount.value = (input_qty.value*input_rate.value).toFixed(2);
			subtotal();
			calculate_tax();
			total_amount();
		}
		input_rate.onkeyup=function(event){
			input_sp.disabled = false;
			var key = String.fromCharCode(event.keyCode);
			var per_value = input_per.getElementsByTagName("OPTION");
			for (i=0;i < per_value.length;i++) {
				if(per_value[i].value.toUpperCase().match(key.toUpperCase()))
				{
					input_per.value = per_value[i].value;
				}
			}
			//amount coding
			input_amount.value = (input_qty.value*input_rate.value).toFixed(2);
			subtotal();
			calculate_tax();
			total_amount();
		}
	}
	 oninput_coding();
	//active item field
	var active_item = document.getElementsByClassName("item-input");
	active_item[active_item.length-1].focus();
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
		if (event.keyCode == 13) 
		{
			if (this.value == "") 
				{
					alert("You have to fill this field");
				}
			else{
				input_sp.focus();
			}
		}
	}
	input_sp.onkeydown=function(event){
		if (event.keyCode == 13) 
		{
			if (Number(input_rate.value) < Number(this.value)) 
			{
				input_per.focus();
				input_per.onchange = function(){
					if(this.value != "unit")
					{
						document.getElementById("add-item-btn").click();
					}
					else{
						alert("Select your item's unit !");
					}
				}
			}
			else{
					alert("Selling price(Sp) should be higher than cost price");
			}
		}
	}
	document.getElementById("search-message").innerHTML = "";
}

//call add item 
function call_add_btn(){
	var btn = document.getElementById("add-item-btn");
	btn.onclick=function(){
			add_item();
			move_to_supplier();
	}
	//short cut key of add item is decleared in voucher.js > window.onkeyup=function(){}
}
call_add_btn();

//subtotal coding
function subtotal(){
		var amount_input = document.getElementsByClassName("amount-input");
		var add_store = 0;
		for(i=0;i<amount_input.length;i++)
		{
			add_store += Number(amount_input[i].value);
		}
		document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='subtotal-store'>"+add_store.toFixed(2)+"</span>";
}

//tax setup coding 
function tax_setup(){
	var form = document.getElementById("tax-form");
	var tax_name = document.getElementById("tax-name");
	var tax = document.getElementById("tax");
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
								var name_of_tax = document.getElementById("tax-name").value;
								var tax_qty = tax.value;
								var tax_details = {name_of_tax:name_of_tax,tax_qty:tax_qty};
								var tax_string = JSON.stringify(tax_details);
								localStorage.setItem("ptax_"+name_of_tax,tax_string);
								if (localStorage.getItem("ptax_"+name_of_tax) != null) 
								{
									var notice = document.getElementById("tax-notice");
									notice.innerHTML = "Success";
									notice.style.color = "red";
									document.getElementById("display-tax-name").innerHTML = "";
									show_tax();
									calculate_tax();
									total_amount();
									setTimeout(function(){
										notice.innerHTML = "Tax setup";
										notice.style.color = "black";
										document.getElementById("tax-form").reset();
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
tax_setup();

//show tax coding
function show_tax(){
	var i;
	for(i=0;i<localStorage.length;i++)
	{
		var all_keys = localStorage.key(i);
		if (all_keys.match("ptax_")) 
		{
			var tax_data = localStorage.getItem(all_keys);
			var extract = JSON.parse(tax_data);
			document.getElementById("display-tax-name").innerHTML += "<span class='tax-store' style='cursor:pointer'>"+extract.name_of_tax+"</span>-<span class='percentage-store'>"+extract.tax_qty+"</span> : <br>";
		}
	}
}
show_tax();
//delete tax
/*
function delete_tax(){
	var tax_clicked = document.getElementsByClassName("tax-store");
	var i;
	for (var i = tax_clicked.length - 1; i >= 0; i--) {
		tax_clicked[i].onclick=function()
		{
			var check = window.confirm("Are you sure to delete this tax ?")
			if (check == true) 
			{
				localStorage.removeItem("ptax_"+this.innerHTML);
				window.location = location.href;
			}
		}
	}
}
delete_tax();
*/
//calculate tax
function calculate_tax(){
	var subtotal = Number(document.getElementById("subtotal-store").innerHTML);
	var tax = document.getElementsByClassName("percentage-store");
	document.getElementById("display-tax").innerHTML = "";
	var i;
	for(i=0;i<tax.length;i++)
	{
		var num = (tax[i].innerHTML.replace("%",""));
		var cal = (subtotal*num)/100;
		document.getElementById("display-tax").innerHTML += "<i class='fa fa-rupee'></i> "+"<span class='cal-tax-store'>"+cal.toFixed(2)+"</span><br>";
	}
	//delete_tax();
}

//calculate total coding 
function total_amount(){
	var subtotal_amount = Number(document.getElementById("subtotal-store").innerHTML);
	if (document.getElementById("display-tax").innerHTML != "") 
	{
			var taxs = document.getElementsByClassName("cal-tax-store");
			var i;
			for(i=0;i<taxs.length;i++)
			{
				subtotal_amount += Number(taxs[i].innerHTML);
				document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='total-store'>"+subtotal_amount.toFixed(2)+"</span>";
				document.getElementById("balance-dues").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='dues-store'>"+subtotal_amount.toFixed(2)+"</span>";
				
			}
		calculate_balance_dues();
	}
	else{
		document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='total-store'>"+subtotal_amount.toFixed(2)+"</span>";
		document.getElementById("balance-dues").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='dues-store'>"+subtotal_amount.toFixed(2)+"</span>";
		calculate_balance_dues();
	}
}

//calculate balance dues and input 
function calculate_balance_dues(){
	var total = Number(document.getElementById("total-store").innerHTML);
	var dues = document.getElementById("balance-dues");
	var paid = document.getElementById("paid");
	paid.oninput=function(){
		dues.innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='dues-store'>"+(total-Number(this.value)).toFixed(2)+"</span>";
		document.getElementById("hide").style.display = "block";
	}
}

//arrow up and arrow down on  account
function arrow_down(){
	var p = document.getElementsByClassName("hint-click");
	var i;
	var search_box = document.getElementById("search-paccount");
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
				document.getElementById("ledger-name-hint").style.display = "none";
				document.getElementById("search-message").style.display = "block";
				sessionStorage.removeItem("count");
				add_item();
				move_to_supplier();
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
			document.getElementById("ledger-name-hint").style.display = "none";
			document.getElementById("search-message").style.display = "block";
			sessionStorage.removeItem("count");
			add_item();
			move_to_supplier();
			document.getElementById("add-item-btn").disabled = false;
		}
	}
} 
arrow_down();


///purchase Date update coding
function purchase_date(){
	var date = document.getElementById("purchase-date");
	var d = new Date();
	var c_date = d.getDate();
	var c_month = d.getMonth()+1;
	var c_year = d.getFullYear();
	date.innerHTML = "<span id='date-store'>"+c_date+" / "+c_month+" / "+c_year+"</span>";
	var change_date = document.getElementById("date-store");
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
purchase_date();


//store purchase voucher data
function store_pvoucher_data(){
	var i,store_item = [],store_qty = [],store_rate = [],store_sp = [],store_per = [],store_amount = [],store_tax = [];
	var voucher_no = document.getElementById("p-voucher-no").innerHTML;
	var voucher_date = document.getElementById("date-store").innerHTML;
	var ac_name = document.getElementById("search-paccount").value;

	var item_input = document.getElementsByClassName("item-input");
	for(i=0;i<item_input.length;i++)
	{
		store_item[i] = item_input[i].value;
	}
	var qty_input = document.getElementsByClassName("qty-input");
	for(i=0;i<qty_input.length;i++)
	{
		store_qty[i] = qty_input[i].value;
	}
	var rate_input = document.getElementsByClassName("rate-input");
	for(i=0;i<rate_input.length;i++)
	{
		store_rate[i] = rate_input[i].value;
	}
	var sp_input = document.getElementsByClassName("sp-input");
	for(i=0;i<sp_input.length;i++)
	{
		store_sp[i] = sp_input[i].value;
	}
	var per_input = document.getElementsByClassName("per-input");
	for(i=0;i<per_input.length;i++)
	{
		store_per[i] = per_input[i].value; 
	}
	var amount_input = document.getElementsByClassName("amount-input");
	for(i=0;i<amount_input.length;i++)
	{
		store_amount[i] = amount_input[i].value; 
	}

	var supplier_name = document.getElementById("supplier-name").value;
	var supplier_no = document.getElementById("supplier-no").value;
	var supplier_address = document.getElementById("supplier-address").value;

	var voucher_subtotal = document.getElementById("subtotal-store").innerHTML;
	var voucher_tax = document.getElementsByClassName("cal-tax-store");
	for(i=0;i<voucher_tax.length;i++)
	{
		store_tax[i] = voucher_tax[i].innerHTML; 
	}
	var voucher_total = document.getElementById("total-store").innerHTML;
	var voucher_paid = document.getElementById("paid").value;
	var voucher_dues = document.getElementById("dues-store").innerHTML;

	var purchase_details = {
		voucher_no:voucher_no,
		voucher_date:voucher_date,
		ac_name:ac_name,
		store_item:store_item,
		store_qty:store_qty,
		store_rate:store_rate,
		store_sp:store_sp,
		store_per:store_per,
		store_amount:store_amount,
		supplier_name:supplier_name,
		supplier_no:supplier_no,
		supplier_address:supplier_address,
		voucher_subtotal:voucher_subtotal,
		store_tax:store_tax,
		voucher_total:voucher_total,
		voucher_paid:voucher_paid,
		voucher_dues:voucher_dues,
	}
	var purchase_obj = JSON.stringify(purchase_details);
	localStorage.setItem("purchase_voucher_"+voucher_no,purchase_obj);
	if (localStorage.getItem("purchase_voucher_"+voucher_no)) 
	{
		document.getElementById("store-data").innerHTML = "Success";
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
function store_now(){
	document.getElementById("store-data").onclick=function()
	{
		store_pvoucher_data();
	}
}
store_now();

//supplier shortcut coding
function move_to_supplier(){
	var name = document.getElementById("supplier-name");
	var no = document.getElementById("supplier-no");
	var address = document.getElementById("supplier-address"); 
	window.onkeyup=function(event){
		if (event.shiftKey && event.keyCode == 83) 
		{
			if (document.getElementById("subtotal-store") != null) 
			{
				name.focus();
				name.style.boxShadow = "0px 0px 15px blue";
				name.style.borderColor = "blue";
			}
			else{
				alert("No item bought yet")
			}
		}
	}
	name.onkeyup=function(event){
		if (event.keyCode == 13) 
		{
			no.focus();
			name.style.boxShadow = "";
			name.style.borderColor = "";
		}
	}
	no.onkeyup=function(event){
		if (event.keyCode == 13) 
		{
			address.focus();
		}
	}
}


//voucher no coding
function voucher_no(){
	var voucher_no = document.getElementById("p-voucher-no");
	var i,large_no = 0;
	for (var i = localStorage.length - 1; i >= 0; i--) {
		var all_keys = localStorage.key(i);
		if (all_keys.match("purchase_voucher")) 
		{
			var num = Number(all_keys.replace("purchase_voucher_",""));
			if (num > large_no) 
			{
				large_no = num;
			}
		}
	}
	voucher_no.innerHTML = large_no+1;
}
voucher_no();

//current balance coding
function current_balance(){
	var i,balance = 0;
	for (var i = 0; i < localStorage.length; i++) {
		var all_keys = localStorage.key(i);
		if (all_keys.match("purchase_voucher")) 
		{
			var key_data = localStorage.getItem(all_keys);
			var data = JSON.parse(key_data);
			balance = balance+Number(data.voucher_total);
		}
	}
	document.getElementById("balance-Cr").innerHTML = balance+" Cr";
}
current_balance();


//user profile related coding
//{
//show company address
function cmp_address(){
	var address = document.getElementById("address");
	var cmp_data = localStorage.getItem("company");
	var extract = JSON.parse(cmp_data);
	address.innerHTML = "Venue : "+extract.address+"<br>Phone : "+extract.phone;
}
cmp_address();
//show company logo
function cmp_logo(){
	var logo = localStorage.getItem("company-logo");
	var img = document.getElementById("cmp-logo");
	img.src = logo;
}
cmp_logo();
//show profile photo
function show_profile_photo(){
	var box = document.getElementById("pic-box");
	var user_mail = sessionStorage.getItem("user_email");
	var image_name = localStorage.getItem(user_mail+"image_url");
	box.style.background = "url("+image_name+")";
   	box.style.backgroundSize = "cover";
}
show_profile_photo();
//show company name
function show_cmp_name(){
	var name_box = document.getElementById("cmp-name");
	var cmp_details = localStorage.getItem("company");
	var cmp_extract = JSON.parse(cmp_details);
	name_box.innerHTML = cmp_extract.cmp_name;
}
show_cmp_name();
//}


//search voucher coding
function search_voucher(){
	var search_box = document.getElementById("search-store-voucher");
	search_box.onkeyup=function(event){
		if (event.keyCode == 13) 
		{
			if(this.value != "")
			{
				if (localStorage.getItem("purchase_voucher_"+search_box.value) != null) 
				{
					document.getElementById("ledger-name-hint").style.display = "none";
					document.getElementById("search-message").style.display = "none";
					var voucher_data = localStorage.getItem("purchase_voucher_"+search_box.value);
					var extract = JSON.parse(voucher_data);
					document.getElementById("p-voucher-no").innerHTML = extract.voucher_no;
					document.getElementById("date-store").innerHTML = extract.voucher_date;
					document.getElementById("search-paccount").value = extract.ac_name;
					var i;
					for(i=0;i<extract.store_item.length;i++)
					{
						add_item();
					}
					var item_input = document.getElementsByClassName("item-input");
					var qty_input = document.getElementsByClassName("qty-input");
					var rate_input = document.getElementsByClassName("rate-input");
					var sp_input = document.getElementsByClassName("sp-input");
					var per_input = document.getElementsByClassName("per-input");
					var amount_input = document.getElementsByClassName("amount-input");
					for(i=0;i<item_input.length;i++)
					{
						item_input[i].value = extract.store_item[i];
						qty_input[i].value = extract.store_qty[i];
						qty_input[i].disabled = false;
						rate_input[i].value = extract.store_rate[i];
						rate_input[i].disabled = false;
						sp_input[i].value = extract.store_sp[i];
						sp_input[i].disabled = false;
						per_input[i].value = extract.store_per[i]; 
						amount_input[i].value =extract.store_amount[i];
					}


					document.getElementById("supplier-name").value = extract.supplier_name;
					document.getElementById("supplier-no").value = extract.supplier_no;
					document.getElementById("supplier-address").value = extract.supplier_address;
					document.getElementById("subtotal").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='subtotal-store'>"+extract.voucher_subtotal+"</span>";
					document.getElementById("total").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='total-store'>"+extract.voucher_total+"</span>";
					document.getElementById("paid").value = extract.voucher_paid;
					document.getElementById("balance-dues").innerHTML = "<i class='fa fa-rupee'></i> "+"<span id='dues-store'>"+extract.voucher_dues+"</span>";
					var tax_amount = document.getElementById("display-tax");
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
		document.getElementById("store-data").style.display = "block";
		document.getElementById("add-item-btn").disabled = false;
		 oninput_coding();
	}
}
search_voucher();

//delete voucher
function delete_voucher(){
	document.getElementById("delete-voucher").onclick=function(){
		if (localStorage.getItem("purchase_voucher_"+document.getElementById("p-voucher-no").innerHTML) != null) 
		{
			var check = window.confirm("Are sure to delete this voucher ?");
			if (check == true) 
			{
				localStorage.removeItem("purchase_voucher_"+document.getElementById("p-voucher-no").innerHTML);
				window.location = location.href;
			}
		}
		else{
			alert("No voucher available in this voucher number");
		}
	}
}
delete_voucher();