head.ready(function() {

	// $(document).on("click", function(){
	// 	$(".js-popup").hide();
	// });

	function scrollFixedElements() {
		var scroll_left = $(this).scrollLeft();
		$(".sidebar, .header-fixed, .js-fixed-nav-in").css({
			left: -scroll_left
		});
	}
	scrollFixedElements();
	$(window).scroll(function(){
		scrollFixedElements()
	});

	// console.log($('body').html());
	$('.js-calendar').hide();
	$('.js-calendar.is-show').show();

	$('.js-calendar-btn').click(function(){
		$(this).children('.js-calendar').toggle();
	});

	$('.js-calendar').datepicker({
		onSelect: function(value, date) {
			$(this).parents('.js-calendar-parent').find('.js-calendar-label').text(value);
			$(this).parents('.js-calendar-parent').removeClass('is-active');
			$('.js-calendar').hide();
		}
	});


	//select DATE

	if ([].indexOf) {

		var find = function(array, value) {
			return array.indexOf(value);
		}

	} else {
		var find = function(array, value) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] === value) return i;
			}

			return -1;
		}

	}


	$('.js-select-date').each(function() {
		var checkbox = $(this).find('.drop-checkbox input');
		var valuesArray = [];

	checkbox.on('click', function() {

		var valueContainer = $(this).parents('.js-select-date').find('.js-calendar-label'),
			value = $(this).parent().find('span').text();

		// check/uncheck events =======================================

		if ($(this).prop('checked')) {

			valuesArray[valuesArray.length] = value;
		}
		else {
			var arrIndex = find(valuesArray, value);

			valuesArray.splice(arrIndex, 1);
		}


		// push values to valueContainer =======================

		var addValues = (valuesArray.length - 1);

		if (valuesArray.length > 1) {
			valueContainer.text(valuesArray);
		}
		else {
			valueContainer.text(valuesArray[0]);
		}



		// remove placeholder =======================================
		if (valuesArray.length >= 1) {
			valueContainer.removeClass('placeholder');
		}
		else {
			valueContainer.addClass('placeholder');
			valueContainer.text('More');
		}


	});

	});

	$('.js-select-date').each(function() {
		$('body').on('click', function() {
			$('.js-select-date').removeClass('is-active');
		});
		$(this).find('.select-date__visible').click(function() {
			$(this).parents('.js-select-date').toggleClass('is-active');
		});
		$(this).click(function(event) {
			event.stopPropagation();
		});
		$(this).find('.js-select-checkbox').click(function() {
			var thisInput = $(this).find('input');
			if (thisInput.prop('checked')) {
				$('.select-date__sublist').removeClass('is-active');
				$(this).parents('.select-date__check').find('.select-date__sublist').addClass('is-active');
			}
			else {
				$('.select-date__sublist').removeClass('is-active');
			};
		});
	});

	$('.js-datepicker-due').datepicker({
		beforeShow: function() {
			$(this).addClass('is-choice');
		},
		onSelect: function() {
			$('.js-datepicker-due').removeClass('is-choice');
		}
	});

	$('body').on('click', '.ui-datepicker-btn', function(event) {
		$('.is-choice').val($('.ui-datepicker__input').val());
		$('.js-datepicker-due').removeClass('is-choice');
		$('.ui-datepicker').hide();
		return false;
	});

	//select

	//multi start

	$('.js-multi-select').each(function() {
		var select = $(this),
			select_parent = $(this).parents('.js-multi-parent'),
			placeholder = select.attr('placeholder'),
			data_all = select.data('all');

		select.multipleSelect({
			single: false,
			placeholder: placeholder,
			selectAll: false,
			allSelected: data_all,
			width: '100%',
			onOpen: function() {
				if (select_parent.find('.ms-parent').hasClass('is-active')) {
					select_parent.find('.ms-parent').removeClass('is-active');
				}
				else {
					select_parent.find('.ms-parent').addClass('is-active')
				}
			},
			onClose: function() {
				if (select_parent.find('.ms-parent').hasClass('is-active')) {
					select_parent.find('.ms-parent').removeClass('is-active');
				}
				else {
					select_parent.find('.ms-parent').addClass('is-active')
				}
			}
		});
	});

	$('.js-multi-select-mod').each(function() {
		var select = $(this),
			select_parent = $(this).parents('.js-multi-parent'),
			placeholder = select.attr('placeholder'),
			data_all = select.data('all');

		select.multipleSelect({
			single: true,
			placeholder: placeholder,
			selectAll: false,
			allSelected: data_all,
			onOpen: function() {
				if (select_parent.find('.ms-parent').hasClass('is-active')) {
					select_parent.find('.ms-parent').removeClass('is-active');
				}
				else {
					select_parent.find('.ms-parent').addClass('is-active')
				}
			},
			onClose: function() {
				if (select_parent.find('.ms-parent').hasClass('is-active')) {
					select_parent.find('.ms-parent').removeClass('is-active');
				}
				else {
					select_parent.find('.ms-parent').addClass('is-active')
				}
			}
		});
	});

	//multi end

	$(document).click(function() {
		$(".js-select").removeClass("is-active");
			$(".js-select-list").slideUp(100);
	});

	// select list
	$("body").on("click",".js-select",function(event) {
		event.stopPropagation();
	});
	$("body").on("click",".js-select-text",function(event) {
		var select = $(this).parents(".js-select");
		if (select.hasClass("is-active")) {
			$(".js-select").removeClass("is-active");
			$(".js-select-list").slideUp(100);
		}
		else {
			$(".js-select").removeClass("is-active");
			$(".js-select-list").slideUp(100);
			select.toggleClass("is-active").find(".js-select-list").slideToggle(100);
		}

	});

	$("body").on("click",".js-select-list li",function() {
		var val = $(this).attr("data-val");
		var text = $(this).text();
		var select = $(this).parents(".js-select");
		var selectList = $(this).parents(".js-select-list");
		select.find(".js-select-text").text(text);
		select.find("option").removeAttr("selected");
		select.find('option[value="'+val+'"]').attr("selected", "selected");
		selectList.find("li").removeClass("is-active");
		$(this).addClass("is-active");
		select.removeClass("is-active");
		selectList.slideUp(100);
		return false;

	});

	//sidebar-menu
	$('.js-side-link').click(function() {
		$(this).parents('.js-side').find('.js-side-block').slideToggle('fast');
		return false;
	});
	$('.js-accordion-link').click(function() {
		$(this).toggleClass('is-active');
		$(this).parents('.js-accordion').find('.js-accordion-arr').toggleClass('is-active');
		$(this).parents('.js-accordion').find('.js-accordion-block').slideToggle('fast');
		return false;
	});
	//search
	$('.js-search-input').focusin(function() {
		$('.js-search').addClass('is-active');
	});
	$('.js-search-input').focusout(function() {
		$('.js-search').removeClass('is-active');
	});
	//date
	$('.input-date .input').focusin(function() {
		$(this).parents('.input-date').addClass('is-active');
	});
	$('.input-date .input').focusout(function() {
		$(this).parents('.input-date').removeClass('is-active');
	});

	//chosen
	$(".js-select-tags").select2({
		tags: true,
	});


	$('.js-select-search').each(function() {

		var place = $(this).attr('placeholder');

		$(this).select2({
			placeholder: place
		}).on('select2:open', function() {
			$('.select2-search__field').attr('placeholder', 'Search');
		});
	});

	$('.js-select-time').select2({
		minimumResultsForSearch: -1
	});


	$(document).ready(function() {
		$(document).click(function() {
			$(".js-status-list").hide();
			$(".js-status").removeClass("is-active");
		});
		function selectList() {
			var status = $(".js-status");
			var status_list = $(".js-status-list");
			$("body").on("click", ".js-status", function(event){
				if ($(this).hasClass("is-active")) {
					status.removeClass("is-active");
					status_list.slideUp(200);
				}
				else {
					status.removeClass("is-active");
					status_list.slideUp(200);
					$(this).find(".js-status-list").slideDown(200);
					$(this).addClass("is-active");
				}
				event.stopPropagation();
			});
			$("body").on("click", ".js-status-list li", function(event){
				var val = $(this).attr("data-val");
				var status = $(".js-status");
				var id = $(this).attr("data-id");
				var text = $(this).text();
				var selectList = $(this).parents(".js-status-list");
				selectList.find("li").removeClass("is-active");
				$(this).addClass("is-active");
				$(this).parents(".js-status").find(".js-status-text").html($(this).html());
				status.find("option").removeAttr("selected");
				status.find('option[value="'+val+'"]').attr("selected", "selected");
				$(this).parent().slideUp(200);
				$(this).parents(".js-status").removeClass("is-active");
				event.stopPropagation();
			});
		}

		selectList();
		$("body").on("click", ".js-status", function(event){
			event.stopPropagation();
		});

	});


	//tabs
	$(".js-tabs-link").click(function () {

		$(this).parents('.js-tabs-parent').find('.js-tabs-link').removeClass('is-active');
		$(this).addClass('is-active');

		var id = $(this).data("btn"),
			$item = $('.js-tabs-block'),
			$currItem = $('.js-tabs-block[data-block=' + id + ']');

		$(this).parents('.js-tabs-parent').find('.js-tabs-block[data-block=' + id + ']').addClass('is-active');

		$item.not($currItem).removeClass('is-active');
		return false;
	});

	$('.js-tabs-btn').click(function() {
		var id = $(this).data("btn");
		$('.js-tabs-link[data-btn=' + id + ']').trigger('click');
		$('html, body').animate({
			scrollTop: $('.tabs-parent').offset().top - 0
		}, 600);
		return false;
	});

	// scroll
	if ($('.js-fixed-nav').length) {
		$(".js-anchor-link").click(function (){
			var id = $(this).data('id'),
				fixedHeight = $('.js-fixed-nav-in').outerHeight(),
				headerHeight = $('.header-fixed').outerHeight();
			$('.js-anchor-link').removeClass('is-active');
			$(this).addClass('is-active');
			$('html, body').animate({
				scrollTop: $('.js-anchor[data-anchor="' + id + '"').offset().top - fixedHeight - headerHeight
			}, 600);
			$('.js-anchor[data-anchor="' + id + '"').each(function() {
				$(this).find('.js-accordion-arr, .js-accordion-link').addClass('is-active');
				$(this).find('.js-accordion-block').slideDown('fast');
			});
			return false;
		});
		function scrollHeader() {
			if ($('.js-fixed-nav').length) {
				var fixedHeight = $('.js-fixed-nav-in').outerHeight(),
					headerHeight = $('.header-fixed').outerHeight();

				$('.js-anchor').each(function() {
					var navHeight = $('.js-fixed-nav').outerHeight();
					if ($(window).scrollTop() >= $(this).offset().top - fixedHeight - headerHeight) {
						var id = $(this).attr("data-anchor");
						$(".js-anchor-link").removeClass("is-active");
						$(".js-anchor-link[data-id='"+id+"']").addClass("is-active");
					} 
				});
			}
		}
		scrollHeader();

		$(window).resize(function() {
			$('.js-fixed-nav').css('min-height', $('.js-fixed-nav-in').outerHeight());
		});

		$(window).scroll(function() {

			var fixedHeight = $('.js-fixed-nav-in').outerHeight(),
				headerHeight = $('.header-fixed').outerHeight(),
				navTop = $('.js-fixed-nav').offset().top;

			scrollHeader();

			$('.js-fixed-nav').css('min-height', fixedHeight);

			if ($(window).scrollTop() >= navTop - headerHeight) {
				$('.js-fixed-nav .js-fixed-nav-in').addClass('is-fixed');
			}
			else {
				$('.js-fixed-nav .js-fixed-nav-in').removeClass('is-fixed');
			}
		});

		$(window).load(function() {

			var fixedHeight = $('.js-fixed-nav-in').outerHeight(),
				headerHeight = $('.header-fixed').outerHeight(),
				navTop = $('.js-fixed-nav').offset().top;

			scrollHeader();

			$('.js-fixed-nav').css('min-height', fixedHeight);

			if ($(window).scrollTop() >= navTop - headerHeight) {
				$('.js-fixed-nav .js-fixed-nav-in').addClass('is-fixed');
			}
			else {
				$('.js-fixed-nav .js-fixed-nav-in').removeClass('is-fixed');
			}
		});
	};
	

	$('.breadcrumbs__icon').click(function() {
		$('body').toggleClass('is-close');
	});

	$('.customize-table').each(function() {
		$(this).find('.radio input').click(function() {
			if ($(this).prop('checked')) {
				$(this).parents('.customize-table').find('.delete').removeClass('is-hide');
				$(this).parents('.is-fourth').find('.delete').addClass('is-hide');
			};
		});
	});

	//print
	$('.js-print-btn').click(function() {
		$(this).parents('.js-print').toggleClass('is-active');
		return false;
	});
	$('.js-print').each(function() {
		$('body').click(function() {
			$('.js-print').removeClass('is-active');
		});
		$(this).click(function(event) {
			event.stopPropagation();
		});
		$('.js-print-item').click(function() {
			$('.js-print').removeClass('is-active');
			var id = $(this).data('btn'),
				items = $('.js-popup'),
				currItem = $('.js-popup[data-block="' + id + '"]'),
				popup = $('.js-popup-wrap');

			popup.addClass('is-active');
			items.removeClass('is-active');
			currItem.addClass('is-active');

			return false;
		});
	});

	$('.js-popup-wrap').each(function() {
		$('.js-popup-close').click(function() {
			$('.js-popup-wrap').removeClass('is-active');
			$('.js-popup').removeClass('is-active');
			return false;
		});
		$('body').click(function() {
			$('.js-popup-wrap').removeClass('is-active');
			$('.js-popup').removeClass('is-active');
		});
		$('.js-popup').click(function() {
			event.stopPropagation();
		});
	});

	$('.js-notification').each(function() {
		$('.js-notification-btn').click(function() {
			$('.js-notification').slideDown('fast');
			setTimeout(function() {
				$('.js-notification').slideUp('fast');
			}, 3000);
			return false;
		});
	});	

});