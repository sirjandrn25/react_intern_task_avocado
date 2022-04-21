import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ItemProvider} from './context/itemContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ItemProvider>
      <App />
    </ItemProvider>
    
  </React.StrictMode>
)
