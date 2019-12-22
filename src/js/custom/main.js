$(".search-trigger").click(function(){
    $(".search-container").addClass("active");
    $("header").addClass("search-mod");
})

$(".search-cancel").click(function(){
    $(".search-container").removeClass("active");
    $("header").removeClass("search-mod");
})

$(function($){
    $(document).mouseup(function (e){
        var block = $(".search-container");
        if (!block.is(e.target) 
            && block.has(e.target).length === 0) { 
                $(".search-container").removeClass("active");
                $("header").removeClass("search-mod");
        }
    });
});

$(".news-search").click(function(){
    $(".news-search").addClass("hide");
    $(".news-search-container").addClass("active");
    $("body").addClass("modal-open");
})

$(".news-cancel-btn").click(function(){
    $(".news-search").removeClass("hide");
    $(".news-search-container").removeClass("active");
    $("body").removeClass("modal-open");
})

$(function($){
    $(document).mouseup(function (e){
        var block = $(".news-search-container");
        if (!block.is(e.target) 
            && block.has(e.target).length === 0) { 
                $(".news-search").removeClass("hide");
                $(".news-search-container").removeClass("active");
                $("body").removeClass("modal-open");
        }
    });
});




$(".burger").click(function(){
    $(".mobile-navigation").addClass("active");
    $("body").addClass("nav-open");
})

$(".nav-close").click(function(){
    $(".mobile-navigation").removeClass("active");
    $("body").removeClass("nav-open");
})