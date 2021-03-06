$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 10) { $(".navbar").addClass("ban-fix"); }else { $(".navbar").removeClass("ban-fix"); }
});