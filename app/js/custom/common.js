$(function() {


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
            'Sapiente, blanditiis. Nihil illum c.',
            'Sapiente, blanditiis. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque.',
            'Sapiente, blanditiis. Nihil illum commodi id distinctio.',
            'Sapiente, blanditiis. Nihil illum commodi id distinctio provident.',
            'Sapiente, blanditiis. Nihil illum commodi id distinctio provident amet et. Voluptatibus, neque.',
            'Sapiente, blanditiis.  distinctio provident amet et. Voluptatibus, neque.',
            'Sapiente,  Voluptatibus, neque.',
            'Sapiente.'
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

              

            });

        }
    }



















	});   // end jQuery