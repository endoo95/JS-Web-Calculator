var lastOperation = document.getElementById("last-operation");
var result = document.getElementById("result");
var operatorDisplay = document.getElementById("operator-display");

var memoryResult = document.getElementById("memory-result");

result.innerHTML = 0;
lastOperation.innerHTML = "";
memoryResult.innerHTML = "";
operatorDisplay.innerHTML = "";

var res = result.innerHTML;
var last = lastOperation.innerHTML;
var activeOperator = operatorDisplay.innerHTML;
var holdResult = 0;

document.addEventListener('click', (e) =>
  {
    // Retrieve id from clicked element
    let elementId = e.target.id;

    switch(elementId){
        //Utility check
        case "":
            console.log("An element without an id was clicked.")
            break;
        case "clear-everything":
            clearEverything();
            break;
        case "step-back":
            stepBack();
            break;
        case ".":
            if(!haveComma()){
                addNumber(".");
            }
            break;
        case "reverse":
            reverseNumber();
            break;
        //Memory items
        case "memory-clear":
            memoryClear();
            console.log("Memory cleared Sir!");
            break;
        //Operators
        case "equals":
            equalsOperation();
            break;
        case "add":
            addOperation();
            break;
        case "subtract":
            subtractOperation();
            break;
        case "multiply":
            multiplyOperation();
            break;
        case "divide":
            divideOperation();
            break;
        //Numbers and comma
        case "0":
            addNumber(0)
            break;
        case "1":
            addNumber(1);
            break;
        case "2":
            addNumber(2);
            break;
        case "3":
            addNumber(3);
            break;
        case "4":
            addNumber(4);
            break;
        case "5":
            addNumber(5);
            break;
        case "6":
            addNumber(6);
            break;
        case "7":
            addNumber(7);
            break;
        case "8":
            addNumber(8);
            break;
        case "9":
            addNumber(9);
            break;
        //Default on end, as usual :p
        default:
            console.log(elementId);
    }
  }
);

//FUNCTIONS
//Utility
function clearEverything(){
    result.innerHTML = 0;
    lastOperation.innerHTML = "";
    holdResult = 0;
    memoryClear();
    res = result.innerHTML;
    last = lastOperation.innerHTML;
    operatorDisplay.innerHTML = "";
    console.log("All clear Sir!");
    return;
}

function stepBack(res){
    res = result.innerHTML;
    //console.log(typeof(res) + " " + res);
    result.innerHTML = res.slice(0, -1);
    if(result.innerHTML.length == 0){
        result.innerHTML = 0;
    }
    console.log("result = " + result.innerHTML);
}

function haveComma(){
    //console.log(result.innerHTML);
    //console.log(result.innerHTML.indexOf("."));
    if(result.innerHTML.indexOf(".") >= 0){
        return true;
    }
    else
    {
        return false;
    }
}

function reverseNumber(){
    res = result.innerHTML;
    var verify = isResultStartingWithMinusSign();
    if(verify){
        result.innerHTML = res.slice(1, res.length);
    }
    else
    {
        result.innerHTML = ("-" + res);
    }
    res = result.innerHTML;
    console.log("result = " + result.innerHTML);
}

function isResultStartingWithMinusSign(){
    //console.log("Is minus? " + result.innerHTML.startsWith("-"));
    if(result.innerHTML.startsWith("-")){
        return true;
    }
    else
    {
        return false;
    }
}

function isLastOpStartingWithMinusSign(){
    //console.log("Is minus? " + lastOperation.innerHTML.startsWith("-"));
    if(lastOperation.innerHTML.startsWith("-")){
        return true;
    }
    else
    {
        return false;
    }
}

function isResultClear(){
    //console.log("Is result clear? ")
    //console.log(result.innerHTML);
    if(result.innerHTML == "0" || result.innerHTML == 0 || result.innerHTML == NaN || result.innerHTML == null || result.innerHTML == ""){
        return true;
    }
    else
    {
        return false;
    }
}

function isLastOperationClear(){
    //console.log("Is last-operation clear? ");
    //console.log(lastOperation.innerHTML);
    if(lastOperation.innerHTML == "0" || lastOperation.innerHTML == 0 || lastOperation.innerHTML == NaN || lastOperation.innerHTML == null || lastOperation.innerHTML == ""){
        return true;
    }
    else
    {
        return false;
    }
}

//Memory
function memoryClear(){
    memoryResult.innerHTML = "";
    return;
}

//Operators
function equalsOperation(){
    if(operatorDisplay.innerHTML == "="){
        return;
    }

    switch(activeOperator){
        case "+":
            addOperation();
            break;
        case "-":
            subtractOperation();
            break;
        case "x":
            multiplyOperation();
            break;
        case "&#247;":
            divideOperation();
            break;
    }

    if(!isLastOperationClear()){
        result.innerHTML = lastOperation.innerHTML;
    }

    last = 0;
    lastOperation.innerHTML = "";

    activeOperator = "=";
    operatorDisplay.innerHTML = activeOperator;
}

function addOperation(){
    if (res == 0 && holdResult == 0){
        //console.log("Res & holdResult == 0")
        //console.log("Going back!")
        return;
    }

    if(res == 0){
        res = holdResult;
    }

    if(isLastOperationClear()){
        //Don't know why it isn't workin when: last, lastOperation.innerHTML = res;
        //I mean it's working, but when you add single digit it just swap them 
        last = res;
        lastOperation.innerHTML = last;
        //console.log("Last = " + last);
    }
    else
    {
        var isMinusResult = isResultStartingWithMinusSign();
        var isMinusLast = isLastOpStartingWithMinusSign();
        console.log("Res = " + res + " | " + "Last = " + last);
        if(isMinusResult && isMinusLast){
            console.log("r- " + "l-");
            last = parseFloat(last) + parseFloat(res);
        }
        else if(isMinusResult && !isMinusLast)
        {
            console.log("r- " + "l+");
            last = parseFloat(last) + parseFloat(res);
        }
        else if (!isMinusResult && isMinusLast)
        {
            console.log("r+ " + "l-");
            last = parseFloat(last) + parseFloat(res);
        } 
        else
        {
            console.log("r+ " + "l+");
            last = parseFloat(last) + parseFloat(res);
        }
        
        console.log("Parse res = " + parseFloat(res) + " | " + "Parse last = " + parseFloat(last));
        lastOperation.innerHTML = last;
    }
        holdResult = res;

        res = 0;
        result.innerHTML = res;
        //console.log("Res = " + res + " | " + "Result = " + result.innerHTML);

        activeOperator = "+";
        operatorDisplay.innerHTML = activeOperator;
}

function subtractOperation(){
    if (res == 0 && holdResult == 0){
        //console.log("Res & holdResult == 0")
        //console.log("Going back!")
        return;
    }

    if(res == 0){
        res = holdResult;
    }

    if(isLastOperationClear()){
        //Don't know why it isn't workin when: last, lastOperation.innerHTML = res;
        //I mean it's working, but when you add single digit it just swap them 
        last = -res;
        lastOperation.innerHTML = last;
        //console.log("Last = " + last);
    }
    else
    {
        var isMinusResult = isResultStartingWithMinusSign();
        var isMinusLast = isLastOpStartingWithMinusSign();
        console.log("Res = " + res + " | " + "Last = " + last);
        if(isMinusResult && isMinusLast){
            console.log("r- " + "l-");
            last = parseFloat(last) + parseFloat(res);
        }
        else if(isMinusResult && !isMinusLast)
        {
            console.log("r- " + "l+");
            last = parseFloat(last) - parseFloat(res);
        }
        else if (!isMinusResult && isMinusLast)
        {
            console.log("r+ " + "l-");
            last = parseFloat(last) - parseFloat(res);
        } 
        else
        {
            console.log("r+ " + "l+");
            last = parseFloat(last) - parseFloat(res);
        }
        
        console.log("Parse res = " + parseFloat(res) + " | " + "Parse last = " + parseFloat(last));
        lastOperation.innerHTML = last;
    }
        holdResult = res;

        res = 0;
        result.innerHTML = res;
        //console.log("Res = " + res + " | " + "Result = " + result.innerHTML);

        activeOperator = "-";
        operatorDisplay.innerHTML = activeOperator;
} 

function multiplyOperation(){
    if (res == 0 && holdResult == 0){
        //console.log("Res & holdResult == 0")
        //console.log("Going back!")
        return;
    }

    if(res == 0){
        res = holdResult;
    }

    if(isLastOperationClear()){
        //Don't know why it isn't workin when: last, lastOperation.innerHTML = res;
        //I mean it's working, but when you add single digit it just swap them 
        last = res;
        lastOperation.innerHTML = last;
        //console.log("Last = " + last);
    }
    else
    {
        var isMinusResult = isResultStartingWithMinusSign();
        var isMinusLast = isLastOpStartingWithMinusSign();
        console.log("Res = " + res + " | " + "Last = " + last);
        if(isMinusResult && isMinusLast){
            console.log("r- " + "l-");
            last = parseFloat(last) * parseFloat(res);
        }
        else if(isMinusResult && !isMinusLast)
        {
            console.log("r- " + "l+");
            last = parseFloat(last) * parseFloat(res);
        }
        else if (!isMinusResult && isMinusLast)
        {
            console.log("r+ " + "l-");
            last = parseFloat(last) * parseFloat(res);
        } 
        else
        {
            console.log("r+ " + "l+");
            last = parseFloat(last) * parseFloat(res);
        }

        console.log("Parse res = " + parseFloat(res) + " | " + "Parse last = " + parseFloat(last));
        lastOperation.innerHTML = last;
    }

    holdResult = res;

    res = 0;
    result.innerHTML = res;
    //console.log("Res = " + res + " | " + "Result = " + result.innerHTML);

    activeOperator = "x";
    operatorDisplay.innerHTML = activeOperator;
}

function divideOperation(){
    if(res == 0 || res == -0){
        alert("Nie wolno dzielić przez zero!");
        return;
    }

    if (res == 0 && holdResult == 0){
        //console.log("Res & holdResult == 0")
        //console.log("Going back!")
        return;
    }

    if(res == 0){
        res = holdResult;
    }

    if(isLastOperationClear()){
        //Don't know why it isn't workin when: last, lastOperation.innerHTML = res;
        //I mean it's working, but when you add single digit it just swap them 
        last = res;
        lastOperation.innerHTML = last;
        //console.log("Last = " + last);
    }
    else
    {
        var isMinusResult = isResultStartingWithMinusSign();
        var isMinusLast = isLastOpStartingWithMinusSign();
        console.log("Res = " + res + " | " + "Last = " + last);
        if(isMinusResult && isMinusLast){
            console.log("r- " + "l-");
            last = parseFloat(last) / parseFloat(res);
        }
        else if(isMinusResult && !isMinusLast)
        {
            console.log("r- " + "l+");
            last = parseFloat(last) / parseFloat(res);
        }
        else if (!isMinusResult && isMinusLast)
        {
            console.log("r+ " + "l-");
            last = parseFloat(last) / parseFloat(res);
        } 
        else
        {
            console.log("r+ " + "l+");
            last = parseFloat(last) / parseFloat(res);
        }

        console.log("Parse res = " + parseFloat(res) + " | " + "Parse last = " + parseFloat(last));
        lastOperation.innerHTML = last;
    }

    holdResult = res;

    res = 0;
    result.innerHTML = res;
    //console.log("Res = " + res + " | " + "Result = " + result.innerHTML);

    activeOperator = "&#247;";
    operatorDisplay.innerHTML = activeOperator;
}

//Numbers
function addNumber(number){
    if(operatorDisplay.innerHTML == "="){
        operatorDisplay.innerHTML = "";
        result.innerHTML = "";
    }

    if(result.innerHTML.length >= 15){
        alert("Próbujesz policzyć zbyt duże cyfry na moją pamięć! :(");
        return;
    }

    if(isResultClear() && result.innerHTML != "0."){
        //console.log("result jest pusty :/");
        if(number == "."){
            res = "0" + number;
        }
        else
        {
            res = number;
        }
    }
    else
    {
        res = result.innerHTML + number;
    }

    result.innerHTML = res;
    //console.log("result = " + result.innerHTML);
}