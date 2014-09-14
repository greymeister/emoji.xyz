function getShortenedUrl() {
  var sourceUrl = $("#sourceUrl").val();
  if(!ValidUrl(sourceUrl)) {
    $("#urlInput").addClass( "has-error" );
  } else {
    $("#urlInput").removeClass( "has-error" );
    var request = $.ajax({
      url: "/shorten?url=" + sourceUrl
    })
    .done(function(data) {
      var url = data.shortUrl;
      var link = data.link;
      $("#shortenedUrl").text(url);
      $("#urlDestination").attr("href", link);
      $("#urlDestination").css({ "visibility": "visible"});
    });
  }
};

function ValidUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}
