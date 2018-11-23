var main = function () {
    $(".comment-input button").on("click", function (event) {
       var $newComment = $("<p>");
       $newComment.text($(".comment-input input").val());
        $(".comments").append($newComment);
    });
};
$(document).ready(main);