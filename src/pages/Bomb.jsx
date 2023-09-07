import { useEffect, useState } from 'react'
import '../styles/bomb/style.css'
import Block from '../components/bomb/Block';

function Bomb() {

    const [flagsCount, setFlagsCount] = useState(0);
    const [spentTime, setSpentTime] = useState(0);
    const [isInfoHide, setIsInfoHide] = useState(false);
    const [blocks, setBlocks] = useState([]);
    const [bgElements, setBgElements] = useState([])
    const numberOfBombs = 20;


    // update spent time
    useEffect(function () {
        const timeIntrval = setInterval(function () {
            setSpentTime(cur => cur + 1)
        }, 1000)

        return () => clearInterval(timeIntrval)
    }, [])

    // creaet background elements in mount


    // create cells in mount
    
    useEffect(function () {
        createElements();

        return () => setBlocks([]);
    
    }, [])
    
    function createElements() {
        const thisBlocksList = []
        for (let i = 100; i > 0; i--) {
            const isRandomlyActive = Math.random() < 0.2; // 20% chance of being active
            const isActiveClass = isRandomlyActive ? 'active' : '';
            const classname = `bomb-block un-opened-block c-${10 - (i - 1) % 10} r-${parseInt((i + 9) / 10)} ${isActiveClass}`;
            thisBlocksList.push(
                <Block classname={classname} key={Math.floor(Math.random() * 100000000)} setSpentTime={setSpentTime} createElements={createElements} flagsCount={flagsCount} setFlagsCount={setFlagsCount} />
            );
        }

        setBlocks(thisBlocksList)
    }

    function infoHiderCLickHandle(event) {
        setIsInfoHide(cur => !cur);
    }




    return (
        <>
        <div className="bomb-container">
		{blocks}
        </div>
        <div className={`bomb-game-info-div ${isInfoHide ? 'hide-info' : ''}`}>
            <div className="bomb-time">{spentTime}</div>
            <div className="bomb-flags-count">{flagsCount}</div>
        </div>
        <button className="bomb-hide-btn" onClick={infoHiderCLickHandle}>^</button>
        </>
    )
}

export default Bomb
