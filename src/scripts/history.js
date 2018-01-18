new Swiper('.swiper-container',{
    scrollContainer: true
});





$(function() {
    doSomethingUseful();
    $(window).resize(doSomethingUseful);
});
function doSomethingUseful() {
    if(document.body.clientWidth < 600)
    {
        $(init);
        function init() {
            $('.left-top-menu').prepend($('.exchanger-header-profile'));
        }
    }
    else
    {
        $(init);
        function init() {
            $('.exchanger-header-nav').before($('.exchanger-header-profile'));
        }
    }
}





$(".left-top-button").click(function(e) {
    $(".left-top-menu").toggleClass('left-top-menu-open');
    return false;
});
$('.left-top-menu').click(function(e) {
    e.stopPropagation();
});
$(document).click(function(e) {
    $('.left-top-menu').removeClass('left-top-menu-open');
});




$(".exchanger-header-profile span").click(function(e) {
    $(".header-profile-drop2").toggleClass('header-profile-drop2-open');
    return false;
});
$('.header-profile-drop2').click(function(e) {
    e.stopPropagation();
});
$(document).click(function(e) {
    $('.header-profile-drop2').removeClass('header-profile-drop2-open');
});