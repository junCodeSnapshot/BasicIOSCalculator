const buttons = document.getElementsByTagName('button'); //get all buttons
let screen = document.getElementById('screen');
let ACBtn = document.getElementById('AC');
let screenValue = '0';
let floatBtnflag = false;
let operationButtonFlag = false;
let firstUseFlag = true;
let acBtnFlag = false;
let pressedButtonOp;
let operations = [];
let numbers = [];
let result;
let operatorsBtns = [], numbersBtns = []; //get all numbers and operators
let prevOp;
let prevNum;


/*TODO:
- Add AC function that makes changes on fisrtUseFlag and remove the old opbtnSaved
- add % funtionality
- remove the double zero
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
        ACBtn.innerHTML = 'C';
        if (e.target.value == 'change') {
            let value = Number(screenValue);
            value >= 0 ? value = -value : value = Math.abs(value);
            if (result && numbers[0] && Math.abs(numbers[0]) === Math.abs(value)) {
                numbers[0] = value;
            }
            cleanUp();
            valueOnScreenHandler(value);
            screenFunction();
            firstUseFlag = true; // we reseted the flag since we didn't pick an operation, we're still figure out the number.
        }else if(e.target.value === 'AC'){
            acFunction();
            console.log('pepe');
        }
        else if (firstUseFlag && Math.abs(result) != Math.abs(Number(screenValue))) {
            screenValue = Number(screenValue);
            numbers.push(screenValue)
            firstUseFlag = false;
        } else {
            firstUseFlag = false;
        }

        if (operations[0] && ['plus', 'menos', 'equal'].includes(e.target.value)) {
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
            operationDispatcher();
            cleanUp();
            valueOnScreenHandler(result);
            screenFunction();
        } else if (operations.length == 0 && result && e.target.value === 'equal') {
            equalFunction();
            cleanUp();
            valueOnScreenHandler(result);
            screenFunction();
        }
    })
}


for (let i = 0; i < numbersBtns.length; i++) {//add the listeners to the buttons
    numbersBtns[i].addEventListener('click', (e) => {
        ACBtn.innerHTML = 'C';
        if (!firstUseFlag) {
            pressedButtonOp ?
                operations.push(pressedButtonOp.value) : null;
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
    if (screenValue.length > 10) {
        screenValue = Number(screenValue).toFixed(8);
        screenValue = Number(screenValue).toPrecision(2);
    }
    screen.innerHTML = screenValue;
};

const activeButtonHandler = (element) => {
    if (!['equal', 'change', 'AC'].includes(element.value)) {
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
        // Math.fround
        numbers.push(result);
    } else
        if (['plus', 'menos', 'multi', 'division'].includes(operations[0])) {
            operations[0] === 'plus' ? plus(numbers[0], numbers[1]) : null;
            operations[0] === 'menos' ? minus(numbers[0], numbers[1]) : null;
            operations[0] === 'multi' ? multiply(numbers[0], numbers[1]) : null;
            operations[0] === 'division' ? division(numbers[0], numbers[1]) : null;
            numbers.push(result);
        };
    cleanArrays(operations, 0);
    cleanArrays(numbers, 1, 'shift');
};



//funciones de la calculadora
const cleanUp = () => {//Cleans the screen contents 
    screenValue = '';
};

const enableFloatNumber = (flag) => { //reset the dot button usage
    flag ? flag = false : false;
};
const equalFunction = () => {
    operations.push(prevOp);
    numbers.push(prevNum);
    operationDispatcher();
};
const acFunction = () => {
    if (screenValue == '0') {
        cleanArrays(operations, 0);
        cleanArrays(numbers, 0);
        pressedButtonOp = undefined;
        cleanUp();
        valueOnScreenHandler(0);
        screenFunction();
        console.log('heheh');
    }
    else  if (screenValue != '0' && numbers.length > 0 && operations.length > 0 ) {
        activeButtonHandler(pressedButtonOp);
        cleanUp();
        valueOnScreenHandler(0);
        screenFunction();
        console.log('picoloh');

    }else{
        cleanUp();
        valueOnScreenHandler(0);
        screenFunction();
    }
        ACBtn.innerHTML = 'AC';

};
const cleanArrays = (array, limit, type) => {
    if(type === "shift"){
        while (array.length > limit) {
            array.shift();
        }; 
    }else{
        while (array.length > limit) {
            array.pop();
        }; 
    }
};




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