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
			$(this).parents('.js-calendar-parent').find('.js-calendar-label').text(value)
			$('.js-calendar').hide(); 
		} 
	});

	$('.js-datepicker-due').datepicker({
		beforeShow: function() { 
			setTimeout(function() {
				$('.ui-datepicker').addClass('ui-datepicker_mod');
				$('.ui-datepicker').append('<div class="ui-datepicker__bottom"><label><span>Time</span><input class="ui-datepicker__input"></label><button class="button ui-datepicker-btn">Done</button></div>');
			}, 50);
		}
	});

	//select

	//multi start

	// $('.js-multi-select').each(function() {
	// 	var select = $(this),
	// 		placeholder = select.attr('placeholder');

	// 	select.multipleSelect({
	// 		single: false,
	// 		placeholder: placeholder,
	// 		onOpen: function() {
	// 			if (select.hasClass('is-active')) {
	// 				select.removeClass('is-active');
	// 			}
	// 			else {
	// 				select.addClass('is-active')
	// 			}
	// 			$(this).toggleClass('is-active');
	// 			console.log($(this));
				
	// 		},
	// 		onClose: function() {
	// 			if (select.hasClass('is-active')) {
	// 				select.removeClass('is-active');
	// 			}
	// 			else {
	// 				select.addClass('is-active')
	// 			}
	// 			$(this).toggleClass('is-active');
	// 			console.log($(this));
				
	// 		}
	// 	});
	// });

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
	

	
});