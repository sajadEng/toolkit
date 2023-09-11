import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './styles/general.css';
import './styles/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter basename='/toolkit'>
      <App />
    </BrowserRouter>
  // </React.StrictMode>,
)
