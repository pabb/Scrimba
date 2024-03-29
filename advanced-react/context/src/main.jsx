import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {UserContextProvider} from "./userContext"

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <App />
    </UserContextProvider>
)