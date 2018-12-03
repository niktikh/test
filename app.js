var main = function (objs) {
    var contentComm = objs.map(function(ob){
        return ob.description;
    });
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
          //  $tags = $(".comment-input input.tags").val().split(",");
            objs.push({description:$(".comment-input input.desc").val(), tags:$(".comment-input input.tags").val().split(",")});
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
    $(".tabs span").toArray().forEach(function (element) {
        $(element).on("click", function() {
            var $element = $(element);
            $(".tabs span").removeClass("active");
            $(".tabs span").addClass("notActive");
            $element.removeClass("notActive");
            $element.addClass("active");
            $("main .comments").empty();
            $("main .comment-input").hide();
            if ($element.parent().is(":nth-child(1)")) {
                for (var i=(contentComm.length-1); i >= 0; i-- ){
                    $(".comments").append($("<p>").text(contentComm[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                contentComm.forEach(function (txt) {
                    $(".comments").append($("<p>").text(txt));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("Щелчок на tags!");
                var orgByTag = makeOrgByTags(objs);
                orgByTag.forEach(function (tagobj){
                   var $tagname = $("<h3>").text(tagobj.name);
                   var $contenttag = $("<ul>");
                   tagobj.desc.forEach(function (desctxt) {
                       var $li = $("<li>").text(desctxt);
                       $contenttag.append($li);
                   });
                   $("main .comments").append($tagname);
                   $("main .comments").append($contenttag);
                });
            } else if ($element.parent().is(":nth-child(4)")) {
                $("main .comment-input").fadeIn();
            }
            return false;
        });
    });


    var makeOrgByTags  = function (massobjtodo){
        var tags = [];
        massobjtodo.forEach(function (objtodo){
            objtodo.tags.forEach(function (tag) {
                if (checkmass(tags,tag)) {
                    tags.push({name:tag,desc:[objtodo.description]});
                }
                else {
                    AddDesc(tags,tag,objtodo.description);
                }
            });
        });
        return tags;
    };

    var checkmass  = function (mass,tagname){
        var bool = true
        mass.forEach(function (objinmass) {
            if (tagname == objinmass.name) {
                bool = false;
            }
        });
        return bool;
    };

    var AddDesc = function (newmass,tagname,descthe){
        newmass.forEach(function (obj) {
            if (obj.name == tagname){
                obj.desc.push(descthe);
            }
        });
    };

    $(".tabs a:nth-child(2) span").trigger("click");
    $.getJSON("cards/ace.json", function (card) {
        // вводим карту в консоль
        console.log(card);
    });
};
$(document).ready(function(){
    $.getJSON("cards/ace.json",function(obj){
        main(obj)
    });
});