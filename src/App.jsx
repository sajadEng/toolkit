import { Routes, Route, Link, useLocation } from "react-router-dom"
import Homepage from "./pages/Homepage"
import WallpainterLayout from './layouts/WallpainterLayout'
import './styles/wallpainter/output.css'
import { HOME_PAGE } from './data/general-data'

//  =========== wallpainter ===========
import { useReducer, useEffect } from 'react'

// import pages
import WallpainterHomepage from './pages/wallpainter/Homepage';
import WallpainterLogin from './pages/wallpainter/Login';
import WallpainterSearch from './pages/wallpainter/Search';


import { data } from './data/data-wallpainter';
import WatchWithMe from "./pages/WatchWithMe"
import Ip from "./pages/Ip"
import Calc from "./pages/Calc"
import Bomb from "./pages/Bomb"

const initialState = data

function reducer(state, action) {
  switch(action.type) {
    case 'categoryFilter': return {...state, categories: state.categories.map(category => {
      return {...category, enabled: category.name.toLowerCase().includes(action.payload.query) }
    })}
    case 'login': return {...state, isLogedIn: true}
    case 'like': return {...state, wallpapers: state.wallpapers.map(wallpaper => wallpaper.id === action.payload.id ? {...wallpaper, liked: !wallpaper.liked} : wallpaper) }
  }
}


function App() {
    const location = useLocation();

    const [wallpainterState, wallpainterDispatch] = useReducer(reducer, initialState);

    useEffect(function () {
      console.log(location.pathname !== HOME_PAGE);
    }, [])

    return (
    <>
        <Routes>
            <Route path={HOME_PAGE} element={<Homepage />} />
            <Route path={`${HOME_PAGE}/wallpainter`} element={<WallpainterLayout />}>
                <Route index element={<WallpainterHomepage isLogedIn={wallpainterState.isLogedIn} categories={wallpainterState.categories} dispatch={wallpainterDispatch} />} />
                <Route path='login' element={<WallpainterLogin dispatch={wallpainterDispatch} />} />
                <Route path='search' element={<WallpainterSearch dispatch={wallpainterDispatch} state={wallpainterState} />}  />
            </Route>
            <Route path={`${HOME_PAGE}/ip`} element={<Ip />} />
            <Route path={`${HOME_PAGE}/watch`} element={<WatchWithMe/>} />
            <Route path={`${HOME_PAGE}/calc`} element={<Calc />} />
            <Route path={`${HOME_PAGE}/bomb`} element={<Bomb />} />
        </Routes>
        {location.pathname !== HOME_PAGE && location.pathname !== `${HOME_PAGE}/` && !location.pathname.includes('/calc')  && 
          <Link className='go-home-btn' to={HOME_PAGE}>
            <img src="/toolkit/images/home-icon.png" alt="H" />
          </Link>
      }
    </>
        )
    }

export default App