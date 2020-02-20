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
})

$(".search-cancel").click(function () {
	$(".search-container").removeClass("active");
	$("header").removeClass("search-mod");
})

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
		if (!block.is(e.target) &&
			block.has(e.target).length === 0) {
			$(".search-container").removeClass("active");
			$("header").removeClass("search-mod");
		}
	});
});

$(".news-search").click(function () {
	$(".news-search").addClass("hide");
	$(".news-search-container").addClass("active");
	$("body").addClass("modal-open");
})

$(".news-cancel-btn").click(function () {
	$(".news-search").removeClass("hide");
	$(".news-search-container").removeClass("active");
	$("body").removeClass("modal-open");
})

$(function ($) {
	$(document).mouseup(function (e) {
		var block = $(".news-search-container");
		if (!block.is(e.target) &&
			block.has(e.target).length === 0) {
			$(".news-search").removeClass("hide");
			$(".news-search-container").removeClass("active");
			$("body").removeClass("modal-open");
		}
	});
});




$(".burger").click(function () {
	$(".mobile-navigation").addClass("active");
	$("body").addClass("nav-open");
})

$(".nav-close").click(function () {
	$(".mobile-navigation").removeClass("active");
	$("body").removeClass("nav-open");
})

$(".toogler button").click(function () {
	$(".toogler button").removeClass("active")
	$(this).addClass("active");
})


var tgValidation = function (val) {
	console.log(parseInt(val))
	if (!isNaN(parseInt(val))) {
		return /^(\s*)?(\+)?([-()]?\d[-()]?){10,14}(\s*)?$/.test(val)
	} else {
		return /@([a-zA-Z0-9]{4,})/.test(val)
	}
}

var urlValidation = function (val) {
	return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(val);
}




$(".sing .reqiered-field").keyup(function () {
	if ($(this).val().length > 0 || !$(this).closest(".input-item").hasClass('no-empty')) {
		$(this).closest(".input-item").addClass('no-empty')
		$(this).closest(".input-item").removeClass('validation-error')
	} else {
		$(this).closest(".input-item").removeClass('no-empty')
	}
})


$(".sing .reqiered-field").focusout(function () {
	if ($(this).val().length > 0) {
		$(this).closest(".input-item").addClass('no-empty')
	} else {
		$(this).closest(".input-item").removeClass('no-empty')
	}
})

var sendForm;
$("form").on("submit", function (e) {
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
			} else if (!(/^[A-Za-z0-9][A-Za-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test($(this).val()))) {
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
		$(".list-form button[type ='submit']").attr('disabled', true);
		var that = $(this);
		var formData = new FormData(that.get(0));
		$.ajax({
			url: $(this).attr('action'),
			type: 'POST',
			contentType: false,
			processData: false,
			data: formData,

			success: function (data) {
				$(".list-form button[type ='submit']").attr('disabled', false);
				$('form').removeClass('invalid');
				if (that.hasClass("nomodal")) {
					$("body").removeClass("modal-open");
					$(".list-form .success-mess").addClass("active");
				} else {
					$(".thk-modal").addClass("active");
					$("body").addClass("modal-open");
				}

				that.find(".form-input").each(function () {
					if (!($(this).hasClass("noclear"))) {
						$(this).val("");
						$(".wrap-input__label").removeClass("active")
						$(".select-txt").html("")
						$(".file-name").html("")
					}
				});
			},
			error: function (xhr, err, data) {
				$(".list-form button[type ='submit']").attr('disabled', false);
				$('form').addClass('invalid');
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
	loginData.append("login", `${$(this).val()}`);
	if ($(this).val().length) {
		$.ajax({
			url: $(this).closest("form").attr('data-action'),
			type: 'POST',
			contentType: false,
			processData: false,
			data: loginData,

			success: function (data) {
				$('[data-name="login"]').removeClass('exist-login');
				$('[data-name="login"]').closest(".input-item").find(".error span").html('');
			},
			error: function (xhr, err, data) {
				$('[data-name="login"]').addClass('exist-login');
				$('[data-name="login"]').closest(".input-item").find(".error span").html(loginExist);
			}
		});
	} else {
		$(this).removeClass('exist-login');
		$('[data-name="login"]').closest(".input-item").find(".error span").html("");
	}
})


$(".slide").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style="display: flex;"></button>',
	nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="display: flex;"></button>'
})

$(".input-wrap .close").click(function () {
	if ($(this).closest(".input-wrap").find("input").val().length) {
		$(this).closest(".input-wrap").find("input").focus()
		$(this).closest(".input-wrap").find("input").val('')
	}
})


$("[data-name='password']").keyup(function () {
	var counter = 0;
	$(".password-validation").attr("class", 'password-validation')
	if ($(this).val().search(' ') != -1) {
		$(".password-validation").addClass("short");
		$(".password-validation span").html("Cannot contain whitespace");
		sendForm = false;
	} else {
		for (let i = 0; i < checkPassword.length; i++) {
			if (checkPassword[i].test($(this).val())) {
				counter += 1;
			} else {
				continue;
			}
		}
console.log(!$(this).val().length)
		if ($(this).val().length && counter == 0) {
			$(".password-validation").addClass("short");
			$(".password-validation span").html(passwordMessages[counter])
			sendForm = false;
		} else if (!$(this).val().length) {
			$(".password-validation").attr("class", 'password-validation')
			$(".password-validation span").html('')
			sendForm = false;
		} else {
			$(".password-validation").addClass((passwordMessages[counter]).toLowerCase());
			$(".password-validation span").html(passwordMessages[counter])
		}
		
	}

})

$(".show-pass").click(function(){
	var passwordInput = $(this).closest(".input-item").find("input");
	if(passwordInput.attr("type") == "text"){
		passwordInput.attr("type", "password");
		$(this).removeClass("show")
	}
	else{
	passwordInput.attr("type", "text");	
	$(this).addClass("show")
	}
	
})