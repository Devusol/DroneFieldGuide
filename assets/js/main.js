/**
* Template Name: Vlava - v2.1.0
* Template URL: https://bootstrapmade.com/vlava-free-bootstrap-one-page-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

//Cookie popup
!(function ($) {
  "use strict";

  //Cookie
  if (localStorage.getItem('cookieSeen') != 'shown') {
    $('.cookie-banner').delay(2000).fadeIn();
    localStorage.setItem('cookieSeen', 'shown')
  };

  $('.closeCookie').click(function () {
    $('.cookie-banner').fadeOut();
  })

})(jQuery);

//Hero resizer
var heroDisplayh1 = document.getElementById("heroh1");
var heroDisplayh2 = document.getElementById("heroh2");
var heroSection = document.getElementById("hero");
var mapSection = document.getElementById("mapSection");
var mapdiv = document.getElementById("map");
var footerSection = document.getElementById("footer");
var screenHeight = screen.height - (screen.height * .05);

heroDisplayh1.opened = "True";
heroDisplayh2.opened = "True";

function operateHero() {
  if (heroDisplayh1.opened == "True") {
    heroDisplayh1.opened = "False";
    heroDisplayh2.opened = "False";

    heroDisplayh2.classList.remove("elementToFadeIn");
    heroDisplayh1.classList.remove("elementToFadeIn");

    heroDisplayh2.classList.add("elementToFadeOut");
    heroDisplayh1.classList.add("elementToFadeOut");



    /*  heroDisplayh1.style.display = "none";
     heroDisplayh2.style.display = "none"; */
    footerSection.style.display = "none";
    heroSection.style.height = "6vh";
    mapSection.style.padding = "2px 0 0 0";
    mapdiv.style.height = `${screenHeight}px`;
    mapdiv.addEventListener("transitionend", function () {
      map.resize();
    });
  } else {

    heroDisplayh1.opened = "True";
    heroDisplayh2.opened = "True";

    heroDisplayh2.classList.remove("elementToFadeOut");
    heroDisplayh1.classList.remove("elementToFadeOut");
    heroDisplayh2.classList.add("elementToFadeIn");
    heroDisplayh1.classList.add("elementToFadeIn");
    /* 
    heroDisplayh1.style.display = "block";
    heroDisplayh2.style.display = "block"; */
    footerSection.style.display = "block";
    heroSection.style.height = "20vh";
    mapSection.style.padding = "9px 0 0 0";
    mapdiv.style.height = "65vh";
    mapdiv.addEventListener("transitionend", function () {
      map.resize();
    });
  }
}


//Feedback form modal and modal operator
var modalFeed = document.getElementById("modalFeedback");
var feedbackForm = document.getElementById("feedbackForm");
var buttonFeed = document.getElementById("feedbackButton");
var feedbackClose = document.getElementsByClassName("close")[1];

buttonFeed.addEventListener("click", feedbackButt);

feedbackClose.addEventListener("click", function () {
  modalFeed.style.display = "none";
});

feedbackForm.addEventListener("submit", function () {
  modalFeed.style.display = "none";
  alert("Info sent to our team. Thank you for your feedback.")
});

function feedbackButt() {
  modalFeed.style.display = "block";
}

function delayHero() {
  setTimeout(operateHero, 1500);
}

//Changed from Dark to Light Theme
//var mainToggle = document.querySelector('input[name="toggleInput"]:checked');

//var darkLightCSS = document.getElementById("toggleStyle");



function switchLayer(isChecked) {
  console.log("iaminswitch",isChecked);
  
  if (isChecked == "yes") {

    map.setStyle('mapbox://styles/107aviation/cknouazib1olc17tclqd3gef4');
   
  } else if (isChecked == "no"){

    map.setStyle('mapbox://styles/107aviation/ckn6p0fw00j5t18pbncx5s9eg');
    
  }
  else{
    map.setStyle('mapbox://styles/107aviation/cknrryurm10j217quq5p0ri4j')
   
    
  }
}


function logStuff(inFrom) {
  console.log(inFrom);
}
