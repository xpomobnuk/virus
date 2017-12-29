$(function() {




// scroll to id

// $(".mainFooter .mainFooter_wrap a").mPageScroll2id();


// $('.recommended_pills .view').matchHeight();
equalBlockHeight('#view1','#view2');


function equalBlockHeight(id1, id2){
	var view1, view1Height, view2, view2Height;

	view1 = $(id1);
	view2 = $(id2);

	view1Height = view1.outerHeight();

	view2.removeAttr('style');
	view2Height = view2.outerHeight();


	if(view1Height > view2Height && window.width()>992){

		view2.css('height', view1Height);
	}
}







	/*
	*   Create vars
	*/

	var firstSelect, secondSelect, firstSelectPlaceholder, secondSelectPlaceholder;
	
	firstSelect = $("#firstSelect");
	secondSelect = $("#firstSelect2");
	firstSelectPlaceholder = 'Укажите, кто болеет...';
	secondSelectPlaceholder = 'Что обнаружил врач...';

	

	/* Function init */

	select2Option(firstSelect, firstSelectPlaceholder);
	select2Option(secondSelect, secondSelectPlaceholder);

	function select2Option(element, placeholder){
		element.select2({
			minimumResultsForSearch: -1,
			placeholder: {
				id: "-1",
				text: placeholder,
				selected:'selected'
			},
			allowClear: true,
			minimumResultsForSearch: -1,
			data: [ {
				id: -1,
				text: '',
				selected: 'selected',
				search: '',
				hidden: true
			}]
		});
	}
	
	
	/* Hidden default arrow */
	$('b[role="presentation"]').hide();
	
	/* Add custom arrow */
	$('.select2-selection__arrow').append('<div class="select_arrow_down"></div>');
	
	
	




//  -------------------- Ajax add content in tabse -------------------------

function getContent(ajaxOptions) {

	var contentArr = [
	'В комплексной терапии полоску геля длиной не более 0,5 см наносить на предварительно подсушенную поверхность слизистой оболочки носа и/или на поверхность небных миндалин 3–5 раз в день в течение 5 суток. При необходимости курс может быть продлён. В период подъема заболеваемости полоску геля длиной не более 0,5 см наносят на предварительно подсушенную поверхность слизистой оболочки носа и/или на поверхность небных миндалин 2 раза в день в течение 2-4 недель. На слизистую оболочку носовой полости гель наносить после очищения носовых проходов. На поверхность небных миндалин – через 30 минут после принятия пищи. При нанесении геля на небные миндалины не прикасаться к миндалинам ватным тампоном, а лишь гелем, гель при этом самостоятельно стекает вниз по поверхности миндалины.',
	'Sapiente, blanditiis. Nihil illum c. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque.',
	'Sapiente, blanditiis. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque.common.jsNihil illum commodi id distinctio provident amet et. Voluptatibus, neque.',
	'Sapiente, blanditiis. Nihil illum commodi id distinctio.Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque.',
	'Sapiente, blanditiis. Nihil illum commodi id distinctio provident.Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque.common.jsNihil illum commodi id distinctio provident amet et. Voluptatibus, neque. ',
	'Sapiente, blanditiis. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque.',
	'Sapiente, blanditiis.  distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque.',
	'Sapiente,  Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. ',
	'Sapiente. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque. '
	];

	return contentArr[ajaxOptions];
}


var tabsOptions = {
        tabsWrap: '.medicine_item_wrap', //обертка всех табов
        tabWrap: '.medicine_item', //обертка одного таба
        tab: '.medicine_item_wrap .button', //снопка запускающаю работу таба (сам таб)
        activeClassName: 'active', //название класса активного таба
        titleWrap: '.orange_block span', //куда будет выводиться заголовок контента
        titleCustomTemplate: ' гель &#8226 Схема приёма', //шаблон для заголовка (будет добавлен в конец)(не обязательно)
        contentWrap: '.aqua_block span', //куда будет подгружаться контент
        parseContent: function (opt) {

        	return getContent(opt);

        } //полученный контент
      };

      myCustomTabs(tabsOptions);


      function myCustomTabs(options) {


      	if (typeof options !== 'object') {
      		console.error('Your options is not an object');
      		return false;
      	} else {

      		/* Tab click event */


  // -------- add scroll to id 


  $('[data-custom-anchor]').on("click", function (event) {
  	event.preventDefault();

  	var anchor, target;

  	anchor = $(this).data("custom-anchor");
  	target = $('#'+anchor);

  	if(anchor && target.length) {
  		$('html, body').animate({
  			scrollTop: (target.offset().top)
  		}, 1000);
  	}

  });

  // -------- END SCROLL TO ID


  $(options.tab).on("click", function (event) {
  	event.preventDefault();



  	var curTabId, content, title, th;

  	th = $(this);
  	curTabId = th.data('tab-id');

  	content = options.parseContent(curTabId);
  	title = th.closest(options.tabWrap).find('.item a').html();

  	if (options.titleCustomTemplate) {
  		title += options.titleCustomTemplate;
  	}


                //remove all class active
                $(options.tabsWrap).find(options.tabWrap).removeClass(options.activeClassName);

                //set class active to current element
                th.closest(options.tabWrap).addClass(options.activeClassName);

                //set title
                $(options.titleWrap).html(title);

                //set content
                $(options.contentWrap).html(content);


                equalBlockHeight('#view1','#view2');
              });

}
}



















	});   // end jQuery