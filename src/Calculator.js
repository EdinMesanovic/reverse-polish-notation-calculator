import React, { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  const compute = () => {
    setMsg("");
    if (input === "") {
      setMsg("You did not enter anything");
    } else {
      if (input.match(/^[a-zA-Z]+n/)) {
        setMsg("Only numbers and aritmetic operators are valid!");
      } else {
        const myArr = input.split(",");
        const numArr = [];
        let tempA = 0;
        let tempB = 0;
        for (let i = 0; i < myArr.length; i++) {
          if (parseFloat(myArr[i])) {
            numArr.push(parseFloat(myArr[i]));
            tempA++;
          } else {
            tempB++;
            let a = numArr.pop();
            let b = numArr.pop();
            if (myArr[i] === "+") {
              numArr.push(a + b);
            } else if (myArr[i] === "-") {
              numArr.push(a - b);
            } else if (myArr[i] === "*") {
              numArr.push(a * b);
            } else if (myArr[i] === "/") {
              numArr.push(a / b);
            } else if (myArr[i] === "^") {
              numArr.push(Math.pow(b, a));
            }
          }
        }
        console.log(tempA, tempB);
        if (tempA - 1 === tempB && input.match(/[+,-,*,/]/)) {
          setInput(input + " = " + numArr);
          setDisabled(true);
        } else {
          setMsg("Something went wrong! Check the number of OPERANDS!");
        }
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const clear = () => {
    setDisabled(false);
    setInput("");
    setMsg("");
  };

  return (
    <div>
      <input
        type='text'
        value={input}
        onChange={onChange}
        className='input-form'
        disabled={disabled}
      ></input>
      <button type='button' onClick={clear} className='clear'>
        Clear
      </button>
      <button
        type='button'
        disabled={disabled}
        className='compute'
        onClick={compute}
      >
        Compute
      </button>

      <div className='error'>
        <p className='msg'>{msg}</p>
      </div>
    </div>
  );
}

export default Calculator;
