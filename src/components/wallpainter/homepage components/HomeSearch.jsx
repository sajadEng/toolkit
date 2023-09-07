import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

function HomeSearch({handleSearch}) {

    const navigate = useNavigate();
    // function handleSearch() {
    //     // event.preventDefault()
    //     const query = document.querySelector('.homepage-search-container input').value;
    //     query.length > 0 ? navigate(`/search?query=${query}`) : null
    // }

    useEffect(function () {
        document.querySelector('.homepage-search-container label').addEventListener('mouseenter', event => {
            event.target.style.borderColor = 'var(--color-1)';
        })
        document.querySelector('.homepage-search-container label').addEventListener('mouseleave', event => {
            // const inputStyles = getComputedStyle(event.target.children[0]) 
            // console.log(inputStyles);
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
                    {/* <img src="./src/images/search.svg" onClick={handleSearch} /> */}
                </label>
            </div>
    )
}

export default HomeSearch
