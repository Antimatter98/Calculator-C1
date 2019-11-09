const calc = document.querySelector('.calc-body');
const screen = calc.querySelector('.screen');
const screenIp = calc.querySelector('.screen-ip');
const buttons = calc.querySelector('.buttons');

var opKeyPressed = false;
var decKeyPressed = false;
var eqKeyPressed = false;

var numStack = [];
var opStack = [];

var prevCont="";

var stackPopulate = {
    fillStack: function(t){
        if(t === '+' || t === '-' || t === '*' || t === '/'){
            opStack.push(t);
        }
        else{
            numStack.push(parseFloat(t));
        }
    }
};

var calcOP = {
    calculate: function(){
        do{
            var opstk = opStack.pop();
            var a = numStack.pop();
            var b = numStack.pop();
            var tmp = 0;
            if(opstk === '+'){
                tmp = b + a;
            }
            else if(opstk === '-'){
                tmp = b - a;
            }
            else if(opstk === '*'){
                tmp = b * a;
            }
            else if(opstk === '/'){
                if(a > 0){
                    tmp = b / a;
                }
                else{
                    tmp = 0;
                }
            }
            numStack.push(tmp);
        }while(opStack.length != 0);
        if(numStack.length > 1){
            alert("Error!");
            screenHandler.clearDisplay();
        }
        else{
            screenHandler.opDisp(numStack[0]);
        }
        numStack = [];
        opStack = [];
    }
}

trackKey = {
    keyTrack: function(a, b, c){
        opKeyPressed = a
        decKeyPressed = b;
        eqKeyPressed = c;
    }
};

var screenHandler = {
    clearDisplay: function(){
        screen.textContent = "0";
        screenIp.textContent = "0";
    },
    opDisp: function(t){
        screen.textContent = t;
        //screenIp.textContent = ;
    },
    addContent: function(cont){
        const displayedCont = screen.textContent;
        const ipCont = screenIp.textContent;
        var tmp = screenIp.textContent;
        if(displayedCont === '0' || ipCont === '=' || opKeyPressed || decKeyPressed && cont != '.'){
            if(cont === '+' || cont === '-' || cont === '*' || cont === '/'){
                screen.textContent = '0';
                prevCont = "0";
            }
            else if(opKeyPressed){
                screen.textContent += cont;
                stackPopulate.fillStack(tmp);
                screenIp.textContent = cont;
                prevCont = cont;
            }
            else if(eqKeyPressed){
                screen.textContent += cont;
                //stackPopulate.fillStack(tmp);
                screenIp.textContent = cont;
                prevCont = cont;
            }
            else if(decKeyPressed){
                screen.textContent += cont;
                screenIp.textContent += cont;
                prevCont = cont;
            }
            else{
                screen.textContent = cont;
                //stackPopulate.fillStack(tmp);
                screenIp.textContent = cont;
                prevCont = cont;
            }
        }
        else{
            if((cont === '+' || cont === '-' || cont === '*' || cont === '/' || cont === '=') && (opKeyPressed)){
                ;
            }
            else if(cont === '.' && decKeyPressed){
                ;
            }
            else if(cont === '=' && eqKeyPressed){
                ;
            }
            else{
                if(cont === "." || decKeyPressed){
                    screenIp.textContent += cont;
                    prevCont = cont;
                }
                else if(cont === '+' || cont === '-' || cont === '*' || cont === '/' || cont === '='){
                    stackPopulate.fillStack(tmp);
                    screenIp.textContent = cont;
                    prevCont = cont;
                }
                else{
                    if(prevCont === '+' || prevCont === '-' || prevCont === '*' || prevCont === '/' || prevCont === '='){
                        //screenIp.textContent = "";
                        prevCont = cont;
                        stackPopulate.fillStack(tmp);
                        screenIp.textContent = cont;
                    }
                    else{
                        screenIp.textContent += cont;
                        prevCont = cont;
                    }
                }
                screen.textContent += cont;
            }
        }
    }
};

var keyHandler = {
    numKey: function(num){
        console.log("Num Key Pressed");
        screenHandler.addContent(num);
        trackKey.keyTrack(false, false, false);
    },
    opKey: function(op){
        console.log("op Key Pressed");
        screenHandler.addContent(op);
        trackKey.keyTrack(true, true, true);
    },
    clearKey: function(){
        screenHandler.clearDisplay();
        trackKey.keyTrack(false, false, false);
        numStack = [];
        opStack = [];
    },
    equalKey: function(eq){
        console.log("equal Key Pressed");
        screenHandler.addContent(eq);
        calcOP.calculate();
        trackKey.keyTrack(false, false, false);
    },
    decKey: function(dec){
        console.log("decimal key pressed");
        screenHandler.addContent(dec);
        trackKey.keyTrack(true, true, true);
    }
};

//exp: 95 + 1.2
//opar: + 
//numar: 95 1.2