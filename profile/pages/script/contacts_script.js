window.onload=function(){
	var x = document.getElementById("container").children.length;
	if (x==0) {
		document.getElementById("c_list").innerHTML = "No contact !";
	}
}

function plus(){
	var box = document.getElementById("cont_listbox");
	box.style.display = "block";
}
function minus(){
	var box = document.getElementById("cont_listbox");
	box.style.display = "none";
}
function main_photo()
{
	var photo = document.getElementById("profile_photo");
	var user_mail = sessionStorage.getItem("user_email");
	var image_name = localStorage.getItem(user_mail+"image_url");
   	photo.style.background = "url("+image_name+")";
   	photo.style.backgroundSize = "cover";
}
main_photo();

function save_cont(){
	var full_name = document.getElementById("full_name").value;
	var num_one = document.getElementById("first_num").value;
	var num_two = document.getElementById("second_num").value;
	var contact_number = {fullname:full_name,pnum:num_one,snum:num_two};
	var cont_details = JSON.stringify(contact_number);
	localStorage.setItem(full_name+" contact",cont_details);
	var notic = document.getElementById("saved");
	notic.style.display = "block";
	setTimeout(function(){notic.style.display = "none";},2000);
	var form = document.getElementById("add_form");
	form.reset();
		window.location=location.href;
}

function showcontacts(){
	var i;
	for(i=1;i<localStorage.length;i++)
	{
		var keys = localStorage.key(i);
		if(keys.match("contact"))
		{
		var json_text = localStorage.getItem(keys);
		var json_extract = JSON.parse(json_text);
		var cont = document.getElementById("container");
		var fieldset = document.createElement("FIELDSET");
		var legend = document.createElement("LEGEND");
		var ol = document.createElement("OL");
		var li_one = document.createElement("LI");
		var li_two =document.createElement("LI");
		var trash = document.createElement("I");
		trash.setAttribute("class","fa fa-trash");
		trash.setAttribute("id","delet_icon");
		trash.setAttribute("title","Delet contact");
		var edit = document.createElement("I");
		edit.setAttribute("class","fa fa-edit");
		edit.setAttribute("id","delet_icon");
		edit.setAttribute("title","Edit contact");
		var save = document.createElement("I");
		save.setAttribute("class","fa fa-save");
		save.setAttribute("id","delet_icon");
		save.setAttribute("title","Save contact");
		var saved = document.createElement("SPAN");
		cont.appendChild(fieldset);
		fieldset.appendChild(legend);
		fieldset.appendChild(ol);
		ol.appendChild(li_one);
		ol.appendChild(li_two);
		ol.appendChild(trash);
		ol.appendChild(edit);
		ol.appendChild(save);
		save.style.display="none";
		fieldset.appendChild(saved);
		legend.appendChild(document.createTextNode(json_extract.fullname));
		li_one.appendChild(document.createTextNode(json_extract.pnum));
		li_two.appendChild(document.createTextNode(json_extract.snum));
		saved.appendChild(document.createTextNode("saved successfully !"));
		saved.style.color="red";
		saved.style.fontFamily="sans-serif";
		saved.style.float="right";
		saved.style.clear="both";
		saved.style.marginTop="-20px";
		saved.style.display="none";
		saved.style.fontSize="15px";
		del_contact(keys,trash);
		edit_contact(keys,save,edit,saved);
	}
}
}
showcontacts();

function del_contact(contact_name,del_btn)
{
	del_btn.onclick = function(){
		var ans = confirm("Do you want to delet this contact ?")
		if(ans == true){
		var ol = this.parentElement;
		var fieldset = ol.parentElement;
		fieldset.remove(); 
		document.cookie=contact_name+"="+localStorage.getItem(contact_name)+";max-age:2592000"; 
		localStorage.removeItem(contact_name);
		var x = document.getElementById("container").children.length;
	if (x==0) {
		document.getElementById("c_list").innerHTML = "No contact !";
	     }
	}

	}
}

// search related coding....

function search_contact(user_input){
	var keyword = user_input.value.toUpperCase();
	var contact_list = document.getElementById("container");
	var legend = contact_list.getElementsByTagName("LEGEND");
	var i;
	for(i=0;i<legend.length;i++)
	{
		if(legend[i].innerHTML.toUpperCase().indexOf(keyword) != -1)
		{
			 legend[i].parentElement.style.display = "";
		}
		else{
			legend[i].parentElement.style.display = "none";

		}
	}
}


function edit_contact(contact_name,save_btn,edit_btn,saved){
	edit_btn.onclick = function(){
		save_btn.style.display="block";
		var ol = this.parentElement;
		var fieldset = ol.parentElement;
		var legend = fieldset.getElementsByTagName("LEGEND");
		legend[0].setAttribute("contenteditable","true");
		legend[0].focus(); 
		var li = ol.getElementsByTagName("LI");
		var i;
		for (var i = 0; i < li.length; i++) {
			li[i].setAttribute("contenteditable","true")
		}
		var recent_legend;
		var current_legend;
		legend[0].onclick=function(){
			recent_legend = this.innerHTML;
		}
		legend[0].onblur=function(){
			current_legend=this.innerHTML;
		}
		var recent_number = [];
		var current_number = [];
		li[0].onclick=function(){
			recent_number[0] = this.innerHTML;
		}
		li[1].onclick=function(){
			recent_number[1] = this.innerHTML;
		}
		li[0].onblur=function(){
			current_number[0] = this.innerHTML;
		}
		li[1].onblur=function(){
			current_number[1] = this.innerHTML;
		}
		save_btn.onclick = function(){
			var edit_data = {fullname:current_legend==undefined?legend[0].innerHTML:current_legend,pnum:current_number[0]==undefined?li[0].innerHTML:current_number[0],snum:current_number[1]==undefined?li[1].innerHTML:current_number[1]};
			var final_data = JSON.stringify(edit_data);
			var txt = localStorage.getItem(contact_name);
			localStorage.setItem(contact_name,txt.replace(txt,final_data)); 
			saved.style.display="block";
			setTimeout(function(){saved.style.display="none";},3000)
		}
	}
}

function logout()
{
	sessionStorage.clear();
	setTimeout(function(){window.location="../../index.html";},2000)
}
function open_restore_box(){
	var page = document.getElementById("restore_data_box");
	page.style.height = "100vh";
	page.style.transition = "0.5s";
	if(document.cookie.length!=0)
	{
		document.getElementById("restore_notice").innerHTML = "Deleted contact";
	}
	else{
		document.getElementById("restore_notice").innerHTML = "No deleted contact !";
	}
}