var boardstate = new Array(9).fill(-1);
var settings = new Array(2).fill(-1);
var buttons = new Array(9);
var gameover = false;

function playermove(a){
    if(a < 1){
       return false; 
    }
    started = true;
    a--;
    var playermoves = 0;
    var cpumoves = 0;
    for (let i = 0; i < 9; i++) {
        if(boardstate[i] == 1){
            playermoves += 1;
        }else if(boardstate[i] == 0){
            cpumoves += 1;
        }
    }
    if(settings[1] == 0 && playermoves + 1 == cpumoves){
        boardstate[a] = 1;
        updateboard();
        analyzeboard();
    }else if(settings[1] == 1 && playermoves == cpumoves){
        boardstate[a] = 1;
        updateboard();
        analyzeboard();
    }else{
        console.log("another cheater huh?")
    }
    
}

function analyze(a){
    var inarow = 0;
    for (let i = 0; i < 9; i++) {
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
    for (let i = 0; i < 9; i += 3) {
        if(a == boardstate[i]){
            inarow += 1;
        }else{
            inarow = 0;
        }
        if(inarow == 3){
            return true;
        }
        
        if(8 > i && i > 5){
            
            inarow = 0;
            i -= 8;
        }
    }
    if(a == 1){
        if(boardstate[0] + boardstate[4] + boardstate[8] == 3 || boardstate[2] + boardstate[4] + boardstate[6] == 3){
            return true;
        }
    }else{
        if(boardstate[0] == 0 && boardstate[4] == 0 && boardstate[8] == 0){
            return true;
        }
        if(boardstate[2] == 0 && boardstate[4] == 0 && boardstate[6] == 0){
            return true;
        }
    }
    return false;
}

function planmove(a){
    var targethole = -1;
    var inarow = 0;
    var canfill = true;
    for (let i = 0; i < 9; i++) {
        if(i%3 == 0){
            inarow = 0;
            canfill = true;
        }
        if(boardstate[i] == a){
            inarow += 1;
        }else if(boardstate[i] != -1){
            canfill = false;
        }else{
            targethole = i;
        }
        if(inarow == 2 && canfill && (i+1)%3 == 0){
            return targethole;
        }
    }
    inarow = 0;
    for (let i = 0; i < 9; i += 3) {
        if(boardstate[i] == a){
            inarow += 1;
        }else if(boardstate[i] != -1){
            canfill = false;
        }else{
            targethole = i;
        }
        if(inarow == 2 && canfill && i > 5){
            return targethole;
        }
        if(8 > i && i > 5){
            inarow = 0;
            i -= 8;
            canfill = true;
        }
    }
    inarow = 0;
if(a == 0){
    for (let i = 0; i < 9; i += 4) { 
        if(boardstate[i] == -1){
            targethole = i;
            canfill = true;
        }else{
            if(boardstate[i] == 0){
                inarow += 1;
            }else{
                canfill = false;
            }
        }
    }
    if(inarow == 2 && canfill){
        return targethole;
    }
    inarow = 0;
    for (let i = 2; i < 7; i += 2) { 
        if(boardstate[i] == -1){
            targethole = i;
            canfill = true;
        }else{
            if(boardstate[i] == 0){
                inarow += 1;
            }else{
                canfill = false;
            }
        }
    }
    if(inarow == 2 && canfill){
        return targethole;
    }
    return -1;
}else{
    inarow = 0;
    for (let i = 0; i < 9; i += 4) { 
        if(boardstate[i] == -1){
            targethole = i;
            canfill = true;
        }else{
            if(boardstate[i] == 1){
                inarow += 1;
            }else{
                canfill = false;
            }
        }
    }
    if(inarow == 2 && canfill){
        return targethole;
    }
    inarow = 0;
    for (let i = 2; i < 7; i += 2) { 
        if(boardstate[i] == -1){
            targethole = i;
            canfill = true;
        }else{
            if(boardstate[i] == 1){
                inarow += 1;
            }else{
                canfill = false;
            }
        }
    }
    if(inarow == 2 && canfill){
        return targethole;
    }
        return programmedmoves(settings[0]);
    }
}

function programmedmoves(a){
    if(a < 2){
        var cur = -1;
        var largest = -1;
        for (let i = 0; i < 9; i++) {
            if(boardstate[i] == -1){
                var b = Math.random();
                if(b > largest){
                    cur = i;
                    largest = b;
                }
            }
        }
        return cur;
    }else{
        var movenum = 0;
        var goldenmove = 0;
        for (let i = 0; i < 9; i++) {
            if(boardstate[i] != -1){
                movenum += 1;
                if(boardstate[i] == 1){
                    goldenmove = i;
                }
            }
        }
        if(movenum >= 4){ 
            return programmedmoves(0);
        }else{
            if(settings[1] == 0){
                if(goldenmove%3 == 0){
                    if(goldenmove > 0){
                        return 2;
                    }else{
                        return 6;
                    }
                }else{
                    if(goldenmove > 2){
                        return 2;
                    }else{
                        return 8;
                    }
                }
            }else{
                if(movenum == 1){
                    if(goldenmove == 4){
                        return 0;
                    }else{
                        return 4;
                    }
                }else{
                    if(boardstate[4] == 1){
                        return 2;
                    }else{
                        var corners = 0;
                        var corner = 0;
                        if(boardstate[0] > 0){
                            corners += 1;
                            corner = 0;
                        }
                        if(boardstate[2] > 0){
                            corners += 1;
                            corner = 2;
                        }
                        if(boardstate[6] > 0){
                            corners += 1;
                            corner = 6;
                        }
                        if(boardstate[8] > 0){
                            corners += 1;
                            corner = 8;
                        }
                        if(corners == 2){
                            return 1;
                        }else if(corners == 1){
                            if(corner == 0){
                                if(boardstate[5] == -1){
                                    return 3;
                                }else{
                                    return 1;
                                }
                            }else if(corner == 2){
                                if(boardstate[3] == -1){
                                    return 5;
                                }else{
                                    return 1;
                                }
                            }else if(corner == 6){
                                if(boardstate[5] == -1){
                                    return 3;
                                }else{
                                    return 7;
                                }
                            }else{
                                if(boardstate[3] == -1){
                                    return 5;
                                }else{
                                    return 7;
                                }
                            }
                        }else{
                            var sides = -4;
                            if(boardstate[1] > 0){
                                sides += 1;
                            }
                            if(boardstate[3] > 0){
                                sides += 3;
                            }
                            if(boardstate[5] > 0){
                                sides += 5;
                            }
                            if(boardstate[7] > 0){
                                sides += 7;
                            }
                            if(sides == 4){
                                return 0;
                            }else{
                                return sides;
                            }
                        }
                    }
                }
            }
        }
    }
}





function analyzeboard(){
var c = 0;
    for (let i = 0; i < 9; i++) {
        if(boardstate[i] != -1){
            c++;
        }
    }
    if(c > 4){
        if(analyze(1)){
            gameover = true;
            won();
        }
    }
    if(c == 9){
        draw();
    }
    var move = -1;
    if(settings[0] == 0){
        move = programmedmoves(0);
    }else if(settings[0] == 1){
        move = planmove(1);
    }else if(settings[0] == 2){
        move = planmove(0);
        if(move == -1){
            move = planmove(1);
        }
    }else{
        console.log("Why try? Stop it; Get some help.");
    }
    if(move == -1){
        draw();
    }else{
        boardstate[move] = 0;
        if(analyze(0)){ 
            gameover = true;
            lost();
        }
        updateboard();
    }

    function won(){
        console.log("won");
    }

    function lost(){
        console.log("lost");
    }

    function draw(){
        console.log("draw");
    }
}

function updateboard(){
        for (let i = 0; i < 9; i++) {
        if(boardstate[i] == 0){
            if(settings[1] == 0){
                buttons[i].innerHTML = "X";
            }else{
                buttons[i].innerHTML = "O";
            }
            buttons[i].disabled = true;
        }else if(boardstate[i] == 1){
            if(settings[1] == 1){
                buttons[i].innerHTML = "X";
            }else{
                buttons[i].innerHTML = "O";
            }
            buttons[i].disabled = true;
        }else{
            buttons[i].innerHTML = "&#8205";
            buttons[i].disabled = false;
        }
        }
    if(gameover){
        disablebuttons();
    }
}

function initializeboard(){
    if(!buttons[0]){
        initialize();
    }
    if(settings[0] != -1 && settings[1] != -1){
        if(settings[1] == 0){
            boardstate[4] = 0;   
        }else{
            boardstate[4] = -1;
        }
        for (let i = 0; i < 9; i++) {
            buttons[i].disabled = false;
        }
        updateboard();
    }else{
        disablebuttons();
    }
}

function disablebuttons(){
    for (let i = 0; i < 9; i++) {
            buttons[i].disabled = true;
    }
}


function initialize(){
    buttons[0] = document.getElementById("button1");
    buttons[1] = document.getElementById("button2");
    buttons[2] = document.getElementById("button3");
    buttons[3] = document.getElementById("button4");
    buttons[4] = document.getElementById("button5");
    buttons[5] = document.getElementById("button6");
    buttons[6] = document.getElementById("button7");
    buttons[7] = document.getElementById("button8");
    buttons[8] = document.getElementById("button9");
}

var started = false;
function clicked(a) {
    playermove(a);
}

function difficultyswap(a){
    if(!started){
        settings[0] = a;
        initializeboard();
    }
}

function firstswap(a){
    if(!started){
        settings[1] = a;
        initializeboard();
    }
}

function restart(){
    started = false;
    gameover = false;
    for (let i = 0; i < 9; i++) {
        boardstate[i] = -1;
    }
    initializeboard();
}








