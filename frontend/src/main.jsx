import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <SidebarProvider>
    <SidebarTrigger />
    <App />
    </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
)
