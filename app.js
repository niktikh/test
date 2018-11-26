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
    };
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
    var toDos = [
        "Закончить писать эту книгу",
        "Вывести Грейси на прогулку в парк",
        "Ответить на электронные письма",
        "Подготовиться к лекции в понедельник",
        "Обновить несколько новых задач",
        "Купить продукты"
    ];
    //... все остальное, относящееся к вкладкам


    $(".tabs span").toArray().forEach(function (element) {
        $(element).on("click", function() {
            var $element = $(element);
            // $cont;
            $(".tabs span").removeClass("active");
            $element.addClass("active");
            $("main .comments").empty();
            if ($element.parent().is(":nth-child(1)")) {
                console.log("Щелчок на первой вкладке!");
            } else if ($element.parent().is(":nth-child(2)")) {
                // $cont=$("p");
                toDos.forEach(function (TODO) {
                    $(".comments").append($("<p>").text(TODO));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("Щелчок на третьей вкладке!");
            }
            return false;
        });
    });
};
$(document).ready(main);