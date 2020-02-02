var row_number;
var clicks = 0;
var amount_rows = 2;
var amount_squares = 5;
var all_colors = [];
var copy_all_colors = [];
var check_clicks = 0;


$(function(){

    allColors();

    for (row_number = 0; row_number < amount_rows; row_number++ ){
        newRow()
    }

    mouseEvent();
    countClicks();

});

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

    let div = document.createElement("div");
    div.className = "square";
    var square = row + "_" + square_number;
    div.id = square;
    div.style.background =  assignColor(); //
    document.getElementById(row).appendChild(div);

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

function allColors () {

    var amount_colors = (amount_rows * amount_squares) / 2;
    for (color_number = 0; color_number <  amount_colors; color_number++) {

        var new_color = randomColor();
        console.log(new_color);

        while (all_colors.includes(new_color)) {
            new_color = randomColor();
            console.log(new_color)
        }
        all_colors.push(new_color);
    }

    console.log(all_colors)

    copy_all_colors = all_colors.slice(0);
    var extra_colors = all_colors.length;

    for (color_number = 0; color_number < extra_colors; color_number++) {
        copy_all_colors.push(all_colors[color_number]);
        // console.log(all_colors[color_number])
    }
    //console.log(copy_all_colors)
    return copy_all_colors
}

function assignColor () {

    var color_number = Math.floor(Math.random() * copy_all_colors.length);
    var square_color = copy_all_colors[color_number];
    copy_all_colors.splice(color_number, 1);
    return square_color
}

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


            document.getElementById(this.id).style.background = "white";

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
                    document.getElementById(this.id).style.background = "white";

                    if(og_color == og_color2){
                        document.getElementById("checkText").innerHTML = "Right";
                    }  else {
                        document.getElementById("checkText").innerHTML = "Wrong";
                    }
                }

        }
    });

    $( ".square" ).mouseup(function() {
        if (check_clicks == 0)
        {
        document.getElementById(square).style.background = og_color;
            document.getElementById("checkText").innerHTML = "Now pick a second square";
        check_clicks++
        }
        else {
            if (same > 0){
                document.getElementById("checkText").innerHTML = "Same Square Pick Another Square";
                same = 0
            } else {
                document.getElementById(square2).style.background = og_color2;
                check_clicks = 0
            }
        }
    });
}

function countClicks (){
    $(".square" ).mousedown(function() {
        clicks++;
        document.getElementById("responseText").innerHTML = clicks + " clicks";
    })
}



// check if juist neem square vergelijk op kleur eens juist blijf op kleur staan


// EERST mode ideen 10; 20; 50; 100; var zetten op een manier want op 10 makkelijker nakijken of juist
// Amount of clicks max
// Estethische varianten 2 kolommen/ 5 kolommen etc