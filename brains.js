var boardstate = new Array(9).fill(-1);
var settings = new Array(2).fill(-1);
var buttons = new Array(9);
var gameover = false;
var buffering = false;
var buffering2 = false;
function playermove(a){
    if(!buffering){
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
        console.log("another cheater huh?");
    }
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
            updateboard();
            won();
        }
    }
    if(c == 9){
        draw();
    }
    buffering = true;
    setTimeout(() => {
        buffering = false;
        if(!gameover){
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
        }
        
            boardstate[move] = 0;
            updateboard();
            if(analyze(0)){ 
                gameover = true;
                updateboard();
                lost();
            }else if(c == 8){
                draw();
            }
            
        }
        
    }, 500);

    function won(){
        document.getElementById("layer3").children[0].textContent = "You Won!";
        fadecycle();
    }

    function lost(){
        document.getElementById("layer3").children[0].textContent = "You lost.";
        fadecycle();
    }

    function draw(){
        document.getElementById("layer3").children[0].textContent = "It's a draw.";
        fadecycle();
    }
}

function updateboard(){
        for (let i = 0; i < 9; i++) {
        if(boardstate[i] == 0){
            if(settings[1] == 0){
                buttons[i].children[0].children[2].children[0].children[0].textContent = "X";
                initiatemove(0, buttons[i]);
            }else{
                buttons[i].children[0].children[2].children[0].children[0].textContent = "O";
                initiatemove(0, buttons[i]);
            }
            buttons[i].disabled = true;
        }else if(boardstate[i] == 1){
            if(settings[1] == 1){
                buttons[i].children[0].children[0].children[0].children[0].textContent = "X";
                initiatemove(1, buttons[i]);
            }else{
                buttons[i].children[0].children[0].children[0].children[0].textContent = "O";
                initiatemove(1, buttons[i]);
            }
            buttons[i].disabled = true;
        }else{
            initiatemove(-1, buttons[i]);
            buttons[i].disabled = false;
        }
        }
    if(gameover || settings[0] == -1 || settings[1] == -1 ){
        disablebuttons();
    }
}

function initializeboard(){
    
        if(settings[1] == 0){
            boardstate[4] = 0;   
        }else{
            boardstate[4] = -1;
        }
        for (let i = 0; i < 9; i++) {
            buttons[i].disabled = false;
        }
    
    updateboard();
}

function disablebuttons(){
    for (let i = 0; i < 9; i++) {
            buttons[i].style.backgroundColor = "#48A148";
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
    if(a > -1){
        document.getElementById("difdefault").hidden = true;
        document.getElementById("difdefault1").hidden = false;
    }
    if(!started){
        settings[0] = a;
        initializeboard();
    }
}

function firstswap(a){
    if(a > -1){
        document.getElementById("firstdefault").hidden = true;
        document.getElementById("firstdefault1").hidden = false;
    }
    if(!started){
        settings[1] = a;
        initializeboard();
    }
}

function restart(){
    if(!buttons[0]){
        initialize();
    }
    if(!buffering){
        document.getElementById("layer3").style.opacity = 0;
        restarting(true);
        buffering = true;
        setTimeout(() => {
            buffering = false;
        started = false;
        gameover = false;
        for (let i = 0; i < 9; i++) {
        boardstate[i] = -1;
     }
    updateboard();
    setTimeout(() => {
        document.getElementById("layer3").style.opacity = 0;
        firstswap(document.getElementById("first").options[document.getElementById("first").selectedIndex].value);
        difficultyswap(document.getElementById("difficulty").options[document.getElementById("difficulty").selectedIndex].value);
        initializeboard();
    }, 750);
    
        }, 500);
    }else{
        if(!buffering2){
            document.getElementById("layer3").style.opacity = 0;
            buffering2 = true;
            restarting(false);
        }
        
    }
    
    
}

function initiatemove(a, b){
    if(a == 0){
        b.style.backgroundColor = "#48A148";
        b.children[0].style.transform = "translateY(-182px)";
    }else if(a == 1){
        b.style.backgroundColor = "#48A148";
        b.children[0].style.transform = "translateY(182px)";
    }else{
        b.style.backgroundColor = "#21dc62";
        b.children[0].style.transform = "translateY(0px)";
    }
}

function restarting(a){
    if(a){
        document.getElementById("layer3").children[0].textContent = "Restarting...";
        fadecycle(0);
    }else{
        document.getElementById("layer3").children[0].textContent = "Please wait.";
        fadecycle(0);
        buffering2 = false;
    }
}

function fadecycle(c){
    if(!buffering && !buffering2){
        var a = document.getElementById("layer3");
    var b = 0;  
    let intervalID = setInterval(fadein, 50); 
    function fadein() {
        if (b < 1) { 
            b += 0.05;
            a.style.opacity = b;
        } else {
            clearInterval(intervalID);
        }
    }
    if(c == 0){
       setTimeout(() => {
        a.style.opacity = 0;
        }, 2000); 
    }
    }
    
    
}




