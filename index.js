var row_number;
var clicks;
var amount_rows = 4;
var amount_squares = 4;
var all_colors;
var copy_all_colors;
var check_clicks = 0;
var right = 0;
var mode;


$(function(){
    init()
});

function init(){
    clicks = 0;
    all_colors = [];
    copy_all_colors = [];
    mode = 10;
    allColors();
    for (row_number = 0; row_number < amount_rows; row_number++ ){
        newRow()
    }
    mouseEvent();
    countClicks();
}

function newRow (){

    let div = document.createElement("div");
    let row = "row_" + row_number;
    div.id = row;
    div.className = "row";
    document.getElementById("playground").appendChild(div);

    for ( i = 0; i < amount_squares; i++) {
        createSquare(row, i)
    }

}

function createSquare (row, square_number){

    // first create square which will stay as border when turning the opacity on for the other squares
    let div = document.createElement("div");
    div.className = "outer";
    var square = row + square_number;
    div.id = square;
    div.style.border =  "2px solid black"
    document.getElementById(row).appendChild(div);

    // create square with a unique color
    div = document.createElement("div");
    div.className = "square";
    var square = row + "_" + square_number;
    div.id = square;
    div.style.position = "relative";
    div.style.left = "-7px";
    div.style.top = "-2px";
    div.style.background =  assignColor();
    div.style.opacity = 0.0;

    document.getElementById(row + square_number).appendChild(div);

}

function randomColor () {

    var rgb_values = [];
    // random 1-5 * 50 3 keer geven in rgb
    for (rgb = 1; rgb < 4; rgb++){
        var ran_multiplication = Math.floor(Math.random() * 6);
        let rgb_value = ran_multiplication * 50;
        rgb_values.push(rgb_value)
    }

    var rgb_color = "rgb(" + rgb_values[0] + "," + rgb_values[1] + "," + rgb_values[2] + ")";
    return rgb_color

}

// Creates all colors for all the squares
function allColors () {

    var amount_colors = (amount_rows * amount_squares) / 2;
    for (color_number = 0; color_number <  amount_colors; color_number++) {

        var new_color = randomColor();

        while (all_colors.includes(new_color)) {
            new_color = randomColor();
        }
        all_colors.push(new_color);
    }

    console.log(all_colors)

    copy_all_colors = all_colors.slice(0);
    var extra_colors = all_colors.length;

    for (color_number = 0; color_number < extra_colors; color_number++) {
        copy_all_colors.push(all_colors[color_number]);
    }
    return copy_all_colors
}

// Assigns color to square and then takes out that color
function assignColor () {

    var color_number = Math.floor(Math.random() * copy_all_colors.length);
    var square_color = copy_all_colors[color_number];
    copy_all_colors.splice(color_number, 1);
    return square_color
}

// All Mousevents
function mouseEvent() {
    var og_color;
    var og_color2;
    var square;
    var square2;
    var same;


    $( ".square" ).mousedown(function() {

        if (check_clicks == 0)
        {
            og_color = document.getElementById(this.id).style.background;
            square = document.getElementById(this.id).id;

            console.log(og_color);
            console.log(square);


            document.getElementById(this.id).style.opacity = 1

        }
        else
            {
                og_color2 = document.getElementById(this.id).style.background;
                square2 = document.getElementById(this.id).id;

                console.log(og_color2)
                console.log(square2);


                if (square == square2) {

                same = 1;

            } else
                {
                    document.getElementById(this.id).style.opacity = 1
                }

        }
    });

    $( ".square" ).mouseup(function() {
        if (check_clicks == 0)
        {
        //document.getElementById(square).style.background = og_color;
            document.getElementById("checkText").innerHTML = "Now pick a second square";
        check_clicks++
        }
        else {
            if (same > 0){
                document.getElementById("checkText").innerHTML = "Same Square Pick Another Square";
                same = 0
            } else {
                //document.getElementById(square2).style.background = og_color2;
                if(og_color == og_color2){
                    right++
                    if (right == all_colors.length){
                        document.getElementById("checkText").innerHTML = "Finished! Right " + right;

                    } else{
                        document.getElementById("checkText").innerHTML = "Right " + right;
                        $("#" + square).addClass("unclickable");
                        $("#" + square2).addClass("unclickable");
                    }


                }  else {
                    document.getElementById("checkText").innerHTML = "Wrong";
                    setTimeout(function (){turnWhite(square,square2)}, 500)
                }
                check_clicks = 0
            }
        }
    });
}

// counts amount of clicks the user has done
function countClicks (){
    $(".square" ).mousedown(function() {
        clicks++;
        document.getElementById("responseText").innerHTML = clicks + " clicks";
    })
}

// doesn't work yet
function turnWhite(square, square2){
    document.getElementById(square).style.opacity = 0
    document.getElementById(square2).style.opacity = 0
}

function changeMode (){

    if(mode == 10) {

        amount_rows = 10;
        amount_squares = 10;

        restart();

        mode = 100
    }
    else
        {
            amount_rows = 4;
            amount_squares = 4;

            restart();

            mode = 10;
    }
}

function restart (){

    document.getElementById("responseText").innerHTML = "";
    document.getElementById("checkText").innerHTML = "";

    $( ".square" ).remove();
    $( ".outer" ).remove();
    $( ".row" ).remove();

    $( "p" ).toggle();

    init()

}



// Mode ideas
// 1 player/2 player
// limit amount of clicks
// Unlockable esthetic changes circles