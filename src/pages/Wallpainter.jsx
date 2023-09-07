import { useReducer } from 'react'
import { Route } from "react-router-dom"

// import pages
import Homepage from './wallpainter/Homepage';
import Login from './wallpainter/Login';
import Search from './wallpainter/Search';


import { data } from '../data/data-wallpainter';

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

function Wallpainter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
      <Route>
        <Route index element={<Homepage isLogedIn={state.isLogedIn} categories={state.categories} dispatch={dispatch} />} />
        <Route path='login' element={<Login dispatch={dispatch} />} />
        <Route path='search' element={<Search dispatch={dispatch} state={state} />}  />
      </Route>
  )
}

export default Wallpainter
