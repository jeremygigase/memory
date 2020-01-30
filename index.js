var row_number;
var clicks = 0;
var amount_rows = 20;
var amount_squares = 15;

$(function(){

    for (row_number = 1; row_number < amount_rows; row_number++ ){
        newRow()
    }

    mouseEvent()
    countClicks()

});

function newRow (){

    let div = document.createElement("div");
    let row = "row_" + row_number;
    div.id = row;
    div.className = "row";
    document.getElementById("playground").appendChild(div);

    for ( i = 1; i < amount_squares; i++) {
        createSquare(row, i)
    }

}

function createSquare (row, square_number){

    let div = document.createElement("div");
    div.className = "square";
    div.id = row + "_" + square_number;
    div.style.background = randomColor();
    document.getElementById(row).appendChild(div);

}

function randomColor () {

    var rgb_values = []
    // random 1-5 * 50 3 keer geven in rgb
    for (rgb = 1; rgb < 4; rgb++){
        var ran_multiplication = Math.floor(Math.random() * 5);
        let rgb_value = ran_multiplication * 50
        rgb_values.push(rgb_value)
    }

    var rgb_color = "rgb(" + rgb_values[0] + "," + rgb_values[1] + "," + rgb_values[2] + ")";
    return rgb_color


}

function mouseEvent() {
    var og_color

    $( ".square" ).mousedown(function() {
        og_color = document.getElementById(this.id).style.background
        console.log(og_color)
        document.getElementById(this.id).style.background = "white";
        console.log(this.id)
    });

    $( ".square" ).mouseup(function() {
        document.getElementById(this.id).style.background = og_color;
    });
}

function countClicks (){
    $(".square" ).mousedown(function() {
        clicks++;
        console.log(clicks);
        document.getElementById("responseText").innerHTML = clicks + " clicks";
    })
}

// dus creer een array van 50 met verschillende kleuren eens 50 neem een ran getal van 1 tot 100 tweemaal
// neem de eerste kleur en geef dit de plaats van deze getalen check dit met de square id's for loop voor de kleuren
// id's squares eruit halen
// check if juist neem square vergelijk op kleur eens juist blijf op kleur staan

// EERST mode ideen 10; 20; 50; 100; var zetten op een manier want op 10 makkelijker nakijken of juist
// Estethische varianten 2 kolommen/ 5 kolommen etc