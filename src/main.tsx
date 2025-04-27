import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MyContextProvider } from './contextProviders/MyContextProvider.tsx'
import './index.css'
import App from './App.tsx'

// workspace config for just output msg filter //
// if (process.env.NODE_ENV === 'development') {
//     console.warn = () => {}; // console.warn'ı boş bir fonksiyon yap
// }

createRoot(document.getElementById('root')!).render(
    
    <BrowserRouter>
        <MyContextProvider>
            <App />
        </MyContextProvider>
    </BrowserRouter>
)
