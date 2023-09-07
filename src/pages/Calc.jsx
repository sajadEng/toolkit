import { useState } from "react"
import '../styles/calc/calculator.css'
import Keypad from "../components/calc/Keypad";
import Background from "../components/calc/Background";

function Calc() {

    const [calcNumber, setCalcNumber] = useState('');
    const countedCalcNumber = getCalculatedNumber(calcNumber);

    function getCalculatedNumber(numberStr) {
        let caclculatedNumber;
        try {
            caclculatedNumber = eval(numberStr).toString();
        } catch(error) {
            console.log(error);
        }
        if (caclculatedNumber) return caclculatedNumber
        return numberStr
    }

    function inputHandler(event) {
        const input = event.target;
        setCalcNumber(input.value);
    }

    function keyupHandler(event) {
        event.target.classList.remove('vibrate-anim');
    }

    function keyDownHandler(event) {
        event.target.classList.add('vibrate-anim');
    }

    function numberKeyClickHandler(event) {
        setCalcNumber(cur => cur + event.target.innerHTML)
    }

    function equalKeyClickHandler(event) {
        const btn = event.target;
        if(['1','2','3','4','5','6','7','8','9','0'].includes(calcNumber.charAt(calcNumber.length - 1))) setCalcNumber(getCalculatedNumber);
        else {
            btn.style.backgroundColor = 'red';
            btn.style.color = 'black';
            setTimeout(function () {
                btn.style.backgroundColor = 'unset';
                btn.style.color = 'white';
            }, 5000)
        }
    }

    function clearBtnCLickHandler(event) {
        console.log(calcNumber.toString());
        if(!calcNumber.length) return
        setCalcNumber(cur => cur.toString().slice(0, -1))
    }

    return (<>
        <div className="container">
            <h1 className="result-h1">{countedCalcNumber}</h1>
            <input type="text" name="" className="calc-input" value={calcNumber} placeholder="..." onChange={inputHandler} onKeyUp={keyupHandler} onKeyDown={keyDownHandler} />
            <Keypad numberKeyClickHandler={numberKeyClickHandler} equalKeyClickHandler={equalKeyClickHandler} clearBtnCLickHandler={clearBtnCLickHandler} />
        </div>
        <Background />
    </>
    )
}

export default Calc
