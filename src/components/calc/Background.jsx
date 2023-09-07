import SmallStar from "./SmallStar";

function Background() {

    const sbgcontainerStyles = {
        position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        backgroundColor: 'black',
        zIndex: '-1000000',
    }

    const lengthList = []
    for (let i = 0; i < 100; i++) {
        lengthList.push(i);
    }

    return (
        <div className="s-background-container" style={sbgcontainerStyles}>
            {
                lengthList.map(index => <SmallStar key={`sbg${index}`} />)
            }
        </div>
    )
}

export default Background
