import { useEffect } from "react";

function HomeLogo() {

    useEffect(function () {
        document.querySelectorAll('.homepage-title span').forEach((letter, index) => {
            letter.style.animationDelay = `${index * 500}ms`
        })
    }, [])

    return (
        <>
            <div className="homepage-title">
                <div>
                    <img className="homepage-logo-image" src="./src/images/wallpainter/logo.png" alt="Logo" />
                    <span>W</span>
                    <span>a</span>
                    <span>l</span>
                    <span>l</span>
                    <span>P</span>
                    <span>a</span>
                    <span>i</span>
                    <span>n</span>
                    <span>t</span>
                    <span>e</span>
                    <span>r</span>
                </div>
            </div>
        </>
    )
}

export default HomeLogo
