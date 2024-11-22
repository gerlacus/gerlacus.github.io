function scrollBg() {
    var scrolltotop = document.scrollingElement.scrollTop;
    var target = document.getElementById("bg");
    var offset = -2000;
    var xvalue = "center";
    var factor = 0.5;
    var yvalue = offset + (scrolltotop * factor);
    target.style.backgroundPosition = xvalue + " " + yvalue + "px";
  }


document.getElementById("body").onscroll = scrollBg;

document.getElementById("body").onload = scrollBg;
