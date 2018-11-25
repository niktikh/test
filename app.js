var main = function () {
    var addCommentFromInputBox = function () {
        var $newComment = $("<p>");
        if ($(".comment-input input").val() !== "") {
            $newComment.text($(".comment-input input").val());
            $newComment.hide();
            $(".comments").append($newComment);
            $newComment.fadeIn();
            $(".comment-input input").val("");
        }
    }
    $(".comment-input button").on("click", function (event) {
        addCommentFromInputBox()
    })
    $(".comment-input input").on("keypress", function (event) {
        if (event.keyCode === 13) {
            addCommentFromInputBox()
        }
    })
}
$(document).ready(main);