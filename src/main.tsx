import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MyContextProvider } from './contextProviders/MyContextProvider.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    
    <BrowserRouter>
        <MyContextProvider>
            <App />
        </MyContextProvider>
    </BrowserRouter>
)
