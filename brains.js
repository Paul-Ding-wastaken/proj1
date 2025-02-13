var boardstate = new Array(9).fill(-1);
var settings = new Array(2).fill(-1); //
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");
var button5 = document.getElementById("button5");
var button6 = document.getElementById("button6");
var button7 = document.getElementById("button7");
var button8 = document.getElementById("button8");
var button9 = document.getElementById("button9");


function playermove(a){
    var playermoves = 0;
    var cpumoves = 0;
    for(let i = 0; i < 9; i++){
        if(boardstate[i] == 1){
            playermoves += 1;
        }else if(boardstate[i] == 0){
            cpumoves += 1;
        }
    }
    if(settings[1] == 0 && playermoves == cpumoves){
        boardstate[a] = 1;
        analyzeboard();
    }else if(settings[1] == 1 && playermoves + 1 == cpumoves){
        boardstate[a] = 1;
        analyzeboard();
    }else{
        console.log("another cheater huh?")
    }
    
}



function analyze(a){ //check boardstate for a given side (0/1)
    var inarow = 0;
    for(let i = 0; i < 9; i++){ //check hori
        if(a != boardstate[i] || i%3 == 0){
            inarow = 0;
        }
        if(boardstate[i] == a){
            inarow += 1;  
        }
        if(inarow == 3){
            return true;
        }
    }
    inarow = 0;
    for(let i = 0; i < 9; i += 3){ //check ver
        if(a == boardstate[i]){
            inarow += 1;
        }else{
            inarow = 0;
        }
        if(inarow == 3){
            return true;
        }
        if(i > 5){
            inarow = 0;
            i -= 8;
        }
    }

    if(boardstate[0] + boardstate[4] + boardstate[8] == 3 || boardstate[2] + boardstate[4] + boardstate[6] == 3){
        return true;
    }
    return false;
}








function analyzeboard(){
// is it move 5?
var c = 0;
    for(let i = 0; i < 9; i++){
        if(boardstate != -1){
            c++;
        }
    }
    if(c > 4){ //check player win
        if(analyze(1)){
            won();
        }
    }
    
    
    // pick a spot depending on level
    if(settings[0] == 0){
        if(analyze(0)){
            lost();
        }
    }else if(settings[0] == 1){
    
    }else if(settings[0] == 2){
    var move = -1;
    var couldwin = -1;
    //the regret of not using a 2D matrix sets in :skull

    }else{
        // impossibility. the person is using console commands
        console.log("Why try? Stop it; Get some help.");
    }

    if(d){

    }

    function won(){
        console.log("won");
    }
    
    function lost(){
        console.log("lost");
    }
}

function updateboard(){
    if(settings[0] != -1 && settings[1] != -1){
        if(settings[1] == 0){
            boardstate[4] = 0;   
        }
    }else{
        console.log("checkpoint1");
        button1.disabled = true;
        button2.disabled = true;
        button3.disabled = true;
        button4.disabled = true;
        button5.disabled = true;
        button6.disabled = true;
        button7.disabled = true;
        button8.disabled = true;
        button9.disabled = true;
    }
}


















//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//WEBSITE FUNCTIONS FROM HERE 
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
document.getElementById("difficulty").onchange = difficultyswap;
document.getElementById("first").onchange = firstswap;


var started = false;
function click(a){
    playermove(a);
}

function difficultyswap(){
    console.log("checkpoint2");
    if(!started){
        settings[1] = document.getElementById("difficulty");
    }
}

function firstswap(){
    if(!started){
        settings[1] = document.getElementById("first");
    }
}
