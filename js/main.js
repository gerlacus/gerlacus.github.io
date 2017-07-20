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

}


$(document).ready(main);
