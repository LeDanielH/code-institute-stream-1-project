// $(function(){
//   var columnTwoWidth = $('.column-2').width();
//   var storeItemsWidth = $('.store-items').width();
//   var getElementsWidth = function('element1', 'element2') {
//     return element1 - element2;
//   }
//   var storeItemsFinalWidth = getElementsWidth( storeItemsWidth,columnTwoWidth);
//   $(window).resize(function() {
//     $('store-items').css('width', storeItemsFinalWidth);
//   });
// });
$(function() {
	var storeItemsWidth = $('.store-items').width();
	var columnTwoWidth = $('.column-2').width();
	$(window).on('resize', function() {
		$('.store-items').css('width', function(numWidth) {
			var numWidth = (storeItemsWidth - columnTwoWidth) + 'px';
			return numWidth;
		})
		return(window).width();
	})
})