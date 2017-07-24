function main() {
    $('.page-banner').hide();
    $('.page-banner').fadeIn(1000);

    //$('.navbar').background-color = rgba(0, 0, 0, ($(window).scrollTop / 100));
    //$('.navbar').li.style.margin = ($(window).scrollTop / 100));
    //$('.navbar').css('background-color', ('rgba(0, 0, 0, ' + $(window).scrollTop() + ')');


    //while ($(window).scrollTop() < 1000) {
    //}
    //$('.navbar').css('margin', (($(window).scrollTop() / 10) + 'px'));
    //$('.navbar').css('margin', $(window).scrollTop() + 'px');

    $(window).on("scroll", function() {
        $('.navbar').css('background-color', ('rgba(0, 0, 0, ' + Math.min(($(window).scrollTop() / 1000), 0.7) + ')'));
    });

    $(window).on("resize", function() {
        // Set height of both boxes in "What I Do" layout to be of equal height
        var maxHeight = Math.max($('.h-layout-music').height(), $('.h-layout-code').height());
        console.log(maxHeight);
        //$('.h-layout-music').height(maxHeight);
        //$('.h-layout-code').height($('.h-layout-music').height());
        // Set offset (top) to same for both sides of window
    });
    
    $('.slideshow1 img:gt(0)').hide();
    $('.slideshow2 img:gt(0)').hide();

    setInterval(function() {
        $('.slideshow1 :first-child').fadeOut()
            .next('img').fadeIn()
            .end().appendTo('.slideshow1');
    }, 3000);
    
    setInterval(function() {
        $('.slideshow2 :first-child').fadeOut()
            .next('img').fadeIn()
            .end().appendTo('.slideshow2');
    }, 3000);

}


$(document).ready(main);
