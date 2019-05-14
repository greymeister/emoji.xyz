function getShortenedUrl() {
    var sourceUrl = $("#sourceUrl").val();
    if (!ValidUrl(sourceUrl)) {
        $("#urlInput").addClass("has-error");
    } else {
        $("#urlInput").removeClass("has-error");
        var request = $.ajax({
                url: "/shorten",
                type: "POST",
                data: JSON.stringify({"url": sourceUrl}),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            })
            .done(function (data) {
                var text = data.url;
                var link = data.link;
                $("#shortenedUrl").text(text);
                $("#urlDestination").attr("href", link);
                $("#urlDestination").css({"visibility": "visible"});
            });
    }
};

/**
 * From http://stackoverflow.com/a/8317014
 * Copyright (c) 2010-2013 Diego Perini, MIT licensed
 * https://gist.github.com/dperini/729294
 * see also https://mathiasbynens.be/demo/url-regex
 * modified to allow protocol-relative URLs
 * @return {boolean}
 */

function ValidUrl(str) {
    var valid =  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( str );
    return valid;
}
