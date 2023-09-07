import { useNavigate } from "react-router-dom";
import NumberBtn from "./NumberBtn";
function Keypad({numberKeyClickHandler, equalKeyClickHandler, clearBtnCLickHandler}) {
    const navigate = useNavigate();
    return (
        <div className="btns-div">
            {
                [1,2,3].map(number => <NumberBtn number={number} key={`calckey${number}`} numberKeyClickHandler={numberKeyClickHandler} />)
            }
			<button className="main-btns" onClick={numberKeyClickHandler}>+</button>
            {
                [4,5,6].map(number => <NumberBtn number={number} key={`calckey${number}`} numberKeyClickHandler={numberKeyClickHandler} />)
            }
			<button className="main-btns" onClick={numberKeyClickHandler}>-</button>
            {
                [7,8,9].map(number => <NumberBtn number={number} key={`calckey${number}`} numberKeyClickHandler={numberKeyClickHandler} />)
            }
			<button className="main-btns" onClick={numberKeyClickHandler}>*</button>
			<button className="clear-btn" onClick={clearBtnCLickHandler}>&#x219a;</button>
			<button className="main-btns" onClick={numberKeyClickHandler}>0</button>
			<button className="minor-btns equal-btn" onClick={equalKeyClickHandler}>=</button>
            <button href="/" onClick={event => navigate('/')} className="minor-btns" style={{backgroundColor: 'white', boxShadow: 'none'}}><img src="/src/images/home-icon.png" width='35px' alt="" /></button>
		</div>
    )
}

export default Keypad
