$(function() {
  $('#surprise-me-button').click(function(){
    $('#loader').show();
    $('#recommendation-part').hide();
    var numOfPeople = $('#person-num-select').val();
    var budget = $('#budget-select').val();
    var ageGroup = ["man", "woman","teen","kid8","kid4","toddler", "baby"];
    var interest = ["arts-and-design","books", "music","reading","travel", "style-and-fashion"];
    var selectedAgeGroup = ageGroup[Math.floor(Math.random() * 7)];
    var selectedInterest = interest[Math.floor(Math.random() * 6)];
    var amazonUrl = "https://www.amazon.com/gp/gift-finder?ageGroup=" + selectedAgeGroup + "&budgets=" + budget + "&interest=" + selectedInterest;
    amazonUrl += ""
    var diffBotUrl = "http://api.diffbot.com/v3/AmazonGifts?token=28b8a52cd5034bb1446ab8cdc7f318eb&url=" + encodeURIComponent(amazonUrl);
    var deffereds = [];
    var products = [];
    $(".age-select").select2("val",selectedAgeGroup); 
    
    $.get(diffBotUrl, function(data) {
      var items = data.objects[0].items;
      $('#recommendation-part').show();
      for (var i = 0; i < numOfPeople; i++) {
        var product = getProductDetail(items[i].links);
        products.push(product);
        var recipientId = "#recipient" + i;
        $(recipientId).show();
        $(recipientId + " .product-img").attr('src', product.imageUrl);
        $(recipientId + " .product-title").text(product.title);
        $(recipientId + " .product-price").text(product.price);
        $(recipientId + " .product-description").text(product.text);
        $(recipientId + " .product-link").attr("href", product.link);
      }
      $('#loader').hide();
      localStorage.setItem('products', JSON.stringify(products));
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
    setTimeout(function() {
      window.location.replace('/checkout-success');
    }, 5000)
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
        product.link = data.objects[0].pageUrl;
      }
    });
    return product;
  }

  function constructCheckoutPage() {
    var products = JSON.parse(localStorage.getItem('products'));
    var total = 0;
    for (var i = 0; i < products.length; i++) {
      var recipientId = "#recipient" + i;
      $(recipientId + " .product-img").attr('src', products[i].imageUrl);
      $(recipientId + " .product-title").text(products[i].title);
      $(recipientId + " .product-price").text(products[i].price);
      total += Number.parseFloat(products[i].price.substr(1));
      $('#total-span').text(total.toFixed(2));
      $(recipientId).show();
    }
  }

  function constructCheckoutSuccessPage() {
    var randomNumber = Math.floor(Math.random()*89999999+10000000);
    $('#receipt-number').text(randomNumber);
  }

  $(document).ready(function() {
    $('#loader').hide();
    $('.recipient').hide();

    if (location.pathname === "/checkout") {
      constructCheckoutPage();
    }

    if (location.pathname === "/checkout-success") {
      constructCheckoutSuccessPage()
    }
  });

});
