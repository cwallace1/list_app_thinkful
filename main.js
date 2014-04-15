// and so begins the mess that is this script.
// this is the main container function that executes when the page is loaded.
$(document).ready(function() {

// this is where the script checks if a list item is being clicked or
// dragged, and reacts accordingly - in progress
/*    var isDragging = false;
    $("li").mousedown(function() {
        $(window).mousemove(function() {
            isDragging = true;
            $(window).unbind("mousemove");
        });
    })
    .mouseup(function() {
        var wasDragging = isDragging;
        isDragging = false;
        $(window).unbind("mousemove");
    });*/

// the sorting magic happens here
    $("ul").sortable();

// the two methods by which items get added to the DOM
    $("#add-it-on").on("click", addemon);
    $(document).keypress(function(e){
        if (e.which == 13) addemon();
    });

// the info button with some code to make sure
// the buckets arent messing up
    $("#info").mouseenter(function(){
        $("#info").hide();
        $("#infolight").show();
        $("#bucket").show();
        $("#happybucket").hide();
    });
    $("#infolight").unbind("mouseleave");
    $("#infolight").mouseleave(function(){
        $("#info").show();
        $("#infolight").hide();
    });

// the buckets with some code to make sure the
// infos arent messing up
    $("#bucket").mouseenter(function(){
        $("#bucket").hide();
        $("#infolight").hide();
        $("#info").show();
        $("#happybucket").show();
    });
    $("#happybucket").mouseleave(function(){
        $("#bucket").show();
        $("#happybucket").hide();
    });
    //$("#happybucket").mousedown(excitedbucket);

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
        alert("Please Enter Something Here Before Adding to the Burn Pile.");
        $("#item").focus();
    }
    else if (qty === null) {
        alert("Please Enter a Quantinty to Burn.");
        $("#qty").focus();
}
    else if (qtyCheck !== true) {
        alert("Please Enter a Number.");
        $("#qty").focus(selection());
    }
    else if (qty.length>4) {
        alert("Do You Really Need that Many?");
        $("#qty").focus(selection());}

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
        $("li").mousedown(function() {
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

// unbinds all previous event watchers on the text fields, then
// creates new ones that allow users to change values
        $(".item").unbind("dblclick");
        $(".item").dblclick(changemeitem);
        $(".qty").unbind("dblclick");
        $(".qty").dblclick(changemeqty);
    }

// prevents defaulting to the top of the page when an item is
// stricken out
    $("a.doesnothing").click(function(event){event.preventDefault();});
}

// this is the function to actually change the item
function changemeitem() {
    var change = prompt("What Should this Say?");
     if (change === null || change === "") alert("Try Typing Something In Next Time.");
     else $(this).text(change);
}

// this is the function to actually change the quantity
function changemeqty() {
    var change = prompt("How Many did You Mean?"),
        qtyCheck = $.isNumeric(change);
    if (change === null || qtyCheck !== true) alert("Maybe if You Used a Number?");
   else $(this).text(change);
}

// little guy to select the quantity field during the value test
function selection(){
    $("#qty").select();
}

// this is the functionallity for clicking bucket then clicking
// a list item for removal - in progress
/*function excitedbucket(){
    $(this).unbind("mouseleave");
    $("#happybucket").hide();
    $("#bucket").hide();
    $("#excitedbucket").show();
    $("li").mouseenter(function(){
        $(this).addClass("highlit");
        $(".highlit").unbind("mousedown");
        $(".highlit").mousedown(function(){
            $(".highlit").remove();
            $("#bucket").show();
            $("#happybucket").hide();
            $("#excitedbucket").hide();
            $("li").unbind("mouseenter");
        });
    });
    $("li").mouseleave(function(){
        $(".highlit").removeClass("highlit");
        $("body").mousedown(function(){
            $("#bucket").show();
            $("#happybucket").hide();
            $("#excitedbucket").hide();
        });
    });
}*/