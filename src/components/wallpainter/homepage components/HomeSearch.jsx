import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

function HomeSearch({handleSearch}) {

    const navigate = useNavigate();
    useEffect(function () {
        document.querySelector('.homepage-search-container label').addEventListener('mouseenter', event => {
            event.target.style.borderColor = 'var(--color-1)';
        })
        document.querySelector('.homepage-search-container label').addEventListener('mouseleave', event => {
            document.activeElement === event.target.children[0] ? event.target.style.borderColor = 'var(--color-2)' : event.target.style.borderColor = 'var(--primary-color)';
        })
        document.querySelector('.homepage-search-container input').addEventListener('focus', event => {
            document.querySelector('.homepage-search-container label').style.borderColor = 'var(--color-2)';
        })
        document.querySelector('.homepage-search-container input').addEventListener('focusout', event => {
            document.querySelector('.homepage-search-container label').style.borderColor = 'var(--prumary-color)';
        })
    }, [])

    return (
        <div className="homepage-search-container">
                <label htmlFor="search">
                    <input type="text" placeholder="Search a Favor" onInput={handleSearch} />
                </label>
            </div>
    )
}

export default HomeSearch
