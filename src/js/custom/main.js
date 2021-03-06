"use strict";

var EmptyError = "can't be empty";
var EmailError = "invalid email";
var TgError = "Please type your telegram nickname with @ or your phone number";
var UrlError = "incorrect format";
var CapchaError = "protection from automatic filling";
var loginExist = "Username exists";
var shortPassword = "At least 6 characters";
var checkPassword = [/(?=.*[A-Z])/g, /(?=.*[0-9])/g, /[0-9a-zA-Z!@#$%^&*]{6,}/, /(?=.*[!@#$%^&*])/g, /[0-9a-zA-Z!@#$%^&*]{10,}/];
var passwordMessages = ["At least 6 characters", "Weak", "Weak", "Good", "Strong", "Strong"];

$(".search-trigger").click(function () {
	$(".search-container").addClass("active");
	$("header").addClass("search-mod");
});

$(".search-cancel").click(function () {
	$(".search-container").removeClass("active");
	$("header").removeClass("search-mod");
});

$('.faq-item').click(function () {
	if ($(this).hasClass("faq-item-open")) {
		$(this).removeClass("faq-item-open");
	} else {
		$(this).addClass("faq-item-open");
	}
});

$(function ($) {
	$(document).mouseup(function (e) {
		var block = $(".search-container");
		if (!block.is(e.target) && block.has(e.target).length === 0) {
			$(".search-container").removeClass("active");
			$("header").removeClass("search-mod");
		}
	});
});

$(".news-search").click(function () {
	$(".news-search").addClass("hide");
	$(".news-search-container").addClass("active");
	$("body").addClass("modal-open");
});

$(".news-cancel-btn").click(function () {
	$(".news-search").removeClass("hide");
	$(".news-search-container").removeClass("active");
	$("body").removeClass("modal-open");
});

$(function ($) {
	$(document).mouseup(function (e) {
		var block = $(".news-search-container");
		if (!block.is(e.target) && block.has(e.target).length === 0) {
			$(".news-search").removeClass("hide");
			$(".news-search-container").removeClass("active");
			$("body").removeClass("modal-open");
		}
	});
});

$(".burger").click(function () {
	if(!$(this).hasClass("opened")){
$(this).addClass("opened")
	$(".mobile-navigation").addClass("active");
	$("body").addClass("nav-open");
	}
	else{
		$(this).removeClass("opened")
		$(".mobile-navigation").removeClass("active");
	$("body").removeClass("nav-open");
	}
})

$(".toogler button").click(function () {
	$(".toogler button").removeClass("active");
	$(this).addClass("active");
});

var tgValidation = function tgValidation(val) {
	console.log(parseInt(val));
	if (!isNaN(parseInt(val))) {
		return (/^(\s*)?(\+)?([-()]?\d[-()]?){10,14}(\s*)?$/.test(val)
		);
	} else {
		return (/@([a-zA-Z0-9]{4,})/.test(val)
		);
	}
};

var urlValidation = function urlValidation(val) {
	return (/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(val)
	);
};

$(".sing .reqiered-field").keyup(function () {
	if ($(this).val().length > 0 || !$(this).closest(".input-item").hasClass('no-empty')) {
		$(this).closest(".input-item").addClass('no-empty');
		$(this).closest(".input-item").removeClass('validation-error');
	} else {
		$(this).closest(".input-item").removeClass('no-empty');
	}
});

$(".sing .reqiered-field").focusout(function () {
	if ($(this).val().length > 0) {
		$(this).closest(".input-item").addClass('no-empty');
	} else {
		$(this).closest(".input-item").removeClass('no-empty');
	}
});

var sendForm;
$(".js-ajax-form").on("submit", function (e) {
	e.preventDefault();
	var thisForm = $(this);
	sendForm = true;
	$(this).find(".reqiered-field").each(function () {
		if ($(this).val() == "") {
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html(EmptyError);
			if ($(this).attr("data-name") == "password") {

				$(".password-error span").html(EmptyError);
				$(".about-pass").addClass("password-validation-error");
			}
			sendForm = false;
		} else if ($(this).attr("name") == "email") {
			if ($(this).val() == "") {
				$(this).closest(".input-item").addClass("validation-error");
				$(this).closest(".input-item").find(".error span").html(EmptyError);
				sendForm = false;
			} else if (!/^[A-Za-z0-9][A-Za-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test($(this).val())) {
				$(this).closest(".input-item").addClass("validation-error");
				$(this).closest(".input-item").find(".error span").html(EmailError);
				sendForm = false;
			} else {
				$(this).closest(".input-item").removeClass("validation-error");
			}
		} else if ($(this).attr("data-name") == "password") {

			if ($(this).val().length < 6) {
				$(this).closest(".input-item").addClass("validation-error");
				$(".about-pass").addClass("password-validation-error");
				$(".password-error span").html(shortPassword);
				sendForm = false;
			} else if ($(this).val().search(' ') != -1) {

				$(".about-pass").addClass("password-validation-error");
				$(".password-error span").html("Cannot contain whitespace");
				sendForm = false;
			} else if ($(this).val() > 0 && $(this).val() < 6) {
				$(".about-pass").addClass("password-validation-error");
				$(".password-error span").html(shortPassword);
				sendForm = false;
			} else {
				$(this).closest(".input-item").removeClass("validation-error");
				$(".about-pass").removeClass("password-validation-error");
				$(".password-error span").html("");
			}
		} else {
			$(this).closest(".input-item").removeClass("validation-error");
			$(".about-pass").removeClass("password-validation-error");
			$(".password-error span").html("");
		}
	});
	if (sendForm) {
		$(":submit", thisForm).attr('disabled', true);
		var that = $(this);
		thisForm.request(thisForm.data('action'), {
			success: function success(data) {
				$(":submit", thisForm).attr('disabled', false);
				thisForm.removeClass('invalid');
				if (that.hasClass("nomodal")) {
					$("body").removeClass("modal-open");
					$(".list-form .success-mess").addClass("active");
				} else {
					$(".thk-modal").addClass("active");
					$("body").addClass("modal-open");
				}
				that.find(".form-input").each(function () {
					if (!$(this).hasClass("noclear")) {
						$(this).val("");
						$(".wrap-input__label").removeClass("active");
						$(".select-txt").html("");
						$(".file-name").html("");
					}
				});
				this.success(data);
			},
			error: function error(xhr, err, data) {
				$(":submit", thisForm).attr('disabled', false);
				thisForm.addClass('invalid');
				if (that.hasClass("nomodal")) {
					$("body").removeClass("modal-open");
					$(".list-form .success-mess").addClass("active");
				} else {
					$(".err-modal").addClass("active");
					$("body").addClass("modal-open");
				}
			}
		});
	}
});


$('[data-name="login"]').on('focusout', function () {
	var loginData = new FormData();
	loginData.append("login", "" + $(this).val());
	if ($(this).val().length) {
		$.ajax({
			url: $(this).closest("form").attr('data-action'),
			type: 'POST',
			contentType: false,
			processData: false,
			data: loginData,

			success: function success(data) {
				$('[data-name="login"]').removeClass('exist-login');
				$('[data-name="login"]').closest(".input-item").find(".error span").html('');
			},
			error: function error(xhr, err, data) {
				$('[data-name="login"]').addClass('exist-login');
				$('[data-name="login"]').closest(".input-item").find(".error span").html(loginExist);
			}
		});
	} else {
		$(this).removeClass('exist-login');
		$('[data-name="login"]').closest(".input-item").find(".error span").html("");
	}
});



$(".slide").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: flex;"></button>',
	nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: flex;"></button>'
});

$(".slider-welcome").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><g id="Group_186" data-name="Group 186" transform="translate(-130 -201)"><g id="Ellipse_7" data-name="Ellipse 7" transform="translate(130 201)" fill="none" stroke="#cfd9e0" stroke-width="1"><circle cx="21" cy="21" r="21" stroke="none"/><circle cx="21" cy="21" r="20.5" fill="none"/></g><g id="Group_17" data-name="Group 17" transform="translate(-2 9)"><rect id="Rectangle_16" data-name="Rectangle 16" width="2" height="12" rx="1" transform="translate(155 204.515) rotate(45)" fill="#9ba6b2"/><rect id="Rectangle_17" data-name="Rectangle 17" width="2" height="12" rx="1" transform="translate(146.515 213) rotate(-45)" fill="#9ba6b2"/></g></g></svg></button>',
	nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><g id="Group_187" data-name="Group 187" transform="translate(172 243) rotate(180)"><g id="Ellipse_7" data-name="Ellipse 7" transform="translate(130 201)" fill="none" stroke="#cfd9e0" stroke-width="1"><circle cx="21" cy="21" r="21" stroke="none"/><circle cx="21" cy="21" r="20.5" fill="none"/></g><g id="Group_17" data-name="Group 17" transform="translate(-2 9)"><rect id="Rectangle_16" data-name="Rectangle 16" width="2" height="12" rx="1" transform="translate(155 204.515) rotate(45)" fill="#9ba6b2"/><rect id="Rectangle_17" data-name="Rectangle 17" width="2" height="12" rx="1" transform="translate(146.515 213) rotate(-45)" fill="#9ba6b2"/></g></g></svg></button>',
	dots: true,
appendArrows: $(".arrow-conteiner")
});

$(".slider-wrap").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><g id="Group_186" data-name="Group 186" transform="translate(-130 -201)"><g id="Ellipse_7" data-name="Ellipse 7" transform="translate(130 201)" fill="rgba(255,255,255,0.3)" stroke="#cfd9e0" stroke-width="1"><circle cx="21" cy="21" r="21" stroke="none"/><circle cx="21" cy="21" r="20.5" fill="none"/></g><g id="Group_17" data-name="Group 17" transform="translate(-2 9)"><rect id="Rectangle_16" data-name="Rectangle 16" width="2" height="12" rx="1" transform="translate(155 204.515) rotate(45)" fill="#9ba6b2"/><rect id="Rectangle_17" data-name="Rectangle 17" width="2" height="12" rx="1" transform="translate(146.515 213) rotate(-45)" fill="#9ba6b2"/></g></g></svg></button>',
	nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><g id="Group_187" data-name="Group 187" transform="translate(172 243) rotate(180)"><g id="Ellipse_7" data-name="Ellipse 7" transform="translate(130 201)" fill="rgba(255,255,255,0.3)" stroke="#cfd9e0" stroke-width="1"><circle cx="21" cy="21" r="21" stroke="none"/><circle cx="21" cy="21" r="20.5" fill="none"/></g><g id="Group_17" data-name="Group 17" transform="translate(-2 9)"><rect id="Rectangle_16" data-name="Rectangle 16" width="2" height="12" rx="1" transform="translate(155 204.515) rotate(45)" fill="#9ba6b2"/><rect id="Rectangle_17" data-name="Rectangle 17" width="2" height="12" rx="1" transform="translate(146.515 213) rotate(-45)" fill="#9ba6b2"/></g></g></svg></button>',
	dots: true
});

$(".blockquote-slider").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><g id="Group_186" data-name="Group 186" transform="translate(-130 -201)"><g id="Ellipse_7" data-name="Ellipse 7" transform="translate(130 201)" fill="rgba(255,255,255,0.3)" stroke="#cfd9e0" stroke-width="1"><circle cx="21" cy="21" r="21" stroke="none"/><circle cx="21" cy="21" r="20.5" fill="none"/></g><g id="Group_17" data-name="Group 17" transform="translate(-2 9)"><rect id="Rectangle_16" data-name="Rectangle 16" width="2" height="12" rx="1" transform="translate(155 204.515) rotate(45)" fill="#9ba6b2"/><rect id="Rectangle_17" data-name="Rectangle 17" width="2" height="12" rx="1" transform="translate(146.515 213) rotate(-45)" fill="#9ba6b2"/></g></g></svg></button>',
	nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><g id="Group_187" data-name="Group 187" transform="translate(172 243) rotate(180)"><g id="Ellipse_7" data-name="Ellipse 7" transform="translate(130 201)" fill="rgba(255,255,255,0.3)" stroke="#cfd9e0" stroke-width="1"><circle cx="21" cy="21" r="21" stroke="none"/><circle cx="21" cy="21" r="20.5" fill="none"/></g><g id="Group_17" data-name="Group 17" transform="translate(-2 9)"><rect id="Rectangle_16" data-name="Rectangle 16" width="2" height="12" rx="1" transform="translate(155 204.515) rotate(45)" fill="#9ba6b2"/><rect id="Rectangle_17" data-name="Rectangle 17" width="2" height="12" rx="1" transform="translate(146.515 213) rotate(-45)" fill="#9ba6b2"/></g></g></svg></button>',
	dots: true
});
$(".event-list").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><g id="Group_186" data-name="Group 186" transform="translate(-130 -201)"><g id="Ellipse_7" data-name="Ellipse 7" transform="translate(130 201)" fill="rgba(255,255,255,0.3)" stroke="#cfd9e0" stroke-width="1"><circle cx="21" cy="21" r="21" stroke="none"/><circle cx="21" cy="21" r="20.5" fill="none"/></g><g id="Group_17" data-name="Group 17" transform="translate(-2 9)"><rect id="Rectangle_16" data-name="Rectangle 16" width="2" height="12" rx="1" transform="translate(155 204.515) rotate(45)" fill="#9ba6b2"/><rect id="Rectangle_17" data-name="Rectangle 17" width="2" height="12" rx="1" transform="translate(146.515 213) rotate(-45)" fill="#9ba6b2"/></g></g></svg></button>',
	nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><g id="Group_187" data-name="Group 187" transform="translate(172 243) rotate(180)"><g id="Ellipse_7" data-name="Ellipse 7" transform="translate(130 201)" fill="rgba(255,255,255,0.3)" stroke="#cfd9e0" stroke-width="1"><circle cx="21" cy="21" r="21" stroke="none"/><circle cx="21" cy="21" r="20.5" fill="none"/></g><g id="Group_17" data-name="Group 17" transform="translate(-2 9)"><rect id="Rectangle_16" data-name="Rectangle 16" width="2" height="12" rx="1" transform="translate(155 204.515) rotate(45)" fill="#9ba6b2"/><rect id="Rectangle_17" data-name="Rectangle 17" width="2" height="12" rx="1" transform="translate(146.515 213) rotate(-45)" fill="#9ba6b2"/></g></g></svg></button>',
	dots: true
});
$('.event-list').on('afterChange', function (event, slick, currentSlide, nextSlide) {
	var eventBg = $('.event-list .slick-active').attr("data-src");
	console.log(eventBg);
	$(".home-events .img-wrap").addClass("out-animation");
	setTimeout(function () {
		$(".home-events .img-wrap").attr("style", "background-image:url(" + eventBg + ");");
		setTimeout(function () {
			$(".home-events .img-wrap").removeClass("out-animation");
		}, 50);
	}, 200);
});

$(".content-item").mouseenter(function () {
	$(".content-item").removeClass("hover");
	$(this).addClass("hover");
	var parrentPos = $(".content-item-wr").offset().top;
	var currentBullit = $(this).find(".bullit").offset().top - parrentPos;
	var bullitBg = $(this).attr("data-src");

	if (bullitBg !== $(".home-investment .bg").attr("data-current")) {
		$(".visible-bullit").css("top", currentBullit + "px");
		$(".home-investment .bg").addClass("out-animation");
		setTimeout(function () {
			$(".home-investment .bg").attr("style", "background-image:url(" + bullitBg + ");");
			$(".home-investment .bg").attr("data-current", bullitBg);
			setTimeout(function () {
				$(".home-investment .bg").removeClass("out-animation");
			}, 50);
		}, 200);
	}
});

$(".timeline").slick({
	slidesToShow: 3,
	arrows: false,
infinite: false,
initialSlide: parseInt($(".timeline-start").attr('data-slide-num')),
	responsive: [{
		breakpoint: 780,
		settings: {
			slidesToShow: 2
		}
	}, {
		breakpoint: 480,
		settings: {
			slidesToShow: 1
		}
	}]
});

$(".input-wrap .close").click(function () {
	if ($(this).closest(".input-wrap").find("input").val().length) {
		$(this).closest(".input-wrap").find("input").focus();
		$(this).closest(".input-wrap").find("input").val('');
	}
});

$("[data-name='password']").keyup(function () {
	var counter = 0;
	$(".password-validation").attr("class", 'password-validation');
	if ($(this).val().search(' ') != -1) {
		$(".password-validation").addClass("short");
		$(".password-validation span").html("Cannot contain whitespace");
		sendForm = false;
	} else {
		for (var i = 0; i < checkPassword.length; i++) {
			if (checkPassword[i].test($(this).val())) {
				counter += 1;
			} else {
				continue;
			}
		}
		if ($(this).val().length && counter == 0) {
			$(".password-validation").addClass("short");
			$(".password-validation span").html(passwordMessages[counter]);
			sendForm = false;
		} else if (!$(this).val().length) {
			$(".password-validation").attr("class", 'password-validation');
			$(".password-validation span").html('');
			sendForm = false;
		} else {
			$(".password-validation").addClass(passwordMessages[counter].toLowerCase());
			$(".password-validation span").html(passwordMessages[counter]);
		}
	}
});

$(".show-pass").click(function () {
	var passwordInput = $(this).closest(".input-item").find("input");
	if (passwordInput.attr("type") == "text") {
		passwordInput.attr("type", "password");
		$(this).removeClass("show");
	} else {
		passwordInput.attr("type", "text");
		$(this).addClass("show");
	}
});

$(".bg").click(function () {
	var video = $("#video");
	var src = video.attr('src');
	$(".video-inner").addClass("played");
	video.attr('src', src + "?rel=0&showinfo=0&autoplay=1");
});

$(document).ready(function() {
	$(".scroll-trigger").click(function() {
	  jQuery("html:not(:animated),body:not(:animated)").animate({
		scrollTop: 0
	  }, 800);
	  return false;
	});
  });

function fadeIn(){
	if($(".fade-block").length){
		var currentPosition = $(window).scrollTop() + $(window).innerHeight();
	$(".fade-block").each(function(){
	if($(this).offset().top < currentPosition - 200){
			$(this).addClass("active")
		}
	})
	}
	
}


$(document).scroll(function(){
	fadeIn();
})
$(document).ready(function(){
	fadeIn();
})

$(".modal .close-trigger").click(function(){
	$(".thk-modal").removeClass("active");
	$(".err-modal").removeClass("active");
	$("body").removeClass("modal-open");
	$(".overlay").removeClass("hide")
})


$('.subscribe form').on('submit', function (e) {
	e.preventDefault()
	
	if (!/^[A-Za-z0-9][A-Za-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test($(this).find("input").val())) {
		$(this).find("input").closest(".input-item").addClass("validation-error");
	}
	else{
		$(this).find("input").closest(".input-item").removeClass("validation-error");
		var emailData = new FormData();
		emailData.append("email", "" + $(this).find("input").val());
		$.ajax({
			url: $(this).attr('action'),
			type: 'POST',
			contentType: false,
			processData: false,
			data: emailData,

			success: function success(data) {
				$(".overlay").addClass("hide")
				$(".thk-modal").addClass("active");
					$("body").addClass("modal-open");
			},
			error: function error(xhr, err, data) {
				$(".err-modal").addClass("active");
					$("body").addClass("modal-open");
					$(".overlay").addClass("hide")
			}
		});
	}

	
	
	
});

