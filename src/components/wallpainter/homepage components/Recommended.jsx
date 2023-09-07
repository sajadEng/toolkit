import { Link } from "react-router-dom"
import { useEffect, useState,  } from 'react'
import HomeSearch from "./HomeSearch"


const imageAdresses = {
    movies: 'movie-logo.png',
    music: 'music-logo.png',
    nature: 'nature-logo.png',
    landscape: 'landscape-logo.png',
    programming: 'programming-logo.png',
    culture: 'culture-logo.png',
    cities: 'cities-logo.png',
    anime: 'anime-logo.png',
    all: 'logo.png'
}

function Recommended({ categories, dispatch }) {

    console.log(categories);

    // const [categoriesToUse, setCategoriesToUse] = useState(categories)

    function toTitle(str) {
        const newStr = str.charAt(0).toUpperCase() + str.slice(1)
        return newStr
    }

    function handleSearch(event) {
        const query = event.target.value.toLowerCase();
        // if (!query) 
        dispatch({type: 'categoryFilter', payload: {query}});
    }

    useEffect(function () {
        dispatch({type: 'categoryFilter', payload: {query: ''}});
    }, [])

    return (
        <div className="homepage-recommended-container">

            <p className="homepage-recommended-title">Categories</p>
            <HomeSearch handleSearch={handleSearch} />
                
                
            <div className="cards-container">
              {
                    categories.map(category => 
                        
                    <Link key={Math.floor(Math.random() * 10000000000)} className={`card ${!category.enabled ? 'disabled' : ''}`} to={`search?query=${category.name}`}>
                        <img src={`./src/images/wallpainter/${imageAdresses[(category.name).toLowerCase()]}`} alt={category.name} />
                        <p>{category.name}</p>
                    </Link>) 
                }  
                </div>
            
        </div>
    )
}

export default Recommended
