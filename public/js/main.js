$(function() {
 

  $('#surprise-me-button').click(function(){
    var numOfPeople = $('#person-num-select').val();
    var budget = $('#budget-select').val();
    var url = "http://api.diffbot.com/v3/AmazonGifts?token=28b8a52cd5034bb1446ab8cdc7f318eb&url=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fgift-finder%3FageGroup%3Dkid8";
    // $.get(url, function(data) {
    //   var items = data.objects[0].items;
    //   alext()
    // });
    $('#loader').show();
    setTimeout(function(){ 
      $('#recommendation-part').show();
    $('#loader').hide(); 
    }, 3000);
    
  });

  $(document).ready(function() {
    //$('#recommendation-part').hide();
    $('#loader').hide();
  });


});
