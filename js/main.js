const buttons = document.getElementsByTagName('button'); //get all buttons
let screen = document.getElementById('screen');
let screenValue = '0';
let floatBtnflag = false;
let operationButtonFlag = false;
let firstUseFlag = true;
let pressedButtonOp;
let operations = [];
let numbers = [];
let result;
let operatorsBtns = [], numbersBtns = []; //get all numbers and operators
let prevOp;
let prevNum;


/*TODO:
-Add AC function that makes changes on fisrtUseFlag 
-Exclude the equal button is Active class 
*/

for (let i = 0; i < buttons.length; i++) {//fill all the arrays with their respective buttons
    if (buttons[i].value.length > 1) {
        operatorsBtns.push(buttons[i])
    } else {
        numbersBtns.push(buttons[i])
    };
};

for (let i = 0; i < operatorsBtns.length; i++) {//add the listeners to the buttons
    operatorsBtns[i].addEventListener('click', (e) => {
        activeButtonHandler(e.target);
        if (firstUseFlag) {
            screenValue = Number(screenValue);
            numbers.push(screenValue)
            firstUseFlag = false;
        }
        if (operations[0] && ['plus', 'menos', 'equal'].includes(e.target.value)) {
            console.log('normal 1 symbol operation');
            prevOp = operations[operations.length - 1];
            prevNum = numbers[numbers.length - 1];
            operationDispatcher();
            cleanUp();
            valueOnScreenHandler(result);
            screenFunction();
        }
        else if (operations[1] && ['division', 'multi'].includes(e.target.value)) {
            prevOp = operations[operations.length - 1];
            prevNum = numbers[numbers.length - 1];
            console.log('division or multi');
            operationDispatcher();
            cleanUp();
            valueOnScreenHandler(result);
            screenFunction();
        } else if (operations.length == 0 && e.target.value === 'equal') {
            equalFunction();
            cleanUp();
            valueOnScreenHandler(result);
            screenFunction();
        }
    })
}


for (let i = 0; i < numbersBtns.length; i++) {//add the listeners to the buttons
    numbersBtns[i].addEventListener('click', (e) => {

        if (!firstUseFlag) {
            operations.push(pressedButtonOp.value);
            firstUseFlag = true;
        }


        pressedButtonOp ? operationButtonFlag ?
            (activeButtonHandler(pressedButtonOp), cleanUp(), valueOnScreenHandler(e.target.value), screenFunction()) : (valueOnScreenHandler(e.target.value), screenFunction()) : (valueOnScreenHandler(e.target.value), screenFunction());
    })
}


//Logica de la calculadora

//Valor inicial del display y manejo del . 
const valueOnScreenHandler = (value) => { //working!
    screenValue === '0' ? value != '.' ? (cleanUp(), screenValue += value) : screenValue += value : screenValue += value;
};

//Mostrar valores en la calculadora
const screenFunction = () => {
    screen.innerHTML = screenValue;
};

const activeButtonHandler = (element) => {
    if (element.value != 'equal') {
        if (pressedButtonOp != element && operationButtonFlag) {
            operationButtonFlag = !operationButtonFlag;
            pressedButtonOp.disabled = operationButtonFlag;
            isActive();
            pressedButtonOp = element
            operationButtonFlag = !operationButtonFlag;
            pressedButtonOp.disabled = operationButtonFlag;
            isActive();
        } else {
            pressedButtonOp = element;
            operationButtonFlag = !operationButtonFlag;
            pressedButtonOp.disabled = operationButtonFlag;
            isActive();
        }
    }
}
const isActive = () => {
    if (operationButtonFlag) {
        pressedButtonOp.classList.add('isActive');
    } else {
        pressedButtonOp.classList.remove('isActive');
    }
}

const operationDispatcher = () => {
    if (['multi', 'division'].includes(operations[1])) {
        operations[1] === 'multi' ? multiply(numbers[2], numbers[1]) : null;
        operations[1] === 'division' ? division(numbers[2], numbers[1]) : null;
        operations[0] == 'plus' ? plus(numbers[0], result) : minus(numbers[0], result);
        numbers.push(result);
    } else
        if (['plus', 'menos', 'multi', 'division'].includes(operations[0])) {
            operations[0] === 'plus' ? plus(numbers[0], numbers[1]) : null;
            operations[0] === 'menos' ? minus(numbers[0], numbers[1]) : null;
            operations[0] === 'multi' ? multiply(numbers[0], numbers[1]) : null;
            operations[0] === 'division' ? division(numbers[0], numbers[1]) : null;
            numbers.push(result);
        }

    while (operations.length > 0) {
        operations.shift();
    }
    while (numbers.length > 1) {
        numbers.shift();
    }
};



//funciones de la calculadora
const cleanUp = () => {//Cleans the screen contents 
    screenValue = '';
};

const enableFloatNumber = (flag) => { //reset the dot button usage
    flag ? flag = false : false;
}
const equalFunction = () => {
    console.log(prevOp, prevNum);
    operations.push(prevOp);
    numbers.push(prevNum);
    operationDispatcher();
}





//operaciones
const plus = (value1, value2) => {
    result = value1 + value2;
};
const multiply = (value1, value2) => {
    result = value1 * value2;
};
const minus = (value1, value2) => {
    result = value1 - value2;
};
const division = (value1, value2) => {
    result = value1 / value2;
};