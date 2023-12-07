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


/*TODO:
-Add AC function that makes changes on fisrtUseFlag 
-Exclude the equal button is Active class 
-Mathematical properties fixes
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
        operationDispatcher(e.target.value);
    })
}


for (let i = 0; i < numbersBtns.length; i++) {//add the listeners to the buttons
    numbersBtns[i].addEventListener('click', (e) => {

        pressedButtonOp ? operationButtonFlag ?
            (activeButtonHandler(pressedButtonOp), cleanUp(), valueOnScreenHandler(e.target.value), screenFunction()): null : null;
            (valueOnScreenHandler(e.target.value), screenFunction())
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
const isActive = () => {
    if (operationButtonFlag) {
        pressedButtonOp.classList.add('isActive');
    } else {
        pressedButtonOp.classList.remove('isActive');
    }
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

    if (operations.length <= 2) {//check the loop
        if (['plus', 'menos', 'multi', 'division', 'equal'].includes(operations[0]) && ['plus', 'menos', 'equal'].includes(operations[1])) {
            operations[0] == 'plus' ? plus(numbers[0], numbers[1]) : null;
            console.log('ayuwoki')
            operations[0] == 'menos' ? minus(numbers[0], numbers[1]) : null;
            operations[0] == 'multi' ? multiply(numbers[0], numbers[1]) : null;
            operations[0] == 'division' ? division(numbers[0], numbers[1]) : null;
            operations[0] == 'equal' ? equalFunction() : null;
            cleanUp();//limpia el ultimo numero en screenvalue para que no se supen con el resultdo.
            valueOnScreenHandler(result); //
            screenFunction();
            for (let i = 0; i < operations.length; i++) {
                operations.shift();
            }
            for (let i = 0; i <= numbers.length; i++) {
                numbers.pop();
            }
            numbers.push(result);
            result = 0;
        }
    }
    else if (operations.length > 2) {
        if (['plus', 'menos'].includes(operations[0]) && ['multi', 'division'].includes(operations[1])) {
            operations[1] == 'multi' ? multiply(numbers[2], numbers[1])
                : division(numbers[1], numbers[2]);

            operations[0] == 'plus' ? plus(numbers[0], result) : minus(numbers[0], result);

            // for (let i = 0; i < operations.length; i++) {
            //     operations.shift();
            // }
            while (operations.length > 1) {
                operations.shift();
            }
            while (numbers.length > 0) {
                console.log(numbers.shift());
            }
            console.log("Operations");

            numbers.push(result);
            cleanUp();
            valueOnScreenHandler(result);
            screenFunction();
            result = 0;
        }
    }
    // cleanUp();
    // screenFunction();
    // console.log('not here')
};



//funciones de la calculadora
const cleanUp = () => {//Cleans the screen contents 
    screenValue = '';
};

const enableFloatNumber = (flag) => { //reset the dot button usage
    flag ? flag = false : false;
}
const equalFunction = () => {
    operations.pop();
    console.log(operations);
    console.log('hehehehe');
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