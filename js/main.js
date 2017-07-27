function resizeElements() {
    // Portrait
    $('.me-portrait-container').css('top', 41.1 - ($('.me-portrait-container img').width()/28) + 'rem');
    // Text section
    $('.text-section .text-below-portrait').css('padding-top', (-4 + $('.me-portrait-container img').width()/28) + 'rem');
    $('.embed-vid-1').css('height', (0 + $('.h-layout-inner-2a p').height()/14) + 'rem');
    $('.embed-vid-2').css('height', (-4 + $('.h-layout-inner-2b p').height()/14) + 'rem');
    //$('.embed-vid').css('height', (0 + $('.embed-vid').prev().height()/14) + 'rem');
}


function main() {
    $('.page-banner').hide();
    $('.navbar').hide();
    $('.text-section').css('visibility', 'hidden');

    resizeElements();

    $('.page-banner').fadeIn(1000);
    setTimeout(function () {
        $('.navbar').fadeIn(1000);
        $('.text-section').hide();
        $('.text-section').css('visibility', 'visible');
        $('.text-section').fadeIn(1000);
    }, 500);

    $(window).on("scroll", function() {
        $('.navbar').css('background-color', ('rgba(0, 0, 0, ' + Math.min((($(window).scrollTop() - 75) / 500), 0.7) + ')'));
    });

    $(window).on("resize", resizeElements);
    // Slideshows for main page
    // Hide images
    $('.slideshow1 img:gt(0)').hide();
    $('.slideshow2 img:gt(0)').hide();

    // Slideshow 1
    setInterval(function() {
        $('.slideshow1 :first-child').fadeOut()
            .next('img').fadeIn()
            .end().appendTo('.slideshow1');
    }, 3000);
    
    // Slideshow 2
    setInterval(function() {
        $('.slideshow2 :first-child').fadeOut()
            .next('img').fadeIn()
            .end().appendTo('.slideshow2');
    }, 3000);
}


$(document).ready(main);
