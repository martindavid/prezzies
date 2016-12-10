$(function() {
  $('.first-category').click(function(obj) {
    var a = obj;
    alert(a);
  });

  $(document).ready(function() {
    $('#second-category-container').hide();
    $('#finish-button').hide();
    $('#categories-span').hide();
    $('#budget-span').hide();
  });
});
