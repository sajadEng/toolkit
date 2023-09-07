function Block({classname, setSpentTime, createElements, flagsCount, setFlagsCount}) {



    // event handlers

        // left click
    function handleBlockClick(event) {
        const blockEl = event.target
        const chosenRow = getChosenRow(blockEl);
        const chosenColumn = getChosenColumn(blockEl);
        const activeCellsArround = getActiveBlocksNumbers(chosenRow, chosenColumn);
        blockEl.children[0].innerHTML = activeCellsArround;

        if (!blockEl.classList.contains('flaged-block')) {
            if (blockEl.classList.contains('active')) {
                alert('~> You Lost');
                startGame();
            } else {
                blockEl.classList.remove('un-opened-block');
                blockEl.classList.add('opened-block');
            }
            checkWining();
        }
        console.log(blockEl.classList);
    }

        // right click
    function handleBlockRClick(event) {
        const blockEl = event.target;
        if (!event.target.classList.contains('opened-block')) {
            if (event.target.classList.contains('flaged-block')) {
                event.target.classList.remove('flaged-block');
                setFlagsCount(cur => cur - 1);
            } else {
                event.target.classList.add('flaged-block');
                setFlagsCount(cur => cur + 1);
            }
        }
        checkWining();
        console.log(blockEl);
        event.preventDefault();
    }
// 			blockElementsList[i].addEventListener('contextmenu', event => {
// 				if (event.target.classList.contains('opened-block')) {
// 					console.log('hellllllllllo')
// 				} else {
// 					if (event.target.classList.contains('flaged-block')) {
// 						event.target.classList.remove('flaged-block');	
// 						flagsCount--;
// 					} else {
// 						event.target.classList.add('flaged-block');
// 						flagsCount++;
// 					}
// 				}
// 				document.querySelector('.flags-count').innerHTML = flagsCount;
// 				event.preventDefault();
// 				checkWining();
// 			})
// 	}



    // functions


    function getActiveBlocksNumbers(chosenRow,chosenColumn) {
        let numberOfActivesArround = 0;
        if (chosenColumn != 1) {
            if (document.querySelector(`div.r-${chosenRow}.c-${chosenColumn-1}`).classList.contains('active')) { numberOfActivesArround++ }
        }
        if (chosenColumn != 10) {
            if (document.querySelector(`div.r-${chosenRow}.c-${chosenColumn+1}`).classList.contains('active')) { numberOfActivesArround++ }
        }
        if (chosenRow != 1) {
            if (document.querySelector(`div.r-${chosenRow-1}.c-${chosenColumn}`).classList.contains('active')) { numberOfActivesArround++ }
        }
        if (chosenRow != 10) {
            if (document.querySelector(`div.r-${chosenRow+1}.c-${chosenColumn}`).classList.contains('active')) { numberOfActivesArround++ }
        }
        if (chosenRow != 1 && chosenColumn != 1) {
            if (document.querySelector(`div.r-${chosenRow-1}.c-${chosenColumn-1}`).classList.contains('active')) { numberOfActivesArround++ }
        }
        if (chosenRow != 10 && chosenColumn != 1) {
            if (document.querySelector(`div.r-${chosenRow+1}.c-${chosenColumn-1}`).classList.contains('active')) { numberOfActivesArround++ }
        }
        if (chosenRow != 1 && chosenColumn != 10) {
            if (document.querySelector(`div.r-${chosenRow-1}.c-${chosenColumn+1}`).classList.contains('active')) { numberOfActivesArround++ }
        }
        if (chosenRow != 10 && chosenColumn != 10) {
            if (document.querySelector(`div.r-${chosenRow+1}.c-${chosenColumn+1}`).classList.contains('active')) { numberOfActivesArround++ }
        }
        return numberOfActivesArround;
    }


    function getChosenRow(element) {
        let chosenRow;
        for (let j = 1; j <= 10; j++) {
            if (element.classList.contains(`r-${j}`)) {
                chosenRow = j;
            }
        }
        return chosenRow;
    }


    function getChosenColumn(element) {
        let chosenColumn;
        for (let j = 1; j <= 10; j++) {
            if (element.classList.contains(`c-${j}`)) {
                chosenColumn = j;
            }
        }
        return chosenColumn;
    }

    function startGame() {
        setSpentTime(0);
        setFlagsCount(0);
        createElements();
    }


    function checkWining() {
        const flagsCountEnough = document.querySelectorAll('.active.flaged-block').length === document.querySelectorAll('.active').length;
        const opnedCountEnough = (document.querySelectorAll('.block').length - document.querySelectorAll('.opened-block').length) == document.querySelectorAll('.active');
        if (flagsCountEnough || opnedCountEnough) {
            alert('You Won!');
            for (let i = document.querySelectorAll('.un-opened-block').length - 1; i >= 0; i--) {
                if (document.querySelectorAll('.un-opened-block')[i].classList.contains('active') == false) {
                    document.querySelectorAll('.un-opened-block')[i].classList.add('opened-block');
                    document.querySelectorAll('.un-opened-block')[i].classList.remove('un-opened-block');
                }
            }
            setTimeout(function () {
                let replay = confirm('Do you want to play again?');

                if (replay) {
                    startGame();
                }
            }, 10000)
        }
    }


    return (
        <div className={classname} onClick={event => handleBlockClick(event)} onContextMenu={handleBlockRClick}>
            <p className='text'></p>
        </div>
    )
}

export default Block
