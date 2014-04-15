// and so begins the mess that is this script.
// this is the main container function that executes when the page is loaded.
$(document).ready(function() {

// the sorting magic happens here
    $("ul").sortable();

// the two methods by which items get added to the DOM
    $("#add-it-on").on("click", addemon);
    $(document).keypress(function(e){
        if (e.which == 13) addemon();
    });

// the buckets with some code to make sure the
// infos arent messing up
    $("#bucket").mouseenter(function(){
        $("#bucket").hide();
        $("#infolight").hide();
        $("#info").show();
        $("#happybucket").show();
    });
    $("#happybucket").mouseleave(bucketshow);

// the burn button at the bottom
    $("#burn-list").on("click", function(){
        $("li").remove();
    });
});

// this is the script that runs when enter is pressed
// or when the add button is clicked
function addemon(){

// start by setting variables equal to the input fields and start
// running the tests to make sure proper values are being passed
    var item = $("#item").val(),
    qty = $("#qty").val(),
    qtyCheck = $.isNumeric(qty);
    if (item === null || item === ""){
        return;
    }
// if the values from the input fields pass the checks add
// a new item to the top of the list with the values entered
    else {
        $("ul").prepend('<li><div><a href="#" class="doesnothing"><img src="tiny-flame.png" alt="" class="shiver" /><font class="item">'+item+'</font><font class="qty">'+qty+'</font></a></div></li>');

// resets the input fields to empty strings and focuses the
// cursor to the item field
        $("#item").val("");
        $("#qty").val("");
        $("#item").focus();

// unbinds all previous event watchers on the list items, then
// creates new ones that strikethrough and unstrike items
// and highlights or unhighlights them
        $("img.shiver").unbind("mousedown");
        $("li").unbind("mousedown");
        $("img.shiver").mousedown(function(){
            if($(this).hasClass('strikeout')){
                $(this).removeClass('strikeout');
            }else{
                $(this).addClass('strikeout');
            }
        });
       $("#happybucket").unbind("mousedown");
        $("#happybucket").mousedown(excitedbucket);
/*        $("li").mousedown(function() {
            $("li").unbind("mouseleave");
            if ($(this).hasClass("highlit")) $(this).removeClass("highlit");
            else {
                $(".highlit").removeClass("highlit");
                $(this).addClass("highlit");

// this is where a highlighted item can be removed by clicking the bucket
                $("#happybucket").mouseup(function(){
                    $(".highlit").remove();
                    $("#bucket").hide();
                    $("#happybucket").show();
                    $("#excitedbucket").hide();
                });
            }
            $("#bucket").show();
            $("#happybucket").hide();
            $("#excitedbucket").hide();
        });
*/

// prevents defaulting to the top of the page when an item is
// stricken out
    $("a.doesnothing").click(function(event){event.preventDefault();});
}

// this is the functionallity for clicking bucket then clicking
// a list item for removal - in progress
function excitedbucket(){
    $("#happybucket").unbind("mouseleave");
    $("#happybucket").hide();
    $("#bucket").hide();
    $("#excitedbucket").show();
    $("li").unbind("mouseleave");
    $("li").mouseleave(function(){
        $(".highlit").removeClass("highlit");
        $("body").mousedown(function(){
            $("#bucket").show();
            $("#happybucket").hide();
            $("#excitedbucket").hide();
            $("li").unbind("mouseenter");
        });
    });
    $("li").unbind("mouseenter");
    $("li").mouseenter(function(){
        $(this).addClass("highlit");
        $(".highlit").unbind("mousedown");
        $(".highlit").mousedown(function(){
            $(".highlit").remove();
            bucketshow();
            $("li").unbind("mouseenter");
        });
    });
    $("#happybucket").mouseleave("bucketshow");
}
function bucketshow(){
        $("#bucket").show();
        $("#happybucket").hide();
        $("#excitedbucket").hide();
    }