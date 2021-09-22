// tabs
function tabs()
{
  var tab_list = document.getElementById("tab-list");
  var button = tab_list.getElementsByTagName("BUTTON");
  var hide = document.getElementsByClassName("open");
  var i,j;
  for(i=0;i<button.length;i++)
  {
    button[i].onclick = function(){
      for(j=0;j<hide.length;j++)
      {
        hide[j].style.display = "none";
        document.getElementById("search-ledger-no").value = "";
        document.getElementById("edit-ledger").value = "";
        document.getElementById("hide-one").style.display = "none";
        document.getElementById("hide-two").style.display = "none";
        document.getElementById("hide-three").style.display = "none";
        document.getElementById("hide-four").style.display = "none";
        document.getElementById("hide-five").style.display="none";
        document.getElementById("hide-six").style.display="none";
        document.getElementById("save").style.display = "none";
        document.getElementById("delete").style.display = "none";
        document.getElementById("ledger-notice").innerHTML = "";
        document.getElementById("search-notice").style.display = "none";
        document.getElementById("view-table").style.display = "none";
      }

      for(j=0;j<button.length;j++)
      {
        button[j].className = "";
      }

      var id_value = this.innerHTML.toLowerCase();
      var show_element = document.getElementById(id_value);
      show_element.style.display = "block";
      var input = show_element.getElementsByTagName("INPUT");
      input[0].focus();
      this.className = "active";
    }
  }

 document.getElementById("default").click(); 
}

tabs();

// update cr and dr
function update_cr_dr(){
  var group = document.getElementById("group");
  var mode = document.getElementById("mode");
  group.onchange = function(){
    var ac = this.value;
    switch(ac)
    {
      case "Capital account" : mode.value = "Cr";
      break;
      case "Sales account" : mode.value = "Cr";
      break;
      case "Purchase account" : mode.value = "Dr";
      break;
      case "Sundry creditors" : mode.value = "Cr";
      break;
      case "Sundry debitors" : mode.value = "Dr";
      break;
      default : mode.value = "";
    }
  }
}
update_cr_dr();

//creat form submit

function create_submit(){
    var create_form = document.getElementById("create-form");
    create_form.onsubmit = function(){
      var group = document.getElementById("group");
        if(group.value != "Select group"){
           var ledger_name = document.getElementById("ledger-name").value;
           var balance = document.getElementById("balance").value;
           var mode = document.getElementById("mode").value;
           var mailing_name = document.getElementById("mailing-name").value;
           var address = document.getElementById("address").value;
           var ledger_details = {ledger_name:ledger_name,group:group.value,balance:balance,mode:mode,mailing_name:mailing_name,address:address};
           var store_ledger = JSON.stringify(ledger_details);
           localStorage.setItem("ledger_no_"+document.getElementById("ledger-no").innerHTML,store_ledger);
        }
        else{
          group.style.borderColor = "red";
          group.className = "animated infinite pulse";
          group.onclick=function(){
            this.style.borderColor = "";
            this.className = "";
          }
          return false;
        }
    }
}
create_submit();

//ledger no update
function ledger_no(){
  var ledger_no = document.getElementById("ledger-no");
  var i,large_no = 0;
  for (var i = localStorage.length - 1; i >= 0; i--) {
    var all_keys = localStorage.key(i);
    if (all_keys.match("ledger_no")) 
    {
      var num = Number(all_keys.replace("ledger_no_",""));
      if (num > large_no) 
      {
        large_no = num;
      }
    }
  }
  ledger_no.innerHTML = large_no+1;
}
ledger_no();

//total calculation
function total_cal(){
  var i,credit = 0,debit = 0;
  for (var i = 0; i < localStorage.length; i++) {
    var all_keys = localStorage.key(i);
    if (all_keys.match("ledger_no")) 
    {
      var ledger_data = localStorage.getItem(all_keys);
      var ledger_extract = JSON.parse(ledger_data);
      if (ledger_extract.mode.match("Cr")) 
      {
          credit += Number(ledger_extract.balance);
          document.getElementById("credit").innerHTML = credit+" Cr";
      }
      else
      {
          debit += Number(ledger_extract.balance);
          document.getElementById("debit").innerHTML = debit+" Dr";
      }
      if (credit>debit) 
      {
        document.getElementById("dif").innerHTML = credit-debit+" Cr";
      }
      else{
        document.getElementById("dif").innerHTML = debit-credit+" Cr";
      }
      }
    }
  }

total_cal();

//search ledger and edit
function edit_ledger(){
  var ledger_no = document.getElementById("edit-ledger");
 ledger_no.onkeyup = function(event)
 {
    if (event.keyCode == 13) 
    {
      if (this.value == "") 
      {
        document.getElementById("hide-one").style.display = "none";
          document.getElementById("hide-two").style.display = "none";
          document.getElementById("hide-three").style.display = "none";
          document.getElementById("hide-four").style.display = "none";
          document.getElementById("hide-five").style.display="none";
          document.getElementById("hide-six").style.display="none";
                    document.getElementById("save").style.display = "none";
          document.getElementById("delete").style.display = "none";
          document.getElementById("ledger-notice").innerHTML = "";
      }
      else{
        if (localStorage.getItem("ledger_no_"+this.value) != null) 
        {
          var ledger_data = localStorage.getItem("ledger_no_"+this.value);
          var ledger = JSON.parse(ledger_data);
          if (ledger.delete != "active") 
          {
          document.getElementById("hide-one").style.display = "block";
          document.getElementById("hide-two").style.display = "block";
          document.getElementById("hide-three").style.display = "block";
          document.getElementById("hide-four").style.display = "block";
          document.getElementById("save").style.display = "block";
          document.getElementById("delete").style.display = "block";
          document.getElementById("ledger-notice").style.display = "none";
          document.getElementById("edit-lno").innerHTML = this.value;
          document.getElementById("edit-lname").innerHTML = ledger.ledger_name;
          document.getElementById("edit-group").value = ledger.group;
          document.getElementById("edit-group").onchange = function(){
                                          var ac = this.value;
                                          switch(ac)
                                          {
                                            case "Capital account" : document.getElementById("dr-cr").innerHTML = "Cr";
                                            break;
                                            case "Sales account" : document.getElementById("dr-cr").innerHTML = "Cr";
                                            break;
                                            case "Purchase account" : document.getElementById("dr-cr").innerHTML = "Dr";
                                            break;
                                            case "Sundry creditors" : document.getElementById("dr-cr").innerHTML = "Cr";
                                            break;
                                            case "Sundry debitors" : document.getElementById("dr-cr").innerHTML = "Dr";
                                            break;
                                            default : document.getElementById("dr-cr").innerHTML = "";
                                          }
                                        }
          document.getElementById("dr-cr").innerHTML = ledger.mode;
          document.getElementById("edit-balance").innerHTML = ledger.balance;
          if (ledger.mailing_name == "") 
          {
            document.getElementById("hide-five").style.display="none";
          }
          else{
            document.getElementById("hide-five").style.display="block";
            document.getElementById("edit-mname").innerHTML = ledger.mailing_name;
          }
          if (ledger.address == "") 
          {
          document.getElementById("hide-six").style.display="none";
         }
         else{
           document.getElementById("hide-six").style.display="block";
            document.getElementById("edit-address").innerHTML = ledger.address;
            }
          }
          else{
          document.getElementById("hide-one").style.display = "none";
          document.getElementById("hide-two").style.display = "none";
          document.getElementById("hide-three").style.display = "none";
          document.getElementById("hide-four").style.display = "none";
          document.getElementById("hide-five").style.display="none";
          document.getElementById("hide-six").style.display="none";
          document.getElementById("save").style.display = "none";
          document.getElementById("delete").style.display = "none";
          var notice = document.getElementById("ledger-notice");
          notice.style.display = "block";
          notice.innerHTML = "This ledger has been deleted some time ago.<br><br><button id='restore-ledger' style='margin-left:300px;background-color:white;border: 2px solid black;padding:5px;'>Restore</button>";
          document.getElementById("restore-ledger").onclick=function(){
              var check = window.confirm("Do you want to restore this ledger ?")
              if (check == true) 
              {
                var take_data = localStorage.getItem("ledger_no_"+ledger_no.value);
                localStorage.setItem("ledger_no_"+ledger_no.value,take_data.replace("active","deactive"));
                window.location = location.href;
              }
            }
          }  
        }
        else{
          document.getElementById("hide-one").style.display = "none";
          document.getElementById("hide-two").style.display = "none";
          document.getElementById("hide-three").style.display = "none";
          document.getElementById("hide-four").style.display = "none";
          document.getElementById("hide-five").style.display="none";
          document.getElementById("hide-six").style.display="none";
          document.getElementById("save").style.display = "none";
          document.getElementById("delete").style.display = "none";
          document.getElementById("ledger-notice").innerHTML = "No ledger found !";
          document.getElementById("ledger-notice").style.display = "block";
        }
      }
    }
  }
  var save = document.getElementById("save");
  save.onclick = function(){
      var save_object = {
        ledger_name:document.getElementById("edit-lname").innerHTML,
        group:document.getElementById("edit-group").value,
        balance:document.getElementById("edit-balance").innerHTML,
        mode:document.getElementById("dr-cr").innerHTML,
        mailing_name:document.getElementById("edit-mname") == null ? "" : document.getElementById("edit-mname").innerHTML,
        address:document.getElementById("edit-address") == null ? "" : document.getElementById("edit-address").innerHTML
      };
      var save_data = JSON.stringify(save_object);
      localStorage.setItem("ledger_no_"+ledger_no.value,save_data);
      window.location = location.href;
  }
  //delet ledger coding
  var delete_ledger = document.getElementById("delete");
  delete_ledger.onclick=function(){
    var check = window.confirm("Are you sure to delete ?")
    if (check == true) 
    {
      var save_object = {
        ledger_name:document.getElementById("edit-lname").innerHTML,
        group:document.getElementById("edit-group").value,
        balance:document.getElementById("edit-balance").innerHTML,
        mode:document.getElementById("dr-cr").innerHTML,
        mailing_name:document.getElementById("edit-mname") == null ? "" : document.getElementById("edit-mname").innerHTML,
        address:document.getElementById("edit-address") == null ? "" : document.getElementById("edit-address").innerHTML,
        delete: "active"
      };
      var save_data = JSON.stringify(save_object);
      localStorage.setItem("ledger_no_"+ledger_no.value,save_data);
      window.location = location.href;
    }
  }
}
edit_ledger();


//search ledger only

function search_ledger(){
    var ledger_no = document.getElementById("search-ledger-no");
    ledger_no.oninput = function(){
      if (this.value == "") 
        {
          document.getElementById("search-notice").style.display = "none";
          document.getElementById("view-table").style.display = "none";
        }
      else{

          if (this.value == "") 
              {
               document.getElementById("search-notice").style.display = "none";
               document.getElementById("view-table").style.display = "none";
             }
        else{
          if (localStorage.getItem("ledger_no_"+this.value) != null) 
             {
              document.getElementById("view-table").style.display = "block";
             document.getElementById("search-notice").style.display = "none";
             var ledger_details = localStorage.getItem("ledger_no_"+this.value);
             var ledger = JSON.parse(ledger_details);
             document.getElementById("view-ledger-no").innerHTML = this.value;
             document.getElementById("view-ledger-name").innerHTML = ledger.ledger_name;
             document.getElementById("view-group").innerHTML = "Group : "+ledger.group;
             document.getElementById("view-balance").innerHTML = "Opening balance : "+ledger.balance+" "+ledger.mode;
             document.getElementById("view-mailingname").innerHTML = "Mailing name : "+ledger.mailing_name;
             document.getElementById("view-address").innerHTML = "Addrss : "+ledger.address;

             }
          else{
              document.getElementById("view-table").style.display = "none";
             document.getElementById("search-notice").style.display = "block";
            }
          }          
                  
           
      }
    }

}
search_ledger();

