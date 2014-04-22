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

/* delete these 3 when testing placeholders are removed
    stricken();
    anchorDefault();
    dblClicking();*/

// sets the bucket and info actions when the page is done loading
    delegation();
    infos();

// the sorting magic happens here
    $("ul").sortable();

// the two methods by which items get added to the DOM
    $("#add-it-on").on("click", addemon);
    $(document).keypress(function(e){
        if (e.which == 13) addemon();
    });

// the burn button at the bottom
    $("#burn-list").on("click", function(){
        $("li").remove();
    });


// highlights or unhighlights the items as they are
// clicked and presets the flag for bucket use
    $("ul").delegate("li", "mousedown", (function() {
        $("li").unbind("mouseleave");
        if ($(this).hasClass("highlit")) {
            $(this).removeClass("highlit");
            flag = false;
        }
        else {
            $(".highlit").removeClass("highlit");
            $(this).addClass("highlit");
            flag = true;
        }
    }));
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
    else if (!qtyCheck) {
        alert("Please Enter a Number.");
        $("#qty").focus(selection());
    }
    else if (qty.length>4) {
        alert("Do You Really Need that Many?");
        $("#qty").focus(selection());}

// if the values from the input fields pass the checks, adds
// a new item to the top of the list with the values entered
    else {
        $("ul").prepend('<li><div><a href="#" class="doesnothing"><img src="tiny-flame.png" alt="" class="shiver" /><font class="item">'+item+'</font><font class="qty">'+qty+'</font></a></div></li>');

// resets the input fields to empty strings and focuses the
// cursor to the item field
        $("#item").val("");
        $("#qty").val("");
        $("#item").focus();
    }
// call in these assorted functions when a new item is added
// to refresh eventHandlers
    stricken();
    anchorDefault();
    dblClicking();
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
   if (change === null || change === "") alert("Try Typing Something In Next Time.");
   else if (!qtyCheck) alert("Maybe if You Used a Number?");
   else $(this).text(change);
}

// little guy to select the quantity field during the value test
function selection(){
    $("#qty").select();
}

// bucket getting happy on hover
function bucketAction(){
    if (!exciteFlag) {
        $("#bucket").attr("src", "happybucket.png");
    }
}

function bucketUnaction(){
    if (!exciteFlag) {
        $("#bucket").attr("src", "bucket.png");
    }
}

// this will force excitement!
function bucketClicked(){
    $("#bucket").attr("src", "excitedbucket.png");
// this is where an item can be removed after clicking the bucket
    if (!flag){
        $("body").addClass("excitement");
        exciteFlag = true;
        $("li").addClass("half-highlit");
        $("body").unbind();
        $("body").delegate(".alluvit","mouseup",function(){
            if ($("body").hasClass("excitement") ){
                $(".highlit").remove();
                $("li").removeClass("half-highlit");
                $(".excitement").removeClass("excitement");
                flag = false;
                exciteFlag = false;
                bucketUnaction();
                return;
            }
        });
    }
// this is where a highlighted item can be removed by clicking the bucket
    else {
        $("#bucket").unbind("mouseup");
        $("#bucket").mouseup(function(){
            $(".highlit").remove();
            bucketAction();
            flag = false;
            exciteFlag = false;
            delegation();
            return;
        });
    }
}

// info button lighting up on hover
function infoAction(){
    $("#info").attr("src","info-light.png");
}

function infoUnaction(){
    $("#info").attr("src","info.png");
}

// prevents defaulting to the top of the page when an item is
// stricken out
function anchorDefault(){
    $("a.doesnothing").unbind("click");
    $("a.doesnothing").click(function(event){event.preventDefault();});
}

// strikes through and unstrikes items as flame is
// clicked
function stricken(){
    $("img.shiver").unbind("mousedown");
    $("img.shiver").mousedown(function(){
        if($(this).hasClass('strikeout')){
            $(this).removeClass('strikeout');
        }else{
            $(this).addClass('strikeout');
        }
    });
}

// unbinds all previous event watchers on the text fields, then
// creates new ones that allow users to change values
function dblClicking(){
    $(".item").unbind("dblclick");
    $(".item").dblclick(changemeitem);
    $(".qty").unbind("dblclick");
    $(".qty").dblclick(changemeqty);
}
function delegation(){
    $("#bucket").unbind();
    $(".sidebar").delegate("#bucket", "mousedown", (bucketClicked));
    $(".sidebar").delegate("#bucket", "mouseenter", (bucketAction));
    $(".sidebar").delegate("#bucket", "mouseleave", (bucketUnaction));
}
function infos(){
    $("#info").unbind();
    $(".sidebar").delegate("#info", "mouseenter", (infoAction));
    $(".sidebar").delegate("#info", "mouseleave", (infoUnaction));
}
// variables for bucket states
var flag = false,
    exciteFlag = false;