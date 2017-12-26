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
	
	
	



});