const buttons = document.getElementsByTagName('button'); //get all buttons
let screen = document.getElementById('screen');
let screenValue = '0';
let floatBtnflag = false;
let operationButtonFlag = false;
let pressedButtonOp;
let operations = [];
let numbers = [];
let result;
let operatorsBtns = [], numbersBtns = []; //get all numbers and operators



for (let i = 0; i < buttons.length; i++) {//fill all the arrays with their respective buttons
    if (buttons[i].value.length > 1) {
        operatorsBtns.push(buttons[i])
    } else {
        numbersBtns.push(buttons[i])
    };
};

for (let i = 0; i < operatorsBtns.length; i++) {//add the listeners to the buttons
    if (operatorsBtns[i].value == 'equal') {
        operatorsBtns[i].addEventListener('click', (e) => {
            equalFunction();
        })
    }
    operatorsBtns[i].addEventListener('click', (e) => {
        pressedButtonOp = e.target;
        operationDispatcher(e.target.value);
        activeButtonHandler();
    })
}


for (let i = 0; i < numbersBtns.length; i++) {//add the listeners to the buttons
    numbersBtns[i].addEventListener('click', (e) => {
        pressedButtonOp ? activeButtonHandler() : null;
        result >= 0 ? cleanUp(): console.log(result);
        screenFunction(e.target.value);
    })
}


//Logica de la calculadora

//Valor inicial del display y manejo del . 
const valueOnScreenHandler = (value) => { //working!
    screenValue == '0' ? value != "." ? cleanUp() : '0' : screenValue;
    value == '.' ? floatBtnflag = true : floatBtnflag;
    screenValue += value;
};

//Mostrar valores en la calculadora
const screenFunction = (value) => {
    valueOnScreenHandler(value);
    screen.innerHTML = screenValue;
};

const activeButtonHandler = () => {
    operationButtonFlag = !operationButtonFlag
    pressedButtonOp.disabled = operationButtonFlag;
}
// const mathOrderHandler = (op) => {
//     console.log(op)
//     if(operations[1]  === 'multi' || operations[1] === 'division' && operations[0] === 'menos' || operations[0] === 'plus'){
//         multiply(numbers[1], numbers[2]);
//         plus(numbers[0], result);
//         console.log(result);
//         screenFunction(result);
//     }else if(op == 'plus' || op == 'menos'){

//     }

//     console.log('pepe');
// }
const operationDispatcher = (op) => {
    screenValue = Number(screenValue);
    operations.push(op);
    numbers.push(screenValue);
    if (operations.length > 1 && operations[0] === operations[1] || operations[1] === 'equal') {
        operations[0] == 'plus' ? plus(numbers[0], numbers[1]) : null;
        operations[0] == 'menos' ? minus(numbers[0], numbers[1]) : null;
        operations[0] == 'multi' ? multiply(numbers[0], numbers[1]) : null;
        operations[0] == 'division' ? division(numbers[0], numbers[1]) : null;
        cleanUp();
        screenFunction(result);
        for(let i = 0; i < operations.length; i++) {
            operations.pop();
        }
        for(let i = 0; i <= numbers.length; i++) {
            numbers.pop();
        }
        numbers.push(result);
        result = 0;
    } else if (operations.length > 2 && operations[0] === 'plus' || operations[0] === 'menos' && operations[1] === 'multi' || operations[1] === 'division' || operations[1] === 'equal') {
        
        operations

        cleanUp();
        screenFunction(result);
        console.log(operations[0], operations[1]);
        console.log(numbers[0], numbers[1]);
    }
    else {
        cleanUp();
        screenFunction(screenValue);
        console.log('not here')
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
    console.log('equal function');
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