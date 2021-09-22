

function main_photo()
{
	var photo = document.getElementById("profile_photo");
	var user_mail = sessionStorage.getItem("user_email");
	var image_name = localStorage.getItem(user_mail+"image_url");
   	photo.style.background = "url("+image_name+")";
   	photo.style.backgroundSize = "cover";
}
main_photo();

//button over effect.....
function mouse_over_effect()
{
	var btn = document.getElementsByTagName("BUTTON");
	var i;
	for (var i = 0; i < btn.length; i++) {
		btn[i].onmouseover = function(){
			this.className="animated pulse";
		}
		btn[i].onmouseout = function(){
			this.className="";
		}
	}
}
7
mouse_over_effect()

//open creat company form 
function open_form(){
	var form = document.getElementById("model");
	var btn = document.getElementsByTagName("BUTTON")[0];
	btn.onclick = function(){
		if (form.offsetHeight == 0) {
		form.style.display = "block";
		form.style.height="440px";
		form.className="animated fadeInDown";
		this.innerHTML="Close form";
			}
		else{
			form.style.display = "none";
			form.style.height="0px";
			form.className="animated fadeOut";
			this.innerHTML="Create company";
		}
	}
}
open_form();

//creat company form  validation
function form_val(){
	var cmp_name = document.getElementById("cmp-name");
	var mailing_name=document.getElementById("mailing-name");
	var fin_year=document.getElementById("financial-year");
	var address = document.getElementById("address");
	var number = document.getElementById("phone-number");
	var fax = document.getElementById("fax-number");
	var email = document.getElementById("email");
	var website = document.getElementById("website");
	var stock_type = document.getElementById("stock-type");
	cmp_name.onchange= function(){
		if (isNaN(this.value)) {
			mailing_name.onchange = function(){
				if (this.value == cmp_name.value) {
					this.value = "Whoops ! companyname & mailingname shouldn't same";
					this.style.color="red";
					this.style.borderColor="red";
					this.className="animated infinite pulse";
					this.onclick=function(){
										this.value = "";
										this.style.color="";
										this.style.borderColor="";
										this.className="";
			   						}
				}
				else{
					if (this.value.indexOf(cmp_name.value+".pvt.ltd") != -1 || this.value.indexOf(cmp_name.value+".govt.ltd") != -1) {
						fin_year.onchange = function(){
								var current_date = new Date();
								var selected_date = new Date(fin_year.value);
								if (selected_date.getFullYear() >= current_date.getFullYear()) {
									if (selected_date.getMonth()+1 == 4) {
										if (selected_date.getDate() == 1) 
										{	var form = document.getElementById("form");
											form.onsubmit=function(){
											var cmp_details = {cmp_name:cmp_name.value,mailing_name:mailing_name.value,address:address.value,phone:number.value,fax:fax.value,email:email.value,website:website.value,fin_year:fin_year.value,stock_type:stock_type.value};
											var cmp_data = JSON.stringify(cmp_details);
											localStorage.setItem("company",cmp_data);
											}
										}
										else{
											this.type="text";
											this.value = "Whoops ! only 1st date allowed";
											this.style.color="red";
											this.style.borderColor="red";
											this.className="animated infinite pulse";
											this.onclick=function(){
												this.type="date";
												this.value = "";
												this.style.color="";
												this.style.borderColor="";
												this.className="";
									}
										}
									}	
									else{
										this.type="text";
										this.value = "Whoops ! only 4th month allowed";
										this.style.color="red";
										this.style.borderColor="red";
										this.className="animated infinite pulse";
										this.onclick=function(){
											this.type="date";
											this.value = "";
											this.style.color="";
											this.style.borderColor="";
											this.className="";
									}
								}
							}
								else{
									this.type="text";
									this.value = "Whoops ! passed year not allowed";
									this.style.color="red";
									this.style.borderColor="red";
									this.className="animated infinite pulse";
									this.onclick=function(){
										this.type="date";
										this.value = "";
										this.style.color="";
										this.style.borderColor="";
										this.className="";
			   						}
								}
						}
					}
					else{
						this.value = "Type company name pvt.ltd or company name govt.ltd";
						this.style.color="red";
						this.style.borderColor="red";
						this.className="animated infinite pulse";
						this.onclick=function(){
										this.value = "";
										this.style.color="";
										this.style.borderColor="";
										this.className="";
			   						}
					}
				}
			}

		}
		else{
			this.value = "Whoops ! number is not allowed";
			this.style.color="red";
			this.style.borderColor="red";
			this.className="animated infinite pulse";
			this.onclick=function(){
				this.value = "";
			this.style.color="";
			this.style.borderColor="";
			this.className="";
			}
		}
	}
}


form_val();

//delet company
function delet_company(){
	var del_btn = document.getElementById("delet");
	del_btn.onclick=function(){
		if(localStorage.getItem("company") != null){
			var check = confirm("Are you sure to delet company ?");
			if (check==true) {
				localStorage.removeItem("company");
				localStorage.removeItem("company-logo");
				var i;
				for (var i = 0; i < localStorage.length; i++) {
					var all_keys = localStorage.key(i);
					if (all_keys.match("tax") != null) 
					{
						localStorage.removeItem(all_keys);
					}
					else if (all_keys.match("voucher_no") != null) 
					{
						localStorage.removeItem(all_keys);
					}
					else if (all_keys.match("unit_of_measure") != null) 
					{
						localStorage.removeItem(all_keys);
					}
				}
				window.location = location.href;
			}

		}	
		else{
			alert("No company is found !");
		}
	}
}
delet_company();

// logout coding

function logout(){
	var log_out = document.getElementById("log");
	log_out.onclick = function(){
		sessionStorage.clear();
		var logout_notice = document.getElementById("logout-notice");
		logout_notice.style.display="block";
		setTimeout(function(){window.location = "../../index.html";},2000);
		

	}
}

logout();


//display company name
function check_cmp(){
	if (localStorage.getItem("company") != null) {
			document.getElementById("model").remove();
			var key_data=localStorage.getItem("company");
			var cmp_data=JSON.parse(key_data);
			var brand_name=document.getElementById("create");
			brand_name.innerHTML=cmp_data.cmp_name;
			brand_name.style.color="red";
			brand_name.style.fontWeight="bold";
			var upload = document.getElementById("company-icon");
			upload.className="fa fa-upload animated infinite flash";
			upload.onmouseover=function(){
				this.className="fa fa-upload animated pulse";
				this.style.cursor="pointer";
				this.title="upload a logo 100 * 100 size";
				this.onclick=function(){
					var input = document.createElement("INPUT");
					input.type="file";
					input.accept="images/*";
					input.click();
					input.onchange = function(){
						if (this.files[0].size > 512000) {
							var upload_notice = document.getElementById("upload-notice");
							upload_notice.style.display="block";
						}
						else{
							var reader = new FileReader();
							reader.readAsDataURL(this.files[0]);
							reader.onload = function(){
								localStorage.setItem("company-logo",reader.result);
								window.location = location.href;
							}
						}
					}
				}
			}
			upload.onmouseout=function(){
				window.location = location.href;
				this.style.cursor="pointer";
			}
			brand_name.onclick=function(){
				var cmp_data = localStorage.getItem("company");
				var get_cmp_data = JSON.parse(cmp_data);
				if (get_cmp_data.stock_type == "accounts only") 
				{
				window.location="business_assest/accounts_only.html";
			 	}
			 	else if (get_cmp_data.stock_type == "accounts with inventry") 
			 	{
			 		window.location="business_assest/accounts_with_inventry.html";
			 	}
			}
	}
}
check_cmp();

//show company logo
function show_company_logo(){
	var upload = document.getElementById("company-icon");
	if(localStorage.getItem("company-logo") != null)
	{
	upload.className = "";
	upload.style.backgroundImage = "url("+localStorage.getItem("company-logo")+")";
	upload.style.backgroundSize = "cover";
	}
}

show_company_logo();