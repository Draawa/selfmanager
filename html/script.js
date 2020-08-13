var config = require('./config.json');
var mysql = require('mysql');

var dbConnect = mysql.createConnection({
    host     : config.dbHost,
    user     : config.dbUser,
    password : config.dbPassword,
    database : config.dbName
});

window.onload=function()
{
  const remote = require('electron').remote;

  document.getElementById("min-btn").addEventListener("click", function (e) {
        var window = remote.getCurrentWindow();
        window.minimize();
   });

   document.getElementById("max-btn").addEventListener("click", function (e) {
        var window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
   });

   document.getElementById("close-btn").addEventListener("click", function (e) {
        var window = remote.getCurrentWindow();
        window.close();
   });

   document.querySelectorAll('.progressBar').forEach(bar =>
   {
     let data = {};
     for( let el in bar.dataset) if(el!='barcolor')data[el]=parseInt(bar.dataset[el]);
     console.log(data);
     let threshold=100*((data.barcurr-data.barmin)/(data.barmax-data.barmin));
     bar.innerHTML="<div style='background-color:"+bar.dataset.barcolor+"; width:"+threshold+"%;' class='innerProgressBar'></div>";
   });



  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  function traitementClick(event)
  {
    event.stopPropagation();
    this.dataset.selected=(this.dataset.selected==='selected'?'unselected':'selected');
    if (this.dataset.selected==='selected')this.classList.add('selected');
    else this.classList.remove('selected');
    let curr=this;
    document.querySelectorAll('.listItem').forEach( (element) =>
      {
        if(element===curr) return;
        element.dataset.selected='unselected';
        element.classList.remove('selected');
      });
    let btn = document.querySelector('#skill-details-cancel button');
    btn.disabled=!(this.dataset.selected==='selected');
    //console.log(this.classList);
  }

  let list = document.getElementsByClassName('listItem');

  for (let i = 0; i<list.length;i++) { // Fore each list element ..
      list[i].addEventListener('click', traitementClick, false);
      console.log(list[i]);
  }



  // DATABASE HANDLING ----------------

  // connect to mysql
  dbConnect.connect(function(err) {
      // in case of error
      if(err){
          console.log(err.code);
          console.log(err.fatal);
          document.getElementById("dbWarning").style.display='inline';
      }
  });



} //ONLOAD END

//filter dropdown menus
function dropdownFunc1()
{
  document.getElementById("myDropdown1").classList.toggle("show");
}
function dropdownFunc2()
{
  document.getElementById("myDropdown2").classList.toggle("show");
}
function dropdownFunc3()
{
  document.getElementById("myDropdown3").classList.toggle("show");
}




//WELCOME MENU FUNCTIONS
function openUserCreation()
{
  //Updating interface.......
  document.getElementById("loginMenu").style.display='none';
  document.getElementById("userCreationMenu").style.display='inline';

}

function cancelUserCreation()
{
  //Updating interface.......
  document.getElementById('userCreateField').value="";
  document.getElementById('password1Field').value="";
  document.getElementById('password2Field').value="";
  document.getElementById("loginMenu").style.display='inline';
  document.getElementById("userCreationMenu").style.display='none';

}

function createUser()
{
  var username=document.getElementById('userCreateField').value;
  var password1=document.getElementById('password1Field').value;
  var password2=document.getElementById('password2Field').value;

  if(password1!=password2)
  {
    document.getElementById("welcomeWarning").innerHTML = "The passwords provided do not match.";
  }
  else if(username=="")
  {
    document.getElementById("welcomeWarning").innerHTML = "Username cannot be empty.";
  }
  else if(password1=="" || password2=="")
  {
    document.getElementById("welcomeWarning").innerHTML = "Passwords cannot be empty.";
  }
  else
  {
    var query = "INSERT INTO users (name) VALUES('"+username+"')"
    dbConnect.query(query, function(err, rows, fields)
    {
      if(err)
      {
          console.log("An error ocurred performing the query.");
          console.log(err);
          return;
      }
      console.log("Query succesfully executed", rows);
    });
  }


}
