$(function() {
 

  $('#surprise-me-button').click(function(){
    $('#loader').show();
    $('#recommendation-part').hide();
    var numOfPeople = $('#person-num-select').val();
    var budget = $('#budget-select').val();
    var amazonUrl = "https://www.amazon.com/gp/gift-finder?ageGroup=man&budgets=" + budget;
    var diffBotUrl = "http://api.diffbot.com/v3/AmazonGifts?token=28b8a52cd5034bb1446ab8cdc7f318eb&url=" + encodeURIComponent(amazonUrl);
    var deffereds = [];
    var products = [];
    
    $.get(diffBotUrl, function(data) {
      var items = data.objects[0].items;
      $('#recommendation-part').show();
      for (var i = 0; i < numOfPeople; i++) {
        var product = getProductDetail(items[i].links);
        var recipientId = "#recipient" + i;
        $(recipientId).show();
        $(recipientId + " .product-img").attr('src', product.imageUrl);
        $(recipientId + " .product-title").text(product.title);
        $(recipientId + " .product-price").text(product.price);
        $(recipientId + " .product-description").text(product.text);
      }
      $('#loader').hide();
    });
  });

  $('#order-button').click(function(){
    $('#loader').show();
    window.location.replace('/checkout');
  });

  $('#cancel-button').click(function() {
    window.location.replace('/');
  });

  $('#restart-button').click(function() {
    window.location.replace('/');
  });

  $('#submit-order-button').click(function(){
    $('#loader').show();
    window.location.replace('/checkout-success');
  });

  function getProductDetail(url) {
    var diffBotUrl = "http://api.diffbot.com/v3/product?token=28b8a52cd5034bb1446ab8cdc7f318eb&url=" + encodeURIComponent(url);
    product = {};
    $.ajax({
      url: diffBotUrl,
      dataType: 'json',
      async: false,
      success: function(data) {
        product.imageUrl = data.objects[0].images[0].url;
        product.title = data.objects[0].title;
        product.text = data.objects[0].text;
        product.price = data.objects[0].offerPrice;
      }
    });
    return product;
  }

  $(document).ready(function() {
    $('#recommendation-part').hide();
    $('#loader').hide();
    $('.recipient').hide();
  });

});
