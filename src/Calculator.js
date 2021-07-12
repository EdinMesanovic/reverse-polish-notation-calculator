import React, { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  const compute = () => {
    if (input === "") {
      setMsg("You did not enter anything");
    } else {
      if (input.match(/^[a-zA-Z]+$/)) {
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
        if (tempA - 1 === tempB) {
          setInput(input + " = " + numArr);
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
      ></input>
      <button type='button' onClick={clear} className='clear'>
        Clear
      </button>
      <button type='button' className='compute' onClick={compute}>
        Compute
      </button>

      <div className='error'>
        <p className='msg'>{msg}</p>
      </div>
    </div>
  );
}

export default Calculator;
