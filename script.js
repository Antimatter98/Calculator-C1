const calc = document.querySelector('.calc-body');
const screen = calc.querySelector('.screen');
const screenIp = calc.querySelector('.screen-ip');
const buttons = calc.querySelector('.buttons');

let prevCont="";
let decParsed = false;

//Object for handling screen-related changes
var screenHandler = {
    clearDisplay: function(){ 
        screen.textContent = "0";
        screenIp.textContent = "0";
    },
    delChar: function(){ //simulates the backspace key
        let lnScrIp = screenIp.textContent.length;
        let lnScr = screen.textContent.length;
        if(lnScr <= 1){
            screen.textContent = '0';
            screenIp.textContent = ' 0';
            prevCont = '0';
        }
        else{ 
            screen.textContent = screen.textContent.substring(0, lnScr - 1);     
            prevCont = screen.textContent.substring(lnScr -2, lnScr - 1);
            if(lnScrIp <= 1){
                screenIp.textContent = prevCont;
            }
            else{
                screenIp.textContent = screenIp.textContent.substring(0, lnScrIp - 1);
            }
        }
    },
    calcPer: function(){ //Percentage calculation
        screen.textContent = ((screen.textContent)/100).toFixed(2);
        screenIp.textContent = '=';
    },
    calcOp: function(){
        screenIp.textContent = "=";
        this.opDisp(eval(screen.textContent).toFixed(2));
    },
    opDisp: function(t){ //Displays computed output on the screen
        screen.textContent = parseFloat(Number(t));
    },
    addContent: function(cont){//adds input characters to the screen
        const displayedCont = screen.textContent;
        const ipCont = screenIp.textContent;
        if(cont === '+' || cont === '-' || cont === '*' || cont === '/'){//checks if the current key pressed is an operator
            if(prevCont !== '+' && prevCont !== '-' && prevCont !== '*' && prevCont !== '/' && prevCont !== '.' && prevCont !== '%'){ //handles consecutive operators condition
                if(displayedCont !== '0'){
                    screen.textContent += cont;
                    screenIp.textContent = cont;
                    prevCont = cont;
                }
                else{
                    if(cont === '*' || cont === '/'){
                        screenIp.textContent = '0';
                        this.opDisp('0');
                        prevCont = '0';
                        alert("Cannot use this operator at the beginning of an expression!");
                    }
                    else{
                        screenIp.textContent = cont;
                        screen.textContent = cont;
                        prevCont = cont;
                    }
                }
            }
            else{
                alert("Consecutive operator input is prohibited!");
                screenIp.textContent = '0';
                screen.textContent = '0';
                prevCont = '0';
            }
        }
        else if(cont === '.' && (prevCont === '.' || decParsed)){//handles consecutive decimal points condition
            screen.textContent = '0';
            screenIp.textContent = '0';
            prevCont = '0';
            alert("Cannot add multiple decimal points to a single number!");
        }
        else if(cont === '%'){//handles % 
            if(prevCont === '%' && prevCont === '+' && prevCont === '-' && prevCont === '*' && prevCont === '/' && prevCont === '.'){
                screen.textContent = '0';
                screenIp.textContent = '0';
                prevCont = '0';
            }
            else{
                screen.textContent += cont;
                screenIp.textContent = cont;
                prevCont = cont;
            }
        }
        else{
            if(ipCont === '+' || ipCont === '-' || ipCont === '*' || ipCont === '/'){
                screen.textContent += cont;
                screenIp.textContent = cont;
                prevCont = cont;
            }
            else if(ipCont === '='){
                screen.textContent = cont;
                screenIp.textContent = cont;
                prevCont = cont;
            }
            else if(ipCont === '%'){
                screen.textContent = '0';
                screenIp.textContent = '0';
                prevCont = '0';
            }
            else{
                screen.textContent += cont;
                screenIp.textContent += cont; 
                prevCont = cont;
            }
        }
    }
};

//object for tracking key press
var keyHandler = {
    numKey: function(num){
        screenHandler.addContent(num);
    },
    opKey: function(op){
        decParsed = false;
        screenHandler.addContent(op);
    },
    clearKey: function(){
        screenHandler.clearDisplay();
        decParsed = false;
    },
    equalKey: function(eq){
        screenHandler.calcOp();
        decParsed = false;
    },
    decKey: function(dec){
        screenHandler.addContent(dec);
        decParsed = true;
    },
    perKey: function(per){
        screenHandler.calcPer();
        decParsed = false;
    },
    backKey: function(){
        screenHandler.delChar();
    }
};
