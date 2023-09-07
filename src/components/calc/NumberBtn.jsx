function NumberBtn({number, numberKeyClickHandler}) {
    return (
        <button className="main-btns" onClick={numberKeyClickHandler}>{number}</button>
    )
}

export default NumberBtn
