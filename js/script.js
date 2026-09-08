var THEMEMASCOT = {};
(function ($) {

	"use strict";

	/* ---------------------------------------------------------------------- */
	/* --------------------------- Start Demo Switcher  --------------------- */
	/* ---------------------------------------------------------------------- */
	  var showSwitcher = true;
	  var $body = $('body');
	  var $style_switcher = $('#style-switcher');
	  if( !$style_switcher.length && showSwitcher ) {
	      $.ajax({
	          url: "color-switcher/style-switcher.html",
	          success: function (data) { $body.append(data); },
	          dataType: 'html'
	      });
	  }
	/* ---------------------------------------------------------------------- */
	/* ----------------------------- En Demo Switcher  ---------------------- */
	/* ---------------------------------------------------------------------- */


	  THEMEMASCOT.isRTL = {
	    check: function() {
	      if( $( "html" ).attr("dir") === "rtl" ) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  };

	  THEMEMASCOT.isLTR = {
	    check: function() {
	      if( $( "html" ).attr("dir") !== "rtl" ) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  };


	//Hide Loading Box (Preloader)
	function loader() {
		$(window).on('load', function () {
			// Animate loader off screen
			$(".preloader").addClass('loaded');
			$(".preloader").delay(600).fadeOut();
		});
	}

	loader();

	// Call headerStyle on scroll
	$(window).on('scroll', function () {
		headerStyle();
	});

	// Also call on page load to handle reload
	$(document).ready(function () {
		headerStyle();
	});


	//Update Header Style and Scroll to Top
	function headerStyle() {
		if ($('.main-header').length) {
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.header-style-one');
			var scrollLink = $('.scroll-to-top');
			var sticky_header = $('.main-header .sticky-header');
			if (windowpos > 100) {
				sticky_header.addClass("fixed-header animated slideInDown");
				scrollLink.fadeIn(300);
			} else {
				sticky_header.removeClass("fixed-header animated slideInDown");
				scrollLink.fadeOut(300);
			}
			if (windowpos > 1) {
				siteHeader.addClass("fixed-header");
			} else {
				siteHeader.removeClass("fixed-header");
			}
		}
	}
	headerStyle();

	// Header hide on scroll down, show on scroll up (optional)

	if ($(window).width() > 991) {
		if ($(window).width() > 768) {
			$('.parallaxie').parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}


	//Submenu Dropdown Toggle
	if ($('.main-header li.dropdown ul').length) {
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><i class="fa fa-angle-down"></i></div>');
	}

	//Mobile Nav Hide Show
	if ($('.mobile-menu').length) {

		var mobileMenuContent = $('.main-header .main-menu .navigation').html();

		$('.mobile-menu .navigation').append(mobileMenuContent);
		$('.sticky-header .navigation').append(mobileMenuContent);
		$('.mobile-menu .close-btn').on('click', function () {
			$('body').removeClass('mobile-menu-visible');
		});

		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
			$(this).prev('ul').slideToggle(500);
			$(this).toggleClass('active');
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function () {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', function () {
			$('body').removeClass('mobile-menu-visible');
		});

	}


	//Progress Bar
	if ($('.progress-line').length) {
		$('.progress-line').appear(function () {
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width', percent + '%');
		}, { accY: 0 });
	}

	//Header Search
	if ($(".search-btn").length) {
		$(".search-btn").on("click", function () {
			$(".main-header").addClass("moblie-search-active");
		});
		$(".close-search, .search-back-drop").on("click", function () {
			$(".main-header").removeClass("moblie-search-active");
		});
	}

	//Fact Counter + Text Count
	if ($(".count-box").length) {
		$(".count-box").appear(
			function () {
				var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);

				if (!$t.hasClass("counted")) {
					$t.addClass("counted");
					$({
						countNum: $t.find(".count-text").text(),
					}).animate(
						{
							countNum: n,
						},
						{
							duration: r,
							easing: "linear",
							step: function () {
								$t.find(".count-text").text(Math.floor(this.countNum));
							},
							complete: function () {
								$t.find(".count-text").text(this.countNum);
							},
						}
					);
				}
			},
			{ accY: 0 }
		);
	}


	//Price Range Slider
	if ($(".price-range-slider").length) {
		$(".price-range-slider").slider({
			range: true,
			min: 10,
			max: 99,
			values: [10, 60],
			slide: function (event, ui) {
				$("input.property-amount").val(ui.values[0] + " - " + ui.values[1]);
			},
		});

		$("input.property-amount").val(
			$(".price-range-slider").slider("values", 0) +
			" - $" +
			$(".price-range-slider").slider("values", 1)
		);
	}

	//product bxslider
	if ($(".product-details .bxslider").length) {
		$(".product-details .bxslider").bxSlider({
			nextSelector: ".product-details #slider-next",
			prevSelector: ".product-details #slider-prev",
			nextText: '<i class="fa fa-angle-right"></i>',
			prevText: '<i class="fa fa-angle-left"></i>',
			mode: "fade",
			auto: "true",
			speed: "700",
			pagerCustom: ".product-details .slider-pager .thumb-box",
		});
	}
	//Tabs Box

	//Quantity box
	$(".quantity-box .add").on("click", function () {
		if ($(this).prev().val() < 999) {
			$(this)
				.prev()
				.val(+$(this).prev().val() + 1);
		}
	});
	$(".quantity-box .sub").on("click", function () {
		if ($(this).next().val() > 1) {
			if ($(this).next().val() > 1)
				$(this)
					.next()
					.val(+$(this).next().val() - 1);
		}
	});

	$(".feature-block-one").on("mouseenter", function () {
		$(".feature-block-one").removeClass("active");
		$(this).addClass("active");
	});

	// Horizontal accordion js area start here ***
	$(".hzAccordion__item").on("click", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});
	// Horizontal accordion js area end here ***
	// <!-- Gsap Aniamtion Start -->

	// Register GSAP Plugins

	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TweenMax, ScrollToPlugin);

	//Smooth Scroll
	gsap.config({
		nullTargetWarn: false,
	});
	let smoother = ScrollSmoother.create({
		smooth: 2,
		effects: true,
		smoothTouch: 0.1,
		normalizeScroll: false,
		ignoreMobileResize: true,
	});

	// Text Invert With Scroll 
	const split = new SplitText(".text_invert, .text_invert-2", { type: "lines" });
	split.lines.forEach((target) => {
		gsap.to(target, {
			backgroundPositionX: 0,
			ease: "none",
			scrollTrigger: {
				trigger: target,
				scrub: 1,
				start: 'top 85%',
				end: "bottom center",
			}
		});
	});


	// Image Reveal Animation
	let tp_img_reveal = document.querySelectorAll(".tp_img_reveal");
	tp_img_reveal.forEach((img_reveal) => {
		let image = img_reveal.querySelector("img");
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: img_reveal,
				start: "top 10%",
			}
		});

		tl.set(img_reveal, { autoAlpha: 1 });
		tl.from(img_reveal, 1.5, {
			yPercent: -100,
			ease: Power2.out
		});
		tl.from(image, 1.5, {
			yPercent: 100,
			scale: 1.5,
			delay: -1.5,
			ease: Power2.out
		});
	});

	////fade-class-active
	if ($(".ks_fade_anim").length > 0) {
		gsap.utils.toArray(".ks_fade_anim").forEach((item) => {
			let ks_fade_offset = item.getAttribute("data-fade-offset") || 40,
				ks_duration_value = item.getAttribute("data-duration") || 0.75,
				ks_fade_direction = item.getAttribute("data-fade-from") || "bottom",
				ks_onscroll_value = item.getAttribute("data-on-scroll") || 1,
				ks_delay_value = item.getAttribute("data-delay") || 0.15,
				ks_ease_value = item.getAttribute("data-ease") || "power2.out",
				ks_anim_setting = {
					opacity: 0,
					ease: ks_ease_value,
					duration: ks_duration_value,
					delay: ks_delay_value,
					x: (ks_fade_direction == "left" ? -ks_fade_offset : (ks_fade_direction == "right" ? ks_fade_offset : 0)),
					y: (ks_fade_direction == "top" ? -ks_fade_offset : (ks_fade_direction == "bottom" ? ks_fade_offset : 0)),
				};
			if (ks_onscroll_value == 1) {
				ks_anim_setting.scrollTrigger = {
					trigger: item,
					start: 'top 85%',
				};
			}
			gsap.from(item, ks_anim_setting);
		});
	}


	// split text animation
	if ($('.split-text').length > 0) {
		var st = $(".split-text");
		if (st.length == 0) return;
		gsap.registerPlugin(SplitText);
		st.each(function (index, el) {
			el.split = new SplitText(el, {
				type: "lines,words,chars",
				linesClass: "split-line"
			});
			gsap.set(el, { perspective: 400 });

			if ($(el).hasClass('split-in-right')) {
				gsap.set(el.split.chars, {
					opacity: 0,
					x: "50",
					ease: "Back.easeOut",
				});
			}
			if ($(el).hasClass('split-in-left')) {
				gsap.set(el.split.chars, {
					opacity: 0,
					x: "-50",
					ease: "circ.out",
				});
			}
			el.anim = gsap.to(el.split.chars, {
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
				},
				x: "0",
				y: "0",
				rotateX: "0",
				scale: 1,
				opacity: 1,
				duration: 0.4,
				stagger: 0.02,
			});
		});
	}


	let tl = gsap.timeline();
	const pr = gsap.matchMedia();

	pr.add("(min-width: 767px)", () => {
		const otherSections = document.querySelectorAll('.des-portfolio-panel');
		gsap.set(otherSections, { scale: 1 });
		otherSections.forEach((section) => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: 'top 0',
					end: "bottom 100%",
					endTrigger: '.des-portfolio-wrap',
					pinSpacing: false,
					markers: false,
				}
			});

			tl.to(section, { scale: 0.8 });
		});
	});

	// 19 .service panel animation //
	let sv = gsap.matchMedia();
	sv.add("(min-width: 991px)", () => {
		let tl = gsap.timeline();
		let projectpanels = document.querySelectorAll('.tp-service-panel');
		let baseOffset = 150;
		let offsetIncrement = 180;
		projectpanels.forEach((section, index) => {
			let topOffset = baseOffset + (index * offsetIncrement);
			tl.to(section, {
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: `top ${topOffset}px`,
					end: "bottom 100%",
					endTrigger: '.tp-service-pin',
					pinSpacing: false,
					markers: false,
				},
			});
		});
	});


	// 19 Case panel animation //
	let ca = gsap.matchMedia();
	ca.add("(min-width: 1199px)", () => {
		let tl = gsap.timeline();
		let projectpanels = document.querySelectorAll('.tp-case-panel');
		let baseOffset = 225;
		let offsetIncrement = 0;
		projectpanels.forEach((section, index) => {
			let topOffset = baseOffset + (index * offsetIncrement);
			tl.to(section, {
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: `top ${topOffset}px`,
					end: "bottom 100%",
					endTrigger: '.tp-case-pin',
					pinSpacing: false,
					markers: false,
				},
			});
		});
	});


	// 21. stack panel pin section //
	let sp = gsap.matchMedia();
	sp.add("(min-width: 1199px)", () => {
		let tl = gsap.timeline();
		let panels = document.querySelectorAll('.stack-panel-pin')
		panels.forEach((section, index) => {
			tl.to(section, {
				scrollTrigger: {
					trigger: section,
					pin: section,
					scrub: 1,
					start: 'top 0%',
					end: "bottom 90%",
					endTrigger: '.stack-panel-pin-area',
					pinSpacing: false,
					markers: false,
				},
			})
		})
	});


	// hover reveal start
	const hoverItem = document.querySelectorAll(".bw-hover-image");

	function moveImage(e, hoverItem, index) {
		const item = hoverItem.getBoundingClientRect();
		const x = e.clientX - item.x;
		const y = e.clientY - item.y;
		if (hoverItem.children[index]) {
			hoverItem.children[index].style.transform = `translate(${x}px, ${y}px)`;
		}
	}
	hoverItem.forEach((item, i) => {
		item.addEventListener("mousemove", (e) => {
			setInterval(moveImage(e, item, 1), 50);
		});
	});
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});




	// <!-- Gsap Aniamtion End -->


	//>> Hero-1 Slider Start <<//
	const sliderActive2 = ".hero-slider";
	const sliderInit2 = new Swiper(sliderActive2, {
		loop: true,
		slidesPerView: 1,
		effect: "fade",
		speed: 2000,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".array-prev",
			prevEl: ".array-next",
		},
	});
	function animated_swiper(selector, init) {
		const animated = function animated() {
			$(selector + " [data-animation]").each(function () {
				let anim = $(this).data("animation");
				let delay = $(this).data("delay");
				let duration = $(this).data("duration");
				$(this)
					.removeClass("anim" + anim)
					.addClass(anim + " animated")
					.css({
						webkitAnimationDelay: delay,
						animationDelay: delay,
						webkitAnimationDuration: duration,
						animationDuration: duration,
					})
					.one("animationend", function () {
						$(this).removeClass(anim + " animated");
					});
			});
		};
		animated();
		init.on("slideChange", function () {
			$(sliderActive2 + " [data-animation]").removeClass("animated");
		});
		init.on("slideChange", animated);
	}

	animated_swiper(sliderActive2, sliderInit2);


	//service-slider
	if ($('.service-slide').length > 0) {
		const serviceSlider = new Swiper(".service-slide", {
			spaceBetween: 30,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next",
			},
			breakpoints: {
				1199: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				696: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	//testimonial-slider
	if ($('.service-three-slider').length > 0) {
		const serviceThreeSlider = new Swiper(".service-three-slider", {
			loop: true,
			autoplay: true,
			spaceBetween: 30,
			speed: 1500,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next",
			},
		});
	}

	//Service-slider
	if ('.service-four-slider') {
		var serviceFourSlider = new Swiper(".service-four-slider", {
			loop: true,
			autoplay: true,
			spaceBetween: 24,
			centeredSlides: true,
			speed: 6000,
			pagination: {
				el: ".dot",
				clickable: true,
			},
			breakpoints: {
				475: {
					slidesPerView: 1,
				},
				767: {
					slidesPerView: 1,
				},
				992: {
					slidesPerView: 1.2,
				},
				1199: {
					slidesPerView: 1.4,
				},
				1299: {
					slidesPerView: 1.7,
				},
				1499: {
					slidesPerView: 1.8,
				},
				1599: {
					slidesPerView: 2,
				},
				1699: {
					slidesPerView: 2,
				},
				1799: {
					slidesPerView: 2.3,
				},
			},
		});
	}
	//Features-slider
	if ('.feaures-slider') {
		var feauresSlider = new Swiper(".feaures-slider", {
			loop: true,
			autoplay: true,
			spaceBetween: 24,
			centeredSlides: true,
			speed: 6000,
			autoplay: {
				delay: 0,
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},
			breakpoints: {
				475: {
					slidesPerView: 1,
				},
				767: {
					slidesPerView: 1,
				},
				992: {
					slidesPerView: 2,
				},
				1199: {
					slidesPerView: 2,
				},
				1299: {
					slidesPerView: 3,
				},
				1399: {
					slidesPerView: 3,
				},
				1499: {
					slidesPerView: 3,
				},
			},
		});
	}

	//Case-slider
	if ('.case-slider') {
		var caseSlider = new Swiper(".case-slider", {
			loop: true,
			autoplay: true,
			spaceBetween: 24,
			centeredSlides: true,
			speed: 6000,
			autoplay: {
				delay: 0,
			},

			breakpoints: {
				475: {
					slidesPerView: 1,
				},
				767: {
					slidesPerView: 1.5,
				},
				992: {
					slidesPerView: 1.8,
				},
				1199: {
					slidesPerView: 2,
				},
				1299: {
					slidesPerView: 2.5,
				},
				1399: {
					slidesPerView: 3,
				},
				1499: {
					slidesPerView: 3.5,
				},
			},
		});
	}

	//Case-slider-3
	if ('.case-slider-3') {
		var caseSlider3 = new Swiper(".case-slider-3", {
			loop: true,
			autoplay: true,
			spaceBetween: 0,
			centeredSlides: true,
			speed: 6000,
			breakpoints: {
				475: {
					slidesPerView: 1,
				},
				767: {
					slidesPerView: 1.5,
				},
				992: {
					slidesPerView: 2,
				},
				1199: {
					slidesPerView: 2.8,
				},
				1299: {
					slidesPerView: 2.2,
				},
				1499: {
					slidesPerView: 3.2,
				},
				1599: {
					slidesPerView: 3.8,
				},
			},
		});
	}


	//project-carousel
	if ($('.project-slider').length > 0) {
		const ProjectSlider = new Swiper(".project-slider", {
			spaceBetween: 30,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next",
			},

			breakpoints: {
				1199: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 1,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	if ($('.project-slider-2').length > 0) {
		const ProjectSlider2 = new Swiper(".project-slider-2", {
			spaceBetween: 30,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},

			breakpoints: {
				1199: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 2,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	//Team-carousel
	if ($('.team-slider').length > 0) {
		const teamSlider = new Swiper(".team-slider", {
			spaceBetween: 30,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},
			breakpoints: {
				1399: {
					slidesPerView: 5,
				},
				1199: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 2,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	//testimonial-slider
	if ($('.testimonial-slider').length > 0) {
		const testimonialSlider = new Swiper(".testimonial-slider", {
			loop: true,
			autoplay: true,
			spaceBetween: 30,
			speed: 2000,
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next",
			},
		});
	}

	//testimonial-slider-two
	if ($('.testimonial-slider-two').length > 0) {
		const testimonialSliderTwo = new Swiper(".testimonial-slider-two", {
			loop: true,
			autoplay: true,
			spaceBetween: 24,
			speed: 2000,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next",
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				575: {
					slidesPerView: 1,
				},
				767: {
					slidesPerView: 1,
				},

				991: {
					slidesPerView: 1,
				},
				1199: {
					slidesPerView: 1,
				},
				1399: {
					slidesPerView: 1.3,
				},
				1499: {
					slidesPerView: 1.5,
				},
				1599: {
					slidesPerView: 1.8,
				},
				1799: {
					slidesPerView: 2,
				},
			},
		});
	}

	//testimonial-slider-two
	if ($('.testimonial-slider-three').length > 0) {
		const testimonialSliderThere = new Swiper(".testimonial-slider-three", {
			loop: true,
			autoplay: true,
			spaceBetween: 24,
			centeredSlides: true,
			speed: 2000,
			autoplay: {
				delay: 1000,
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				575: {
					slidesPerView: 1,
				},
				767: {
					slidesPerView: 1.8,
				},
				991: {
					slidesPerView: 2.5,
				},
				1199: {
					slidesPerView: 3,
				},
				1399: {
					slidesPerView: 3.3,
				},
				1499: {
					slidesPerView: 3.8,
				},
				1599: {
					slidesPerView: 4.3,
				},
			},
		});
	}

	//testimonial-slider
	if ($('.testimonial-slider-four').length > 0) {
		const testimonialSliderFour = new Swiper(".testimonial-slider-four", {
			loop: true,
			autoplay: true,
			spaceBetween: 30,
			speed: 2000,
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next",
			},
		});
	}

	//testimonial-slider
	if ($('.testimonial-slider-five').length > 0) {
		const testimonialSlider = new Swiper(".testimonial-slider-five", {
			loop: true,
			autoplay: true,
			spaceBetween: 30,
			speed: 2000,
			navigation: {
				nextEl: ".array-prev",
				prevEl: ".array-next",
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},
		});
	}

	//marquee-slider
	if ($('.marquee-slider').length > 0) {
		const marqueeSlider = new Swiper(".marquee-slider", {
			loop: true,
			freemode: true,
			slidesPerView: 'auto',
			spaceBetween: 50,
			centeredSlides: true,
			allowTouchMove: false,
			speed: 12000,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	}
	//marquee-slider
	if ($('.text-slider').length > 0) {
		const marqueeSlider = new Swiper(".text-slider", {
			loop: true,
			freemode: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			centeredSlides: true,
			allowTouchMove: false,
			speed: 12000,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	}

	//brand-slider
	if ($('.brand-slider').length > 0) {
		const brandSlider = new Swiper(".brand-slider", {
			spaceBetween: 100,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},
			breakpoints: {
				1399: {
					slidesPerView: 5,
				},
				1199: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 2,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}

	//brand-slider
	if ($('.brand-slider-two').length > 0) {
		const brandSliderTwo = new Swiper(".brand-slider-two", {
			spaceBetween: 0,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},
			breakpoints: {
				1399: {
					slidesPerView: 5,
				},
				1199: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 2,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}
	//brand-slider
	if ($('.brand-slider-three').length > 0) {
		const brandSliderThree = new Swiper(".brand-slider-three", {
			spaceBetween: 0,
			speed: 2000,
			loop: true,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".dot",
				clickable: true,
			},
			breakpoints: {
				1399: {
					slidesPerView: 6,
				},
				1199: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 2,
				},
				575: {
					slidesPerView: 2,
				},
				0: {
					slidesPerView: 1,
				},
			},
		});
	}
	// Swiper marqee area end here ***

	//>> Mouse Cursor Start <<//

	if (!document.body.classList.contains("is-mobile") && document.querySelector("#custom-cursor-wrapper.tp-cursor")) {
		$(".tp-magnetic-item").wrap('<div class="tp-magnetic-wrap"></div>');

		if ($("a.tp-magnetic-item").length) {
			$("a.tp-magnetic-item").addClass("not-hide-cursor");
		}

		var $mouse = { x: 0, y: 0 };
		var $pos = { x: 0, y: 0 };
		var $ratio = 0.15;
		var $active = false;
		var $cursorDot = $("#cursorDot");

		var $cursorDotWidth = 14;
		var $cursorDotHeight = 14;
		var $cursorDotScale = 1;
		var $cursorDotOpacity = 1;
		var $cursorDotBorderWidth = 1;

		gsap.set($cursorDot, {
			xPercent: -50,
			yPercent: -50,
			width: $cursorDotWidth,
			height: $cursorDotHeight,
			borderWidth: $cursorDotBorderWidth,
			opacity: $cursorDotOpacity
		});

		document.addEventListener("mousemove", mouseMove);

		function mouseMove(e) {
			$mouse.x = e.clientX;
			$mouse.y = e.clientY;
		}

		gsap.ticker.add(updatePosition);

		function updatePosition() {
			if (!$active) {
				$pos.x += ($mouse.x - $pos.x) * $ratio;
				$pos.y += ($mouse.y - $pos.y) * $ratio;

				gsap.set($cursorDot, { x: $pos.x, y: $pos.y });
			}
		}

		$(".tp-magnetic-wrap").mousemove(function (e) {
			parallaxCursor(e, this, 2); // magnetic cursorDot = low number is more attractive
			callParallax(e, this);
		});

		function callParallax(e, parent) {
			parallaxIt(e, parent, parent.querySelector(".tp-magnetic-item"), 25); // magnetic area = higher number is more attractive
		}

		function parallaxIt(e, parent, target, movement) {
			var boundingRect = parent.getBoundingClientRect();
			var relX = e.clientX - boundingRect.left;
			var relY = e.clientY - boundingRect.top;

			gsap.to(target, {
				duration: 0.3,
				x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
				y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
				ease: Power2.easeOut
			});
		}

		function parallaxCursor(e, parent, movement) {
			var rect = parent.getBoundingClientRect();
			var relX = e.clientX - rect.left;
			var relY = e.clientY - rect.top;
			$pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
			$pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
			gsap.to($cursorDot, { duration: 0.3, x: $pos.x, y: $pos.y });
		}


		// Magnetic item hover.
		$(".tp-magnetic-wrap").on("mouseenter", function (e) {
			gsap.to($cursorDot, { duration: 0.3, scale: 2, borderWidth: 1, opacity: $cursorDotOpacity });
			$active = true;
		}).on("mouseleave", function (e) {
			gsap.to($cursorDot, { duration: 0.3, scale: $cursorDotScale, borderWidth: $cursorDotBorderWidth, opacity: $cursorDotOpacity });
			gsap.to(this.querySelector(".tp-magnetic-item"), { duration: 0.3, x: 0, y: 0, clearProps: "all" });
			$active = false;
		});

		// Cursor view on hover (data attribute "data-cursor="...").
		$("[data-cursor]").each(function () {
			$(this).on("mouseenter", function () {
				$("#cursorDot").addClass("with-blur");
				$cursorDot.append('<div class="cursorDot-view"></div>');
				$(".cursorDot-view").append($(this).attr("data-cursor"));
				gsap.to($cursorDot, {
					duration: 0.3, xPercent: is_rtl() ? 50 : -50, yPercent: -60, width: 110, height: 110, opacity: 1, borderWidth: 0, zIndex: 1, backdropFilter: "blur(14px)",
					backgroundColor: "#fff"
				});
				gsap.to(".cursorDot-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
			}).on("mouseleave", function () {
				gsap.to($cursorDot, { duration: 0.3, yPercent: -50, width: $cursorDotWidth, height: $cursorDotHeight, opacity: $cursorDotOpacity, borderWidth: $cursorDotBorderWidth, backgroundColor: "#000" });
				gsap.to(".cursorDot-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps: "all" });
				$cursorDot.find(".cursorDot-view").remove();
			});
			$(this).addClass("not-hide-cursor");
		});

		$("[data-cursor2]").each(function () {
			$(this).on("mouseenter", function () {
				$("#cursorDot").addClass("with-blur");
				$cursorDot.append('<div class="cursorDot-drag"></div>');
				$(".cursorDot-drag").append($(this).attr("data-cursor2"));
				gsap.to($cursorDot, {
					duration: 0.3, xPercent: is_rtl() ? 50 : -50, yPercent: -60, width: 110, height: 110, opacity: 1, borderWidth: "1px", borderColor: "rgba(255, 255, 255, 0.22)", zIndex: 1, backdropFilter: "blur(34px)",
					backgroundColor: "rgba(255, 255, 255, 0.30)", boxShadow: "11px 11px 32.2px 0px rgba(255, 255, 255, 0.12) inset"
				});
				gsap.to(".cursorDot-drag", { duration: 0.3, scale: 1, autoAlpha: 1 });
			}).on("mouseleave", function () {
				gsap.to($cursorDot, { duration: 0.3, yPercent: -50, width: $cursorDotWidth, height: $cursorDotHeight, opacity: $cursorDotOpacity, borderWidth: $cursorDotBorderWidth, backgroundColor: "#000" });
				gsap.to(".cursorDot-drag", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps: "all" });
				$cursorDot.find(".cursorDot-drag").remove();
			});
			$(this).addClass("not-hide-cursor2");
		});
		// Show/hide cursor // 

		// Hide on hover//
		$("a, button") // class "hide-cursor" is for global use.
			.not('.cursor-hide') // omit from selection.
			.on("mouseenter", function () {
				gsap.to($cursorDot, { duration: 0.3, scale: 0, opacity: 0 });
			}).on("mouseleave", function () {
				gsap.to($cursorDot, { duration: 0.3, scale: $cursorDotScale, opacity: $cursorDotOpacity });
			});

		// Hide on click//
		$("a")
			.not('[target="_blank"]') // omit from selection.
			.not('.cursor-hide') // omit from selection.
			.not('[href^="#"]') // omit from selection.
			.not('[href^="mailto"]') // omit from selection.
			.not('[href^="tel"]') // omit from selection.
			.not(".lg-trigger") // omit from selection.
			.not(".tp-btn-disabled a") // omit from selection.
			.on('click', function () {
				gsap.to($cursorDot, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
			});

		// Show/hide on document leave/enter//
		$(document).on("mouseleave", function () {
			gsap.to("#cursor-outer", { duration: 0.3, autoAlpha: 0 });
		}).on("mouseenter", function () {
			gsap.to("#cursor-outer", { duration: 0.3, autoAlpha: 1 });
		});

		// Show as the mouse moves//
		$(document).mousemove(function () {
			gsap.to("#cursor-outer", { duration: 0.3, autoAlpha: 1 });
		});
	}

	function is_rtl() {
		return $('html').attr('dir') == 'rtl' ? true : false;
	}



	//MixItup Gallery
	if ($(".filter-list").length) {
		$(".filter-list").mixItUp({});
	}

	//Jquery Knob animation  // Pie Chart Animation
	if ($(".dial").length) {
		$(".dial").appear(
			function () {
				var elm = $(this);
				var color = elm.attr("data-fgColor");
				var perc = elm.attr("value");

				elm.knob({
					value: 0,
					min: 0,
					max: 100,
					skin: "tron",
					readOnly: true,
					thickness: 0.15,
					dynamicDraw: true,
					displayInput: false,
				});
				$({ value: 0 }).animate(
					{ value: perc },
					{
						duration: 2000,
						easing: "swing",
						progress: function () {
							elm.val(Math.ceil(this.value)).trigger("change");
						},
					}
				);
				//circular progress bar color
				$(this).append(function () {
					// elm.parent().parent().find('.circular-bar-content').css('color',color);
					//elm.parent().parent().find('.circular-bar-content .txt').text(perc);
				});
			},
			{ accY: 20 }
		);
	}

	//Accordion Box
	if ($('.accordion-box').length) {
		$(".accordion-box").on('click', '.acc-btn', function () {

			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');

			if ($(this).hasClass('active') !== true) {
				$(outerBox).find('.accordion .acc-btn').removeClass('active ');
			}

			if ($(this).next('.acc-content').is(':visible')) {
				return false;
			} else {
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);
			}
		});
	}

	if ($(".tabs-box").length) {
		$(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
			e.preventDefault();
			var target = $($(this).attr("data-tab"));

			if ($(target).is(":visible")) {
				return false;
			} else {
				target
					.parents(".tabs-box")
					.find(".tab-buttons")
					.find(".tab-btn")
					.removeClass("active-btn");
				$(this).addClass("active-btn");
				target
					.parents(".tabs-box")
					.find(".tabs-content")
					.find(".tab")
					.fadeOut(0);
				target
					.parents(".tabs-box")
					.find(".tabs-content")
					.find(".tab")
					.removeClass("active-tab animated fadeIn");
				$(target).fadeIn(300);
				$(target).addClass("active-tab animated fadeIn");
			}
		});
	}

	// Scroll to a Specific Div
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function () {
			var target = $(this).attr('data-target');
			// animate
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 0);

		});
	}

	// Elements Animation
	if ($('.wow').length) {
		var wow = new WOW(
			{
				boxClass: 'wow',      // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset: 0,          // distance to the element when triggering the animation (default is 0)
				mobile: false,       // trigger animations on mobile devices (default is true)
				live: true       // act on asynchronously loaded content (default is true)
			}
		);
		wow.init();
	}

	//Jquery Knob animation  // Pie Chart Animation
	if ($(".dial").length) {
		$(".dial").appear(
			function () {
				var elm = $(this);
				var color = elm.attr("data-fgColor");
				var perc = elm.attr("value");

				elm.knob({
					value: 0,
					min: 0,
					max: 100,
					skin: "tron",
					readOnly: true,
					thickness: 0.07,
					dynamicDraw: true,
					displayInput: false,
				});

				$({ value: 0 }).animate(
					{ value: perc },
					{
						duration: 2000,
						easing: "swing",
						progress: function () {
							elm.val(Math.ceil(this.value)).trigger("change");
						},
					}
				);

				//circular progress bar color
				$(this).append(function () {
					// elm.parent().parent().find('.circular-bar-content').css('color',color);
					//elm.parent().parent().find('.circular-bar-content .txt').text(perc);
				});
			},
			{ accY: 20 }
		);
	}

	if ($('.service-block-two .inner-box').length) {
		const $boxes = $('.service-block-two .inner-box');

		if ($boxes.length) {
			// Activate the first box on load
			// const $firstBox = $boxes.first();
			// $firstBox.addClass('active');
			// $firstBox.find('.content-box').addClass('active').slideDown();

			// Click logic
			$boxes.on('click', function () {
				$boxes.removeClass('active');
				$('.service-block-two .content-box').slideUp().removeClass('active');

				$(this).addClass('active');
				$(this).find('.content-box').slideDown().addClass('active');
			});
		}
	}


	$(document).ready(function () {
		$("select").niceSelect();
	});

     //>> Video Popup Start <<//
        $(".img-popup").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });

        $('.video-popup').magnificPopup({
            type: 'iframe',
            callbacks: {
            }
        });

	// count Bar
	if ($(".count-bar").length) {
		$(".count-bar").appear(
			function () {
				var el = $(this);
				var percent = el.data("percent");
				$(el).css("width", percent).addClass("counted");
			},
			{
				accY: -50,
			}
		);
	}


	(function () {
		function animateProgress(id, valueId, endValue, speed) {
			const progress = document.getElementById(id);
			const valueContainer = document.getElementById(valueId);

			if (!progress || !valueContainer) return;

			let currentValue = 0;

			function updateProgress() {
				currentValue++;
				if (currentValue > endValue) {
					currentValue = endValue;
				}
				valueContainer.textContent = `${currentValue}%`;
				progress.style.background = `conic-gradient(
					#C8F169 ${currentValue * 3.6}deg,
					#D4D4D4 ${currentValue * 3.6}deg
				)`;

				if (currentValue < endValue) {
					setTimeout(() => requestAnimationFrame(updateProgress), speed);
				}
			}

			requestAnimationFrame(updateProgress);
		}

		// Initialize progress bars only if their elements exist
		document.addEventListener("DOMContentLoaded", function () {
			if (document.getElementById('progress1') && document.getElementById('value1')) {
				animateProgress('progress1', 'value1', 95, 20);
			}
			if (document.getElementById('progress2') && document.getElementById('value2')) {
				animateProgress('progress2', 'value2', 85, 20);
			}
			if (document.getElementById('progress3') && document.getElementById('value3')) {
				animateProgress('progress3', 'value3', 85, 20);
			}
			if (document.getElementById('progress4') && document.getElementById('value4')) {
				animateProgress('progress4', 'value4', 85, 20);
			}
			if (document.getElementById('progress5') && document.getElementById('value5')) {
				animateProgress('progress5', 'value5', 85, 20);
			}
			if (document.getElementById('progress6') && document.getElementById('value6')) {
				animateProgress('progress6', 'value6', 85, 20);
			}
			if (document.getElementById('progress7') && document.getElementById('value7')) {
				animateProgress('progress7', 'value7', 85, 20);
			}
			if (document.getElementById('progress8') && document.getElementById('value8')) {
				animateProgress('progress8', 'value8', 85, 20);
			}
		});


	})();



  /* ---------------------------------------------------------------------- */
  /* ----------- Activate Menu Item on Reaching Different Sections ---------- */
  /* ---------------------------------------------------------------------- */
  var $onepage_nav = $('.onepage-nav');
  var $sections = $('section');
  var $window = $(window);
  function TM_activateMenuItemOnReach() {
	  if( $onepage_nav.length > 0 ) {
	    var cur_pos = $window.scrollTop() + 2;
	    var nav_height = $onepage_nav.outerHeight();
	    $sections.each(function() {
	      var top = $(this).offset().top - nav_height - 80,
	        bottom = top + $(this).outerHeight();

	      if (cur_pos >= top && cur_pos <= bottom) {
	        $onepage_nav.find('a').parent().removeClass('current').removeClass('active');
	        $sections.removeClass('current').removeClass('active');
	        $onepage_nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('current').addClass('active');
	      }

	      if (cur_pos <= nav_height && cur_pos >= 0) {
	        $onepage_nav.find('a').parent().removeClass('current').removeClass('active');
	        $onepage_nav.find('a[href="#header"]').parent().addClass('current').addClass('active');
	      }
	    });
	  }
	}
	gsap.registerPlugin(ScrollToPlugin);

	// Smooth scroll on menu click
	$('.onepage-nav a').on('click', function(e) {
	  e.preventDefault(); // stop default jump
	  let target = $(this).attr('href'); // section id
	  
	  gsap.to(window, {
	    duration: 1,            // animation time
	    scrollTo: {
	      y: target,            // scroll to this section
	      offsetY: 80           // adjust for fixed header
	    },
	    ease: "power2.out"
	  });
	});


	/* ==========================================================================
   When document is Scrollig, do
  ========================================================================== */
	$(window).on('scroll', function() {
		TM_activateMenuItemOnReach();
	});





})(window.jQuery);
