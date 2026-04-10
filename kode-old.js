$(document).ready(function(){

    // $('a.secclose').click(hideSection);
    // $('a.navitem').click(function(){toggleSection('contact');});

    var gen_a = function(sectionName){
      var tmpl = ' <a href="#x" id="nav-x" class="navitem" onclick="toggleSection(\'x\');">x</a>';
      return tmpl.replace(/x/g, sectionName);
    }

    $('#container').append(''
      + '<div id=navigation>'
      + '<h4 class="access">navigation</h4>'
      + gen_a('contact') + gen_a('research') + gen_a('activity') + gen_a('teaching')
      + '</div>'
    );

    var initialSection = location.hash;
    var avaliableSections = {'#contact':'', '#research':'', '#activity':'', '#teaching':''}

    if (initialSection in avaliableSections)
    {
      toggleSection(initialSection.substring(1));
    }

    function locationHashChanged() {  
        if (location.hash in avaliableSections) {  
            toggleSection(location.hash.substring(1));
        }  
    }

    window.onhashchange = locationHashChanged;

});


var currentSection = 'none';
var fadingInProgress = false;

function hideSection(ev)
{
  var oldSection = currentSection;

  if (currentSection != 'none')
  {
    $("#" + currentSection).fadeOut("fast");
    //sec = document.getElementById(currentSection);
    //sec.style.display = 'none';
    currentSection = 'none';
  }

  return oldSection;
}

function toggleSection(sectionName)
{
  if (fadingInProgress) { return; }
  fadingInProgress = true;
  if (currentSection != sectionName)
  {
    if (currentSection == 'none')
    {
      $("#nav-" + sectionName).addClass("activebutton");
      $("#" + sectionName).fadeIn("fast", endFading);
    }
    else
    {
      $("#nav-" + currentSection).removeClass("activebutton");
      $("#nav-" + sectionName).addClass("activebutton");
      $("#" + currentSection).fadeOut("fast", function(){
        $("#" + sectionName).fadeIn("fast", endFading);
      });
    }
    //sec = document.getElementById(sectionName);
    //sec.style.display = 'block';
    currentSection = sectionName;
  }
  else
  {
    $("#nav-" + currentSection).removeClass("activebutton");
    $("#" + currentSection).fadeOut("fast", endFading);
    //sec = document.getElementById(currentSection);
    //sec.style.display = 'none';
    currentSection = 'none';
  }
}

function endFading()
{
  fadingInProgress = false;
}