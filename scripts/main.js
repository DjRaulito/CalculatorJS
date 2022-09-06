window.onload = function () {
  clearDisplay();
  disableButtons("changeSign");
};

// Variables
let isHighlighted = true;
let btnHighlighted = "";
let num = ""; //numero Pantalla
let isNewNumber = true; //Comprobar el estado si es un numero nuevo o estamos completando un numero de varias cifras
let operation = " ";
let previousNumber = "";
let sol = "";
let numOperationsMaked = 0;
let isCommaDisable = false;

// Escribe en la pantalla la tecla que hayas pulsado
function setResult(displayVal) {
  let result = "";
  result = result + displayVal;
  result = result.replace(".", ",");
  if (checkError(displayVal) == false) {
    document.getElementById("display").innerHTML = result;
  } else {
    document.getElementById("display").innerHTML = "ERROR";
    disableButtons("button");
  }
}

// Coje los valores del display
function getResult() {
  return document.getElementById("display").innerHTML;
}

function checkError(value) {
  let result = "";
  result += value;
  let length = maxLenght(value);
  if (result.length > length + 1 || result == "Infinity" || result == "NaN") {
    return true;
  } else {
    return false;
  }
}

function addNumber(key) {
  let result = getResult();
  let length = maxLenght(result);
  if (notRepeatComma(key) == false) {
    if (result.length <= length && isNewNumber == false) {
      setResult(result + key);
      if (result.length >= length) {
        disableButtons("btn-numbers");
      }
    } else if (isNewNumber == true) {
      if (checkZero(key) == true) {
        setResult(result + key);
        isNewNumber = false;
      } else {
        setResult(key);
        isNewNumber = false;
      }
    } else {
      setResult(result);
    }
  }
}

function maxLenght(value) {
  let result = "";
  result += value;
  let lengthResult = 9;
  if (result.includes("-")) {
    lengthResult += +1;
  }
  if (result.includes(",") || result.includes(".")) {
    lengthResult += +1;
  }
  return lengthResult;
}

function checkZero(key) {
  let result = getResult();
  if (result == "0" && key == ".") {
    return true;
  } else {
    return false;
  }
}

function notRepeatComma(key) {
  let result = getResult();
  if (key == ".") {
    if (result.includes(",") && key == ".") {
      setResult(result)
    }else{
      setResult(result + key);
      disableButtons("changeSign");
      disableButtons("comma");
    }
    return true;
  } else {
    avaibleButtons("changeSign");
    return false;
  }
}

function clearDisplay() {
  setResult(0);
  rmvHighlighted(btnHighlighted);
  avaibleButtons("button");
  disableButtons("changeSign");
  num = "";
  isNewNumber = true;
  operation = " ";
  previousNumber = "";
  numOperationsMaked = 0;
}

function negativeNumber() {
  let numbersDisplay = "";
  numbersDisplay = getResult();
  if (numbersDisplay.charAt(numbersDisplay.length - 1) == ",") {
    numbersDisplay = -numbersDisplay.replace(",", ".") + ",";
  } else {
    numbersDisplay = -numbersDisplay.replace(",", ".");
  }
  setResult(numbersDisplay);
}

function operator(op) {
  avaibleButtons("button");
  disableButtons("changeSign");
  if (numOperationsMaked >= 1) {
    num = 0
    makeOperations();
  }
  operation = op;
  op = " ";
  numOperationsMaked++;
  if (isNewNumber == false) {
    num = getResult();
    previousNumber = previousNumber + num.replace(",", ".");
    num = "";
    isNewNumber = true;
  }
}

function equals() {
  if (operation == " ") {
    document.getElementById(display).innerHTML = num;
  } else {
    makeOperations();
  }
  rmvHighlighted(btnHighlighted);
}

function makeOperations() {
  if (isNewNumber == false) {
    num =getResult();
    num = num.replace(",", ".");
  }
  if (previousNumber == "") {
    previousNumber = 0;
  }
  switch (operation) {
    case "*":
      sol = Number(parseFloat(previousNumber) * parseFloat(num));
      break;
    case "/":
      sol = Number(parseFloat(previousNumber) / parseFloat(num));
      break;
    case "+":
      sol = Number(parseFloat(previousNumber) + parseFloat(num));
      break;
    case "-":
      sol = Number(parseFloat(previousNumber) - parseFloat(num));
      break;
    default:
      break;
  }
  num = "";
  previousNumber = "";
  let decimals = checkDecimals(sol);
  sol = parseFloat(sol).toFixed(decimals);
  setResult(parseFloat(sol));
  isNewNumber = true;
  if (numOperationsMaked >= 1) {
    previousNumber = sol;
  }
}

function setHighlighted(key) {
  rmvHighlighted(btnHighlighted);
  if (isHighlighted == true) {
    isHighlighted = false;

    switch (key) {
      case "*":
        let multiply = document.getElementById("multiply");
        multiply.style.backgroundColor = "orange";
        btnHighlighted = key;
        break;
      case "/":
        let divide = document.getElementById("divide");
        divide.style.backgroundColor = "orange";
        btnHighlighted = key;
        break;
      case "+":
        let sum = document.getElementById("sum");
        sum.style.backgroundColor = "orange";
        btnHighlighted = key;
        break;
      case "-":
        let substract = document.getElementById("substract");
        substract.style.backgroundColor = "orange";
        btnHighlighted = key;
        break;
      default:
        break;
    }
  }
}

function rmvHighlighted(key) {
  if (isHighlighted == false) {
    isHighlighted = true;
    switch (key) {
      case "*":
        let multiply = document.getElementById("multiply");
        multiply.style.backgroundColor = "#fcc04b";
        break;
      case "/":
        let divide = document.getElementById("divide");
        divide.style.backgroundColor = "#fcc04b";
        break;
      case "+":
        let sum = document.getElementById("sum");
        sum.style.backgroundColor = "#fcc04b";
        break;
      case "-":
        let substract = document.getElementById("substract");
        substract.style.backgroundColor = "#fcc04b";
        break;
      default:
        break;
    }
  }
}

function disableButtons(className) {
  let buttonClassName = document.getElementsByClassName(className);
  for (let index = 0; index < buttonClassName.length; index++) {
    let buttonDisabled = document.getElementsByClassName(className);
    buttonDisabled[index].disabled = true;
    buttonDisabled[index].classList.add("buttonsDisabled");
  }
}

function avaibleButtons(className) {
  let buttonClassName = document.getElementsByClassName(className);
  for (let index = 0; index < buttonClassName.length; index++) {
    let buttonAvaible = document.getElementsByClassName(className);
    buttonAvaible[index].disabled = false;
    buttonAvaible[index].classList.remove("buttonsDisabled");
    buttonAvaible[index].classList.add("button");
  }
}

function checkDecimals(resultOperation) {
  let result = "";
  result = result + resultOperation;
  let numDecimals = 10;
  if (result.includes(".") == true) {
    numDecimals = numDecimals - result.indexOf(".");
  } else {
    numDecimals = 9;
  }
  return numDecimals;
}

document.addEventListener(
  "keydown",
  (event) => {
    event.preventDefault();
    var keyValue = event.key;
    console.log("keyValue: " + keyValue);

    if (keyValue == "Enter") {
      equals();
    } else if (keyValue == "1") {
      addNumber("1");
    } else if (keyValue == "2") {
      addNumber("2");
    } else if (keyValue == "3") {
      addNumber("3");
    } else if (keyValue == "4") {
      addNumber("4");
    } else if (keyValue == "5") {
      addNumber("5");
    } else if (keyValue == "6") {
      addNumber("6");
    } else if (keyValue == "7") {
      addNumber("7");
    } else if (keyValue == "8") {
      addNumber("8");
    } else if (keyValue == "9") {
      addNumber("9");
    } else if (keyValue == "0") {
      addNumber("0");
    } else if (keyValue == ".") {
      let result = "";
      result += getResult;
      if (notRepeatComma(keyValue) == false) {
        addNumber(".");        
      }
    } else if (keyValue == "Escape") {
      clearDisplay();
    } else if (checkKeyOperators(keyValue) == true) {
      operator(keyValue);
      setHighlighted(keyValue);
    } else if (keyValue == "Control") {
      negativeNumber();
    }
  });

function checkKeyOperators(keyPressed) {
  if (keyPressed == "*" || "-" || "+" || "/") {
    return true;
  } else {
    return false;
  }
}