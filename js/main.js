function main() {
    $('.page-banner').hide();
    $('.navbar').hide();
    $('.text-section').css('visibility', 'hidden');

    $('.page-banner').fadeIn(1000);
    setTimeout(function () {
        $('.navbar').fadeIn(1000);
        $('.text-section').hide();
        $('.text-section').css('visibility', 'visible');
        $('.text-section').fadeIn(1000);
    }, 1000);

    $(window).on("scroll", function() {
        $('.navbar').css('background-color', ('rgba(0, 0, 0, ' + Math.min((($(window).scrollTop() - 75) / 500), 0.7) + ')'));
    });

    $(window).on("resize", function() {
        // Set height of both boxes in "What I Do" layout to be of equal height
        var maxHeight = Math.max($('.h-layout-music').height(), $('.h-layout-code').height());
        console.log(maxHeight);
        //$('.h-layout-music').height(maxHeight);
        //$('.h-layout-code').height($('.h-layout-music').height());
        // Set offset (top) to same for both sides of window
    });
    
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
