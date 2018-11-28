var main = function () {
    var addCommentFromInputBox = function () {
        var $newComment = $("<p>");
        if ($(".comment-input input").val() !== "") {
            $newComment.text($(".comment-input input").val());
            $newComment.hide();
            if ($(".tabs span.active").parent().is(":nth-child(1)")) {
                $(".comments").prepend($newComment);
            }
            else{
                $(".comments").append($newComment);
            }
            $newComment.fadeIn();
            contentComm.push($(".comment-input input").val());
            $(".comment-input input").val("");
        }
    };
   // $(".tabs a:nth-child(2) span").trigger("click");
    $(".comment-input button").on("click", function (event) {
        addCommentFromInputBox()
    })
    $(".comment-input input").on("keypress", function (event) {
        if (event.keyCode === 13) {
            addCommentFromInputBox()
        }
    });
    $(".comments p").on("click",function (event) {
        $(".comments p").fadeOut(1000, function () {
            $(".comments p").remove();
        });
    });
    var contentComm = [];
    $(".tabs span").toArray().forEach(function (element) {
        $(element).on("click", function() {
            var $element = $(element);
            $(".tabs span").removeClass("active");
            $(".tabs span").addClass("notActive");
            $element.removeClass("notActive");
            $element.addClass("active");
           // $(".tabs span").toggleClass("notActive");
            $("main .comments").empty();
            if ($element.parent().is(":nth-child(1)")) {
                for (var i=(contentComm.length-1); i >= 0; i-- ){
                    $(".comments").append($("<p>").text(contentComm[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                contentComm.forEach(function (txt) {
                    $(".comments").append($("<p>").text(txt));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("Щелчок на третьей вкладке!");
            }
            return false;
        });
    });
    $(".tabs a:nth-child(2) span").trigger("click");
};
$(document).ready(main);