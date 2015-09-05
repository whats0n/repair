head.ready(function() {

	// $(document).on("click", function(){
	// 	$(".js-popup").hide();
	// });

	// function scrollFixedElements() {
	//     var scroll_left = $(this).scrollLeft();
	//     $(".fixed-element").css({
	//         left: -scroll_left
	//     });
	// }
	// scrollFixedElements();
	// $(window).scroll(function(){
	//     scrollFixedElements()
	// });

	// console.log($('body').html());
	$('.js-calendar').hide();

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
			setTimeout(function() {
				$('.ui-datepicker').addClass('ui-datepicker_mod');
				$('.ui-datepicker').append('<div class="ui-datepicker__bottom"><label><span>Time</span><input class="ui-datepicker__input"></label><button class="button ui-datepicker-btn">Done</button></div>');
				$('.ui-datepicker__input').mask('00:00:00');
			}, 50);
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

	//chosen
	$(".js-select-tags").select2({
	  tags: true,
	});


	$('.js-select-search').each(function() {

		var place = $(this).attr('placeholder');

		$(this).select2({
			placeholder: place,
		}).on('select2:open', function() {
			$('.select2-search__field').attr('placeholder', 'Search');
		});
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
				var id = $(this).attr("data-id");
				var text = $(this).text();
				var selectList = $(this).parents(".js-status-list");
				selectList.find("li").removeClass("is-active");
				$(this).addClass("is-active");
				$(this).parents(".js-status").find(".js-status-text").html($(this).html());
				$(this).parents(".js-status").find(".js-status-input").val(id);
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


});