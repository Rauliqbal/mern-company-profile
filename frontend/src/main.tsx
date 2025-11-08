import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import {Slide, ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <App />
    <ToastContainer draggable transition={Slide}/>
  </StrictMode>
  </BrowserRouter>
)
