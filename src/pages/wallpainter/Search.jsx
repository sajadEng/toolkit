import { useSearchParams, Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import Result from "../../components/wallpainter/Result";

function Search({state, dispatch}) {
    const [arrange, setArrange] = useState('acd');
    const [params] = useSearchParams();
    const query = params.get('query');
    const { isLogedIn, categories } = state;

    
    // go to top button apear on scroll
    useEffect(function () {
        window.onscroll = function() {scrollFunction()};
    }, [])
    
    function scrollFunction() {
        let mybutton = document.querySelector(".search-gototop-btn");
        if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
            mybutton.style.scale = "1";
        } else {
            mybutton.style.scale = "0";
        }
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // arranging wallpapers sort
    let wallpapers = [] 
    if (query !== 'All') {
        if (arrange === 'dcd') {
            wallpapers = state.wallpapers.filter(wallpaper => wallpaper.category.toLowerCase() === query.toLowerCase()).slice();
        } else {
            wallpapers = state.wallpapers.filter(wallpaper => wallpaper.category.toLowerCase() === query.toLowerCase()).slice().reverse();
        }
    } else {
        if (arrange === 'dcd') {
            wallpapers = state.wallpapers.slice();
        } else {
            wallpapers = state.wallpapers.slice().reverse();

        }
    }

    function handleType() {
        const inputEl = document.querySelector('.search-header--search__input');
        const logo = document.querySelector('.search-header--logo');
        logo.style.rotate = `-${inputEl.value.length * 10}deg`
    }

    function handleArrangeSet(event) {
        event.target.innerHTML.includes('Acceding') ? setArrange(cur => cur === 'dcd' ? 'acd' : cur) : setArrange(cur => cur === 'acd' ? 'dcd' : cur)
    }

    return (
        <div className="search">
            <div className="search-header">
                <Link to='/wallpainter'>
                    <img src="/src/images/wallpainter/logo.png" className="search-header--logo"/>
                </Link>
                <div className="search-header--menu">
                    <div className="search-header--menu__current">category: {query}&#x27F1;</div>
                    <div className="search-header--menu__options">
                    {
                    categories.map(category => 
                        category.name.toLowerCase() !== query.toLowerCase() ? 
                        <Link key={Math.floor(Math.random() * 10000000000)} className={`card ${!category.enabled ? 'disabled' : ''}`} to={`?query=${category.name}`}>
                            {category.name}
                        </Link>
                        : null
                    )  
                }  
                    </div>
                </div>
                { isLogedIn ? <p className="search-header-username">{JSON.parse(localStorage.getItem('login')).username}</p> :
                    <Link to='/wallpainter/login' className="search-header-username">Login</Link> }
                
            </div>
            <h1 className="search-for">
                <span className="search-for--text">{query} Wallpapers ({wallpapers.length})</span>
                <div className="search-for--settings">
                    <span className="search-for--settings__arrange"><div className={arrange === 'acd' ? 'active' : ''} onClick={handleArrangeSet}>Acceding &darr;</div><div className={arrange === 'dcd' ? 'active' : ''} onClick={handleArrangeSet}>Decceding &uarr;</div></span>
                </div>
            </h1>
                {wallpapers.length > 0 ?
                    <div className="search-result-container">
                            {wallpapers.map(wallpaper => 
                                <Result key={wallpaper.id} wallpaper={wallpaper} dispatch={dispatch}  />
                            )} 
                    </div> :
                    <h1 style={{textAlign: 'center'}}>No Wallpapers Found</h1>
                }
            <button onClick={topFunction} className="search-gototop-btn" title="Go to top">Top</button> 
        </div>
    )
}

export default Search
