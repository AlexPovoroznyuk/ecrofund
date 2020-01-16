var EmptyError = "can't be empty";
		var EmailError = "invalid email";
		var TgError = "Please type your telegram nickname with @ or your phone number";
		var UrlError = "incorrect format";
		var CapchaError = "protection from automatic filling";

$(".search-trigger").click(function(){
    $(".search-container").addClass("active");
    $("header").addClass("search-mod");
})

$(".search-cancel").click(function(){
    $(".search-container").removeClass("active");
    $("header").removeClass("search-mod");
})

$('.faq-item').click(function(){
    if($(this).hasClass("faq-item-open")){
        $(this).removeClass("faq-item-open");
    }else{
        $(this).addClass("faq-item-open");
    }
});


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

$(".toogler button").click(function(){
    $(".toogler button").removeClass("active")
    $(this).addClass("active");
})


var tgValidation = function(val){
	console.log(parseInt(val))
	if(!isNaN(parseInt(val))){
		return /^(\s*)?(\+)?([-()]?\d[-()]?){10,14}(\s*)?$/.test(val)
	}
	else{
		return /@([a-zA-Z0-9]{4,})/.test(val)
	}
}

var urlValidation = function(val){
	return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(val);
}

$(".reqiered-field").keyup(function(e){
	if($(this).val() ==""){
		$(this).closest(".input-item").addClass("validation-error");
		$(this).closest(".input-item").find(".error span").html(EmptyError);
		sendForm=false;
	}
	else if($(this).attr("name") == "email"){
		if($(this).val() ==""){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html(EmptyError);
			sendForm=false;
		}
		else if(!(/^[A-Za-z0-9][A-Za-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test($(this).val()))){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html(EmailError);
			sendForm=false;
		}
		else{
			$(this).closest(".input-item").removeClass("validation-error");
		}
	}
	else if($(this).attr("data-name") == "tg"){
		
		if(!tgValidation($(this).val())){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html(TgError);
			sendForm=false;
		}
		else{
			$(this).closest(".input-item").removeClass("validation-error");
		}
	}
	else if($(this).attr("data-name") == "link"){
		
		if(!urlValidation($(this).val())){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html(UrlError);
			sendForm=false;
		}
		else{
			$(this).closest(".input-item").removeClass("validation-error");
		}
	}
	else{
		$(this).closest(".input-item").removeClass("validation-error");
	}
});


$(".reqiered-field").focusout(function(e){

	if(!($(this).hasClass("drop-input"))){
		if($(this).val() ==""){
		// $(this).closest(".input-item").removeClass("active");
		$(this).closest(".input-item").addClass("validation-error");
		$(this).closest(".input-item").find(".error span").html(EmptyError);
		sendForm=false;
	}
	else if($(this).attr("name") == "email"){
		if($(this).val() ==""){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html(EmptyError);
			sendForm=false;
		}
		else if(!(/^[A-Za-z0-9][A-Za-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test($(this).val()))){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html(EmailError);
			sendForm=false;
		}
		else{
			$(this).closest(".input-item").removeClass("validation-error");
		}
	}
	else if($(this).attr("data-name") == "tg"){
		
		if(!tgValidation($(this).val())){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html(TgError);
			sendForm=false;
		}
		else{
			$(this).closest(".input-item").removeClass("validation-error");
		}
	}
	else if($(this).attr("data-name") == "link"){
		
		if(!urlValidation($(this).val())){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html(UrlError);
			sendForm=false;
		}
		else{
			$(this).closest(".input-item").removeClass("validation-error");
		}
	}
	else{
		$(this).closest(".input-item").removeClass("validation-error");
	}
} 

});
var sendForm;
$("form").on("submit", function(e){
	e.preventDefault();
	var thisForm = $(this);
	sendForm=true;
	if($(".g-recaptcha").length){
		if($("#g-recaptcha-response").val() == ""){
		sendForm=false;
		$(".capcha-container .error span").html(CapchaError);
		$(".capcha-container").addClass("validation-error");
	}
	else{
		$(".capcha-container .error span").html("");
		$(".capcha-container").removeClass("validation-error");
	}
	}
	$(this).find(".reqiered-field").each(function(){

		if($(this).val() ==""){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html(EmptyError);
			sendForm=false;
		}
		else if($(this).attr("name") == "email"){
			if($(this).val() ==""){
				$(this).closest(".input-item").addClass("validation-error");
				$(this).closest(".input-item").find(".error span").html(EmptyError);
				sendForm=false;
			}
			else if(!(/^[A-Za-z0-9][A-Za-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test($(this).val()))){
				$(this).closest(".input-item").addClass("validation-error");
				$(this).closest(".input-item").find(".error span").html(EmailError);
				sendForm=false;
			}
			else{
				$(this).closest(".input-item").removeClass("validation-error");
			}
		}
		else if($(this).attr("data-name") == "tg"){

			if(!tgValidation($(this).val())){
				$(this).closest(".input-item").addClass("validation-error");
				$(this).closest(".input-item").find(".error span").html(TgError);
				sendForm=false;
			}
			else{
				$(this).closest(".input-item").removeClass("validation-error");
			}
		}
		else if($(this).attr("data-name") == "link"){
			
			if(!urlValidation($(this).val())){
				$(this).closest(".input-item").addClass("validation-error");
				$(this).closest(".input-item").find(".error span").html(UrlError);
				sendForm=false;
			}
			else{
				$(this).closest(".input-item").removeClass("validation-error");
			}
		}
		else{
			$(this).closest(".input-item").removeClass("validation-error");
		}
	});
	if(sendForm){
		$(".list-form button[type ='submit']").attr('disabled', true);
		var that = $(this);
		var formData = new FormData(that.get(0));
		$.ajax({
			url: $(this).attr('action'),
			type:'POST',
			contentType: false,
			processData: false,
			data: formData,
			
			success : function( data ) {
				$(".list-form button[type ='submit']").attr('disabled', false);
				if(that.hasClass("nomodal")){
					$("body").removeClass("modal-open");
					$(".list-form .success-mess").addClass("active");
				}
				else{
					$(".thk-modal").addClass("active");
					$("body").addClass("modal-open");	
				}
				
				that.find(".form-input").each(function(){
					if(!($(this).hasClass("noclear"))){
						$(this).val("");
						$(".wrap-input__label").removeClass("active")
						$(".select-txt").html("")
						$(".file-name").html("")
					}
				});
			},
			error   : function( xhr, err , data ) {
				$(".list-form button[type ='submit']").attr('disabled', false);
				if(that.hasClass("nomodal")){
					$("body").removeClass("modal-open");
					$(".list-form .success-mess").addClass("active");

				}
				else{
					$(".err-modal").addClass("active");
					$("body").addClass("modal-open");

				}
			}
		});
	}
});


$(".slide").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: flex;"></button>',
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: flex;"></button>'
})