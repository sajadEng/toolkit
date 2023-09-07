import { Routes, Route, Link, useLocation } from "react-router-dom"
import Homepage from "./pages/Homepage"
import WallpainterLayout from './layouts/WallpainterLayout'
import './styles/wallpainter/output.css'

//  =========== wallpainter ===========
import { useReducer } from 'react'

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

    return (
    <>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/wallpainter" element={<WallpainterLayout />}>
                <Route index element={<WallpainterHomepage isLogedIn={wallpainterState.isLogedIn} categories={wallpainterState.categories} dispatch={wallpainterDispatch} />} />
                <Route path='login' element={<WallpainterLogin dispatch={wallpainterDispatch} />} />
                <Route path='search' element={<WallpainterSearch dispatch={wallpainterDispatch} state={wallpainterState} />}  />
            </Route>
            <Route path="ip" element={<Ip />} />
            <Route path="/watch" element={<WatchWithMe/>} />
            <Route path="/calc" element={<Calc />} />
            <Route path="/Bomb" element={<Bomb />} />
        </Routes>
        {location.pathname !== '/' && location.pathname !== '/calc'  && 
          <Link className='go-home-btn' to='/'>
            <img src="/src/images/home-icon.png" alt="Home" />
          </Link>
      }
    </>
        )
    }

export default App