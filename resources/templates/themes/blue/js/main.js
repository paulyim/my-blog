$("#cpyear").text(new Date().getFullYear());

$("#menu").children().each(
    function() {
        var location = window.location.pathname;
        var href = $(this).children().first().attr("href");
        if (location.indexOf(href) > -1)
            $(this).addClass("selected");
        else
            $(this).removeClass("selected");
    });

new Headroom(document.querySelector(".navbar-fixed-top"), {
    "offset": 205,
    "tolerance": 5,
    "classes": {
        "initial": "headroom",
        "pinned": "headroom--pinned",
        "unpinned": "headroom--unpinned"
    }
}).init();