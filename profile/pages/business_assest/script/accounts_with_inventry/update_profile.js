//show profile photo
function show_profile_photo(){
	var box = document.getElementById("pic-box");
	var user_mail = sessionStorage.getItem("user_email");
	var image_name = localStorage.getItem(user_mail+"image_url");
	box.style.background = "url("+image_name+")";
   	box.style.backgroundSize = "cover";
}
show_profile_photo();

//show company logo
function show_cmp_logo(){
	var logo_box = document.getElementById("cmp-logo");
	var logo_key = localStorage.getItem("company-logo");
	logo_box.style.backgroundImage = "url("+logo_key+")";
	logo_box.style.backgroundSize = "cover";
}
show_cmp_logo();

//show company name
function show_cmp_name(){
	var name_box = document.getElementById("cmp-name");
	var cmp_details = localStorage.getItem("company");
	var cmp_extract = JSON.parse(cmp_details);
	name_box.innerHTML = cmp_extract.cmp_name;
}
show_cmp_name();

//show date and time
function show_date(){
	var date = new Date();
	var get_date = date.getDate();
	var get_month = date.getMonth();
	var get_year = date.getFullYear();
	var get_time = date.toLocaleTimeString();
	document.getElementById("date").innerHTML = "Date : "+get_date+"/"+Number(get_month+1)+"/"+get_year;
	document.getElementById("time").innerHTML = "Time : "+get_time;


}
show_date();