//sign up coding start .............
function signup()
{
	var name = btoa(document.getElementById("name").value);
	var email = btoa(document.getElementById("email").value);
	var password = btoa(document.getElementById("sign_pass").value);
	var number = btoa(document.getElementById("number").value);
	var signup_input = {name:name,email:email,password:password,number:number};
	var signup_data = JSON.stringify(signup_input);
	if(name!="" && email!="" && password!="" && number!="")
	{
          localStorage.setItem(email,signup_data);
          document.getElementById("signup_success").innerHTML = "Sign up success";
          setTimeout(function(){document.getElementById("signup_success").innerHTML = "";},2000)
        var name = document.getElementById("name").value = "";
		var email = document.getElementById("email").value = "";
		var password = document.getElementById("sign_pass").value = "";
		var number = document.getElementById("number").value = "";
          return false;
	}
	else{
		alert("fill all the box");
	}
}

function userexist()
{
	var email = btoa(document.getElementById("email").value);
	if(localStorage.getItem(email) != null)
	{
	var exit = document.getElementById("existspan");
	exit.innerHTML = "This user is alrady existed";
	document.getElementById("sign_pass").disabled=true;
	document.getElementById("number").disabled=true;
	document.getElementById("sign_btn").disabled=true;
	document.getElementById("email").onclick = function()
	{
		this.value = "";
		exit.innerHTML = "";
		document.getElementById("sign_pass").disabled=false;
	document.getElementById("number").disabled=false;
	document.getElementById("sign_btn").disabled=false;
	}
	}
}
function login()
{
	var username = btoa(document.getElementById("username").value);
	var password = btoa(document.getElementById("password").value);
	var login_input = {username:username,password:password};
	var login_data = JSON.stringify(login_input);
	sessionStorage.setItem(username,login_data);
	var local_data = sessionStorage.getItem(username);
	var local_convert = JSON.parse(local_data);
	if(localStorage.getItem(local_convert.username) == null)
	{
		document.getElementById("user_notfound").innerHTML = "user not found";
		return false;
	}
	else{
		var final_password = localStorage.getItem(local_convert.username);
		var extract = JSON.parse(final_password);
		if(local_convert.password == extract.password)
		{
			location.replace("profile/profile.html");
			sessionStorage.setItem('user_email',username);
			return false;
		}
		else{
			document.getElementById("password_wrong").innerHTML = "Wrong password";
			setTimeout(function(){document.getElementById("password_wrong").innerHTML = "";},2000)
		return false;
		}
	}
}
var user_empty = document.getElementById("username");
user_empty.onclick = function()
{
	document.getElementById("user_notfound").innerHTML = "";
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
}

