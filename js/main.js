 
function main() {
    $('.page-banner').hide();
    $('.navbar').hide();
    $('.text-section').css('visibility', 'hidden');

    resizeElements(false);

    $('.page-banner').fadeIn(1000);
    setTimeout(function () {
        $('.navbar').fadeIn(1000);
        $('.text-section').hide();
        $('.text-section').css('visibility', 'visible');
        $('.text-section').fadeIn(1000);
    }, 500);

var lastScTop = 0;
    $(window).on("scroll", function(event) {
        // Set menu transparency based on how close to top (closer to top = more faded)
        $('.navbar').css('background-color', ('rgba(0, 0, 0, ' + Math.min((($(window).scrollTop() - 75) / 500), 0.7) + ')'));
        // Set menu transparency according to whether scrolled up or down (up = "awake" and opaque, down = faded)
        /*
        // Scroll up -> opaque
        var scTop = $(this).scrollTop();
        console.log('scTop: ', scTop);
        console.log('lastScTop: ', lastScTop);
        if (scTop > lastScTop) {
            // Scroll down
            $('.navbar li a').css('color', 'rgba(255, 255, 255, 0.4)');
        } else {
            // Scroll up
            $('.navbar li a').css('color', 'rgba(255, 255, 255, 0.8)');
        }
        lastScTop = scTop;
        */
    });

    $(window).on("resize", resizeElements);
    // Slideshows for main page
    // Hide images
    $('.slideshow1 img:gt(0)').hide();
    $('.slideshow2 img:gt(0)').hide();
    $('.slideshow-code-1 img:gt(0)').hide();

    // Slideshow 1
    setInterval(function() {
            $('.slideshow1 :first-child').fadeOut(1000)
                .next('img').fadeIn(1000)
                .end().appendTo('.slideshow1');
    }, 3000);
    
    // Slideshow 2
    // TEST: offset?
    setTimeout( function() {
    setInterval(function() {
            $('.slideshow2 :first-child').fadeOut(1000)
                .next('img').fadeIn(1000)
                .end().appendTo('.slideshow2');
        }, 3000);
    }, 1500);

    // Code slideshow
    /*
    setInterval(function() {
            $('.slideshow-code-1 :first-child')
                .fadeOut()
                .next('img').css('position', 'absolute')
                .fadeIn()
                .end()
                .appendTo('.slideshow-code-1');
    }, 3000);
    */

    setInterval(function() {
            // Fade current image out
            $('.slideshow-code-1 :first-child').css('width', ($('.slideshow-code-1').width() + 'px'));
            $('.slideshow-code-1 :first-child').css('height', ($('.slideshow-code-1').height() + 'px'));
            $('.slideshow-code-1 :first-child').fadeOut(1000);

            // Fade next image in
            var nextImg = $('.slideshow-code-1 :first-child').next('img');
            nextImg.css('width', ($('.slideshow-code-1').width() + 'px'));
            nextImg.css('height', ($('.slideshow-code-1').height() + 'px'));
            nextImg.fadeIn(1000);
            nextImg.end().appendTo('.slideshow-code-1');
    }, 3000);

}


function resizeElements(repeated) {
    var remSize = $('html').css('font-size').replace('px', '');
    // Portrait
    $('.me-portrait-container').css('top', 40 - ($('.me-portrait').width()/(remSize*2)) + 'rem');
    // Text section
    $('.text-section .text-below-portrait').css('padding-top', (-3 + $('.me-portrait-container img').width()/(remSize*2)) + 'rem');

    // Video resizing
    var video1 = document.querySelector('.embed-vid-1');
    $('.embed-vid-1').css('height',((($('.h-layout-inner-2a p').height())/remSize) + 2) + 'rem');
    $('.embed-vid-2').css('height',((($('.h-layout-inner-2b p').height())/remSize) + 2) + 'rem');

    // Re-hide slideshow images
    $('.slideshow1 img:gt(0)').hide();
    $('.slideshow2 img:gt(0)').hide();


    $('.slideshow-code-1 :first-child').css('width', ($('.slideshow-code-1').width() + 'px'));
    $('.slideshow-code-1 :first-child').css('height', ($('.slideshow-code-1').height() + 'px'));
    var nextImg = $('.slideshow-code-1 :first-child').next('img');
    nextImg.css('width', ($('.slideshow-code-1').width() + 'px'));
    nextImg.css('height', ($('.slideshow-code-1').height() + 'px'));


    if (repeated) {
        setTimeout(resizeElements, 400);
    } else {
        return;
    }
}


$(document).ready(main);
