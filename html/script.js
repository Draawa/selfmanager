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

for (let i = 0; i<list.length;i++) { // Pour chaque élément de la liste ..
    list[i].addEventListener('click', traitementClick, false);
    console.log(list[i]);
}

} //onload END

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
