import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/userContext.jsx'
export const server = "http://localhost:5000"
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserProvider>
    <App />
  </UserProvider>
    
  </StrictMode>,
)
