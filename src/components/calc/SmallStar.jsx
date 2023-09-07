import { useEffect } from "react";

const smallStarStyles = {
    position: 'fixed',
    transform: 'translate(-50%, -50%)',
    transition: 'all 5000ms ease',
    background: 'royalblue',
    boxShadow: '0 0 10px royalblue',
    width: '2px',
    aspectRatio: '1/1',
    borderRadius: '50%',
    animation: 'rotater 5s infinite ease both',
    zIndex: '-10000',
    animationDelay: `${Math.floor(Math.random() * 5000)}ms`,
}



function SmallStar() {

    function topALeft() {
        for (let i = 0; i < document.querySelectorAll('div.s-background-div').length; i++) {
            document.querySelectorAll('div.s-background-div')[i].style.top = `${Math.floor(Math.random() * 100)}%`;
            document.querySelectorAll('div.s-background-div')[i].style.left = `${Math.floor(Math.random() * 100)}%`;
        }
    }

    useEffect(function () {
        const interval = setInterval(topALeft, 5000);

        return () => clearInterval(interval);
    }, [])

    useEffect(function () {
        topALeft();
    }, [])


    return (
        <div className="s-background-div" style={smallStarStyles} ></div>
    )
}

export default SmallStar
