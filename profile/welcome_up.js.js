
function url_secure(){
	if (sessionStorage.length<=0) {
		document.getElementById("body").style.display = "none";
		document.body.style.backgroundColor = "black";
		document.body.innerHTML = "<h1 style='font-size:50px;color:white;font-family:sans-serif;text-align:center;'>Illigal action performed</h1>";
	}
}
url_secure();
// image upload code...

function upload_pic(){
	var input = document.getElementById("inp_file");
	if(input.files[0].size<1000000)
	{
	var freader = new FileReader();
	freader.readAsDataURL(input.files[0]);
	freader.onload = function(event){
		var image_url = event.target.result;
		var show = document.getElementById("profile_img");
		show.style.background = "url("+event.target.result+")";
		show.style.backgroundRepeat = "no-repeat";
		show.style.backgroundSize = "cover";
		var icon = document.getElementById("upload_fafa");
		icon.style.display = "none";
		var next_btn = document.getElementById("next");
		next_btn.style.display = "block";
		next_btn.onclick = function(){
			localStorage.setItem(sessionStorage.getItem("user_email")+'image_url',image_url)
			document.getElementById("body").style.display = "none";
			window.location=location.href;
		}
		}
	}
	else{
		alert("please upload less then 1mb photo");
	}
}
function profile_name(){
	var result = document.getElementById("user_name");
	var result_a = document.getElementById("profile_name");
	var user_mail = sessionStorage.getItem('user_email');
	var user_details = localStorage.getItem(user_mail);
	var user_data = JSON.parse(user_details);
	var decode = user_data.name;
	result.innerHTML = atob(decode);
	result_a.innerHTML = atob(decode);
}
profile_name();

// stop showing upload image box

function stop_upload(){
	if(localStorage.getItem(sessionStorage.getItem("user_email")+"image_url") != null)
	{
		var black_div = document.getElementById("body");
		black_div.style.display = "none";
	}
}
stop_upload();


// main page profile name ..........
function main_photo()
{
	var photo = document.getElementById("profile_photo");
	var user_mail = sessionStorage.getItem("user_email");
	var image_name = localStorage.getItem(user_mail+"image_url");
   	photo.style.background = "url("+image_name+")";
   	photo.style.backgroundSize = "cover";
}
main_photo();



function logout()
{
	sessionStorage.clear();
	document.getElementById("wait_for_logout").style.display = "block";
	setTimeout(function(){window.location="../index.html";},2000)
}